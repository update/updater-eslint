'use strict';

var path = require('path');
var del = require('delete');
var dir = path.resolve.bind(path, __dirname, 'templates');
var isValid = require('is-valid-app');

module.exports = function(app) {
  if (!isValid(app, 'update-eslint')) return;

  /**
   * Register a generator
   */

  app.register('generate-eslint', require('generate-eslint'));

  /**
   * Update the `.eslintrc.json` file in the current working directory or specified `--cwd`.
   *
   * ```sh
   * $ update eslint
   * ```
   * @name eslint
   * @api public
   */

  app.task('eslint', {silent: true}, ['eslint-del', 'eslint-new']);

  /**
   * Adds a new `.eslintrc.json` file by running [generate-eslint][].
   *
   * ```sh
   * $ update eslint:new
   * ```
   * @name eslint:new
   * @api public
   */

  app.task('eslint-new', {silent: true}, function(cb) {
    app.generate('generate-eslint', cb);
  });

  /**
   * Delete the `eslintrc` and `jshint` files in the current working directory, or
   * specified `--cwd`.
   *
   * ```sh
   * $ update eslint:del
   * ```
   * @name eslint:del
   * @api public
   */

  app.task('eslint-del', {silent: true}, function(cb) {
    del(['.jshintrc', '.eslintrc.json', '.eslintrc'], done(app, cb));
  });

  /**
   * Alias to allow running the [eslint](#eslinteslint) task with the following command:
   *
   * ```sh
   * $ update eslint
   * ```
   * @name eslint
   * @api public
   */

  app.task('default', {silent: true}, ['eslint']);
};

function done(app, cb) {
  return function(err, files) {
    if (err) return cb(err);
    if (files.length && app.options.verbose) {
      console.log('deleted', files.join(', '));
    }
    cb();
  };
}
