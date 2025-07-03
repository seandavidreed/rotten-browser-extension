document.addEventListener("click", function () {
	if (this.activeElement.id === "get-links") {
		browser.tabs.executeScript({
			file: "/content_scripts/rotten.js",
		});

		// Clear any existing table content
		let display = document.getElementById("display");
		display.innerHTML = "";
		display.style.border = "2px solid #FFF";
		
		// Set visibility for clear button and clipart
		document.getElementById("clipart").hidden = true;
		document.getElementById("clear").hidden = false;
	
		// Create table headers
		let tableHeader0 = document.createElement("th");
		tableHeader0.innerText = "Type";

		let tableHeader1 = document.createElement("th");
		tableHeader1.innerText = "Text";

		let tableHeader2 = document.createElement("th");
		tableHeader2.innerText = "URL";

		let tableHeader3 = document.createElement("th");
		tableHeader3.innerText = "Status";

		// Create table row and add to it table headers
		let tableHeaderRow = document.createElement("tr");
		tableHeaderRow.appendChild(tableHeader0);
		tableHeaderRow.appendChild(tableHeader1);
		tableHeaderRow.appendChild(tableHeader2);
		tableHeaderRow.appendChild(tableHeader3);

		display.appendChild(tableHeaderRow);
	}
	else if (this.activeElement.id === "clear") {
		// Clear any existing table content
		document.getElementById("display").innerHTML = "";

		// Set visibility for clear button and clipart
		document.getElementById("clipart").hidden = false;
		document.getElementById("clear").hidden = true;
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
	type.innerText = (message.type === "internal") ? "IN" : "EX";
	type.style.color = textColor;

	// Create text element
	let linkText = document.createElement("td");
	let linkTextDiv = document.createElement("div");
	linkTextDiv.style.color = textColor;
	linkTextDiv.classList.add("scrollable");
	if (message.content.text.length != 0) {
		linkTextDiv.innerText = message.content.text.trim();
	}
	else {
		linkTextDiv.innerText = "<No Text>";
	}
	linkText.appendChild(linkTextDiv);

	// Create URL element
	let link = document.createElement("a");
	link.style.color = textColor;
	link.innerText = message.content.href.trim();
	link.href = message.content.href;
	
	// Create td element for URL
	let linkCell = document.createElement("td");
	let linkDiv = document.createElement("div");
	linkDiv.classList.add("scrollable");
	linkDiv.appendChild(link);
	linkCell.appendChild(linkDiv);

	// Create status code element
	let statusCodeLink = document.createElement("a");
	statusCodeLink.style.color = textColor;
	statusCodeLink.innerText = message.content.statusCode;
	statusCodeLink.href = "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/" + message.content.statusCode;

	// Create td element for Status Code URL
	let statusCode = document.createElement("td");
	statusCode.appendChild(statusCodeLink);

	// Create table row
	let row = document.createElement("tr");
	row.style.background = background;
	row.appendChild(type);
	row.appendChild(linkText);
	row.appendChild(linkCell);
	row.appendChild(statusCode);

	// Append line to the main display element
	display.appendChild(row);
});
