let pos = 0;
const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
];

let direction = 0;
const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);

  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  src = 0;
  newimg.src = pacArray[0][src];
  newimg.width = 50;
  newimg.style.left = position.x;
  newimg.style.top = position.y;
  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    newimg,
    src,
  };
}

function animateMouth(pac) {
    pac.src = (pac.src + 1) % 2;
    let direction = 0;
    if (pac.velocity.x < 0) direction = 1;
    else { direction = 0 ;}
    pac.newimg.src = pacArray[direction][pac.src];
}

function update() {
  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  });
  setTimeout(update, 20);
}

function checkCollisions(item) {
  if(item.position.x >= window.innerWidth - item.newimg.width - item.velocity.x  || item.position.x <= 0) {
    item.velocity.x *= -1;
    if (item.velocity.x < 0) item.newimg.src = pacArray[1][0];
    else { item.newimg.src = pacArray[0][0]; }
    
  }
  if (item.position.y >= window.innerHeight - item.newimg.height - item.velocity.y || item.position.y <= 0) {
    item.velocity.y *= -1;
  }
}

function makeOne() {
    current = makePac();
    // setInterval( () => {
    //     animateMouth(current);
    // }, 500);
    pacMen.push(current); 
}
