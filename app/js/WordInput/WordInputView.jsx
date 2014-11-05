

var WordInput = React.createClass({

	getInitialState: function(){
        return {
            word: ''
        };
    },

    // update the word and pass it up
    handleChange: function(e){
		var word = e.target.value
    	this.setState({word: word });
    	this.props.onChange(word);
    },

    render: function(){
    	return (
    		<div className='word-input'>
    		<input type='text' onChange={this.handleChange} value={this.state.word}/>
    		</div>
    	);
    }

});

module.exports = WordInput;
