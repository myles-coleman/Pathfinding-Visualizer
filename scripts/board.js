import {dijkstra, getNodesInShortestPathOrder, getNodes} from './dijkstra.js';

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

const setNodes = (grid) => {
  let nodes = getNodes(grid);
  let startIndex = ((START_NODE_ROW - 1) * width) + START_NODE_COL;
  let finishIndex = ((FINISH_NODE_ROW - 1) * height) + FINISH_NODE_COL;
  startNode = nodes[startIndex];
  finishNode = nodes[finishIndex];
}

//creates grid and returns array of nodes and array of divNodes
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
	for (let i = 0; i < grid.length; i++) {
		console.log(grid[i]);
	}
}

const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
		if (i === visitedNodesInOrder.length) {
			setTimeout(() => {
				this.animateShortestPath(nodesInShortestPathOrder);
			}, 10 * i);
			return;
		}
		setTimeout(() => {
			const node = visitedNodesInOrder[i];
			document.getElementById(`node-${node.row}-${node.col}`).className =
			'node node-visited';
		}, 10 * i);
    }
  }

const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
		setTimeout(() => {
			const node = nodesInShortestPathOrder[i];
			document.getElementById(`node-${node.row}-${node.col}`).className =
			'node node-shortest-path';
		}, 50 * i);
    }
  }
/*
  visualizeDijkstra() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

*/

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