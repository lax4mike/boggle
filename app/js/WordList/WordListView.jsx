var BoggleScore = require("../utils/BoggleScore.js");

var WordList = React.createClass({

    handleClick: function(word){
        // pass it up
        this.props.onClick(word);
    },

    render: function(){

        var list = this.props.words.slice(0).reverse();

        var totalBoggle = 0;  
        var totalScrabble = 0;

        var wordList = list.map(function(word, i){

            var boggleScore = BoggleScore.getBoggleScore(word);
            var scrabbleScore = BoggleScore.getScrabbleScore(word);
            totalBoggle += boggleScore;
            totalScrabble += scrabbleScore;
            return (
                <div className='word' 
                    key={i}
                    onClick={this.handleClick.bind(this, word)}
                >
                    <span>{word} ({boggleScore}) ({scrabbleScore})</span>
                </div>
            );
        }, this);

        return (
            <div className='word-list'>

                {(list.length) ?
                    <div className="score">
                         <div>Boggle: {totalBoggle}</div>
                         <div>Scrabble: {totalScrabble}</div>
                    </div>
                : "" }

                {wordList}

            </div>
        );
    }

});

module.exports = WordList;
