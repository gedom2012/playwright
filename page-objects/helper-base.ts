import { expect, Locator, Page } from '@playwright/test';

export class HelperBase {
  readonly page: Page;
  readonly shoppingCart: Locator;
  readonly shoppingCartBadge: Locator;
  readonly addButton: Locator;
  readonly removeButton: Locator;
  readonly linkItem: Locator;
  readonly inventoryItems: Locator;
  readonly checkoutItems: Locator;
  readonly productName: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCart = page.locator('[data-icon="shopping-cart"]');
    this.shoppingCartBadge = page.locator('[class="fa-layers-counter shopping_cart_badge"]');
    this.addButton = page.getByRole('button', { name: 'ADD TO CART' });
    this.removeButton = page.getByRole('button', { name: 'REMOVE' });
    this.linkItem = page.getByRole('link');
    this.checkoutItems = page.locator('.cart_item');
    this.inventoryItems = page.locator('.inventory_item');
    this.productName = page.locator('.inventory_item_name');
    this.productDescription = page.locator('.inventory_item_desc');
    this.productPrice = page.locator('.inventory_item_price');
    this.cancelButton = page.getByRole('link', { name: 'CANCEL' });
  }

  async checkTotalOProductsInShoppingCart() {
    return await this.shoppingCartBadge.textContent();
  }

  async shoppingCartShouldBeEmpty() {
    return this.shoppingCartBadge;
  }

  async goToShoppingCart() {
    await expect(this.shoppingCart).toBeVisible();
    await this.shoppingCart.click();
  }

  async clickOnRemoveButton() {
    await expect(this.removeButton).toBeVisible();
    await this.removeButton.click();
  }

  async selectOnProductByNameAndNavigateToItsDetail(productName: string) {
    await this.linkItem.filter({ hasText: productName }).click();
  }

  async getItemsList() {
    type ProductType = {
      name: string;
      description: string;
      price: string;
    };
    const list: ProductType[] = [];

    const inventoryCount = await this.inventoryItems.count();
    const checkoutCount = await this.checkoutItems.count();

    let itemsLocator: Locator[];
    if (inventoryCount > 0) {
      itemsLocator = await this.inventoryItems.all();
    } else if (checkoutCount > 0) {
      itemsLocator = await this.checkoutItems.all();
    } else {
      return list;
    }

    await Promise.all(
      itemsLocator.map(async (item) => {
        const name = await item.locator(this.productName).innerText();
        const description = await item.locator(this.productDescription).innerText();
        const price = await item.locator(this.productPrice).innerText();
        list.push({ name, description, price });
      })
    );
    return list;
  }

  async clickOnCancelButton() {
    await this.cancelButton.click();
  }
}
