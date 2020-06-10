// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: networking/v1alpha3/envoy_filter.proto

// `EnvoyFilter` provides a mechanism to customize the Envoy
// configuration generated by Istio Pilot. Use EnvoyFilter to modify
// values for certain fields, add specific filters, or even add
// entirely new listeners, clusters, etc. This feature must be used
// with care, as incorrect configurations could potentially
// destabilize the entire mesh. Unlike other Istio networking objects,
// EnvoyFilters are additively applied. Any number of EnvoyFilters can
// exist for a given workload in a specific namespace. The order of
// application of these EnvoyFilters is as follows: all EnvoyFilters
// in the config [root
// namespace](https://istio.io/docs/reference/config/istio.mesh.v1alpha1/#MeshConfig),
// followed by all matching EnvoyFilters in the workload's namespace.
//
// **NOTE 1**: Since this is break glass configuration, there will not
// be any backward compatibility across different Istio releases. In
// other words, this configuration is subject to change based on
// internal implementation of Istio networking subsystem.
//
// **NOTE 2**: The envoy configuration provided through this mechanism
// should be carefully monitored across Istio proxy version upgrades,
// to ensure that deprecated fields are removed and replaced
// appropriately.
//
// **NOTE 3**: When multiple EnvoyFilters are bound to the same
// workload in a given namespace, all patches will be processed
// sequentially in order of creation time.  The behavior is undefined
// if multiple EnvoyFilter configurations conflict with each other.
//
// **NOTE 4**: *_To apply an EnvoyFilter resource to all workloads
// (sidecars and gateways) in the system, define the resource in the
// config [root
// namespace](https://istio.io/docs/reference/config/istio.mesh.v1alpha1/#MeshConfig),
// without a workloadSelector.
//
// The example below declares a global default EnvoyFilter resource in
// the root namespace called `istio-config`, that adds a custom
// protocol filter on all sidecars in the system, for outbound port
// 9307. The filter should be added before the terminating tcp_proxy
// filter to take effect. In addition, it sets a 30s idle timeout for
// all HTTP connections in both gateays and sidecars.
//
// ```yaml
// apiVersion: networking.istio.io/v1alpha3
// kind: EnvoyFilter
// metadata:
//   name: custom-protocol
//   namespace: istio-config # as defined in meshConfig resource.
// spec:
//   configPatches:
//   - applyTo: NETWORK_FILTER
//     match:
//       context: SIDECAR_OUTBOUND # will match outbound listeners in all sidecars
//       listener:
//         portNumber: 9307
//         filterChain:
//           filter:
//             name: "envoy.tcp_proxy"
//     patch:
//       operation: INSERT_BEFORE
//       value:
//         name: "envoy.config.filter.network.custom_protocol"
//         config:
//          ...
//   - applyTo: NETWORK_FILTER # http connection manager is a filter in Envoy
//     match:
//       # context omitted so that this applies to both sidecars and gateways
//       listener:
//         filterChain:
//           filter:
//             name: "envoy.http_connection_manager"
//     patch:
//       operation: MERGE
//       value:
//         typed_config:
//           "@type": "type.googleapis.com/envoy.config.filter.network.http_connection_manager.v2.HttpConnectionManager"
//           idle_timeout: 30s
//```
//
// The following example enables Envoy's Lua filter for all inbound
// HTTP calls arriving at service port 8080 of the reviews service pod
// with labels "app: reviews", in the bookinfo namespace. The lua
// filter calls out to an external service internal.org.net:8888 that
// requires a special cluster definition in envoy. The cluster is also
// added to the sidecar as part of this configuration.
//
// ```yaml
// apiVersion: networking.istio.io/v1alpha3
// kind: EnvoyFilter
// metadata:
//   name: reviews-lua
//   namespace: bookinfo
// spec:
//   workloadSelector:
//     labels:
//       app: reviews
//   configPatches:
//     # The first patch adds the lua filter to the listener/http connection manager
//   - applyTo: HTTP_FILTER
//     match:
//       context: SIDECAR_INBOUND
//       listener:
//         portNumber: 8080
//         filterChain:
//           filter:
//             name: "envoy.http_connection_manager"
//             subFilter:
//               name: "envoy.router"
//     patch:
//       operation: INSERT_BEFORE
//       value: # lua filter specification
//        name: envoy.lua
//        config:
//          inlineCode: |
//            function envoy_on_request(request_handle)
//              -- Make an HTTP call to an upstream host with the following headers, body, and timeout.
//              local headers, body = request_handle:httpCall(
//               "lua_cluster",
//               {
//                [":method"] = "POST",
//                [":path"] = "/acl",
//                [":authority"] = "internal.org.net"
//               },
//              "authorize call",
//              5000)
//            end
//   # The second patch adds the cluster that is referenced by the lua code
//   # cds match is omitted as a new cluster is being added
//   - applyTo: CLUSTER
//     match:
//       context: SIDECAR_OUTBOUND
//     patch:
//       operation: ADD
//       value: # cluster specification
//         name: "lua_cluster"
//         type: STRICT_DNS
//         connect_timeout: 0.5s
//         lb_policy: ROUND_ROBIN
//         hosts:
//         - socket_address:
//             protocol: TCP
//             address: "internal.org.net"
//             port_value: 8888
//
// ```
//
// The following example overwrites certain fields (HTTP idle timeout
// and X-Forward-For trusted hops) in the HTTP connection manager in a
// listener on the ingress gateway in istio-system namespace for the
// SNI host app.example.com:
//
// ```yaml
// apiVersion: networking.istio.io/v1alpha3
// kind: EnvoyFilter
// metadata:
//   name: hcm-tweaks
//   namespace: istio-system
// spec:
//   workloadSelector:
//     labels:
//       istio: ingress-gateway
//   configPatches:
//   - applyTo: NETWORK_FILTER # http connection manager is a filter in Envoy
//     match:
//       context: GATEWAY
//       listener:
//         filterChain:
//           sni: app.example.com
//           filter:
//             name: "envoy.http_connection_manager"
//     patch:
//       operation: MERGE
//       value:
//         idle_timeout: 30s
//         xff_num_trusted_hops: 5
//```
//

package v1alpha3

import (
	fmt "fmt"
	proto "github.com/gogo/protobuf/proto"
	_ "github.com/gogo/protobuf/types"
	_ "istio.io/gogo-genproto/googleapis/google/api"
	math "math"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// DeepCopyInto supports using EnvoyFilter within kubernetes types, where deepcopy-gen is used.
func (in *EnvoyFilter) DeepCopyInto(out *EnvoyFilter) {
	proto.Merge(out, in)
}
