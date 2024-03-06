class View {
  constructor(game, el) {
    this.game = game;
    this.el = el;
    this.handleClick = this.handleClick.bind(this);
    this.setupBoard();
    this.displayPlayer();
  }
  
  displayPlayer() {
    let currentMark = document.getElementById('mark')
    currentMark.innerText = `Current Player: ${this.game.currentPlayer}`
  }

  setupBoard() {
    const ul = document.createElement('ul');
    ul.classList.add('grid')
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        let cell = document.createElement('li');
        cell.dataset.pos = JSON.stringify([row, col]),
        ul.appendChild(cell);
      }
    }
    this.el.appendChild(ul);
    this.el.addEventListener("click", this.handleClick)
  }
  
  handleClick(e) {
    const move = e.target;
    "LI" === move.nodeName && this.makeMove(move);
  }

  makeMove(square) {
    const pos = JSON.parse(square.dataset.pos);
    const symbol = this.game.currentPlayer;
    try {
      this.game.playMove(pos)
      // this.displayPlayer();
    } catch (t) {
      alert("This " + t.msg.toLowerCase())
    }
    square.classList.add(symbol);
    // this.game.isOver() && this.handleGameOver();
    this.game.isOver() ? this.handleGameOver() : this.displayPlayer();
  }
  
  handleGameOver() {
    this.el.removeEventListener('click', this.handleClick);
    this.el.classList.add('game-over');
    const winner = this.game.winner();
    const msg = document.createElement("figcaption")
    if (winner) {
      this.el.classList.add(`winner-${winner}`);
      msg.append(`You win, ${winner}!`);
    } else {
      msg.append("It's a draw!");
    }
    this.el.append(msg);
  }

  celebration() {
    let canvas = document.getElementById('obnoxious');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let ctx = canvas.getContext('2d');
    
  }
}

export default View;