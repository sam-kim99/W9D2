class CelebrationObj {
    static PARTY_SIZE = 100
    static VEL = [50,50]

    constructor(view) {
        this.pos = this.randomPosition()
        this.vel = this.randomVec(Math.floor(Math.random() * 50))
        this.radius = Math.floor( Math.random() * 100)
        this.color = this.randomColor()
        this.view = view
    }

    randomColor (){
        let hexDec = Math.floor(Math.random() * 16777215).toString(16)
        let hexCode = `#${hexDec}`
        return hexCode
    }
    randomPosition(){
        return [ Math.random() * window.innerWidth , Math.random() * window.innerHeight ]
    }

    draw (ctx){
        ctx.beginPath();
        ctx.arc(...this.pos, this.radius, 0, 360)
        ctx.fillStyle = this.color
        ctx.fill()
    }
    move (){
        let dX = this.vel[0]
        let dY = this.vel[1]
        this.pos[0] += dX
        this.pos[1] += dY
        this.view.wrap(this.pos)
    }

    randomVec(length) {
        const deg = 2 * Math.PI * Math.random();
        return this.scale([Math.sin(deg), Math.cos(deg)], length);
    }
      
    scale(vec, m) {
        return [vec[0] * m, vec[1] * m];
    } 

}
export default CelebrationObj;