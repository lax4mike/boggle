(function(){

    // var words = require('./words.js');
    // this is now on window.words and I'm including it with vendor.js
    // because it takes a while to build importing this...


    module.exports = {

        lookup: function(word){

            if (!window.boggleWords){ 
                throw new ReferenceError("window.boggleWords not loaded!");
            }

            if ( window.boggleWords.indexOf( " " + word + " " ) >= 0 ) {
                return true;
            }

            return false;

        }
    };


}());


