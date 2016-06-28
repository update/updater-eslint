# updater-eslint [![NPM version](https://img.shields.io/npm/v/updater-eslint.svg?style=flat)](https://www.npmjs.com/package/updater-eslint) [![NPM downloads](https://img.shields.io/npm/dm/updater-eslint.svg?style=flat)](https://npmjs.org/package/updater-eslint) [![Build Status](https://img.shields.io/travis/update/updater-eslint.svg?style=flat)](https://travis-ci.org/update/updater-eslint)

Update an existing eslint config file, or if one does not exist it will add one using your saved config defaults.

## What is update?

Update is a new, open-source developer framework for automating updates of any kind to code projects.

## Quick start

**API**

Create tasks for things you'd rather not do manually (or more than once), like updating copyright years:

```js
var update = require('update');
var app = update();

app.task('copyright', function() {
  return app.src('*')
});
```

**CLI**

Use [update's CLI](#cli) to run [tasks](#tasks) and [updaters](#updaters). For example, to run the copyright task from the previous example, you would run:

```sh
$ update copyright
```

## What does it do?

> Update is the assistant who takes care of the timewasters in a project, so you can focus on doing what you love: writing code

From time to time we all neglect things in a project, either because they are tedious or time consuming, or just less important than other things that need to get done. Like:

* updating the year in copyright statements (in banners, readme, license files, etc)
* adding missing dotfiles, or linting and updating them to reflect your latest prefences or changes in conventions
* updating config files, like `package.json`, by fixing incorrect fields, removing deprecated fields, or adding missing fields

Regardless of our intentions, some things are neglected, some overlooked, some ignored. This is magnified with unstructured data, or things that can't be unit tested.

## How does it work?

Update is not a build system, but it looks like one from 2,000 feet.

* powerful control flow, with [tasks] and [updaters]

**Tasks**

Update uses some of the same libraries that power [gulp](http://gulpjs.com). If you're familiar with [gulp](http://gulpjs.com), then you're already familiar with how tasks work in update.

## Quickstart

Use as a plugin, to extend your own updater with this updater:

```js
module.exports = function(app) {
  app.use(require('updater-eslint'));
};
```

Register as a sub-updater, to add this updater to a namespace in your updater:

```js
module.exports = function(app) {
  // you can use any arbitrary name to register the updater
  app.register('updater-eslint', require('updater-eslint'));
};
```

See the [API docs](#api) for more detailed examples and descriptions.

***

### CLI

**Installing the CLI**

To run the `updater-eslint` generator from the command line, you'll need to install [update](https://github.com/update/update) globally first. You can do that now with the following command:

```sh
$ npm i -g update
```

This adds the `gen` command to your system path, allowing it to be run from any directory.

**Help**

Get general help and a menu of available commands:

```sh
$ gen help
```

**Running the `updater-eslint` generator**

Once both [update](https://github.com/update/update) and `updater-eslint` are installed globally, you can run the generator with the following command:

```sh
$ gen updater-eslint
```

If completed successfully, you should see both `starting` and `finished` events in the terminal, like the following:

```sh
[00:44:21] starting ...
...
[00:44:22] finished ✔
```

If you do not see one or both of those events, please [let us know about it](../../issues).

### Tasks

#### [eslint](index.js#L22)

Update the `.eslintrc.json` file in the current working directory or specified `--cwd`.

**Example**

```sh
$ update eslint
```

#### [eslint:del](index.js#L35)

Delete the `eslintrc` and `jshint` files in the current working directory, or specified `--cwd`.

**Example**

```sh
$ update eslint:del
```

#### [eslint:new](index.js#L49)

Add a new `.eslintrc.json` file. Runs the `default` task from [generate-eslint](https://github.com/generate/generate-eslint#eslintdefault)

**Example**

```sh
$ update eslint:new
```

#### [eslint](index.js#L63)

Alias to allow running the [eslint](#eslinteslint) task with the following command:

**Example**

```sh
$ update eslint
```

***

### API

**Use as a plugin in your generator**

Use as a plugin if you want to extend your own generator with the features, settings and tasks of updater-eslint, as if they were created on your generator.

In your `generator.js`:

```js
module.exports = function(app) {
  app.use(require('updater-eslint'));

  // specify any tasks from updater-eslint. Example:
  app.task('default', ['updater-eslint']);
};
```

**Use as a sub-generator**

Use as a sub-generator if you want expose the features, settings and tasks from updater-eslint on a _namespace_ in your generator.

In your `generator.js`:

```js
module.exports = function(app) {
  // register the updater-eslint generator (as a sub-generator with an arbitrary name)
  app.register('foo', require('updater-eslint'));

  app.task('minify', function(cb) {
    // minify some stuff
    cb();
  });

  // run the "default" task on updater-eslint (aliased as `foo`), 
  // then run the `minify` task defined in our generator
  app.task('default', function(cb) {
    app.update(['foo:default', 'minify'], cb);
  });
};
```

Tasks from `updater-eslint` will be available on the `foo` namespace from the API and the command line. Continuing with the previous code example, to run the `default` task on `updater-eslint`, you would run `gen foo:default` (or just `gen foo` if `foo` does not conflict with an existing task on your generator).

To learn more about namespaces and sub-generators, and how they work, [visit the getting started guide](https://github.com/update/getting-started).

## Contributing

This document was generated by [verb-readme-generator](https://github.com/verbose/verb-readme-generator) (a [verb](https://github.com/verbose/verb) generator), please don't edit directly. Any changes to the readme must be made in [.verb.md](.verb.md). See [Building Docs](#building-docs).

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new). Or visit the [verb-readme-generator](https://github.com/verbose/verb-readme-generator) project to submit bug reports or pull requests for the readme layout template.

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install -g verb verb-readme-generator && verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/update/updater-eslint/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on June 09, 2016._