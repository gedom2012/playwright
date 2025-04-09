import { expect } from '@playwright/test';
import { test } from '../test-option';

test.describe('Product Listing', () => {
  test.beforeEach(async ({ page, inventoryURL }) => {
    await page.goto(inventoryURL);
  });

  test('should display the first six available products alphabetically', async ({
    pageManager,
  }) => {
    const productItems = await pageManager.onProductListPage().getItemsList();

    expect.soft(productItems).toHaveLength(6);
    expect.soft(productItems[0].name).toEqual('Sauce Labs Backpack');
  });

  test('should sort products in descending alphabetical order', async ({ pageManager }) => {
    await pageManager.onProductListPage().sortProductListBy('Name (Z to A)');
    const productItems = await pageManager.onProductListPage().getItemsList();

    expect(productItems[0].name).toEqual('Test.allTheThings() T-Shirt (Red)');
  });

  test('should sort products by price ascending', async ({ pageManager }) => {
    await pageManager.onProductListPage().sortProductListBy('Price (low to high)');
    const productItems = await pageManager.onProductListPage().getItemsList();

    expect(productItems[0].price).toEqual('$7.99');
  });

  test('should sort products by price descending', async ({ pageManager }) => {
    await pageManager.onProductListPage().sortProductListBy('Price (high to low)');
    const productItems = await pageManager.onProductListPage().getItemsList();

    expect(productItems[0].price).toEqual('$49.99');
  });

  test('should navigate to the product detail page', async ({ pageManager }) => {
    const product = {
      name: 'Sauce Labs Fleece Jacket',
      description:
        "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
      price: '$49.99',
    };

    await pageManager.onProductListPage().selectOnProductByNameAndNavigateToItsDetail(product.name);

    const expectedProduct = await pageManager.onProductDetailPage().getProductDetail();
    expect(expectedProduct).toStrictEqual(product);
  });

  test('should add a product to the cart', async ({ pageManager }) => {
    const name = 'Sauce Labs Fleece Jacket';

    await pageManager.onProductListPage().selectOnProductByNameAndClickOnAddToCartButton(name);
    const shoppingCartItems = await pageManager
      .onProductListPage()
      .checkTotalOProductsInShoppingCart();

    expect(shoppingCartItems).toEqual('1');
  });

  test('should remove a product from the cart', async ({ pageManager }) => {
    const name = 'Sauce Labs Fleece Jacket';

    await pageManager.onProductListPage().selectOnProductByNameAndClickOnAddToCartButton(name);
    await pageManager.onProductListPage().clickOnRemoveButton();

    const shoppingCartItems = await pageManager.onShoppingCartPage().shoppingCartShouldBeEmpty();
    await expect(shoppingCartItems).toBeHidden();
  });
});
