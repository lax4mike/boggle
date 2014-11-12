

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
                    <button className='clear' type='button' onClick={this.backspace}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 54.035 37"><g fill="none" stroke="#666" strokeWidth="5" stroke-miterlimit="10"><path d="M26.208 25.827l14.654-14.654M26.208 11.173l14.654 14.654"/></g><path fill="none" stroke="#666" strokeWidth="5" stroke-miterlimit="10" d="M19.535 34.5h32v-32h-32l-16 16z"/></svg>
                    </button>
                    <input type='text' onChange={this.handleChange} value={this.props.word}/>
                    <button className='submit' type='submit'><span>Go</span></button>
                </form>
    		</div>
    	);
    }

});

module.exports = WordInput;
