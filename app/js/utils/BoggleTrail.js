var BoggleMath = require('./BoggleMath');

/*

 0  1  2  3  4
 5  6  7  8  9
10 11 12 13 14
15 16 17 18 19 
20 21 22 23 24

*/


(function(){
    "use strict";

    // trail is an array of die positions
    // eg. [1, 7, 12, 11]
    var BoggleTrail = function(trail){
        this.trail = trail;
    };

    BoggleTrail.prototype = {

        toCoordinateArray: function() {
            return this.trail.map(function(pos){
                return new BoggleMath(pos).getCoordinates();
            });
        },

        toCoordinateString: function(){
            return this.toCoordinateArray().map(function(obj){
                return "[" + obj.x + ", " + obj.y + "]";
            });
        },

        toString: function() {
            return this.trail.join(" -> ");
        }
    };


    module.exports = BoggleTrail;

}());