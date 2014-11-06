

var WordInput = React.createClass({

    handleChange: function(e){
		var word = e.target.value
    	this.props.onChange(word);
    },

    handleSubmit: function(e){
        e.preventDefault()
        this.props.onSubmit(e, this.props.word);
    },

    backspace: function(){
        var word = this.props.word.slice(0, -1);
        this.props.onChange(word);
    },

    render: function(){

    	return (
    		<div className='word-input'>
        		<form onSubmit={this.handleSubmit}>
                    <button className='clear' type='button' onClick={this.backspace}>&lt;</button>
                    <input type='text' onChange={this.handleChange} value={this.props.word}/>
                    <button className='submit' type='submit'>&gt;</button>
                </form>
    		</div>
    	);
    }

});

module.exports = WordInput;
