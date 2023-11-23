export const startTutorial = () => {

    //this prevents the creation of multiple tutorial divs
    let remove = document.getElementById("tutorial");
    if (document.body.contains(remove)) {
        document.body.removeChild(remove);
    }    
	//define number of pages
	let pages = [3];
	let page1 = document.createElement("div");
	let title = document.createElement("h1");
	let text = document.createElement("p");
	let page2 = document.createElement("div");
	let title2 = document.createElement("h1");
	let text2 = document.createElement("p");
	let text3 = document.createElement("p");
	let page3 = document.createElement("div");
	let title3 = document.createElement("h1");
	let text4 = document.createElement("p");
	const image = "<img id='tutorial-img' src='../images/dijkstras.png' alt='dijkstras' >";
	const image2 = "<img id='tutorial-img2' src='../images/github.png' alt='github link' >";
	let backBtn = document.createElement("button");
	let nextBtn = document.createElement("button");
	let skipBtn = document.createElement("button");
	let finishBtn = document.createElement("button");
    let nodeText1 = document.createElement("p");
    let nodeText2 = document.createElement("p");
	const StartNode = "<div id='tutorial-node' class='node-start'>";
	const finishNode = "<div id='tutorial-node' class='node-finish'>";
    let nodeContainer1 = document.createElement("div");
    let nodeContainer2 = document.createElement("div");
    let nodeMainContainer = document.createElement("div");

	page1.setAttribute('id',"tutorial");
	title.setAttribute('id', "tutorial-title");
	text.setAttribute('id', "tutorial-text");

	page2.setAttribute('id',"tutorial");
	title2.setAttribute('id', "tutorial-title");
	text2.setAttribute('id', "tutorial-text");
	text3.setAttribute('id', "tutorial-text");
    nodeText1.setAttribute('id', "tutorial-text-node");
    nodeText2.setAttribute('id', "tutorial-text-node");
    nodeContainer1.setAttribute('id', "node-container");
    nodeContainer2.setAttribute('id', "node-container");
    nodeMainContainer.setAttribute('id', "node-main-container");

	page3.setAttribute('id',"tutorial");
	title3.setAttribute('id', "tutorial-title");
	text4.setAttribute('id', "tutorial-text");

	backBtn.setAttribute('id', "tutorial-btn-back");
	nextBtn.setAttribute('id', "tutorial-btn-next");
	skipBtn.setAttribute('id', "tutorial-btn-back");
	finishBtn.setAttribute('id', "tutorial-btn-next");
	backBtn.setAttribute('type', "button");
	nextBtn.setAttribute('type', "button");
	skipBtn.setAttribute('type', "button");
	finishBtn.setAttribute('type', "button");
	nextBtn.innerHTML += "Next";
	backBtn.innerHTML += "Back";
	skipBtn.innerHTML += "Skip";
	finishBtn.innerHTML += "Finish";

	title.innerHTML += "Pathfinding Visualizer Tutorial";
	text.innerHTML += "This webapp uses Dijkstra's algorithm, a pathfinding algorithm, to calculate the shortest path between two nodes.";
	
	title2.innerHTML += "Understanding Walls and Nodes";
	text2.innerHTML += "By default, holding down left click over the grid draws walls. Clicking the 'Erase Walls' button changes the functionality of holding down left click over the grid to then erase the walls. In order to go back to drawing walls, you will need to click the 'Draw Walls' button."
	text3.innerHTML += "You can move both the Start Node and the Finish Node anywhere on the grid by dragging them.";
    nodeText1.innerHTML += "Start Node: ";
    nodeText2.innerHTML += "Finish Node: ";

	title3.innerHTML += "End of Tutorial";
	text4.innerHTML += "Check out my github if you're interested in the source code for this project. There is a link in the bottom left corner of the navigation bar.";

    pages[0] = page1;
	pages[1] = page2;
	pages[2] = page3;

	//adding listeners to all the buttons
	nextBtn.addEventListener("click", () => {
		let curPage;
		for (let i = 0; i < pages.length; i++) {
			if (nextBtn.parentElement === pages[i]) {
				curPage = pages[i];
				document.body.replaceChild(pages[i + 1], curPage);
			}
		}
	})
	backBtn.addEventListener("click", () => {
		let curPage;
		for (let i = 0; i < pages.length; i++) {
			if (backBtn.parentElement === pages[i]) {
				curPage = pages[i];
				document.body.replaceChild(pages[i - 1], curPage);
			}
		}
	})
	skipBtn.addEventListener("click", () => {
		//removes first page
		document.body.removeChild(page1);
	})
	finishBtn.addEventListener("click", () => {
		//removes last page
		document.body.removeChild(pages[pages.length-1]);
	})	

	page1.appendChild(title);
	page1.appendChild(text);
	page1.innerHTML += image;

	page2.appendChild(title2);
	page2.appendChild(text2);
	page2.appendChild(text3);
    nodeContainer1.appendChild(nodeText1);
    nodeContainer1.innerHTML += StartNode;
    nodeContainer2.appendChild(nodeText2);
    nodeContainer2.innerHTML += finishNode;
    nodeMainContainer.appendChild(nodeContainer1);
    nodeMainContainer.appendChild(nodeContainer2);
    page2.appendChild(nodeMainContainer);

	page3.appendChild(title3);
	page3.appendChild(text4);
    page3.innerHTML += image2;

	//for adding buttons to the right pages
	for (let i = 0; i <pages.length; i++) {
		if (pages[i] === pages[0]) { // for the first page
			pages[i].appendChild(skipBtn);
			pages[i].appendChild(nextBtn);
		} else if (pages[i] === pages[pages.length-1]) { // for the last page
			pages[i].appendChild(backBtn);
			pages[i].appendChild(finishBtn);
		} else { // for all other pages
			let next = nextBtn.cloneNode(true);
			let back = backBtn.cloneNode(true);
			next.addEventListener("click", () => {
				let curPage;
				for (let i = 0; i < pages.length; i++) {
					if (next.parentElement === pages[i]) {
						curPage = pages[i];
						document.body.replaceChild(pages[i + 1], curPage);
					}
				}
			})
			back.addEventListener("click", () => {
				let curPage;
				for (let i = 0; i < pages.length; i++) {
					if (back.parentElement === pages[i]) {
						curPage = pages[i];
						document.body.replaceChild(pages[i - 1], curPage);
					}
				}
			})
			pages[i].appendChild(back);
			pages[i].appendChild(next);
		}
	}
	document.body.appendChild(page1);
}