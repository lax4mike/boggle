var BoggleBoard = require("../BoggleBoard/BoggleBoardView.jsx");
var WordInput = require("../WordInput/WordInputView.jsx");


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

    handleSubmit: function(word){
        console.log("lookup " + word + "!");
        this.setState({query: ''});
    },

    showTrails: function(){

        var word = this.state.query;
        var trails = this.props.boardModel.search(word);

        // clear the svg every time
        var svg = d3.select('.trail-overlay');
        d3.selectAll('.trail-overlay *').remove();
        var colors = [
            "rgba( 52, 152, 219, 0.5)", // blue
            "rgba(231,  76, 60,  0.5)", // red
            "rgba( 46, 204, 113, 0.5)", // green
            "rgba(241, 196, 15,  0.5)", // yellow
            "rgba(155,  89, 182, 0.5)", // purple
            "rgba(149, 165, 166, 0.5)" // gray
        ]

        console.log("------------------");
        console.log(word);
        if (trails.length){

            var dieWidth = $('.boggle-die').width();

            var l = trails.length


            trails.forEach(function(trail, i){
                console.log(trail.toString());
                console.log(trail.toCoordinateString());

                lineData = trail.toCoordinateArray();

                // draw circle if it's one point
                if (lineData.length == 1){
                
                    svg.append("circle")
                        .attr('r', 15)
                        .attr('cx', lineData[0].x * dieWidth - dieWidth/2)
                        .attr('cy', lineData[0].y * dieWidth - dieWidth/2)
                        .style('fill', colors[i%colors.length])
                }

                // otherwise, draw line
                var lineFunction = d3.svg.line()
                    .x(function(d) { 
                        return d.x * dieWidth - dieWidth/2; // - l*3 + (i * l); 
                    })
                    .y(function(d) { 
                        return d.y * dieWidth - dieWidth/2; // - l*3 + (i * l);
                         })
                    .interpolate("linear");


                svg.append("path")
                    .attr("d", lineFunction(lineData))
                    .attr("stroke", colors[i%colors.length])
                    .attr("stroke-width", 20)
                    .attr("stroke-linecap", "round")
                    .attr("stroke-linejoin", "round")
                    .attr("fill", "none");
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

// 


module.exports = BoggleAppView;
