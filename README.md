# node-chrome-page
Simply fetch any web page using chrome browser after the page's JavaScript is loaded.

Example:

require("node-chrome-page")<br/>
&nbsp;&nbsp;&nbsp;&nbsp;.page("https://google.com")<br/>
&nbsp;&nbsp;&nbsp;&nbsp;.then(function(html) {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(html);<br/>
&nbsp;&nbsp;&nbsp;&nbsp;})<br/>
&nbsp;&nbsp;&nbsp;&nbsp;.catch(function(error) {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(error);<br/>
&nbsp;&nbsp;&nbsp;&nbsp;});