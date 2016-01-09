'use strict';

var fs = require('fs');
var path = require('path');
var extend = require('extend-shallow');

module.exports = function(app, base, env) {
  var config = require(__dirname + '/templates/_eslintrc.json');
  app.templates('*');

  base.on('loaded', function(files) {
    var file = files.getFile('.eslintrc') || files.getFile('.eslintrc.json');
    if (!file) {
      console.log('writing .eslintrc.json');
      file = app.getFile('_eslintrc.json');
      file.json = JSON.parse(file.content);
      base.files('.eslintrc.json', file);
    }

    if (env.base.argv.eslintignore) {
      var ignore = files.getFile('.eslintignore');
      if (ignore) return;

      console.log('writing .eslintignore');
      base.files('.eslintignore', app.getFile('_eslintignore'));
    }
  });

  base.onLoad(/\.eslintrc(\.json)?$/, function(file, next) {
    if (file.json) {
      file.basename = '.eslintrc.json';
      if (env.base.argv.verbose) {
        console.log('updating .eslintrc.json');
      }
      file.json = extend({}, file.json, config);
    }
    next();
  });

  base.onLoad(/package\.json/, function(file, next) {
    if (!file.json.hasOwnProperty('eslintConfig')) {
      return next();
    }

    config = extend({}, config, file.json.eslintConfig);
    file.json.eslintConfig = config;
    next();
  });

  app.task('default', function(cb) {
    console.log('update-eslint tasks:');
    console.log(' - eslintignore');
  });
};

