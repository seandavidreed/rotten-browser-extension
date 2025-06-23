async function find(link) {
	/* Call find on a link and
	 * highlight it in webpage. */
	let result = await browser.find.find(link);
	browser.find.highlightResults();
}

/* Listen for message add accept if it is addressed
 * to this background script. */
browser.runtime.onMessage.addListener(function (message) {
	/* Receive message with internalLinks and externalLinks
	 * from the content script */
	if (message.type === "to-background") {
		// Handle internal links
		for (let link of message.internalLinks) {
			// Prepare request for internal link: only requesting header
			let request = new Request(link.href, {
				method: "HEAD"
			});
			
			// Fetch the internal link
			fetch(request).then(function (response) {
				// Highlight the link in page if it doesn't return 200
				if (response.status != 200) {
					find(link.text);
				}
				
				// Store status in the link object
				link.statusCode = response.status;
				
				// Send link object to the panel script
				browser.runtime.sendMessage({
					type: "internal",
					content: link
				});
			});
		}
		// Handle external links
		for (let link of message.externalLinks) {
			// Prepare request for internal link: only requesting header
			let request = new Request(link.href, {
				method: "HEAD"
			});
			
			// Fetch the internal link
			fetch(request).then(function (response) {
				// Highlight the link in page if it doesn't return 200
				if (response.status != 200) {
					find(link.text);
				}
				
				// Store status in the link object
				link.statusCode = response.status;
				
				// Send link object to the panel script
				browser.runtime.sendMessage({
					type: "external",
					content: link
				});
			});
		}
		
	}
});
