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


// endianness.wast:1
let $1 = instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\xa4\x80\x80\x80\x00\x07\x60\x02\x7f\x7f\x00\x60\x02\x7f\x7e\x00\x60\x01\x7f\x01\x7f\x60\x01\x7f\x01\x7e\x60\x01\x7e\x01\x7e\x60\x01\x7d\x01\x7d\x60\x01\x7c\x01\x7c\x03\x98\x80\x80\x80\x00\x17\x00\x00\x01\x02\x02\x03\x02\x02\x02\x04\x04\x04\x04\x04\x05\x06\x02\x02\x04\x04\x04\x05\x06\x05\x83\x80\x80\x80\x00\x01\x00\x01\x07\xe1\x81\x80\x80\x00\x11\x0c\x69\x33\x32\x5f\x6c\x6f\x61\x64\x31\x36\x5f\x73\x00\x06\x0c\x69\x33\x32\x5f\x6c\x6f\x61\x64\x31\x36\x5f\x75\x00\x07\x08\x69\x33\x32\x5f\x6c\x6f\x61\x64\x00\x08\x0c\x69\x36\x34\x5f\x6c\x6f\x61\x64\x31\x36\x5f\x73\x00\x09\x0c\x69\x36\x34\x5f\x6c\x6f\x61\x64\x31\x36\x5f\x75\x00\x0a\x0c\x69\x36\x34\x5f\x6c\x6f\x61\x64\x33\x32\x5f\x73\x00\x0b\x0c\x69\x36\x34\x5f\x6c\x6f\x61\x64\x33\x32\x5f\x75\x00\x0c\x08\x69\x36\x34\x5f\x6c\x6f\x61\x64\x00\x0d\x08\x66\x33\x32\x5f\x6c\x6f\x61\x64\x00\x0e\x08\x66\x36\x34\x5f\x6c\x6f\x61\x64\x00\x0f\x0b\x69\x33\x32\x5f\x73\x74\x6f\x72\x65\x31\x36\x00\x10\x09\x69\x33\x32\x5f\x73\x74\x6f\x72\x65\x00\x11\x0b\x69\x36\x34\x5f\x73\x74\x6f\x72\x65\x31\x36\x00\x12\x0b\x69\x36\x34\x5f\x73\x74\x6f\x72\x65\x33\x32\x00\x13\x09\x69\x36\x34\x5f\x73\x74\x6f\x72\x65\x00\x14\x09\x66\x33\x32\x5f\x73\x74\x6f\x72\x65\x00\x15\x09\x66\x36\x34\x5f\x73\x74\x6f\x72\x65\x00\x16\x0a\xd2\x83\x80\x80\x00\x17\x96\x80\x80\x80\x00\x00\x20\x00\x20\x01\x3a\x00\x00\x20\x00\x41\x01\x6a\x20\x01\x41\x08\x76\x3a\x00\x00\x0b\x94\x80\x80\x80\x00\x00\x20\x00\x20\x01\x10\x00\x20\x00\x41\x02\x6a\x20\x01\x41\x10\x76\x10\x00\x0b\x96\x80\x80\x80\x00\x00\x20\x00\x20\x01\xa7\x10\x01\x20\x00\x41\x04\x6a\x20\x01\x42\x20\x88\xa7\x10\x01\x0b\x93\x80\x80\x80\x00\x00\x20\x00\x2d\x00\x00\x20\x00\x41\x01\x6a\x2d\x00\x00\x41\x08\x74\x72\x0b\x91\x80\x80\x80\x00\x00\x20\x00\x10\x03\x20\x00\x41\x02\x6a\x10\x03\x41\x10\x74\x72\x0b\x93\x80\x80\x80\x00\x00\x20\x00\x10\x04\xad\x20\x00\x41\x04\x6a\x10\x04\xad\x42\x20\x86\x84\x0b\x8d\x80\x80\x80\x00\x00\x41\x00\x20\x00\x10\x00\x41\x00\x2e\x01\x00\x0b\x8d\x80\x80\x80\x00\x00\x41\x00\x20\x00\x10\x00\x41\x00\x2f\x01\x00\x0b\x8d\x80\x80\x80\x00\x00\x41\x00\x20\x00\x10\x01\x41\x00\x28\x02\x00\x0b\x8e\x80\x80\x80\x00\x00\x41\x00\x20\x00\xa7\x10\x00\x41\x00\x32\x01\x00\x0b\x8e\x80\x80\x80\x00\x00\x41\x00\x20\x00\xa7\x10\x00\x41\x00\x33\x01\x00\x0b\x8e\x80\x80\x80\x00\x00\x41\x00\x20\x00\xa7\x10\x01\x41\x00\x34\x02\x00\x0b\x8e\x80\x80\x80\x00\x00\x41\x00\x20\x00\xa7\x10\x01\x41\x00\x35\x02\x00\x0b\x8d\x80\x80\x80\x00\x00\x41\x00\x20\x00\x10\x02\x41\x00\x29\x03\x00\x0b\x8e\x80\x80\x80\x00\x00\x41\x00\x20\x00\xbc\x10\x01\x41\x00\x2a\x02\x00\x0b\x8e\x80\x80\x80\x00\x00\x41\x00\x20\x00\xbd\x10\x02\x41\x00\x2b\x03\x00\x0b\x8d\x80\x80\x80\x00\x00\x41\x00\x20\x00\x3b\x01\x00\x41\x00\x10\x03\x0b\x8d\x80\x80\x80\x00\x00\x41\x00\x20\x00\x36\x02\x00\x41\x00\x10\x04\x0b\x8e\x80\x80\x80\x00\x00\x41\x00\x20\x00\x3d\x01\x00\x41\x00\x10\x03\xad\x0b\x8e\x80\x80\x80\x00\x00\x41\x00\x20\x00\x3e\x02\x00\x41\x00\x10\x04\xad\x0b\x8d\x80\x80\x80\x00\x00\x41\x00\x20\x00\x37\x03\x00\x41\x00\x10\x05\x0b\x8e\x80\x80\x80\x00\x00\x41\x00\x20\x00\x38\x02\x00\x41\x00\x10\x04\xbe\x0b\x8e\x80\x80\x80\x00\x00\x41\x00\x20\x00\x39\x03\x00\x41\x00\x10\x05\xbf\x0b");

// endianness.wast:133
assert_return(() => call($1, "i32_load16_s", [-1]), -1);

// endianness.wast:134
assert_return(() => call($1, "i32_load16_s", [-4242]), -4242);

// endianness.wast:135
assert_return(() => call($1, "i32_load16_s", [42]), 42);

// endianness.wast:136
assert_return(() => call($1, "i32_load16_s", [12816]), 12816);

// endianness.wast:138
assert_return(() => call($1, "i32_load16_u", [-1]), 65535);

// endianness.wast:139
assert_return(() => call($1, "i32_load16_u", [-4242]), 61294);

// endianness.wast:140
assert_return(() => call($1, "i32_load16_u", [42]), 42);

// endianness.wast:141
assert_return(() => call($1, "i32_load16_u", [51966]), 51966);

// endianness.wast:143
assert_return(() => call($1, "i32_load", [-1]), -1);

// endianness.wast:144
assert_return(() => call($1, "i32_load", [-42424242]), -42424242);

// endianness.wast:145
assert_return(() => call($1, "i32_load", [42424242]), 42424242);

// endianness.wast:146
assert_return(() => call($1, "i32_load", [-1414717974]), -1414717974);

// endianness.wast:148
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x93\x80\x80\x80\x00\x01\x02\x24\x31\x0c\x69\x36\x34\x5f\x6c\x6f\x61\x64\x31\x36\x5f\x73\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x99\x80\x80\x80\x00\x01\x93\x80\x80\x80\x00\x00\x02\x40\x42\x7f\x10\x00\x01\x42\x7f\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_load16_s", [int64("-1")]), int64("-1"))

// endianness.wast:149
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x93\x80\x80\x80\x00\x01\x02\x24\x31\x0c\x69\x36\x34\x5f\x6c\x6f\x61\x64\x31\x36\x5f\x73\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9b\x80\x80\x80\x00\x01\x95\x80\x80\x80\x00\x00\x02\x40\x42\xee\x5e\x10\x00\x01\x42\xee\x5e\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_load16_s", [int64("-4242")]), int64("-4242"))

// endianness.wast:150
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x93\x80\x80\x80\x00\x01\x02\x24\x31\x0c\x69\x36\x34\x5f\x6c\x6f\x61\x64\x31\x36\x5f\x73\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x99\x80\x80\x80\x00\x01\x93\x80\x80\x80\x00\x00\x02\x40\x42\x2a\x10\x00\x01\x42\x2a\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_load16_s", [int64("42")]), int64("42"))

// endianness.wast:151
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x93\x80\x80\x80\x00\x01\x02\x24\x31\x0c\x69\x36\x34\x5f\x6c\x6f\x61\x64\x31\x36\x5f\x73\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9d\x80\x80\x80\x00\x01\x97\x80\x80\x80\x00\x00\x02\x40\x42\x90\xe4\x00\x10\x00\x01\x42\x90\xe4\x00\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_load16_s", [int64("12816")]), int64("12816"))

// endianness.wast:153
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x93\x80\x80\x80\x00\x01\x02\x24\x31\x0c\x69\x36\x34\x5f\x6c\x6f\x61\x64\x31\x36\x5f\x75\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9b\x80\x80\x80\x00\x01\x95\x80\x80\x80\x00\x00\x02\x40\x42\x7f\x10\x00\x01\x42\xff\xff\x03\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_load16_u", [int64("-1")]), int64("65535"))

// endianness.wast:154
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x93\x80\x80\x80\x00\x01\x02\x24\x31\x0c\x69\x36\x34\x5f\x6c\x6f\x61\x64\x31\x36\x5f\x75\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9c\x80\x80\x80\x00\x01\x96\x80\x80\x80\x00\x00\x02\x40\x42\xee\x5e\x10\x00\x01\x42\xee\xde\x03\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_load16_u", [int64("-4242")]), int64("61294"))

// endianness.wast:155
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x93\x80\x80\x80\x00\x01\x02\x24\x31\x0c\x69\x36\x34\x5f\x6c\x6f\x61\x64\x31\x36\x5f\x75\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x99\x80\x80\x80\x00\x01\x93\x80\x80\x80\x00\x00\x02\x40\x42\x2a\x10\x00\x01\x42\x2a\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_load16_u", [int64("42")]), int64("42"))

// endianness.wast:156
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x93\x80\x80\x80\x00\x01\x02\x24\x31\x0c\x69\x36\x34\x5f\x6c\x6f\x61\x64\x31\x36\x5f\x75\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9d\x80\x80\x80\x00\x01\x97\x80\x80\x80\x00\x00\x02\x40\x42\xfe\x95\x03\x10\x00\x01\x42\xfe\x95\x03\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_load16_u", [int64("51966")]), int64("51966"))

// endianness.wast:158
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x93\x80\x80\x80\x00\x01\x02\x24\x31\x0c\x69\x36\x34\x5f\x6c\x6f\x61\x64\x33\x32\x5f\x73\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x99\x80\x80\x80\x00\x01\x93\x80\x80\x80\x00\x00\x02\x40\x42\x7f\x10\x00\x01\x42\x7f\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_load32_s", [int64("-1")]), int64("-1"))

// endianness.wast:159
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x93\x80\x80\x80\x00\x01\x02\x24\x31\x0c\x69\x36\x34\x5f\x6c\x6f\x61\x64\x33\x32\x5f\x73\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9f\x80\x80\x80\x00\x01\x99\x80\x80\x80\x00\x00\x02\x40\x42\xce\xd0\xe2\x6b\x10\x00\x01\x42\xce\xd0\xe2\x6b\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_load32_s", [int64("-42424242")]), int64("-42424242"))

// endianness.wast:160
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x93\x80\x80\x80\x00\x01\x02\x24\x31\x0c\x69\x36\x34\x5f\x6c\x6f\x61\x64\x33\x32\x5f\x73\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9f\x80\x80\x80\x00\x01\x99\x80\x80\x80\x00\x00\x02\x40\x42\xb2\xaf\x9d\x14\x10\x00\x01\x42\xb2\xaf\x9d\x14\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_load32_s", [int64("42424242")]), int64("42424242"))

// endianness.wast:161
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x93\x80\x80\x80\x00\x01\x02\x24\x31\x0c\x69\x36\x34\x5f\x6c\x6f\x61\x64\x33\x32\x5f\x73\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\xa1\x80\x80\x80\x00\x01\x9b\x80\x80\x80\x00\x00\x02\x40\x42\xf8\xac\xd1\x91\x01\x10\x00\x01\x42\xf8\xac\xd1\x91\x01\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_load32_s", [int64("305419896")]), int64("305419896"))

// endianness.wast:163
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x93\x80\x80\x80\x00\x01\x02\x24\x31\x0c\x69\x36\x34\x5f\x6c\x6f\x61\x64\x33\x32\x5f\x75\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9d\x80\x80\x80\x00\x01\x97\x80\x80\x80\x00\x00\x02\x40\x42\x7f\x10\x00\x01\x42\xff\xff\xff\xff\x0f\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_load32_u", [int64("-1")]), int64("4294967295"))

// endianness.wast:164
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x93\x80\x80\x80\x00\x01\x02\x24\x31\x0c\x69\x36\x34\x5f\x6c\x6f\x61\x64\x33\x32\x5f\x75\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\xa0\x80\x80\x80\x00\x01\x9a\x80\x80\x80\x00\x00\x02\x40\x42\xce\xd0\xe2\x6b\x10\x00\x01\x42\xce\xd0\xe2\xeb\x0f\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_load32_u", [int64("-42424242")]), int64("4252543054"))

// endianness.wast:165
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x93\x80\x80\x80\x00\x01\x02\x24\x31\x0c\x69\x36\x34\x5f\x6c\x6f\x61\x64\x33\x32\x5f\x75\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9f\x80\x80\x80\x00\x01\x99\x80\x80\x80\x00\x00\x02\x40\x42\xb2\xaf\x9d\x14\x10\x00\x01\x42\xb2\xaf\x9d\x14\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_load32_u", [int64("42424242")]), int64("42424242"))

// endianness.wast:166
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x93\x80\x80\x80\x00\x01\x02\x24\x31\x0c\x69\x36\x34\x5f\x6c\x6f\x61\x64\x33\x32\x5f\x75\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\xa1\x80\x80\x80\x00\x01\x9b\x80\x80\x80\x00\x00\x02\x40\x42\xea\xbb\xb4\xdd\x0a\x10\x00\x01\x42\xea\xbb\xb4\xdd\x0a\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_load32_u", [int64("2880249322")]), int64("2880249322"))

// endianness.wast:168
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x69\x36\x34\x5f\x6c\x6f\x61\x64\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x99\x80\x80\x80\x00\x01\x93\x80\x80\x80\x00\x00\x02\x40\x42\x7f\x10\x00\x01\x42\x7f\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_load", [int64("-1")]), int64("-1"))

// endianness.wast:169
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x69\x36\x34\x5f\x6c\x6f\x61\x64\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9f\x80\x80\x80\x00\x01\x99\x80\x80\x80\x00\x00\x02\x40\x42\xce\xd0\xe2\x6b\x10\x00\x01\x42\xce\xd0\xe2\x6b\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_load", [int64("-42424242")]), int64("-42424242"))

// endianness.wast:170
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x69\x36\x34\x5f\x6c\x6f\x61\x64\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\xa1\x80\x80\x80\x00\x01\x9b\x80\x80\x80\x00\x00\x02\x40\x42\xea\xbb\xb4\xdd\x0a\x10\x00\x01\x42\xea\xbb\xb4\xdd\x0a\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_load", [int64("2880249322")]), int64("2880249322"))

// endianness.wast:171
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x69\x36\x34\x5f\x6c\x6f\x61\x64\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\xab\x80\x80\x80\x00\x01\xa5\x80\x80\x80\x00\x00\x02\x40\x42\xea\xbb\xb4\xf5\xed\xdf\xf2\xd6\xab\x7f\x10\x00\x01\x42\xea\xbb\xb4\xf5\xed\xdf\xf2\xd6\xab\x7f\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_load", [int64("-6075977126246539798")]), int64("-6075977126246539798"))

// endianness.wast:173
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7d\x01\x7d\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x66\x33\x32\x5f\x6c\x6f\x61\x64\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9f\x80\x80\x80\x00\x01\x99\x80\x80\x80\x00\x00\x02\x40\x43\x00\x00\x80\xbf\x10\x00\xbc\x43\x00\x00\x80\xbf\xbc\x46\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "f32_load", [-1.]), -1.)

// endianness.wast:174
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7d\x01\x7d\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x66\x33\x32\x5f\x6c\x6f\x61\x64\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9f\x80\x80\x80\x00\x01\x99\x80\x80\x80\x00\x00\x02\x40\x43\xb6\x2d\x4a\x3c\x10\x00\xbc\x43\xb6\x2d\x4a\x3c\xbc\x46\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "f32_load", [0.0123399998993]), 0.0123399998993)

// endianness.wast:175
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7d\x01\x7d\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x66\x33\x32\x5f\x6c\x6f\x61\x64\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9f\x80\x80\x80\x00\x01\x99\x80\x80\x80\x00\x00\x02\x40\x43\x65\x93\x84\x45\x10\x00\xbc\x43\x65\x93\x84\x45\xbc\x46\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "f32_load", [4242.42431641]), 4242.42431641)

// endianness.wast:176
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7d\x01\x7d\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x66\x33\x32\x5f\x6c\x6f\x61\x64\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9f\x80\x80\x80\x00\x01\x99\x80\x80\x80\x00\x00\x02\x40\x43\xff\xff\x7f\x7f\x10\x00\xbc\x43\xff\xff\x7f\x7f\xbc\x46\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "f32_load", [3.40282346639e+38]), 3.40282346639e+38)

// endianness.wast:178
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7c\x01\x7c\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x66\x36\x34\x5f\x6c\x6f\x61\x64\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\xa7\x80\x80\x80\x00\x01\xa1\x80\x80\x80\x00\x00\x02\x40\x44\x00\x00\x00\x00\x00\x00\xf0\xbf\x10\x00\xbd\x44\x00\x00\x00\x00\x00\x00\xf0\xbf\xbd\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "f64_load", [-1.]), -1.)

// endianness.wast:179
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7c\x01\x7c\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x66\x36\x34\x5f\x6c\x6f\x61\x64\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\xa7\x80\x80\x80\x00\x01\xa1\x80\x80\x80\x00\x00\x02\x40\x44\xe7\xc6\xf4\x84\x45\x4a\x93\x40\x10\x00\xbd\x44\xe7\xc6\xf4\x84\x45\x4a\x93\x40\xbd\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "f64_load", [1234.56789]), 1234.56789)

// endianness.wast:180
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7c\x01\x7c\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x66\x36\x34\x5f\x6c\x6f\x61\x64\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\xa7\x80\x80\x80\x00\x01\xa1\x80\x80\x80\x00\x00\x02\x40\x44\xae\x7e\x6c\xb2\xc9\xe4\x19\x41\x10\x00\xbd\x44\xae\x7e\x6c\xb2\xc9\xe4\x19\x41\xbd\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "f64_load", [424242.424242]), 424242.424242)

// endianness.wast:181
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7c\x01\x7c\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x66\x36\x34\x5f\x6c\x6f\x61\x64\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\xa7\x80\x80\x80\x00\x01\xa1\x80\x80\x80\x00\x00\x02\x40\x44\xff\xff\xff\xff\xff\xff\xef\x7f\x10\x00\xbd\x44\xff\xff\xff\xff\xff\xff\xef\x7f\xbd\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "f64_load", [1.79769313486e+308]), 1.79769313486e+308)

// endianness.wast:184
assert_return(() => call($1, "i32_store16", [-1]), 65535);

// endianness.wast:185
assert_return(() => call($1, "i32_store16", [-4242]), 61294);

// endianness.wast:186
assert_return(() => call($1, "i32_store16", [42]), 42);

// endianness.wast:187
assert_return(() => call($1, "i32_store16", [51966]), 51966);

// endianness.wast:189
assert_return(() => call($1, "i32_store", [-1]), -1);

// endianness.wast:190
assert_return(() => call($1, "i32_store", [-4242]), -4242);

// endianness.wast:191
assert_return(() => call($1, "i32_store", [42424242]), 42424242);

// endianness.wast:192
assert_return(() => call($1, "i32_store", [-559035650]), -559035650);

// endianness.wast:194
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x92\x80\x80\x80\x00\x01\x02\x24\x31\x0b\x69\x36\x34\x5f\x73\x74\x6f\x72\x65\x31\x36\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9b\x80\x80\x80\x00\x01\x95\x80\x80\x80\x00\x00\x02\x40\x42\x7f\x10\x00\x01\x42\xff\xff\x03\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_store16", [int64("-1")]), int64("65535"))

// endianness.wast:195
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x92\x80\x80\x80\x00\x01\x02\x24\x31\x0b\x69\x36\x34\x5f\x73\x74\x6f\x72\x65\x31\x36\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9c\x80\x80\x80\x00\x01\x96\x80\x80\x80\x00\x00\x02\x40\x42\xee\x5e\x10\x00\x01\x42\xee\xde\x03\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_store16", [int64("-4242")]), int64("61294"))

// endianness.wast:196
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x92\x80\x80\x80\x00\x01\x02\x24\x31\x0b\x69\x36\x34\x5f\x73\x74\x6f\x72\x65\x31\x36\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x99\x80\x80\x80\x00\x01\x93\x80\x80\x80\x00\x00\x02\x40\x42\x2a\x10\x00\x01\x42\x2a\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_store16", [int64("42")]), int64("42"))

// endianness.wast:197
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x92\x80\x80\x80\x00\x01\x02\x24\x31\x0b\x69\x36\x34\x5f\x73\x74\x6f\x72\x65\x31\x36\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9d\x80\x80\x80\x00\x01\x97\x80\x80\x80\x00\x00\x02\x40\x42\xfe\x95\x03\x10\x00\x01\x42\xfe\x95\x03\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_store16", [int64("51966")]), int64("51966"))

// endianness.wast:199
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x92\x80\x80\x80\x00\x01\x02\x24\x31\x0b\x69\x36\x34\x5f\x73\x74\x6f\x72\x65\x33\x32\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9d\x80\x80\x80\x00\x01\x97\x80\x80\x80\x00\x00\x02\x40\x42\x7f\x10\x00\x01\x42\xff\xff\xff\xff\x0f\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_store32", [int64("-1")]), int64("4294967295"))

// endianness.wast:200
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x92\x80\x80\x80\x00\x01\x02\x24\x31\x0b\x69\x36\x34\x5f\x73\x74\x6f\x72\x65\x33\x32\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9e\x80\x80\x80\x00\x01\x98\x80\x80\x80\x00\x00\x02\x40\x42\xee\x5e\x10\x00\x01\x42\xee\xde\xff\xff\x0f\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_store32", [int64("-4242")]), int64("4294963054"))

// endianness.wast:201
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x92\x80\x80\x80\x00\x01\x02\x24\x31\x0b\x69\x36\x34\x5f\x73\x74\x6f\x72\x65\x33\x32\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9f\x80\x80\x80\x00\x01\x99\x80\x80\x80\x00\x00\x02\x40\x42\xb2\xaf\x9d\x14\x10\x00\x01\x42\xb2\xaf\x9d\x14\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_store32", [int64("42424242")]), int64("42424242"))

// endianness.wast:202
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x92\x80\x80\x80\x00\x01\x02\x24\x31\x0b\x69\x36\x34\x5f\x73\x74\x6f\x72\x65\x33\x32\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\xa1\x80\x80\x80\x00\x01\x9b\x80\x80\x80\x00\x00\x02\x40\x42\xfe\x95\xb7\xf5\x0d\x10\x00\x01\x42\xfe\x95\xb7\xf5\x0d\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_store32", [int64("3735931646")]), int64("3735931646"))

// endianness.wast:204
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x90\x80\x80\x80\x00\x01\x02\x24\x31\x09\x69\x36\x34\x5f\x73\x74\x6f\x72\x65\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x99\x80\x80\x80\x00\x01\x93\x80\x80\x80\x00\x00\x02\x40\x42\x7f\x10\x00\x01\x42\x7f\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_store", [int64("-1")]), int64("-1"))

// endianness.wast:205
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x90\x80\x80\x80\x00\x01\x02\x24\x31\x09\x69\x36\x34\x5f\x73\x74\x6f\x72\x65\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9f\x80\x80\x80\x00\x01\x99\x80\x80\x80\x00\x00\x02\x40\x42\xce\xd0\xe2\x6b\x10\x00\x01\x42\xce\xd0\xe2\x6b\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_store", [int64("-42424242")]), int64("-42424242"))

// endianness.wast:206
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x90\x80\x80\x80\x00\x01\x02\x24\x31\x09\x69\x36\x34\x5f\x73\x74\x6f\x72\x65\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\xa1\x80\x80\x80\x00\x01\x9b\x80\x80\x80\x00\x00\x02\x40\x42\xea\xbb\xb4\xdd\x0a\x10\x00\x01\x42\xea\xbb\xb4\xdd\x0a\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_store", [int64("2880249322")]), int64("2880249322"))

// endianness.wast:207
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x90\x80\x80\x80\x00\x01\x02\x24\x31\x09\x69\x36\x34\x5f\x73\x74\x6f\x72\x65\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\xab\x80\x80\x80\x00\x01\xa5\x80\x80\x80\x00\x00\x02\x40\x42\xea\xbb\xb4\xf5\xed\xdf\xf2\xd6\xab\x7f\x10\x00\x01\x42\xea\xbb\xb4\xf5\xed\xdf\xf2\xd6\xab\x7f\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "i64_store", [int64("-6075977126246539798")]), int64("-6075977126246539798"))

// endianness.wast:209
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7d\x01\x7d\x02\x90\x80\x80\x80\x00\x01\x02\x24\x31\x09\x66\x33\x32\x5f\x73\x74\x6f\x72\x65\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9f\x80\x80\x80\x00\x01\x99\x80\x80\x80\x00\x00\x02\x40\x43\x00\x00\x80\xbf\x10\x00\xbc\x43\x00\x00\x80\xbf\xbc\x46\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "f32_store", [-1.]), -1.)

// endianness.wast:210
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7d\x01\x7d\x02\x90\x80\x80\x80\x00\x01\x02\x24\x31\x09\x66\x33\x32\x5f\x73\x74\x6f\x72\x65\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9f\x80\x80\x80\x00\x01\x99\x80\x80\x80\x00\x00\x02\x40\x43\xb6\x2d\x4a\x3c\x10\x00\xbc\x43\xb6\x2d\x4a\x3c\xbc\x46\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "f32_store", [0.0123399998993]), 0.0123399998993)

// endianness.wast:211
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7d\x01\x7d\x02\x90\x80\x80\x80\x00\x01\x02\x24\x31\x09\x66\x33\x32\x5f\x73\x74\x6f\x72\x65\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9f\x80\x80\x80\x00\x01\x99\x80\x80\x80\x00\x00\x02\x40\x43\x65\x93\x84\x45\x10\x00\xbc\x43\x65\x93\x84\x45\xbc\x46\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "f32_store", [4242.42431641]), 4242.42431641)

// endianness.wast:212
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7d\x01\x7d\x02\x90\x80\x80\x80\x00\x01\x02\x24\x31\x09\x66\x33\x32\x5f\x73\x74\x6f\x72\x65\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9f\x80\x80\x80\x00\x01\x99\x80\x80\x80\x00\x00\x02\x40\x43\xff\xff\x7f\x7f\x10\x00\xbc\x43\xff\xff\x7f\x7f\xbc\x46\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "f32_store", [3.40282346639e+38]), 3.40282346639e+38)

// endianness.wast:214
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7c\x01\x7c\x02\x90\x80\x80\x80\x00\x01\x02\x24\x31\x09\x66\x36\x34\x5f\x73\x74\x6f\x72\x65\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\xa7\x80\x80\x80\x00\x01\xa1\x80\x80\x80\x00\x00\x02\x40\x44\x00\x00\x00\x00\x00\x00\xf0\xbf\x10\x00\xbd\x44\x00\x00\x00\x00\x00\x00\xf0\xbf\xbd\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "f64_store", [-1.]), -1.)

// endianness.wast:215
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7c\x01\x7c\x02\x90\x80\x80\x80\x00\x01\x02\x24\x31\x09\x66\x36\x34\x5f\x73\x74\x6f\x72\x65\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\xa7\x80\x80\x80\x00\x01\xa1\x80\x80\x80\x00\x00\x02\x40\x44\xe7\xc6\xf4\x84\x45\x4a\x93\x40\x10\x00\xbd\x44\xe7\xc6\xf4\x84\x45\x4a\x93\x40\xbd\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "f64_store", [1234.56789]), 1234.56789)

// endianness.wast:216
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7c\x01\x7c\x02\x90\x80\x80\x80\x00\x01\x02\x24\x31\x09\x66\x36\x34\x5f\x73\x74\x6f\x72\x65\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\xa7\x80\x80\x80\x00\x01\xa1\x80\x80\x80\x00\x00\x02\x40\x44\xae\x7e\x6c\xb2\xc9\xe4\x19\x41\x10\x00\xbd\x44\xae\x7e\x6c\xb2\xc9\xe4\x19\x41\xbd\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "f64_store", [424242.424242]), 424242.424242)

// endianness.wast:217
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7c\x01\x7c\x02\x90\x80\x80\x80\x00\x01\x02\x24\x31\x09\x66\x36\x34\x5f\x73\x74\x6f\x72\x65\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\xa7\x80\x80\x80\x00\x01\xa1\x80\x80\x80\x00\x00\x02\x40\x44\xff\xff\xff\xff\xff\xff\xef\x7f\x10\x00\xbd\x44\xff\xff\xff\xff\xff\xff\xef\x7f\xbd\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "f64_store", [1.79769313486e+308]), 1.79769313486e+308)
