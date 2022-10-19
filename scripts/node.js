export const START_NODE_ROW = 9;
export const START_NODE_COL = 7;
export const FINISH_NODE_ROW = 9;
export const FINISH_NODE_COL = 37;

//function to create node object
export const createNode = (col, row) => {
	return {
	  	col,
	  	row,
	  	isStart: row === START_NODE_ROW && col === START_NODE_COL,
	  	isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
	  	distance: Infinity,
	  	isVisited: false,
	  	isWall: false,
	  	previousNode: null,
	};
};