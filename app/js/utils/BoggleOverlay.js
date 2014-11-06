var BoggleTrail = require('./BoggleTrail');

(function(){

    // BoggleOverlay 
    var BoggleOverlay = function(selector) {
        this.selector = selector;
        this.svg = d3.select(selector);
        this.i = 0; // to keep track of colors
        dieWidth = $('.boggle-die').width();
    };

    BoggleOverlay.prototype = {

        // draw a trail (with a different color every time)
        drawTrail: function(trail){

            var lineData = trail.toCoordinateArray();

            // draw circle if it's one point
            if (lineData.length == 1){
            
                this.svg.append("circle")
                    .attr('r', 15)
                    .attr('cx', lineData[0].x * dieWidth - dieWidth/2)
                    .attr('cy', lineData[0].y * dieWidth - dieWidth/2)
                    .style('fill', colors[ this.i++ % colors.length ]);
                return;
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


            this.svg.append("path")
                .attr("d", lineFunction(lineData))
                .attr("stroke", colors[ this.i % colors.length ])
                .attr("stroke-width", 20)
                .attr("stroke-linecap", "round")
                .attr("stroke-linejoin", "round")
                .attr("fill", "none");

            this.i++;
        },

        // clear the svg
        clear: function(){ 
            d3.selectAll(this.selector + ' *').remove();
        }

    };

    module.exports = BoggleOverlay;



    // private variables
    var dieWidth = 0;

    var colors = [
        "rgba( 52, 152, 219, 0.333)", // blue
        "rgba(231,  76, 60,  0.333)", // red
        "rgba( 46, 204, 113, 0.333)", // green
        "rgba(241, 196, 15,  0.333)", // yellow
        "rgba(155,  89, 182, 0.333)", // purple
    ];


}());