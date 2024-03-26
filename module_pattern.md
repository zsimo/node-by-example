## Module Pattern

The module pattern allows to split up code into smaller, reusable pieces. Every file in `Node.js` is treated as a separate `module`.

Module pattern implements 2 simple rules:
1. the code declared in a module `runs only once`, regardless of how many times the module is required. 
   ```js
   // a.js file
   console.log("a");
   ```
   ```js
    // index.js ile
   require("./a.js");
   require("./a.js");
   // log "a" only once
   ```

2. every declaration in a module is private unless it is `explicitly exported`
   ```js
   // cache.js file
   "use strict";
   
   const _cache = {};
   
   module.exports = {
        get: function (key) {
             if (_cache.hasOwnProperty(key)) {
                 return _cache[key];
             }
        },
        set: function (key, value) {
             if (key) {
                _cache[key] = value;
             }
        }
   };
   ```
   ```js
   // index.js file
   "use strict";

   // same as include the same module in multiple files
   const cacheA = require("./a.js");
   const cacheB = require("./a.js");

   cacheA.set("a", "a");
   console.log(cacheB.get("a"));
   ```

### The module wrapper
Before a module's code is executed, Node.js will wrap it with a function wrapper that looks like the following:
```js
(function(exports, require, module, __filename, __dirname) {
// Module code actually lives in here
}); 
```
By doing this, Node.js achieves a few things:
- It keeps top-level variables (defined with `var`, `const`, or `let`) `scoped to the module` rather than the global object.
- It helps to provide some global-looking variables that are actually specific to the module, such as:
  - The `module` and `exports` objects that the implementor can use to export values from the module.
  - The convenience variables `__filename` and `__dirname`, containing the module's absolute filename and directory path.