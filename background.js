async function find(link) {
	let result = await browser.find.find(link);
	browser.find.highlightResults();
}

function receiveLink(link) {
	find(link);
}

browser.runtime.onMessage.addListener(receiveLink);
