# sanctuary-int

A collection of functions which operate on 32-bit signed integers.

## API

#### <a name="Int" href="https://github.com/sanctuary-js/sanctuary-int/blob/v2.0.0/index.js#L29">`Int :: Type`</a>

The Int type represents integers in the range [-2^31 .. 2^31).

#### <a name="NonZeroInt" href="https://github.com/sanctuary-js/sanctuary-int/blob/v2.0.0/index.js#L37">`NonZeroInt :: Type`</a>

The NonZeroInt type represents non-zero integers in the range
[-2^31 .. 2^31).

#### <a name="add" href="https://github.com/sanctuary-js/sanctuary-int/blob/v2.0.0/index.js#L46">`add :: Int -⁠> Int -⁠> Int`</a>

Returns the sum of its two arguments.

```javascript
> add (1) (2)
3
```

#### <a name="sub" href="https://github.com/sanctuary-js/sanctuary-int/blob/v2.0.0/index.js#L64">`sub :: Int -⁠> Int -⁠> Int`</a>

Returns the result of subtracting its first argument from its second
argument.

```javascript
> sub (1) (100)
99
```

#### <a name="mul" href="https://github.com/sanctuary-js/sanctuary-int/blob/v2.0.0/index.js#L83">`mul :: Int -⁠> Int -⁠> Int`</a>

Returns the product of its two arguments.

```javascript
> mul (6) (7)
42
```

#### <a name="quot" href="https://github.com/sanctuary-js/sanctuary-int/blob/v2.0.0/index.js#L101">`quot :: NonZeroInt -⁠> Int -⁠> Int`</a>

Returns the result of dividing its second argument by its first
argument, truncating towards zero.

Throws if the divisor is zero.

See also [`div`](#div).

```javascript
> quot (5) (42)
8

> quot (-5) (42)
-8

> quot (5) (-42)
-8

> quot (-5) (-42)
8
```

#### <a name="rem" href="https://github.com/sanctuary-js/sanctuary-int/blob/v2.0.0/index.js#L133">`rem :: NonZeroInt -⁠> Int -⁠> Int`</a>

Integer remainder, satisfying:

    quot (y) (x) * y + rem (y) (x) === x

Throws if the divisor is zero.

See also [`mod`](#mod).

```javascript
> rem (5) (42)
2

> rem (-5) (42)
2

> rem (5) (-42)
-2

> rem (-5) (-42)
-2
```

#### <a name="div" href="https://github.com/sanctuary-js/sanctuary-int/blob/v2.0.0/index.js#L166">`div :: NonZeroInt -⁠> Int -⁠> Int`</a>

Returns the result of dividing its second argument by its first
argument, truncating towards negative infinity.

Throws if the divisor is zero.

See also [`quot`](#quot).

```javascript
> div (5) (42)
8

> div (-5) (42)
-9

> div (5) (-42)
-9

> div (-5) (-42)
8
```

#### <a name="mod" href="https://github.com/sanctuary-js/sanctuary-int/blob/v2.0.0/index.js#L198">`mod :: NonZeroInt -⁠> Int -⁠> Int`</a>

Integer modulus, satisfying:

    div (y) (x) * y + mod (y) (x) === x

Throws if the divisor is zero.

See also [`rem`](#rem).

```javascript
> mod (5) (42)
2

> mod (-5) (42)
-3

> mod (5) (-42)
3

> mod (-5) (-42)
-2
```

#### <a name="and" href="https://github.com/sanctuary-js/sanctuary-int/blob/v2.0.0/index.js#L231">`and :: Int -⁠> Int -⁠> Int`</a>

[Bitwise AND][&]. Returns an Int with a one at each bit position at
which both arguments have a one.

```javascript
> and (0b1100) (0b1010)
0b1000
```

#### <a name="or" href="https://github.com/sanctuary-js/sanctuary-int/blob/v2.0.0/index.js#L250">`or :: Int -⁠> Int -⁠> Int`</a>

[Bitwise OR][|]. Returns an Int with a one at each bit position at
which at least one argument has a one.

```javascript
> or (0b1100) (0b1010)
0b1110
```

#### <a name="xor" href="https://github.com/sanctuary-js/sanctuary-int/blob/v2.0.0/index.js#L269">`xor :: Int -⁠> Int -⁠> Int`</a>

[Bitwise XOR][^]. Returns an Int with a one at each bit position at
which exactly one argument has a one.

```javascript
> xor (0b1100) (0b1010)
0b0110
```

#### <a name="not" href="https://github.com/sanctuary-js/sanctuary-int/blob/v2.0.0/index.js#L288">`not :: Int -⁠> Int`</a>

[Bitwise NOT][~], satisfying:

    not (x) === -(x + 1)

```javascript
> not (42)
-43
```

#### <a name="even" href="https://github.com/sanctuary-js/sanctuary-int/blob/v2.0.0/index.js#L306">`even :: Int -⁠> Boolean`</a>

Returns `true` if its argument is even; `false` if it is odd.

```javascript
> even (42)
true
```

#### <a name="odd" href="https://github.com/sanctuary-js/sanctuary-int/blob/v2.0.0/index.js#L322">`odd :: Int -⁠> Boolean`</a>

Returns `true` if its argument is odd; `false` if it is even.

```javascript
> odd (42)
false
```

[~]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_NOT
[&]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_AND
[|]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_OR
[^]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_XOR
