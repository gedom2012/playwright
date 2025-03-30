import { Locator, Page } from '@playwright/test';
import { HelperBase } from './helper-base';

export class CheckoutOverviewPage extends HelperBase {
  readonly summaryQuantity: Locator;
  readonly paymentInformation: Locator;
  readonly itemTotalAmount: Locator;
  readonly totalAmount: Locator;
  readonly shippingInformation: Locator;
  readonly tax: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    super(page);
    this.summaryQuantity = page.locator('.summary_quantity');
    this.paymentInformation = page.getByText('SauceCard #');
    this.shippingInformation = page.getByText('FREE PONY EXPRESS DELIVERY!');
    this.itemTotalAmount = page.getByText('Item total: $');
    this.totalAmount = page.getByText(/Total:/);
    this.tax = page.getByText('Tax: $');
    this.finishButton = page.getByRole('link', { name: 'FINISH' });
  }

  async getTotalOfProducts() {
    return await this.summaryQuantity.allInnerTexts();
  }

  async getPaymentInformation() {
    return await this.paymentInformation.innerText();
  }

  async getShippingInformation() {
    return await this.shippingInformation.innerText();
  }

  async getItemTotalAmount() {
    return await this.itemTotalAmount.innerText();
  }

  async getTax() {
    return await this.tax.innerText();
  }

  async getTotalAmount() {
    return await this.totalAmount.innerText();
  }

  async clickOnFinishButton() {
    await this.finishButton.click();
  }
}
