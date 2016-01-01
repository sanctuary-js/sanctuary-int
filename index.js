//. # sanctuary-int
//.
//. A collection of functions which operate on 32-bit signed integers.
//.
//. ## API

/* global define, self */

;(function(f) {

  'use strict';

  /* istanbul ignore else */
  if (typeof module !== 'undefined') {
    module.exports = f(require('sanctuary-def'));
  } else if (typeof define === 'function' && define.amd != null) {
    define(['sanctuary-def'], f);
  } else {
    self.sanctuaryInt = f(self.sanctuaryDef);
  }

}(function($) {

  'use strict';

  //# Int :: Type
  //.
  //. The Int type represents integers in the range [-2^31 .. 2^31).
  var Int = $.NullaryType(
    'sanctuary-int/Int',
    function(x) {
      return Object.prototype.toString.call(x) === '[object Number]' &&
             (x | 0) === Number(x);
    }
  );

  //# NonZeroInt :: Type
  //.
  //. The NonZeroInt type represents non-zero integers in the range
  //. [-2^31 .. 2^31).
  var NonZeroInt = $.NullaryType(
    'sanctuary-int/NonZeroInt',
    function(x) {
      return Int.test(x) && Number(x) !== 0;
    }
  );

  var def = $.create($.env.concat([Int, NonZeroInt]));

  //# add :: Int -> Int -> Int
  //.
  //. Returns the sum of its two arguments.
  //.
  //. ```javascript
  //. > add(1, 2)
  //. 3
  //. ```
  var add =
  def('add',
      {},
      [Int, Int, Int],
      function(m, n) { return m + n; });

  //# sub :: Int -> Int -> Int
  //.
  //. Returns the result of subtracting its second argument from its first
  //. argument.
  //.
  //. ```javascript
  //. > sub(1, 2)
  //. -1
  //. ```
  var sub =
  def('sub',
      {},
      [Int, Int, Int],
      function(m, n) { return m - n; });

  //# mul :: Int -> Int -> Int
  //.
  //. Returns the product of its two arguments.
  //.
  //. ```javascript
  //. > mul(6, 7)
  //. 42
  //. ```
  var mul =
  def('mul',
      {},
      [Int, Int, Int],
      function(m, n) { return m * n; });

  //# quot :: Int -> NonZeroInt -> Int
  //.
  //. Returns the result of dividing its first argument by its second
  //. argument, truncating towards zero.
  //.
  //. Throws if the divisor is zero.
  //.
  //. See also [`div`](#div).
  //.
  //. ```javascript
  //. > quot(42, 5)
  //. 8
  //.
  //. > quot(42, -5)
  //. -8
  //.
  //. > quot(-42, 5)
  //. -8
  //.
  //. > quot(-42, -5)
  //. 8
  //. ```
  var quot =
  def('quot',
      {},
      [Int, NonZeroInt, Int],
      function(m, n) { return (m / n) | 0; });

  //# rem :: Int -> NonZeroInt -> Int
  //.
  //. Integer remainder, satisfying:
  //.
  //.     quot(x, y) * y + rem(x, y) === x
  //.
  //. Throws if the divisor is zero.
  //.
  //. See also [`mod`](#mod).
  //.
  //. ```javascript
  //. > rem(42, 5)
  //. 2
  //.
  //. > rem(42, -5)
  //. 2
  //.
  //. > rem(-42, 5)
  //. -2
  //.
  //. > rem(-42, -5)
  //. -2
  //. ```
  var rem =
  def('rem',
      {},
      [Int, NonZeroInt, Int],
      function(m, n) { return m % n; });

  //# div :: Int -> NonZeroInt -> Int
  //.
  //. Returns the result of dividing its first argument by its second
  //. argument, truncating towards negative infinity.
  //.
  //. Throws if the divisor is zero.
  //.
  //. See also [`quot`](#quot).
  //.
  //. ```javascript
  //. > div(42, 5)
  //. 8
  //.
  //. > div(42, -5)
  //. -9
  //.
  //. > div(-42, 5)
  //. -9
  //.
  //. > div(-42, -5)
  //. 8
  //. ```
  var div =
  def('div',
      {},
      [Int, NonZeroInt, Int],
      function(m, n) { return Math.floor(m / n); });

  //# mod :: Int -> NonZeroInt -> Int
  //.
  //. Integer modulus, satisfying:
  //.
  //.     div(x, y) * y + mod(x, y) === x
  //.
  //. Throws if the divisor is zero.
  //.
  //. See also [`rem`](#rem).
  //.
  //. ```javascript
  //. > mod(42, 5)
  //. 2
  //.
  //. > mod(42, -5)
  //. -3
  //.
  //. > mod(-42, 5)
  //. 3
  //.
  //. > mod(-42, -5)
  //. -2
  //. ```
  var mod =
  def('mod',
      {},
      [Int, NonZeroInt, Int],
      function(m, n) { return (m % n + n) % n; });

  //# and :: Int -> Int -> Int
  //.
  //. [Bitwise AND][&]. Returns an Int with a one at each bit position at
  //. which both arguments have a one.
  //.
  //. ```javascript
  //. > and(parseInt('1100', 2), parseInt('1010', 2))
  //. 8
  //. ```
  var and =
  def('and',
      {},
      [Int, Int, Int],
      function(m, n) { return m & n; });

  //# or :: Int -> Int -> Int
  //.
  //. [Bitwise OR][|]. Returns an Int with a one at each bit position at
  //. which at least one argument has a one.
  //.
  //. ```javascript
  //. > or(parseInt('1100', 2), parseInt('1010', 2))
  //. 14
  //. ```
  var or =
  def('or',
      {},
      [Int, Int, Int],
      function(m, n) { return m | n; });

  //# xor :: Int -> Int -> Int
  //.
  //. [Bitwise XOR][^]. Returns an Int with a one at each bit position at
  //. which exactly one argument has a one.
  //.
  //. ```javascript
  //. > xor(parseInt('1100', 2), parseInt('1010', 2))
  //. 6
  //. ```
  var xor =
  def('xor',
      {},
      [Int, Int, Int],
      function(m, n) { return m ^ n; });

  //# not :: Int -> Int
  //.
  //. [Bitwise NOT][~], satisfying:
  //.
  //.     not(x) === -(x + 1)
  //.
  //. ```javascript
  //. > not(42)
  //. -43
  //. ```
  var not =
  def('not',
      {},
      [Int, Int],
      function(n) { return ~n; });

  //# even :: Int -> Boolean
  //.
  //. Returns `true` if its argument is even; `false` if it is odd.
  //.
  //. ```javascript
  //. > even(42)
  //. true
  //. ```
  var even =
  def('even',
      {},
      [Int, $.Boolean],
      function(n) { return n % 2 === 0; });

  //# odd :: Int -> Boolean
  //.
  //. Returns `true` if its argument is odd; `false` if it is even.
  //.
  //. ```javascript
  //. > odd(42)
  //. false
  //. ```
  var odd =
  def('odd',
      {},
      [Int, $.Boolean],
      function(n) { return n % 2 !== 0; });

  return {
    Int: Int,
    NonZeroInt: NonZeroInt,
    add: add,
    sub: sub,
    mul: mul,
    quot: quot,
    rem: rem,
    div: div,
    mod: mod,
    and: and,
    or: or,
    xor: xor,
    not: not,
    even: even,
    odd: odd
  };

}));

//. [~]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_NOT
//. [&]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_AND
//. [|]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_OR
//. [^]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_XOR
