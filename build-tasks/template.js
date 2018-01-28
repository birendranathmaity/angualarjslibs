var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var angularTemplateCache = require('gulp-angular-templatecache');
var SCRIPTS_DEST = 'dist/scripts';
var ngHtml2Js = require("gulp-ng-html2js");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
gulp.task('templates', function() {
    return gulp.src('app/**/*.html')
    // .pipe(ngHtml2Js({
    //     moduleName: "app.ui",
    //     prefix: "app/"
    // }))
    // .pipe(concat("templates.js"))
    
        // .pipe(htmlmin({
        //     collapseWhitespace: true,
        //     removeComments: true,
        //     removeEmptyAttributes: false,
        //     removeEmptyElements: false
        // }))
        .pipe(angularTemplateCache('templates.js', {
            module: 'app.ui',
            root: 'app',
            standalone: false
        }))
        .pipe(gulp.dest(SCRIPTS_DEST));
});


// gulp.src("./partials/*.html")
//    .pipe(ngHtml2Js({
//        moduleName: "MyAwesomePartials",
//        prefix: "/partials"
//    }))