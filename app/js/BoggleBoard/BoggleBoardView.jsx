var BoggleDie = require("../BoggleDie/BoggleDieView.jsx");
var BoggleMath = require("../utils/BoggleMath");

var BoggleBoard = React.createClass({

    getInitialState: function(){
        return {
            selected: null,
            cardinal: [],
            corners: []
        };
    },

    handleMouseEnter: function(i) {

        var die = new BoggleMath(i, this.props.square);
        var cardinal = [];

        // console.log(i, die.getCardinal({format: "object"}));
        // console.log(i, die.getCorners({format: "object"}));

        this.setState({
            selected: i,
            cardinal: die.getCardinal(),
            corners: die.getCorners()
        });
    },

    handleMouseLeave: function(i) {
        this.setState(this.getInitialState());
    },

    render: function(){ 

        return (
            <div className='boggle-board'>
                {this.props.dice.map(function (die, i) {
                    return 
                        BoggleDie({
                            key: i,
                            letter: die.get('letter') ,
                            selected: this.state.selected == i,
                            cardinal: _.contains(this.state.cardinal, i),
                            corner: _.contains(this.state.corners, i),
                            onMouseEnter: this.handleMouseEnter.bind(this, i),
                            onMouseLeave: this.handleMouseLeave.bind(this, i) ,
                        });
                    
                }, this)}
            </div>
        );
 
    }

});

module.exports = BoggleBoard;
