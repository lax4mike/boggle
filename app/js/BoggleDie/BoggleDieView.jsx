
var joinClasses = require("../utils/joinClasses");

var BoggleDieView = React.createClass({

    getInitialState: function(){
        return {
            selected: false,
            cardinal: false
        };
    },
 
    render: function(){

        var classes = joinClasses(this.props.classMap);

        return (
            <div className={"boggle-die " + classes} 
                onMouseEnter={this.props.onMouseEnter} 
                onMouseLeave={this.props.onMouseLeave}>
                <span className="boggle-die__letter">
                    {this.props.letter}
                </span> 
                <span className="boggle-die__index">
                    {this.props.index} 
                </span> 
            </div>

        );
    }

}); 

module.exports = BoggleDieView;
