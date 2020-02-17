"use strict";

class Space{
  constructor(e, f = false, c = true){
    this.canvas = e.localName == "canvas" ? e : document.getElementById(e);
    if(!this.canvas)throw("You must Provide a Canvas Element");
    this.center = c;
    this.f = f;
    this.ctx = this.canvas.getContext("2d");
    if(Spaceship)this.ship = new Spaceship(30);
    this.cr = null; // canvas element bounding rectangle
    this.stars = [];
    this.xo = 0;
    this.yo = 0;
    this.r = 5;
    this.x = 0;
    this.y = 0;
    this.lt = 0;
    this.dt = 0;
    this.resize();
    this.move({clientX: innerWidth / 4, clientY: innerHeight / 4});
    addEventListener("resize", this.resize = this.resize.bind(this));
    addEventListener("mousemove", this.move = this.move.bind(this));
    this.frame = requestAnimationFrame(this.update = this.update.bind(this));
  }
  resize(){
    const oldW = this.canvas.width;
    const oldH = this.canvas.height;
    if(this.f){
      this.canvas.width = innerWidth;
      this.canvas.height = innerHeight;
    }
    this.cr = this.canvas.getClientRects()[0];
    this.updateStars(oldW, oldH);
  }
  move(e){
    const x = e.clientX - this.cr.left;
    const y = e.clientY - this.cr.top;
    const w = this.canvas.width;
    const h = this.canvas.height;
    this.xo = ((!this.center ? innerWidth : w) / 2 - x).clamp(w / 2);
    this.yo = ((!this.center ? innerHeight : h) / 2 - y).clamp(h / 2);
  }
  updateStars(oldW, oldH){
    const xScaler = this.canvas.width / oldW;
    const yScaler = this.canvas.height / oldH;
    const target = (this.canvas.width * this.canvas.height) / 1e4 | 0;
    if (target < this.stars.length) this.stars.length = target;
    for (let s of this.stars) {
      s.x *= xScaler;
      s.y *= yScaler;
    }
    const extra = target - this.stars.length;
    for(let i = 0; i < extra; ++i){
      this.stars.push(new Star(this.canvas.width, this.canvas.height));
    }
  }
  update(t){
    this.dt = (t - this.lt) / 16;
    this.lt = t;
    const w = this.canvas.width;
    const h = this.canvas.height;
    for(let s of this.stars){
      s.x = (s.x + (s.z * (this.xo / (innerWidth / 50)) * this.dt) + w) % w;
      s.y = (s.y + (s.z * (this.yo / (innerHeight / 50)) * this.dt) + h) % h;
    }
    this.draw();
    this.frame = requestAnimationFrame(this.update);
  }
  draw(){
    this.ctx.fillStyle = "#ccc";
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const s of this.stars) s.draw(this.ctx, this.r);
    if(this.ship)this.ship.draw(this.ctx);
  }
}
class Star{
  constructor(w, h){
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.z = Math.random();
  }
  draw(ctx, r){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.z * r, 0, 2*Math.PI);
    ctx.fill();
  }
}
Number.prototype.clamp = function(n, m){
  let two = typeof m == "number";
  if(two){
    if(this < n)return n;
    if(this > m)return m;
  }else{
    if(this < -n)return -n;
    if(this > n)return n;
  }
  return this;
};
class Spaceship {
  constructor(r = 5){
    this.sides = 3;
    this.angle = Math.PI * 2 / this.sides;
    this.radius = r;
    this.offset = 0;
    addEventListener("mousemove", this.move = this.move.bind(this));
  }
  move(e){
    let evt = e || event;
    let dx = innerWidth/2-evt.clientX;
    let dy = innerHeight/2-evt.clientY;
    console.log(Math.sin(30))
    this.offset = (Math.atan2(dy, dx) + Math.PI) % (Math.PI*2)
    // * 180 / Math.PI + 180;
  }
  draw(ctx){
    ctx.fillStyle = "#e87f7f"
    let r = this.offset
    ctx.beginPath();
    let l = this.calcPoint(this.offset, (this.sides - 1));
    // ctx.moveTo(l.x, l.y);
    for(let i = 0; i < this.sides; i++){
      let p = this.calcPoint(i)
      ctx.lineTo(p.x, p.y);
      // ctx.moveTo(p.x, p.y)
      // ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    }
    ctx.fill();
  }
  calcPoint(i){
    let o = i * this.angle;
    let y = Math.sin(this.offset + this.angle * i % (Math.PI*2));
    let x = Math.cos(this.offset + this.angle * i % (Math.PI*2));
    return {
      x: innerWidth / 2 + (x * this.radius),
      y: innerHeight / 2 + (y * this.radius)
    }
  }
}