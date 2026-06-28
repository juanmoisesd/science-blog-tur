import { test, expect } from '@playwright/test';
import path from 'path';

test('Social Mobility Simulation Verification', async ({ page }) => {
    // Load the local HTML file
    const filePath = 'file://' + path.resolve('movilidad-social.html');
    await page.goto(filePath);

    // 1. Verify Title
    await expect(page).toHaveTitle(/Simulación de Movilidad Social/);

    // 2. Verify main elements are present
    await expect(page.locator('#simCanvas')).toBeVisible();
    await expect(page.locator('#controls')).toBeVisible();
    await expect(page.locator('#charts-container')).toBeVisible();

    // 3. Check statistics update (give it a moment to run)
    await page.waitForTimeout(2000);
    const popText = await page.locator('#stat-pop').textContent();
    expect(parseInt(popText)).toBeGreaterThan(0);

    // 4. Test Theme Toggle
    const body = page.locator('body');
    await expect(body).toHaveClass(/light-mode/);
    await page.click('#btn-theme');
    await expect(body).toHaveClass(/dark-mode/);

    // 5. Test Educational Modal
    await page.click('#btn-edu');
    await expect(page.locator('#modal-edu')).not.toHaveClass(/hidden/);
    await page.click('.close');
    await expect(page.locator('#modal-edu')).toHaveClass(/hidden/);

    // 6. Test Comparison Mode
    await page.click('#btn-compare');
    await expect(page.locator('#simCanvas')).toHaveClass(/hidden/);
    await expect(page.locator('#compare-container')).not.toHaveClass(/hidden/);

    // Take a screenshot for visual confirmation
    await page.screenshot({ path: 'simulation-screenshot.png', fullPage: true });
});
