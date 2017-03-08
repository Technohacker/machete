# Machete
The Machete HTML DOM Game Framework

[![NPM](https://nodei.co/npm/machete-framework.png)](https://npmjs.org/package/machete-framework)

Built by [Technohacker](https://github.com/Technohacker)

## Concept
Unlike traditional JS Game Engines (which use the `<canvas>` element), this framework uses the HTML DOM, rendered by the Browser's DOM Engine.

This offers a few benefits:

* You can design the stage using HTML instead of defining it in JS code thus separating concerns.
* Over the years, browser vendors have strived to get the most performance out of their web layout engines. Therefore, DOM rendering is sometimes faster than `<canvas>` rendering.
* HTML can be easily styled with CSS, so you don't have to specify the style in JS code.

## Progress
I can consider the framework as quite usable but I need others to try out the framework for understanding the API usability. So I mark it **alpha**.

I am currently porting my existing code to ES2015 (ES6) classes with SystemJS as a module loader. I prefer using the ES6 code directly over compiling to ES5 as modern browsers have much better support for ES6 as compared to transpilers.

Currently tested browsers:

* Firefox Aurora 53.0a2
* Chromium 56.0.2924.87-1

I don't plan to support any version of IE currently. Tread carefully if you do plan to support IE for your game.

Pull requests are always welcome! :smile:

## TODO:
1. Offer two versions: raw ES6, Transpiled to ES5
2. Add documentation
