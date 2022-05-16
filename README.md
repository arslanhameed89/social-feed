
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript NodeJS MongoDB.


## Pre-requisites
- NodeJS (`>=14.1.2`)
- MONGODB (`>= 4.0`)
--- 
- In case you dont have locally setup mongo
- cd social-feed/scripts
- ./dokcerized-mongodb-container.sh

- -- Note: Make you sure you have locally installed docker and proper have proper permissions
---

## Prepare ENV
* Copy `.env.example` to `.env`

**SET APP LEVEL PARAMS**
```shell script
APP_NAME=SOCIAL-FEED
HOST=localhost
PORT=3000
NODE_ENV=development
SERVER=http://localhost:3000
API_GLOBAL_PREFIX=api/v1
```

**MONGODB CONNECTION**
```shell script
MONGODDB_CONNECTION_STRING=mongodb://localhost:27017/social-feed
```
**DEFAULT PAGINATION**
```shell script
PAGINATION_PER_PAGE=40
```

**TIME ZONE**
```shell script
TIME_ZONE=Asia/Dubai
```

**IMAGE SERVER PATH**
```shell script
IMAGE_SERVER_PATH='/public'
```

**PASSWORD SALT ROUND**
```shell script
SALT_ROUND=10
```

**SWAGGER LINK**

```shell script
http://localhost:3000/documentation/
```

## Dependency Installation
```bash
$ npm install
```

## Running the app in development
---
```bash
# development 
$ npm run start:dev
```

## Running the app in Production + Staging
---
#### Build
```bash
# It will create build inside dist
$ npm run build 
```

#### Start
```bash
pm2 start npm --name "social-feed" -- run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
