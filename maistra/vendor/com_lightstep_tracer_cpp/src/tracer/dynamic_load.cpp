#include <opentracing/dynamic_load.h>
#include <cstdio>
#include <exception>
#include "tracer/lightstep_tracer_factory.h"

static int OpenTracingMakeTracerFactoryFunction(
    const char* opentracing_version, const char* opentracing_abi_version,
    const void** error_category, void* error_message,
    void** tracer_factory) try {
  if (opentracing_version == nullptr || opentracing_abi_version == nullptr ||
      error_message == nullptr || error_category == nullptr ||
      tracer_factory == nullptr) {
    fprintf(stderr,
            "`opentracing_version`, `opentracing_abi_version`, "
            "`error_message`, `error_category`, and `tracer_factory` must be "
            "non-null.\n");
    std::terminate();
  }

  if (std::strcmp(opentracing_abi_version, OPENTRACING_ABI_VERSION) != 0) {
    *error_category =
        static_cast<const void*>(&opentracing::dynamic_load_error_category());
    auto& message = *static_cast<std::string*>(error_message);
    message =
        "incompatible OpenTracing ABI versions; "
        "expected " OPENTRACING_ABI_VERSION " but got ";
    message.append(opentracing_abi_version);
    return opentracing::incompatible_library_versions_error.value();
  }

  *tracer_factory = new lightstep::LightStepTracerFactory{};

  return 0;
} catch (const std::bad_alloc&) {
  *error_category = static_cast<const void*>(&std::generic_category());
  return static_cast<int>(std::errc::not_enough_memory);
}

OPENTRACING_DECLARE_IMPL_FACTORY(OpenTracingMakeTracerFactoryFunction)
