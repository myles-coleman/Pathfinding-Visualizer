export let START_NODE_ROW;
export let START_NODE_COL;
export let FINISH_NODE_ROW;
export let FINISH_NODE_COL;

screen.height > 1080 ? START_NODE_ROW = 23 : START_NODE_ROW = 15;
screen.height > 1080 ? START_NODE_COL = 9 : START_NODE_COL = 15;
screen.height > 1080 ? FINISH_NODE_ROW = 23 : FINISH_NODE_ROW = 15;
screen.height > 1080 ? FINISH_NODE_COL = 82 : FINISH_NODE_COL = 56;

//creates node object
export const createNode = (col, row) => {
	return {
		id: 0,
	  	col,
	  	row,
	  	isStart: row === START_NODE_ROW && col === START_NODE_COL,
	  	isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
		discovered: -1,
		finished: -1,
	  	distance: Infinity,
	  	isVisited: false,
	  	isWall: false,
	  	previousNode: null,
	};
};