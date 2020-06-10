
'use strict';

let spectest = {
  print: console.log.bind(console),
  print_i32: console.log.bind(console),
  print_i32_f32: console.log.bind(console),
  print_f64_f64: console.log.bind(console),
  print_f32: console.log.bind(console),
  print_f64: console.log.bind(console),
  global_i32: 666,
  global_f32: 666,
  global_f64: 666,
  table: new WebAssembly.Table({initial: 10, maximum: 20, element: 'anyfunc'}),
  memory: new WebAssembly.Memory({initial: 1, maximum: 2})
};
let handler = {
  get(target, prop) {
    return (prop in target) ?  target[prop] : {};
  }
};
let registry = new Proxy({spectest}, handler);

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
  let v = instance.exports[name];
  return (v instanceof WebAssembly.Global) ? v.value : v;
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
  switch (expected) {
    case "nan:canonical":
    case "nan:arithmetic":
    case "nan:any":
      // Note that JS can't reliably distinguish different NaN values,
      // so there's no good way to test that it's a canonical NaN.
      if (!Number.isNaN(actual)) {
        throw new Error("Wasm return value NaN expected, got " + actual);
      };
      return;
    default:
      if (!Object.is(actual, expected)) {
        throw new Error("Wasm return value " + expected + " expected, got " + actual);
      };
  }
}

// left-to-right.wast:1
let $1 = instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\xc0\x80\x80\x80\x00\x0d\x60\x02\x7f\x7f\x01\x7f\x60\x02\x7e\x7e\x01\x7f\x60\x02\x7d\x7d\x01\x7f\x60\x02\x7c\x7c\x01\x7f\x60\x00\x00\x60\x00\x01\x7f\x60\x00\x01\x7e\x60\x00\x01\x7d\x60\x00\x01\x7c\x60\x02\x7f\x7f\x00\x60\x02\x7e\x7e\x00\x60\x02\x7d\x7d\x00\x60\x02\x7c\x7c\x00\x03\x84\x81\x80\x80\x00\x82\x01\x00\x00\x01\x01\x02\x02\x03\x03\x04\x04\x05\x05\x05\x05\x05\x05\x06\x06\x06\x05\x05\x07\x07\x07\x05\x05\x08\x08\x08\x05\x05\x09\x0a\x0b\x0c\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x04\x85\x80\x80\x80\x00\x01\x70\x01\x08\x08\x05\x83\x80\x80\x80\x00\x01\x00\x01\x07\xaa\x88\x80\x80\x00\x5f\x07\x69\x33\x32\x5f\x61\x64\x64\x00\x23\x07\x69\x33\x32\x5f\x73\x75\x62\x00\x24\x07\x69\x33\x32\x5f\x6d\x75\x6c\x00\x25\x09\x69\x33\x32\x5f\x64\x69\x76\x5f\x73\x00\x26\x09\x69\x33\x32\x5f\x64\x69\x76\x5f\x75\x00\x27\x09\x69\x33\x32\x5f\x72\x65\x6d\x5f\x73\x00\x28\x09\x69\x33\x32\x5f\x72\x65\x6d\x5f\x75\x00\x29\x07\x69\x33\x32\x5f\x61\x6e\x64\x00\x2a\x06\x69\x33\x32\x5f\x6f\x72\x00\x2b\x07\x69\x33\x32\x5f\x78\x6f\x72\x00\x2c\x07\x69\x33\x32\x5f\x73\x68\x6c\x00\x2d\x09\x69\x33\x32\x5f\x73\x68\x72\x5f\x75\x00\x2e\x09\x69\x33\x32\x5f\x73\x68\x72\x5f\x73\x00\x2f\x06\x69\x33\x32\x5f\x65\x71\x00\x30\x06\x69\x33\x32\x5f\x6e\x65\x00\x31\x08\x69\x33\x32\x5f\x6c\x74\x5f\x73\x00\x32\x08\x69\x33\x32\x5f\x6c\x65\x5f\x73\x00\x33\x08\x69\x33\x32\x5f\x6c\x74\x5f\x75\x00\x34\x08\x69\x33\x32\x5f\x6c\x65\x5f\x75\x00\x35\x08\x69\x33\x32\x5f\x67\x74\x5f\x73\x00\x36\x08\x69\x33\x32\x5f\x67\x65\x5f\x73\x00\x37\x08\x69\x33\x32\x5f\x67\x74\x5f\x75\x00\x38\x08\x69\x33\x32\x5f\x67\x65\x5f\x75\x00\x39\x09\x69\x33\x32\x5f\x73\x74\x6f\x72\x65\x00\x3a\x0a\x69\x33\x32\x5f\x73\x74\x6f\x72\x65\x38\x00\x3b\x0b\x69\x33\x32\x5f\x73\x74\x6f\x72\x65\x31\x36\x00\x3c\x08\x69\x33\x32\x5f\x63\x61\x6c\x6c\x00\x3d\x11\x69\x33\x32\x5f\x63\x61\x6c\x6c\x5f\x69\x6e\x64\x69\x72\x65\x63\x74\x00\x3e\x0a\x69\x33\x32\x5f\x73\x65\x6c\x65\x63\x74\x00\x3f\x07\x69\x36\x34\x5f\x61\x64\x64\x00\x40\x07\x69\x36\x34\x5f\x73\x75\x62\x00\x41\x07\x69\x36\x34\x5f\x6d\x75\x6c\x00\x42\x09\x69\x36\x34\x5f\x64\x69\x76\x5f\x73\x00\x43\x09\x69\x36\x34\x5f\x64\x69\x76\x5f\x75\x00\x44\x09\x69\x36\x34\x5f\x72\x65\x6d\x5f\x73\x00\x45\x09\x69\x36\x34\x5f\x72\x65\x6d\x5f\x75\x00\x46\x07\x69\x36\x34\x5f\x61\x6e\x64\x00\x47\x06\x69\x36\x34\x5f\x6f\x72\x00\x48\x07\x69\x36\x34\x5f\x78\x6f\x72\x00\x49\x07\x69\x36\x34\x5f\x73\x68\x6c\x00\x4a\x09\x69\x36\x34\x5f\x73\x68\x72\x5f\x75\x00\x4b\x09\x69\x36\x34\x5f\x73\x68\x72\x5f\x73\x00\x4c\x06\x69\x36\x34\x5f\x65\x71\x00\x4d\x06\x69\x36\x34\x5f\x6e\x65\x00\x4e\x08\x69\x36\x34\x5f\x6c\x74\x5f\x73\x00\x4f\x08\x69\x36\x34\x5f\x6c\x65\x5f\x73\x00\x50\x08\x69\x36\x34\x5f\x6c\x74\x5f\x75\x00\x51\x08\x69\x36\x34\x5f\x6c\x65\x5f\x75\x00\x52\x08\x69\x36\x34\x5f\x67\x74\x5f\x73\x00\x53\x08\x69\x36\x34\x5f\x67\x65\x5f\x73\x00\x54\x08\x69\x36\x34\x5f\x67\x74\x5f\x75\x00\x55\x08\x69\x36\x34\x5f\x67\x65\x5f\x75\x00\x56\x09\x69\x36\x34\x5f\x73\x74\x6f\x72\x65\x00\x57\x0a\x69\x36\x34\x5f\x73\x74\x6f\x72\x65\x38\x00\x58\x0b\x69\x36\x34\x5f\x73\x74\x6f\x72\x65\x31\x36\x00\x59\x0b\x69\x36\x34\x5f\x73\x74\x6f\x72\x65\x33\x32\x00\x5a\x08\x69\x36\x34\x5f\x63\x61\x6c\x6c\x00\x5b\x11\x69\x36\x34\x5f\x63\x61\x6c\x6c\x5f\x69\x6e\x64\x69\x72\x65\x63\x74\x00\x5c\x0a\x69\x36\x34\x5f\x73\x65\x6c\x65\x63\x74\x00\x5d\x07\x66\x33\x32\x5f\x61\x64\x64\x00\x5e\x07\x66\x33\x32\x5f\x73\x75\x62\x00\x5f\x07\x66\x33\x32\x5f\x6d\x75\x6c\x00\x60\x07\x66\x33\x32\x5f\x64\x69\x76\x00\x61\x0c\x66\x33\x32\x5f\x63\x6f\x70\x79\x73\x69\x67\x6e\x00\x62\x06\x66\x33\x32\x5f\x65\x71\x00\x63\x06\x66\x33\x32\x5f\x6e\x65\x00\x64\x06\x66\x33\x32\x5f\x6c\x74\x00\x65\x06\x66\x33\x32\x5f\x6c\x65\x00\x66\x06\x66\x33\x32\x5f\x67\x74\x00\x67\x06\x66\x33\x32\x5f\x67\x65\x00\x68\x07\x66\x33\x32\x5f\x6d\x69\x6e\x00\x69\x07\x66\x33\x32\x5f\x6d\x61\x78\x00\x6a\x09\x66\x33\x32\x5f\x73\x74\x6f\x72\x65\x00\x6b\x08\x66\x33\x32\x5f\x63\x61\x6c\x6c\x00\x6c\x11\x66\x33\x32\x5f\x63\x61\x6c\x6c\x5f\x69\x6e\x64\x69\x72\x65\x63\x74\x00\x6d\x0a\x66\x33\x32\x5f\x73\x65\x6c\x65\x63\x74\x00\x6e\x07\x66\x36\x34\x5f\x61\x64\x64\x00\x6f\x07\x66\x36\x34\x5f\x73\x75\x62\x00\x70\x07\x66\x36\x34\x5f\x6d\x75\x6c\x00\x71\x07\x66\x36\x34\x5f\x64\x69\x76\x00\x72\x0c\x66\x36\x34\x5f\x63\x6f\x70\x79\x73\x69\x67\x6e\x00\x73\x06\x66\x36\x34\x5f\x65\x71\x00\x74\x06\x66\x36\x34\x5f\x6e\x65\x00\x75\x06\x66\x36\x34\x5f\x6c\x74\x00\x76\x06\x66\x36\x34\x5f\x6c\x65\x00\x77\x06\x66\x36\x34\x5f\x67\x74\x00\x78\x06\x66\x36\x34\x5f\x67\x65\x00\x79\x07\x66\x36\x34\x5f\x6d\x69\x6e\x00\x7a\x07\x66\x36\x34\x5f\x6d\x61\x78\x00\x7b\x09\x66\x36\x34\x5f\x73\x74\x6f\x72\x65\x00\x7c\x08\x66\x36\x34\x5f\x63\x61\x6c\x6c\x00\x7d\x11\x66\x36\x34\x5f\x63\x61\x6c\x6c\x5f\x69\x6e\x64\x69\x72\x65\x63\x74\x00\x7e\x0a\x66\x36\x34\x5f\x73\x65\x6c\x65\x63\x74\x00\x7f\x05\x62\x72\x5f\x69\x66\x00\x80\x01\x08\x62\x72\x5f\x74\x61\x62\x6c\x65\x00\x81\x01\x09\x8e\x80\x80\x80\x00\x01\x00\x41\x00\x0b\x08\x00\x01\x02\x03\x04\x05\x06\x07\x0a\xb2\x91\x80\x80\x00\x82\x01\x84\x80\x80\x80\x00\x00\x41\x7f\x0b\x84\x80\x80\x80\x00\x00\x41\x7e\x0b\x84\x80\x80\x80\x00\x00\x41\x7f\x0b\x84\x80\x80\x80\x00\x00\x41\x7e\x0b\x84\x80\x80\x80\x00\x00\x41\x7f\x0b\x84\x80\x80\x80\x00\x00\x41\x7e\x0b\x84\x80\x80\x80\x00\x00\x41\x7f\x0b\x84\x80\x80\x80\x00\x00\x41\x7e\x0b\x89\x80\x80\x80\x00\x00\x41\x08\x41\x00\x36\x02\x00\x0b\xa7\x80\x80\x80\x00\x00\x41\x0b\x41\x0a\x2d\x00\x00\x3a\x00\x00\x41\x0a\x41\x09\x2d\x00\x00\x3a\x00\x00\x41\x09\x41\x08\x2d\x00\x00\x3a\x00\x00\x41\x08\x41\x7d\x3a\x00\x00\x0b\x87\x80\x80\x80\x00\x00\x41\x08\x28\x02\x00\x0b\x8d\x80\x80\x80\x00\x00\x10\x09\x41\x08\x41\x01\x3a\x00\x00\x41\x00\x0b\x8d\x80\x80\x80\x00\x00\x10\x09\x41\x08\x41\x02\x3a\x00\x00\x41\x01\x0b\x8d\x80\x80\x80\x00\x00\x10\x09\x41\x08\x41\x03\x3a\x00\x00\x41\x01\x0b\x8d\x80\x80\x80\x00\x00\x10\x09\x41\x08\x41\x04\x3a\x00\x00\x41\x00\x0b\x8d\x80\x80\x80\x00\x00\x10\x09\x41\x08\x41\x05\x3a\x00\x00\x41\x00\x0b\x8d\x80\x80\x80\x00\x00\x10\x09\x41\x08\x41\x01\x3a\x00\x00\x42\x00\x0b\x8d\x80\x80\x80\x00\x00\x10\x09\x41\x08\x41\x02\x3a\x00\x00\x42\x01\x0b\x8d\x80\x80\x80\x00\x00\x10\x09\x41\x08\x41\x03\x3a\x00\x00\x42\x01\x0b\x8d\x80\x80\x80\x00\x00\x10\x09\x41\x08\x41\x04\x3a\x00\x00\x41\x02\x0b\x8d\x80\x80\x80\x00\x00\x10\x09\x41\x08\x41\x05\x3a\x00\x00\x41\x00\x0b\x90\x80\x80\x80\x00\x00\x10\x09\x41\x08\x41\x01\x3a\x00\x00\x43\x00\x00\x00\x00\x0b\x90\x80\x80\x80\x00\x00\x10\x09\x41\x08\x41\x02\x3a\x00\x00\x43\x00\x00\x80\x3f\x0b\x90\x80\x80\x80\x00\x00\x10\x09\x41\x08\x41\x03\x3a\x00\x00\x43\x00\x00\x80\x3f\x0b\x8d\x80\x80\x80\x00\x00\x10\x09\x41\x08\x41\x04\x3a\x00\x00\x41\x04\x0b\x8d\x80\x80\x80\x00\x00\x10\x09\x41\x08\x41\x05\x3a\x00\x00\x41\x00\x0b\x94\x80\x80\x80\x00\x00\x10\x09\x41\x08\x41\x01\x3a\x00\x00\x44\x00\x00\x00\x00\x00\x00\x00\x00\x0b\x94\x80\x80\x80\x00\x00\x10\x09\x41\x08\x41\x02\x3a\x00\x00\x44\x00\x00\x00\x00\x00\x00\xf0\x3f\x0b\x94\x80\x80\x80\x00\x00\x10\x09\x41\x08\x41\x03\x3a\x00\x00\x44\x00\x00\x00\x00\x00\x00\xf0\x3f\x0b\x8d\x80\x80\x80\x00\x00\x10\x09\x41\x08\x41\x04\x3a\x00\x00\x41\x06\x0b\x8d\x80\x80\x80\x00\x00\x10\x09\x41\x08\x41\x05\x3a\x00\x00\x41\x00\x0b\x82\x80\x80\x80\x00\x00\x0b\x82\x80\x80\x80\x00\x00\x0b\x82\x80\x80\x80\x00\x00\x0b\x82\x80\x80\x80\x00\x00\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x0c\x6a\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x0c\x6b\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x0c\x6c\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x0c\x6d\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x0c\x6e\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x0c\x6f\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x0c\x70\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x0c\x71\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x0c\x72\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x0c\x73\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x0c\x74\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x0c\x76\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x0c\x75\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x0c\x46\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x0c\x47\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x0c\x48\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x0c\x4c\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x0c\x49\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x0c\x4d\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x0c\x4a\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x0c\x4e\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x0c\x4b\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x0c\x4f\x1a\x10\x0a\x0b\x8d\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x0c\x36\x02\x00\x10\x0a\x0b\x8d\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x0c\x3a\x00\x00\x10\x0a\x0b\x8d\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x0c\x3b\x01\x00\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x0c\x10\x1f\x10\x0a\x0b\x90\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x0c\x10\x0e\x11\x00\x00\x1a\x10\x0a\x0b\x8e\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x0c\x10\x0f\x1b\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x10\x10\x11\x7c\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x10\x10\x11\x7d\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x10\x10\x11\x7e\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x10\x10\x11\x7f\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x10\x10\x11\x80\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x10\x10\x11\x81\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x10\x10\x11\x82\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x10\x10\x11\x83\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x10\x10\x11\x84\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x10\x10\x11\x85\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x10\x10\x11\x86\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x10\x10\x11\x88\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x10\x10\x11\x87\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x10\x10\x11\x51\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x10\x10\x11\x52\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x10\x10\x11\x53\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x10\x10\x11\x57\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x10\x10\x11\x54\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x10\x10\x11\x58\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x10\x10\x11\x55\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x10\x10\x11\x59\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x10\x10\x11\x56\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x10\x10\x11\x5a\x1a\x10\x0a\x0b\x8d\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x11\x37\x03\x00\x10\x0a\x0b\x8d\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x11\x3c\x00\x00\x10\x0a\x0b\x8d\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x11\x3d\x01\x00\x10\x0a\x0b\x8d\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x11\x3e\x02\x00\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x10\x10\x11\x10\x20\x10\x0a\x0b\x90\x80\x80\x80\x00\x00\x10\x08\x10\x10\x10\x11\x10\x13\x11\x01\x00\x1a\x10\x0a\x0b\x8e\x80\x80\x80\x00\x00\x10\x08\x10\x10\x10\x11\x10\x14\x1b\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x15\x10\x16\x92\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x15\x10\x16\x93\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x15\x10\x16\x94\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x15\x10\x16\x95\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x15\x10\x16\x98\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x15\x10\x16\x5b\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x15\x10\x16\x5c\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x15\x10\x16\x5d\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x15\x10\x16\x5f\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x15\x10\x16\x5e\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x15\x10\x16\x60\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x15\x10\x16\x96\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x15\x10\x16\x97\x1a\x10\x0a\x0b\x8d\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x16\x38\x02\x00\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x15\x10\x16\x10\x21\x10\x0a\x0b\x90\x80\x80\x80\x00\x00\x10\x08\x10\x15\x10\x16\x10\x18\x11\x02\x00\x1a\x10\x0a\x0b\x8e\x80\x80\x80\x00\x00\x10\x08\x10\x15\x10\x16\x10\x19\x1b\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x1a\x10\x1b\xa0\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x1a\x10\x1b\xa1\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x1a\x10\x1b\xa2\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x1a\x10\x1b\xa3\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x1a\x10\x1b\xa6\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x1a\x10\x1b\x61\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x1a\x10\x1b\x62\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x1a\x10\x1b\x63\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x1a\x10\x1b\x65\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x1a\x10\x1b\x64\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x1a\x10\x1b\x66\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x1a\x10\x1b\xa4\x1a\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x1a\x10\x1b\xa5\x1a\x10\x0a\x0b\x8d\x80\x80\x80\x00\x00\x10\x08\x10\x0b\x10\x1b\x39\x03\x00\x10\x0a\x0b\x8c\x80\x80\x80\x00\x00\x10\x08\x10\x1a\x10\x1b\x10\x22\x10\x0a\x0b\x90\x80\x80\x80\x00\x00\x10\x08\x10\x1a\x10\x1b\x10\x1d\x11\x03\x00\x1a\x10\x0a\x0b\x8e\x80\x80\x80\x00\x00\x10\x08\x10\x1a\x10\x1b\x10\x1e\x1b\x1a\x10\x0a\x0b\x93\x80\x80\x80\x00\x00\x02\x7f\x10\x08\x10\x0b\x10\x0c\x41\x00\x71\x0d\x00\x1a\x10\x0a\x0b\x0b\x95\x80\x80\x80\x00\x00\x02\x7f\x10\x08\x02\x7f\x10\x0b\x10\x0c\x0e\x01\x01\x00\x0b\x1a\x10\x0a\x0b\x0b");

// left-to-right.wast:181
assert_return(() => call($1, "i32_add", []), 258);

// left-to-right.wast:181
assert_return(() => call($1, "i64_add", []), 258);

// left-to-right.wast:182
assert_return(() => call($1, "i32_sub", []), 258);

// left-to-right.wast:182
assert_return(() => call($1, "i64_sub", []), 258);

// left-to-right.wast:183
assert_return(() => call($1, "i32_mul", []), 258);

// left-to-right.wast:183
assert_return(() => call($1, "i64_mul", []), 258);

// left-to-right.wast:184
assert_return(() => call($1, "i32_div_s", []), 258);

// left-to-right.wast:184
assert_return(() => call($1, "i64_div_s", []), 258);

// left-to-right.wast:185
assert_return(() => call($1, "i32_div_u", []), 258);

// left-to-right.wast:185
assert_return(() => call($1, "i64_div_u", []), 258);

// left-to-right.wast:186
assert_return(() => call($1, "i32_rem_s", []), 258);

// left-to-right.wast:186
assert_return(() => call($1, "i64_rem_s", []), 258);

// left-to-right.wast:187
assert_return(() => call($1, "i32_rem_u", []), 258);

// left-to-right.wast:187
assert_return(() => call($1, "i64_rem_u", []), 258);

// left-to-right.wast:188
assert_return(() => call($1, "i32_and", []), 258);

// left-to-right.wast:188
assert_return(() => call($1, "i64_and", []), 258);

// left-to-right.wast:189
assert_return(() => call($1, "i32_or", []), 258);

// left-to-right.wast:189
assert_return(() => call($1, "i64_or", []), 258);

// left-to-right.wast:190
assert_return(() => call($1, "i32_xor", []), 258);

// left-to-right.wast:190
assert_return(() => call($1, "i64_xor", []), 258);

// left-to-right.wast:191
assert_return(() => call($1, "i32_shl", []), 258);

// left-to-right.wast:191
assert_return(() => call($1, "i64_shl", []), 258);

// left-to-right.wast:192
assert_return(() => call($1, "i32_shr_u", []), 258);

// left-to-right.wast:192
assert_return(() => call($1, "i64_shr_u", []), 258);

// left-to-right.wast:193
assert_return(() => call($1, "i32_shr_s", []), 258);

// left-to-right.wast:193
assert_return(() => call($1, "i64_shr_s", []), 258);

// left-to-right.wast:194
assert_return(() => call($1, "i32_eq", []), 258);

// left-to-right.wast:194
assert_return(() => call($1, "i64_eq", []), 258);

// left-to-right.wast:195
assert_return(() => call($1, "i32_ne", []), 258);

// left-to-right.wast:195
assert_return(() => call($1, "i64_ne", []), 258);

// left-to-right.wast:196
assert_return(() => call($1, "i32_lt_s", []), 258);

// left-to-right.wast:196
assert_return(() => call($1, "i64_lt_s", []), 258);

// left-to-right.wast:197
assert_return(() => call($1, "i32_le_s", []), 258);

// left-to-right.wast:197
assert_return(() => call($1, "i64_le_s", []), 258);

// left-to-right.wast:198
assert_return(() => call($1, "i32_lt_u", []), 258);

// left-to-right.wast:198
assert_return(() => call($1, "i64_lt_u", []), 258);

// left-to-right.wast:199
assert_return(() => call($1, "i32_le_u", []), 258);

// left-to-right.wast:199
assert_return(() => call($1, "i64_le_u", []), 258);

// left-to-right.wast:200
assert_return(() => call($1, "i32_gt_s", []), 258);

// left-to-right.wast:200
assert_return(() => call($1, "i64_gt_s", []), 258);

// left-to-right.wast:201
assert_return(() => call($1, "i32_ge_s", []), 258);

// left-to-right.wast:201
assert_return(() => call($1, "i64_ge_s", []), 258);

// left-to-right.wast:202
assert_return(() => call($1, "i32_gt_u", []), 258);

// left-to-right.wast:202
assert_return(() => call($1, "i64_gt_u", []), 258);

// left-to-right.wast:203
assert_return(() => call($1, "i32_ge_u", []), 258);

// left-to-right.wast:203
assert_return(() => call($1, "i64_ge_u", []), 258);

// left-to-right.wast:204
assert_return(() => call($1, "i32_store", []), 258);

// left-to-right.wast:204
assert_return(() => call($1, "i64_store", []), 258);

// left-to-right.wast:205
assert_return(() => call($1, "i32_store8", []), 258);

// left-to-right.wast:205
assert_return(() => call($1, "i64_store8", []), 258);

// left-to-right.wast:206
assert_return(() => call($1, "i32_store16", []), 258);

// left-to-right.wast:206
assert_return(() => call($1, "i64_store16", []), 258);

// left-to-right.wast:207
assert_return(() => call($1, "i64_store32", []), 258);

// left-to-right.wast:208
assert_return(() => call($1, "i32_call", []), 258);

// left-to-right.wast:208
assert_return(() => call($1, "i64_call", []), 258);

// left-to-right.wast:209
assert_return(() => call($1, "i32_call_indirect", []), 66_052);

// left-to-right.wast:210
assert_return(() => call($1, "i64_call_indirect", []), 66_052);

// left-to-right.wast:211
assert_return(() => call($1, "i32_select", []), 66_053);

// left-to-right.wast:211
assert_return(() => call($1, "i64_select", []), 66_053);

// left-to-right.wast:213
assert_return(() => call($1, "f32_add", []), 258);

// left-to-right.wast:213
assert_return(() => call($1, "f64_add", []), 258);

// left-to-right.wast:214
assert_return(() => call($1, "f32_sub", []), 258);

// left-to-right.wast:214
assert_return(() => call($1, "f64_sub", []), 258);

// left-to-right.wast:215
assert_return(() => call($1, "f32_mul", []), 258);

// left-to-right.wast:215
assert_return(() => call($1, "f64_mul", []), 258);

// left-to-right.wast:216
assert_return(() => call($1, "f32_div", []), 258);

// left-to-right.wast:216
assert_return(() => call($1, "f64_div", []), 258);

// left-to-right.wast:217
assert_return(() => call($1, "f32_copysign", []), 258);

// left-to-right.wast:217
assert_return(() => call($1, "f64_copysign", []), 258);

// left-to-right.wast:218
assert_return(() => call($1, "f32_eq", []), 258);

// left-to-right.wast:218
assert_return(() => call($1, "f64_eq", []), 258);

// left-to-right.wast:219
assert_return(() => call($1, "f32_ne", []), 258);

// left-to-right.wast:219
assert_return(() => call($1, "f64_ne", []), 258);

// left-to-right.wast:220
assert_return(() => call($1, "f32_lt", []), 258);

// left-to-right.wast:220
assert_return(() => call($1, "f64_lt", []), 258);

// left-to-right.wast:221
assert_return(() => call($1, "f32_le", []), 258);

// left-to-right.wast:221
assert_return(() => call($1, "f64_le", []), 258);

// left-to-right.wast:222
assert_return(() => call($1, "f32_gt", []), 258);

// left-to-right.wast:222
assert_return(() => call($1, "f64_gt", []), 258);

// left-to-right.wast:223
assert_return(() => call($1, "f32_ge", []), 258);

// left-to-right.wast:223
assert_return(() => call($1, "f64_ge", []), 258);

// left-to-right.wast:224
assert_return(() => call($1, "f32_min", []), 258);

// left-to-right.wast:224
assert_return(() => call($1, "f64_min", []), 258);

// left-to-right.wast:225
assert_return(() => call($1, "f32_max", []), 258);

// left-to-right.wast:225
assert_return(() => call($1, "f64_max", []), 258);

// left-to-right.wast:226
assert_return(() => call($1, "f32_store", []), 258);

// left-to-right.wast:226
assert_return(() => call($1, "f64_store", []), 258);

// left-to-right.wast:227
assert_return(() => call($1, "f32_call", []), 258);

// left-to-right.wast:227
assert_return(() => call($1, "f64_call", []), 258);

// left-to-right.wast:228
assert_return(() => call($1, "f32_call_indirect", []), 66_052);

// left-to-right.wast:229
assert_return(() => call($1, "f64_call_indirect", []), 66_052);

// left-to-right.wast:230
assert_return(() => call($1, "f32_select", []), 66_053);

// left-to-right.wast:230
assert_return(() => call($1, "f64_select", []), 66_053);

// left-to-right.wast:232
assert_return(() => call($1, "br_if", []), 258);

// left-to-right.wast:233
assert_return(() => call($1, "br_table", []), 258);
