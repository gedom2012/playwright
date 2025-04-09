import { expect } from '@playwright/test';
import { test } from '../test-option';

test.describe('Cart', () => {
  test.beforeEach(async ({ page, inventoryURL }) => {
    await page.goto(inventoryURL);
  });

  test('should display all products added to the cart', async ({ pageManager }) => {
    const product = {
      name: 'Sauce Labs Fleece Jacket',
      description:
        "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
      price: '49.99',
    };

    await pageManager
      .onProductListPage()
      .selectOnProductByNameAndClickOnAddToCartButton(product.name);
    await pageManager.onProductListPage().goToShoppingCart();

    const itemsCheckoutList = await pageManager.onShoppingCartPage().getItemsList();
    expect(itemsCheckoutList[0]).toStrictEqual(product);
  });

  test('should remove a product from the cart', async ({ pageManager }) => {
    const name = 'Sauce Labs Fleece Jacket';

    await pageManager.onProductListPage().selectOnProductByNameAndClickOnAddToCartButton(name);
    await pageManager.onProductListPage().goToShoppingCart();
    await pageManager.onShoppingCartPage().clickOnRemoveButton();

    const shoppingCartItems = await pageManager.onShoppingCartPage().shoppingCartShouldBeEmpty();
    await expect(shoppingCartItems).toBeHidden();
  });

  test('should navigate to product detail page from the cart', async ({ pageManager }) => {
    const product = {
      name: 'Sauce Labs Fleece Jacket',
      description:
        "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
      price: '$49.99',
    };

    await pageManager
      .onProductListPage()
      .selectOnProductByNameAndClickOnAddToCartButton(product.name);
    await pageManager.onProductListPage().goToShoppingCart();
    await pageManager
      .onShoppingCartPage()
      .selectOnProductByNameAndNavigateToItsDetail(product.name);

    const expectedProduct = await pageManager.onProductDetailPage().getProductDetail();
    expect(expectedProduct).toStrictEqual(product);
  });

  test('should navigate back to the product listing', async ({ pageManager }) => {
    await pageManager.onProductListPage().goToShoppingCart();
    await pageManager.onShoppingCartPage().clickOnContinueShoppingButton();

    const listOfProducts = await pageManager.onProductListPage().getItemsList();
    expect(listOfProducts).toHaveLength(6);
  });

  test('should proceed to checkout when cart has items', async ({ pageManager }) => {
    const product = {
      name: 'Sauce Labs Fleece Jacket',
      description:
        "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
      price: '$49.99',
    };

    await pageManager
      .onProductListPage()
      .selectOnProductByNameAndClickOnAddToCartButton(product.name);
    await pageManager.onProductListPage().goToShoppingCart();
    await pageManager.onShoppingCartPage().clickOnCheckoutButton();

    const checkoutInfo = await pageManager
      .onCheckoutInformationPage()
      .getCheckoutInformationTitle();
    expect(checkoutInfo).toEqual('Checkout: Your Information');
  });
});
