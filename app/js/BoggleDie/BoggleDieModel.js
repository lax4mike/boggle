var BoggleMath = require("../utils/BoggleMath");

var BoggleDie = Backbone.Model.extend({

    defaults: {
        letters: [],
        letter: null,
        position: null, // position in boggle board
        math: null // BoggleMath object
    },

    initialize: function(attributes, options) {
        
        this.on("invalid", function(model, error) {
            console.log(error);
        });

        this.on("change:position", function(){
            this.set('math', new BoggleMath(this.get('position')));
        });

        this.role();

        // console.log(this.attributes);
    },

    validate: function(attributes, options) {
        if (attributes.letters.length != 4) {
            return "There must be exactly 6 letters on a die!";
        }
    },

    // choose a random letter (0-5)
    role: function() {
        this.set('letter', this.get('letters')[Math.floor(Math.random() * 6)]); 
    }


});

module.exports = BoggleDie;
