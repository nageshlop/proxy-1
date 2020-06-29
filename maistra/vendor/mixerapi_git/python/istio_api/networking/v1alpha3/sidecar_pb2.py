# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: networking/v1alpha3/sidecar.proto

import sys
_b=sys.version_info[0]<3 and (lambda x:x) or (lambda x:x.encode('latin1'))
from google.protobuf.internal import enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from google.api import field_behavior_pb2 as google_dot_api_dot_field__behavior__pb2
from networking.v1alpha3 import gateway_pb2 as networking_dot_v1alpha3_dot_gateway__pb2


DESCRIPTOR = _descriptor.FileDescriptor(
  name='networking/v1alpha3/sidecar.proto',
  package='istio.networking.v1alpha3',
  syntax='proto3',
  serialized_options=_b('Z istio.io/api/networking/v1alpha3'),
  serialized_pb=_b('\n!networking/v1alpha3/sidecar.proto\x12\x19istio.networking.v1alpha3\x1a\x1fgoogle/api/field_behavior.proto\x1a!networking/v1alpha3/gateway.proto\"\xab\x02\n\x07Sidecar\x12\x46\n\x11workload_selector\x18\x01 \x01(\x0b\x32+.istio.networking.v1alpha3.WorkloadSelector\x12@\n\x07ingress\x18\x02 \x03(\x0b\x32/.istio.networking.v1alpha3.IstioIngressListener\x12\x43\n\x06\x65gress\x18\x03 \x03(\x0b\x32..istio.networking.v1alpha3.IstioEgressListenerB\x03\xe0\x41\x02\x12Q\n\x17outbound_traffic_policy\x18\x04 \x01(\x0b\x32\x30.istio.networking.v1alpha3.OutboundTrafficPolicy\"\xb5\x01\n\x14IstioIngressListener\x12\x32\n\x04port\x18\x01 \x01(\x0b\x32\x1f.istio.networking.v1alpha3.PortB\x03\xe0\x41\x02\x12\x0c\n\x04\x62ind\x18\x02 \x01(\t\x12<\n\x0c\x63\x61pture_mode\x18\x03 \x01(\x0e\x32&.istio.networking.v1alpha3.CaptureMode\x12\x1d\n\x10\x64\x65\x66\x61ult_endpoint\x18\x04 \x01(\tB\x03\xe0\x41\x02\"\xa4\x01\n\x13IstioEgressListener\x12-\n\x04port\x18\x01 \x01(\x0b\x32\x1f.istio.networking.v1alpha3.Port\x12\x0c\n\x04\x62ind\x18\x02 \x01(\t\x12<\n\x0c\x63\x61pture_mode\x18\x03 \x01(\x0e\x32&.istio.networking.v1alpha3.CaptureMode\x12\x12\n\x05hosts\x18\x04 \x03(\tB\x03\xe0\x41\x02\"\x8f\x01\n\x10WorkloadSelector\x12L\n\x06labels\x18\x01 \x03(\x0b\x32\x37.istio.networking.v1alpha3.WorkloadSelector.LabelsEntryB\x03\xe0\x41\x02\x1a-\n\x0bLabelsEntry\x12\x0b\n\x03key\x18\x01 \x01(\t\x12\r\n\x05value\x18\x02 \x01(\t:\x02\x38\x01\"\x86\x01\n\x15OutboundTrafficPolicy\x12\x43\n\x04mode\x18\x01 \x01(\x0e\x32\x35.istio.networking.v1alpha3.OutboundTrafficPolicy.Mode\"(\n\x04Mode\x12\x11\n\rREGISTRY_ONLY\x10\x00\x12\r\n\tALLOW_ANY\x10\x01*2\n\x0b\x43\x61ptureMode\x12\x0b\n\x07\x44\x45\x46\x41ULT\x10\x00\x12\x0c\n\x08IPTABLES\x10\x01\x12\x08\n\x04NONE\x10\x02\x42\"Z istio.io/api/networking/v1alpha3b\x06proto3')
  ,
  dependencies=[google_dot_api_dot_field__behavior__pb2.DESCRIPTOR,networking_dot_v1alpha3_dot_gateway__pb2.DESCRIPTOR,])

_CAPTUREMODE = _descriptor.EnumDescriptor(
  name='CaptureMode',
  full_name='istio.networking.v1alpha3.CaptureMode',
  filename=None,
  file=DESCRIPTOR,
  values=[
    _descriptor.EnumValueDescriptor(
      name='DEFAULT', index=0, number=0,
      serialized_options=None,
      type=None),
    _descriptor.EnumValueDescriptor(
      name='IPTABLES', index=1, number=1,
      serialized_options=None,
      type=None),
    _descriptor.EnumValueDescriptor(
      name='NONE', index=2, number=2,
      serialized_options=None,
      type=None),
  ],
  containing_type=None,
  serialized_options=None,
  serialized_start=1068,
  serialized_end=1118,
)
_sym_db.RegisterEnumDescriptor(_CAPTUREMODE)

CaptureMode = enum_type_wrapper.EnumTypeWrapper(_CAPTUREMODE)
DEFAULT = 0
IPTABLES = 1
NONE = 2


_OUTBOUNDTRAFFICPOLICY_MODE = _descriptor.EnumDescriptor(
  name='Mode',
  full_name='istio.networking.v1alpha3.OutboundTrafficPolicy.Mode',
  filename=None,
  file=DESCRIPTOR,
  values=[
    _descriptor.EnumValueDescriptor(
      name='REGISTRY_ONLY', index=0, number=0,
      serialized_options=None,
      type=None),
    _descriptor.EnumValueDescriptor(
      name='ALLOW_ANY', index=1, number=1,
      serialized_options=None,
      type=None),
  ],
  containing_type=None,
  serialized_options=None,
  serialized_start=1026,
  serialized_end=1066,
)
_sym_db.RegisterEnumDescriptor(_OUTBOUNDTRAFFICPOLICY_MODE)


_SIDECAR = _descriptor.Descriptor(
  name='Sidecar',
  full_name='istio.networking.v1alpha3.Sidecar',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='workload_selector', full_name='istio.networking.v1alpha3.Sidecar.workload_selector', index=0,
      number=1, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='ingress', full_name='istio.networking.v1alpha3.Sidecar.ingress', index=1,
      number=2, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='egress', full_name='istio.networking.v1alpha3.Sidecar.egress', index=2,
      number=3, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=_b('\340A\002'), file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='outbound_traffic_policy', full_name='istio.networking.v1alpha3.Sidecar.outbound_traffic_policy', index=3,
      number=4, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=133,
  serialized_end=432,
)


_ISTIOINGRESSLISTENER = _descriptor.Descriptor(
  name='IstioIngressListener',
  full_name='istio.networking.v1alpha3.IstioIngressListener',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='port', full_name='istio.networking.v1alpha3.IstioIngressListener.port', index=0,
      number=1, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=_b('\340A\002'), file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='bind', full_name='istio.networking.v1alpha3.IstioIngressListener.bind', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='capture_mode', full_name='istio.networking.v1alpha3.IstioIngressListener.capture_mode', index=2,
      number=3, type=14, cpp_type=8, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='default_endpoint', full_name='istio.networking.v1alpha3.IstioIngressListener.default_endpoint', index=3,
      number=4, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=_b('\340A\002'), file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=435,
  serialized_end=616,
)


_ISTIOEGRESSLISTENER = _descriptor.Descriptor(
  name='IstioEgressListener',
  full_name='istio.networking.v1alpha3.IstioEgressListener',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='port', full_name='istio.networking.v1alpha3.IstioEgressListener.port', index=0,
      number=1, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='bind', full_name='istio.networking.v1alpha3.IstioEgressListener.bind', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='capture_mode', full_name='istio.networking.v1alpha3.IstioEgressListener.capture_mode', index=2,
      number=3, type=14, cpp_type=8, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='hosts', full_name='istio.networking.v1alpha3.IstioEgressListener.hosts', index=3,
      number=4, type=9, cpp_type=9, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=_b('\340A\002'), file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=619,
  serialized_end=783,
)


_WORKLOADSELECTOR_LABELSENTRY = _descriptor.Descriptor(
  name='LabelsEntry',
  full_name='istio.networking.v1alpha3.WorkloadSelector.LabelsEntry',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='key', full_name='istio.networking.v1alpha3.WorkloadSelector.LabelsEntry.key', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='value', full_name='istio.networking.v1alpha3.WorkloadSelector.LabelsEntry.value', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=_b('8\001'),
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=884,
  serialized_end=929,
)

_WORKLOADSELECTOR = _descriptor.Descriptor(
  name='WorkloadSelector',
  full_name='istio.networking.v1alpha3.WorkloadSelector',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='labels', full_name='istio.networking.v1alpha3.WorkloadSelector.labels', index=0,
      number=1, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=_b('\340A\002'), file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[_WORKLOADSELECTOR_LABELSENTRY, ],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=786,
  serialized_end=929,
)


_OUTBOUNDTRAFFICPOLICY = _descriptor.Descriptor(
  name='OutboundTrafficPolicy',
  full_name='istio.networking.v1alpha3.OutboundTrafficPolicy',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='mode', full_name='istio.networking.v1alpha3.OutboundTrafficPolicy.mode', index=0,
      number=1, type=14, cpp_type=8, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
    _OUTBOUNDTRAFFICPOLICY_MODE,
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=932,
  serialized_end=1066,
)

_SIDECAR.fields_by_name['workload_selector'].message_type = _WORKLOADSELECTOR
_SIDECAR.fields_by_name['ingress'].message_type = _ISTIOINGRESSLISTENER
_SIDECAR.fields_by_name['egress'].message_type = _ISTIOEGRESSLISTENER
_SIDECAR.fields_by_name['outbound_traffic_policy'].message_type = _OUTBOUNDTRAFFICPOLICY
_ISTIOINGRESSLISTENER.fields_by_name['port'].message_type = networking_dot_v1alpha3_dot_gateway__pb2._PORT
_ISTIOINGRESSLISTENER.fields_by_name['capture_mode'].enum_type = _CAPTUREMODE
_ISTIOEGRESSLISTENER.fields_by_name['port'].message_type = networking_dot_v1alpha3_dot_gateway__pb2._PORT
_ISTIOEGRESSLISTENER.fields_by_name['capture_mode'].enum_type = _CAPTUREMODE
_WORKLOADSELECTOR_LABELSENTRY.containing_type = _WORKLOADSELECTOR
_WORKLOADSELECTOR.fields_by_name['labels'].message_type = _WORKLOADSELECTOR_LABELSENTRY
_OUTBOUNDTRAFFICPOLICY.fields_by_name['mode'].enum_type = _OUTBOUNDTRAFFICPOLICY_MODE
_OUTBOUNDTRAFFICPOLICY_MODE.containing_type = _OUTBOUNDTRAFFICPOLICY
DESCRIPTOR.message_types_by_name['Sidecar'] = _SIDECAR
DESCRIPTOR.message_types_by_name['IstioIngressListener'] = _ISTIOINGRESSLISTENER
DESCRIPTOR.message_types_by_name['IstioEgressListener'] = _ISTIOEGRESSLISTENER
DESCRIPTOR.message_types_by_name['WorkloadSelector'] = _WORKLOADSELECTOR
DESCRIPTOR.message_types_by_name['OutboundTrafficPolicy'] = _OUTBOUNDTRAFFICPOLICY
DESCRIPTOR.enum_types_by_name['CaptureMode'] = _CAPTUREMODE
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

Sidecar = _reflection.GeneratedProtocolMessageType('Sidecar', (_message.Message,), {
  'DESCRIPTOR' : _SIDECAR,
  '__module__' : 'networking.v1alpha3.sidecar_pb2'
  # @@protoc_insertion_point(class_scope:istio.networking.v1alpha3.Sidecar)
  })
_sym_db.RegisterMessage(Sidecar)

IstioIngressListener = _reflection.GeneratedProtocolMessageType('IstioIngressListener', (_message.Message,), {
  'DESCRIPTOR' : _ISTIOINGRESSLISTENER,
  '__module__' : 'networking.v1alpha3.sidecar_pb2'
  # @@protoc_insertion_point(class_scope:istio.networking.v1alpha3.IstioIngressListener)
  })
_sym_db.RegisterMessage(IstioIngressListener)

IstioEgressListener = _reflection.GeneratedProtocolMessageType('IstioEgressListener', (_message.Message,), {
  'DESCRIPTOR' : _ISTIOEGRESSLISTENER,
  '__module__' : 'networking.v1alpha3.sidecar_pb2'
  # @@protoc_insertion_point(class_scope:istio.networking.v1alpha3.IstioEgressListener)
  })
_sym_db.RegisterMessage(IstioEgressListener)

WorkloadSelector = _reflection.GeneratedProtocolMessageType('WorkloadSelector', (_message.Message,), {

  'LabelsEntry' : _reflection.GeneratedProtocolMessageType('LabelsEntry', (_message.Message,), {
    'DESCRIPTOR' : _WORKLOADSELECTOR_LABELSENTRY,
    '__module__' : 'networking.v1alpha3.sidecar_pb2'
    # @@protoc_insertion_point(class_scope:istio.networking.v1alpha3.WorkloadSelector.LabelsEntry)
    })
  ,
  'DESCRIPTOR' : _WORKLOADSELECTOR,
  '__module__' : 'networking.v1alpha3.sidecar_pb2'
  # @@protoc_insertion_point(class_scope:istio.networking.v1alpha3.WorkloadSelector)
  })
_sym_db.RegisterMessage(WorkloadSelector)
_sym_db.RegisterMessage(WorkloadSelector.LabelsEntry)

OutboundTrafficPolicy = _reflection.GeneratedProtocolMessageType('OutboundTrafficPolicy', (_message.Message,), {
  'DESCRIPTOR' : _OUTBOUNDTRAFFICPOLICY,
  '__module__' : 'networking.v1alpha3.sidecar_pb2'
  # @@protoc_insertion_point(class_scope:istio.networking.v1alpha3.OutboundTrafficPolicy)
  })
_sym_db.RegisterMessage(OutboundTrafficPolicy)


DESCRIPTOR._options = None
_SIDECAR.fields_by_name['egress']._options = None
_ISTIOINGRESSLISTENER.fields_by_name['port']._options = None
_ISTIOINGRESSLISTENER.fields_by_name['default_endpoint']._options = None
_ISTIOEGRESSLISTENER.fields_by_name['hosts']._options = None
_WORKLOADSELECTOR_LABELSENTRY._options = None
_WORKLOADSELECTOR.fields_by_name['labels']._options = None
# @@protoc_insertion_point(module_scope)
