'use strict';

var path = require('path');
var del = require('delete');
var isValid = require('is-valid-app');
var dir = path.resolve.bind(path, __dirname, 'templates');

module.exports = function(app) {
  if (!isValid(app, 'update-eslint')) return;

  /**
   * Register a generator
   */

  app.register('generate-eslint', require('generate-eslint'));

  /**
   * Update the `.eslintrc.json` file in the current working directory.
   *
   * ```sh
   * $ update eslint
   * ```
   * @name eslint
   * @api public
   */

  app.task('eslint', {silent: true}, ['eslint-del', 'eslint-new']);

  /**
   * Adds a new `.eslintrc.json` file by running [generate-eslint][]. The template
   * is [customizable](#customization). This task is also aliased as `eslint-new`
   * to provide a semantic task name for calling this task programmatically.
   *
   * ```sh
   * $ update eslint:new
   * ```
   * @name eslint:new
   * @api public
   */

  app.task('new', ['eslint-new']);
  app.task('eslint-new', {silent: true}, function(cb) {
    app.generate('generate-eslint', cb);
  });

  /**
   * Delete the `eslintrc` and `jshint` files in the current working directory. Also
   * aliased as `eslint-del` to provide a semantic task name for calling this task
   * programmatically.
   *
   * ```sh
   * $ update eslint:del
   * ```
   * @name eslint:del
   * @api public
   */

  app.task('del', ['eslint-del']);
  app.task('eslint-del', {silent: true}, function() {
    return del(['.jshintrc', '.eslintrc.json', '.eslintrc'], {cwd: app.cwd})
      .then(function(files) {
        if (files.length && app.options.verbose) {
          console.log('deleted', files.join(', '));
        }
      });
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
