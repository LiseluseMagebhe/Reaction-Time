const current_diff = document.getElementById("current-diff");
const current_score = document.getElementById("current-score");
const main = document.getElementById("main");
const timeBar = document.getElementById('time-bar');
const DURATION = 6000;
const styles = getComputedStyle(document.documentElement);
const colorCorrect = styles.getPropertyValue('--text-correct').trim();
const colorActive  = styles.getPropertyValue('--text-active').trim();
const colorError   = styles.getPropertyValue('--text-error').trim();
const c0 = toRGB(colorCorrect); 
const c1 = toRGB(colorActive);  
const c2 = toRGB(colorError);   


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
    textArray = generateByDifficulty(difficulty);

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

// Begining of AI Code
// This is where I go to AI to help/ assist with things is want to do now and genuinely struggled with
function setTheme(themeName) {
    const root = document.documentElement;
    root.setAttribute('data-theme', themeName);
    // Pattern lives in a CSS var, but doesn't apply itself — push it onto
    // body explicitly so no one has to remember to wire it up in CSS.
    const styles = getComputedStyle(root);
    document.body.style.backgroundImage = styles.getPropertyValue('--bg-pattern').trim();
    document.body.style.backgroundSize = styles.getPropertyValue('--bg-pattern-size').trim();
}

const defaultTheme = 'pixel-quest';
const themes = [
    defaultTheme,
    'amber-noir',
    'dusk-lavender',
    'cyber-arcade',
    'pixel-quest',
    'neon-skyline'
];

let currentThemeIndex = themes.indexOf(defaultTheme);
    
if (currentThemeIndex === -1) {
        currentThemeIndex = 0;
}

setTheme(themes[currentThemeIndex]);

document.addEventListener("keydown", (e) => {
    if (e.repeat) return;
    if (e.key !== "Enter") return;
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    setTheme(themes[currentThemeIndex]);
})

// Other code
// Pull the actual colors from your CSS variables
// Convert any CSS color string to [r,g,b] via a throwaway canvas-free trick
function toRGB(color) {
    const temp = document.createElement('div');
    temp.style.color = color;
    document.body.appendChild(temp);
    const rgb = getComputedStyle(temp).color.match(/\d+/g).map(Number);
    document.body.removeChild(temp);
    return rgb;
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function lerpColor(from, to, t) {
    return `rgb(${Math.round(lerp(from[0], to[0], t))}, ${Math.round(lerp(from[1], to[1], t))}, ${Math.round(lerp(from[2], to[2], t))})`;
}

let startTime = null;

function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = (timestamp - startTime) % DURATION;
    const progress = elapsed / DURATION; // 0 → 1

    let width, color;

    if (progress <= 0.5) {
        const t = progress / 0.5; // 0 → 1 across first half
        width = lerp(100, 50, t);
        color = lerpColor(c0, c1, t);
    } else {
        const t = (progress - 0.5) / 0.5; // 0 → 1 across second half
        width = lerp(50, 0, t);
        color = lerpColor(c1, c2, t);
    }

    timeBar.style.width = `${width}%`;
    timeBar.style.background = color;

    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
// End of AI Code

// Answer evaluator function
// It will check the users answer, and compare
let difficulty = 7;
let score = 0;
let position = 0;

document.addEventListener("keydown", (e) => {
    if (e.key.length > 1 || position >= textArray.length) return;

    const child = main.children[position];
    const userInput = e.key.toUpperCase();
    const correctInput = textArray[position].toUpperCase();

    if (userInput === correctInput) {
        child.classList.add("correct");
        child.classList.remove("wrong");
        position++;
        score++;
        current_score.textContent = score;

    } else {
        child.classList.add("wrong");
    }

    console.log(position, score);

});

function round() {
    main.replaceChildren();
    createTextBox();
    position = 0;
}

// This is currently hardcoded.

current_diff.textContent = difficulty;

createTextBox();
setInterval(round, DURATION);

// this is Reaction Time v0.2
// A fun character quick typing game.