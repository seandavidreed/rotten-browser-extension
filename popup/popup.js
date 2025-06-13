document.addEventListener("click", (info) => {
	browser.tabs.executeScript({
		file: "/content_scripts/rotten.js",
	});
});
