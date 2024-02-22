# node-by-example
Ready to use `node.js` scripts using [Lucid Architecture](lucid.md) divided by sections:
- [mysql](mysql/readme.md)
- [streams](streams/readme.md)

Available Service `(FaaS)`:
- mysql
  - runParallelQueriesWithBaseConnection.js
  - runParallelQueriesWithEndingConnection.js
  - runParallelQueriesWithPoolConnection.js
  - runQueriesWithBaseConnection.js
  - runQueriesWithEndingConnection.js
- streams
  - downloadEncrypt.js
  - downloadTransform.js
  - downloadTransformUpload.js
  - mysqlCsvZip.js

How to use:
```sh
    npm run service <service name>
    npm run service downloadTransform
    #or
    node serviceRunner.js downloadTransform
```

