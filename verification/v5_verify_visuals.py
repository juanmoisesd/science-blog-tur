import asyncio
from playwright.async_api import async_playwright
import os

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        # Get absolute path to the html file
        path = os.path.abspath("red-social-dinamica.html")
        await page.goto(f"file://{path}")

        # Wait for some animation to happen
        await page.wait_for_timeout(3000)

        # Take a screenshot to verify visuals
        await page.screenshot(path="verification/v5_visuals_check.png", full_page=True)

        # Check if multiple canvases exist
        canvases = await page.query_selector_all("canvas")
        print(f"Number of canvases: {len(canvases)}")

        await browser.close()

if __name__ == "__main__":
    if not os.path.exists("verification"):
        os.makedirs("verification")
    asyncio.run(verify())
