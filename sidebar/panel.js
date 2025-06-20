document.addEventListener("click", function () {
	if (this.activeElement.id === "get-links") {
		browser.tabs.executeScript({
			file: "/content_scripts/rotten.js",
		});

		// Clear any existing content
		let display = document.getElementById("display");
		display.innerHTML = "";
		display.style.border = "2px solid #FFF";
		
		let tableHeader1 = document.createElement("th");
		tableHeader1.innerText = "Link";

		let tableHeader2 = document.createElement("th");
		tableHeader2.innerText = "Status";

		let tableHeaderRow = document.createElement("tr");
		tableHeaderRow.appendChild(tableHeader1);
		tableHeaderRow.appendChild(tableHeader2);

		display.appendChild(tableHeaderRow);
	}
});

browser.runtime.onMessage.addListener((message) => {
	// Get element for displaying results from panel.html
	let display = document.getElementById("display");

	// Handle internal link
	if (message.type === "internal") {
		// Create link
		let link = document.createElement("a");
		link.innerText = message.content.text;
		link.href = message.content.href;
		
		// Create table cell for link
		let linkCell = document.createElement("td");
		linkCell.classList.add("browser-style");
		linkCell.appendChild(link);
		if (message.content.statusCode != 200) {
			linkCell.style.border = "2px solid #F00";
		}

		// Create status code element
		let statusCode = document.createElement("td");
		statusCode.classList.add("browser-style");
		statusCode.innerText = message.content.statusCode;
		if (message.content.statusCode != 200) {
			statusCode.style.border = "2px solid #F00";
		}
		
		// Create table row
		let row = document.createElement("tr");
		row.appendChild(linkCell);
		row.appendChild(statusCode);

		// Append line to the main display element
		display.appendChild(row);
	}
	else if (message.type === "external") {
		// Create link
		let link = document.createElement("a");
		link.innerText = message.content.text;
		link.href = message.content.href;
		link.style.display = "block";
		display.appendChild(link);
	}

});
