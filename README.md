# PostCSS Unit Conversion [![Build Status][ci-img]][ci] [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
<img src="https://img.shields.io/badge/version-0.0.1-green.svg" alt="Version 0.0.1" />

[PostCSS] plugin for converting units from px to em or rem. Removes the need for using scss mixins like `em()` or `rem()`. Write in px and convert on the fly.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/jomurgel/postcss-unit-conversion.svg
[ci]:      https://travis-ci.org/jomurgel/postcss-unit-conversion

## Conversion

### In
```css
.foo {
  border: 2px solid blue;
  border-radius: 2px;
  box-shadow: 5px 10px #888;
  font-size: 32px;
  letter-spacing: 2px;
  margin: 2px 0;
  padding: 10px 0;
  text-shadow: 2px 2px #f00;
}
```

### Out
```css
.foo {
  border: 2px solid blue;
  border-radius: 2px;
  box-shadow: 0.313rem 0.625rem #888;
  font-size: 2.000rem;
  letter-spacing: 0.125em;
  margin: 0.125rem 0;
  padding: 0.625rem 0;
  text-shadow: 0.125em 0.125em #f00;
}
```

## Usage
Add to your project and requrire.

``` js
postcss([
  require( 'postcss-unit-conversion' )( options )
]);
```

Set optional options (defaults below).
``` js
var options = {
    base: 16,
    precision: 3,
    toEM: [
        'letter-spacing',
        'text-shadow'
    ],
    toREM: [
        'box-shadow',
        'font-size',
        'margin',
        'padding'
    ]
};
```

Anything not added to either `toEM` or `toREM` will retain px (or supplied) values.

## Testing
Run
``` bash
$ npm run test
```

Tests the code example above. Will test against options provided in your post css setup.

See [PostCSS] docs for examples for your environment.
