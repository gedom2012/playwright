import { expect } from '@playwright/test';
import { test } from '../test-option';

test.describe('Product Detail', () => {
  test.beforeEach(async ({ page, inventoryURL }) => {
    await page.goto(inventoryURL);
  });

  test('should add product to the cart from detail page', async ({ pageManager }) => {
    const productName = 'Sauce Labs Fleece Jacket';

    await pageManager.onProductListPage().selectOnProductByNameAndNavigateToItsDetail(productName);
    await pageManager.onProductDetailPage().clickOnAddToCartButton();
    const shoppingCartItems = await pageManager
      .onProductDetailPage()
      .checkTotalOProductsInShoppingCart();

    expect(shoppingCartItems).toEqual('1');
  });

  test('should remove product from the cart from detail page', async ({ pageManager }) => {
    const productName = 'Sauce Labs Fleece Jacket';

    await pageManager.onProductListPage().selectOnProductByNameAndNavigateToItsDetail(productName);
    await pageManager.onProductDetailPage().clickOnAddToCartButton();
    await pageManager.onProductDetailPage().clickOnRemoveButton();

    expect(pageManager.onProductDetailPage().shoppingCartShouldBeEmpty()).toBeTruthy();
  });

  test('should navigate back to the product listing', async ({ page, pageManager }) => {
    const productName = 'Sauce Labs Fleece Jacket';

    await pageManager.onProductListPage().selectOnProductByNameAndNavigateToItsDetail(productName);
    await pageManager.onProductDetailPage().clickOnBackButton();

    await expect(page).toHaveURL('v1/inventory.html');
  });
});
