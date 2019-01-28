module.exports = exports = function() {
  var bigCache = require("node-big-cache");
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
      if (typeof file === "undefined" || !file) file = "node-chrome-page.json";
      var pageCache = new bigCache({
        folder: file.split(".")[0] + "-cache",
        jsonFile: file
        /* cacheTime: using default 1 hour */
      });
      return new Promise(function(resolve, reject) {
        (async function() {
          if (typeof time === "undefined") time = 0; // no cache
          var html = pageCache.get(link);
          if (html != null && typeof html !== "undefined" && time > 0) {
            resolve(html);
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
                if (time > 0) pageCache.set(link, html, time * 1000);
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