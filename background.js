async function find(link) {
	let result = await browser.find.find(link);
	browser.find.highlightResults();
}

browser.runtime.onMessage.addListener((message) => {
	if (message.type === "internal") {
		console.log("internal");
		for (let i = 0; i < message.content.length; i++) {
			let myReq = new Request(message.content[i].href);
			fetch(myReq).then((response) => {
				message.content[i].status_code = response.status;
				console.log(message.content[i]);
				if (response.status != 200) {
					find(message.content[i].text);
				}
			});
		}
	}
	else if (message.type === "external") {
		console.log("external");
		for (let i = 0; i < message.content.length; i++) {
			console.log(message.content[i]);
		}
	}
});
