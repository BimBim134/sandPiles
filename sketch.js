let grid = [];
let next_grid;
let change = false;
let fast_mode = true;

let c0, c1, c2, c3, c4;

let radius;
let r1, r2;

function setup() {
  createCanvas(800, 800);

  // color
  c0 = color(40,45,50);
  c1 = color(245,75,75);
  c2 = color(240,210,190);
  c3 = color(95,80,75);
  c4 = color(255);

  for (let x = 0; x < width; x++) {
    grid[x] = [];
    for (let y = 0; y < height; y++) {
      grid[x][y] = 0;
    }
  }

  grid[width / 2][height / 2] = 200000;
  next_grid = grid.slice();

  r1 = height / 2 - 5;
  r2 = height / 2 + 5;
}

function draw() {
  background(c0);

  fast_mode = grid[width / 2][height / 2] > 4;

  if (fast_mode) {
    for (let it = 0; it < 200; it++) {
      update_grid();
    }
  } else {
    update_grid();
  }

  loadPixels();
  for (let x = r1 - 10; x < r2 + 10; x++) {
    for (let y = r1 - 10; y < r2 + 10; y++) {

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
    text("central value : " + grid[width / 2][height / 2], 20, 20);
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

  checkRadius();
}

function checkRadius() {
  for (let r = r1 - 20; r < height / 2; r++) {
    if (grid[width / 2][r] != 0) {
      r1 = r;
      r2 = height - r;
      break;
    }
  }
}

function update_grid() {
  next_grid = grid.slice();
  change = false;
  for (let x = r1 - 10; x < r2 + 10; x++) {
    for (let y = r1 - 10; y < r2 + 10; y++) {
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