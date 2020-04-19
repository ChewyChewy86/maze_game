const {
  Engine,
  Render,
  Runner,
  World,
  Bodies,
  MouseConstraint,
  Mouse,
} = Matter;

const cells = 3;
const width = 600;
const height = 600;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false,
    width,
    height,
  },
});

Render.run(render);
Runner.run(Runner.create(), engine);

World.add(
  world,
  MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas),
  })
);

// Walls
const walls = [
  Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 40, height, { isStatic: true }),
  Bodies.rectangle(width, width / 2, 40, width, { isStatic: true }),
];
World.add(world, walls);

// Maze generation

const shuffle = (arr) => {
  let counter = arr.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);

    counter--;

    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }
  return arr;
};

// Grid pattern
const grid = Array(cells)
  .fill(null)
  .map(() => Array(cells).fill(false));

// Vertical
const verticals = Array(cells)
  .fill(null)
  .map(() => Array(cells - 1).fill(false));

// Horizontal
const horizontals = Array(cells - 1)
  .fill(null)
  .map(() => Array(3).fill(false));

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

const cellRecursion = (row, column) => {
  // If i have visted the cell at [row, column], then return
  if (grid[row][column]) {
    return;
  }
  // Mark this cell as being visted
  grid[row][column] = true;

  // Asseble randomly-ordered list of neighbors
  const neighbors = shuffle([
    [row - 1, column, 'up'],
    [row, column + 1, 'right'] ,
    [row + 1, column, 'down'],
    [row, column + 1, 'left'],
  ]);
  console.log(neighbors);
  // For each neighbor...
  for (let neighbor of neighbors) {
    const [nextRow, nextColumn] = neighbor;

    // See if that neighbor is out of bounds
    if (
      nextRow < 0 ||
      nextRow >= cells ||
      nextColumn < 0 ||
      nextColumn >= cells
    ) {
      continue;
    }
    // If we have visted that neighbor, continue to next neighbor
    if (grid[nextrow][nextColumn]) {
      continue;
    }
    // Remove a wall from either horizontals or verticals
  }

  // Visit that next cell
};

cellRecursion(1, 1);
// console.log(grid);
