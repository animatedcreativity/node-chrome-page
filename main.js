exports.page = function(link) {
  return new Promise(function(resolve, reject) {
    (async function() {
      var webdriver = require('selenium-webdriver');
      var chrome = require('selenium-webdriver/chrome');
      require('chromedriver');
      let options = new chrome.Options();
      options.setChromeBinaryPath(require("puppeteer")._launcher._projectRoot + "/.local-chromium/linux-" + require('puppeteer/package.json').puppeteer.chromium_revision + "/chrome-linux/chrome");
      options.addArguments('--headless');
      options.addArguments('--disable-gpu');
      options.addArguments('--no-sandbox');
      options.addArguments('--window-size=1280,960');
      const driver = await new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
      await driver.get(link);
      await driver.executeScript("return document.body.innerHTML")
        .then(function(html) {
          resolve(html);
        })
        .catch(function() {
          reject("Errors occured.");
        });
      await driver.quit();
    })();
  });
}