//when changing height/width, multiply new number by size of node and put that for the height/width in the css of container div
const height = 20;
const width = 45;
const nodes = [];

const createGrid = () => {
    for (let row = 1; row <= height; row++) {
        const currentRow = [];

        for (let col = 1; col <= width; col++) {

            let node = document.createElement('div');
            node.id = "node";
            node.className = 'node' + '_'+ [row].toString() + '_' + [col].toString();
            //classnames are: node_1_1 (node_row_col)
            node.draggable = true;
            node.addEventListener("dragover", () => { 

                if (node.className != "node_10_7" && node.className != "node_10_38") {

                    node.style.background = "black" ;
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

const refreshGrid = () => {
    clearGrid();
    createGrid();
    console.log("grid refreshed");
}

const printNodes = (arr) => {
    for (i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
}

window.onload = createGrid;