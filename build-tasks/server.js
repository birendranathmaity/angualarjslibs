var gulp = require('gulp');
var connect = require('gulp-connect');

/**
 * Creates a temporary development server
 *
 * The fallback property enables html5Mode in Angular to work.
 */
gulp.task('connect', function() {
    connect.server({
        root: './',
        port: 2000,
        fallback: 'index.html'
    })
});