async function getLinks() {
	let links = document.links;
	for (const link of links) {
		if (link.href.includes(document.URL.split("/")[2])) {
			console.log("Same Origin");
			let myReq = new Request(link.href);
			fetch(myReq).then((response) => {
				if (response.status != 200) {
					console.log(link.href);
					browser.runtime.sendMessage(
						link.innerText
					);
				}
			});
		}
	}

}

getLinks();
