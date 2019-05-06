# node-chrome-page
Simply fetch any web page using Chrome browser after the page's JavaScript is loaded. Now using Puppeteer with stealth mode.

--------------------------------------------

**Usage:**

```
var chromePage = require("node-chrome-page");
var chrome = new chromePage();
chrome.page(link, cacheTime, cacheFile);
```

- link: Page to fetch
- cacheTime: Time to cache the page in seconds. (OPTIONAL)
- cacheFile: File to use for cache. (OPTIONAL)

**Example (latest):**

```
var chromePage = require("node-chrome-page");
var chrome = new chromePage();
chrome
  .page("https://google.com", 10, "node-chrome-page.json")
  .then(function(html) {
    console.log(html);
  })
  .catch(function(error) {
    console.log(error);
  });
```

**Example (till v0.0.8):**

```
require("node-chrome-page")
  .page("https://google.com", 10)
  .then(function(html) {
    console.log(html);
  })
  .catch(function(error) {
    console.log(error);
  });
```

------------------------------------------------

**Version history:**

**v0.0.6:**<br/>
Added cache support.

**v0.0.9:**<br/>
Fixed a serious cache bug.

**v0.1.1:**<br/>
Added cache file name support.

**v0.1.4:**<br/>
Added large cache support using `node-big-cache`: https://www.npmjs.com/package/node-big-cache