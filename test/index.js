'use strict';

var assert = require('assert');

var jsc = require('jsverify');
var R = require('ramda');

var int = require('..');


var _ = R.__;

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

var throws = assert.throws;

var eq = function(actual, expected) {
  assert.strictEqual(arguments.length, 2);
  assert.strictEqual(R.toString(actual), R.toString(expected));
};

//  errorEq :: Function -> String -> Error -> Boolean
var errorEq = R.curry(function(type, message, error) {
  return error.constructor === type && error.message === message;
});

//  binary :: String -> Number
var binary = function(s) { return parseInt(s, 2); };

//  maxInt :: Int
var maxInt = Math.pow(2, 31) - 1;

//  minInt :: Int
var minInt = -Math.pow(2, 31);


describe('Int', function() {

  it('represents integers in the range [-2^31 .. 2^31)', function() {
    eq(Int.test(0), true);
    eq(Int.test(1), true);
    eq(Int.test(-0), true);
    eq(Int.test(-1), true);
    eq(Int.test(maxInt), true);
    eq(Int.test(minInt), true);
    eq(Int.test(new Number(0)), true);
    eq(Int.test(new Number(1)), true);
    eq(Int.test(new Number(-0)), true);
    eq(Int.test(new Number(-1)), true);
    eq(Int.test(new Number(maxInt)), true);
    eq(Int.test(new Number(minInt)), true);

    eq(Int.test('42'), false);
    eq(Int.test(12.34), false);
    eq(Int.test(maxInt + 1), false);
    eq(Int.test(minInt - 1), false);
    eq(Int.test(Infinity), false);
    eq(Int.test(-Infinity), false);
    eq(Int.test(NaN), false);
    eq(Int.test(new Number(NaN)), false);
  });

});

describe('NonZeroInt', function() {

  it('represents non-zero integers in the range [-2^31 .. 2^31)', function() {
    eq(NonZeroInt.test(0), false);
    eq(NonZeroInt.test(1), true);
    eq(NonZeroInt.test(-0), false);
    eq(NonZeroInt.test(-1), true);
    eq(NonZeroInt.test(maxInt), true);
    eq(NonZeroInt.test(minInt), true);
    eq(NonZeroInt.test(new Number(0)), false);
    eq(NonZeroInt.test(new Number(1)), true);
    eq(NonZeroInt.test(new Number(-0)), false);
    eq(NonZeroInt.test(new Number(-1)), true);
    eq(NonZeroInt.test(new Number(maxInt)), true);
    eq(NonZeroInt.test(new Number(minInt)), true);

    eq(NonZeroInt.test('42'), false);
    eq(NonZeroInt.test(12.34), false);
    eq(NonZeroInt.test(maxInt + 1), false);
    eq(NonZeroInt.test(minInt - 1), false);
    eq(NonZeroInt.test(Infinity), false);
    eq(NonZeroInt.test(-Infinity), false);
    eq(NonZeroInt.test(NaN), false);
    eq(NonZeroInt.test(new Number(NaN)), false);
  });

});

describe('add', function() {

  it('type checks its arguments', function() {
    throws(function() { add(0.5); },
           errorEq(TypeError,
                   '‘add’ expected a value of type Int ' +
                   'as its first argument; received 0.5'));

    throws(function() { add(0, 0.5); },
           errorEq(TypeError,
                   '‘add’ expected a value of type Int ' +
                   'as its second argument; received 0.5'));
  });

  it('returns the sum', function() {
    eq(add(1, 2), 3);
  });

  it('has identity element (zero)', function() {
    jsc.assert(jsc.forall(jsc.int32, function(x) {
      return R.equals(add(x, 0), x) &&
             R.equals(add(0, x), x);
    }));
  });

  it('is commutative', function() {
    jsc.assert(jsc.forall(jsc.int32, jsc.int32, function(x, y) {
      // The sum may be outside the valid range.
      return !Int.test(x + y) ||
             R.equals(add(x, y),
                      add(y, x));
    }));
  });

  it('is associative', function() {
    jsc.assert(jsc.forall(jsc.int32, jsc.int32, jsc.int32, function(x, y, z) {
      // The sum may be outside the valid range.
      return !Int.test(x + y) ||
             !Int.test(y + z) ||
             !Int.test(x + y + z) ||
             R.equals(add(add(x, y), z),
                      add(x, add(y, z)));
    }));
  });

  it('is curried', function() {
    eq(add(1)(2), 3);
  });

});

describe('sub', function() {

  it('type checks its arguments', function() {
    throws(function() { sub(0.5); },
           errorEq(TypeError,
                   '‘sub’ expected a value of type Int ' +
                   'as its first argument; received 0.5'));

    throws(function() { sub(0, 0.5); },
           errorEq(TypeError,
                   '‘sub’ expected a value of type Int ' +
                   'as its second argument; received 0.5'));
  });

  it('returns the difference', function() {
    eq(sub(1, 2), -1);
  });

  it('has right identity element (zero)', function() {
    jsc.assert(jsc.forall(jsc.int32, function(x) {
      return R.equals(sub(x, 0), x) &&
             R.equals(sub(x, x), 0);
    }));
  });

  it('is curried', function() {
    eq(sub(1)(2), -1);
  });

});

describe('mul', function() {

  it('type checks its arguments', function() {
    throws(function() { mul(0.5); },
           errorEq(TypeError,
                   '‘mul’ expected a value of type Int ' +
                   'as its first argument; received 0.5'));

    throws(function() { mul(0, 0.5); },
           errorEq(TypeError,
                   '‘mul’ expected a value of type Int ' +
                   'as its second argument; received 0.5'));
  });

  it('returns the product', function() {
    eq(mul(6, 7), 42);
  });

  it('has identity element (one)', function() {
    jsc.assert(jsc.forall(jsc.int32, function(x) {
      return R.equals(mul(x, 1), x) &&
             R.equals(mul(1, x), x);
    }));
  });

  it('is commutative', function() {
    jsc.assert(jsc.forall(jsc.int32, jsc.int32, function(x, y) {
      // The product may be outside the valid range.
      return !Int.test(x * y) ||
             R.equals(mul(x, y),
                      mul(y, x));
    }));
  });

  it('is associative', function() {
    jsc.assert(jsc.forall(jsc.int32, jsc.int32, jsc.int32, function(x, y, z) {
      // The product may be outside the valid range.
      return !Int.test(x * y) ||
             !Int.test(y * z) ||
             !Int.test(x * y * z) ||
             R.equals(mul(mul(x, y), z),
                      mul(x, mul(y, z)));
    }));
  });

  it('is curried', function() {
    eq(mul(6)(7), 42);
  });

});

describe('quot', function() {

  it('type checks its arguments', function() {
    throws(function() { quot(0.5); },
           errorEq(TypeError,
                   '‘quot’ expected a value of type Int ' +
                   'as its first argument; received 0.5'));

    throws(function() { quot(_, 0.5); },
           errorEq(TypeError,
                   '‘quot’ expected a value of type NonZeroInt ' +
                   'as its second argument; received 0.5'));

    throws(function() { quot(_, 0); },
           errorEq(TypeError,
                   '‘quot’ expected a value of type NonZeroInt ' +
                   'as its second argument; received 0'));

    throws(function() { quot(_, -0); },
           errorEq(TypeError,
                   '‘quot’ expected a value of type NonZeroInt ' +
                   'as its second argument; received -0'));

    throws(function() { quot(_, new Number(0)); },
           errorEq(TypeError,
                   '‘quot’ expected a value of type NonZeroInt ' +
                   'as its second argument; received new Number(0)'));

    throws(function() { quot(_, new Number(-0)); },
           errorEq(TypeError,
                   '‘quot’ expected a value of type NonZeroInt ' +
                   'as its second argument; received new Number(-0)'));
  });

  it('performs integer division truncated towards 0', function() {
    eq(quot(42, 5), 8);
    eq(quot(42, -5), -8);
    eq(quot(-42, 5), -8);
    eq(quot(-42, -5), 8);
  });

  it('is curried', function() {
    eq(quot(42)(5), 8);
  });

});

describe('rem', function() {

  it('type checks its arguments', function() {
    throws(function() { rem(0.5); },
           errorEq(TypeError,
                   '‘rem’ expected a value of type Int ' +
                   'as its first argument; received 0.5'));

    throws(function() { rem(_, 0.5); },
           errorEq(TypeError,
                   '‘rem’ expected a value of type NonZeroInt ' +
                   'as its second argument; received 0.5'));

    throws(function() { rem(_, 0); },
           errorEq(TypeError,
                   '‘rem’ expected a value of type NonZeroInt ' +
                   'as its second argument; received 0'));

    throws(function() { rem(_, -0); },
           errorEq(TypeError,
                   '‘rem’ expected a value of type NonZeroInt ' +
                   'as its second argument; received -0'));

    throws(function() { rem(_, new Number(0)); },
           errorEq(TypeError,
                   '‘rem’ expected a value of type NonZeroInt ' +
                   'as its second argument; received new Number(0)'));

    throws(function() { rem(_, new Number(-0)); },
           errorEq(TypeError,
                   '‘rem’ expected a value of type NonZeroInt ' +
                   'as its second argument; received new Number(-0)'));
  });

  it('returns the remainder', function() {
    eq(rem(42, 5), 2);
    eq(rem(42, -5), 2);
    eq(rem(-42, 5), -2);
    eq(rem(-42, -5), -2);
  });

  it('is curried', function() {
    eq(rem(42)(5), 2);
  });

});

describe('div', function() {

  it('type checks its arguments', function() {
    throws(function() { div(0.5); },
           errorEq(TypeError,
                   '‘div’ expected a value of type Int ' +
                   'as its first argument; received 0.5'));

    throws(function() { div(_, 0.5); },
           errorEq(TypeError,
                   '‘div’ expected a value of type NonZeroInt ' +
                   'as its second argument; received 0.5'));

    throws(function() { div(_, 0); },
           errorEq(TypeError,
                   '‘div’ expected a value of type NonZeroInt ' +
                   'as its second argument; received 0'));

    throws(function() { div(_, -0); },
           errorEq(TypeError,
                   '‘div’ expected a value of type NonZeroInt ' +
                   'as its second argument; received -0'));

    throws(function() { div(_, new Number(0)); },
           errorEq(TypeError,
                   '‘div’ expected a value of type NonZeroInt ' +
                   'as its second argument; received new Number(0)'));

    throws(function() { div(_, new Number(-0)); },
           errorEq(TypeError,
                   '‘div’ expected a value of type NonZeroInt ' +
                   'as its second argument; received new Number(-0)'));
  });

  it('performs integer division truncated towards -Infinity', function() {
    eq(div(7, 2), 3);
    eq(div(7, -2), -4);
    eq(div(-7, 2), -4);
    eq(div(-7, -2), 3);
    eq(div(0, 1), 0);
    eq(div(-0, 1), -0);
    eq(div(7, new Number(2)), 3);
    eq(div(new Number(7), 2), 3);
    eq(div(new Number(7), new Number(2)), 3);
  });

  it('is curried', function() {
    eq(div(7)(2), 3);
  });

});

describe('mod', function() {

  it('type checks its arguments', function() {
    throws(function() { mod(0.5); },
           errorEq(TypeError,
                   '‘mod’ expected a value of type Int ' +
                   'as its first argument; received 0.5'));

    throws(function() { mod(_, 0.5); },
           errorEq(TypeError,
                   '‘mod’ expected a value of type NonZeroInt ' +
                   'as its second argument; received 0.5'));

    throws(function() { mod(_, 0); },
           errorEq(TypeError,
                   '‘mod’ expected a value of type NonZeroInt ' +
                   'as its second argument; received 0'));

    throws(function() { mod(_, -0); },
           errorEq(TypeError,
                   '‘mod’ expected a value of type NonZeroInt ' +
                   'as its second argument; received -0'));

    throws(function() { mod(_, new Number(0)); },
           errorEq(TypeError,
                   '‘mod’ expected a value of type NonZeroInt ' +
                   'as its second argument; received new Number(0)'));

    throws(function() { mod(_, new Number(-0)); },
           errorEq(TypeError,
                   '‘mod’ expected a value of type NonZeroInt ' +
                   'as its second argument; received new Number(-0)'));
  });

  it('returns the modulus', function() {
    eq(mod(42, 5), 2);
    eq(mod(42, -5), -3);
    eq(mod(-42, 5), 3);
    eq(mod(-42, -5), -2);
  });

  it('is curried', function() {
    eq(mod(42)(5), 2);
  });

});

describe('and', function() {

  it('type checks its arguments', function() {
    throws(function() { and(0.5); },
           errorEq(TypeError,
                   '‘and’ expected a value of type Int ' +
                   'as its first argument; received 0.5'));

    throws(function() { and(0, 0.5); },
           errorEq(TypeError,
                   '‘and’ expected a value of type Int ' +
                   'as its second argument; received 0.5'));
  });

  it('returns the bitwise AND of its arguments', function() {
    eq(and(binary('1100'), binary('1010')), binary('1000'));
  });

  it('is curried', function() {
    eq(and(binary('1100'))(binary('1010')), binary('1000'));
  });

});

describe('or', function() {

  it('type checks its arguments', function() {
    throws(function() { or(0.5); },
           errorEq(TypeError,
                   '‘or’ expected a value of type Int ' +
                   'as its first argument; received 0.5'));

    throws(function() { or(0, 0.5); },
           errorEq(TypeError,
                   '‘or’ expected a value of type Int ' +
                   'as its second argument; received 0.5'));
  });

  it('returns the bitwise OR of its arguments', function() {
    eq(or(binary('1100'), binary('1010')), binary('1110'));
  });

  it('is curried', function() {
    eq(or(binary('1100'))(binary('1010')), binary('1110'));
  });

});

describe('xor', function() {

  it('type checks its arguments', function() {
    throws(function() { xor(0.5); },
           errorEq(TypeError,
                   '‘xor’ expected a value of type Int ' +
                   'as its first argument; received 0.5'));

    throws(function() { xor(0, 0.5); },
           errorEq(TypeError,
                   '‘xor’ expected a value of type Int ' +
                   'as its second argument; received 0.5'));
  });

  it('returns the bitwise XOR of its arguments', function() {
    eq(xor(binary('1100'), binary('1010')), binary('0110'));
  });

  it('is curried', function() {
    eq(xor(binary('1100'))(binary('1010')), binary('0110'));
  });

});

describe('not', function() {

  it('type checks its arguments', function() {
    throws(function() { not(0.5); },
           errorEq(TypeError,
                   '‘not’ expected a value of type Int ' +
                   'as its first argument; received 0.5'));
  });

  it('returns bitwise NOT of its argument', function() {
    eq(not(42), ~42);
    eq(not(42), -43);
    eq(not(-1), ~-1);
    eq(not(-1), 0);
  });

});

describe('even', function() {

  it('type checks its arguments', function() {
    throws(function() { even(0.5); },
           errorEq(TypeError,
                   '‘even’ expected a value of type Int ' +
                   'as its first argument; received 0.5'));
  });

  it('returns true if applied to an even integer', function() {
    eq(even(0), true);
    eq(even(-0), true);
    eq(even(2), true);
    eq(even(-2), true);
    eq(even(2147483646), true);
    eq(even(-2147483648), true);
    eq(even(new Number(-0)), true);
  });

  it('returns false if applied to an odd integer', function() {
    eq(even(1), false);
    eq(even(-1), false);
    eq(even(2147483647), false);
    eq(even(-2147483647), false);
    eq(even(new Number(-1)), false);
  });

});

describe('odd', function() {

  it('type checks its arguments', function() {
    throws(function() { odd(0.5); },
           errorEq(TypeError,
                   '‘odd’ expected a value of type Int ' +
                   'as its first argument; received 0.5'));
  });

  it('returns true if applied to an odd value', function() {
    eq(odd(1), true);
    eq(odd(-1), true);
    eq(odd(2147483647), true);
    eq(odd(-2147483647), true);
    eq(odd(new Number(-1)), true);
  });

  it('returns false if applied to an even value', function() {
    eq(odd(0), false);
    eq(odd(-0), false);
    eq(odd(2), false);
    eq(odd(-2), false);
    eq(odd(2147483646), false);
    eq(odd(-2147483648), false);
    eq(odd(new Number(-0)), false);
  });

});

describe('invariants', function() {

  it('quot(x, y) * y + rem(x, y) === x', function() {
    jsc.assert(jsc.forall(jsc.int32, jsc.int32, function(x, y) {
      return y === 0 ||
             R.equals(quot(x, y) * y + rem(x, y), x);
    }));
  });

  it('div(x, y) * y + mod(x, y) === x', function() {
    jsc.assert(jsc.forall(jsc.int32, jsc.int32, function(x, y) {
      return y === 0 ||
             R.equals(div(x, y) * y + mod(x, y), x);
    }));
  });

  it('not(x) === -(x + 1)', function() {
    jsc.assert(jsc.forall(jsc.int32, function(x) {
      return R.equals(not(x), -(x + 1));
    }));
  });

});
