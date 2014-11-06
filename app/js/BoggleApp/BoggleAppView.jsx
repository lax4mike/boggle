var BoggleBoard = require("../BoggleBoard/BoggleBoardView.jsx");
var WordInput = require("../WordInput/WordInputView.jsx");
var BoggleOverlay = require("../utils/BoggleOverlay.js");


var BoggleAppView = React.createClass({

    getInitialState: function(){
        return {
            query: ''
        }
    },

    onDieClick: function(letter){
        this.handleWordChange(this.state.query + letter);
    },

    handleWordChange: function(word){
        this.setState({ query: word.toLowerCase() });
    },

    handleSubmit: function(e, word){
        console.log("lookup " + word + "!");
        this.setState({query: ''});
    },

    showTrails: function(){

        var word = this.state.query;
        var trails = this.props.boardModel.search(word);
        
        console.log("------------------");
        console.log(word);

        // clear the svg every time
        var svg = new BoggleOverlay('.trail-overlay');
        svg.clear();

        if (trails.length){

            trails.forEach(function(trail, i){
                console.log(trail.toString());
                console.log(trail.toCoordinateString());

                svg.drawTrail(trail);
            });
        }

    },

    render: function(){

        this.showTrails();

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
                <div className='console'>{this.state.console}</div>
            </div>
        );
    }

});


module.exports = BoggleAppView;
