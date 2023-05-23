import { getNodes } from './dijkstra.js';
const visitedNodesInOrder = [];


export const DFS = (grid, startNode, finishNode) => {

    const nodes = getNodes(grid);
    let time = 0;
    for (let i = startNode.id; i < nodes.length; i++) {
        const closestNode = nodes[i];
		if (closestNode.isWall) continue;
        if (!closestNode.isVisited) {
            time = DFSVisit(closestNode.id, time, grid);   
        }
	    visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) {
			return visitedNodesInOrder;
		}
    }
}

const DFSVisit = (sourceId, time, grid) => {

    time++;
    const nodes = getNodes(grid);
    const closestNode = nodes[sourceId];
    closestNode.discovered = time;
    closestNode.isVisited = true;
    
    const neighbors = getNeighbors(closestNode, grid);
    for (let i = 0; i < neighbors.length; i++) {
        const v = neighbors[i];
        if (!v.isVisited) {
            v.previousNode = closestNode;
            time = DFSVisit(v.id, time, grid);
        }
    }
    time++;
    closestNode.finished = time;
    return time;
}

const getNeighbors = (node, grid) => {

    const neighbors = [];
    const {col, row} = node;
	let width; //this value needs to be changed based on the width defined in visualizer.js
	screen.height > 1080 ? width = 92 : width = 72;
	const nodeArr = getNodes(grid);

	// check if up
	if (row > 0) {
		let index1 = ((row - 1) * width) + col;
		neighbors.push(nodeArr[index1]);
	}
	// check if down
	if (row < grid.length - 1) {
		let index2 = ((row + 1) * width) + col;
		neighbors.push(nodeArr[index2]);
	}
	// check if left
	if (col > 0) {
		let index3 = (row * width) + (col - 1);
		neighbors.push(nodeArr[index3]);
	}
	// check if right
	if (col < grid[0].length - 1) {
		let index4 = (row * width) + (col + 1);
		neighbors.push(nodeArr[index4]);
	}
    return neighbors;
}