var config      = require('../config'),
    plumber     = require('gulp-plumber'),
    notify      = require('gulp-notify'),
    del         = require('del');

// drano: make plumber with error handler attached
module.exports.drano = function drano(){
    return plumber({
        errorHandler: function(err) {
            notify.onError({ title: "<%= error.plugin %>", message: "<%= error.message %>", sound: "Beep" })(err);
            this.emit('end');
        }
    });
};



// load task, given an array of tasks, require them
module.exports.loadtasks = function loadtasks(tasks) {
    tasks.forEach(function(name) {
        // console.log("loading task: ", name);
        require('./' + name);
    });
};



// delete the destination directory
module.exports.clean = function clean(cb) {

    console.log("Cleaning: ", config.build);
    del([config.build], {force: true}, cb);

};