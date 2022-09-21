//when changing height/width, multiply new number by size of node and put that for the height/width in the css of container div
const height = 20;
const width = 45;
const nodes = [];

const createGrid = () => {
    for (let row = 1; row <= height; row++) {
        const currentRow = [];
        for (let col = 1; col <= width; col++) {

            let node = document.createElement('div');
            let node_start = document.getElementById("node-10-7");
            let node_finish = document.getElementById("node-10-38");
            node.className = "node";
            node.id = 'node' + '-'+ [row].toString() + '-' + [col].toString();
            
            //add wall class to the nodes that are dragged over with left click
            node.draggable = true;
            node.addEventListener("dragover", () => { 
                if (node != node_start && node != node_finish) {
                    node.classList.add("wall");
                }
            });

            //appends nodes to the container div and also pushes nodes into an array for easy access
            document.getElementById("container").appendChild(node); 
            currentRow.push(node); 
        }
        nodes.push(currentRow);   
    }
}


const printNodes = (grid) => {
  for (let i = 0; i < grid.length; i++) {
      console.log(grid[i]);
  }
}

//takes a matrix of nodes and returns them in a single file array
const getNodes = (grid) => {
  const nodes = []
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      nodes.push(grid[i][j]);
    }
  }
  return nodes;
}

//attatching method for refreshing grid to the event listener
document.getElementById("refresh").addEventListener("click", () => {
    document.getElementById("container").replaceChildren();
    createGrid();
    console.log("grid refreshed");
});

document.getElementById("print").addEventListener("click", () => {
  printNodes(nodes);
});

window.onload = createGrid;