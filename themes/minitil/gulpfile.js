const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('scss', function () {
  gulp.src('./src/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./static/css'));
});

gulp.task('serve', ['scss'], function () {
  gulp.watch('./src/scss/**/*.scss', ['scss']);
})
