var gulp = require('gulp');
var inlineAngularTemplates = require('gulp-inline-angular-templates');

gulp.task('templates', function () {
    return gulp.src('app/**/*.html')
    .pipe(inlineAngularTemplates('/index.html', {
         base: './/app/', // (Optional) ID of the <script> tag will be relative to this folder. Default is project dir.
         prefix: './app/',            // (Optional) Prefix path to the ID. Default is empty string.
         selector: 'body',       // (Optional) CSS selector of the element to use to insert the templates. Default is `body`.
         method: 'prepend',       // (Optional) DOM insert method. Default is `prepend`.
         
     }))
    .pipe(gulp.dest('dist'));
});
// var htmlmin = require('gulp-htmlmin');
// var angularTemplateCache = require('gulp-angular-templatecache');
// var SCRIPTS_DEST = 'dist/scripts';
// var ngHtml2Js = require("gulp-ng-html2js");
// var concat = require("gulp-concat");
// var uglify = require("gulp-uglify");
// gulp.task('templates', function() {
//     return gulp.src('app/**/*.html')
//     // .pipe(ngHtml2Js({
//     //     moduleName: "app.ui",
//     //     prefix: "app/"
//     // }))
//     // .pipe(concat("templates.js"))
    
//         // .pipe(htmlmin({
//         //     collapseWhitespace: true,
//         //     removeComments: true,
//         //     removeEmptyAttributes: false,
//         //     removeEmptyElements: false
//         // }))
//         .pipe(angularTemplateCache('templates.js', {
//             module: 'app.ui',
//             root: 'app',
//             standalone: false
//         }))
//         .pipe(gulp.dest(SCRIPTS_DEST));
// });


// gulp.src("./partials/*.html")
//    .pipe(ngHtml2Js({
//        moduleName: "MyAwesomePartials",
//        prefix: "/partials"
//    }))