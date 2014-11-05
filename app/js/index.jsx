var root = "./"
var BoggleBoardModel = require("./BoggleBoard/BoggleBoardModel");
var BoggleApp  = require("./BoggleApp/BoggleAppView.jsx");
var boardSize = 5;

var boardModel = new BoggleBoardModel({square: boardSize});


React.render(
    <BoggleApp boardModel={boardModel} />,
    document.body
);  
