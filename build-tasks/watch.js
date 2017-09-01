var gulp = require('gulp');
var livereload = require('gulp-livereload');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var mocha = require('gulp-mocha');

var lintBlob = [];
var testBlob = [];
var SASS_SRC = 'scss/**/*.scss';

/**
 * Watch tasks
 *
 * Unlike other tasks which are broken down by responsibility, the watch tasks need to be placed together due to the
 * nature of the blobbing logic.
 */

// Watch files For changes
gulp.task('watch', [ 'browserify','app-css', 'change-watch'], function () {
    livereload.listen();
    // Reload page
    gulp.watch(['dist/**/*', 'app/**/*.html', 'index.html','assets/css/**/*.css']).on('change', livereload.changed);
});

// Run browserify anytime a change is made
//gulp.task('browserify-watch', ['unit-watch', 'lint-watch'], function() {
gulp.task('browserify-watch', ['lint-watch'], function () {
    gulp.start(['browserify']);
});

// Run tests with development build
// gulp.task('unit-watch', function () {
//     return gulp.src(testBlob)
//         .pipe(plumber())
//         .pipe(notify({ title: 'Unit Tests', message: 'Running unit tests.', onLast: true }))
//         .pipe(mocha())
//         .on('end', function () {
//             testBlob = [];
//         });
// });

// Run static code analysis for each file as it's changed.
gulp.task('lint-watch', function () {
    return gulp.src(lintBlob)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish, {verbose: true}))
        .pipe(jshint.reporter('fail'))
        .on('end', function () {
            lintBlob = [];
        });
});



// Build blobs for unit tests and linting on file change
gulp.task('change-watch', function () {
    gulp.watch(['app/**/*.js','assets/css/**.css'], ['browserify-watch','app-css'])
        .on('change', function (event) {
            // Only run tests for changed files
            var pathParts = event.path.split('/');
            var lintPath;
            var testPath = 'tests/unit/**/' + pathParts[pathParts.length - 1];

            if (testPath.indexOf('.test.js') < 0) {
                lintPath = 'app/**/' + pathParts[pathParts.length - 1];
                testPath = testPath.replace('.js', '.test.js');
            } else {
                lintPath = testPath;
            }

            lintBlob.push(lintPath);
            testBlob.push(testPath);
        });
});