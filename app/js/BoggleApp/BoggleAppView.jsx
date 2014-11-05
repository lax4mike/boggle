var BoggleBoard = require("../BoggleBoard/BoggleBoardView.jsx");
var WordInput = require("../WordInput/WordInputView.jsx");


var BoggleAppView = React.createClass({

    componentWillMount: function(){
        
    },

    getInitialState: function(){
        return {
            query: '',
            console: ''
        }
    },

    handleWordChange: function(word){
        this.setState({query: word});

        var trails = this.props.boardModel.search(word);

        if (trails.length){
            console.log("------------------");
            console.log(word);
            trails.forEach(function(trail){
                console.log(trail.join(" -> "));
            });

        }

    },

    render: function(){
        return (
            <div className="boggle-app">
                <BoggleBoard 
                    boardModel={this.props.boardModel} />
                <WordInput onChange={this.handleWordChange} />
                <div className='console'>{this.state.console}</div>
            </div>
        );
    }

});

// 


module.exports = BoggleAppView;
