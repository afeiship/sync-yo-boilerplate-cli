(function () {
  'use strict';

  const gulp = require('gulp');
  const exec = require('child_process').execSync;
  const $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del', '@jswork/gulp-*']
  });

  const usage = exec('sync-yo-boilerplate-cli -h').toString().trim();

  gulp.task('docs', function () {
    return gulp
      .src('docs/template.md')
      .pipe($.replace('__USAGE__', usage))
      .pipe(
        $.rename(function (path) {
          path.dirname = '..';
          path.basename = 'README';
          return path;
        })
      )
      .pipe(gulp.dest('dist'));
  });
})();
