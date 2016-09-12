
// this defeats the purpose of using browserify for third party libraries,
// but this is an old project that I upgraded the gulp build.
// Just make these global to get it to work...
window._ = require("underscore");
window.React = require("react");
window.Backbone = require("backbone");
window.$ = require("jquery");
window.d3 = require("d3");

// put the dictionary on the window
require("./utils/boggleWords.js");

var BoggleBoardModel = require("./BoggleBoard/BoggleBoardModel");
var BoggleApp  = require("./BoggleApp/BoggleAppView.jsx");


var boardModel = new BoggleBoardModel({square: boardSize});

var boardSize = 5;

React.render(
    React.createElement(BoggleApp, {boardModel: boardModel}),
    document.querySelector(".js-mount")
);


$(function(){
	$(".word-input input").focus();
});
