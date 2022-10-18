// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export const dijkstra = (grid, startNode, finishNode) => {
	const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getNodes(grid);
    while (!!unvisitedNodes.length) {
		sortNodesByDistance(unvisitedNodes);
		const closestNode = unvisitedNodes.shift();
		// If we encounter a wall, we skip it.
		if (closestNode.isWall) continue;
		// If the closest node is at a distance of infinity,
		// we must be trapped and should therefore stop.
		if (closestNode.distance === Infinity) return visitedNodesInOrder;
		closestNode.isVisited = true;
		visitedNodesInOrder.push(closestNode);
		if (closestNode === finishNode) return visitedNodesInOrder;
		updateUnvisitedNeighbors(closestNode, grid);
    }
}

const sortNodesByDistance = (unvisitedNodes) => {
  	unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}
  
const updateUnvisitedNeighbors = (node, grid) => {
	const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
}

//checks adjacent nodes
export const getUnvisitedNeighbors = (node, grid) => {

    const neighbors = [];
    const {col, row} = node;

	const width = 45;
	const index = (row * width) + col; //issue
	const nodeArr = getNodes(grid);

	if (row > 0) {
		let index1 = ((row - 1) * width) + col;
		neighbors.push(nodeArr[index1]);
	}
	//check if down
	if (row < grid.length - 1) {
		let index2 = ((row + 1) * width) + col;
		neighbors.push(nodeArr[index2]);
	}
	//check if left
	if (col > 0) {
		let index3 = (row * width) + (col - 1);
		neighbors.push(nodeArr[index3]);
	}
	//check if right
	if (col < grid[0].length - 1) {
		let index4 = (row * width) + (col + 1);
		neighbors.push(nodeArr[index4]);
	}
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

//takes grid of nodes and returns 1D array of nodes
export const getNodes = (grid) => {
	const nodes = []
	for (let i = 0; i < grid.length; i++) {
	  	for (let j = 0; j < grid[i].length; j++) {
			nodes.push(grid[i][j]);
	  	}
	}
	return nodes;
}
  
// Starts from the finishNode and returns an array of nodes for the shortest path to the startNode.
export const getNodesInShortestPathOrder = (finishNode) => {

	const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
		nodesInShortestPathOrder.unshift(currentNode);
		currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}