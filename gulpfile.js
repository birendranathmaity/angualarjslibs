var gulp = require('gulp');
var runSequence = require('run-sequence');

/**
 * Pull in child tasks
 *
 * Please add any new tasks to the build-tasks directory.
 */
var requireDir = require('require-dir');
requireDir('./build-tasks');


// Main tasks

// gulp.task('test', ['unit-test'], function () {
//     // Ensure task ends
//     process.exit(0);
// });

gulp.task('default', ['clean'], function () {
    // These tasks must be run inside the task to wait for clean
    gulp.start(['sass', 'libs-fonts-dev', 'connect', 'browserify-libs', 'base', 'lint', 'watch']);
});
