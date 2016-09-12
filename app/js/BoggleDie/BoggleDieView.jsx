
var classNames = require("classnames");

var BoggleDieView = React.createClass({

    render: function(){

        var classes = classNames(this.props.classMap);

        return (
            <div className={"boggle-die " + classes}
                onMouseEnter={this.props.onMouseEnter}
                onMouseLeave={this.props.onMouseLeave}
                onClick={this.props.onClick} >
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
