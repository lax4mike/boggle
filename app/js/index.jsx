var root = "./"
var BoggleBoardModel = require("./BoggleBoard/BoggleBoardModel");
var BoggleBoardView  = require("./BoggleBoard/BoggleBoardView.jsx");
var boardSize = 5;

var bb = new BoggleBoardModel({square: boardSize});
var dice = bb.get('dice');


React.render(
	<BoggleBoardView dice={dice} square={boardSize} />,
	document.body
);  
