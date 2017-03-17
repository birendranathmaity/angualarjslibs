var gulp = require('gulp');
var plumber = require('gulp-plumber');
var purify = require('gulp-purifycss');

var VENDOR_CSS = 'dist/styles/vendor.css';
var SASS_DEST = 'dist/styles';

gulp.task('purify-css', function() {
    return gulp.src(VENDOR_CSS)
        .pipe(plumber())
        .pipe(purify(['**/app/**/*.js', '**/app/**/*.html']))
        .pipe(gulp.dest(SASS_DEST));
});