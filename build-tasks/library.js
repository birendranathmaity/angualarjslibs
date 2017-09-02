var gulp = require('gulp');
var uglify = require('gulp-uglify');
var filesize = require('gulp-filesize');
var concat = require('gulp-concat');
var flatten = require('gulp-flatten');

var libraries = {
    js: [
        'assets/plugins/jquery-1.8.3.min.js',
        'assets/plugins/jquery.mCustomScrollbar.concat.min.js',
        'assets/plugins/watermark.min.js'
    //     'assets/jquery-ui/jquery-ui-1.10.1.custom.min.js',
    //     'assets/plugins/boostrapv3/js/bootstrap.min.js',
    //     'assets/plugins/breakpoints.js',
    //     'assets/plugins/jquery-unveil/jquery.unveil.min.js',
    //     'assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js',
    //     'assets/plugins/ios-switch/ios7-switch.js',
    //   //  'assets/plugins/jquery-block-ui/jqueryblockui.js',
    //     'assets/plugins/jquery-slider/jquery.sidr.min.js',
    //     'assets/plugins/jquery-numberAnimate/jquery.animateNumbers.js',
    //   //  'assets/plugins/jquery-slimscroll/jquery.slimscroll.min.js',
    //     'assets/plugins/bootstrap-select2/select2.min.js',
    //     'assets/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
    //     'assets/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.js',
    //     'assets/plugins/jquery-autonumeric/autoNumeric.js',
    //     'assets/plugins/bootstrap-wysihtml5/bootstrap-wysihtml5.js',
    //     'assets/plugins/bootstrap-tag/bootstrap-tagsinput.min.js',
    //     'assets/plugins/dropzone/dropzone.min.js',
    //     'assets/plugins/bootstrap-select2/select2.min.js',

        
    ],
    appjs:[
        'assets/js/jquery.hover-slider.js',
        'assets/js/tabs_accordian.js',
        'assets/js/core.js',
        'assets/js/demo.js',
        'assets/js/content-slide.js',
        'assets/js/form_elements.js'
    
    ],
    css: [
        'assets/plugins/pace/pace-theme-flash.css',
        'assets/plugins/jquery-slider/css/jquery.sidr.light.css',
        'assets/plugins/bootstrap-tag/bootstrap-tagsinput.css',
        'assets/plugins/dropzone/css/dropzone.css',
        'assets/plugins/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
        'assets/plugins/bootstrap-datepicker/css/datepicker.css',
        'assets/plugins/bootstrap-timepicker/css/bootstrap-timepicker.css',
        'assets/plugins/boostrapv3/css/bootstrap.min.css',
        'assets/plugins/boostrapv3/css/bootstrap-theme.min.css',
        'assets/plugins/font-awesome/css/font-awesome.min.css',
        'assets/css/animate.min.css',
        'assets/plugins/jquery.mCustomScrollbar.css',
        'node_modules/angular-loading-bar/build/loading-bar.min.css',
        'assets/plugins/headereffects/css/component.css',
        'assets/plugins/headereffects/css/normalize.css',
        'assets/css/angular-toastr.css'
       
    ],
    appcss:[
        'assets/css/style.css',
        'assets/css/responsive.css',
        'assets/css/custom-icon-set.css'
        
        ],
    img:['assets/img/**/*.{gif,jpg,png,svg}'],
    fonts: [
        'assets/fonts/**.*'
    ]
};

/**
 * Combines and minifies external libraries
 */
gulp.task('libs-js', function () {
    gulp.src(libraries.js)
        .pipe(concat('dblibs.min.js'))
      .pipe(uglify())
        .pipe(filesize())
        .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('app-js', function () {
    gulp.src(libraries.appjs)
        .pipe(concat('dbapp.min.js'))
        .pipe(uglify())
        .pipe(filesize())
        .pipe(gulp.dest('dist/assets/js'));
});

/**
 * Combines external libraries
 */
// gulp.task('libs-js-dev', function () {
//     gulp.src(libraries.js)
//         .pipe(concat('libs.min.js'))
//         .pipe(filesize())
//         .pipe(gulp.dest('dist/scripts'));
// });

/**
 * Combines and minifies external CSS dependencies
 * @todo - minify this output
 */
gulp.task('libs-css', function () {
    gulp.src(libraries.css)
        .pipe(concat('dblibs.min.css'))
        .pipe(filesize())
        .pipe(gulp.dest('dist/assets/css'));
});
/**
 * Combines and minifies external CSS dependencies
 * @todo - minify this output
 */
gulp.task('app-css', function () {
    gulp.src(libraries.appcss)
        .pipe(concat('dbapp.min.css'))
        .pipe(filesize())
        .pipe(gulp.dest('dist/assets/css'));
});
/**
 * Combines external CSS dependencies
 */
// gulp.task('libs-css-dev', function () {
//     gulp.src(libraries.css)
//         .pipe(concat('vendor.css'))
//         .pipe(filesize())
//         .pipe(gulp.dest('dist/assets/css'));
// });
/**
 * Combines external CSS dependencies
 */
gulp.task('app-img', function () {
    gulp.src(libraries.img)
       // .pipe(flatten())
        .pipe(gulp.dest('dist/assets/img'));
});

/**
 * Combines external CSS dependencies
 */
gulp.task('app-fonts', function () {
    gulp.src(libraries.fonts)
        .pipe(flatten())
        .pipe(gulp.dest('dist/assets/fonts'));
});