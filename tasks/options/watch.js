var Helpers = require('../helpers'),
    filterAvailable = Helpers.filterAvailableTasks;

var scripts = '{app,tests}/**/*.{js,coffee,em}',
    templates = 'app/templates/**/*.{hbs,handlebars,hjs,emblem}',
    sprites = 'app/sprites/**/*.{png,jpg,jpeg}',
    styles = 'app/styles/**/*.{css,sass,scss,less,styl}',
    indexHTML = 'app/index.xml',
    other = '{app,tests,public}/**/*';

module.exports = {
  scripts: {
    files: [scripts],
    tasks: ['lock', 'buildScripts', 'unlock']
  },
  templates: {
    files: [templates],
    tasks: ['lock', 'buildTemplates:debug', 'unlock']
  },
  sprites: {
    files: [sprites],
    tasks: filterAvailable(['lock', 'fancySprites:create', 'unlock'])
  },
  styles: {
    files: [styles],
    tasks: ['lock', 'buildStyles', 'url_transform:app', 'unlock']
  },
  indexHTML: {
    files: [indexHTML],
    tasks: ['lock', 'buildIndexHTML:debug', 'url_transform:app', 'unlock']
  },
  other: {
    files: [other, '!'+scripts, '!'+templates, '!'+styles, '!'+indexHTML],
    tasks: ['lock', 'build:debug', 'unlock']
  },

  options: {
    // No need to debounce
    debounceDelay: 0,
    // When we don't have inotify
    interval: 100,
    livereload: Helpers.isPackageAvailable("connect-livereload")
  }
};
