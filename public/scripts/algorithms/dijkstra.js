export const dijkstra = (grid, startNode, finishNode) => {
	const visitedNodesInOrder = [];
    const unvisitedNodes = getNodes(grid);
	startNode.distance = 0;
    while (!!unvisitedNodes.length) {
		sortNodesByDistance(unvisitedNodes);
		const closestNode = unvisitedNodes.shift();
		if (closestNode.isWall) continue;
		if (closestNode.distance === Infinity) {// If the closestNode is at a distance of infinity, we are trapped so we return
			return visitedNodesInOrder;
		}
		closestNode.isVisited = true;
		visitedNodesInOrder.push(closestNode);
		if (closestNode === finishNode) {
			return visitedNodesInOrder;
		}
		updateUnvisitedNeighbors(closestNode, grid);
    }
}

// sorts array of unvisited nodes by shortest distance
const sortNodesByDistance = (unvisitedNodes) => {
  	unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}
  
// sets the distance and previous node for all the adjacent nodes
const updateUnvisitedNeighbors = (node, grid) => {
	const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
}

// checks adjacent nodes and pushes them to an array if they haven't already been visisted
export const getUnvisitedNeighbors = (node, grid) => {
    const neighbors = [];
    const {col, row} = node;
	let width; //this value needs to be changed based on the width defined in visualizer.js
	screen.height > 1080 ? width = 92 : width = 72;
	const nodeArr = getNodes(grid);
	let index
	if (row > 0) { // check if up
		index = ((row - 1) * width) + col;
		neighbors.push(nodeArr[index]);
	}
	if (row < grid.length - 1) { // check if down
		index = ((row + 1) * width) + col;
		neighbors.push(nodeArr[index]);
	}
	if (col > 0) { // check if left
		index = (row * width) + (col - 1);
		neighbors.push(nodeArr[index]);
	}
	if (col < grid[0].length - 1) { // check if right
		index = (row * width) + (col + 1);
		neighbors.push(nodeArr[index]);
	}
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

// takes grid of nodes and returns 1D array of nodes
export const getNodes = (grid) => {
	const nodes = []
	for (let i = 0; i < grid.length; i++) {
	  	for (let j = 0; j < grid[i].length; j++) {
			nodes.push(grid[i][j]);
	  	}
	}
	return nodes;
}
  
// returns array of nodes in the shortest path
export const getNodesInShortestPathOrder = (finishNode) => {
	const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
		nodesInShortestPathOrder.unshift(currentNode);
		currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}