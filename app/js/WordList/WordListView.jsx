var WordList = React.createClass({

    handleClick: function(word){
        // pass it up
        this.props.onClick(word);
    },

    render: function(){

        var list = this.props.words.slice(0).reverse();

        return (
            <div className='word-list'>
                {list.map(function(word, i){
                    return (
                        <div className='word' 
                            key={i}
                            onClick={this.handleClick.bind(this, word)}
                        >
                            {word}
                        </div>
                    );
                }, this)}
            </div>
        );
    }

});

module.exports = WordList;
