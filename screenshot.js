const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const assetsDir = path.join(__dirname, 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir);
  }

  console.log("Launching browser...");
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1080 },
    locale: 'en-US',
  });
  
  const page = await context.newPage();
  
  console.log("Navigating to demo page...");
  await page.goto('http://localhost:3000/', { waitUntil: 'load' });
  await page.waitForTimeout(5000); // Wait 5s for chat components and chatkit to initialize
  await page.screenshot({ path: 'assets/demo.png', fullPage: true });
  console.log("Saved assets/demo.png");

  console.log("Navigating to code page...");
  await page.goto('http://localhost:3000/code', { waitUntil: 'load' });
  await page.waitForTimeout(5000); // Wait 5s for syntax highlighting and animations
  await page.screenshot({ path: 'assets/code.png', fullPage: true });
  console.log("Saved assets/code.png");

  await browser.close();
})();
