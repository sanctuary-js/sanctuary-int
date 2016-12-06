//. # sanctuary-int
//.
//. A collection of functions which operate on 32-bit signed integers.
//.
//. ## API

(function(f) {

  'use strict';

  /* istanbul ignore else */
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = f(require('sanctuary-def'));
  } else if (typeof define === 'function' && define.amd != null) {
    define(['sanctuary-def'], f);
  } else {
    self.sanctuaryInt = f(self.sanctuaryDef);
  }

}(function($) {

  'use strict';

  var int = {};

  //# Int :: Type
  //.
  //. The Int type represents integers in the range [-2^31 .. 2^31).
  var Int = $.NullaryType(
    'sanctuary-int/Int',
    'https://github.com/sanctuary-js/sanctuary-int#Int',
    function(x) { return $.test(env, $.Number, x) && (x | 0) === x; }
  );
  int.Int = Int;

  //# NonZeroInt :: Type
  //.
  //. The NonZeroInt type represents non-zero integers in the range
  //. [-2^31 .. 2^31).
  var NonZeroInt = $.NullaryType(
    'sanctuary-int/NonZeroInt',
    'https://github.com/sanctuary-js/sanctuary-int#NonZeroInt',
    function(x) { return $.test(env, Int, x) && x !== 0; }
  );
  int.NonZeroInt = NonZeroInt;

  //  env :: Array Type
  var env = $.env.concat([Int, NonZeroInt]);

  var def = $.create({checkTypes: true, env: env});

  //# add :: Int -> Int -> Int
  //.
  //. Returns the sum of its two arguments.
  //.
  //. ```javascript
  //. > add(1, 2)
  //. 3
  //. ```
  function add(m, n) {
    return m + n;
  }
  int.add = def('add', {}, [Int, Int, Int], add);

  //# sub :: Int -> Int -> Int
  //.
  //. Returns the result of subtracting its second argument from its first
  //. argument.
  //.
  //. ```javascript
  //. > sub(1, 2)
  //. -1
  //. ```
  function sub(m, n) {
    return m - n;
  }
  int.sub = def('sub', {}, [Int, Int, Int], sub);

  //# mul :: Int -> Int -> Int
  //.
  //. Returns the product of its two arguments.
  //.
  //. ```javascript
  //. > mul(6, 7)
  //. 42
  //. ```
  function mul(m, n) {
    return m * n;
  }
  int.mul = def('mul', {}, [Int, Int, Int], mul);

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
  function quot(m, n) {
    return (m / n) | 0;
  }
  int.quot = def('quot', {}, [Int, NonZeroInt, Int], quot);

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
  function rem(m, n) {
    return m % n;
  }
  int.rem = def('rem', {}, [Int, NonZeroInt, Int], rem);

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
  function div(m, n) {
    return Math.floor(m / n);
  }
  int.div = def('div', {}, [Int, NonZeroInt, Int], div);

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
  function mod(m, n) {
    return (m % n + n) % n;
  }
  int.mod = def('mod', {}, [Int, NonZeroInt, Int], mod);

  //# and :: Int -> Int -> Int
  //.
  //. [Bitwise AND][&]. Returns an Int with a one at each bit position at
  //. which both arguments have a one.
  //.
  //. ```javascript
  //. > and(parseInt('1100', 2), parseInt('1010', 2))
  //. 8
  //. ```
  function and(m, n) {
    return m & n;
  }
  int.and = def('and', {}, [Int, Int, Int], and);

  //# or :: Int -> Int -> Int
  //.
  //. [Bitwise OR][|]. Returns an Int with a one at each bit position at
  //. which at least one argument has a one.
  //.
  //. ```javascript
  //. > or(parseInt('1100', 2), parseInt('1010', 2))
  //. 14
  //. ```
  function or(m, n) {
    return m | n;
  }
  int.or = def('or', {}, [Int, Int, Int], or);

  //# xor :: Int -> Int -> Int
  //.
  //. [Bitwise XOR][^]. Returns an Int with a one at each bit position at
  //. which exactly one argument has a one.
  //.
  //. ```javascript
  //. > xor(parseInt('1100', 2), parseInt('1010', 2))
  //. 6
  //. ```
  function xor(m, n) {
    return m ^ n;
  }
  int.xor = def('xor', {}, [Int, Int, Int], xor);

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
  function not(n) {
    return ~n;
  }
  int.not = def('not', {}, [Int, Int], not);

  //# even :: Int -> Boolean
  //.
  //. Returns `true` if its argument is even; `false` if it is odd.
  //.
  //. ```javascript
  //. > even(42)
  //. true
  //. ```
  function even(n) {
    return n % 2 === 0;
  }
  int.even = def('even', {}, [Int, $.Boolean], even);

  //# odd :: Int -> Boolean
  //.
  //. Returns `true` if its argument is odd; `false` if it is even.
  //.
  //. ```javascript
  //. > odd(42)
  //. false
  //. ```
  function odd(n) {
    return n % 2 !== 0;
  }
  int.odd = def('odd', {}, [Int, $.Boolean], odd);

  return int;

}));

//. [~]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_NOT
//. [&]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_AND
//. [|]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_OR
//. [^]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_XOR
