# styled-components Injected CSS Extractor

Extract styled-components's injected CSS and write it into the CSS file!

---

## Problem Statement

The [styled-components](https://styled-components.com) library uses the "Speedy mode" to inject styles on the production build for a lightningly fast CSS rendering.

This makes the styles "bypass the DOM" and be injected directly inside the CSSOM, thus, appearing in the inspector, but totally invisible on the DOM. Like this: `<style data-styled="" data-styled-version="4.4.0"></style`

The website developer can disable the speedy mode by adding the environment variable `SC_DISABLE_SPEEDY=true` (`REACT_APP_SC_DISABLE_SPEEDY=true` for React).

If the React project uses styled-components of a version 5.0+, the App component should be wrapped in `StyleSheetManager` with a prop `disableCSSOMInjection`:

```javascript
import { StyleSheetManager } from 'styled-components';

<StyleSheetManager disableCSSOMInjection>
  <App />
</StyleSheetManager>;
```

However, if you need to scrape such a web page as non-owner, you cannot utilize methods above.

This simple CSS extractor solves the issue when you need to scrape a website that uses styled-components with CSSOM injection but the CSS rules are not scraped.

It uses Puppeteer to launch a headless browser, retrieve the actual contents of the `<style>` element, format it and write it into the .css file. Please enjoy!

## Installation

- Clone the git repository
- Open the repository with your editor of choice
- Run `npm i` or `pnpm i`
- Run `npx @puppeteer/browsers install chrome@latest` to download the latest version of Chrome that will be used by Puppeteer
- Specify the correct path to the chrome.exe file in the 'try' block as in the example below (pay attention to the browser version):

```javascript
browser = await puppeteer.launch({
  executablePath: './chrome/win64-121.0.6146.0/chrome-win64/chrome.exe',
});
```

## Manual Actions with the Login

- Change puppeteer.launch to puppeteer.connect, add an option "browserURL" set to [localhost:9922]("http://localhost:9922")
- Open cmd (in IDE/text editor), go to the directory with chrome.exe and run `chrome.exe --remote-debugging-port=992`

## Usage

- Open index.js
- Change URL to the necessary one.
- Run `node index.js`

Feel free to use this utility for any purposes.

## Open source

Pull requests and improvements are welcome.
