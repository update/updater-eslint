'use strict';

var fs = require('fs');
var path = require('path');
var extend = require('extend-shallow');

module.exports = function (app, base, env) {
  var config = require(__dirname + '/templates/_eslintrc.json');

  base.on('loaded', function(files) {
    if (!files.getFile('.eslintrc')) {
      var file = app.getFile('_eslintrc.json');
      file.basename = '.eslintrc';
      base.files('.eslintrc', file);
    }
  });

  base.onLoad(/\.eslint$/, function (file, next) {
    if (file.json) {
      file.json = extend({}, file.json, config);
    }
    next();
  });

  base.onLoad(/package\.json/, function (file, next) {
    if (!file.json.hasOwnProperty('eslintConfig')) {
      return next();
    }

    config = extend({}, config, file.json.eslintConfig);
    file.json.eslintConfig = config;
    next();
  });
};

