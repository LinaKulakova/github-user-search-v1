import { test, expect } from '@playwright/test'
import locators from '../../page-objects/locators';
import { MainPage } from '../../page-objects/components/MainPage'


test.describe('GitHub User Search Page Tests', () => {
  let mainPage: MainPage

    test.beforeEach('Navigate to page and validate the title', async ({ page }) => {
      mainPage = new MainPage(page)
      await page.goto('http://localhost:3000/')
      //mainPage.visit();
    });
  
    test('Initial State Validation', async ({ page }) => {
      // Check for logo and name in the top left corner
      await expect(page.locator(locators.githubIcon)).toBeVisible();

      // Check secondary page titles
      await expect(page.locator(locators.pageTitle())).toContainText('github-search');
      await expect(page.locator(locators.footerText())).toContainText('made with 💜 by hedênica');
     
      // Check for input field with placeholder text
      await expect(page.locator('input')).toBeVisible();
      await expect(page.locator('input')).toHaveAttribute('placeholder', "Type a github username");
  
      // Check that search button is present but disabled
      await expect(page.locator(locators.searchButton())).toBeDisabled();
    });

    test('Input Field Behavior', async ({ page }) => {
        // Typing fewer than 4 characters keeps the search button disabled
        await page.locator('input').fill('abc');
        await expect(page.locator(locators.searchButton())).toBeDisabled();
      
        // Clearing the input field
        await page.locator('input').fill('');
      
        // Typing 4 or more characters enables the search button
        await page.locator('input').fill('abcd');
        await expect(page.locator(locators.searchButton())).toBeEnabled();
      });
      
      test('Search for Non-existing User', async ({ page }) => {
        await page.locator('input').fill('nonexistentuser1234');
        await page.locator(locators.searchButton()).click();
        // Validate the error message and that Return button is visible
        await expect(page.locator('text="Ops, something went wrong 😢"')).toBeVisible();
        await expect(page.locator(locators.returnButton())).toBeVisible();
      });
      
      test('Search for Existing User', async ({ page }) => {
        await page.locator('input').fill('linakulakova');
        await page.locator(locators.searchButton()).click();
        await expect(page.locator(locators.successMessage())).toBeVisible();
        await expect(page.locator(locators.profilePicture)).toBeVisible();
        // Check that user info section is displayed and has right text
        await expect(page.locator(locators.userDetails)).toContainText('Name: linakulakova'); 
        await expect(page.locator(locators.userDetails)).toContainText('Repositories: 4'); 
        await expect(page.locator(locators.repositoriesList)).toHaveCount(4);
        await expect(page.locator(locators.returnButton())).toBeVisible();
      });
      
      test('Return Button Functionality After Failure', async ({ page }) => {
        await page.locator('input').fill('nonexistentuser1234');
        await page.locator(locators.searchButton()).click();
        await expect(page.locator(locators.errorMessage())).toBeVisible();
        await page.locator(locators.returnButton()).click();

    
        // Verify the page has returned to the initial state
        await expect(page.locator('input')).toBeEmpty();
        await expect(page.locator(locators.searchButton())).toBeDisabled();
      });
      
      test('Return Button Functionality After Success', async ({ page }) => {
        await page.locator('input').fill('linakulakova');
        await page.locator(locators.searchButton()).click();
        await page.locator(locators.returnButton()).click();
        // Verify the page has returned to the initial state
        await expect(page.locator('input')).toBeEmpty();
        await expect(page.locator(locators.searchButton())).toBeDisabled();
      });
  });
