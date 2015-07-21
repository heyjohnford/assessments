var gulp = require('gulp');
var react = require('gulp-react');
var concat = require('gulp-concat');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var webpack = require('webpack');
var backEndConfig = require('./webpack.backendconfig.js');
var frontEndConfig = require('./webpack.frontendconfig.js');

function onBuild(done) {
  return function(err, stats) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log(stats.toString());
    }

    if (done) {
      done();
    }
  };
}

gulp.task('default', ['react', 'backend-build', 'frontend-build', 'less', 'watch']);

gulp.task('production', ['react', 'backend-build', 'frontend-build', 'less']);

gulp.task('react', function(done) {
  return gulp.src('./src/components/*.jsx')
    .pipe(react())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./src'));
});

gulp.task('less', function(done) {
  return gulp.src('./public/less/app.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('frontend-build', function(done) {
  webpack(frontEndConfig).run(onBuild(done));
});

gulp.task('backend-build', function(done) {
  webpack(backEndConfig).run(onBuild(done));
});

gulp.task('watch', function() {
  gulp.watch('./src/**/*.js', ['backend-build']);
  gulp.watch('./lib/**/*.js', ['backend-build']);
  gulp.watch('./src/**/*.jsx', ['react', 'frontend-build']);
  gulp.watch('./public/less/*.less', ['less']);
});
