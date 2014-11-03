var BoggleDieModel = require('./BoggleDieModel');

var DiceCollection = Backbone.Collection.extend({

	model: BoggleDieModel

});


module.exports = DiceCollection;
