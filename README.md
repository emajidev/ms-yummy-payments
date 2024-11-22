[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Description

Estructura base de todos los micro servicios que se tengan dentro del ecosistema, la idea es que se clone para iniciar nuevos micro servicios y sea acá donde se definen aspectos básicos de estos servicios como gestión de conexiones y middlewares.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# Migrations

## Seed Commodities:

$ npx nestjs-command seed:example

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

# Support

## Example .env

If you problem with husky, run fallowing command 
```bash
chmod ug+x .husky/*
chmod ug+x .git/hooks/*
```

# Use microservice-base to create new microservice
## Steps

Run the fallowing commands of git
```bash
git remote add base https://gitlab.com/emajidev/microservice-base.git
git fetch base
git merge base/main --allow-unrelated-histories
```
