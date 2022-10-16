//when changing height/width, multiply new number by size of node and put that for the height/width in the css of container div
const height = 20;
const width = 45;
const START_NODE_ROW = 10;
const START_NODE_COL = 7;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 38;
const grid = [];

//const startNode = grid[START_NODE_ROW][START_NODE_COL];
//const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

//function to create node object
const createNode = (col, row) => {
	return {
	  	col,
	  	row,
	  	isStart: row === START_NODE_ROW && col === START_NODE_COL,
	  	isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
	  	distance: Infinity,
	  	isVisited: false,
	  	isWall: false,
	  	previousNode: null,
	};
};

//creates and returns grid of nodes
const createGrid = () => {
	for (let row = 0; row < height; row++) {
	  	const currentRow = [];
	  	for (let col = 0; col < width; col++) {

			let node = createNode(row, col);
			//add draggable event listener, and isWall if object != startNode || finishNode

			//node.classList.add(`node ${extraClassName}`);
			//node.setAttribute('id',`node-${row}-${col}`);

			//document.getElementById("container").appendChild(node);
			currentRow.push(node);
	  	}
	  	grid.push(currentRow);
	}
};

//prints grid of nodes to console
const printNodes = (grid) => {
	for (let i = 0; i < grid.length; i++) {
		console.log(grid[i]);
	}
}

//takes grid of nodes and returns 1D array of nodes
const getNodes = (grid) => {
	const nodes = []
	for (let i = 0; i < grid.length; i++) {
	  	for (let j = 0; j < grid[i].length; j++) {
		nodes.push(grid[i][j]);
	  	}
	}
	return nodes;
}

//attatching method for refreshing grid to the event listener
document.getElementById("refresh").addEventListener("click", () => {
    document.getElementById("container").replaceChildren();
    createGrid();
    console.log("grid refreshed");
});

document.getElementById("print").addEventListener("click", () => {
  printNodes(grid);
});

window.onload = createGrid;