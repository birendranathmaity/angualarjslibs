var gulp = require('gulp');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var filesize = require('gulp-filesize');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

/**
 * Compiles .scss files into css, adds vendor prefixes, and saves the output in the dist directory. The sass-min task
 * has an additional step to minify the generated CSS files.
 *
 * SASS_SRC - pattern for source Sass files.
 * SASS_DEST - output directory
 */

var SASS_SRC = 'scss/**/*.scss';
var SASS_DEST = 'dist/styles';

// Sass
gulp.task('sass', function () {
    return gulp.src(SASS_SRC)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({noCache: true}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(SASS_DEST))
        .pipe(notify({title: 'Sass', message: 'Created <%= file.relative %>.'}))
        .on('error', gutil.log);
});
// Release build minifies CSS after compiling Sass
gulp.task('sass-min', function () {
    return gulp.src(SASS_SRC)
        .pipe(plumber())
        .pipe(sass({
            noCache: true,
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest(SASS_DEST))
        .pipe(notify({title: 'Sass', message: 'Created <%= file.relative %>.'}));
});