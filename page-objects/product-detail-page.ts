import { expect, Locator, Page } from '@playwright/test';
import { HelperBase } from './helper-base';

export class ProductDetailPage extends HelperBase {
  readonly backButton: Locator;
  readonly name: Locator;
  readonly detail: Locator;
  readonly price: Locator;

  constructor(page: Page) {
    super(page);
    this.backButton = page.getByRole('button', { name: '<- Back' });
    this.name = page.locator('.inventory_details_name');
    this.detail = page.locator('.inventory_details_desc');
    this.price = page.locator('.inventory_details_price');
  }

  async clickOnAddToCartButton() {
    await expect(this.addButton).toBeVisible();
    await this.addButton.click();
  }

  async clickOnBackButton() {
    await expect(this.backButton).toBeVisible();
    await this.backButton.click();
  }

  async getProductDetail() {
    const productDetail = {
      name: await this.name.textContent(),
      description: await this.detail.textContent(),
      price: await this.price.textContent(),
    };
    return productDetail;
  }
}
