let rows;
let cols;
let grid;
let cellSize = 10;
let startTime;
let generationCounter = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  createInitialState();
    startTime = millis(); 
}


function draw() {
  background(0);
  drawCell()
  displayText();
  
  
  let nextGen = create2DArray(cols, rows);
  
  // Next based on the current grid
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      let cell = grid[i][j];
      
      // Count live neighbors
      let neighbors = countNeighbors(grid, i, j);
      if (cell == 0 && neighbors == 3) {
        nextGen[i][j] = 1;
      } else if (cell == 1 && (neighbors < 2 || neighbors > 3)) {
        nextGen[i][j] = 0;
      } else {
        nextGen[i][j] = cell;
      }  
    }
  }
  
  grid = nextGen;
  generationCounter++;
}


// Draw cells
function drawCell(){
  for(let i = 0; i < cols; i++){
      for(let j = 0; j < rows; j++){
        let x = i * cellSize;
        let y = j * cellSize;
        if(grid[i][j] === 1){
          fill(255)
          stroke(0);
          rect(x, y, cellSize - 1, cellSize - 1);
        }
      }
  } 
}


// Display the text
function displayText() {
  let secondsPassed = Math.floor((millis() - startTime) / 1000);

  fill('cornflowerblue');
  textSize(16);
  text("Time: " + secondsPassed + " seconds", 10, height - 60);
  text("Population: " + countPopulation(grid), 10, height - 40);
  text("Generation: " + generationCounter, 10, height - 20);

}


// Create the initial state and create 2D array
function create2DArray(cols, rows){
  let arr = new Array(cols);
  for(let i = 0; i < cols; i++){
    arr[i] = new Array(rows);
  }
  return arr;
}


// Fill the grid
function createInitialState(){
  rows = floor(height / cellSize);
  cols = floor(width / cellSize);
  grid = create2DArray(cols, rows);
  
  for(let i = 0; i < cols; i++){
      for(let j = 0; j < rows; j++){
        grid[i][j] = floor(random(2));
      }
  } 
}


// Count neighbors
function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (i === 0 && j === 0) continue; 

      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  return sum;
}


// Count population
function countPopulation(grid) {
  let sum = 0;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      sum += grid[i][j];
    }
  }
  return sum;
}
