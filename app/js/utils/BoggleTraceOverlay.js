
(function(){

    // private variables
    var dieWidth = 0;



    // BoggleTraceOverlay 
    var BoggleTraceOverlay = function(selector) {
        this.selector = selector;
        this.svg = d3.select(selector);

        dieWidth = $('.boggle-die').width();

        this.tracing = false;
        this.path = [];

        this.initialize();
    };

    BoggleTraceOverlay.prototype = {
        
        initialize: function(){
            
            $(this.selector).parent().on("touchstart", this.handleTouchstart.bind(this));
            $(this.selector).parent().on("touchend", this.handleTouchend.bind(this));
            $(this.selector).parent().on("touchmove", this.handleTouchmove.bind(this));

        },

        handleTouchstart: function(){
            this.tracing = true;
            console.log('down');

        },

        handleTouchend: function(){
            this.tracing = false;
            console.log('up');

            this.clear();
            this.path = [];

        },

        handleTouchmove: function(e){
            console.log('move');
            if (!this.tracing){ return; }

            var container = $(e.currentTarget).offset();
            var touchobj = e.originalEvent.touches[0];

            this.path.push({ 
                x: touchobj.clientX - container.left, 
                y: touchobj.clientY - container.top
            });

            if (this.path.length > 30){
                // this.path.shift();
            }

            this.drawTrail();
            console.log("tracing!", this.path.length);
        },


        // draw a trail (with a different color every time)
        drawTrail: function(trail){

            this.clear();

            // prepare line data
            var lineData = this.path;

            // extract the x,y coordinates and figure out offset
            var lineFunction = d3.svg.line()
                .x(function(d) { return d.x; })
                .y(function(d) { return d.y; })
                .interpolate("linear"); 

            // draw line
            var path = this.svg.insert("path", ":first-child")
                .attr("d", lineFunction(lineData))
                .attr('stroke', "rgba(231,  76, 60,  1)")
                .attr("stroke-width", 2)
                .attr("stroke-linecap", "round")
                .attr("stroke-linejoin", "round")
                .attr("fill", "none");

        },

        clear: function(){ 
            d3.selectAll(this.selector + ' *').remove();
        }

    };

    module.exports = BoggleTraceOverlay;


}());