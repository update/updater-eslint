# updater-eslint [![NPM version](https://img.shields.io/npm/v/updater-eslint.svg?style=flat)](https://www.npmjs.com/package/updater-eslint) [![NPM downloads](https://img.shields.io/npm/dm/updater-eslint.svg?style=flat)](https://npmjs.org/package/updater-eslint) [![Build Status](https://img.shields.io/travis/update/updater-eslint.svg?style=flat)](https://travis-ci.org/update/updater-eslint)

Update a `.eslintrc.json` file based on a template and preferences. This updater can be used from the command line when installed globally, or as a plugin in other updaters.

## TOC

- [Examples](#examples)
  * [Update an existing .eslintrc.json file](#update-an-existing-eslintrcjson-file)
  * [Add a new .eslintrc.json file](#add-a-new-eslintrcjson-file)
- [What is "Update"?](#what-is-update)
- [Gettings started](#gettings-started)
  * [Install](#install)
  * [Running {%= name %}](#running-%-name-%)
  * [Running tasks](#running-tasks)
  * [Available tasks](#available-tasks)
- [Customization](#customization)
- [About](#about)
  * [Related projects](#related-projects)
  * [Contributing](#contributing)
  * [Running tests](#running-tests)
  * [Author](#author)
  * [License](#license)

_(TOC generated by [verb](https://github.com/verbose/verb) using [markdown-toc](https://github.com/jonschlinkert/markdown-toc))_

## Examples

### Update an existing .eslintrc.json file

![updater-eslint demo](https://raw.githubusercontent.com/update/updater-eslint/master/demo-update.gif)

### Add a new .eslintrc.json file

![updater-eslint demo](https://raw.githubusercontent.com/update/updater-eslint/master/demo-create.gif)

## What is "Update"?

[Update](https://github.com/update/update) is a new, open-source developer framework for automating updates of any kind in code projects. For more information:

* Visit the [update project](https://github.com/update/update)
* Visit the [update documentation](https://github.com/update/update)
* Find [updaters on npm](https://www.npmjs.com/browse/keyword/update-updater) (help us [author updaters](https://github.com/update/update/blob/master/docs/updaters.md))

## Gettings started

### Install

**Install update**

If you haven't already installed [update](https://github.com/update/update) globally, you can do that now with the following command:

```sh
$ npm install --global update
```

This adds `update` to your system path, allowing it to be run from any directory.

**Install updater-eslint**

Install this module with the following command:

```sh
$ npm install --global updater-eslint
```

### Running updater-eslint

You should now be able to run `updater-eslint` with the following command:

```js
$ gen eslint
```

**What will this do?**

This updater's `default` task will replace the `.eslintrc.json` file in the current working directory with either `~/templates/_eslintrc.json` ([defined by you](#customization) in user home), or if a template does not exist in user home the [default template](templates/_eslintrc.json) will be used.

### Running tasks

Tasks on `updater-eslint` are by run passing the name of the task to run after the updater name, delimited by a comma.

**Example**

The following will run the `bar` task from updater `foo`:

```sh
$ gen foo:bar
       ^   ^
 updater  task
```

**Default task**

If a task is not explicitly passed Update's CLI will run the `default` task.

### Available tasks

* [eslint](#eslint)
* [eslint-new](#eslintnew)
* [eslint-del](#eslintdel)
* [default](#default)

### [eslint](index.js#L27)

Update the `.eslintrc.json` file in the current working directory or specified `--cwd`.

**Example**

```sh
$ update eslint
```

### [eslint:new](index.js#L39)

Adds a new `.eslintrc.json` file by running the `default` task from [generate-eslint](https://github.com/generate/generate-eslint#eslintdefault)

**Example**

```sh
$ update eslint:new
```

### [eslint:del](index.js#L54)

Delete the `eslintrc` and `jshint` files in the current working directory, or specified `--cwd`.

**Example**

```sh
$ update eslint:del
```

### [eslint](index.js#L68)

Alias to allow running the [eslint](#eslinteslint) task with the following command:

**Example**

```sh
$ update eslint
```

Visit Update's [task documentation](https://github.com/update/update/blob/master/docs/tasks.md).

## Customization

**Overriding templates**

You can override a template by adding a template of the same name to the `templates` directory in user home. For example, to override the `_eslintrc.json` template, add a template at the following path `~/templates/_eslintrc.json`.

## About

### Related projects

You might also be interested in these projects:

* [assemble](https://www.npmjs.com/package/assemble): Assemble is a powerful, extendable and easy to use static site generator for node.js. Used… [more](https://github.com/assemble/assemble) | [homepage](https://github.com/assemble/assemble "Assemble is a powerful, extendable and easy to use static site generator for node.js. Used by thousands of projects for much more than building websites, Assemble is also used for creating themes, scaffolds, boilerplates, e-books, UI components, API docum")
* [update](https://www.npmjs.com/package/update): Update is a developer framework and CLI for automating updates of any kind in code… [more](https://github.com/update/update) | [homepage](https://github.com/update/update "Update is a developer framework and CLI for automating updates of any kind in code projects. All updating is accomplished using plugins called _updaters_, which are run by command line or API, and can be installed globally, locally, or in a local `updatef")
* [verb](https://www.npmjs.com/package/verb): Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used… [more](https://github.com/verbose/verb) | [homepage](https://github.com/verbose/verb "Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used on hundreds of projects of all sizes to generate everything from API docs to readmes.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

### License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/update/updater-eslint/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on July 06, 2016._