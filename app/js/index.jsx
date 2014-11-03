

var BoggleBoardModel = require('./BoggleBoardModel');
var BoggleBoardView = require('./BoggleBoardView.jsx');

var bb = new BoggleBoardModel();
var dice = bb.get('dice');


React.render(
	<BoggleBoardView dice={dice} />,
	document.body
);  
