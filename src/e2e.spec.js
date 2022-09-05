const percySnapshot = require("@percy/puppeteer");
import { getDocument, queries } from "pptr-testing-library";
import puppeteer from "puppeteer";
let browser;
let page;

jest.setTimeout(20000);

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: true,
    slowMo: 100, // Launching the browser in slow motion is necessary due to race conditions. Otherwise browser closes prematurely and tests fail.
  });
  page = await browser.newPage();
});
afterEach(async () => {
  await browser.close();
});

describe("Interactive", () => {
  beforeAll(async () => {
    await page.goto(URL);
  });
  it("applies changes to global and local theme provider", async () => {
    const doc = await getDocument(page);
    await percySnapshot(page, "before theme change");
    // change theme
    const themeChangeButton = await queries.getByText(doc, "change theme");

    await themeChangeButton.click();
    await page.waitForSelector('[data-theme="dark"]');
    await page.screenshot({ path: "puppeteer-screenshot.png" });
    await percySnapshot(page, "after theme change");
  });
});

/* describe("app", () => {
  beforeAll(async () => {
    await page.goto(URL);
  });

  it("App", async () => {
    await expect(page).toMatch("Hello");
    await percySnapshot(page, "App");
  });
}); */
