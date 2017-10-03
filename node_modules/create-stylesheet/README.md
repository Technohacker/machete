# create-stylesheet [![build status](https://img.shields.io/travis/mzabriskie/create-stylesheet.svg?style=flat-square)](https://travis-ci.org/mzabriskie/create-stylesheet)

Dynamically create a stylesheet

## Example

```js
import createStyleSheet from 'create-stylesheet';

let style = createStyleSheet({
  '.foo': {
    fontSize: 12,
    padding: 5
  },
  '.bar': {
    fontSize: 16,
    color: 'grey'
  }
});

document.head.appendChild(style);
```
