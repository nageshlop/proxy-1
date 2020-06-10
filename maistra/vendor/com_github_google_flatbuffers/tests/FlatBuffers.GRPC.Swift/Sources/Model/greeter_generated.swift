// automatically generated by the FlatBuffers compiler, do not modify

import FlatBuffers

public struct HelloReply: FlatBufferObject {

	static func validateVersion() { FlatBuffersVersion_1_12_0() }
	public var __buffer: ByteBuffer! { return _accessor.bb }

	private var _accessor: Table
	public static func getRootAsHelloReply(bb: ByteBuffer) -> HelloReply { return HelloReply(Table(bb: bb, position: Int32(bb.read(def: UOffset.self, position: bb.reader)) + Int32(bb.reader))) }

	private init(_ t: Table) { _accessor = t }
	public init(_ bb: ByteBuffer, o: Int32) { _accessor = Table(bb: bb, position: o) }

	public var message: String? { let o = _accessor.offset(4); return o == 0 ? nil : _accessor.string(at: o) }
	public var messageSegmentArray: [UInt8]? { return _accessor.getVector(at: 4) }
	public static func startHelloReply(_ fbb: inout FlatBufferBuilder) -> UOffset { fbb.startTable(with: 1) }
	public static func add(message: Offset<String>, _ fbb: inout FlatBufferBuilder) { fbb.add(offset: message, at: 0)  }
	public static func endHelloReply(_ fbb: inout FlatBufferBuilder, start: UOffset) -> Offset<UOffset> { let end = Offset<UOffset>(offset: fbb.endTable(at: start)); return end }
	public static func createHelloReply(_ fbb: inout FlatBufferBuilder,
		offsetOfMessage message: Offset<String> = Offset()) -> Offset<UOffset> {
		let __start = HelloReply.startHelloReply(&fbb)
		HelloReply.add(message: message, &fbb)
		return HelloReply.endHelloReply(&fbb, start: __start)
	}
}

public struct HelloRequest: FlatBufferObject {

	static func validateVersion() { FlatBuffersVersion_1_12_0() }
	public var __buffer: ByteBuffer! { return _accessor.bb }

	private var _accessor: Table
	public static func getRootAsHelloRequest(bb: ByteBuffer) -> HelloRequest { return HelloRequest(Table(bb: bb, position: Int32(bb.read(def: UOffset.self, position: bb.reader)) + Int32(bb.reader))) }

	private init(_ t: Table) { _accessor = t }
	public init(_ bb: ByteBuffer, o: Int32) { _accessor = Table(bb: bb, position: o) }

	public var name: String? { let o = _accessor.offset(4); return o == 0 ? nil : _accessor.string(at: o) }
	public var nameSegmentArray: [UInt8]? { return _accessor.getVector(at: 4) }
	public static func startHelloRequest(_ fbb: inout FlatBufferBuilder) -> UOffset { fbb.startTable(with: 1) }
	public static func add(name: Offset<String>, _ fbb: inout FlatBufferBuilder) { fbb.add(offset: name, at: 0)  }
	public static func endHelloRequest(_ fbb: inout FlatBufferBuilder, start: UOffset) -> Offset<UOffset> { let end = Offset<UOffset>(offset: fbb.endTable(at: start)); return end }
	public static func createHelloRequest(_ fbb: inout FlatBufferBuilder,
		offsetOfName name: Offset<String> = Offset()) -> Offset<UOffset> {
		let __start = HelloRequest.startHelloRequest(&fbb)
		HelloRequest.add(name: name, &fbb)
		return HelloRequest.endHelloRequest(&fbb, start: __start)
	}
}

public struct ManyHellosRequest: FlatBufferObject {

	static func validateVersion() { FlatBuffersVersion_1_12_0() }
	public var __buffer: ByteBuffer! { return _accessor.bb }

	private var _accessor: Table
	public static func getRootAsManyHellosRequest(bb: ByteBuffer) -> ManyHellosRequest { return ManyHellosRequest(Table(bb: bb, position: Int32(bb.read(def: UOffset.self, position: bb.reader)) + Int32(bb.reader))) }

	private init(_ t: Table) { _accessor = t }
	public init(_ bb: ByteBuffer, o: Int32) { _accessor = Table(bb: bb, position: o) }

	public var name: String? { let o = _accessor.offset(4); return o == 0 ? nil : _accessor.string(at: o) }
	public var nameSegmentArray: [UInt8]? { return _accessor.getVector(at: 4) }
	public var numGreetings: Int32 { let o = _accessor.offset(6); return o == 0 ? 0 : _accessor.readBuffer(of: Int32.self, at: o) }
	public static func startManyHellosRequest(_ fbb: inout FlatBufferBuilder) -> UOffset { fbb.startTable(with: 2) }
	public static func add(name: Offset<String>, _ fbb: inout FlatBufferBuilder) { fbb.add(offset: name, at: 0)  }
	public static func add(numGreetings: Int32, _ fbb: inout FlatBufferBuilder) { fbb.add(element: numGreetings, def: 0, at: 1) }
	public static func endManyHellosRequest(_ fbb: inout FlatBufferBuilder, start: UOffset) -> Offset<UOffset> { let end = Offset<UOffset>(offset: fbb.endTable(at: start)); return end }
	public static func createManyHellosRequest(_ fbb: inout FlatBufferBuilder,
		offsetOfName name: Offset<String> = Offset(),
		numGreetings: Int32 = 0) -> Offset<UOffset> {
		let __start = ManyHellosRequest.startManyHellosRequest(&fbb)
		ManyHellosRequest.add(name: name, &fbb)
		ManyHellosRequest.add(numGreetings: numGreetings, &fbb)
		return ManyHellosRequest.endManyHellosRequest(&fbb, start: __start)
	}
}

