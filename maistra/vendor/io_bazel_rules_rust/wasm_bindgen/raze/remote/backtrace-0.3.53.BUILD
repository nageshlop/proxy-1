"""
@generated
cargo-raze crate build file.

DO NOT EDIT! Replaced on runs of cargo-raze
"""

# buildifier: disable=load
load(
    "@io_bazel_rules_rust//rust:rust.bzl",
    "rust_binary",
    "rust_library",
    "rust_test",
)

# buildifier: disable=load
load("@bazel_skylib//lib:selects.bzl", "selects")

package(default_visibility = [
    # Public for visibility by "@raze__crate__version//" targets.
    #
    # Prefer access through "//wasm_bindgen/raze", which limits external
    # visibility to explicit Cargo.toml dependencies.
    "//visibility:public",
])

licenses([
    "notice",  # MIT from expression "MIT OR Apache-2.0"
])

# Generated targets
# Unsupported target "accuracy" with type "test" omitted
# Unsupported target "backtrace" with type "example" omitted

# buildifier: leave-alone
rust_library(
    name = "backtrace",
    crate_type = "lib",
    deps = [
        "@rules_rust_wasm_bindgen__addr2line__0_13_0//:addr2line",
        "@rules_rust_wasm_bindgen__cfg_if__1_0_0//:cfg_if",
        "@rules_rust_wasm_bindgen__libc__0_2_79//:libc",
        "@rules_rust_wasm_bindgen__miniz_oxide__0_4_3//:miniz_oxide",
        "@rules_rust_wasm_bindgen__object__0_21_1//:object",
        "@rules_rust_wasm_bindgen__rustc_demangle__0_1_17//:rustc_demangle",
    ] + selects.with_or({
        # cfg(windows)
        (
            "@io_bazel_rules_rust//rust/platform:i686-pc-windows-gnu",
            "@io_bazel_rules_rust//rust/platform:x86_64-pc-windows-gnu",
        ): [
        ],
        "//conditions:default": [],
    }),
    srcs = glob(["**/*.rs"]),
    crate_root = "src/lib.rs",
    edition = "2018",
    rustc_flags = [
        "--cap-lints=allow",
    ],
    version = "0.3.53",
    tags = [
        "cargo-raze",
        "manual",
    ],
    crate_features = [
        "addr2line",
        "default",
        "gimli-symbolize",
        "miniz_oxide",
        "object",
        "std",
    ],
    aliases = {
    },
)
# Unsupported target "benchmarks" with type "bench" omitted
# Unsupported target "concurrent-panics" with type "test" omitted
# Unsupported target "long_fn_name" with type "test" omitted
# Unsupported target "raw" with type "example" omitted
# Unsupported target "skip_inner_frames" with type "test" omitted
# Unsupported target "smoke" with type "test" omitted
