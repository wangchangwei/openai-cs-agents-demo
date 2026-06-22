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
  await page.waitForTimeout(5000); 
  
  // Switch to English
  console.log("Switching to English locale...");
  try { await page.click('text=EN', { timeout: 2000 }); } catch (e) {}
  await page.waitForTimeout(1000);

  await page.screenshot({ path: 'assets/demo.png', fullPage: true });
  console.log("Saved assets/demo.png");

  console.log("Navigating to code page...");
  await page.goto('http://localhost:3000/code', { waitUntil: 'load' });
  await page.waitForTimeout(5000); 
  
  // Switch to English
  console.log("Switching to English locale...");
  try { await page.click('text=EN', { timeout: 2000 }); } catch (e) {}
  await page.waitForTimeout(1000);

  await page.screenshot({ path: 'assets/code.png', fullPage: true });
  console.log("Saved assets/code.png");

  await browser.close();
})();
