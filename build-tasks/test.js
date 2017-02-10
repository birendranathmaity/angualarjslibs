var gulp = require('gulp');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var gutil = require('gulp-util');

/**
 * Runs tests in various conditions and scenarios.
 *
 * Tasks
 *
 * pre-unit - Prepares code coverage tool, Istanbul, to run.
 * unit-test - Runs unit tests for the test build variant. It also runs code coverage.
 * unit - Runs unit tests for development environment.
 *
 * testBlob - list of test files to run (default: all test files)
 * coverageVariable - unique id for test run. This tells Istanbul which coverage report goes with which suite of tests.
 */

var coverageVariable = '$$cov_' + new Date().getTime() + '$$';

// Setup Istanbul
gulp.task('pre-unit', function () {
    coverageVariable = '$$cov_' + new Date().getTime() + '$$';

    return gulp.src([
            'app/**/*.js'
        ])
        .pipe(istanbul({ coverageVariable: coverageVariable }))
        .pipe(istanbul.hookRequire());
});
// Run tests independently
gulp.task('unit-test', ['lint-build', 'pre-unit'], function () {
    return gulp.src(['tests/unit/**/*.js'])
        .pipe(plumber())
        .pipe(notify({ title: 'Unit Tests', message: 'Running unit tests.', onLast: true }))
        .pipe(mocha())
        .on('error', function (e) {
            gutil.log(e);

            process.exit(1);
        })
        .pipe(istanbul.writeReports({
            coverageVariable: coverageVariable,
            reporters: ['text-summary', 'html'],
            reportOpts: {
                html: { dir: './coverage' }
            }
        }))
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 70 } }));
});

// Run tests with development build
gulp.task('unit', function () {
    return gulp.src('tests/unit/**/*.js')
        .pipe(plumber())
        .pipe(notify({ title: 'Unit Tests', message: 'Running unit tests.', onLast: true }))
        .pipe(mocha())
        .on('end', function () {
            testBlob = [];
        });
});

