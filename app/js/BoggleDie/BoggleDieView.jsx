
var joinClasses = require("../utils/joinClasses");

var BoggleDieView = React.createClass({

    getInitialState: function(){
        return {
            selected: false,
            cardinal: false
        };
    },
 
    render: function(){

        var classes = joinClasses({
            'boggle-die': true,
            'selected': this.props.selected,
            'cardinal': this.props.cardinal,
            'corner': this.props.corner
        });

        return (
            <div className={classes} 
                onMouseEnter={this.props.onMouseEnter} 
                onMouseLeave={this.props.onMouseLeave}>
                <span className="boggle-die__letter">
                    {this.props.letter}
                </span> 
            </div>

        );
    }

}); 

module.exports = BoggleDieView;
