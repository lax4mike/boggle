var BoggleBoardModel = require("./BoggleBoard/BoggleBoardModel");
var BoggleApp  = require("./BoggleApp/BoggleAppView.jsx");


var boardModel = new BoggleBoardModel({square: boardSize});

var boardSize = 5;

React.render(
    <BoggleApp boardModel={boardModel} />,
    document.body
);  


$(function(){
	$(".word-input input").focus();
});
