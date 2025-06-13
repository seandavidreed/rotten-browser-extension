async function getLinks() {
	// Get all links from the active tab
	let links = document.links;

	// Declare array for external links
	let externalLinks = [];

	// Iterate through links and separate internal and external
	for (const link of links) {
		// Handle internal links
		if (link.href.includes(document.URL.split("/")[2])) {
			console.log("Same Origin");

			/* Determine whether link is good by 
			 * listening for response with status code 200 */
			let myReq = new Request(link.href);
			fetch(myReq).then((response) => {
				if (response.status != 200) {
					console.log(link.href);
					browser.runtime.sendMessage({
						type: "internal",
						content: link.innerText
					});
				}
			});
		}
		// Handle external links
		else {
			externalLinks.push(link.href);
		}
	}
	browser.runtime.sendMessage({
		type: "external",
		content: externalLinks
	});
}

getLinks();
