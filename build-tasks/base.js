var gulp = require('gulp');
var uncache = require('gulp-uncache');
var rename = require('gulp-rename');
var inject = require('gulp-inject-string');

/**
 * Generates index.html for development
 */
gulp.task('base', ['clean-index'], function () {
    return gulp.src('./index.src.html')
        .pipe(inject.after('<head>', '\n<!-- \n  -- WARNING!!!\n  -- THIS IS A GENERATED FILE\n  -- Modify index.src.html instead. \n  -->'))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./'));
});

/**
 * Generates index.html with hashes to bust cache
 */
gulp.task('base-cache', ['clean-index'], function () {
    return gulp.src('./index.src.html')
        .pipe(uncache({
            append: 'hash',
            rename: true,
            srcDir: '.',
            distDir: '.'
        }))
        .pipe(inject.after('<head>', '\n<!-- \n  -- WARNING!!!\n  -- THIS IS A GENERATED FILE\n  -- Modify index.src.html instead. \n  -->'))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./'));
});