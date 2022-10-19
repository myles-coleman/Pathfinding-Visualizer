import {dijkstra, getNodesInShortestPathOrder, getNodes} from './dijkstra.js';
import {createNode, START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL} from './node.js';

//when changing height/width, multiply new number by size of node and put that for the height/width in the css of container div
const height = 20;
const width = 45;
const startIndex = (START_NODE_ROW * width) + START_NODE_COL + 1;
const finishIndex = (FINISH_NODE_ROW * width) + FINISH_NODE_COL;
const grid = [];
const divGrid = [];

//creates grid and returns array of nodes and array of divNodes
const createGrid = () => {
	for (let row = 0; row < height; row++) {
	  	const nodeRow = [];
		const divRow = [];
	  	for (let col = 0; col < width; col++) {

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
					node.isWall = true;
            	} 
			});
			
			//inserts divs into the container, creating the grid
			document.getElementById("container").appendChild(divNode);
			nodeRow.push(node);
			divRow.push(divNode);
	  	}
	  	grid.push(nodeRow);
		divGrid.push(divRow);
	}
}

//adds event listener for removing walls and removes event listener for adding walls
const addWalls = () => {
	for (let i = 0; i < divGrid.length; i++) {
		for (let j = 0; j < divGrid[0].length; j++) {
			divGrid[i][j].addEventListener("dragover", () => { 
				divGrid[i][j].classList.add('node-wall');
				grid[i][j].isWall = true;
			});
			divGrid[i][j].removeEventListener("dragover", () => { 
					divGrid[i][j].classList.remove('node-wall');
					grid[i][j].isWall = false;
			});
		}
	}
}

//adds event listener for adding walls and removes event listener for removing walls
const eraseWalls = () => {
	for (let i = 0; i < divGrid.length; i++) {
		for (let j = 0; j < divGrid[0].length; j++) {
			divGrid[i][j].addEventListener("dragover", () => {
					divGrid[i][j].classList.remove('node-wall');
					grid[i][j].isWall = false;
			});
			divGrid[i][j].removeEventListener("dragover", () => { 
				divGrid[i][j].classList.add('node-wall');
				grid[i][j].isWall = true;
		});
		}
	}
}

//function for setting start node
//function for setting finish node

const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
		if (i === visitedNodesInOrder.length) {
			setTimeout(() => {
				animateShortestPath(nodesInShortestPathOrder);
			}, 10 * i);
			return;
		}
		setTimeout(() => {
			const node = visitedNodesInOrder[i];
			document.getElementById(`node-${node.row}-${node.col}`).classList.add('node-visited');
		}, 10 * i);
    }
}

// draws the shortest path after the finishNode is reached
const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
		setTimeout(() => {
			const node = nodesInShortestPathOrder[i];
			document.getElementById(`node-${node.row}-${node.col}`).classList.add('node-shortest-path');
		}, 50 * i);
    }
}

// function to actually visualize dijkstras
const visualizeDijkstra = () => {
	let nodes = getNodes(grid);
	const startNode = nodes[startIndex];
	const finishNode = nodes[finishIndex];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
}

/* functions for testing nodes

const printNodes = (grid) => {
	for (let i = 0; i < grid.length; i++) {
		console.log(grid[i]);
	}
}

const printNeighbors = (node, grid) => {
	const neighbors = getUnvisitedNeighbors(node, grid);

	for (let i = 0; i < neighbors.length; i++) {
		console.log(neighbors[i]);
	}
}
*/

//attatching methods to buttons with event listeners
document.getElementById("refresh").addEventListener("click", () => {
    document.getElementById("container").replaceChildren();
    createGrid();

	//need to also reset all the arrays somehow;
    console.log("grid refreshed");
});

document.getElementById("add").addEventListener("click", () => {
	addWalls();
});

document.getElementById("eraser").addEventListener("click", () => {
	eraseWalls();
});



/* functions for testing nodes

document.getElementById("print").addEventListener("click", () => {
  	printNodes(divGrid);
});

document.getElementById("print-extra").addEventListener("click", () => {
	printNeighbors(getNodes(grid)[startIndex], grid);
});

*/

document.getElementById("visualize").addEventListener("click", () => {
	visualizeDijkstra();
	console.log("started visualization");
});

window.onload = createGrid;