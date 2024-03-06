import Game from '/home/acheung/Assignments/w9d2/W9D2/ttt_node/game.js';
import View from './ttt-view';

document.addEventListener("DOMContentLoaded", () => {
  // Your code here
  const figure = document.getElementsByClassName("ttt")[0];
  const canvas = document.getElementById('obnoxious')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  let ctx = canvas.getContext('2d')

  let newGame = new Game ();
  let newView = new View (newGame, figure, ctx);
});