import { expect } from '@playwright/test';
import { test } from '../test-option';

test.describe('Checkout Information', () => {
  test.beforeEach(async ({ page, pageManager, inventoryURL }) => {
    await page.goto(inventoryURL);
    const productName = 'Sauce Labs Fleece Jacket';
    await pageManager
      .onProductListPage()
      .selectOnProductByNameAndClickOnAddToCartButton(productName);
    await pageManager.onProductListPage().goToShoppingCart();
    await pageManager.onShoppingCartPage().clickOnCheckoutButton();
  });

  test('should proceed to checkout overview after filling out the form and clickOnCheckoutButton', async ({
    page,
    pageManager,
  }) => {
    const person = {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '4450-153',
    };

    await pageManager
      .onCheckoutInformationPage()
      .fillOutPersonalInformationForm(person.firstName, person.lastName, person.postalCode);
    await pageManager.onCheckoutInformationPage().clickOnContinueButton();

    await expect(page).toHaveURL('/v1/checkout-step-two.html');
  });

  test('should navigate back to the shopping cart after click on cancel button', async ({
    page,
    pageManager,
  }) => {
    await pageManager.onCheckoutInformationPage().clickOnCancelButton();

    await expect(page).toHaveURL('v1/cart.html');
  });

  test('should display an error when click on continue button and first name is missing', async ({
    pageManager,
  }) => {
    const person = {
      firstName: '',
      lastName: 'Doe',
      postalCode: '4450-153',
    };

    await pageManager
      .onCheckoutInformationPage()
      .fillOutPersonalInformationForm(person.firstName, person.lastName, person.postalCode);
    await pageManager.onCheckoutInformationPage().clickOnContinueButton();

    const errorMessageOnDisplay = await pageManager
      .onCheckoutInformationPage()
      .showMissingInputError();
    expect(errorMessageOnDisplay).toEqual('Error: First Name is required');
  });

  test('should display an error when click on continue button and last name is missing', async ({
    pageManager,
  }) => {
    const person = {
      firstName: 'John',
      lastName: '',
      postalCode: '4450-153',
    };

    await pageManager
      .onCheckoutInformationPage()
      .fillOutPersonalInformationForm(person.firstName, person.lastName, person.postalCode);
    await pageManager.onCheckoutInformationPage().clickOnContinueButton();

    const errorMessageOnDisplay = await pageManager
      .onCheckoutInformationPage()
      .showMissingInputError();
    expect(errorMessageOnDisplay).toEqual('Error: Last Name is required');
  });

  test('should display an error when click on continue button and postal code is missing', async ({
    pageManager,
  }) => {
    const person = {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '',
    };

    await pageManager
      .onCheckoutInformationPage()
      .fillOutPersonalInformationForm(person.firstName, person.lastName, person.postalCode);
    await pageManager.onCheckoutInformationPage().clickOnContinueButton();

    const errorMessageOnDisplay = await pageManager
      .onCheckoutInformationPage()
      .showMissingInputError();
    expect(errorMessageOnDisplay).toEqual('Error: Postal Code is required');
  });
});
