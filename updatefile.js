'use strict';

var extend = require('extend-shallow');

module.exports = function (app, base, env) {
  var config = require('./eslintrc.json');

  base.onLoad(/\.eslint$/, function (file, next) {
    file.json = extend({}, file.json, config);
    next();
  });

  base.onLoad(/package\.json/, function (file, next) {
    if (!file.json.hasOwnPropert('eslintConfig')) {
      return next();
    }

    config = extend({}, config, file.json.eslintConfig);
    file.json.eslintConfig = config;
    next();
  });
};

