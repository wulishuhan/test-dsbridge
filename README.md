# mock

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Temporary data structure

**user**
|id|name|avatar|address|username|password|
|-|-|-|-|-|-|

**user-settings**
|id|user-id|introduction|who-i-am|skill-level|tools-use|website|
|-|-|-|-|-|-|-|

**thing**
|id|user-id|show-image-url|thing-name|public-time|
|-|-|-|-|-|

**thing-resource-file**
|id|thing-id|file-url|file-name|public-time|downloads|
|-|-|-|-|-|-|

**likes**
|thing-id|user-id|
|-|-|

**comments**
|thing-id|uid|pid|
|-|-|-|

**follows**
|id|followed-id|user-id|
|-|-|-|