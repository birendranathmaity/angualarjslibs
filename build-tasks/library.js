var gulp = require('gulp');
var uglify = require('gulp-uglify');
var filesize = require('gulp-filesize');
var concat = require('gulp-concat');

var libraries = {
    js: [
        'node_modules/**/jquery/dist/jquery.js',
        'node_modules/**/bootstrap/dist/js/bootstrap.js'
    ],
    css: [
        'node_modules/**/bootstrap/dist/css/bootstrap.css'
    ]
};

/**
 * Combines and minifies external libraries
 */
gulp.task('libs-js', function () {
    gulp.src(libraries.js)
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(filesize())
        .pipe(gulp.dest('dist/scripts'));
});

/**
 * Combines external libraries
 */
gulp.task('libs-js-dev', function () {
    gulp.src(libraries.js)
        .pipe(concat('libs.min.js'))
        .pipe(filesize())
        .pipe(gulp.dest('dist/scripts'));
});

/**
 * Combines and minifies external CSS dependencies
 * @todo - minify this output
 */
gulp.task('libs-css', function () {
    gulp.src(libraries.css)
        .pipe(concat('vendor.css'))
        .pipe(filesize())
        .pipe(gulp.dest('dist/styles'));
});

/**
 * Combines external CSS dependencies
 */
gulp.task('libs-css-dev', function () {
    gulp.src(libraries.css)
        .pipe(concat('vendor.css'))
        .pipe(filesize())
        .pipe(gulp.dest('dist/styles'));
});