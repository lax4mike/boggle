var fs = require('fs');

fs.readFile('all.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/\n/g, ' ');

  fs.writeFile('words.txt', result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});