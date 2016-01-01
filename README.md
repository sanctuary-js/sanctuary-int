# sanctuary-int

A collection of functions which operate on 32-bit signed integers.

## API

<h4 name="Int"><code><a href="https://github.com/plaid/sanctuary-int/blob/v0.1.0/index.js#L26">Int :: Type</a></code></h4>

The Int type represents integers in the range [-2^31 .. 2^31).

<h4 name="NonZeroInt"><code><a href="https://github.com/plaid/sanctuary-int/blob/v0.1.0/index.js#L37">NonZeroInt :: Type</a></code></h4>

The NonZeroInt type represents non-zero integers in the range
[-2^31 .. 2^31).

<h4 name="add"><code><a href="https://github.com/plaid/sanctuary-int/blob/v0.1.0/index.js#L50">add :: Int -> Int -> Int</a></code></h4>

Returns the sum of its two arguments.

```javascript
> add(1, 2)
3
```

<h4 name="sub"><code><a href="https://github.com/plaid/sanctuary-int/blob/v0.1.0/index.js#L64">sub :: Int -> Int -> Int</a></code></h4>

Returns the result of subtracting its second argument from its first
argument.

```javascript
> sub(1, 2)
-1
```

<h4 name="mul"><code><a href="https://github.com/plaid/sanctuary-int/blob/v0.1.0/index.js#L79">mul :: Int -> Int -> Int</a></code></h4>

Returns the product of its two arguments.

```javascript
> mul(6, 7)
42
```

<h4 name="quot"><code><a href="https://github.com/plaid/sanctuary-int/blob/v0.1.0/index.js#L93">quot :: Int -> NonZeroInt -> Int</a></code></h4>

Returns the result of dividing its first argument by its second
argument, truncating towards zero.

Throws if the divisor is zero.

See also [`div`](#div).

```javascript
> quot(42, 5)
8

> quot(42, -5)
-8

> quot(-42, 5)
-8

> quot(-42, -5)
8
```

<h4 name="rem"><code><a href="https://github.com/plaid/sanctuary-int/blob/v0.1.0/index.js#L121">rem :: Int -> NonZeroInt -> Int</a></code></h4>

Integer remainder, satisfying:

    quot(x, y) * y + rem(x, y) === x

Throws if the divisor is zero.

See also [`mod`](#mod).

```javascript
> rem(42, 5)
2

> rem(42, -5)
2

> rem(-42, 5)
-2

> rem(-42, -5)
-2
```

<h4 name="div"><code><a href="https://github.com/plaid/sanctuary-int/blob/v0.1.0/index.js#L150">div :: Int -> NonZeroInt -> Int</a></code></h4>

Returns the result of dividing its first argument by its second
argument, truncating towards negative infinity.

Throws if the divisor is zero.

See also [`quot`](#quot).

```javascript
> div(42, 5)
8

> div(42, -5)
-9

> div(-42, 5)
-9

> div(-42, -5)
8
```

<h4 name="mod"><code><a href="https://github.com/plaid/sanctuary-int/blob/v0.1.0/index.js#L178">mod :: Int -> NonZeroInt -> Int</a></code></h4>

Integer modulus, satisfying:

    div(x, y) * y + mod(x, y) === x

Throws if the divisor is zero.

See also [`rem`](#rem).

```javascript
> mod(42, 5)
2

> mod(42, -5)
-3

> mod(-42, 5)
3

> mod(-42, -5)
-2
```

<h4 name="and"><code><a href="https://github.com/plaid/sanctuary-int/blob/v0.1.0/index.js#L207">and :: Int -> Int -> Int</a></code></h4>

[Bitwise AND][&]. Returns an Int with a one at each bit position at
which both arguments have a one.

```javascript
> and(parseInt('1100', 2), parseInt('1010', 2))
8
```

<h4 name="or"><code><a href="https://github.com/plaid/sanctuary-int/blob/v0.1.0/index.js#L222">or :: Int -> Int -> Int</a></code></h4>

[Bitwise OR][|]. Returns an Int with a one at each bit position at
which at least one argument has a one.

```javascript
> or(parseInt('1100', 2), parseInt('1010', 2))
14
```

<h4 name="xor"><code><a href="https://github.com/plaid/sanctuary-int/blob/v0.1.0/index.js#L237">xor :: Int -> Int -> Int</a></code></h4>

[Bitwise XOR][^]. Returns an Int with a one at each bit position at
which exactly one argument has a one.

```javascript
> xor(parseInt('1100', 2), parseInt('1010', 2))
6
```

<h4 name="not"><code><a href="https://github.com/plaid/sanctuary-int/blob/v0.1.0/index.js#L252">not :: Int -> Int</a></code></h4>

[Bitwise NOT][~], satisfying:

    not(x) === -(x + 1)

```javascript
> not(42)
-43
```

<h4 name="even"><code><a href="https://github.com/plaid/sanctuary-int/blob/v0.1.0/index.js#L268">even :: Int -> Boolean</a></code></h4>

Returns `true` if its argument is even; `false` if it is odd.

```javascript
> even(42)
true
```

<h4 name="odd"><code><a href="https://github.com/plaid/sanctuary-int/blob/v0.1.0/index.js#L282">odd :: Int -> Boolean</a></code></h4>

Returns `true` if its argument is odd; `false` if it is even.

```javascript
> odd(42)
false
```

[~]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_NOT
[&]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_AND
[|]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_OR
[^]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_XOR
