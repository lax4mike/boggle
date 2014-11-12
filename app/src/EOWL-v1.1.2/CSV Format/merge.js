var fs = require('fs');


var letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

letters.forEach(function(l){

	fs.appendFileSync("all.txt", fs.readFileSync(l + " Words.csv"));

});

console.log("Done!");
