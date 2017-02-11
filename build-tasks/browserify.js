var gulp = require('gulp');
var glob = require('glob');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var notify = require('gulp-notify');
var filesize = require('gulp-filesize');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var resolve = require('resolve');
var _ = require('lodash');
var config = require('../package.json');

/**
 * Tasks that run Browserify for different scenarios
 *
 * ENTRY_FILE - This is the bootstrap file to tell Browserify what to bundle.
 * SCRIPTS_DEST - Destination for the output
 */

var ENTRY_FILE = 'app/app.module.js';
var SCRIPTS_DEST = 'dist/scripts';

// Bundle for development (Excludes vendor files.)
gulp.task('browserify', function () {
    var bundler = browserify(ENTRY_FILE, {fullPaths: true, insertGlobals: true, debug: true});
    // Add all vendor libraries as external dependencies
    _.keys(config.dependencies).forEach(function (dependency) {
        bundler.external(dependency);
    });

    return bundler
        .bundle()
        .pipe(source('app.min.js'))
        .pipe(plumber())
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(filesize())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(SCRIPTS_DEST))
        .pipe(notify({title: 'JavaScript', message: 'Created <%= file.relative %>.'}))
        .on('error', gutil.log);
});

// Build for vendor libraries
gulp.task('browserify-libs', function () {
    var bundler = browserify();
    //var excludedDependencies = ['sockjs-client', 'stompjs'];

    // Add vendor libraries as dependencies
    _.keys(config.dependencies).forEach(function (dependency) {
        // If dependency is not excluded, add it to bundler
        //if (excludedDependencies.indexOf(dependency) < 0) {
        bundler.require(resolve.sync(dependency), {expose: dependency});
        //}
    });

    return bundler
        .bundle()
        .pipe(source('vendor.min.js'))
        .pipe(plumber())
        .pipe(buffer())
        .pipe(uglify())
        .pipe(filesize())
        .pipe(gulp.dest(SCRIPTS_DEST))
        .pipe(notify({title: 'JavaScript', message: 'Created <%= file.relative %>.'}))
        .on('error', gutil.log);
});

// Bundle for release (Excludes vendor files)
gulp.task('browserify-min', function () {
    var bundler = browserify(ENTRY_FILE);
    // Add all vendor libraries as external dependencies
    _.keys(config.dependencies).forEach(function (dependency) {
        bundler.external(dependency);
    });

    return bundler
        .bundle()
        .pipe(source('app.min.js'))
        .pipe(plumber())
        .pipe(buffer())
        .pipe(uglify())
        .pipe(filesize())
        .pipe(gulp.dest(SCRIPTS_DEST))
        .on('error', gutil.log);
});

// Bundle for test build
// gulp.task('browserify-test', ['unit-test'], function () {
//     return browserify(ENTRY_FILE)
//         .bundle()
//         .pipe(source('app.min.js'))
//         .pipe(plumber())
//         .pipe(gulp.dest(SCRIPTS_DEST))
//         .on('error', gutil.log);
// });
