var gulp           = require('gulp'),
    config         = require('../config'),
    utils          = require('./utils'),
    concat         = require('gulp-concat'),
    filter         = require('gulp-filter'),
    browserify     = require('browserify'),
    reactify       = require('reactify'),
    gulpBrowserify = require('gulp-browserify'),
    react          = require('gulp-react'),
    uglify         = require('gulp-uglify'),
    gutil          = require('gulp-util'),
    source         = require('vinyl-source-stream'), // https://medium.com/@sogko/gulp-browserify-the-gulp-y-way-bb359b3f9623
    mainBowerFiles = require('main-bower-files');

// maybe we'll do this someday if we can integrate it with bower
// http://lincolnloop.com/blog/speedy-browserifying-multiple-bundles/



/* js */
gulp.task('js', ['app-js', 'vendor']);



/* compile application javascript */
gulp.task('app-js', function(){

    // return browserify(config.js.src)
    //     .transform(reactify) // use the reactify transform
    //     .bundle()
    //     .pipe(utils.drano())
    //     .pipe(source('index.js'))
    //     .pipe(gulp.dest(config.js.dest));

    // generate index.js
    return  gulp.src(config.js.src)
        .pipe(utils.drano())
        .pipe(gulpBrowserify(config.browserify))
        .pipe(react())
        .pipe(gulp.dest(config.js.dest));


});

// watch js
if (config.watch){
    console.log('watching: js');
    gulp.watch(config.js.watch, ['app-js']);
}




/* bundle up vendor libraries (from bower) */
// http://engineroom.teamwork.com/hassle-free-third-party-dependencies/
gulp.task('vendor', function(next){

    // generate vendor.js
    var bowerfiles = mainBowerFiles({
        includeDev: true,
        paths: config.vendor.bower
    });

    // add other third party files
    config.vendor.additional.forEach(function(file){
        bowerfiles.push(file);
    });

    // console.log("bower files: ", bowerfiles);

    gulp.src(bowerfiles)
        .pipe(utils.drano())
        .pipe(filterByExtension('js'))
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.js.dest));
});


var filterByExtension = function(extension){  
    return filter(function(file){
        return file.path.match(new RegExp('.' + extension + '$'));
    });
};



