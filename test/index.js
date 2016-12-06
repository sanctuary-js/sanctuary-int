'use strict';

var assert = require('assert');

var jsc = require('jsverify');
var $ = require('sanctuary-def');
var Z = require('sanctuary-type-classes');

var int = require('..');


var Int = int.Int;
var NonZeroInt = int.NonZeroInt;
var add = int.add;
var sub = int.sub;
var mul = int.mul;
var quot = int.quot;
var rem = int.rem;
var div = int.div;
var mod = int.mod;
var and = int.and;
var or = int.or;
var xor = int.xor;
var not = int.not;
var even = int.even;
var odd = int.odd;

function eq(actual, expected) {
  assert.strictEqual(arguments.length, eq.length);
  assert.strictEqual(Z.toString(actual), Z.toString(expected));
  assert.strictEqual(Z.equals(actual, expected), true);
}

//  binary :: String -> Number
function binary(s) { return parseInt(s, 2); }

//  isInt :: Any -> Boolean
function isInt(x) {
  return $.test($.env, Int, x);
}

//  isNonZeroInt :: Any -> Boolean
function isNonZeroInt(x) {
  return $.test($.env, NonZeroInt, x);
}

//  maxInt :: Int
var maxInt = Math.pow(2, 31) - 1;

//  minInt :: Int
var minInt = -Math.pow(2, 31);


describe('Int', function() {

  it('is a nullary type', function() {
    eq(Int.name, 'sanctuary-int/Int');
    eq(Int.url, 'https://github.com/sanctuary-js/sanctuary-int#Int');
    eq(Int.toString(), 'Int');
  });

  it('represents integers in the range [-2^31 .. 2^31)', function() {
    eq(isInt(0), true);
    eq(isInt(1), true);
    eq(isInt(-0), true);
    eq(isInt(-1), true);
    eq(isInt(maxInt), true);
    eq(isInt(minInt), true);

    eq(isInt('42'), false);
    eq(isInt(12.34), false);
    eq(isInt(maxInt + 1), false);
    eq(isInt(minInt - 1), false);
    eq(isInt(Infinity), false);
    eq(isInt(-Infinity), false);
    eq(isInt(NaN), false);
    eq(isInt(new Number(0)), false);
  });

});

describe('NonZeroInt', function() {

  it('is a nullary type', function() {
    eq(NonZeroInt.name, 'sanctuary-int/NonZeroInt');
    eq(NonZeroInt.url, 'https://github.com/sanctuary-js/sanctuary-int#NonZeroInt');
    eq(NonZeroInt.toString(), 'NonZeroInt');
  });

  it('represents non-zero integers in the range [-2^31 .. 2^31)', function() {
    eq(isNonZeroInt(0), false);
    eq(isNonZeroInt(1), true);
    eq(isNonZeroInt(-0), false);
    eq(isNonZeroInt(-1), true);
    eq(isNonZeroInt(maxInt), true);
    eq(isNonZeroInt(minInt), true);

    eq(isNonZeroInt('42'), false);
    eq(isNonZeroInt(12.34), false);
    eq(isNonZeroInt(maxInt + 1), false);
    eq(isNonZeroInt(minInt - 1), false);
    eq(isNonZeroInt(Infinity), false);
    eq(isNonZeroInt(-Infinity), false);
    eq(isNonZeroInt(NaN), false);
    eq(isNonZeroInt(new Number(0)), false);
    eq(isNonZeroInt(new Number(1)), false);
  });

});

describe('add', function() {

  it('is a binary function', function() {
    eq(typeof add, 'function');
    eq(add.length, 2);
    eq(add.toString(), 'add :: Int -> Int -> Int');
  });

  it('returns the sum', function() {
    eq(add(1, 2), 3);
  });

  it('has identity element (zero)', function() {
    jsc.assert(jsc.forall(jsc.int32, function(x) {
      return Z.equals(add(x, 0), x) &&
             Z.equals(add(0, x), x);
    }));
  });

  it('is commutative', function() {
    jsc.assert(jsc.forall(jsc.int32, jsc.int32, function(x, y) {
      // The sum may be outside the valid range.
      return !isInt(x + y) ||
             Z.equals(add(x, y),
                      add(y, x));
    }));
  });

  it('is associative', function() {
    jsc.assert(jsc.forall(jsc.int32, jsc.int32, jsc.int32, function(x, y, z) {
      // The sum may be outside the valid range.
      return !isInt(x + y) ||
             !isInt(y + z) ||
             !isInt(x + y + z) ||
             Z.equals(add(add(x, y), z),
                      add(x, add(y, z)));
    }));
  });

});

describe('sub', function() {

  it('is a binary function', function() {
    eq(typeof sub, 'function');
    eq(sub.length, 2);
    eq(sub.toString(), 'sub :: Int -> Int -> Int');
  });

  it('returns the difference', function() {
    eq(sub(1, 2), -1);
  });

  it('has right identity element (zero)', function() {
    jsc.assert(jsc.forall(jsc.int32, function(x) {
      return Z.equals(sub(x, 0), x) &&
             Z.equals(sub(x, x), 0);
    }));
  });

});

describe('mul', function() {

  it('is a binary function', function() {
    eq(typeof mul, 'function');
    eq(mul.length, 2);
    eq(mul.toString(), 'mul :: Int -> Int -> Int');
  });

  it('returns the product', function() {
    eq(mul(6, 7), 42);
  });

  it('has identity element (one)', function() {
    jsc.assert(jsc.forall(jsc.int32, function(x) {
      return Z.equals(mul(x, 1), x) &&
             Z.equals(mul(1, x), x);
    }));
  });

  it('is commutative', function() {
    jsc.assert(jsc.forall(jsc.int32, jsc.int32, function(x, y) {
      // The product may be outside the valid range.
      return !isInt(x * y) ||
             Z.equals(mul(x, y),
                      mul(y, x));
    }));
  });

  it('is associative', function() {
    jsc.assert(jsc.forall(jsc.int32, jsc.int32, jsc.int32, function(x, y, z) {
      // The product may be outside the valid range.
      return !isInt(x * y) ||
             !isInt(y * z) ||
             !isInt(x * y * z) ||
             Z.equals(mul(mul(x, y), z),
                      mul(x, mul(y, z)));
    }));
  });

});

describe('quot', function() {

  it('is a binary function', function() {
    eq(typeof quot, 'function');
    eq(quot.length, 2);
    eq(quot.toString(), 'quot :: Int -> NonZeroInt -> Int');
  });

  it('performs integer division truncated towards 0', function() {
    eq(quot(42, 5), 8);
    eq(quot(42, -5), -8);
    eq(quot(-42, 5), -8);
    eq(quot(-42, -5), 8);
  });

});

describe('rem', function() {

  it('is a binary function', function() {
    eq(typeof rem, 'function');
    eq(rem.length, 2);
    eq(rem.toString(), 'rem :: Int -> NonZeroInt -> Int');
  });

  it('returns the remainder', function() {
    eq(rem(42, 5), 2);
    eq(rem(42, -5), 2);
    eq(rem(-42, 5), -2);
    eq(rem(-42, -5), -2);
  });

});

describe('div', function() {

  it('is a binary function', function() {
    eq(typeof div, 'function');
    eq(div.length, 2);
    eq(div.toString(), 'div :: Int -> NonZeroInt -> Int');
  });

  it('performs integer division truncated towards -Infinity', function() {
    eq(div(7, 2), 3);
    eq(div(7, -2), -4);
    eq(div(-7, 2), -4);
    eq(div(-7, -2), 3);
    eq(div(0, 1), 0);
    eq(div(-0, 1), -0);
  });

});

describe('mod', function() {

  it('is a binary function', function() {
    eq(typeof mod, 'function');
    eq(mod.length, 2);
    eq(mod.toString(), 'mod :: Int -> NonZeroInt -> Int');
  });

  it('returns the modulus', function() {
    eq(mod(42, 5), 2);
    eq(mod(42, -5), -3);
    eq(mod(-42, 5), 3);
    eq(mod(-42, -5), -2);
  });

});

describe('and', function() {

  it('is a binary function', function() {
    eq(typeof and, 'function');
    eq(and.length, 2);
    eq(and.toString(), 'and :: Int -> Int -> Int');
  });

  it('returns the bitwise AND of its arguments', function() {
    eq(and(binary('1100'), binary('1010')), binary('1000'));
  });

});

describe('or', function() {

  it('is a binary function', function() {
    eq(typeof or, 'function');
    eq(or.length, 2);
    eq(or.toString(), 'or :: Int -> Int -> Int');
  });

  it('returns the bitwise OR of its arguments', function() {
    eq(or(binary('1100'), binary('1010')), binary('1110'));
  });

});

describe('xor', function() {

  it('is a binary function', function() {
    eq(typeof xor, 'function');
    eq(xor.length, 2);
    eq(xor.toString(), 'xor :: Int -> Int -> Int');
  });

  it('returns the bitwise XOR of its arguments', function() {
    eq(xor(binary('1100'), binary('1010')), binary('0110'));
  });

});

describe('not', function() {

  it('is a unary function', function() {
    eq(typeof not, 'function');
    eq(not.length, 1);
    eq(not.toString(), 'not :: Int -> Int');
  });

  it('returns bitwise NOT of its argument', function() {
    eq(not(42), ~42);
    eq(not(42), -43);
    eq(not(-1), ~-1);
    eq(not(-1), 0);
  });

});

describe('even', function() {

  it('is a unary function', function() {
    eq(typeof even, 'function');
    eq(even.length, 1);
    eq(even.toString(), 'even :: Int -> Boolean');
  });

  it('returns true if applied to an even integer', function() {
    eq(even(0), true);
    eq(even(-0), true);
    eq(even(2), true);
    eq(even(-2), true);
    eq(even(2147483646), true);
    eq(even(-2147483648), true);
  });

  it('returns false if applied to an odd integer', function() {
    eq(even(1), false);
    eq(even(-1), false);
    eq(even(2147483647), false);
    eq(even(-2147483647), false);
  });

});

describe('odd', function() {

  it('is a unary function', function() {
    eq(typeof odd, 'function');
    eq(odd.length, 1);
    eq(odd.toString(), 'odd :: Int -> Boolean');
  });

  it('returns true if applied to an odd value', function() {
    eq(odd(1), true);
    eq(odd(-1), true);
    eq(odd(2147483647), true);
    eq(odd(-2147483647), true);
  });

  it('returns false if applied to an even value', function() {
    eq(odd(0), false);
    eq(odd(-0), false);
    eq(odd(2), false);
    eq(odd(-2), false);
    eq(odd(2147483646), false);
    eq(odd(-2147483648), false);
  });

});

describe('invariants', function() {

  it('quot(x, y) * y + rem(x, y) === x', function() {
    jsc.assert(jsc.forall(jsc.int32, jsc.int32, function(x, y) {
      return y === 0 ||
             Z.equals(quot(x, y) * y + rem(x, y), x);
    }));
  });

  it('div(x, y) * y + mod(x, y) === x', function() {
    jsc.assert(jsc.forall(jsc.int32, jsc.int32, function(x, y) {
      return y === 0 ||
             Z.equals(div(x, y) * y + mod(x, y), x);
    }));
  });

  it('not(x) === -(x + 1)', function() {
    jsc.assert(jsc.forall(jsc.int32, function(x) {
      return Z.equals(not(x), -(x + 1));
    }));
  });

});
