
var root = exports.root = "../app/";
var build = exports.build = "../build/";
var dest = exports.dest = build + "/public/";

exports.watch = true;

exports.tasks = ['connect', 'copy', 'css', 'js'];

// html
exports.html = {
	src: [
		root + "**/*.html"
	],
	watch: [
		root + "**/*.html"
	],
	dest: dest
};

// css
exports.css = {
	src: [
		root + "scss/**/*.scss"
	],
	watch: [
		root + "scss/**/*.scss"
	],
	dest: dest + "css"
};

//sass config
exports.sass = {
	sourcemaps: true
};

// js
exports.js = {
    src: root + "js/index.jsx",
    watch: [ 
    	[ root + "js/**/*.js", root + "js/**/*.jsx" ]
    ],
    dest: dest + "js/",
    vendor: {
        bower: root + "vendor/js/",
        additional: [
            // manually adding this because selectboxit is not defining the "main" attribute in bower.json (also not defining it's depenancies)
            // https://github.com/gfranko/jquery.selectBoxIt.js/issues/301
            // root + "vendor/js/selectboxit/jquery-ui-widget-1.11.2.js",
            // root + "vendor/js/selectboxit/jquery.selectBoxIt.js"
        ]
    }
};

exports.browserify = {
	debug: true
};



