import {dijkstra, getNodesInShortestPathOrder} from './dijkstra.js';
//when changing height/width, multiply new number by size of node and put that for the height/width in the css of container div
const height = 20;
const width = 45;
const nodes = [];

const createGrid = () => {
    for (let row = 1; row <= height; row++) {
        const currentRow = [];
        for (let col = 1; col <= width; col++) {
            let node = document.createElement('div');
            node.className = "node";
            node.id = 'node' + '-'+ [row].toString() + '-' + [col].toString();
            node.draggable = true;
            //add wall class to the nodes that are dragged over with left click
            node.addEventListener("dragover", () => { 
                if (node.id != "node-10-7" && node.id != "node-10-38") {
                    node.classList.add("wall");
                }
            });
            document.getElementById("container").appendChild(node);
            currentRow.push(node);
        }
        nodes.push(currentRow);   
    }
}

const clearGrid = () => {
    document.getElementById("container").replaceChildren();
}

//attatching method for refreshing grid to the event listener
document.getElementById("refresh").addEventListener("click", () => {
    clearGrid();
    createGrid();
    console.log("grid refreshed");
});

const printNodes = (arr) => {
    for (i = 0; i < arr.length; i++) {
        console.log(arr[i]);
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
          'node node-visited';//need some work here
      }, 10 * i);
    }
}

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';//need some work here too
      }, 50 * i);
    }
}

    //need to completely refactor
  const visualizeDijkstra = () => {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
}



window.onload = createGrid;