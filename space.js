class Space{
  constructor(e, f = false, c = true){
    this.canvas = e.localName == 'canvas' ? e : document.getElementById(e);
    if(!this.canvas)throw("You must Provide a Canvas Element");
    this.ctx = this.canvas.getContext("2d");
    this.cr = this.canvas.getClientRects()[0];
    this.center = c;
    this.width = 0;
    this.height = 0;
    this.stars = Array.from(new Array((this.cr.width + this.cr.height) / 20 | 0));
    this.init();
    this.next = null;
    this.xo = 0;
    this.yo = 0;
    this.f = f;
    this.r = 5;
    this.x = 0;
    this.y = 0;
  }
  init(){
    this.stars.map((e, i) => {this.stars[i] = new Star()})
    this.resize();
    onresize = this.resize.bind(this);
    onmousemove = this.move.bind(this)
    this.next = requestAnimationFrame(this.update.bind(this))
  }
  resize(){
    this.cr = this.canvas.getClientRects()[0];
    if(this.f){
      this.canvas.width = this.width = innerWidth;
      this.canvas.height = this.height = innerHeight;
    } else {
      this.canvas.width = this.width = this.cr.width;
      this.canvas.height = this.height = this.cr.height;
    }
  }
  move(e){
    let evt = e || event;
    let x = e.clientX - this.cr.left;
    let y = e.clientY - this.cr.top;
    // if (x < 0 || y < 0 || x > this.width || y > this.width)return;
    let d = (innerWidth + innerHeight) / 1000
    this.xo = ((!this.center ? innerWidth : this.width) / 2 - (!this.center ? evt.clientX : x)).clamp(this.width / 2);
    this.yo = ((!this.center ? innerHeight : this.height) / 2 - (!this.center ? evt.clientY : y)).clamp(this.height / 2);
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
      s.draw(this.ctx, this.r);
    })
  }
}
class Star{
  constructor(){
    this.x = Math.random() * innerWidth;
    this.y = Math.random() * innerHeight;
    this.z = Math.random();
  }
  draw(ctx, r){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.z * r, 0, 2*Math.PI);
    ctx.fill();
  }
}
Number.prototype.clamp = function (n) {
  if(this < -n)return -n;
  if(this > n)return n;
  return this;
}