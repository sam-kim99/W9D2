import Game from '/home/samkim0451/WEEK 9/W9D2/practice-for-ch-js-browser-ttt-main/ttt_node/game.js';
import View from './ttt-view';

document.addEventListener("DOMContentLoaded", () => {
  // Your code here
  const figure = document.getElementsByClassName("ttt")[0];
  let newGame = new Game ();
  let newView = new View (newGame, figure);
});