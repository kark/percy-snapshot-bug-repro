const percySnapshot = require("@percy/puppeteer");
const { getDocument, queries } = require("pptr-testing-library");
/* 
// uncomment to run in non-headless mode

const puppeteer = require("puppeteer");
let browser;
let page;

jest.setTimeout(20000);

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 100, // Launching the browser in slow motion is necessary due to race conditions. Otherwise browser closes prematurely and tests fail.
  });
  page = await browser.newPage();
  await page.goto(URL);
});
afterEach(async () => {
  await browser.close();
}); */

describe("Interactive", () => {
  it("applies changes to global and local theme provider", async () => {
    const doc = await getDocument(page);
    await expect(page).toMatch("Hello");
    await percySnapshot(page, "before theme change");
    // change theme
    const themeChangeButton = await queries.getByText(doc, "change theme");

    await themeChangeButton.click();
    await page.waitForSelector('[data-theme="dark"]');
    await page.screenshot({ path: "puppeteer-screenshot.png" });
    await percySnapshot(page, "after theme change");
  });
});
