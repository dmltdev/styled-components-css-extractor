# styled-components Injected CSS Extractor

Extract styled-components's injected CSS and write it into the CSS file!

---

## Problem Statement

The [styled-components](https://styled-components.com) library uses the "Speedy mode" to inject styles on production build. That is because styled-components directly inject CSS into CSS Object Model for a lightningly fast CSS rendering.

This makes the styles bypass the DOM and be injected directly inside the CSSOM, thus, appearing in the inspector, but totally invisible on the DOM. Like this: `<style data-styled="" data-styled-version="4.4.0"></style`

Person having a development version of the website can disable the speedy mode by adding an environmental variable `SC_DISABLE_SPEEDY` (`REACT_APP_SC_DISABLE_SPEEDY` for React).

If the React project uses styled-components of a version 5.0+, the App component should be wrapped in StyleSheetManager with a prop disableCSSOMInjection. Example below:

```javascript
import { StyleSheetManager } from 'styled-components';

<StyleSheetManager disableCSSOMInjection>
  <App />
</StyleSheetManager>;
```

This simple CSS extractor solves the issue when you need to scrape a website that uses styled-components with CSSOM injection but the CSS rules are not scraped. It uses Puppeteer to launch a headless browser, retrieve the actual contents of the `<style>` element, format it and write it into the .css file. Please enjoy!

## Installation

- Clone the git repository
- Open the repository with your editor of choice
- Run `npm i` or `pnpm i`
- Open index.js
- Change URL to the necessary one.
- Run `node index.js`

## Usage

Feel free to use it for any purposes.

NB! If Puppeteer fails to launch the browser process, download it with [puppeteer@browsers](https://www.npmjs.com/package/@puppeteer/browsers) and change the `browser` const in the `try` block as in the example below (remember to update the path to the actual one):

```javascript
browser = await puppeteer.launch({
  executablePath: './chrome/win64-121.0.6146.0/chrome-win64/chrome.exe',
});
```

## Open source

Pull requests and improvements are welcome.
