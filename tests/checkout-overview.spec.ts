import { expect } from '@playwright/test';
import { test } from '../test-option';

test.describe('Checkout overview', () => {
  let person: { firstName: string; lastName: string; postalCode: string };
  let firstProduct: { name: string; description: string; price: string };
  let secondProduct: { name: string; description: string; price: string };

  test.beforeEach(async ({ page, inventoryURL }) => {
    await page.goto(inventoryURL);

    person = {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '4450-153',
    };

    firstProduct = {
      name: 'Sauce Labs Bolt T-Shirt',
      description:
        'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.',
      price: '$15.99',
    };

    secondProduct = {
      name: 'Sauce Labs Backpack',
      description:
        'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
      price: '$29.99',
    };
  });

  test('should successfully complete the checkout', async ({ page, pageManager }) => {
    await pageManager
      .onProductListPage()
      .selectOnProductByNameAndClickOnAddToCartButton(firstProduct.name);
    await pageManager
      .onProductListPage()
      .selectOnProductByNameAndClickOnAddToCartButton(secondProduct.name);
    await pageManager.onProductListPage().goToShoppingCart();
    await pageManager.onShoppingCartPage().clickOnCheckoutButton();

    await pageManager
      .onCheckoutInformationPage()
      .fillOutPersonalInformationForm(person.firstName, person.lastName, person.postalCode);
    await pageManager.onCheckoutInformationPage().clickOnContinueButton();

    //checkout validations
    const totalItemsByProductOnCheckoutOverview = await pageManager
      .onCheckoutOverviewPage()
      .getTotalOfProducts();
    const productsOnCheckoutOverview = await pageManager.onCheckoutOverviewPage().getItemsList();
    const paymentInformation = await pageManager.onCheckoutOverviewPage().getPaymentInformation();
    const shippingInformation = await pageManager.onCheckoutOverviewPage().getShippingInformation();
    const totalItemAmount = await pageManager.onCheckoutOverviewPage().getItemTotalAmount();
    const totalAmount = await pageManager.onCheckoutOverviewPage().getTotalAmount();
    const tax = await pageManager.onCheckoutOverviewPage().getTax();
    expect.soft(totalItemsByProductOnCheckoutOverview).toStrictEqual(['1', '1']);
    expect.soft(productsOnCheckoutOverview).toStrictEqual([firstProduct, secondProduct]);
    expect.soft(paymentInformation).toEqual('SauceCard #31337');
    expect.soft(shippingInformation).toEqual('FREE PONY EXPRESS DELIVERY!');
    expect.soft(totalItemAmount).toEqual('Item total: $45.98');
    expect.soft(tax).toEqual('Tax: $3.68');
    expect.soft(totalAmount).toEqual('Total: $49.66');

    //validations om checkout complete
    await pageManager.onCheckoutOverviewPage().clickOnFinishButton();
    await expect.soft(page).toHaveURL('/v1/checkout-complete.html');

    const titleMessageOnDisplay = await pageManager
      .onCheckoutFinishPage()
      .getDisplayedTitleMessage();
    const contentMessageOnDisplay = await pageManager
      .onCheckoutFinishPage()
      .getDisplayedContentMessage();
    const imageOnDisplay = await pageManager.onCheckoutFinishPage().getDisplayedImage();

    await expect.soft(titleMessageOnDisplay).toBeVisible();
    expect
      .soft(contentMessageOnDisplay)
      .toEqual(
        'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
      );
    await expect.soft(imageOnDisplay).toBeVisible();
  });

  test('should allow canceling the checkout', async ({ page, pageManager }) => {
    const productName = 'Sauce Labs Bolt T-Shirt';

    await pageManager
      .onProductListPage()
      .selectOnProductByNameAndClickOnAddToCartButton(productName);
    await pageManager.onProductListPage().goToShoppingCart();
    await pageManager.onShoppingCartPage().clickOnCheckoutButton();
    await pageManager
      .onCheckoutInformationPage()
      .fillOutPersonalInformationForm(person.firstName, person.lastName, person.postalCode);
    await pageManager.onCheckoutInformationPage().clickOnContinueButton();

    await pageManager.onCheckoutOverviewPage().clickOnCancelButton();
    await expect.soft(page).toHaveURL('v1/inventory.html');
  });
});
