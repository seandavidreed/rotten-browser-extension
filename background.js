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
		for (let i = 0; i < message.internalLinks.length; i++) {
			// Prepare request for internal link: only requesting header
			let request = new Request(message.internalLinks[i].href, {
				method: "HEAD"
			});
			
			// Fetch the internal link
			fetch(request).then(function (response) {
				// Highlight the link in page if it doesn't return 200
				if (response.status != 200) {
					find(message.internalLinks[i].text);
				}
				
				// Store status in the link object
				message.internalLinks[i].status_code = response.status;
				
				// Send link object to the popup script
				browser.runtime.sendMessage({
					type: "internal",
					content: message.internalLinks[i]
				});
			});
		}
		
		// Send external links unmodified to popup script
		browser.runtime.sendMessage({
			type: "external",
			content: message.externalLinks
		});
	}
});
