import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly textBoxName: Locator;
  readonly textBoxPassword: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.textBoxName = page.getByRole('textbox', { name: 'Username' });
    this.textBoxPassword = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'LOGIN' });
  }

  /**
   * This method is responsible to perform authentication
   * @param userName the account name
   * @param password the account password
   */
  async loginAsStandardUser(userName: string, password: string) {
    await this.textBoxName.fill(userName);
    await this.textBoxPassword.fill(password);
    await this.loginButton.click();
  }
}
