async function getLinks() {
	// Get all links from the active tab
	let links = document.links;

	// Declare array for each link category: internal and external
	let internalLinks = [];
	let externalLinks = [];

	// Iterate through links and separate internal and external
	for (const link of links) {
		/* Check if second-level domain matches the current page
		 * and add as an object to internalLinks */
		if (link.href.includes(document.URL.split("/")[2])) {
			console.log("Same Origin");
			internalLinks.push({
				href: link.href,
				text: link.innerText,
				statusCode: ""
			});

		}
		/* Add to externalLinks if second-level domain
		 * doesn't match */
		else {
			externalLinks.push({
				href: link.href,
				text: link.innerText,
				statusCode: ""
			});
		}
	}
	
	// Send the organized links to the background script
	browser.runtime.sendMessage({
		type: "to-background",
		internalLinks: internalLinks,
		externalLinks: externalLinks
	});
}

getLinks();
