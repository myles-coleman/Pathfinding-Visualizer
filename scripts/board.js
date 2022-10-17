//when changing height/width, multiply new number by size of node and put that for the height/width in the css of container div
const height = 20;
const width = 45;
const START_NODE_ROW = 10;
const START_NODE_COL = 7;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 38;
const grid = [];
const divGrid = [];
let startNode;
let finishNode;

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

const setNodes = (grid) => {
  let nodes = getNodes(grid);
  let startIndex = ((START_NODE_ROW - 1) * width) + START_NODE_COL;
  let finishIndex = ((FINISH_NODE_ROW - 1) * height) + FINISH_NODE_COL;
  startNode = nodes[startIndex];
  finishNode = nodes[finishIndex];
}

//creates and returns grid of nodes
const createGrid = () => {
	for (let row = 1; row <= height; row++) {
	  	const currentRow = [];
		const currentRow2 = [];
	  	for (let col = 1; col <= width; col++) {

			let node = createNode(col, row);
			let divNode = document.createElement('div');

			divNode.className = "node";
			divNode.setAttribute('id',`node-${row}-${col}`);
			
			if (node.isStart) {
				divNode.classList.add('node-start');
			} else if (node.isFinish) {
				divNode.classList.add('node-finish');
			}
			
			//add wall class to the nodes that are dragged over with left click
            divNode.draggable = true;
            divNode.addEventListener("dragover", () => { 
                if (!node.isStart && !node.isFinish) {
					divNode.classList.add('node-wall');
            	}
			});

			//append divNodes to container and push nodes and divNodes to their respective arrays 
			document.getElementById("container").appendChild(divNode);
			currentRow.push(node);
			currentRow2.push(divNode);
	  	}
	  	grid.push(currentRow);
		divGrid.push(currentRow2);
	}
  	setNodes(grid);
}

//prints grid of nodes to console
const printNodes = (grid) => {
	/*
	for (let i = 0; i < grid.length; i++) {
		console.log(grid[i]);
	}
	*/

	for (let i = 0; i < getNodes(grid).length; i++) {
		console.log(getNodes(grid)[i]);
	}
}

//attatching method for refreshing grid to the event listener
document.getElementById("refresh").addEventListener("click", () => {
    document.getElementById("container").replaceChildren();
    createGrid();
    console.log("grid refreshed");
});

document.getElementById("print").addEventListener("click", () => {
  printNodes(divGrid);
});

window.onload = createGrid;