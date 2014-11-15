/*

 0  1  2  3  4
 5  6  7  8  9
10 11 12 13 14
15 16 17 18 19 
20 21 22 23 24

*/

// given a die position (number), return some surrounding positions
(function(){
    "use strict";
    
    // square is how many row/columns
    var BoggleMath = function(position, square){
        this.square = square || 5;
        this.position = position;

        // whether or not this.position is on an edge
        this.top = (this.position <= this.square-1);
        this.right = (((this.position + 1) % this.square) === 0);
        this.bottom = (this.position >= (Math.pow(this.square, 2) - this.square));
        this.left = ((this.position) % this.square === 0);
    };

    BoggleMath.prototype = {

        // returns an object containing positions of adjacent dice
        // if options.return == 'object' is passed, it will return an object,
        // otherwise it will return an array
        getAdjacent: function(which, options){

            // which is optional, default to all points
            if (which === undefined){
                which = ['n', 'e', 's', 'w', 'ne', 'nw', 'se', 'sw'];
            }

            // if a single string was passed, treat it like an array of 1
            if (typeof(which) == "string"){
                which = [which];
            }

            var adj = {};

            // for each requested point
            which.forEach(function(direction){
                
                if (this.top && direction.contains('n')) return;
                if (this.right && direction.contains('e')) return;
                if (this.bottom && direction.contains('s')) return;
                if (this.left && direction.contains('w')) return;

                switch (direction){
                    case 'n':
                        adj.n = (this.position - this.square); 
                        break;
                    case 'ne':
                        adj.ne = (this.position - this.square + 1); 
                        break;
                    case 'nw':
                        adj.nw = (this.position - this.square - 1);
                        break;
                    case 'e':
                        adj.e = (this.position + 1);
                        break;
                    case 's':
                        adj.s = (this.position + this.square);
                        break;
                    case 'se':
                        adj.se = (this.position + this.square + 1);
                        break;
                    case 'sw':
                        adj.sw = (this.position + this.square - 1);
                        break;
                    case 'w':
                        adj.w = (this.position - 1);
                        break;
                }

            }.bind(this));

            // if options.format == "object", return an object
            // eg {n: 1, e: 7, s: 11, w:5}
            if (options !== undefined && options.format == "object"){
                return adj;
            }

            // otherwise, return array
            // eg [1, 7, 11, 5]
            return Object.keys(adj).map(function (direction) {
                return adj[direction];
            });

        },

        // returns true is this die position is adjacent to the other die position
        isAdjacent: function(otherPosition){
            var adj = this.getAdjacent();
            return (adj.indexOf(otherPosition) !== -1);
        },


        // return n e s w
        getCardinal: function(options){
            return this.getAdjacent(['n', 'e', 's', 'w'], options);
        },

        // return ne nw se sw
        getCorners: function(options){
            return this.getAdjacent(['ne', 'nw', 'se', 'sw'], options);
        },

        getCoordinates: function(){
            return {
                x: (this.position % this.square) + 1,
                y: Math.floor(this.position / this.square) + 1
            };
        }

    };


    module.exports = BoggleMath;


    // _.range(25).forEach(function(pos){
    //     console.log(new BoggleMath(pos).getCoordinates());
    // });


    // when will es6 be now?  ... sooooon
    if ( !String.prototype.contains ) {
        String.prototype.contains = function() {
            return String.prototype.indexOf.apply( this, arguments ) !== -1;
        };
    }

}());



