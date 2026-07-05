# Reaction Time

A simple browser-based character reaction game built with HTML, CSS, and JavaScript.

The game currently generates random characters and displays them as large boxes. This is an early version (`v0.1`) current set up is focused on UI and text generation.

## Features

- Random character generation based on difficulty length
- Dynamic creation of character boxes in the main game area
- Score and difficulty display in the header UI
- Clean, modular CSS split into:
  - `variables.css`
  - `ui.css`
  - `main.css`

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript

## Project Structure

```text
Reaction Time/
|-- index.html
|-- README.md
`-- assets/
    |-- main.css
    |-- script.js
    |-- ui.css
    `-- variables.css
```

## Getting Started

1. Clone or download this project.
2. Open the project folder.
3. Run it with a local server (recommended) or open `index.html` directly in a browser.

### Option A: VS Code Five Server / Live Server

- Right-click `index.html`
- Choose **Open with Five Server** (or Live Server)

### Option B: Open Directly

- Double-click `index.html`

## Current Game Behavior

- Difficulty is currently hardcoded in `assets/script.js`:

```js
let difficulty = 3;
```

- On load, the script:
  - Generates a random string with length = difficulty
  - Creates one `.text-box` per character
  - Displays uppercase characters in the main container

## Next Improvements

- Add keyboard input handling
- Compare typed input against generated characters
- Add timer and reaction-time scoring
- Add Play button behavior (start/restart)
- Add selectable difficulty levels
- Add win/fail feedback states

## Version

- `v0.1` - Initial UI and random character generation
