





var BoggleScore = {


    getScrabbleScore: function(word) {

        var letters = word.split("");
        var points = 0;

        letters.forEach(function(letter){
            points += this.getScrabbleLetterPoints(letter);
        }.bind(this));

        return points;

    },

    getBoggleScore: function(word) {

        var letters = word.length;
        
         // 1 2 3 5 11 
         // 4 5 6 7 8 

        if (letters <= 3) { return 0; }
        if (letters == 4) { return 1; }
        if (letters == 5) { return 2; }
        if (letters == 6) { return 3; }
        if (letters == 7) { return 5; }
        if (letters >= 8) { return 11; }

    },


    getScrabbleLetterPoints: function(letter) {

        letter = letter.toUpperCase();

        for (var i in scrabble) {
            var obj = scrabble[i];

            if(obj.letters.indexOf(letter) != -1){

                return obj.points;
            }    
        }

    }

};





var scrabble = [
    {
        points: 1,
        letters: ["E", "A", "I", "O", "N", "R", "T", "L", "S", "U"],
    },
    {
        points: 2,
        letters: ["D", "G" ],
    },
    {
        points: 3,
        letters: ["B", "C", "M", "P"],
    },
    {
        points: 4,
        letters: ["F", "H", "V", "W", "Y"],
    },
    {
        points: 5,
        letters: ["K"],
    },
    {
        points: 8,
        letters: ["J", "X"],
    },
    {
        points: 10,
        letters: ["Q", "Z"]
    }
];



console.log(BoggleScore.getScrabbleScore("boggle"));


