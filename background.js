async function find(link) {
	/* Call find on a link and
	 * highlight it in webpage. */
	let result = await browser.find.find(link);
	browser.find.highlightResults();
}

browser.runtime.onMessage.addListener((message) => {
	if (message.type === "to-background") {
		console.log("internal");
		for (let i = 0; i < message.internalLinks.length; i++) {
			let myReq = new Request(message.internalLinks[i].href);
			fetch(myReq).then((response) => {
				message.internalLinks[i].status_code = response.status;
				console.log(message.internalLinks[i]);
				if (response.status != 200) {
					find(message.internalLinks[i].text);
				}
			});
		}
		
		browser.runtime.sendMessage({
			type: "report-internal",
			content: message.internalLinks
		});
	}
	
	console.log("external");
	for (let i = 0; i < message.externalLinks.length; i++) {
		console.log(message.externalLinks[i]);
	}
	
	browser.runtime.sendMessage({
		type: "report-external",
		content: message.externalLinks
	});

});
