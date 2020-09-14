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

// let sort = (list) => {
//     // top-down implementation
//     function merge(left, right) {
//         let arr = [];
    
//         while (left.length && right.length) {
//         if (left[0] < right[0]) {
//             arr.push(left.shift());
//         } else {
//             arr.push(right.shift());
//         }
//         }
//         return arr.concat(left.slice().concat(right.slice()));
//     }
  
//     function mergeSort(arr) {
//         if (arr.length < 2) {
//         return arr;
//         }
    
//         const middle = Math.floor(arr.length / 2);
//         const left = arr.slice(0, middle);
//         const right = arr.slice(middle);
    
//         return merge(mergeSort(left), mergeSort(right));
//     }
  
//     return mergeSort(list);
// }
// let bool = false;

// let rank = (list, libraries, partial = []) => {
//     var s, n, remaining;

//     s = partial.map(x => x.books.map(bookScore)).reduce((previous, current) => {
//         return previous + current;
//     }, 0);

//     if(s <= daysForScanning)
//         result.push({"total" : , "combination": partial});

//     if(bool && partial == []) 
//         return;

//     list.forEach(element => {
//         bool = true;
//         rank(list.slice(list.findIndex(element) + 1), libraries, partial.concat([element]));
//     });
// }
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
