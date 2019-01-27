module.exports = exports = function(config) {
  var sanitize = require("node-sanitize-options");
  var LZUTF8 = require("lzutf8");
  config = sanitize.options(config, {
    time: 0 // page cache time - not set for now
  });
  var app = {
    binaryPath: function() {
      var puppeteer = require("puppeteer");
      var browserFetcher = puppeteer.createBrowserFetcher();
      var revision = process.env.PUPPETEER_CHROMIUM_REVISION || process.env.npm_config_puppeteer_chromium_revision || process.env.npm_package_config_puppeteer_chromium_revision
        || require('puppeteer/package.json').puppeteer.chromium_revision;
      var revisionInfo = browserFetcher.revisionInfo(revision);
      return revisionInfo.executablePath;
    },
    page: function(link, time, file) {
      if (typeof file === "undefined") file = "node-chrome-page.json";
      var pageCache = require("node-file-cache").create({life: 3600, file: file}); //default cache time: 1 hour
      return new Promise(function(resolve, reject) {
        (async function() {
          if (typeof time === "undefined") time = 0; // no cache
          var html = pageCache.get(link);
          if (html != null && typeof html !== "undefined" && time > 0) {
            resolve(LZUTF8.decompress(html, {inputEncoding: "Base64"}));
          } else {
            var webdriver = require('selenium-webdriver');
            var chrome = require('selenium-webdriver/chrome');
            require('chromedriver');
            let options = new chrome.Options();
            options.setChromeBinaryPath(app.binaryPath());
            options.addArguments('--headless');
            options.addArguments('--disable-gpu');
            options.addArguments('--no-sandbox');
            options.addArguments('--window-size=1280,960');
            var driver = await new webdriver.Builder()
              .forBrowser('chrome')
              .setChromeOptions(options)
              .build();
            await driver.get(link);
            await driver.executeScript("return document.body.innerHTML")
              .then(function(html) {
                if (time > 0) pageCache.set(link, LZUTF8.compress(html, {outputEncoding: "Base64"}), {life: time});
                resolve(html);
              })
              .catch(function(error) {
                reject(error);
              });
            await driver.quit();
          }
        })();
      });
    }
  }
  return app;
};
/*var chrome = new exports();
chrome.page("https://google.com").then(function(html) {
  console.log(html);
});*/