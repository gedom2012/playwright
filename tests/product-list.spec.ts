import { expect, test } from '@playwright/test';
import { PageManager } from '../page-objects/page-manager';

test.describe('Product Listing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/v1/inventory.html');
  });

  test('should display the first six available products alphabetically', async ({ page }) => {
    const pm = new PageManager(page);

    const productItems = await pm.onProductListPage().getItemsList();

    expect.soft(productItems).toHaveLength(6);
    expect.soft(productItems[0].name).toEqual('Sauce Labs Backpack');
  });

  test('should sort products in descending alphabetical order', async ({ page }) => {
    const pm = new PageManager(page);

    await pm.onProductListPage().sortProductListBy('Name (Z to A)');
    const productItems = await pm.onProductListPage().getItemsList();

    expect(productItems[0].name).toEqual('Test.allTheThings() T-Shirt (Red)');
  });

  test('should sort products by price ascending', async ({ page }) => {
    const pm = new PageManager(page);

    await pm.onProductListPage().sortProductListBy('Price (low to high)');
    const productItems = await pm.onProductListPage().getItemsList();

    expect(productItems[0].price).toEqual('$7.99');
  });

  test('should sort products by price descending', async ({ page }) => {
    const pm = new PageManager(page);

    await pm.onProductListPage().sortProductListBy('Price (high to low)');
    const productItems = await pm.onProductListPage().getItemsList();

    expect(productItems[0].price).toEqual('$49.99');
  });

  test('should navigate to the product detail page', async ({ page }) => {
    const pm = new PageManager(page);
    const product = {
      name: 'Sauce Labs Fleece Jacket',
      description:
        "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
      price: '$49.99',
    };

    await pm.onProductListPage().selectOnProductByNameAndNavigateToItsDetail(product.name);

    const expectedProduct = await pm.onProductDetailPage().getProductDetail();
    expect(expectedProduct).toStrictEqual(product);
  });

  test('should add a product to the cart', async ({ page }) => {
    const pm = new PageManager(page);
    const name = 'Sauce Labs Fleece Jacket';

    await pm.onProductListPage().selectOnProductByNameAndClickOnAddToCartButton(name);
    const shoppingCartItems = await pm.onProductListPage().checkTotalOProductsInShoppingCart();

    expect(shoppingCartItems).toEqual('1');
  });

  test('should remove a product from the cart', async ({ page }) => {
    const pm = new PageManager(page);
    const name = 'Sauce Labs Fleece Jacket';

    await pm.onProductListPage().selectOnProductByNameAndClickOnAddToCartButton(name);
    await pm.onProductListPage().clickOnRemoveButton();

    const shoppingCartItems = await pm.onShoppingCartPage().shoppingCartShouldBeEmpty();
    await expect(shoppingCartItems).toBeHidden();
  });
});
