var BoggleBoard = require("../BoggleBoard/BoggleBoardView.jsx");
var BoggleOverlay = require("../utils/BoggleOverlay.js");
var WordInput = require("../WordInput/WordInputView.jsx");
var WordList = require("../WordList/WordListView.jsx");


var dict = require("../utils/BoggleDictionary.js");


var BoggleAppView = React.createClass({

    getInitialState: function(){
        return {
            clickedDice: [],
            query: '',
            words: []
        }
    },

    resetQuery: function(){
        this.setState({
            clickedDice: [],
            query: '',
        });
    },

    onDieClick: function(die){
        var letter = die.get('letter');
        this.setState({
            clickedDice: this.state.clickedDice.concat(die),
            query: (this.state.query + letter).toLowerCase()
        });
    },

    handleWordClick: function(word){
        this.showTrails(word);
    },

    // only from the word input!
    handleWordChange: function(word){

        // reset it if it's not backspace (ie. they typed in the box)
        var clickedDice = [];

        // if this was a backspace, still keep track of the clickedDice
        if (word.length === this.state.query.length -1){
            var clickedDice = this.state.clickedDice.slice(0, -1);
        }

        this.setState({ 
            query: word.toLowerCase(),
            clickedDice: clickedDice
        });
    },

    // when the user submits the form with a query
    handleSubmit: function(e, word){

        var trails = this.props.boardModel.search(word);

        if (trails.length === 0){
            console.log(word + " isn't on the board!");
            this.resetQuery();
            return;
        }

        if (this.state.words.indexOf(word) != -1){
            console.log("you already found " + word + "!");
            this.resetQuery();
            return;
        }

        if (dict.lookup(word)) {

            if (word.length < 4) {
                console.log(word + " is a word... but it's less than 4 letters!");
                this.resetQuery();
                return;
            }

            console.log(word + " is a word!");
            this.state.words.push(word);
        }
        else {
            console.log(word + " isn't a word!");
        }


        this.resetQuery();
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

        if (trails.length == 0){
            return;
        }

        // if we've clicked dice, restrict the trail to the clicked dice.
        if (this.state.clickedDice.length){
            svg.drawTrail(this.state.clickedDice);
            return;
        }
           

        // otherwise, draw first trail
        // svg.drawTrail(trails[0]);

        // or draw all trails
        trails.forEach(function(trail, i){
            svg.drawTrail(trail);
        });

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
