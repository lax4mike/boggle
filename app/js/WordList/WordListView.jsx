var classNames = require("classnames");
var BoggleScore = require("../utils/BoggleScore.js");

var WordListView = React.createClass({

    propTypes: {
        words : React.PropTypes.array,
        onClick: React.PropTypes.func,
        selectedWord: React.PropTypes.string
    },

    handleClick: function(word){
        // pass it up
        this.props.onClick(word);
    },

    render: function(){

        var selectedWord = this.props.selectedWord;
        var list = this.props.words.slice(0).reverse();

        var totalBoggle = 0;
        var totalScrabble = 0;

        var wordList = list.map(function(word, i){

            var boggleScore = BoggleScore.getBoggleScore(word);
            var scrabbleScore = BoggleScore.getScrabbleScore(word);
            totalBoggle += boggleScore;
            totalScrabble += scrabbleScore;

            var classes = classNames("word", {
                "is-selected": selectedWord && (word.toLowerCase() === selectedWord.toLowerCase())
            });

            return (
                <div className={classes}
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

module.exports = WordListView;
