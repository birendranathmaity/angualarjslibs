var gulp = require('gulp');
var uglify = require('gulp-uglify');
var filesize = require('gulp-filesize');
var concat = require('gulp-concat');
var flatten = require('gulp-flatten');

var libraries = {
    js: [
        'node_modules/**/jquery/dist/jquery.js',
        'node_modules/**/bootstrap/dist/js/bootstrap.js'
    ],
    css: [
        'node_modules/**/bootstrap/dist/css/bootstrap.css',
        'node_modules/**/angular-ui-switch/angular-ui-switch.css',
        'node_modules/fullcalendar/dist/fullcalendar.css',
        'images/**/font-awesome-4.7.0/css/font-awesome.css'
    ],
    fonts: [
        'images/**/font-awesome-4.7.0/fonts/**.*'
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

/**
 * Combines external CSS dependencies
 */
gulp.task('libs-fonts-dev', function () {
    gulp.src(libraries.fonts)
        .pipe(flatten())
        .pipe(gulp.dest('dist/fonts'));
});