# node-chrome-page
Simply fetch any web page using chrome browser after the page's JavaScript is loaded.

**Example (from v0.0.9 to latest):**

```
var chromePage = require("node-chrome-page");
var chrome = new chromePage();
chrome
  .page("https://google.com", 10)  // will cache this page for next 10 seconds, default is 0 and it means no cache.
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
  .page("https://google.com", 10)  // will cache this page for next 10 seconds, default is 0 and it means no cache.
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