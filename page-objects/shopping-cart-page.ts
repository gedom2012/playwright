import { expect, Locator, Page } from '@playwright/test';
import { HelperBase } from './helper-base';

export class ShoppingCartPage extends HelperBase {
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutButton = page.getByRole('link', { name: 'CHECKOUT' });
    this.continueShoppingButton = page.getByRole('link', { name: 'Continue Shopping' });
  }

  async clickOnCheckoutButton() {
    await expect(this.checkoutButton).toBeVisible();
    await this.checkoutButton.click();
  }

  async checkoutButtonStatus() {
    return this.checkoutButton;
  }

  async clickOnContinueShoppingButton() {
    await expect(this.continueShoppingButton).toBeVisible();
    await this.continueShoppingButton.click();
  }
}
