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
    const { col, row } = node;
    const width = grid[0].length;
    const height = grid.length;

    if (row > 0 && !grid[row - 1][col].isVisited && !grid[row - 1][col].isWall) {
        neighbors.push(grid[row - 1][col]);
    }
    if (row < height - 1 && !grid[row + 1][col].isVisited && !grid[row + 1][col].isWall) {
        neighbors.push(grid[row + 1][col]);
    }
    if (col > 0 && !grid[row][col - 1].isVisited && !grid[row][col - 1].isWall) {
        neighbors.push(grid[row][col - 1]);
    }
    if (col < width - 1 && !grid[row][col + 1].isVisited && !grid[row][col + 1].isWall) {
        neighbors.push(grid[row][col + 1]);
    }

    return neighbors;
};


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