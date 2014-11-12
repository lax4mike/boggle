
var root = exports.root = "../app/";
var build = exports.build = "../build/";
var dest = exports.dest = build + "/public/";

exports.watch = true;

exports.tasks = ['connect', 'copy', 'css', 'js', 'images'];

// html
exports.html = {
	src: [
		root + "**/*.html",
		"!" + root + "vendor/**"
	],
	watch: [
		root + "**/*.html"
	],
	dest: dest
};

// css
exports.css = {
	src: [
		root + "scss/**/*.scss",
		root + "js/**/*.scss"
	],
	watch: [
		root + "scss/**/*.scss",
		root + "js/**/*.scss"
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
    dest: dest + "js/"
};

exports.vendor = {
    bower: root + "vendor/",
    additional: [
    	// not sure why main-bower-files isn't picking this up
    	// fuck it, i wrote my own utils
        // root + "vendor/js/bower_components/react-addons/index.js"
        root + "js/utils/words.js"
    ]
};

exports.svg = {
	src: root + "/img/**/*.svg",
	watch: root + "/img/**/*.svg",
	dest: dest + "/img"
};


exports.browserify = {
	debug: true
};



