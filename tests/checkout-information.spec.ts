import { expect, test } from '@playwright/test';
import { PageManager } from '../page-objects/page-manager';

test.describe('Checkout Information', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/v1/index.html');
    const pm = new PageManager(page);
    await pm.onLoginPage().loginAsStandardUser('standard_user', 'secret_sauce');

    const productName = 'Sauce Labs Fleece Jacket';

    await pm.onProductListPage().selectOnProductByNameAndClickOnAddToCartButton(productName);
    await pm.onProductListPage().goToShoppingCart();
    await pm.onShoppingCartPage().clickOnCheckoutButton();
  });

  test('should proceed to checkout overview after filling out the form and clickOnCheckoutButton', async ({
    page,
  }) => {
    const pm = new PageManager(page);
    const person = {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '4450-153',
    };

    await pm
      .onCheckoutInformationPage()
      .fillOutPersonalInformationForm(person.firstName, person.lastName, person.postalCode);
    await pm.onCheckoutInformationPage().clickOnContinueButton();

    await expect(page).toHaveURL('/v1/checkout-step-two.html');
  });

  test('should navigate back to the shopping cart after click on cancel button', async ({
    page,
  }) => {
    const pm = new PageManager(page);

    await pm.onCheckoutInformationPage().clickOnCancelButton();

    await expect(page).toHaveURL('v1/cart.html');
  });

  test('should display an error when click on continue button and first name is missing', async ({
    page,
  }) => {
    const pm = new PageManager(page);
    const person = {
      firstName: '',
      lastName: 'Doe',
      postalCode: '4450-153',
    };

    await pm
      .onCheckoutInformationPage()
      .fillOutPersonalInformationForm(person.firstName, person.lastName, person.postalCode);
    await pm.onCheckoutInformationPage().clickOnContinueButton();

    const errorMessageOnDisplay = await pm.onCheckoutInformationPage().showMissingInputError();
    expect(errorMessageOnDisplay).toEqual('Error: First Name is required');
  });

  test('should display an error when click on continue button and last name is missing', async ({
    page,
  }) => {
    const pm = new PageManager(page);
    const person = {
      firstName: 'John',
      lastName: '',
      postalCode: '4450-153',
    };

    await pm
      .onCheckoutInformationPage()
      .fillOutPersonalInformationForm(person.firstName, person.lastName, person.postalCode);
    await pm.onCheckoutInformationPage().clickOnContinueButton();

    const errorMessageOnDisplay = await pm.onCheckoutInformationPage().showMissingInputError();
    expect(errorMessageOnDisplay).toEqual('Error: Last Name is required');
  });

  test('should display an error when click on continue button and postal code is missing', async ({
    page,
  }) => {
    const pm = new PageManager(page);
    const person = {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '',
    };

    await pm
      .onCheckoutInformationPage()
      .fillOutPersonalInformationForm(person.firstName, person.lastName, person.postalCode);
    await pm.onCheckoutInformationPage().clickOnContinueButton();

    const errorMessageOnDisplay = await pm.onCheckoutInformationPage().showMissingInputError();
    expect(errorMessageOnDisplay).toEqual('Error: Postal Code is required');
  });
});
