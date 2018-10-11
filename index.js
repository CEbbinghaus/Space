class Space{
  constructor(e, f = false){
    this.canvas = e || document.getElementById(e) || document.getElementsByTagName("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.cr = this.canvas.getClientRects()[0];
    this.width = 0;
    this.height = 0;
    this.stars = Array.from(new Array(100));
    this.init();
    this.next = null;
    this.xo = 0;
    this.yo = 0;
    this.f = f;
    this.x = 0;
    this.y = 0;
  }
  init(){
    this.stars.map((e, i) => {this.stars[i] = new Star()})
    if(this.f){
      this.resize();
      onresize = this.resize.bind(this);
    }else{
      this.canvas.width = this.width = this.cr.width;
      this.canvas.height = this.height = this.cr.height;  
    }
    onmousemove = this.move.bind(this)
    this.next = requestAnimationFrame(this.update.bind(this))
  }
  resize(){
    this.canvas.width = this.width = innerWidth;
    this.canvas.height = this.height = innerHeight;
  }
  move(e){
    let evt = e || event;
    let x = e.clientX - this.cr.left;
    let y = e.clientY - this.cr.top;
    // if (x < 0 || y < 0 || x > this.width || y > this.width)return;
    let d = (innerWidth + innerHeight) / 1000
    this.xo = (this.width / 2 - x) / d;
    this.yo = (this.height / 2 - y) / d;
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