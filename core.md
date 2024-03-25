single threaded runtime, has a single call stack, it can do one thing at the time, it can run one piece of code at the time


## Event loop 
has one very simple job: it looks at the stack, it looks at the task queue. If the stack is empty, it takes the first thing on the queue and push it on the stack.


Callbacks are functions that are passed as arguments to other functions