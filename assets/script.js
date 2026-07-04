const current_diff = document.getElementById("current-diff");
const current_score = document.getElementById("current-score");

// This generates the text based on the difficulty.
// It returns a string "result" 
function generateByDifficulty(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        const randomInd = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomInd);
    }
    return result;
}

// This function creates the boxes that will be displaying the text.
// They create n boxes as the difficulty rises.
function createTextBox() {
    let textArray = generateByDifficulty(difficulty);

    // The array "result" is split into characters here.
    for (let i = 0; i < textArray.length; i++) {
        const textBox = document.createElement('div');
        textBox.className = 'text-box';
        textBox.textContent = textArray[i].toUpperCase();
        const container = document.getElementById('main');
        container.append(textBox);
    }

    console.log(textArray);
}

// This is currently hardcoded.
let difficulty = 3;

current_diff.textContent = difficulty;

console.log(current_diff)
createTextBox();

// this is Reaction Time v0.1
// A fun character quick typing game.