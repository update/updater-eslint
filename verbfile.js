'use strict';

module.exports = function(verb) {
  verb.use(require('verb-readme-generator'));
  verb.generator('eslint', require('./'));

  verb.helper('taskList', function(name) {
    var generator = this.app.getGenerator(name);
    var tasks = Object.keys(generator.tasks);

    return tasks.map(function(name) {
      return `- [${name}](#${name.split('-').join('')})`;
    }).join('\n');
  });

  verb.task('docs', ['setup', 'templates'], function() {
    return verb.src('docs/src/*.md')
      .pipe(verb.renderFile('*'))
      .pipe(verb.dest('docs'));
  });

  verb.task('default', ['readme']);
};

function matchDep(deps, key) {
  var keys = Object.keys(deps);
  var len = keys.length;
  var idx = -1;
  while (++idx < len) {
    var dep = keys[idx];
    var match = /^generate-(.*)/.exec(dep);
    if (!match) continue;
    var name = match[1];
    if (key.indexOf(name) === 0) {
      return dep;
    }
  }
  return null;
}
