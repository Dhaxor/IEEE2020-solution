var fs = require('fs');

var readline = require('readline');
// greedy algorithm
var stream = require('stream');

var instream = fs.createReadStream('a_example.txt');

var outstream = new stream();

var rl = readline.createInterface(instream, outstream);

let lineCount = 0;

let noBooks, noLibraries, daysForScanning;
let bookScore = [];

let libraries = [];

let libraryCount = 0;
let generalData;



rl.on('line', (line) => {
    if (++lineCount == 1) {
       generalData = line.split(' ');
       noBooks = generalData[0];
       noLibraries = generalData[1];
       daysForScanning = generalData[3];
    } else if (lineCount == 2) {
         bookScore = line.split(' ');
    } else {
        if (lineCount % 2 != 0) {
          let library = line.split(' ');
          libraries.push({ "noBooks" : library[0], "signUpDuration" : library[1], "bookShipmentPerDay" : library[2]});
        } else {
            let count = libraryCount++;
            libraries[count].books = line.split(' ');
            // libraries[count].daysToComplete = libraries[count].signUpDuration + (libraries[count].noBooks/ libraries[count].bookShipmentPerDay);
        }
    }
});

let result = [];


rl.on('close', () => {
    // libraries.map((x) => {
    //     x.daysTo
    // })

    libraries.map((x) => x.daysToComplete = parseInt(x.signUpDuration) + parseInt(x.noBooks / x.bookShipmentPerDay ));

    result = libraries.sort((previous, current) => {
        if (current.daysToComplete > previous.daysToComplete  && current.books.map((x) => bookScore[x]).reduce((a, b) => { return a + b}, 0) > previous.books.map((x) => bookScore[x]).reduce((a, b) => { return a + b}, 0)){
            return 1
        } else {
            return 0
        }
    });



    console.log(result);
});
