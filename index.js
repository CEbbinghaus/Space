class Space{
  constructor(e, s){
    this.canvas = e || document.getElementById(e) || document.getElementsByTagName("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = 0;
    this.height = 0;
    this.stars = Array.from(new Array((innerWidth + innerHeight) / 20 | 0));
    this.init();
    this.next = null;
    this.xo = 0;
    this.yo = 0;
    this.mxo = 0;
    this.myo = 0;
    this.r = 50;
    this.o = 0;
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
    this.xo = this.width / 2;
    this.yo = this.height / 2;
  }
  move(e){
    let evt = e || event;
    this.mxo = this.width / 2 - evt.clientX;
    this.myo = this.height / 2 - evt.clientY;
    this.o = Math.getAngle(e.clientX, e.clientY);
  }
  update(){
    let d = 10;
    this.stars.map(s => {
      s.x += s.z * (this.mxo / (innerWidth / 50));
      s.y += s.z * (this.myo / (innerHeight / 50));
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
    this.ctx.beginPath();
    let s = 3;
    let a = 360 / s;
    this.ctx.fillStyle = "#d66889"
    this.ctx.moveTo(this.xo + Math.cos(Math.rad(a * (s - 1) + this.o)) * this.r, this.yo + Math.sin(Math.rad(a * (s - 1) + this.o)) * this.r)
    for(let i = 0; i < s; i++){
      this.ctx.lineTo(this.xo + Math.cos(Math.rad(a * i + this.o)) * this.r, this.yo + Math.sin(Math.rad(a * i + this.o)) * this.r);
      
    }
    this.ctx.fill();
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
Math.rad = function (d) {
  d %= 360;
  d = d < 0 ? d + 360 : d;
  return d * (Math.PI / 180);
}
Math.deg = function(r){
  return r * (180 / Math.PI);
}
Math.getAngle = function(x, y){
  return Math.deg(Math.atan2(innerHeight / 2 - y, innerWidth / 2 - x)) + 180;
}