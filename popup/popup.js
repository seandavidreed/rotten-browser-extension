document.addEventListener("click", (info) => {
	browser.tabs.executeScript({
		file: "/content_scripts/rotten.js",
	});
});

browser.runtime.onMessage.addListener((message) => {
	let report_div = document.getElementById("report");
	let type = document.createElement("h1");

	if (message.type === "report-internal") {
		type.innerText = "Internal";
	}
	else if (message.type === "report-external") {
		type.innerText = "External";
	}

	report_div.appendChild(type);
	
	for (let i = 0; i < message.content.length; i++) {
		let elem = document.createElement("a");
		elem.innerText = message.content[i].text;
		elem.href = message.content[i].href;
		elem.style.display = "block";
		report_div.appendChild(elem);
	}
});
