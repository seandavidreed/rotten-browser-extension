async function find(link) {
	let result = await browser.find.find(link);
	browser.find.highlightResults();
}

function receiveExternalLinks(links) {
	for (let i = 0; i < links.length; i++) {
		console.log(links[i]);
	}	
}

function receiveLink(link) {
	find(link);
}

browser.runtime.onMessage.addListener((message) => {
	if (message.type === "internal") {
		receiveLink(message.content);
	}
	else if (message.type === "external") {
		receiveExternalLinks(message.content);
	}
});
