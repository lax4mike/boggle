var gulp          = require('gulp'),
    utils         = require('./utils'),
    config        = require('../config'),
    sass          = require('gulp-sass'),
    autoprefixer  = require('gulp-autoprefixer'),
    pixrem        = require('gulp-pixrem'),
    concat        = require('gulp-concat');


// css
gulp.task('css', function(){

    return gulp.src(config.css.src)
        .pipe(utils.drano())
        .pipe(sass(config.sass))
        .pipe(autoprefixer(config.autoprefixer))
        .pipe(pixrem())
        .pipe(concat('index.css'))
        .pipe(gulp.dest(config.css.dest));
});


// watch css
if (config.watch){
    console.log('watching: css');
    gulp.watch(config.css.watch, ['css']);
}

