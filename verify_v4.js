
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('file:///home/jules/sociologia.html');

  // Wait for simulation to run a bit
  await page.waitForTimeout(5000);

  // Take screenshot of the simulation
  await page.screenshot({ path: 'verification/sociologia_v4_simulation.png' });

  // Scroll to see the article
  await page.evaluate(() => window.scrollTo(0, 2000));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'verification/sociologia_v4_article.png' });

  await browser.close();
})();
