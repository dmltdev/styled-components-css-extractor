const puppeteer = require('puppeteer');
const fs = require('fs').promises;

//! Specify your URL and run this code
const URL = 'https://styled-components.com';

(async () => {
  let browser;

  try {
    browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto(URL);
    await page.setViewport({ width: 1920, height: 1080 });

    const getCSSRules = async stylesheet => {
      const rules = await page.$eval(`style[data-styled]`, link => {
        const styleSheet = link.sheet;
        return Array.from(styleSheet.cssRules).map(rule => rule.cssText);
      });

      return rules;
    };

    const styles = await page.$$eval('link[rel="stylesheet"]', links => {
      return links.map(link => ({
        styleSheetId: link.getAttribute('data-style-sheet-id'),
        href: link.href,
      }));
    });

    const allCSS = [];
    for (const style of styles) {
      const rules = await getCSSRules(style);
      allCSS.push(...rules);
    }

    const formattedCSS = allCSS.join('\n');
    await fs.writeFile('styles.css', formattedCSS, 'utf-8');

    console.log('Successfully written CSS');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();
