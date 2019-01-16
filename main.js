exports.binaryPath = function() {
  var puppeteer = require("puppeteer");
  var browserFetcher = puppeteer.createBrowserFetcher();
  var revision = process.env.PUPPETEER_CHROMIUM_REVISION || process.env.npm_config_puppeteer_chromium_revision || process.env.npm_package_config_puppeteer_chromium_revision
    || require('puppeteer/package.json').puppeteer.chromium_revision;
  var revisionInfo = browserFetcher.revisionInfo(revision);
  return revisionInfo.executablePath;
}
exports.page = function(link) {
  return new Promise(function(resolve, reject) {
    (async function() {
      var webdriver = require('selenium-webdriver');
      var chrome = require('selenium-webdriver/chrome');
      require('chromedriver');
      let options = new chrome.Options();
      options.setChromeBinaryPath(exports.binaryPath());
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
          resolve(html);
        })
        .catch(function(error) {
          reject(error);
        });
      await driver.quit();
    })();
  });
}