//. # sanctuary-int
//.
//. A collection of functions which operate on 32-bit signed integers.
//.
//. ## API

(function(f) {

  'use strict';

  /* istanbul ignore else */
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = f (require ('sanctuary-def'));
  } else if (typeof define === 'function' && define.amd != null) {
    define (['sanctuary-def'], f);
  } else {
    self.sanctuaryInt = f (self.sanctuaryDef);
  }

} (function($) {

  'use strict';

  var _ = {};

  //# Int :: Type
  //.
  //. The Int type represents integers in the range [-2^31 .. 2^31).
  var Int = $.NullaryType
    ('Int')
    ('https://github.com/sanctuary-js/sanctuary-int#Int')
    ([$.Number])
    (function(x) { return (x | 0) === x; });

  //# NonZeroInt :: Type
  //.
  //. The NonZeroInt type represents non-zero integers in the range
  //. [-2^31 .. 2^31).
  var NonZeroInt = $.NullaryType
    ('NonZeroInt')
    ('https://github.com/sanctuary-js/sanctuary-int#NonZeroInt')
    ([Int])
    (function(x) { return x !== 0; });

  //# add :: Int -> Int -> Int
  //.
  //. Returns the sum of its two arguments.
  //.
  //. ```javascript
  //. > add (1) (2)
  //. 3
  //. ```
  function add(n) {
    return function(m) {
      return m + n;
    };
  }
  _.add = {
    types: [Int, Int, Int],
    impl: add
  };

  //# sub :: Int -> Int -> Int
  //.
  //. Returns the result of subtracting its first argument from its second
  //. argument.
  //.
  //. ```javascript
  //. > sub (1) (100)
  //. 99
  //. ```
  function sub(n) {
    return function(m) {
      return m - n;
    };
  }
  _.sub = {
    types: [Int, Int, Int],
    impl: sub
  };

  //# mul :: Int -> Int -> Int
  //.
  //. Returns the product of its two arguments.
  //.
  //. ```javascript
  //. > mul (6) (7)
  //. 42
  //. ```
  function mul(n) {
    return function(m) {
      return m * n;
    };
  }
  _.mul = {
    types: [Int, Int, Int],
    impl: mul
  };

  //# quot :: NonZeroInt -> Int -> Int
  //.
  //. Returns the result of dividing its second argument by its first
  //. argument, truncating towards zero.
  //.
  //. Throws if the divisor is zero.
  //.
  //. See also [`div`](#div).
  //.
  //. ```javascript
  //. > quot (5) (42)
  //. 8
  //.
  //. > quot (-5) (42)
  //. -8
  //.
  //. > quot (5) (-42)
  //. -8
  //.
  //. > quot (-5) (-42)
  //. 8
  //. ```
  function quot(n) {
    return function(m) {
      return (m / n) | 0;
    };
  }
  _.quot = {
    types: [NonZeroInt, Int, Int],
    impl: quot
  };

  //# rem :: NonZeroInt -> Int -> Int
  //.
  //. Integer remainder, satisfying:
  //.
  //.     quot (y) (x) * y + rem (y) (x) === x
  //.
  //. Throws if the divisor is zero.
  //.
  //. See also [`mod`](#mod).
  //.
  //. ```javascript
  //. > rem (5) (42)
  //. 2
  //.
  //. > rem (-5) (42)
  //. 2
  //.
  //. > rem (5) (-42)
  //. -2
  //.
  //. > rem (-5) (-42)
  //. -2
  //. ```
  function rem(n) {
    return function(m) {
      return m % n;
    };
  }
  _.rem = {
    types: [NonZeroInt, Int, Int],
    impl: rem
  };

  //# div :: NonZeroInt -> Int -> Int
  //.
  //. Returns the result of dividing its second argument by its first
  //. argument, truncating towards negative infinity.
  //.
  //. Throws if the divisor is zero.
  //.
  //. See also [`quot`](#quot).
  //.
  //. ```javascript
  //. > div (5) (42)
  //. 8
  //.
  //. > div (-5) (42)
  //. -9
  //.
  //. > div (5) (-42)
  //. -9
  //.
  //. > div (-5) (-42)
  //. 8
  //. ```
  function div(n) {
    return function(m) {
      return Math.floor (m / n);
    };
  }
  _.div = {
    types: [NonZeroInt, Int, Int],
    impl: div
  };

  //# mod :: NonZeroInt -> Int -> Int
  //.
  //. Integer modulus, satisfying:
  //.
  //.     div (y) (x) * y + mod (y) (x) === x
  //.
  //. Throws if the divisor is zero.
  //.
  //. See also [`rem`](#rem).
  //.
  //. ```javascript
  //. > mod (5) (42)
  //. 2
  //.
  //. > mod (-5) (42)
  //. -3
  //.
  //. > mod (5) (-42)
  //. 3
  //.
  //. > mod (-5) (-42)
  //. -2
  //. ```
  function mod(n) {
    return function(m) {
      return (m % n + n) % n;
    };
  }
  _.mod = {
    types: [NonZeroInt, Int, Int],
    impl: mod
  };

  //# and :: Int -> Int -> Int
  //.
  //. [Bitwise AND][&]. Returns an Int with a one at each bit position at
  //. which both arguments have a one.
  //.
  //. ```javascript
  //. > and (0b1100) (0b1010)
  //. 0b1000
  //. ```
  function and(n) {
    return function(m) {
      return m & n;
    };
  }
  _.and = {
    types: [Int, Int, Int],
    impl: and
  };

  //# or :: Int -> Int -> Int
  //.
  //. [Bitwise OR][|]. Returns an Int with a one at each bit position at
  //. which at least one argument has a one.
  //.
  //. ```javascript
  //. > or (0b1100) (0b1010)
  //. 0b1110
  //. ```
  function or(n) {
    return function(m) {
      return m | n;
    };
  }
  _.or = {
    types: [Int, Int, Int],
    impl: or
  };

  //# xor :: Int -> Int -> Int
  //.
  //. [Bitwise XOR][^]. Returns an Int with a one at each bit position at
  //. which exactly one argument has a one.
  //.
  //. ```javascript
  //. > xor (0b1100) (0b1010)
  //. 0b0110
  //. ```
  function xor(n) {
    return function(m) {
      return m ^ n;
    };
  }
  _.xor = {
    types: [Int, Int, Int],
    impl: xor
  };

  //# not :: Int -> Int
  //.
  //. [Bitwise NOT][~], satisfying:
  //.
  //.     not (x) === -(x + 1)
  //.
  //. ```javascript
  //. > not (42)
  //. -43
  //. ```
  function not(n) {
    return ~n;
  }
  _.not = {
    types: [Int, Int],
    impl: not
  };

  //# even :: Int -> Boolean
  //.
  //. Returns `true` if its argument is even; `false` if it is odd.
  //.
  //. ```javascript
  //. > even (42)
  //. true
  //. ```
  function even(n) {
    return n % 2 === 0;
  }
  _.even = {
    types: [Int, $.Boolean],
    impl: even
  };

  //# odd :: Int -> Boolean
  //.
  //. Returns `true` if its argument is odd; `false` if it is even.
  //.
  //. ```javascript
  //. > odd (42)
  //. false
  //. ```
  function odd(n) {
    return n % 2 !== 0;
  }
  _.odd = {
    types: [Int, $.Boolean],
    impl: odd
  };

  var def = $.create ({checkTypes: true, env: $.env});
  return (Object.keys (_)).reduce (function(int, name) {
    int[name] = def (name) ({}) (_[name].types) (_[name].impl);
    return int;
  }, {Int: Int, NonZeroInt: NonZeroInt});

}));

//. [~]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_NOT
//. [&]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_AND
//. [|]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_OR
//. [^]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_XOR
