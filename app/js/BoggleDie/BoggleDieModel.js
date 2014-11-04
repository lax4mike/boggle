var BoggleDie = Backbone.Model.extend({

    defaults: {
        letters: [],
        letter: null
    },

    initialize: function(attributes, options) {
        
        this.on("invalid", function(model, error) {
            console.log(error);
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
