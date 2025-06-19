document.addEventListener("click", (info) => {
	browser.tabs.executeScript({
		file: "/content_scripts/rotten.js",
	});
});

browser.runtime.onMessage.addListener((message) => {
	// Get element for displaying results from popup.html
	let display = document.getElementById("display");

	// Handle internal link
	if (message.type === "internal") {
		// Create link
		let link = document.createElement("a");
		link.innerText = message.content.text;
		link.href = message.content.href;
		
		// Create status code element
		let statusCode = document.createElement("span");
		statusCode.innerText = message.content.status_code;
		
		// Create div and append link and status code
		let line = document.createElement("div");
		line.appendChild(link);
		line.appendChild(statusCode);

		// Append line to the main display element
		display.appendChild(line);
	}
	else if (message.type === "external") {
		let linkType = document.createElement("h1");
		linkType.innerText = "External Links";
		display.appendChild(linkType);
		
		for (let i = 0; i < message.content.length; i++) {
			let elem = document.createElement("a");
			elem.innerText = message.content[i].text;
			elem.href = message.content[i].href;
			elem.style.display = "block";
			display.appendChild(elem);
		}
	}

});
