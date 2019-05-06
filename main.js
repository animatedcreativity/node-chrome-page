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
            try {
              var puppeteer = require("puppeteer-extra");
              var pluginStealth = require("puppeteer-extra-plugin-stealth");
              puppeteer.use(pluginStealth());
              puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
              }).then(async function(browser) {
                var page = await browser.newPage();
                await page.setViewport({width: 800, height: 600});
                await page.goto(link);
                await page.waitFor(5000);
                var html = await page.evaluate(() => document.body.innerHTML);
                await browser.close();
                if (time > 0) pageCache.set(link, html, time * 1000);
                resolve(html);
              });
            } catch(error) {
              reject(error);
            }
          }
        })();
      });
    }
  }
  return app;
};