const {src, dest, series} = require('gulp');

function defaultTask(cb) {
  // place code for your default task here
  cb();
}

function pagesTask() {
  return src('src/*.html').pipe(dest('dist'));
}

function stylesTask() {
  return src('src/css/*.css').pipe(dest('dist/css'));
}

function scriptsTask() {
  return src('src/js/*.css').pipe(dest('dist/js'));
}

function dataTask() {
  return src('src/data/*.json').pipe(dest('dist/data'));
}

exports.default = defaultTask;
exports.build = series(pagesTask, stylesTask, scriptsTask, dataTask);