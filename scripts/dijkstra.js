// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function dijkstra(grid, startNode, finishNode) {

  }

  //create function that returns distance of nodes from starting node

  function getNodeDistance(node) {

    //need to implement css parser so i can grab node location from style

  }
  
  function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort();
  }
  
  function updateUnvisitedNeighbors(node, grid) {

  }
  
  function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    
  }


  //function that returns array of nodes
  function getAllNodes(grid) {

  }
  
  // Backtracks from the finishNode to find the shortest path.
  // Only works when called *after* the dijkstra method above.
  export function getNodesInShortestPathOrder(finishNode) {

  }