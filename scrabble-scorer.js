// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};


function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
	for (let i = 0; i < word.length; i++) {
	  for (const pointValue in oldPointStructure) {
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
	  }
	}
	return letterPoints;
 }


// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!");
   let wordToScore = input.question("\nEnter a word to score: ");
   return wordToScore;
};


let simpleScore = function(word) {
  word = word.toUpperCase();
  let totalScore = word.length;
  return totalScore;
};


let vowelBonusScore = function(word) {
  word = word.toUpperCase();
  let vowelArray = [];
  let consonantArray = [];
  let wordArray = word.split("");
  for (let i=0; i < wordArray.length; i++) {
    if (wordArray[i] === "A" || wordArray[i] === "E" || wordArray[i] === "I" || wordArray[i] === "O" || wordArray[i] === "U") {
      vowelArray.push(wordArray[i]);
    } else {
      consonantArray.push(wordArray[i]);
    }
  }
  let totalScore = (consonantArray.length) + (3*vowelArray.length);
  return totalScore;
};


let scorerA = {
  name: "Simple",
  description: "One point per character",
  scorerFunction: simpleScore,
};
let scorerB = {
  name: "Vowel Bonus",
  description: "Vowels are worth 3 points",
  scorerFunction: vowelBonusScore,
};
let scorerC = {
  name: "Scrabble",
  description: "Uses Scrabble point system",
  scorerFunction: oldScrabbleScorer,
};

let scrabbleScore = function(word) {
  word = word.toLowerCase();
  let totalScore = 0;
  for (item in newPointStructure) {
    for (let i=0; i < word.length; i++) {
			if(item === word[i]) {
        totalScore += newPointStructure[item];
      }
    }
  }
  return totalScore;
};


const scoringAlgorithms = [scorerA, scorerB, scorerC];

function scorerPrompt(word) {
  console.log(`Which scoring algorithm would you like to use?\n\n0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}\n1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}\n2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}`);
  let scoreType = input.question("Enter 0, 1, or 2: ");
  while (scoreType >= 3) {
    scoreType = input.question("Invalid input. Enter 0, 1, or 2: ");
  }
  if (scoreType === "0") {
    return scoringAlgorithms[0].scorerFunction(word);
  } else if (scoreType === "1") {
    return scoringAlgorithms[1].scorerFunction(word);
  } else {
    return scoringAlgorithms[2].scorerFunction(word);
  }
}


function transform(object) {
  let newPoints = {};
  for (item in object) {
    let letterArray = object[item];
    for (let i=0; i < letterArray.length; i++) {
      newPoints[String(letterArray[i].toLowerCase())] = Number(item);
    }
  }
  return newPoints;
};


let newPointStructure = transform(oldPointStructure);
scorerC["scorerFunction"] = scrabbleScore
newPointStructure[" "] = 0;
console.log(newPointStructure);

function runProgram() {
  let playedWord = initialPrompt();

  let scoreChoice = scorerPrompt(playedWord);
  console.log(`Score for '${playedWord}': ${scoreChoice}`);
}


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

