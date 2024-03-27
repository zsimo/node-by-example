
## Node.js
[Node.js](https://nodejs.org/en) is built on top of the [V8 JavaScript engine](https://v8.dev/), which is responsible for executing JavaScript code. However, Node.js extends the functionality of the V8 engine by providing APIs for I/O, `networking`, and other `system operations`. [Libuv](https://docs.libuv.org/en/v1.x/) plays a crucial role in this extension by powering the `event loop` and handling asynchronous I/O operations.

![Node platform](./assets/v8-libuv.png "Node platform")


### V8
V8 is Google’s open source high-performance JavaScript `engine`, written in `C++`. It is used in Chrome and in Node.js, among others.

V8 implements [ECMAScript](https://tc39.es/ecma262/), providing all the data types, operators, objects and functions specified in the ECMA standard.

V8 `compiles` and `executes` JavaScript source code, handles memory allocation for objects, and garbage collects objects it no longer needs.

V8 enables any `C++` application to expose its own objects and functions to JavaScript code.

### Libuv
Libuv is a multi-platform `C` library that provides support for asynchronous I/O based on `event loops`.

It `implements all of the asynchronous behaviors of the platform`.

It was initially developed for Node.js to handle the event-driven architecture, but it has since been adopted by other projects due to its performance and efficiency. Libuv's primary features include:
- Event loop 
- Asynchronous file and file system operations 
- Asynchronous TCP and UDP sockets 
- Child processes
- Thread pool (4 threads by default)
- Timers, signals, and polls


### Event loop
The Event loop is what allows Node.js to perform non-blocking I/O operations — despite the fact that `JavaScript (V8) is single-threaded` — by offloading operations to the system kernel whenever possible.

Since most `modern kernels are multi-threaded`, they can handle multiple operations executing in the background. When one of these operations completes, the kernel tells Node.js so that the appropriate `callback` may be added to the poll `queue` to eventually be executed.

In practice, Event loop has one very simple job: it looks at the stack, it looks at the task queue. If the stack is empty, it takes the first thing on the queue and push it on the stack.



single threaded runtime, has a single call stack, it can do one thing at the time, it can run one piece of code at the time


https://codedamn.com/news/nodejs/libuv-architecture

```mermaid
graph TD
    subgraph Node.js Architecture
        JavaScript(V8) --> Event_Loop
        Libuv --> Event_Loop
        Event_Loop --> Node.js_APIs
        Node.js_APIs --> NPM_Modules
    end
```




Callbacks are functions that are passed as arguments to other functions


https://tech.jotform.com/unraveling-the-javascript-execution-pipeline-understanding-v8-event-loop-and-libuv-for-4da6789fcfc2
