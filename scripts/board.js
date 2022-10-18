import {dijkstra, getNodesInShortestPathOrder, getNodes, getUnvisitedNeighbors} from './dijkstra.js';

//when changing height/width, multiply new number by size of node and put that for the height/width in the css of container div
const height = 20;
const width = 45;
const START_NODE_ROW = 9;
const START_NODE_COL = 7;
const FINISH_NODE_ROW = 9;
const FINISH_NODE_COL = 37;
const startIndex = (START_NODE_ROW * width) + START_NODE_COL + 1;
const finishIndex = (FINISH_NODE_ROW * width) + FINISH_NODE_COL; //possibly an issue that i had to remove (+1)

const grid = [];
const divGrid = [];

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

//creates grid and returns array of nodes and array of divNodes
const createGrid = () => {
	for (let row = 0; row < height; row++) {
	  	const currentRow = [];
		const currentRow2 = [];
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

			//append divNodes to container and push nodes and divNodes to their respective arrays 
			document.getElementById("container").appendChild(divNode);
			currentRow.push(node);
			currentRow2.push(divNode);
	  	}
	  	grid.push(currentRow);
		divGrid.push(currentRow2);
	}
}

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
			node.isVisited = true;
		}, 10 * i);
    }
}

const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
		setTimeout(() => {
			const node = nodesInShortestPathOrder[i];
			document.getElementById(`node-${node.row}-${node.col}`).classList.add('node-shortest-path');
		}, 50 * i);
    }
}

const visualizeDijkstra = () => {
	let nodes = getNodes(grid);
	const startNode = nodes[startIndex];
	const finishNode = nodes[finishIndex];

    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);

}

//prints grid of nodes to console
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

//attatching method for refreshing grid to the event listener
document.getElementById("refresh").addEventListener("click", () => {
    document.getElementById("container").replaceChildren();
    createGrid();
    console.log("grid refreshed");
});

document.getElementById("print").addEventListener("click", () => {
  	printNodes(divGrid);
});

document.getElementById("print-extra").addEventListener("click", () => {
	printNeighbors(getNodes(grid)[startIndex], grid);
});

document.getElementById("visualize").addEventListener("click", () => {
	visualizeDijkstra();
	console.log("started visualization");
});

window.onload = createGrid;