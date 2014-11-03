var BoggleDieView = React.createClass({

	render: function(){
		return (
			<div className="boggle-die">
				<span className="boggle-die__letter">
					{this.props.letter}
				</span>
			</div>

		);
	}


}); 

module.exports = BoggleDieView;
