var gulp           = require('gulp'),
    utils          = require('./utils'),
    config         = require('../config');



/* html */
gulp.task('html', function() {

    // html
   return gulp.src(config.html.src)
        .pipe(utils.drano())
        .pipe(gulp.dest(config.html.dest));

});

// watch html
if (config.watch){
    console.log('watching: html');
    gulp.watch(config.html.watch, ['html']);
}



gulp.task('copy', ['html']); 
