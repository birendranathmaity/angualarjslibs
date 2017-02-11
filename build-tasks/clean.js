var gulp = require('gulp');
var clean = require('gulp-clean');

/**
 * Cleans output directory
 */
gulp.task('clean', function () {
    return gulp.src(['dist'], {read: false})
        .pipe(clean());
});

gulp.task('clean-index', function () {
    return gulp.src(['./index.html'], {read: false})
        .pipe(clean());
});