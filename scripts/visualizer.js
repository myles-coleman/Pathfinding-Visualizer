import {dijkstra, getNodesInShortestPathOrder, getNodes} from './algorithms/dijkstra.js';
import {createNode, START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL} from './node.js';
import { startTutorial } from './tutorial.js';

//height and width changes depending on screen size
//currently only support 1080p and 1440p screen sizes
let height;
let width;
screen.height > 1080 ? height = 46 : height = 32;
screen.height > 1080 ? width = 92 :  width = 72;

let startIndex = (START_NODE_ROW * width) + START_NODE_COL + 1;
let finishIndex = (FINISH_NODE_ROW * width) + FINISH_NODE_COL;
let grid = [];
let divGrid = [];
let startNode;
let finishNode;
let startDivNode;
let finishDivNode;
let dragStart;

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
			divNode.draggable = true;

			if (node.isStart) {
				divNode.classList.add('node-start');
				startDivNode = divNode;
				startNode = node;
			} else if (node.isFinish) {
				divNode.classList.add('node-finish');
				finishDivNode = divNode;
				finishNode = node;
			}
			//add wall class to the nodes that are dragged over with left click
            divNode.addEventListener("dragover", (event) => { 
				event.preventDefault();
                if (!node.isStart && !node.isFinish) {
					divNode.classList.add('node-wall');
					node.isWall = true;
            	} 
			});
			//when picking up the startNode, turn on the eraseWalls() method
			divNode.addEventListener("dragstart" ,() => {
				if (node.isStart || node.isFinish) {
					eraseWalls();
				}
				dragStart = divNode;
			})
			//when dropping the startNode/finishNode, make the drop target the new startNode/finishNode
			divNode.addEventListener("drop" ,(event) => {
				event.preventDefault();
				if (dragStart === startDivNode) {
					startDivNode.classList.remove("node-start");
					divNode.classList.add("node-start");
					if (divNode.classList.contains("node-wall")) {
						divNode.classList.remove("node-wall");
					}
					startNode.isStart = false;
					node.isStart = true;
					startDivNode = divNode;
					startNode = node;
					startIndex = (startNode.row * width) + startNode.col + 1;
					addWalls();
				} else if (dragStart === finishDivNode) {
					finishDivNode.classList.remove("node-finish");
					divNode.classList.add("node-finish");
					if (divNode.classList.contains("node-wall")) {
						divNode.classList.remove("node-wall");
					}
					finishNode.isFinish = false;
					node.isFinish = true;
					finishDivNode = divNode;
					finishNode = node;
					finishIndex = (finishNode.row * width) + finishNode.col;
					addWalls();
				}
			})
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
//prints nodes to the console
const printNodes = (grid) => {
	for (let i = 0; i < grid.length; i++) {
		console.log(grid[i]);
	}
}

const refreshGrid = () => {
	document.getElementById("container").replaceChildren();
	divGrid = [];
	grid = [];
    createGrid();
	startIndex = (START_NODE_ROW * width) + START_NODE_COL + 1;
	finishIndex = (FINISH_NODE_ROW * width) + FINISH_NODE_COL;
    console.log("grid refreshed");
}

//the next three dijkstra functions were sourced by Clément Mihailescu with some minor changes
const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
		if (i === visitedNodesInOrder.length) {
			setTimeout(() => {
				animateShortestPath(nodesInShortestPathOrder);
			}, 5 * i);
			return;
		}
		setTimeout(() => {
			const node = visitedNodesInOrder[i];
			document.getElementById(`node-${node.row}-${node.col}`).classList.add('node-visited');
		}, 5 * i);
    }
}

// draws the shortest path after the finishNode is reached
const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
		setTimeout(() => {
			const node = nodesInShortestPathOrder[i];
			document.getElementById(`node-${node.row}-${node.col}`).classList.add('node-shortest-path');
		}, 30 * i);
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

//attatching methods to buttons using event listeners
document.getElementById("refresh").addEventListener("click", refreshGrid);

document.getElementById("draw").addEventListener("click", () => {
	addWalls();
	console.log("drawing mode");
});

document.getElementById("eraser").addEventListener("click", () => {
	eraseWalls();
	console.log("eraser mode");
});

document.getElementById("visualize").addEventListener("click", () => {
	visualizeDijkstra();
	console.log("started visualization");
});

document.getElementById("start-tutorial").addEventListener("click", () => {
	startTutorial();
});
/*
document.getElementById("print").addEventListener("click", () => {
  	printNodes(grid);
});
*/
window.onload = createGrid;