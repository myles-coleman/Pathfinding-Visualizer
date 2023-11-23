import { getNodes } from './dijkstra.js';
import { getUnvisitedNeighbors } from './dijkstra.js';

export const DFS = (grid, startNode, finishNode) => {
    const visitedNodesInOrder = [];
    const nodes = getNodes(grid);
    let time = 0;
    for (let i = startNode.id; i < nodes.length; i++) {
        const node = nodes[i];
        node.isVisited = false;
        node.previousNode = null;    
    }
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
    const neighbors = getUnvisitedNeighbors(closestNode, grid);
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