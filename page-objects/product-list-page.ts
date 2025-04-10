import { Locator, Page } from '@playwright/test';
import { HelperBase } from './helper-base';

export class ProductListPage extends HelperBase {
  readonly combobox: Locator;
  readonly goLevelUp: Locator;
  readonly inventory: Locator;

  constructor(page: Page) {
    super(page);
    this.combobox = page.getByRole('combobox');
    this.goLevelUp = page.locator('..');
    this.inventory = page.locator('.inventory_container');
  }

  async sortProductListBy(sortBy: string) {
    await this.combobox.selectOption(sortBy);
  }

  //i needed to use xpath here because of the way that the application was developed
  // and I did not want first() or last() ...
  async selectOnProductByNameAndClickOnAddToCartButton(productName: string) {
    await this.inventoryItems
      .locator(this.productName)
      .filter({ hasText: productName })
      .locator(this.goLevelUp)
      .locator(this.goLevelUp)
      .locator(this.goLevelUp)
      .locator(this.addButton)
      .click();
  }

  async getInventory() {
    return this.inventory;
  }
}
