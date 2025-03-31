import { expect, test } from '@playwright/test';
import { PageManager } from '../page-objects/page-manager';

test.describe('Product Detail', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/v1/index.html');
    const pm = new PageManager(page);
    await pm
      .onLoginPage()
      .loginAsStandardUser(process.env.USERNAME as string, process.env.PASSWORD as string);
  });

  test('should add product to the cart from detail page', async ({ page }) => {
    const pm = new PageManager(page);
    const productName = 'Sauce Labs Fleece Jacket';

    await pm.onProductListPage().selectOnProductByNameAndNavigateToItsDetail(productName);
    await pm.onProductDetailPage().clickOnAddToCartButton();
    const shoppingCartItems = await pm.onProductDetailPage().checkTotalOProductsInShoppingCart();

    expect(shoppingCartItems).toEqual('1');
  });

  test('should remove product from the cart from detail page', async ({ page }) => {
    const pm = new PageManager(page);
    const productName = 'Sauce Labs Fleece Jacket';

    await pm.onProductListPage().selectOnProductByNameAndNavigateToItsDetail(productName);
    await pm.onProductDetailPage().clickOnAddToCartButton();
    await pm.onProductDetailPage().clickOnRemoveButton();

    expect(pm.onProductDetailPage().shoppingCartShouldBeEmpty()).toBeTruthy();
  });

  test('should navigate back to the product listing', async ({ page }) => {
    const pm = new PageManager(page);
    const productName = 'Sauce Labs Fleece Jacket';

    await pm.onProductListPage().selectOnProductByNameAndNavigateToItsDetail(productName);
    await pm.onProductDetailPage().clickOnBackButton();

    await expect(page).toHaveURL('v1/inventory.html');
  });
});
