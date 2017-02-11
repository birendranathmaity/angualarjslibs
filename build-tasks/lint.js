var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var gutil = require('gulp-util');

/**
 * Lints all javascript files in source and test directories.
 *
 * Main configuration is .jshintrc on the root directory. There might be .jshintrc files inside some directories to
 * override the global file.
 */
gulp.task('lint', function () {
    return gulp.src(['app/**/*.js', 'tests/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish, {verbose: true}))
        .pipe(jshint.reporter('fail'));
});

/**
 * Same lint task as above, but will exit the process if an error is detected. Used for build process.
 */
gulp.task('lint-build', function () {
    return gulp.src(['app/**/*.js', 'tests/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish, {verbose: true}))
        .pipe(jshint.reporter('fail'))
        .on('error', function (e) {
            gutil.log(e.message);

            console.log('Exiting process...');
            process.exit(1);
        });
});