class Space{
  constructor(e, s){
    this.canvas = e || document.getElementById(e) || document.getElementsByTagName("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = 0;
    this.height = 0;
    this.stars = Array.from(new Array(100));
    this.init();
    this.next = null;
    this.xo = 0;
    this.yo = 0;
  }
  init(){
    this.stars.map((e, i) => {this.stars[i] = new Star()})
    this.resize();
    onresize = this.resize.bind(this);
    onmousemove = this.move.bind(this)
    this.next = requestAnimationFrame(this.update.bind(this))
  }
  resize(){
    this.canvas.width = this.width = innerWidth;
    this.canvas.height = this.height = innerHeight;
  }
  move(e){
    let evt = e || event;
    this.xo = this.width / 2 - evt.clientX;
    this.yo = this.height / 2 - evt.clientY;
  }
  update(){
    let d = 10;
    this.stars.map(s => {
      s.x += s.z * (this.xo / (innerWidth / 50));
      s.y += s.z * (this.yo / (innerHeight / 50));
      s.x %= this.width;
      if(s.x<0)s.x+=this.width;
      s.y %= this.height;
      if(s.y<0)s.y+=this.height;
      return s;
    })
    this.draw();
    this.next = requestAnimationFrame(this.update.bind(this));
  }
  draw(){
    this.ctx.fillStyle = "#ccc";
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.stars.forEach(s => {
      s.draw(this.ctx);
    })
  }
}
class Star{
  constructor(){
    this.x = Math.random() * innerWidth;
    this.y = Math.random() * innerHeight;
    this.z = Math.random();
  }
  draw(ctx){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.z * 5, 0, 2*Math.PI);
    ctx.fill();
  }
}