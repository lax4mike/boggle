var BoggleTrail = require('./BoggleTrail');

(function(){

    // BoggleOverlay 
    var BoggleOverlay = function(selector) {
        this.selector = selector;
        this.svg = d3.select(selector);
        this.i = 0; // to keep track of colors
        dieWidth = $('.boggle-die').width();

        this.multiColor = false; 

        this.svg.attr('opacity', (this.multiColor) ? 0.3 : 0.9);

    };

    BoggleOverlay.prototype = {

        // draw a trail (with a different color every time)
        drawTrail: function(trail){

            // prepare line data
            var lineData = trail.toCoordinateArray();

            // extract the x,y coordinates and figure out offset
            var lineFunction = d3.svg.line()
                .x(function(d) { return d.x * dieWidth - dieWidth/2; })
                .y(function(d) { return d.y * dieWidth - dieWidth/2; })
                .interpolate("linear");


            // create group that will house the cirle and line
            var g = this.svg.insert("g", ":first-child")
                .attr("data-i", this.i)
                .attr('opacity', (this.multiColor) ? 1 : 0.3);


            // draw circle 
            g.insert("circle", ":first-child")
                .attr('r', dieWidth/4)
                .attr('cx', lineData[0].x * dieWidth - dieWidth/2)
                .attr('cy', lineData[0].y * dieWidth - dieWidth/2)
                .style('fill', (this.multiColor) ? colors[ this.i % colors.length ] : colors[0]);


            

            // draw line
            var path = g.insert("path", ":first-child")
                .attr("d", lineFunction(lineData))
                .attr('stroke', (this.multiColor) ? colors[ this.i % colors.length ] : colors[0])
                .attr("stroke-width", dieWidth/4)
                .attr("stroke-linecap", "round")
                .attr("stroke-linejoin", "round")
                .attr("fill", "none");

            // transition
            // this.animatePath(path);

            this.i++;
        },

        animatePath: function(path, duration){

            duration = duration || 300;

            var totalLength = path.node().getTotalLength();

            path.attr("stroke-dasharray", totalLength + " " + totalLength)
                .attr("stroke-dashoffset", totalLength)
                .transition()
                    .duration(duration)
                    .ease("linear")
                    .attr("stroke-dashoffset", 0);
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
        "rgba( 52, 152, 219, 1)", // blue
        "rgba(241, 196, 15,  1)", // yellow
        "rgba( 46, 204, 113, 1)", // green
        "rgba(231,  76, 60,  1)", // red
        "rgba(155,  89, 182, 1)", // purple
    ];


}());