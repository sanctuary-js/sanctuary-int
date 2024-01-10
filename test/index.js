import {deepStrictEqual as eq} from 'node:assert';
import util from 'node:util';

import jsc from 'jsverify';
import test from 'oletus';
import $ from 'sanctuary-def';
import show from 'sanctuary-show';
import Z from 'sanctuary-type-classes';

import int from '../index.js';


const {
  Int, NonZeroInt,
  add, sub, mul, quot, rem, div, mod, and, or, xor, not, even, odd,
} = int;

//    isInt :: Any -> Boolean
const isInt = $.test ($.env) (Int);

//    isNonZeroInt :: Any -> Boolean
const isNonZeroInt = $.test ($.env) (NonZeroInt);

//    maxInt :: Int
const maxInt = Math.pow (2, 31) - 1;

//    minInt :: Int
const minInt = -Math.pow (2, 31);


test ('Int is a nullary type', () => {
  eq (Int.name, 'Int');
  eq (Int.url, 'https://github.com/sanctuary-js/sanctuary-int#Int');
  eq (show (Int), 'Int');
  eq (Z.equals (Int, Int), true);
  eq (Z.equals (Int, NonZeroInt), false);
});

test ('Int represents integers in the range [-2^31 .. 2^31)', () => {
  eq (isInt (0), true);
  eq (isInt (1), true);
  eq (isInt (-0), true);
  eq (isInt (-1), true);
  eq (isInt (maxInt), true);
  eq (isInt (minInt), true);

  eq (isInt ('42'), false);
  eq (isInt (12.34), false);
  eq (isInt (maxInt + 1), false);
  eq (isInt (minInt - 1), false);
  eq (isInt (Infinity), false);
  eq (isInt (-Infinity), false);
  eq (isInt (NaN), false);
  eq (isInt (new Number (0)), false);
});

test ('NonZeroInt is a nullary type', () => {
  eq (NonZeroInt.name, 'NonZeroInt');
  eq (NonZeroInt.url, 'https://github.com/sanctuary-js/sanctuary-int#NonZeroInt');
  eq (show (NonZeroInt), 'NonZeroInt');
  eq (Z.equals (NonZeroInt, NonZeroInt), true);
  eq (Z.equals (NonZeroInt, Int), false);
});

test ('NonZeroInt represents non-zero integers in the range [-2^31 .. 2^31)', () => {
  eq (isNonZeroInt (0), false);
  eq (isNonZeroInt (1), true);
  eq (isNonZeroInt (-0), false);
  eq (isNonZeroInt (-1), true);
  eq (isNonZeroInt (maxInt), true);
  eq (isNonZeroInt (minInt), true);

  eq (isNonZeroInt ('42'), false);
  eq (isNonZeroInt (12.34), false);
  eq (isNonZeroInt (maxInt + 1), false);
  eq (isNonZeroInt (minInt - 1), false);
  eq (isNonZeroInt (Infinity), false);
  eq (isNonZeroInt (-Infinity), false);
  eq (isNonZeroInt (NaN), false);
  eq (isNonZeroInt (new Number (0)), false);
  eq (isNonZeroInt (new Number (1)), false);
});

test ('add is a binary function', () => {
  eq (typeof add, 'function');
  eq (add.length, 1);
  eq (util.inspect (add), 'add :: Int -> Int -> Int');
});

test ('add returns the sum', () => {
  eq (add (1) (2), 3);
});

test ('add has identity element (zero)', () => {
  jsc.assert (jsc.forall (jsc.int32, x =>
    Z.equals (add (x) (0), x) &&
    Z.equals (add (0) (x), x)
  ));
});

test ('add is commutative', () => {
  jsc.assert (jsc.forall (jsc.int16, jsc.int16, (x, y) =>
    Z.equals (add (x) (y),
              add (y) (x))
  ));
});

test ('add is associative', () => {
  jsc.assert (jsc.forall (jsc.int16, jsc.int16, jsc.int16, (x, y, z) =>
    Z.equals (add (add (x) (y)) (z),
              add (x) (add (y) (z)))
  ));
});

test ('sub is a binary function', () => {
  eq (typeof sub, 'function');
  eq (sub.length, 1);
  eq (util.inspect (sub), 'sub :: Int -> Int -> Int');
});

test ('sub returns the difference', () => {
  eq (sub (2) (1), -1);
});

test ('sub has right identity element (zero)', () => {
  jsc.assert (jsc.forall (jsc.int32, x =>
    Z.equals (sub (0) (x), x) &&
    Z.equals (sub (x) (x), 0)
  ));
});

test ('mul is a binary function', () => {
  eq (typeof mul, 'function');
  eq (mul.length, 1);
  eq (util.inspect (mul), 'mul :: Int -> Int -> Int');
});

test ('mul returns the product', () => {
  eq (mul (6) (7), 42);
});

test ('mul has identity element (one)', () => {
  jsc.assert (jsc.forall (jsc.int32, x =>
    Z.equals (mul (x) (1), x) &&
    Z.equals (mul (1) (x), x)
  ));
});

test ('mul is commutative', () => {
  jsc.assert (jsc.forall (jsc.int16, jsc.int16, (x, y) =>
    Z.equals (mul (x) (y),
              mul (y) (x))
  ));
});

test ('mul is associative', () => {
  jsc.assert (jsc.forall (jsc.int8, jsc.int8, jsc.int8, (x, y, z) =>
    Z.equals (mul (mul (x) (y)) (z),
              mul (x) (mul (y) (z)))
  ));
});

test ('quot is a binary function', () => {
  eq (typeof quot, 'function');
  eq (quot.length, 1);
  eq (util.inspect (quot), 'quot :: NonZeroInt -> Int -> Int');
});

test ('quot performs integer division truncated towards 0', () => {
  eq (quot (5) (42), 8);
  eq (quot (-5) (42), -8);
  eq (quot (5) (-42), -8);
  eq (quot (-5) (-42), 8);
});

test ('rem is a binary function', () => {
  eq (typeof rem, 'function');
  eq (rem.length, 1);
  eq (util.inspect (rem), 'rem :: NonZeroInt -> Int -> Int');
});

test ('rem returns the remainder', () => {
  eq (rem (5) (42), 2);
  eq (rem (-5) (42), 2);
  eq (rem (5) (-42), -2);
  eq (rem (-5) (-42), -2);
});

test ('div is a binary function', () => {
  eq (typeof div, 'function');
  eq (div.length, 1);
  eq (util.inspect (div), 'div :: NonZeroInt -> Int -> Int');
});

test ('div performs integer division truncated towards -Infinity', () => {
  eq (div (2) (7), 3);
  eq (div (-2) (7), -4);
  eq (div (2) (-7), -4);
  eq (div (-2) (-7), 3);
  eq (div (1) (0), 0);
  eq (div (1) (-0), -0);
});

test ('mod is a binary function', () => {
  eq (typeof mod, 'function');
  eq (mod.length, 1);
  eq (util.inspect (mod), 'mod :: NonZeroInt -> Int -> Int');
});

test ('mod returns the modulus', () => {
  eq (mod (5) (42), 2);
  eq (mod (-5) (42), -3);
  eq (mod (5) (-42), 3);
  eq (mod (-5) (-42), -2);
});

test ('and is a binary function', () => {
  eq (typeof and, 'function');
  eq (and.length, 1);
  eq (util.inspect (and), 'and :: Int -> Int -> Int');
});

test ('and returns the bitwise AND of its arguments', () => {
  eq (and (0b1100) (0b1010), 0b1000);
});

test ('or is a binary function', () => {
  eq (typeof or, 'function');
  eq (or.length, 1);
  eq (util.inspect (or), 'or :: Int -> Int -> Int');
});

test ('or returns the bitwise OR of its arguments', () => {
  eq (or (0b1100) (0b1010), (0b1110));
});

test ('xor is a binary function', () => {
  eq (typeof xor, 'function');
  eq (xor.length, 1);
  eq (util.inspect (xor), 'xor :: Int -> Int -> Int');
});

test ('xor returns the bitwise XOR of its arguments', () => {
  eq (xor (0b1100) (0b1010), (0b0110));
});

test ('not is a unary function', () => {
  eq (typeof not, 'function');
  eq (not.length, 1);
  eq (util.inspect (not), 'not :: Int -> Int');
});

test ('not returns bitwise NOT of its argument', () => {
  eq (not (42), ~42);
  eq (not (42), -43);
  eq (not (-1), ~-1);
  eq (not (-1), 0);
});

test ('even is a unary function', () => {
  eq (typeof even, 'function');
  eq (even.length, 1);
  eq (util.inspect (even), 'even :: Int -> Boolean');
});

test ('even returns true if applied to an even integer', () => {
  eq (even (0), true);
  eq (even (-0), true);
  eq (even (2), true);
  eq (even (-2), true);
  eq (even (2147483646), true);
  eq (even (-2147483648), true);
});

test ('even returns false if applied to an odd integer', () => {
  eq (even (1), false);
  eq (even (-1), false);
  eq (even (2147483647), false);
  eq (even (-2147483647), false);
});

test ('odd is a unary function', () => {
  eq (typeof odd, 'function');
  eq (odd.length, 1);
  eq (util.inspect (odd), 'odd :: Int -> Boolean');
});

test ('odd returns true if applied to an odd value', () => {
  eq (odd (1), true);
  eq (odd (-1), true);
  eq (odd (2147483647), true);
  eq (odd (-2147483647), true);
});

test ('odd returns false if applied to an even value', () => {
  eq (odd (0), false);
  eq (odd (-0), false);
  eq (odd (2), false);
  eq (odd (-2), false);
  eq (odd (2147483646), false);
  eq (odd (-2147483648), false);
});

test ('quot (y) (x) * y + rem (y) (x) === x', () => {
  jsc.assert (jsc.forall (jsc.int32, jsc.int32, (x, y) =>
    y === 0 || Z.equals (quot (y) (x) * y + rem (y) (x), x)
  ));
});

test ('div (y) (x) * y + mod (y) (x) === x', () => {
  jsc.assert (jsc.forall (jsc.int32, jsc.int32, (x, y) =>
    y === 0 || Z.equals (div (y) (x) * y + mod (y) (x), x)
  ));
});

test ('not (x) === -(x + 1)', () => {
  jsc.assert (jsc.forall (jsc.int32, x =>
    Z.equals (not (x), -(x + 1))
  ));
});
