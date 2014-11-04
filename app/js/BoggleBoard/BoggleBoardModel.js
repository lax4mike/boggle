var BoggleDieModel = require("../BoggleDie/BoggleDieModel");

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

        // pass this array to the dice colleciton   
        this.set('dice', new BoggleDiceCollection(boggleDice));

        // console.log(this.get('dice'));
    },

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
