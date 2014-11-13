var BoggleDieModel = require("../BoggleDie/BoggleDieModel");
var BoggleTrail = require("../utils/BoggleTrail");
var BoggleMath = require("../utils/BoggleMath");

var BoggleBoard = Backbone.Model.extend({

    defaults: {
        "square":  5,
        "dice": []
    },  

    initialize: function() { 

        // create dice and shuffle
        var totalDice = Math.pow(this.get("square"), 2);
        var boggleDice = _.shuffle(_.map(_.range(totalDice), function(i){
            
            return new BoggleDieModel({
                letters: diceSides[i]
            });

        }));

        // store the position on the die, so we don't have to look it up everytime.
        // which also creates a BoggleMath object
        boggleDice.forEach(function(die, position){
            die.set('position', position);
        });

        // pass this array to the dice colleciton   
        this.set('dice', new BoggleDiceCollection(boggleDice));

    },


    // return an array of BoggleTrails, one for each possible trail
    search: function(query){

        var allTrails = [];

        // for all 25 dice, recurse to try to find this query
        this.get('dice').forEach(function(die, i){
            
            var trails = this.recurseSearch(die, query);

            if (trails.length > 0){
                // if this die has at least 1 trail, add it/them
                trails.forEach(function(trail){
                    allTrails.push(new BoggleTrail(trail));
                });
            }

        }.bind(this));

        return allTrails;

    },

    recurseSearch: function(die, query, trail, trails){

        if (trail === undefined){ trail = []; }
        if (trails === undefined){ trails = []; } 

        query = query.toLowerCase();
        var letter = die.get('letter').toLowerCase();

        // you can't used the same die twice!
        if (_.contains(trail, die)){ return; }

        // if the query starts with the letter...
        if (query.match(new RegExp("^" + letter))){

            // take off the first letter (or double letter from the double letter cube...)
            var subQuery = query.slice(letter.length);
            
            // add this die to the trail
            trail.push(die);

            // if this is the last of the query, push this trail and return
            if (subQuery === ""){
                if (trail.length > 0) {
                    trails.push(trail);
                }
                return trails;
            }

            // otherwise, foreach adjacent die's, recurse
            this.getAdjacentDice(die).forEach(function(neighbor){
                // make a new copy of the trail, and recurse
                this.recurseSearch(neighbor, subQuery, trail.slice(0), trails);
            }.bind(this)); 

        }
        
        return trails;
        
    },

    // return an array of all surrounding dice from the given die
    getAdjacentDice: function(die){

        var neighbors = die.get('math').getAdjacent(); // just positions
        var allDice = this.get('dice');
        
        return neighbors.map(function(i){
            return allDice.at(i); 
        });

    }

});



var BoggleDiceCollection = Backbone.Collection.extend({

    model: BoggleDieModel

});

var diceSides = [
    ['A', 'A', 'E', 'E', 'E', 'E'],
    ['A', 'S', 'A', 'R', 'I', 'F'],
    ['I', 'P', 'R', 'S', 'Y', 'Y'],
    ['A', 'I', 'F', 'R', 'S', 'Y'],
    ['A', 'E', 'E', 'E', 'E', 'M'],
    ['I', 'I', 'I', 'T', 'T', 'E'],
    ['D', 'H', 'H', 'L', 'O', 'R'],
    ['A', 'D', 'E', 'N', 'N', 'N'],
    ['D', 'D', 'H', 'N', 'O', 'T'],
    ['G', 'O', 'R', 'R', 'V', 'W'],
    ['D', 'H', 'H', 'N', 'O', 'W'],
    ['N', 'O', 'O', 'T', 'U', 'W'],
    ['E', 'I', 'L', 'P', 'S', 'T'],
    ['O', 'R', 'H', 'D', 'N', 'L'],
    ['B', 'B', 'J', 'K', 'X', 'Z'],
    ['E', 'I', 'I', 'L', 'S', 'T'],
    ['A', 'A', 'A', 'F', 'R', 'S'],
    ['C', 'C', 'E', 'N', 'S', 'T'],
    ['O', 'O', 'O', 'T', 'T', 'U'],
    ['E', 'N', 'S', 'S', 'S', 'U'],
    ['A', 'E', 'G', 'M', 'N', 'N'],
    ['A', 'E', 'E', 'G', 'U', 'M'],
    ['C', 'E', 'I', 'P', 'S', 'T'],
    ['E', 'O', 'M', 'T', 'T', 'T'],
    ['An','Er','He','In','Qu','Th']
];



module.exports = BoggleBoard;
