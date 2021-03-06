const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
];
let mouseX = 0;
let mouseY = 0;

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

class pacMan {
    x = 0;
    mouthPos = 0;
    img = document.createElement('img');
    position = 0;
    velocity = 0;

    constructor() {
      this.position = setToRandom(200);
      this.velocity = setToRandom(10);

      this.img.style.position = 'absolute';
      this.img.classList.add('pacman');
      this.img.src = pacArray[0][0];
      this.img.width = 50;
      this.img.style.left = this.position.x;
      this.img.style.top = this.position.y;
      setInterval(() => this.animate(), 500);
      setInterval(() => this.move(), 20);
    }
    animate() {
      !this.mouthPos ? this.mouthPos = 1 : this.mouthPos = 0;
      if (this.velocity.x < 0) this.img.src = pacArray[1][this.mouthPos];
      else this.img.src = pacArray[0][this.mouthPos];
    }
    move() {
      this.checkCollisions();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      this.img.style.left = this.position.x;
      this.img.style.top = this.position.y;
    }

    checkCollisions() {
      if (mouseX > this.position.x && mouseX < this.position.x + this.img.width) {
        if (mouseY > this.position.y && mouseY < this.position.y + this.img.height) {
          this.destroy();
        }
      }
      if(this.position.x >= window.innerWidth - this.img.width - this.velocity.x  || this.position.x <= 0) {
        this.velocity.x *= -1;
        if (this.velocity.x < 0) this.img.src = pacArray[1][this.mouthPos];
        else this.img.src = pacArray[0][this.mouthPos];
      }
      if (this.position.y >= window.innerHeight - this.img.height - this.velocity.y || this.position.y <= 0) {
        this.velocity.y *= -1;
      }
    }

    destroy() {
      this.img.classList.add('pacDeath');
      setTimeout(() => {
        this.img.remove();
      }, 600)
    }
}

// Factory to make a PacMan at a random position with random velocity
function makeOne() {
    let game = document.getElementById('game');
    p = new pacMan();
    game.appendChild(p.img);
}
function main() {

}
window.onload = main();

onmousemove = function(e) { 
  mouseX = e.clientX;
  mouseY = e.clientY;
}
