### [Lucid Architecture](https://docs.lucidarch.dev/principles/) Overall view
### Services (FaaS)
Services or `Function-as-a-Service` (FaaS) functions that represent a single system functionality
```
Services
    |__Features
       |__Operations
          |__Jobs
```

### Features
It contains the logic that implements the feature but with the least amount of detail, by running jobs and operations. Features shall serve a single purpose. Features shall not call other features: run as many jobs and operations as you like, but never a feature.
```
Feature01
    |__Job01
    |__Job02
```
```
Feature02
    |__Operation01
    |__Operation02
```



### Operations
Increase the degree of code reusability by piecing `jobs` together to provide composite functionalities from across domains. Operations shall not call other operations: Run as many jobs as you like, but never any other unit.
```
Operation01
    |__Job01
    |__Job02
```

### Jobs
Jobs shall perform a single task. Jobs shall not call other jobs.
