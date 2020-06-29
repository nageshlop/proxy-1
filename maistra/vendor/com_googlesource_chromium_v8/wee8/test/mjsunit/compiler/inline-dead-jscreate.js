// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var bar = 0;

function baz() { return this; }

function foo() {
  bar += 1;
  if (bar === 2) throw new baz();
}

foo();
