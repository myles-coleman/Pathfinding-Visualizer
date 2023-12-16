import { getNodes } from './dijkstra.js';
import { getUnvisitedNeighbors } from './dijkstra.js';

export const DFS = (grid, startNode, finishNode) => {
    const visitedNodesInOrder = [];
    const nodes = getNodes(grid);
    let time = 0;

    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.isVisited = false;
        node.previousNode = null;
    }
    DFSVisit(startNode, time, grid, visitedNodesInOrder, finishNode);
    const path = reconstructPath(finishNode);
    return path;
};

const DFSVisit = (node, time, grid, visitedNodesInOrder, finishNode) => {
    time++;
    const neighbors = getUnvisitedNeighbors(node, grid);

    node.discovered = time;
    node.isVisited = true;

    visitedNodesInOrder.push(node);

    if (node === finishNode) {
        return time;
    }

    for (let i = 0; i < neighbors.length; i++) {
        const neighbor = neighbors[i];
        if (!neighbor.isVisited) {
            // Assigning discovered node as previousNode
            neighbor.previousNode = node;
            time = DFSVisit(neighbor, time, grid, visitedNodesInOrder, finishNode);
        }
    }

    time++;
    node.finished = time;

    return time;
};

// Reconstruct the path in the correct order
const reconstructPath = (finishNode) => {
    const path = [];
    let currentNode = finishNode;

    while (currentNode !== null) {
        path.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }

    return path;
};