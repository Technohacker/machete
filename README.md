# Machete
The Machete HTML DOM Game Framework

Built by [Technohacker](https://github.com/Technohacker)

## Concept
Unlike traditional JS Game Engines (which use the `<canvas>` element), this framework uses the HTML DOM, rendered by the Browser's DOM Engine.

This offers a few benefits:

* You can design the stage using HTML instead of defining it in JS code thus separating concerns.
* Over the years, browser vendors have strived to get the most performance out of their web layout engines. Therefore, DOM rendering is faster than `<canvas>` rendering.
* HTML can be easily styled with CSS, so you don't have to specify the style in JS code.

## Progress
This framework is **highly pre-alpha**. The API can change at any time. It is not recommended for use as yet.

Pull requests are always welcome! :smile:

## TODO:
1. Offer two versions, raw ES6 with lesser browser bupport
2. Transpiled to ES5 version for older browsers
