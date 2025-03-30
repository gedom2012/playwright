import { Locator, Page } from '@playwright/test';
import { HelperBase } from './helper-base';

export class CheckoutInformationPage extends HelperBase {
  readonly checkoutTitle: Locator;
  readonly textBoxFirstName: Locator;
  readonly textBoxLastName: Locator;
  readonly testBoxPostalCode: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutTitle = page.getByText('Checkout: Your Information');
    this.textBoxFirstName = page.getByRole('textbox', { name: 'First Name' });
    this.textBoxLastName = page.getByRole('textbox', { name: 'Last Name' });
    this.testBoxPostalCode = page.getByRole('textbox', { name: 'Zip/Postal Code' });
    this.continueButton = page.getByRole('button', { name: 'CONTINUE' });
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async getCheckoutInformationTitle() {
    return await this.checkoutTitle.textContent();
  }

  async fillOutPersonalInformationForm(firstName: string, lastName: string, postalCode: string) {
    await this.textBoxFirstName.fill(firstName);
    await this.textBoxLastName.fill(lastName);
    await this.testBoxPostalCode.fill(postalCode);
  }

  async clickOnContinueButton() {
    await this.continueButton.click();
  }

  async showMissingInputError() {
    return await this.errorMessage.textContent();
  }
}
