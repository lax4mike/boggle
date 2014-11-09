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
    // eg. [0, 6, 12, 18]
    var BoggleTrail = function(trail){
        this.trail = trail;
    };

    BoggleTrail.prototype = {

        // returns array of coordionate objects.  
        // This is a good format to pass to D3
        // eg. [ { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 } ]
        toCoordinateArray: function() {
            return this.trail.map(function(pos){
                return new BoggleMath(pos).getCoordinates();
            });
        },

        // returns a string of corrdinates (for debugging)
        // eg [ '[1, 1]', '[2, 2]', '[3, 3]', '[4, 4]' ]
        toCoordinateString: function(){
            return this.toCoordinateArray().map(function(obj){
                return "[" + obj.x + ", " + obj.y + "]";
            });
        },

        // return the position array
        // eg. [ 0, 6, 12, 18 ]
        getPositionArray: function(){
            return this.trail;
        },

        // get the position of the die at i
        get: function(i){
            return this.trail[i];
        },

        // return how many dice are in this trail
        diceCount: function(){
            return this.trail.length;
        },

        // eg. 0 -> 6 -> 12 -> 18
        toString: function() {
            return this.trail.join(" -> ");
        },

        // return an array of BoggleTrail of length 2 (2 dice)
        // eg. [ { trail: [ 0, 6 ] },
        //       { trail: [ 6, 12 ] },
        //       { trail: [ 12, 18 ] } ]
        split: function(){

            var segments = this.trail.map(function(pos, i, array){
                var next = array[i+1];
                return new BoggleTrail([pos, next]);
            });

            segments.pop();

            return segments;
        },

        // returns true if this trail is the same as other trail
        // forward or backward
        isEqual: function(other) {

            if (this.trail.length != other.trail.length) { return false; }

            var haveSame = function(position, i){
                return position === other.get(i);
            };

            // check if every element is the same in the two trails
            if (this.trail.every(haveSame)) { return true; }

            // check the reverse
            if (this.trail.reverse().every(haveSame)) { return true; }

            return false;

        }

 
    };


    module.exports = BoggleTrail;


    function test() {
        var a = new BoggleTrail([0, 6, 12, 18]);

        console.log("getPositionArray: ", a.getPositionArray());
        console.log("toCoordinateArray: ", a.toCoordinateArray());
        console.log("toCoordinateString: ", a.toCoordinateString());
        console.log("toString: ", a.toString());
        console.log("split: ", a.split());
    }
 


}());
