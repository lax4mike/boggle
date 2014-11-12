var BoggleBoard = require("../BoggleBoard/BoggleBoardView.jsx");
var BoggleOverlay = require("../utils/BoggleOverlay.js");
var WordInput = require("../WordInput/WordInputView.jsx");
var WordList = require("../WordList/WordListView.jsx");


var dict = require("../utils/BoggleDictionary.js");


var BoggleAppView = React.createClass({

    getInitialState: function(){
        return {
            query: '',
            words: []
        }
    },

    onDieClick: function(letter){
        this.handleWordChange(this.state.query + letter);
    },

    handleWordClick: function(word){
        this.showTrails(word);
    },

    handleWordChange: function(word){
        this.setState({ query: word.toLowerCase() });
    },

    handleSubmit: function(e, word){
        
        var trails = this.props.boardModel.search(word);
        if (trails.length === 0){
            console.log(word + " isn't on the board!");
            this.setState({query: ""});
            return;
        }

        if (this.state.words.indexOf(word) != -1){
            console.log("you already found " + word + "!");
            this.setState({query: ""});
            return;
        }

        if (dict.lookup(word)) {

            if (word.length < 4) {
                console.log(word + " is a word... but it's less than 4 letters!");
                this.setState({query: ""});
                return;
            }

            console.log(word + " is a word!");
            this.state.words.push(word);
        }
        else {
            console.log(word + " isn't a word!");
        }


        this.setState({query: ''});
    },

    showQueryTrails: function(){
        var word = this.state.query;
        this.showTrails(word);
    },

    showTrails: function(word){

        var trails = this.props.boardModel.search(word);
        
        // console.log("------------------");
        // console.log(word);

        // clear the svg every time
        var svg = new BoggleOverlay('.trail-overlay');
        svg.clear();

        if (trails.length){

            trails.forEach(function(trail, i){
                // console.log(trail.toString());
                // console.log(trail.toCoordinateString());
                svg.drawTrail(trail);

            });
        }

    },

    render: function(){

        this.showQueryTrails();

        return (
            <div className="boggle-app">
                <BoggleBoard 
                    boardModel={this.props.boardModel}
                    onDieClick={this.onDieClick}
                />
                <WordInput 
                    word={this.state.query}
                    onChange={this.handleWordChange} 
                    onSubmit={this.handleSubmit}
                />
                <WordList 
                    words={this.state.words}
                    onClick={this.handleWordClick}
                 />
            </div>
        );
    }

});


module.exports = BoggleAppView;
