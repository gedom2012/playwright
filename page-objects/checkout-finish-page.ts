import { Locator, Page } from '@playwright/test';
import { HelperBase } from './helper-base';

export class CheckoutFinishPage extends HelperBase {
  readonly title: Locator;
  readonly message: Locator;
  readonly image: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByRole('heading', { name: 'THANK YOU FOR YOUR ORDER' });
    this.message = page.getByText('Your order has been');
    this.image = page.locator('#checkout_complete_container').getByRole('img');
  }

  async getDisplayedTitleMessage() {
    return this.title;
  }

  async getDisplayedContentMessage() {
    return await this.message.innerText();
  }

  async getDisplayedImage() {
    return this.image;
  }
}
