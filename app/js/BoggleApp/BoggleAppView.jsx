var BoggleBoard   = require("../BoggleBoard/BoggleBoardView.jsx");
var BoggleOverlay = require("../utils/BoggleOverlay.js");
var WordInput     = require("../WordInput/WordInputView.jsx");
var WordList      = require("../WordList/WordListView.jsx");


var dict = require("../utils/BoggleDictionary.js");


var BoggleAppView = React.createClass({

    getInitialState: function(){
        return {
            clickedDice: [],
            query: '',
            words: [],
            notification: ""
        }
    },

    resetQuery: function(){
        this.setState({
            clickedDice: [],
            query: '',
        });
    },

    notify: function(notification){
        this.setState({ notification: notification });

        clearTimeout(this.dismissNotificaion);

        this.dismissNotificaion = setTimeout(function(){
            this.notify("");
            clearTimeout(this.dismissNotificaion);
        }.bind(this), 2000)
    },

    handleNotificationClick: function(){
        this.notify("");
    },

    addWord: function(word){
        this.setState({ words: this.state.words.concat(word) });
    },

    onDieClick: function(die){
        var letter = die.get('letter');

        // make sure the clicked die is adjacent
        var lastDie = this.state.clickedDice.slice(-1).pop();
        if (lastDie && !die.get('math').isAdjacent(lastDie.get('position'))){
            return;
        }

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

        if (!word.length) { return; }

        var trails = this.props.boardModel.search(word);

        if (trails.length === 0){
            this.notify(word + " isn't on the board!");
            this.resetQuery();
            return;
        }

        if (this.state.words.indexOf(word) != -1){
            this.notify("you already found " + word + "!");
            this.resetQuery();
            return;
        }

        if (dict.lookup(word)) {

            if (word.length < 4) {
                this.notify(word + " is a word... but it's less than 4 letters!");
                this.resetQuery();
                return;
            }

            // this.notify(word + " is a word!");
            this.addWord(word);
        }
        else {
            this.notify(word + " isn't a word!");
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
                    notification={this.state.notification}
                    onNotificationClick={this.handleNotificationClick}
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
