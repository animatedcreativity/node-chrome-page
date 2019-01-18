# node-chrome-page
Simply fetch any web page using chrome browser after the page's JavaScript is loaded.

Example:

```
require("node-chrome-page", 10) // will cache this page for next 10 seconds, default is 0 and it means no cache.
  .page("https://google.com")
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