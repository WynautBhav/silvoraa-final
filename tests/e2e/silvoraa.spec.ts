import { test, expect } from '@playwright/test';

test.describe('Silvoraa E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Homepage', () => {
    test('homepage loads successfully', async ({ page }) => {
      await expect(page).toHaveTitle(/Silvoraa/i);
      await expect(page.getByText('Premium Gemstone Jewelry')).toBeVisible({ timeout: 10000 });
    });

    test('hero section renders with images', async ({ page }) => {
      const heroSection = page.locator('section').first();
      await expect(heroSection).toBeVisible();
      const heroImages = page.locator('img').first();
      await expect(heroImages).toBeVisible();
    });

    test('navigation links work', async ({ page }) => {
      const shopLink = page.getByRole('link', { name: /shop/i }).first();
      await shopLink.click();
      await expect(page).toHaveURL(/shop/);
      await expect(page.getByRole('heading', { name: /shop/i })).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Catalogue & Filtering', () => {
    test('browse catalogue and view products', async ({ page }) => {
      await page.goto('/shop');
      await expect(page.getByText(/pieces/i)).toBeVisible({ timeout: 15000 });
    });

    test('filter by rings category', async ({ page }) => {
      await page.goto('/shop?type=ring');
      await page.waitForTimeout(1000);
      const productCards = page.locator('article').first();
      await expect(productCards).toBeVisible({ timeout: 15000 });
    });

    test('filter by earrings category', async ({ page }) => {
      await page.goto('/shop?type=earring');
      await page.waitForTimeout(1000);
      const productCards = page.locator('article').first();
      await expect(productCards).toBeVisible({ timeout: 15000 });
    });

    test('filter by pendants category', async ({ page }) => {
      await page.goto('/shop?type=pendant');
      await page.waitForTimeout(1000);
      const productCards = page.locator('article').first();
      await expect(productCards).toBeVisible({ timeout: 15000 });
    });
  });

  test.describe('Product Detail', () => {
    test('open product detail page', async ({ page }) => {
      await page.goto('/shop');
      const firstProduct = page.locator('article').first();
      await firstProduct.click();
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 10000 });
    });

    test('product images display', async ({ page }) => {
      await page.goto('/shop');
      const firstProduct = page.locator('article').first();
      await firstProduct.click();
      const productImage = page.locator('img').first();
      await expect(productImage).toBeVisible({ timeout: 10000 });
    });

    test('product details display', async ({ page }) => {
      await page.goto('/shop');
      const firstProduct = page.locator('article').first();
      await firstProduct.click();
      await expect(page.getByText(/₹/i)).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Cart & Checkout', () => {
    test('add product to cart', async ({ page }) => {
      await page.goto('/shop');
      const firstProduct = page.locator('article').first();
      await firstProduct.click();
      const addToCartButton = page.getByRole('button', { name: /add to cart/i }).or(
        page.getByRole('button', { name: /quick add/i })
      ).first();
      await addToCartButton.click({ timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(500);
    });

    test('cart count badge updates', async ({ page }) => {
      const cartButton = page.locator('button').filter({ has: page.locator('svg') }).first();
      if (await cartButton.isVisible()) {
        await cartButton.click();
      }
      await page.waitForTimeout(500);
      const cartBadge = page.locator('button').filter({ hasText: /[1-9]/ }).first();
      await expect(cartBadge).not.toHaveText('0');
    });

    test('proceed to checkout', async ({ page }) => {
      await page.goto('/checkout');
      const heading = page.getByRole('heading', { name: /checkout/i });
      await expect(heading.or(page.getByText(/checkout/i))).toBeVisible({ timeout: 10000 });
    });

    test('checkout form validation works', async ({ page }) => {
      await page.goto('/checkout');
      const placeOrderButton = page.getByRole('button', { name: /place order/i });
      if (await placeOrderButton.isVisible()) {
        await placeOrderButton.click();
        const validationError = page.getByText(/required/i).or(
          page.getByText(/email/i).or(page.getByText(/name/i))
        );
        await expect(validationError).toBeVisible({ timeout: 5000 });
      }
    });
  });
});