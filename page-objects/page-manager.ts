import { Page } from '@playwright/test';

import { CheckoutFinishPage } from './checkout-finish-page';
import { CheckoutInformationPage } from './checkout-information-page';
import { CheckoutOverviewPage } from './checkout-overview.page';
import { LoginPage } from './login-page';
import { ProductDetailPage } from './product-detail-page';
import { ProductListPage } from './product-list-page';
import { ShoppingCartPage } from './shopping-cart-page';

export class PageManager {
  readonly page: Page;
  readonly loginPage: LoginPage;
  readonly productListPage: ProductListPage;
  readonly productDetailPage: ProductDetailPage;
  readonly shoppingCartPage: ShoppingCartPage;
  readonly checkoutInformationPage: CheckoutInformationPage;
  readonly checkoutOverviewPage: CheckoutOverviewPage;
  readonly checkoutFinishPage: CheckoutFinishPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.productListPage = new ProductListPage(this.page);
    this.productDetailPage = new ProductDetailPage(this.page);
    this.checkoutInformationPage = new CheckoutInformationPage(this.page);
    this.shoppingCartPage = new ShoppingCartPage(this.page);
    this.checkoutOverviewPage = new CheckoutOverviewPage(this.page);
    this.checkoutFinishPage = new CheckoutFinishPage(this.page);
  }

  onLoginPage() {
    return this.loginPage;
  }

  onProductListPage() {
    return this.productListPage;
  }

  onProductDetailPage() {
    return this.productDetailPage;
  }

  onCheckoutInformationPage() {
    return this.checkoutInformationPage;
  }

  onShoppingCartPage() {
    return this.shoppingCartPage;
  }

  onCheckoutOverviewPage() {
    return this.checkoutOverviewPage;
  }

  onCheckoutFinishPage() {
    return this.checkoutFinishPage;
  }
}
