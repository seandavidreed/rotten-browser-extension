async function getLinks() {
	// Get all links from the active tab
	let links = document.links;

	// Declare array for external links
	let externalLinks = [];
	let internalLinks = [];

	// Iterate through links and separate internal and external
	for (const link of links) {
		// Handle internal links
		if (link.href.includes(document.URL.split("/")[2])) {
			console.log("Same Origin");
			internalLinks.push({
				href: link.href,
				text: link.innerText,
				status_code: ""
			});

		}
		// Handle external links
		else {
			externalLinks.push({
				href: link.href,
				text: link.innerText
			});
		}
	}

	browser.runtime.sendMessage({
		type: "external",
		content: externalLinks
	});

	browser.runtime.sendMessage({
		type: "internal",
		content: internalLinks
	});
}

getLinks();
