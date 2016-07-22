'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var update = require('update');
var del = require('delete');
var updater = require('..');
var app;

var actual = path.resolve.bind(path, __dirname, 'actual');

function exists(name, cb) {
  var filepath = actual(name);
  return function(err) {
    if (err) return cb(err);

    fs.stat(filepath, function(err, stat) {
      if (err) return cb(err);
      assert(stat);
      del(path.dirname(filepath), cb);
    });
  }
}
function notExists(name, cb) {
  var filepath = actual(name);
  return function(err) {
    if (err) return cb(err);

    fs.stat(filepath, function(err, stat) {
      assert(err);
      assert(!stat);
      del(actual(), cb);
    });
  }
}

describe('update-eslint', function() {
  beforeEach(function() {
    app = update({silent: true});
    app.cwd = actual();
    app.option('dest', actual());
  });

  describe('plugin', function() {
    it('should only register the plugin once', function(cb) {
      var count = 0;
      app.on('plugin', function(name) {
        if (name === 'update-eslint') {
          count++;
        }
      });
      app.use(updater);
      app.use(updater);
      app.use(updater);
      assert.equal(count, 1);
      cb();
    });

    it('should extend tasks onto the instance', function() {
      app.use(updater);
      assert(app.tasks.hasOwnProperty('default'));
      assert(app.tasks.hasOwnProperty('eslint'));
      assert(app.tasks.hasOwnProperty('eslint-del'));
      assert(app.tasks.hasOwnProperty('eslint-new'));
    });

    it('should run the `default` task', function(cb) {
      app.use(updater);
      app.update('default', exists('.eslintrc.json', cb));
    });

    it('should run the `new` task', function(cb) {
      app.use(updater);
      app.update('eslint:eslint-new', exists('.eslintrc.json', cb));
    });

    it('should run the `new` and `del` tasks', function(cb) {
      app.use(updater);
      app.update('eslint', ['new', 'del'], notExists('.eslintrc.json', cb));
    });

    it('should run the `eslint-new` and `eslint-del` tasks', function(cb) {
      app.use(updater);
      app.update('eslint', ['eslint-new', 'eslint-del'], notExists('.eslintrc.json', cb));
    });
  });

  describe('updater', function() {
    it('should work as a updater', function(cb) {
      app.register('eslint', updater);
      app.update('eslint', exists('.eslintrc.json', cb));
    });

    it('should run the `default` task', function(cb) {
      app.register('eslint', updater);
      app.update('eslint:default', exists('.eslintrc.json', cb));
    });

    it('should run the `new` task', function(cb) {
      app.register('eslint', updater);
      app.update('eslint:new', exists('.eslintrc.json', cb));
    });

    it('should run the `new` (alias) task', function(cb) {
      app.register('eslint', updater);
      app.update('eslint:new', exists('.eslintrc.json', cb));
    });
  });

  describe('sub-updater', function() {
    it('should work as a sub-updater', function(cb) {
      app.register('foo', function(foo) {
        foo.register('eslint', updater);
      });
      app.update('foo.eslint', exists('.eslintrc.json', cb));
    });

    it('should run the `default` task', function(cb) {
      app.register('foo', function(foo) {
        foo.register('eslint', updater);
      });
      app.update('foo.eslint:default', exists('.eslintrc.json', cb));
    });

    it('should run the `new` task', function(cb) {
      app.register('foo', function(foo) {
        foo.register('eslint', updater);
      });
      app.update('foo.eslint:new', exists('.eslintrc.json', cb));
    });

    it('should run the `new` (alias) task', function(cb) {
      app.register('foo', function(foo) {
        foo.register('eslint', updater);
      });
      app.update('foo.eslint:new', exists('.eslintrc.json', cb));
    });
  });
});
