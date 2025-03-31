import { expect, test } from '@playwright/test';
import { PageManager } from '../page-objects/page-manager';

test.describe('Cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/v1/index.html');
    const pm = new PageManager(page);
    await pm
      .onLoginPage()
      .loginAsStandardUser(process.env.USERNAME as string, process.env.PASSWORD as string);
  });

  test('should display all products added to the cart', async ({ page }) => {
    const pm = new PageManager(page);
    const product = {
      name: 'Sauce Labs Fleece Jacket',
      description:
        "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
      price: '$49.99',
    };

    await pm.onProductListPage().selectOnProductByNameAndClickOnAddToCartButton(product.name);
    await pm.onProductListPage().goToShoppingCart();

    const itemsCheckoutList = await pm.onShoppingCartPage().getItemsList();
    expect(itemsCheckoutList[0]).toStrictEqual(product);
  });

  test('should remove a product from the cart', async ({ page }) => {
    const pm = new PageManager(page);
    const name = 'Sauce Labs Fleece Jacket';

    await pm.onProductListPage().selectOnProductByNameAndClickOnAddToCartButton(name);
    await pm.onProductListPage().goToShoppingCart();
    await pm.onShoppingCartPage().clickOnRemoveButton();

    const shoppingCartItems = await pm.onShoppingCartPage().shoppingCartShouldBeEmpty();
    await expect(shoppingCartItems).toBeHidden();
  });

  test('should navigate to product detail page from the cart', async ({ page }) => {
    const pm = new PageManager(page);
    const product = {
      name: 'Sauce Labs Fleece Jacket',
      description:
        "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
      price: '$49.99',
    };

    await pm.onProductListPage().selectOnProductByNameAndClickOnAddToCartButton(product.name);
    await pm.onProductListPage().goToShoppingCart();
    await pm.onShoppingCartPage().selectOnProductByNameAndNavigateToItsDetail(product.name);

    const expectedProduct = await pm.onProductDetailPage().getProductDetail();
    expect(expectedProduct).toStrictEqual(product);
  });

  test('should navigate back to the product listing', async ({ page }) => {
    const pm = new PageManager(page);

    await pm.onProductListPage().goToShoppingCart();
    await pm.onShoppingCartPage().clickOnContinueShoppingButton();

    const listOfProducts = await pm.onProductListPage().getItemsList();
    expect(listOfProducts).toHaveLength(6);
  });

  test('should proceed to checkout when cart has items', async ({ page }) => {
    const pm = new PageManager(page);
    const product = {
      name: 'Sauce Labs Fleece Jacket',
      description:
        "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
      price: '$49.99',
    };

    await pm.onProductListPage().selectOnProductByNameAndClickOnAddToCartButton(product.name);
    await pm.onProductListPage().goToShoppingCart();
    await pm.onShoppingCartPage().clickOnCheckoutButton();

    const checkoutInfo = await pm.onCheckoutInformationPage().getCheckoutInformationTitle();
    expect(checkoutInfo).toEqual('Checkout: Your Information');
  });

  test('should not allow checkout when cart is empty', async ({ page }) => {
    const pm = new PageManager(page);

    await pm.onProductListPage().goToShoppingCart();

    const buttonStatus = await pm.onShoppingCartPage().checkoutButtonStatus();
    await expect(buttonStatus).toBeDisabled();
  });
});
