# Description
Rotten is a simple Firefox extension that roots out link rot. It collects all the links in an active webpage, displays them in a sidebar, and highlights any links that do not return a status code of 200. For an example use case, you're working on your website and want to make sure that all the links in your latest published blog post are still working properly. The extension will report the status codes for all the links and highlight red any links that return a status code of 404, for example.

# Basic Usage
This browser extension can be used as normal by navigating to [Rotten Mozilla Add-On Page](https://addons.mozilla.org/en-US/firefox/addon/rotten/) and installing it in the Firefox browser from there.

# Test Usage
Clone the repository  
`git clone https://github.com/seandavidreed/rotten-browser-extension.git`

Open a Firefox browser and navigate to [](about:debugging).

Select the **This Firefox** tab on the left side and click **Load Temporary Add-on**. Navigate to **rotten-browser-extension/** and select any file, typically **manifest.json** to load the whole extension as a temporary add-on.
