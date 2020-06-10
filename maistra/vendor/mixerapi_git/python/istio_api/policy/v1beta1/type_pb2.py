# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: policy/v1beta1/type.proto

import sys
_b=sys.version_info[0]<3 and (lambda x:x) or (lambda x:x.encode('latin1'))
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from google.protobuf import duration_pb2 as google_dot_protobuf_dot_duration__pb2
from google.protobuf import timestamp_pb2 as google_dot_protobuf_dot_timestamp__pb2


DESCRIPTOR = _descriptor.FileDescriptor(
  name='policy/v1beta1/type.proto',
  package='istio.policy.v1beta1',
  syntax='proto3',
  serialized_options=_b('Z\033istio.io/api/policy/v1beta1'),
  serialized_pb=_b('\n\x19policy/v1beta1/type.proto\x12\x14istio.policy.v1beta1\x1a\x1egoogle/protobuf/duration.proto\x1a\x1fgoogle/protobuf/timestamp.proto\"\x89\x04\n\x05Value\x12\x16\n\x0cstring_value\x18\x01 \x01(\tH\x00\x12\x15\n\x0bint64_value\x18\x02 \x01(\x03H\x00\x12\x16\n\x0c\x64ouble_value\x18\x03 \x01(\x01H\x00\x12\x14\n\nbool_value\x18\x04 \x01(\x08H\x00\x12;\n\x10ip_address_value\x18\x05 \x01(\x0b\x32\x1f.istio.policy.v1beta1.IPAddressH\x00\x12:\n\x0ftimestamp_value\x18\x06 \x01(\x0b\x32\x1f.istio.policy.v1beta1.TimeStampH\x00\x12\x38\n\x0e\x64uration_value\x18\x07 \x01(\x0b\x32\x1e.istio.policy.v1beta1.DurationH\x00\x12\x41\n\x13\x65mail_address_value\x18\x08 \x01(\x0b\x32\".istio.policy.v1beta1.EmailAddressH\x00\x12\x37\n\x0e\x64ns_name_value\x18\t \x01(\x0b\x32\x1d.istio.policy.v1beta1.DNSNameH\x00\x12.\n\turi_value\x18\n \x01(\x0b\x32\x19.istio.policy.v1beta1.UriH\x00\x12;\n\x10string_map_value\x18\x0b \x01(\x0b\x32\x1f.istio.policy.v1beta1.StringMapH\x00\x42\x07\n\x05value\"\x1a\n\tIPAddress\x12\r\n\x05value\x18\x01 \x01(\x0c\"4\n\x08\x44uration\x12(\n\x05value\x18\x01 \x01(\x0b\x32\x19.google.protobuf.Duration\"6\n\tTimeStamp\x12)\n\x05value\x18\x01 \x01(\x0b\x32\x1a.google.protobuf.Timestamp\"\x18\n\x07\x44NSName\x12\r\n\x05value\x18\x01 \x01(\t\"t\n\tStringMap\x12\x39\n\x05value\x18\x01 \x03(\x0b\x32*.istio.policy.v1beta1.StringMap.ValueEntry\x1a,\n\nValueEntry\x12\x0b\n\x03key\x18\x01 \x01(\t\x12\r\n\x05value\x18\x02 \x01(\t:\x02\x38\x01\"\x1d\n\x0c\x45mailAddress\x12\r\n\x05value\x18\x01 \x01(\t\"\x14\n\x03Uri\x12\r\n\x05value\x18\x01 \x01(\tB\x1dZ\x1bistio.io/api/policy/v1beta1b\x06proto3')
  ,
  dependencies=[google_dot_protobuf_dot_duration__pb2.DESCRIPTOR,google_dot_protobuf_dot_timestamp__pb2.DESCRIPTOR,])




_VALUE = _descriptor.Descriptor(
  name='Value',
  full_name='istio.policy.v1beta1.Value',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='string_value', full_name='istio.policy.v1beta1.Value.string_value', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='int64_value', full_name='istio.policy.v1beta1.Value.int64_value', index=1,
      number=2, type=3, cpp_type=2, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='double_value', full_name='istio.policy.v1beta1.Value.double_value', index=2,
      number=3, type=1, cpp_type=5, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='bool_value', full_name='istio.policy.v1beta1.Value.bool_value', index=3,
      number=4, type=8, cpp_type=7, label=1,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='ip_address_value', full_name='istio.policy.v1beta1.Value.ip_address_value', index=4,
      number=5, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='timestamp_value', full_name='istio.policy.v1beta1.Value.timestamp_value', index=5,
      number=6, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='duration_value', full_name='istio.policy.v1beta1.Value.duration_value', index=6,
      number=7, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='email_address_value', full_name='istio.policy.v1beta1.Value.email_address_value', index=7,
      number=8, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='dns_name_value', full_name='istio.policy.v1beta1.Value.dns_name_value', index=8,
      number=9, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='uri_value', full_name='istio.policy.v1beta1.Value.uri_value', index=9,
      number=10, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='string_map_value', full_name='istio.policy.v1beta1.Value.string_map_value', index=10,
      number=11, type=11, cpp_type=10, label=1,
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
    _descriptor.OneofDescriptor(
      name='value', full_name='istio.policy.v1beta1.Value.value',
      index=0, containing_type=None, fields=[]),
  ],
  serialized_start=117,
  serialized_end=638,
)


_IPADDRESS = _descriptor.Descriptor(
  name='IPAddress',
  full_name='istio.policy.v1beta1.IPAddress',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='value', full_name='istio.policy.v1beta1.IPAddress.value', index=0,
      number=1, type=12, cpp_type=9, label=1,
      has_default_value=False, default_value=_b(""),
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
  serialized_start=640,
  serialized_end=666,
)


_DURATION = _descriptor.Descriptor(
  name='Duration',
  full_name='istio.policy.v1beta1.Duration',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='value', full_name='istio.policy.v1beta1.Duration.value', index=0,
      number=1, type=11, cpp_type=10, label=1,
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
  serialized_start=668,
  serialized_end=720,
)


_TIMESTAMP = _descriptor.Descriptor(
  name='TimeStamp',
  full_name='istio.policy.v1beta1.TimeStamp',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='value', full_name='istio.policy.v1beta1.TimeStamp.value', index=0,
      number=1, type=11, cpp_type=10, label=1,
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
  serialized_start=722,
  serialized_end=776,
)


_DNSNAME = _descriptor.Descriptor(
  name='DNSName',
  full_name='istio.policy.v1beta1.DNSName',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='value', full_name='istio.policy.v1beta1.DNSName.value', index=0,
      number=1, type=9, cpp_type=9, label=1,
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
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=778,
  serialized_end=802,
)


_STRINGMAP_VALUEENTRY = _descriptor.Descriptor(
  name='ValueEntry',
  full_name='istio.policy.v1beta1.StringMap.ValueEntry',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='key', full_name='istio.policy.v1beta1.StringMap.ValueEntry.key', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='value', full_name='istio.policy.v1beta1.StringMap.ValueEntry.value', index=1,
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
  serialized_start=876,
  serialized_end=920,
)

_STRINGMAP = _descriptor.Descriptor(
  name='StringMap',
  full_name='istio.policy.v1beta1.StringMap',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='value', full_name='istio.policy.v1beta1.StringMap.value', index=0,
      number=1, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[_STRINGMAP_VALUEENTRY, ],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=804,
  serialized_end=920,
)


_EMAILADDRESS = _descriptor.Descriptor(
  name='EmailAddress',
  full_name='istio.policy.v1beta1.EmailAddress',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='value', full_name='istio.policy.v1beta1.EmailAddress.value', index=0,
      number=1, type=9, cpp_type=9, label=1,
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
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=922,
  serialized_end=951,
)


_URI = _descriptor.Descriptor(
  name='Uri',
  full_name='istio.policy.v1beta1.Uri',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='value', full_name='istio.policy.v1beta1.Uri.value', index=0,
      number=1, type=9, cpp_type=9, label=1,
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
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=953,
  serialized_end=973,
)

_VALUE.fields_by_name['ip_address_value'].message_type = _IPADDRESS
_VALUE.fields_by_name['timestamp_value'].message_type = _TIMESTAMP
_VALUE.fields_by_name['duration_value'].message_type = _DURATION
_VALUE.fields_by_name['email_address_value'].message_type = _EMAILADDRESS
_VALUE.fields_by_name['dns_name_value'].message_type = _DNSNAME
_VALUE.fields_by_name['uri_value'].message_type = _URI
_VALUE.fields_by_name['string_map_value'].message_type = _STRINGMAP
_VALUE.oneofs_by_name['value'].fields.append(
  _VALUE.fields_by_name['string_value'])
_VALUE.fields_by_name['string_value'].containing_oneof = _VALUE.oneofs_by_name['value']
_VALUE.oneofs_by_name['value'].fields.append(
  _VALUE.fields_by_name['int64_value'])
_VALUE.fields_by_name['int64_value'].containing_oneof = _VALUE.oneofs_by_name['value']
_VALUE.oneofs_by_name['value'].fields.append(
  _VALUE.fields_by_name['double_value'])
_VALUE.fields_by_name['double_value'].containing_oneof = _VALUE.oneofs_by_name['value']
_VALUE.oneofs_by_name['value'].fields.append(
  _VALUE.fields_by_name['bool_value'])
_VALUE.fields_by_name['bool_value'].containing_oneof = _VALUE.oneofs_by_name['value']
_VALUE.oneofs_by_name['value'].fields.append(
  _VALUE.fields_by_name['ip_address_value'])
_VALUE.fields_by_name['ip_address_value'].containing_oneof = _VALUE.oneofs_by_name['value']
_VALUE.oneofs_by_name['value'].fields.append(
  _VALUE.fields_by_name['timestamp_value'])
_VALUE.fields_by_name['timestamp_value'].containing_oneof = _VALUE.oneofs_by_name['value']
_VALUE.oneofs_by_name['value'].fields.append(
  _VALUE.fields_by_name['duration_value'])
_VALUE.fields_by_name['duration_value'].containing_oneof = _VALUE.oneofs_by_name['value']
_VALUE.oneofs_by_name['value'].fields.append(
  _VALUE.fields_by_name['email_address_value'])
_VALUE.fields_by_name['email_address_value'].containing_oneof = _VALUE.oneofs_by_name['value']
_VALUE.oneofs_by_name['value'].fields.append(
  _VALUE.fields_by_name['dns_name_value'])
_VALUE.fields_by_name['dns_name_value'].containing_oneof = _VALUE.oneofs_by_name['value']
_VALUE.oneofs_by_name['value'].fields.append(
  _VALUE.fields_by_name['uri_value'])
_VALUE.fields_by_name['uri_value'].containing_oneof = _VALUE.oneofs_by_name['value']
_VALUE.oneofs_by_name['value'].fields.append(
  _VALUE.fields_by_name['string_map_value'])
_VALUE.fields_by_name['string_map_value'].containing_oneof = _VALUE.oneofs_by_name['value']
_DURATION.fields_by_name['value'].message_type = google_dot_protobuf_dot_duration__pb2._DURATION
_TIMESTAMP.fields_by_name['value'].message_type = google_dot_protobuf_dot_timestamp__pb2._TIMESTAMP
_STRINGMAP_VALUEENTRY.containing_type = _STRINGMAP
_STRINGMAP.fields_by_name['value'].message_type = _STRINGMAP_VALUEENTRY
DESCRIPTOR.message_types_by_name['Value'] = _VALUE
DESCRIPTOR.message_types_by_name['IPAddress'] = _IPADDRESS
DESCRIPTOR.message_types_by_name['Duration'] = _DURATION
DESCRIPTOR.message_types_by_name['TimeStamp'] = _TIMESTAMP
DESCRIPTOR.message_types_by_name['DNSName'] = _DNSNAME
DESCRIPTOR.message_types_by_name['StringMap'] = _STRINGMAP
DESCRIPTOR.message_types_by_name['EmailAddress'] = _EMAILADDRESS
DESCRIPTOR.message_types_by_name['Uri'] = _URI
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

Value = _reflection.GeneratedProtocolMessageType('Value', (_message.Message,), {
  'DESCRIPTOR' : _VALUE,
  '__module__' : 'policy.v1beta1.type_pb2'
  # @@protoc_insertion_point(class_scope:istio.policy.v1beta1.Value)
  })
_sym_db.RegisterMessage(Value)

IPAddress = _reflection.GeneratedProtocolMessageType('IPAddress', (_message.Message,), {
  'DESCRIPTOR' : _IPADDRESS,
  '__module__' : 'policy.v1beta1.type_pb2'
  # @@protoc_insertion_point(class_scope:istio.policy.v1beta1.IPAddress)
  })
_sym_db.RegisterMessage(IPAddress)

Duration = _reflection.GeneratedProtocolMessageType('Duration', (_message.Message,), {
  'DESCRIPTOR' : _DURATION,
  '__module__' : 'policy.v1beta1.type_pb2'
  # @@protoc_insertion_point(class_scope:istio.policy.v1beta1.Duration)
  })
_sym_db.RegisterMessage(Duration)

TimeStamp = _reflection.GeneratedProtocolMessageType('TimeStamp', (_message.Message,), {
  'DESCRIPTOR' : _TIMESTAMP,
  '__module__' : 'policy.v1beta1.type_pb2'
  # @@protoc_insertion_point(class_scope:istio.policy.v1beta1.TimeStamp)
  })
_sym_db.RegisterMessage(TimeStamp)

DNSName = _reflection.GeneratedProtocolMessageType('DNSName', (_message.Message,), {
  'DESCRIPTOR' : _DNSNAME,
  '__module__' : 'policy.v1beta1.type_pb2'
  # @@protoc_insertion_point(class_scope:istio.policy.v1beta1.DNSName)
  })
_sym_db.RegisterMessage(DNSName)

StringMap = _reflection.GeneratedProtocolMessageType('StringMap', (_message.Message,), {

  'ValueEntry' : _reflection.GeneratedProtocolMessageType('ValueEntry', (_message.Message,), {
    'DESCRIPTOR' : _STRINGMAP_VALUEENTRY,
    '__module__' : 'policy.v1beta1.type_pb2'
    # @@protoc_insertion_point(class_scope:istio.policy.v1beta1.StringMap.ValueEntry)
    })
  ,
  'DESCRIPTOR' : _STRINGMAP,
  '__module__' : 'policy.v1beta1.type_pb2'
  # @@protoc_insertion_point(class_scope:istio.policy.v1beta1.StringMap)
  })
_sym_db.RegisterMessage(StringMap)
_sym_db.RegisterMessage(StringMap.ValueEntry)

EmailAddress = _reflection.GeneratedProtocolMessageType('EmailAddress', (_message.Message,), {
  'DESCRIPTOR' : _EMAILADDRESS,
  '__module__' : 'policy.v1beta1.type_pb2'
  # @@protoc_insertion_point(class_scope:istio.policy.v1beta1.EmailAddress)
  })
_sym_db.RegisterMessage(EmailAddress)

Uri = _reflection.GeneratedProtocolMessageType('Uri', (_message.Message,), {
  'DESCRIPTOR' : _URI,
  '__module__' : 'policy.v1beta1.type_pb2'
  # @@protoc_insertion_point(class_scope:istio.policy.v1beta1.Uri)
  })
_sym_db.RegisterMessage(Uri)


DESCRIPTOR._options = None
_STRINGMAP_VALUEENTRY._options = None
# @@protoc_insertion_point(module_scope)
