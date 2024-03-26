## Module Pattern

The module pattern allows to split up code into smaller, reusable pieces. Every file in `Node.js` is a`module`. Module pattern implements 2 simple rules:
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

   const cacheA = require("./a.js");
   const cacheB = require("./a.js");

   cacheA.set("a", "a");
   console.log(cacheB.get("a"));
   ```
