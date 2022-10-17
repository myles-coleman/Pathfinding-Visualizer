// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export const dijkstra = (grid, startNode, finishNode) => {
	const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
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
  
const getUnvisitedNeighbors = (node, grid) => {

    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
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
  
// Backtracks from the finishNode to find the shortest path.
export const getNodesInShortestPathOrder = (finishNode) => {

	const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;

}