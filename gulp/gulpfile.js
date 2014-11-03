var gulp           = require('gulp'),
	config         = require('./config'),
	utils          = require('./tasks/utils');



gulp.task('build', config.tasks);


gulp.task('default', function(){
	   
	utils.loadtasks(config.tasks);

	 // clean dest directory
    utils.clean(function(){
        gulp.start('build'); // clean first, then build
    });  

});
