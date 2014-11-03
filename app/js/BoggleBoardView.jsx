var BoggleDie = require('./BoggleDieView.jsx');


var BoggleBoard = React.createClass({



	render: function(){
		var dice = this.props.dice.map(function (die) {
			var letter = die.get('letter');
			return (
				<BoggleDie letter={letter}/>
			);
		});

		return (
			<div className='boggle-board'>
				{dice}
			</div>
		);

		
	}

});

module.exports = BoggleBoard;
