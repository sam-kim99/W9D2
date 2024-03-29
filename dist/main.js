/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/celebration_obj.js":
/*!********************************!*\
  !*** ./src/celebration_obj.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass CelebrationObj {\n    static PARTY_SIZE = 100\n    static VEL = [50,50]\n\n    constructor(view) {\n        this.pos = this.randomPosition()\n        this.vel = this.randomVec(Math.floor(Math.random() * 50))\n        this.radius = Math.floor( Math.random() * 100)\n        this.color = this.randomColor()\n        this.view = view\n    }\n\n    randomColor (){\n        let hexDec = Math.floor(Math.random() * 16777215).toString(16)\n        let hexCode = `#${hexDec}`\n        return hexCode\n    }\n    randomPosition(){\n        return [ Math.random() * window.innerWidth , Math.random() * window.innerHeight ]\n    }\n\n    draw (ctx){\n        ctx.beginPath();\n        ctx.arc(...this.pos, this.radius, 0, 360)\n        ctx.fillStyle = this.color\n        ctx.fill()\n    }\n    move (){\n        let dX = this.vel[0]\n        let dY = this.vel[1]\n        this.pos[0] += dX\n        this.pos[1] += dY\n        this.view.wrap(this.pos)\n    }\n\n    randomVec(length) {\n        const deg = 2 * Math.PI * Math.random();\n        return this.scale([Math.sin(deg), Math.cos(deg)], length);\n    }\n      \n    scale(vec, m) {\n        return [vec[0] * m, vec[1] * m];\n    } \n\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CelebrationObj);\n\n//# sourceURL=webpack://practice-for-ch-js-browser-ttt-main/./src/celebration_obj.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_acheung_Assignments_w9d2_W9D2_ttt_node_game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ttt_node/game.js */ \"./ttt_node/game.js\");\n/* harmony import */ var _home_acheung_Assignments_w9d2_W9D2_ttt_node_game_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_home_acheung_Assignments_w9d2_W9D2_ttt_node_game_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _ttt_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ttt-view */ \"./src/ttt-view.js\");\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  // Your code here\n  const figure = document.getElementsByClassName(\"ttt\")[0];\n  const canvas = document.getElementById('obnoxious')\n  canvas.width = window.innerWidth\n  canvas.height = window.innerHeight\n  let ctx = canvas.getContext('2d')\n\n  let newGame = new (_home_acheung_Assignments_w9d2_W9D2_ttt_node_game_js__WEBPACK_IMPORTED_MODULE_0___default()) ();\n  let newView = new _ttt_view__WEBPACK_IMPORTED_MODULE_1__[\"default\"] (newGame, figure, ctx);\n});\n\n//# sourceURL=webpack://practice-for-ch-js-browser-ttt-main/./src/index.js?");

/***/ }),

/***/ "./src/ttt-view.js":
/*!*************************!*\
  !*** ./src/ttt-view.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _celebration_obj__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./celebration_obj */ \"./src/celebration_obj.js\");\n\n\nclass View {\n  constructor(game, el, ctx) {\n    this.game = game;\n    this.el = el;\n    this.handleClick = this.handleClick.bind(this);\n    this.setupBoard();\n    this.displayPlayer();\n    this.celebrationObjects = []\n\n    this.ctx = ctx\n  }\n  \n  displayPlayer() {\n    let currentMark = document.getElementById('mark')\n    currentMark.innerText = `Current Player: ${this.game.currentPlayer}`\n  }\n\n  setupBoard() {\n    const ul = document.createElement('ul');\n    ul.classList.add('grid')\n    for (let row = 0; row < 3; row++) {\n      for (let col = 0; col < 3; col++) {\n        let cell = document.createElement('li');\n        cell.dataset.pos = JSON.stringify([row, col]),\n        ul.appendChild(cell);\n      }\n    }\n    this.el.appendChild(ul);\n    this.el.addEventListener(\"click\", this.handleClick)\n  }\n  \n  handleClick(e) {\n    const move = e.target;\n    \"LI\" === move.nodeName && this.makeMove(move);\n  }\n\n  makeMove(square) {\n    const pos = JSON.parse(square.dataset.pos);\n    const symbol = this.game.currentPlayer;\n    try {\n      this.game.playMove(pos)\n      // this.displayPlayer();\n    } catch (t) {\n      alert(\"This \" + t.msg.toLowerCase())\n    }\n    square.classList.add(symbol);\n    // this.game.isOver() && this.handleGameOver();\n    \n    this.game.isOver() ? this.handleGameOver() : this.displayPlayer();\n  }\n  \n  handleGameOver() {\n    this.el.removeEventListener('click', this.handleClick);\n    this.el.classList.add('game-over');\n    const winner = this.game.winner();\n    const msg = document.createElement(\"figcaption\")\n    if (winner) {\n      this.el.classList.add(`winner-${winner}`);\n      msg.append(`You win, ${winner}!`);\n      console.log('hello?')\n      this.addConfetti();\n      console.log(this.celebrationObjects)\n      this.startCelebration();\n    } else {\n      msg.append(\"It's a draw!\");\n    }\n    this.el.append(msg);\n  }\n\n\n  addConfetti () {\n    while (this.celebrationObjects.length < _celebration_obj__WEBPACK_IMPORTED_MODULE_0__[\"default\"].PARTY_SIZE) {\n      let newConfetti = new _celebration_obj__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this)\n      this.celebrationObjects.push(newConfetti)\n    }\n  }\n\n  moveConfetti() {\n    this.celebrationObjects.forEach ( (confetti) => {\n      confetti.move()\n    })\n  }\n\n  startCelebration () {\n    setInterval( (celebration) => {\n        this.moveConfetti()\n        this.draw(this.ctx)\n    }, 20)\n  }\n\n  draw(ctx){\n    this.ctx.clearRect(0,0, window.innerWidth, window.innerHeight)\n    this.celebrationObjects.forEach( (object) => {\n        object.draw(this.ctx)\n    })\n  }\n\n  wrap (pos){\n    if (pos[0] > window.innerWidth) {\n        pos[0] = 0\n        return pos\n    }\n    if (pos[1] > window.innerHeight){\n        pos[1] = 0\n        return pos\n    }\n    if (pos[0] < 0){\n        pos[0] = window.innerWidth\n        return pos\n    }\n    if (pos[1] < 0){\n        pos[1] = window.innerHeight\n        return pos\n    }\n    return pos\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (View);\n\n//# sourceURL=webpack://practice-for-ch-js-browser-ttt-main/./src/ttt-view.js?");

/***/ }),

/***/ "./ttt_node/board.js":
/*!***************************!*\
  !*** ./ttt_node/board.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MoveError = __webpack_require__(/*! ./moveError */ \"./ttt_node/moveError.js\");\n\nclass Board {\n  constructor() {\n    this.grid = Board.makeGrid();\n  }\n\n  isEmptyPos(pos) {\n    if (!Board.isValidPos(pos)) {\n      throw new MoveError('Is not valid position!');\n    }\n\n    return (this.grid[pos[0]][pos[1]] === null);\n  }\n\n  isOver() {\n    if (this.winner() != null) {\n      return true;\n    }\n\n    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {\n      for (let colIdx = 0; colIdx < 3; colIdx++) {\n        if (this.isEmptyPos([rowIdx, colIdx])) {\n          return false;\n        }\n      }\n    }\n\n    return true;\n  }\n\n  placeMark(pos, mark) {\n    if (!this.isEmptyPos(pos)) {\n      throw new MoveError('Is not an empty position!');\n    }\n\n    this.grid[pos[0]][pos[1]] = mark;\n  }\n\n  print() {\n    const strs = [];\n    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {\n      const marks = [];\n      for (let colIdx = 0; colIdx < 3; colIdx++) {\n        marks.push(\n          this.grid[rowIdx][colIdx] ? this.grid[rowIdx][colIdx] : \" \"\n        );\n      }\n      strs.push(`${marks.join('|')}\\n`);\n    }\n\n    console.log(strs.join('-----\\n'));\n  }\n\n  winner() {\n    const posSeqs = [\n      // horizontals\n      [[0, 0], [0, 1], [0, 2]],\n      [[1, 0], [1, 1], [1, 2]],\n      [[2, 0], [2, 1], [2, 2]],\n      // verticals\n      [[0, 0], [1, 0], [2, 0]],\n      [[0, 1], [1, 1], [2, 1]],\n      [[0, 2], [1, 2], [2, 2]],\n      // diagonals\n      [[0, 0], [1, 1], [2, 2]],\n      [[2, 0], [1, 1], [0, 2]]\n    ];\n\n    for (let i = 0; i < posSeqs.length; i++) {\n      const winner = this.winnerHelper(posSeqs[i]);\n      if (winner != null) {\n        return winner;\n      }\n    }\n\n    return null;\n  }\n\n  winnerHelper(posSeq) {\n    for (let markIdx = 0; markIdx < Board.marks.length; markIdx++) {\n      const targetMark = Board.marks[markIdx];\n      let winner = true;\n      for (let posIdx = 0; posIdx < 3; posIdx++) {\n        const pos = posSeq[posIdx];\n        const mark = this.grid[pos[0]][pos[1]];\n\n        if (mark != targetMark) {\n          winner = false;\n        }\n      }\n\n      if (winner) {\n        return targetMark;\n      }\n    }\n\n    return null;\n  }\n\n  static isValidPos(pos) {\n    return (0 <= pos[0]) &&\n    (pos[0] < 3) &&\n    (0 <= pos[1]) &&\n    (pos[1] < 3);\n  }\n\n  static makeGrid() {\n    const grid = [];\n\n    for (let i = 0; i < 3; i++) {\n      grid.push([]);\n      for (let j = 0; j < 3; j++) {\n        grid[i].push(null);\n      }\n    }\n\n    return grid;\n  }\n}\n\nBoard.marks = ['x', 'o'];\n\nmodule.exports = Board;\n\n\n//# sourceURL=webpack://practice-for-ch-js-browser-ttt-main/./ttt_node/board.js?");

/***/ }),

/***/ "./ttt_node/game.js":
/*!**************************!*\
  !*** ./ttt_node/game.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Board = __webpack_require__(/*! ./board */ \"./ttt_node/board.js\");\nconst MoveError = __webpack_require__(/*! ./moveError */ \"./ttt_node/moveError.js\");\n\nclass Game {\n  constructor() {\n    this.board = new Board();\n    this.currentPlayer = Board.marks[0];\n  }\n\n  isOver() {\n    return this.board.isOver();\n  }\n\n  playMove(pos) {\n    this.board.placeMark(pos, this.currentPlayer);\n    this.swapTurn();\n  }\n\n  promptMove(reader, callback) {\n    const game = this;\n\n    this.board.print();\n    console.log(`Current Turn: ${this.currentPlayer}`);\n\n    reader.question('Enter rowIdx: ', rowIdxStr => {\n      const rowIdx = parseInt(rowIdxStr);\n      reader.question('Enter colIdx: ', colIdxStr => {\n        const colIdx = parseInt(colIdxStr);\n        callback([rowIdx, colIdx]);\n      });\n    });\n  }\n\n  run(reader, gameCompletionCallback) {\n    this.promptMove(reader, move => {\n      try {\n        this.playMove(move);\n      } catch (e) {\n        if (e instanceof MoveError) {\n          console.log(e.msg);\n        } else {\n          throw e;\n        }\n      }\n\n      if (this.isOver()) {\n        this.board.print();\n        if (this.winner()) {\n          console.log(`${this.winner()} has won!`);\n        } else {\n          console.log('NO ONE WINS!');\n        }\n        gameCompletionCallback();\n      } else {\n        // continue loop\n        this.run(reader, gameCompletionCallback);\n      }\n    });\n  }\n\n  swapTurn() {\n    if (this.currentPlayer === Board.marks[0]) {\n      this.currentPlayer = Board.marks[1];\n    } else {\n      this.currentPlayer = Board.marks[0];\n    }\n  }\n\n  winner() {\n    return this.board.winner();\n  }\n}\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack://practice-for-ch-js-browser-ttt-main/./ttt_node/game.js?");

/***/ }),

/***/ "./ttt_node/moveError.js":
/*!*******************************!*\
  !*** ./ttt_node/moveError.js ***!
  \*******************************/
/***/ ((module) => {

eval("const MoveError = function (msg) { this.msg = msg; };\n\n// MoveError really should be a child class of the built in Error object provided\n// by Javascript, but since we haven't covered inheritance yet, we'll just\n// let it be a vanilla Object for now!\n\nmodule.exports = MoveError;\n\n\n//# sourceURL=webpack://practice-for-ch-js-browser-ttt-main/./ttt_node/moveError.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;