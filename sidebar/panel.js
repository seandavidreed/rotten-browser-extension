document.addEventListener("click", function () {
	if (this.activeElement.id === "get-links") {
		browser.tabs.executeScript({
			file: "/content_scripts/rotten.js",
		});

		// Clear any existing content
		let display = document.getElementById("display");
		display.innerHTML = "";
		display.style.border = "2px solid #FFF";

		if (!document.getElementById("clear")) {
			let clearButton = document.createElement("button");
			clearButton.id = "clear";
			clearButton.innerText = "Clear";
			let getLinksButton = document.getElementById("get-links");
			getLinksButton.insertAdjacentElement("afterend", clearButton);
		}
		
		let tableHeader0 = document.createElement("th");
		tableHeader0.innerText = "Type";

		let tableHeader1 = document.createElement("th");
		tableHeader1.innerText = "Text";

		let tableHeader2 = document.createElement("th");
		tableHeader2.innerText = "URL";

		let tableHeader3 = document.createElement("th");
		tableHeader3.innerText = "Status";

		let tableHeaderRow = document.createElement("tr");
		tableHeaderRow.appendChild(tableHeader0);
		tableHeaderRow.appendChild(tableHeader1);
		tableHeaderRow.appendChild(tableHeader2);
		tableHeaderRow.appendChild(tableHeader3);

		display.appendChild(tableHeaderRow);
	}
	else if (this.activeElement.id === "clear") {
		let display = document.getElementById("display");
		display.innerHTML = "";
		document.getElementById("clear").remove();
	}
});

browser.runtime.onMessage.addListener(function (message) {
	// Get element for displaying results from panel.html
	let display = document.getElementById("display");

	// Modify row formatting based on status code
	let background = "#FFF";
	let textColor = "000";
	if (message.content.statusCode != 200) {
		background = "#F00";
		textColor = "#FFF";
	}

	// Create type element
	let type = document.createElement("td");
	type.innerText = message.type;
	type.style.color = textColor;

	// Create text element
	let linkText = document.createElement("td");
	linkText.style.color = textColor;
	if (message.content.text.length != 0) {
		linkText.innerText = message.content.text;
	}
	else {
		linkText.innerText = "<No Text>";
	}

	// Create URL element
	let link = document.createElement("a");
	link.style.color = textColor;
	link.innerText = message.content.href;
	link.href = message.content.href;
	
	// Create td element for URL
	let linkCell = document.createElement("td");
	let linkDiv = document.createElement("div");
	linkDiv.classList.add("scrollable");
	linkCell.appendChild(link);
	linkDiv.appendChild(linkCell);

	// Create status code element
	let statusCode = document.createElement("td");
	statusCode.style.color = textColor;
	statusCode.innerText = message.content.statusCode;
	
	// Create table row
	let row = document.createElement("tr");
	row.style.background = background;
	row.appendChild(type);
	row.appendChild(linkText);
	row.appendChild(linkDiv);
	row.appendChild(statusCode);

	// Append line to the main display element
	display.appendChild(row);
});
