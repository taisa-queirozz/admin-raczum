const gulp = require('gulp'),
    sass = require('gulp-sass')
    rename = require('gulp-rename'),
    csso = require('gulp-csso'),
    aliases = require('gulp-style-aliases'),
    combineMq = require('gulp-combine-mq'),     
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    imageminSvgo = require('imagemin-svgo'),      
    uglify = require('gulp-uglify');

const { getInstalledPathSync } = require('get-installed-path');
const bootstrapFolder = getInstalledPathSync('bootstrap', { local: true });
const sourceSass = ['./src/scss/main.scss'];

gulp.task('sassTask', function(){
  gulp.src(sourceSass)
    .pipe(aliases({
        "@bootstrap": bootstrapFolder
    }))
    .pipe(sass())
    .pipe(combineMq())
    .pipe(csso())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('../assets/dist/'));
});


gulp.task('jsTask', function() {
    return gulp.src('./src/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe( babel({
        presets: ['env']
    }))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/js/'));  
});

// JS Plugins
function pluginsTask() {
  return gulp
  .src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/owl.carousel/dist/owl.carousel.min.js',
    'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js',    
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/dhx-calendar/codebase/calendar.min.js',
    'node_modules/wowjs/dist/wow.min.js'
  ])
  .pipe(concat('plugins.js'))
  .pipe(gulp.dest('./dist/js/'));  
}

gulp.task('pluginsTask', pluginsTask);


gulp.task('default', function(){
    gulp.src('./src/images/**')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({plugins: [{removeViewBox: false}]})
        ]))       
        .pipe(gulp.dest('./dist/images/'));
    gulp.watch("./src/scss/**/*.scss", ['sassTask']);
    gulp.watch('js/plugins/*.js', pluginsTask);    
    gulp.watch("./src/js/**/*.js", ['jsTask']);
});