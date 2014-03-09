var gulp    = require('gulp'),
    gutil   = require('gulp-util'),
    path    = require('path'),
    nodemon = require('gulp-nodemon'),
    less    = require('gulp-less');

gulp.task('less', function() {
  gulp.src('./public/less/**/*.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('./public/.tmp/css'))
});

gulp.task('nodemon', function() {
  nodemon({
    script: 'server.js',
    ext: 'jade js less',
    env: { 'NODE_ENV': 'development' }
  })
    .on('restart', ['less']);
});

gulp.task('develop', ['less', 'nodemon']);