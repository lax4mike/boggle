var gulp           = require('gulp'),
    config         = require('../config'),
    browserSync    = require('browser-sync');



// Move server code to dest
gulp.task('server', function(){
        
    return gulp.src(config.root + "server/**/*")
        .pipe(gulp.dest(config.build + "server/"));

});

// load our node server and set up live reload
gulp.task('connect', ['server'], function(){
    var server = require("../" + config.build + '/server/server.js'); 
    
    browserSync({
        proxy: "localhost:3000",
        port: 8080,
        open: false, // or  "external"
        notify: false,
        ghostMode: false,
        files: [
            config.dest + "/**"
        ]
    });

    // gulp.watch(config.dest + '/**', [browserSync.reload]);

});

