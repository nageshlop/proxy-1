'use strict';

let spectest = {
  print: print || ((...xs) => console.log(...xs)),
  global: 666,
  table: new WebAssembly.Table({initial: 10, maximum: 20, element: 'anyfunc'}),  memory: new WebAssembly.Memory({initial: 1, maximum: 2}),};

let registry = {spectest};

function register(name, instance) {
  registry[name] = instance.exports;
}

function module(bytes, valid = true) {
  let buffer = new ArrayBuffer(bytes.length);
  let view = new Uint8Array(buffer);
  for (let i = 0; i < bytes.length; ++i) {
    view[i] = bytes.charCodeAt(i);
  }
  let validated;
  try {
    validated = WebAssembly.validate(buffer);
  } catch (e) {
    throw new Error("Wasm validate throws");
  }
  if (validated !== valid) {
    throw new Error("Wasm validate failure" + (valid ? "" : " expected"));
  }
  return new WebAssembly.Module(buffer);
}

function instance(bytes, imports = registry) {
  return new WebAssembly.Instance(module(bytes), imports);
}

function call(instance, name, args) {
  return instance.exports[name](...args);
}

function get(instance, name) {
  return instance.exports[name];
}

function exports(name, instance) {
  return {[name]: instance.exports};
}

function run(action) {
  action();
}

function assert_malformed(bytes) {
  try { module(bytes, false) } catch (e) {
    if (e instanceof WebAssembly.CompileError) return;
  }
  throw new Error("Wasm decoding failure expected");
}

function assert_invalid(bytes) {
  try { module(bytes, false) } catch (e) {
    if (e instanceof WebAssembly.CompileError) return;
  }
  throw new Error("Wasm validation failure expected");
}

function assert_unlinkable(bytes) {
  let mod = module(bytes);
  try { new WebAssembly.Instance(mod, registry) } catch (e) {
    if (e instanceof WebAssembly.LinkError) return;
  }
  throw new Error("Wasm linking failure expected");
}

function assert_uninstantiable(bytes) {
  let mod = module(bytes);
  try { new WebAssembly.Instance(mod, registry) } catch (e) {
    if (e instanceof WebAssembly.RuntimeError) return;
  }
  throw new Error("Wasm trap expected");
}

function assert_trap(action) {
  try { action() } catch (e) {
    if (e instanceof WebAssembly.RuntimeError) return;
  }
  throw new Error("Wasm trap expected");
}

let StackOverflow;
try { (function f() { 1 + f() })() } catch (e) { StackOverflow = e.constructor }

function assert_exhaustion(action) {
  try { action() } catch (e) {
    if (e instanceof StackOverflow) return;
  }
  throw new Error("Wasm resource exhaustion expected");
}

function assert_return(action, expected) {
  let actual = action();
  if (!Object.is(actual, expected)) {
    throw new Error("Wasm return value " + expected + " expected, got " + actual);
  };
}

function assert_return_canonical_nan(action) {
  let actual = action();
  // Note that JS can't reliably distinguish different NaN values,
  // so there's no good way to test that it's a canonical NaN.
  if (!Number.isNaN(actual)) {
    throw new Error("Wasm return value NaN expected, got " + actual);
  };
}

function assert_return_arithmetic_nan(action) {
  // Note that JS can't reliably distinguish different NaN values,
  // so there's no good way to test for specific bitpatterns here.
  let actual = action();
  if (!Number.isNaN(actual)) {
    throw new Error("Wasm return value NaN expected, got " + actual);
  };
}


// unreachable.wast:3
let $1 = instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\xa0\x80\x80\x80\x00\x07\x60\x03\x7f\x7f\x7f\x00\x60\x00\x00\x60\x00\x01\x7f\x60\x00\x01\x7c\x60\x00\x01\x7e\x60\x02\x7f\x7f\x01\x7f\x60\x00\x01\x7d\x03\xba\x80\x80\x80\x00\x39\x01\x00\x02\x02\x03\x03\x02\x02\x01\x02\x02\x02\x01\x02\x02\x02\x02\x01\x02\x02\x01\x02\x02\x01\x02\x02\x02\x02\x04\x02\x05\x05\x05\x05\x02\x01\x01\x01\x01\x01\x01\x01\x01\x06\x04\x01\x01\x01\x01\x06\x02\x04\x02\x02\x02\x02\x02\x04\x85\x80\x80\x80\x00\x01\x70\x01\x01\x01\x05\x83\x80\x80\x80\x00\x01\x00\x01\x07\xcc\x87\x80\x80\x00\x37\x08\x74\x79\x70\x65\x2d\x69\x33\x32\x00\x02\x08\x74\x79\x70\x65\x2d\x69\x36\x34\x00\x03\x08\x74\x79\x70\x65\x2d\x66\x33\x32\x00\x04\x08\x74\x79\x70\x65\x2d\x66\x36\x34\x00\x05\x0d\x61\x73\x2d\x66\x75\x6e\x63\x2d\x66\x69\x72\x73\x74\x00\x06\x0b\x61\x73\x2d\x66\x75\x6e\x63\x2d\x6d\x69\x64\x00\x07\x0c\x61\x73\x2d\x66\x75\x6e\x63\x2d\x6c\x61\x73\x74\x00\x08\x0d\x61\x73\x2d\x66\x75\x6e\x63\x2d\x76\x61\x6c\x75\x65\x00\x09\x0e\x61\x73\x2d\x62\x6c\x6f\x63\x6b\x2d\x66\x69\x72\x73\x74\x00\x0a\x0c\x61\x73\x2d\x62\x6c\x6f\x63\x6b\x2d\x6d\x69\x64\x00\x0b\x0d\x61\x73\x2d\x62\x6c\x6f\x63\x6b\x2d\x6c\x61\x73\x74\x00\x0c\x0e\x61\x73\x2d\x62\x6c\x6f\x63\x6b\x2d\x76\x61\x6c\x75\x65\x00\x0d\x0e\x61\x73\x2d\x62\x6c\x6f\x63\x6b\x2d\x62\x72\x6f\x6b\x65\x00\x0e\x0d\x61\x73\x2d\x6c\x6f\x6f\x70\x2d\x66\x69\x72\x73\x74\x00\x0f\x0b\x61\x73\x2d\x6c\x6f\x6f\x70\x2d\x6d\x69\x64\x00\x10\x0c\x61\x73\x2d\x6c\x6f\x6f\x70\x2d\x6c\x61\x73\x74\x00\x11\x0d\x61\x73\x2d\x6c\x6f\x6f\x70\x2d\x62\x72\x6f\x6b\x65\x00\x12\x0b\x61\x73\x2d\x62\x72\x2d\x76\x61\x6c\x75\x65\x00\x13\x0d\x61\x73\x2d\x62\x72\x5f\x69\x66\x2d\x63\x6f\x6e\x64\x00\x14\x0e\x61\x73\x2d\x62\x72\x5f\x69\x66\x2d\x76\x61\x6c\x75\x65\x00\x15\x13\x61\x73\x2d\x62\x72\x5f\x69\x66\x2d\x76\x61\x6c\x75\x65\x2d\x63\x6f\x6e\x64\x00\x16\x11\x61\x73\x2d\x62\x72\x5f\x74\x61\x62\x6c\x65\x2d\x69\x6e\x64\x65\x78\x00\x17\x11\x61\x73\x2d\x62\x72\x5f\x74\x61\x62\x6c\x65\x2d\x76\x61\x6c\x75\x65\x00\x18\x13\x61\x73\x2d\x62\x72\x5f\x74\x61\x62\x6c\x65\x2d\x76\x61\x6c\x75\x65\x2d\x32\x00\x19\x17\x61\x73\x2d\x62\x72\x5f\x74\x61\x62\x6c\x65\x2d\x76\x61\x6c\x75\x65\x2d\x69\x6e\x64\x65\x78\x00\x1a\x1b\x61\x73\x2d\x62\x72\x5f\x74\x61\x62\x6c\x65\x2d\x76\x61\x6c\x75\x65\x2d\x61\x6e\x64\x2d\x69\x6e\x64\x65\x78\x00\x1b\x0f\x61\x73\x2d\x72\x65\x74\x75\x72\x6e\x2d\x76\x61\x6c\x75\x65\x00\x1c\x0a\x61\x73\x2d\x69\x66\x2d\x63\x6f\x6e\x64\x00\x1d\x0a\x61\x73\x2d\x69\x66\x2d\x74\x68\x65\x6e\x00\x1e\x0a\x61\x73\x2d\x69\x66\x2d\x65\x6c\x73\x65\x00\x1f\x0f\x61\x73\x2d\x73\x65\x6c\x65\x63\x74\x2d\x66\x69\x72\x73\x74\x00\x20\x10\x61\x73\x2d\x73\x65\x6c\x65\x63\x74\x2d\x73\x65\x63\x6f\x6e\x64\x00\x21\x0e\x61\x73\x2d\x73\x65\x6c\x65\x63\x74\x2d\x63\x6f\x6e\x64\x00\x22\x0d\x61\x73\x2d\x63\x61\x6c\x6c\x2d\x66\x69\x72\x73\x74\x00\x23\x0b\x61\x73\x2d\x63\x61\x6c\x6c\x2d\x6d\x69\x64\x00\x24\x0c\x61\x73\x2d\x63\x61\x6c\x6c\x2d\x6c\x61\x73\x74\x00\x25\x15\x61\x73\x2d\x63\x61\x6c\x6c\x5f\x69\x6e\x64\x69\x72\x65\x63\x74\x2d\x66\x75\x6e\x63\x00\x26\x16\x61\x73\x2d\x63\x61\x6c\x6c\x5f\x69\x6e\x64\x69\x72\x65\x63\x74\x2d\x66\x69\x72\x73\x74\x00\x27\x14\x61\x73\x2d\x63\x61\x6c\x6c\x5f\x69\x6e\x64\x69\x72\x65\x63\x74\x2d\x6d\x69\x64\x00\x28\x15\x61\x73\x2d\x63\x61\x6c\x6c\x5f\x69\x6e\x64\x69\x72\x65\x63\x74\x2d\x6c\x61\x73\x74\x00\x29\x12\x61\x73\x2d\x73\x65\x74\x5f\x6c\x6f\x63\x61\x6c\x2d\x76\x61\x6c\x75\x65\x00\x2a\x0f\x61\x73\x2d\x6c\x6f\x61\x64\x2d\x61\x64\x64\x72\x65\x73\x73\x00\x2b\x10\x61\x73\x2d\x6c\x6f\x61\x64\x4e\x2d\x61\x64\x64\x72\x65\x73\x73\x00\x2c\x10\x61\x73\x2d\x73\x74\x6f\x72\x65\x2d\x61\x64\x64\x72\x65\x73\x73\x00\x2d\x0e\x61\x73\x2d\x73\x74\x6f\x72\x65\x2d\x76\x61\x6c\x75\x65\x00\x2e\x11\x61\x73\x2d\x73\x74\x6f\x72\x65\x4e\x2d\x61\x64\x64\x72\x65\x73\x73\x00\x2f\x0f\x61\x73\x2d\x73\x74\x6f\x72\x65\x4e\x2d\x76\x61\x6c\x75\x65\x00\x30\x10\x61\x73\x2d\x75\x6e\x61\x72\x79\x2d\x6f\x70\x65\x72\x61\x6e\x64\x00\x31\x0e\x61\x73\x2d\x62\x69\x6e\x61\x72\x79\x2d\x6c\x65\x66\x74\x00\x32\x0f\x61\x73\x2d\x62\x69\x6e\x61\x72\x79\x2d\x72\x69\x67\x68\x74\x00\x33\x0f\x61\x73\x2d\x74\x65\x73\x74\x2d\x6f\x70\x65\x72\x61\x6e\x64\x00\x34\x0f\x61\x73\x2d\x63\x6f\x6d\x70\x61\x72\x65\x2d\x6c\x65\x66\x74\x00\x35\x10\x61\x73\x2d\x63\x6f\x6d\x70\x61\x72\x65\x2d\x72\x69\x67\x68\x74\x00\x36\x12\x61\x73\x2d\x63\x6f\x6e\x76\x65\x72\x74\x2d\x6f\x70\x65\x72\x61\x6e\x64\x00\x37\x13\x61\x73\x2d\x67\x72\x6f\x77\x5f\x6d\x65\x6d\x6f\x72\x79\x2d\x73\x69\x7a\x65\x00\x38\x09\x87\x80\x80\x80\x00\x01\x00\x41\x00\x0b\x01\x01\x0a\x80\x86\x80\x80\x00\x39\x82\x80\x80\x80\x00\x00\x0b\x82\x80\x80\x80\x00\x00\x0b\x83\x80\x80\x80\x00\x00\x00\x0b\x83\x80\x80\x80\x00\x00\x00\x0b\x83\x80\x80\x80\x00\x00\x00\x0b\x83\x80\x80\x80\x00\x00\x00\x0b\x85\x80\x80\x80\x00\x00\x00\x41\x7f\x0b\x87\x80\x80\x80\x00\x00\x10\x00\x00\x41\x7f\x0b\x85\x80\x80\x80\x00\x00\x10\x00\x00\x0b\x85\x80\x80\x80\x00\x00\x10\x00\x00\x0b\x88\x80\x80\x80\x00\x00\x02\x7f\x00\x41\x02\x0b\x0b\x8a\x80\x80\x80\x00\x00\x02\x7f\x10\x00\x00\x41\x02\x0b\x0b\x89\x80\x80\x80\x00\x00\x02\x40\x01\x10\x00\x00\x0b\x0b\x89\x80\x80\x80\x00\x00\x02\x7f\x01\x10\x00\x00\x0b\x0b\x8c\x80\x80\x80\x00\x00\x02\x7f\x10\x00\x41\x01\x0c\x00\x00\x0b\x0b\x88\x80\x80\x80\x00\x00\x03\x7f\x00\x41\x02\x0b\x0b\x8a\x80\x80\x80\x00\x00\x03\x7f\x10\x00\x00\x41\x02\x0b\x0b\x89\x80\x80\x80\x00\x00\x03\x40\x01\x10\x00\x00\x0b\x0b\x8f\x80\x80\x80\x00\x00\x02\x7f\x03\x7f\x10\x00\x41\x01\x0c\x01\x00\x0b\x0b\x0b\x88\x80\x80\x80\x00\x00\x02\x7f\x00\x0c\x00\x0b\x0b\x88\x80\x80\x80\x00\x00\x02\x40\x00\x0d\x00\x0b\x0b\x8d\x80\x80\x80\x00\x00\x02\x7f\x00\x41\x01\x0d\x00\x1a\x41\x07\x0b\x0b\x8d\x80\x80\x80\x00\x00\x02\x7f\x41\x06\x00\x0d\x00\x1a\x41\x07\x0b\x0b\x8b\x80\x80\x80\x00\x00\x02\x40\x00\x0e\x02\x00\x00\x00\x0b\x0b\x8f\x80\x80\x80\x00\x00\x02\x7f\x00\x41\x01\x0e\x02\x00\x00\x00\x41\x07\x0b\x0b\x8f\x80\x80\x80\x00\x00\x02\x7f\x02\x7f\x00\x41\x01\x0e\x01\x00\x01\x0b\x0b\x0b\x8e\x80\x80\x80\x00\x00\x02\x7f\x41\x06\x00\x0e\x01\x00\x00\x41\x07\x0b\x0b\x8c\x80\x80\x80\x00\x00\x02\x7f\x00\x0e\x01\x00\x00\x41\x08\x0b\x0b\x84\x80\x80\x80\x00\x00\x00\x0f\x0b\x8b\x80\x80\x80\x00\x00\x00\x04\x7f\x41\x00\x05\x41\x01\x0b\x0b\x8b\x80\x80\x80\x00\x00\x20\x00\x04\x7f\x00\x05\x20\x01\x0b\x0b\x8b\x80\x80\x80\x00\x00\x20\x00\x04\x7f\x20\x01\x05\x00\x0b\x0b\x88\x80\x80\x80\x00\x00\x00\x20\x00\x20\x01\x1b\x0b\x88\x80\x80\x80\x00\x00\x20\x00\x00\x20\x01\x1b\x0b\x88\x80\x80\x80\x00\x00\x41\x00\x41\x01\x00\x1b\x0b\x89\x80\x80\x80\x00\x00\x00\x41\x02\x41\x03\x10\x01\x0b\x89\x80\x80\x80\x00\x00\x41\x01\x00\x41\x03\x10\x01\x0b\x89\x80\x80\x80\x00\x00\x41\x01\x41\x02\x00\x10\x01\x0b\x8c\x80\x80\x80\x00\x00\x00\x41\x01\x41\x02\x41\x03\x11\x00\x00\x0b\x8c\x80\x80\x80\x00\x00\x41\x00\x00\x41\x02\x41\x03\x11\x00\x00\x0b\x8c\x80\x80\x80\x00\x00\x41\x00\x41\x01\x00\x41\x03\x11\x00\x00\x0b\x8c\x80\x80\x80\x00\x00\x41\x00\x41\x01\x41\x02\x00\x11\x00\x00\x0b\x87\x80\x80\x80\x00\x01\x01\x7d\x00\x21\x00\x0b\x86\x80\x80\x80\x00\x00\x00\x2a\x02\x00\x0b\x86\x80\x80\x80\x00\x00\x00\x30\x00\x00\x0b\x8f\x80\x80\x80\x00\x00\x00\x44\x00\x00\x00\x00\x00\x00\x1c\x40\x39\x03\x00\x0b\x88\x80\x80\x80\x00\x00\x41\x02\x00\x37\x03\x00\x0b\x88\x80\x80\x80\x00\x00\x00\x41\x07\x3a\x00\x00\x0b\x88\x80\x80\x80\x00\x00\x41\x02\x00\x3d\x01\x00\x0b\x84\x80\x80\x80\x00\x00\x00\x8c\x0b\x86\x80\x80\x80\x00\x00\x00\x41\x0a\x6a\x0b\x86\x80\x80\x80\x00\x00\x42\x0a\x00\x7d\x0b\x84\x80\x80\x80\x00\x00\x00\x45\x0b\x8d\x80\x80\x80\x00\x00\x00\x44\x00\x00\x00\x00\x00\x00\x24\x40\x65\x0b\x89\x80\x80\x80\x00\x00\x43\x00\x00\x20\x41\x00\x5c\x0b\x84\x80\x80\x80\x00\x00\x00\xa7\x0b\x85\x80\x80\x80\x00\x00\x00\x40\x00\x0b");

// unreachable.wast:211
assert_trap(() => call($1, "type-i32", []));

// unreachable.wast:212
assert_trap(() => call($1, "type-i64", []));

// unreachable.wast:213
assert_trap(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x00\x00\x60\x00\x01\x7c\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x74\x79\x70\x65\x2d\x66\x33\x32\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x8f\x80\x80\x80\x00\x01\x89\x80\x80\x80\x00\x00\x02\x40\x10\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_trap(() => call($1, "type-f32", []))

// unreachable.wast:214
assert_trap(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x00\x00\x60\x00\x01\x7c\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x74\x79\x70\x65\x2d\x66\x36\x34\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x8f\x80\x80\x80\x00\x01\x89\x80\x80\x80\x00\x00\x02\x40\x10\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_trap(() => call($1, "type-f64", []))

// unreachable.wast:216
assert_trap(() => call($1, "as-func-first", []));

// unreachable.wast:217
assert_trap(() => call($1, "as-func-mid", []));

// unreachable.wast:218
assert_trap(() => call($1, "as-func-last", []));

// unreachable.wast:219
assert_trap(() => call($1, "as-func-value", []));

// unreachable.wast:221
assert_trap(() => call($1, "as-block-first", []));

// unreachable.wast:222
assert_trap(() => call($1, "as-block-mid", []));

// unreachable.wast:223
assert_trap(() => call($1, "as-block-last", []));

// unreachable.wast:224
assert_trap(() => call($1, "as-block-value", []));

// unreachable.wast:225
assert_return(() => call($1, "as-block-broke", []), 1);

// unreachable.wast:227
assert_trap(() => call($1, "as-loop-first", []));

// unreachable.wast:228
assert_trap(() => call($1, "as-loop-mid", []));

// unreachable.wast:229
assert_trap(() => call($1, "as-loop-last", []));

// unreachable.wast:230
assert_return(() => call($1, "as-loop-broke", []), 1);

// unreachable.wast:232
assert_trap(() => call($1, "as-br-value", []));

// unreachable.wast:234
assert_trap(() => call($1, "as-br_if-cond", []));

// unreachable.wast:235
assert_trap(() => call($1, "as-br_if-value", []));

// unreachable.wast:236
assert_trap(() => call($1, "as-br_if-value-cond", []));

// unreachable.wast:238
assert_trap(() => call($1, "as-br_table-index", []));

// unreachable.wast:239
assert_trap(() => call($1, "as-br_table-value", []));

// unreachable.wast:240
assert_trap(() => call($1, "as-br_table-value-2", []));

// unreachable.wast:241
assert_trap(() => call($1, "as-br_table-value-index", []));

// unreachable.wast:242
assert_trap(() => call($1, "as-br_table-value-and-index", []));

// unreachable.wast:244
assert_trap(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x00\x00\x60\x00\x01\x7e\x02\x96\x80\x80\x80\x00\x01\x02\x24\x31\x0f\x61\x73\x2d\x72\x65\x74\x75\x72\x6e\x2d\x76\x61\x6c\x75\x65\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x8f\x80\x80\x80\x00\x01\x89\x80\x80\x80\x00\x00\x02\x40\x10\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_trap(() => call($1, "as-return-value", []))

// unreachable.wast:246
assert_trap(() => call($1, "as-if-cond", []));

// unreachable.wast:247
assert_trap(() => call($1, "as-if-then", [1, 6]));

// unreachable.wast:248
assert_return(() => call($1, "as-if-then", [0, 6]), 6);

// unreachable.wast:249
assert_trap(() => call($1, "as-if-else", [0, 6]));

// unreachable.wast:250
assert_return(() => call($1, "as-if-else", [1, 6]), 6);

// unreachable.wast:252
assert_trap(() => call($1, "as-select-first", [0, 6]));

// unreachable.wast:253
assert_trap(() => call($1, "as-select-first", [1, 6]));

// unreachable.wast:254
assert_trap(() => call($1, "as-select-second", [0, 6]));

// unreachable.wast:255
assert_trap(() => call($1, "as-select-second", [1, 6]));

// unreachable.wast:256
assert_trap(() => call($1, "as-select-cond", []));

// unreachable.wast:258
assert_trap(() => call($1, "as-call-first", []));

// unreachable.wast:259
assert_trap(() => call($1, "as-call-mid", []));

// unreachable.wast:260
assert_trap(() => call($1, "as-call-last", []));

// unreachable.wast:262
assert_trap(() => call($1, "as-call_indirect-func", []));

// unreachable.wast:263
assert_trap(() => call($1, "as-call_indirect-first", []));

// unreachable.wast:264
assert_trap(() => call($1, "as-call_indirect-mid", []));

// unreachable.wast:265
assert_trap(() => call($1, "as-call_indirect-last", []));

// unreachable.wast:267
assert_trap(() => call($1, "as-set_local-value", []));

// unreachable.wast:269
assert_trap(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x00\x00\x60\x00\x01\x7d\x02\x96\x80\x80\x80\x00\x01\x02\x24\x31\x0f\x61\x73\x2d\x6c\x6f\x61\x64\x2d\x61\x64\x64\x72\x65\x73\x73\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x8f\x80\x80\x80\x00\x01\x89\x80\x80\x80\x00\x00\x02\x40\x10\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_trap(() => call($1, "as-load-address", []))

// unreachable.wast:270
assert_trap(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x00\x00\x60\x00\x01\x7e\x02\x97\x80\x80\x80\x00\x01\x02\x24\x31\x10\x61\x73\x2d\x6c\x6f\x61\x64\x4e\x2d\x61\x64\x64\x72\x65\x73\x73\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x8f\x80\x80\x80\x00\x01\x89\x80\x80\x80\x00\x00\x02\x40\x10\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_trap(() => call($1, "as-loadN-address", []))

// unreachable.wast:272
assert_trap(() => call($1, "as-store-address", []));

// unreachable.wast:273
assert_trap(() => call($1, "as-store-value", []));

// unreachable.wast:274
assert_trap(() => call($1, "as-storeN-address", []));

// unreachable.wast:275
assert_trap(() => call($1, "as-storeN-value", []));

// unreachable.wast:277
assert_trap(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x00\x00\x60\x00\x01\x7d\x02\x97\x80\x80\x80\x00\x01\x02\x24\x31\x10\x61\x73\x2d\x75\x6e\x61\x72\x79\x2d\x6f\x70\x65\x72\x61\x6e\x64\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x8f\x80\x80\x80\x00\x01\x89\x80\x80\x80\x00\x00\x02\x40\x10\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_trap(() => call($1, "as-unary-operand", []))

// unreachable.wast:279
assert_trap(() => call($1, "as-binary-left", []));

// unreachable.wast:280
assert_trap(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x00\x00\x60\x00\x01\x7e\x02\x96\x80\x80\x80\x00\x01\x02\x24\x31\x0f\x61\x73\x2d\x62\x69\x6e\x61\x72\x79\x2d\x72\x69\x67\x68\x74\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x8f\x80\x80\x80\x00\x01\x89\x80\x80\x80\x00\x00\x02\x40\x10\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_trap(() => call($1, "as-binary-right", []))

// unreachable.wast:282
assert_trap(() => call($1, "as-test-operand", []));

// unreachable.wast:284
assert_trap(() => call($1, "as-compare-left", []));

// unreachable.wast:285
assert_trap(() => call($1, "as-compare-right", []));

// unreachable.wast:287
assert_trap(() => call($1, "as-convert-operand", []));

// unreachable.wast:289
assert_trap(() => call($1, "as-grow_memory-size", []));
