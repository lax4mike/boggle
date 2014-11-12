var gulp           = require('gulp'),
    utils          = require('./utils'),
    config         = require('../config'),
    svgmin         = require('gulp-svgmin');


// images 
gulp.task('images', function(next){

    var svg = gulp.src(config.svg.src)
                .pipe(svgmin())
                .pipe(gulp.dest(config.svg.dest));

    next();

});


// watch css
if (config.watch){
    console.log('watching: svg');
    gulp.watch(config.svg.watch, ['images']);
}
