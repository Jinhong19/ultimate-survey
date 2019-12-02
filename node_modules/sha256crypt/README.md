sha256crypt-node
===

sha256crypt is a pure JavaScript utility providing hash and verify functionality without the need of external dependencies.

## Installation

```bash
npm install sha256crypt
```

## Usage

### hash

```javascript
var sha256crypt = require('sha256crypt');
sha256crypt.hash(password, rounds, salt);
// sha256crypt.hash('password', 80000, 'wnsT7Yr92oJoP28r') => 'cKhJImk5mfuSKV9b3mumNzlbstFUplKtQXXMo4G6Ep5';
```

### verify

```javascript
var sha256crypt = require('sha256crypt');
sha256crypt.verify(password, rounds, salt, checksum);
// sha256crypt.verify('password', 80000, 'wnsT7Yr92oJoP28r', 'cKhJImk5mfuSKV9b3mumNzlbstFUplKtQXXMo4G6Ep5') => true;
```

## Thanks

__Thanks to [Emscripten: An LLVM-to-JavaScript Compiler](https://github.com/kripken/emscripten) and all its [contributers](https://github.com/kripken/emscripten/graphs/contributors) who made this possible.__