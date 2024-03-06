import CelebrationObj from "./celebration_obj";

class View {
  constructor(game, el, ctx) {
    this.game = game;
    this.el = el;
    this.handleClick = this.handleClick.bind(this);
    this.setupBoard();
    this.displayPlayer();
    this.celebrationObjects = []

    this.ctx = ctx
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
      console.log('hello?')
      this.addConfetti();
      console.log(this.celebrationObjects)
      this.startCelebration();
    } else {
      msg.append("It's a draw!");
    }
    this.el.append(msg);
  }


  addConfetti () {
    while (this.celebrationObjects.length < CelebrationObj.PARTY_SIZE) {
      let newConfetti = new CelebrationObj(this)
      this.celebrationObjects.push(newConfetti)
    }
  }

  moveConfetti() {
    this.celebrationObjects.forEach ( (confetti) => {
      confetti.move()
    })
  }

  startCelebration () {
    setInterval( (celebration) => {
        this.moveConfetti()
        this.draw(this.ctx)
    }, 20)
  }

  draw(ctx){
    this.ctx.clearRect(0,0, window.innerWidth, window.innerHeight)
    this.celebrationObjects.forEach( (object) => {
        object.draw(this.ctx)
    })
  }

  wrap (pos){
    if (pos[0] > window.innerWidth) {
        pos[0] = 0
        return pos
    }
    if (pos[1] > window.innerHeight){
        pos[1] = 0
        return pos
    }
    if (pos[0] < 0){
        pos[0] = window.innerWidth
        return pos
    }
    if (pos[1] < 0){
        pos[1] = window.innerHeight
        return pos
    }
    return pos
  }
}

export default View;