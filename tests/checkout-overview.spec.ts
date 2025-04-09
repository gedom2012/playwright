import { expect, test } from '@playwright/test';
import { PageManager } from '../page-objects/page-manager';

test.describe('Checkout overview', () => {
  let pm: PageManager;
  let person: { firstName: string; lastName: string; postalCode: string };
  let firstProduct: { name: string; description: string; price: string };
  let secondProduct: { name: string; description: string; price: string };

  test.beforeEach(async ({ page }) => {
    await page.goto('/v1/inventory.html');
    pm = new PageManager(page);

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

  test('should successfully complete the checkout', async ({ page }) => {
    await pm.onProductListPage().selectOnProductByNameAndClickOnAddToCartButton(firstProduct.name);
    await pm.onProductListPage().selectOnProductByNameAndClickOnAddToCartButton(secondProduct.name);
    await pm.onProductListPage().goToShoppingCart();
    await pm.onShoppingCartPage().clickOnCheckoutButton();

    await pm
      .onCheckoutInformationPage()
      .fillOutPersonalInformationForm(person.firstName, person.lastName, person.postalCode);
    await pm.onCheckoutInformationPage().clickOnContinueButton();

    //checkout validations
    const totalItemsByProductOnCheckoutOverview = await pm
      .onCheckoutOverviewPage()
      .getTotalOfProducts();
    const productsOnCheckoutOverview = await pm.onCheckoutOverviewPage().getItemsList();
    const paymentInformation = await pm.onCheckoutOverviewPage().getPaymentInformation();
    const shippingInformation = await pm.onCheckoutOverviewPage().getShippingInformation();
    const totalItemAmount = await pm.onCheckoutOverviewPage().getItemTotalAmount();
    const totalAmount = await pm.onCheckoutOverviewPage().getTotalAmount();
    const tax = await pm.onCheckoutOverviewPage().getTax();
    expect.soft(totalItemsByProductOnCheckoutOverview).toStrictEqual(['1', '1']);
    expect.soft(productsOnCheckoutOverview).toStrictEqual([firstProduct, secondProduct]);
    expect.soft(paymentInformation).toEqual('SauceCard #31337');
    expect.soft(shippingInformation).toEqual('FREE PONY EXPRESS DELIVERY!');
    expect.soft(totalItemAmount).toEqual('Item total: $45.98');
    expect.soft(tax).toEqual('Tax: $3.68');
    expect.soft(totalAmount).toEqual('Total: $49.66');

    //validations om checkout complete
    await pm.onCheckoutOverviewPage().clickOnFinishButton();
    await expect.soft(page).toHaveURL('/v1/checkout-complete.html');

    const titleMessageOnDisplay = await pm.onCheckoutFinishPage().getDisplayedTitleMessage();
    const contentMessageOnDisplay = await pm.onCheckoutFinishPage().getDisplayedContentMessage();
    const imageOnDisplay = await pm.onCheckoutFinishPage().getDisplayedImage();

    await expect.soft(titleMessageOnDisplay).toBeVisible();
    expect
      .soft(contentMessageOnDisplay)
      .toEqual(
        'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
      );
    await expect.soft(imageOnDisplay).toBeVisible();
  });

  test('should allow canceling the checkout', async ({ page }) => {
    const productName = 'Sauce Labs Bolt T-Shirt';

    await pm.onProductListPage().selectOnProductByNameAndClickOnAddToCartButton(productName);
    await pm.onProductListPage().goToShoppingCart();
    await pm.onShoppingCartPage().clickOnCheckoutButton();
    await pm
      .onCheckoutInformationPage()
      .fillOutPersonalInformationForm(person.firstName, person.lastName, person.postalCode);
    await pm.onCheckoutInformationPage().clickOnContinueButton();

    await pm.onCheckoutOverviewPage().clickOnCancelButton();
    await expect.soft(page).toHaveURL('v1/inventory.html');
  });
});
