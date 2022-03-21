let grid = [];
let next_grid;
let change = false;
let fast_mode = true;

let c0, c1, c2, c3, c4;

function setup() {
  createCanvas(400, 400);

  // color
  c0 = color(165, 35, 110);
  c1 = color(235, 30, 75);
  c2 = color(240, 105, 55);
  c3 = color(245, 220, 80);
  c4 = color(40, 150, 155);

  for (let x = 0; x < width; x++) {
    grid[x] = [];
    for (let y = 0; y < height; y++) {
      grid[x][y] = 0;
    }
  }

  grid[200][200] = 100000;
  next_grid = grid.slice();
}

function draw() {
  background(0);

  fast_mode = grid[200][200] > 4;

  if (fast_mode) {
    for (let it = 0; it <100; it++) {
      update_grid();
    }
  } else {
    update_grid();
  }

  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {

      let c;
      switch (grid[x][y]) {
        case 0:
          c = c0;
          break;
        case 1:
          c = c1;
          break;
        case 2:
          c = c2;
          break;
        case 3:
          c = c3;
          break;
        case 4:
          c = c4;
      }
      set(x, y, c);
    }

  }

  updatePixels();

  if (fast_mode) {
    noStroke();
    fill(255);
    textAlign(LEFT);
    text("central value : " + grid[200][200], 20, 20);
    text(" : 0\n : 1\n : 2\n : 3\n : >3", 33, 35);
    rectMode(CENTER);
    stroke(255);
    fill(c0);
    rect(25, 32 * 1, 10, 10);
    fill(c1);
    rect(25, 47, 10, 10);
    fill(c2);
    rect(25, 61, 10, 10);
    fill(c3);
    rect(25, 76, 10, 10);
    fill(c4);
    rect(25, 91, 10, 10);
    textAlign(CENTER);
    noStroke();
    fill(255);
    text("fast mode", width / 2, height - 20);
  }
}


function update_grid() {
  next_grid = grid.slice();
  change = false;
  for (let x = 1; x < width - 1; x++) {
    for (let y = 1; y < height - 1; y++) {
      if (grid[x][y] > 3) {
        change = true;
        next_grid[x][y] -= 4;
        next_grid[x + 1][y] += 1;
        next_grid[x - 1][y] += 1;
        next_grid[x][y + 1] += 1;
        next_grid[x][y - 1] += 1;
      }
    }
  }
  grid = next_grid.slice();
  if (!change) {
    noLoop();
  }
}