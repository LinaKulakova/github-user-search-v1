import { expect, Locator, Page } from '@playwright/test'

export class MainPage {
    readonly page: Page
    readonly pageTitle: Locator
    readonly githubIcon: Locator
  
    constructor(page: Page) {
      this.page = page
      this.pageTitle = page.locator('h1')
      this.githubIcon = page.locator("img[alt='github-icon']")
    }

    async visit() {
        await this.page.goto('http://localhost:3000/')
        await expect(this.pageTitle).toContainText('Search for a user')
    }
  
    async wait(time) {
      await this.page.waitForTimeout(time)
    }
  }
