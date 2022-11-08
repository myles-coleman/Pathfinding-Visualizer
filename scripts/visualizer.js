import {dijkstra, getNodesInShortestPathOrder, getNodes} from './algorithms/dijkstra.js';
import {createNode, START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL} from './node.js';

//when changing height/width, multiply new number by size of node and put that for the height/width in the css of container div
let height;
let width;
screen.height === 1440 ? height = 46 : height = 32;
screen.height === 1440 ? width = 92 :  width = 72;

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
/*
const printNodes = (grid) => {
	for (let i = 0; i < grid.length; i++) {
		console.log(grid[i]);
	}
}
*/
const refreshGrid = () => {
	document.getElementById("container").replaceChildren();
	divGrid = [];
	grid = [];
    createGrid();
	startIndex = (START_NODE_ROW * width) + START_NODE_COL + 1;
	finishIndex = (FINISH_NODE_ROW * width) + FINISH_NODE_COL;
    console.log("grid refreshed");
}

const startTutorial = () => {

	let page1 = document.createElement("div");
	let page2 = document.createElement("div");
	let title = document.createElement("h1");
	let text = document.createElement("p");
	let title2 = document.createElement("h1");
	let text2 = document.createElement("p");
	let text3 = document.createElement("p");

	const image = "<img id='tutorial-img' src='../images/dijkstras.png' alt='dijkstras' >";
	const image2 = "<img id='tutorial-img2' src='../images/walls.png' alt='wall buttons' >";
	let backBtn = document.createElement("button");
	let nextBtn = document.createElement("button");

	page1.setAttribute('id',"tutorial");
	title.setAttribute('id', "tutorial-title");
	text.setAttribute('id', "tutorial-text");

	page2.setAttribute('id',"tutorial");
	title2.setAttribute('id', "tutorial-title");
	text2.setAttribute('id', "tutorial-text");
	text3.setAttribute('id', "tutorial-text");

	backBtn.setAttribute('id', "tutorial-btn-back");
	nextBtn.setAttribute('id', "tutorial-btn-next");
	backBtn.setAttribute('type', "button");
	nextBtn.setAttribute('type', "button");

	title.innerHTML += "Pathfinding Visualizer Tutorial";
	text.innerHTML += "This webapp uses Dijkstra's algorithm, a pathfinding algorithm, to calculate the shortest path between two nodes.";
	
	title2.innerHTML += "Understanding Walls and Nodes";
	text2.innerHTML += "By default, holding down left click over the grid draws walls. Clicking the 'Erase Walls' button changes the functionality of holding down left click over the grid to then erase the walls. In order to go back to drawing walls, you will need to click the 'Draw Walls' button."
	text3.innerHTML += "You can move both the starting node and the finish node anywhere on the grid.";

	nextBtn.innerHTML += "next";
	backBtn.innerHTML += "back";

	nextBtn.addEventListener("click", () => {
		document.body.replaceChild(page2, page1);
	})

	backBtn.addEventListener("click", () => {
		document.body.replaceChild(page1, page2);
	})
	


	page1.appendChild(title);
	page1.appendChild(text);
	page1.innerHTML += image;
	page1.appendChild(nextBtn);

	page2.appendChild(title2);
	page2.appendChild(text2);
	page2.innerHTML += image2;
	page2.appendChild(text3);
	page2.appendChild(backBtn);	

	document.body.appendChild(page1);
}

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

//attatching methods to buttons with event listeners
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