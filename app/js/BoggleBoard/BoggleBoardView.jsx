var BoggleDie = require("../BoggleDie/BoggleDieView.jsx");
var BoggleMath = require("../utils/BoggleMath");

var BoggleBoard = React.createClass({

    // extract some variables from the boardModel
    componentWillMount: function(){
        this.dice = this.props.boardModel.get('dice');
        this.square = this.props.boardModel.get('square');
    },

    getInitialState: function(){

        return {
            selected: null,
            cardinal: [],
            corners: []
        };
    },

    handleDieEnter: function(i) {

        var die = new BoggleMath(i, this.square);

        this.setState({
            selected: i,
            cardinal: die.getCardinal(),
            corners: die.getCorners()
        });
    },

    handleDieLeave: function(i) {
        this.setState(this.getInitialState());
    },

    handleDieClick: function(die){
        this.props.onDieClick(die.get('letter'))
    },

    render: function(){ 

        return (
            <div className='boggle-board'>
                {this.dice.map(function (die, i) {

                    var classMap = {
                        'selected': this.state.selected == i,
                        'cardinal': _.contains(this.state.cardinal, i),
                        'corner': _.contains(this.state.corners, i)
                    };

                    return (
                        <BoggleDie
                            key={i}
                            index={i}
                            letter={die.get('letter')}
                            classMap={classMap}
                            // onMouseEnter={this.handleDieEnter.bind(this, i)}
                            // onMouseLeave={this.handleDieLeave.bind(this, i)} 
                            onClick={this.handleDieClick.bind(this, die)}
                        />
                    );
                }, this)}
            </div>
        );
 
    }

});

module.exports = BoggleBoard;
