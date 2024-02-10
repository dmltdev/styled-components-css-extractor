const puppeteer = require('puppeteer');
const fs = require('fs').promises;

//! Specify your URL
const URL = 'https://styled-components.com';
const fileName = formattedUrl(URL);

function formattedUrl(url) {
  let sanitizedUrl = url;
  if (sanitizedUrl.includes('https://')) {
    sanitizedUrl = sanitizedUrl.split('https://')[1];
  } else if (sanitizedUrl.includes('http://')) {
    sanitizedUrl = sanitizedUrl.split('http://')[1];
  }

  sanitizedUrl = sanitizedUrl.replace(/\./g, '_');
  sanitizedUrl = sanitizedUrl.replace(/\//g, '');

  return sanitizedUrl;
}

(async () => {
  let browser;

  try {
    browser = await puppeteer.launch({
      //! Specify the actual path to the browser executable file
      executablePath: './chrome/win64-121.0.6150.0/chrome-win64/chrome.exe',
      headless: false,
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(URL, { waitUntil: 'networkidle0' });

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
    await fs.writeFile(`./dist/${fileName}.css`, formattedCSS, 'utf-8');

    console.log('Successfully written CSS');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();
