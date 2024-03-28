import { test, expect } from '@playwright/test'

test.describe('GitHub User Search Page Tests', () => {
    test.beforeEach('Navigate to page and validate the title', async ({ page }) => {
      await page.goto('http://localhost:3000');
      const pageTitle = await page.locator('h1')
      await expect(pageTitle).toContainText('Search for a user')
    });
  
    test('Initial State Validation', async ({ page }) => {
      // Check for logo and name in the top left corner
      await expect(page.locator("img[alt='github-icon']")).toBeVisible(); 
      // Check secondary page titles
      await expect(page.locator('h2[class="_title_1kib8_23"]')).toContainText('github-search');
      await expect(page.locator('h2[class="_title_1ymcw_14"]')).toContainText('made with 💜 by hedênica');
      // Check for input field with placeholder text
      await expect(page.locator('input')).toBeVisible();
      await expect(page.locator('input')).toHaveAttribute('placeholder', "Type a github username");
  
      // Check that search button is present but disabled
      await expect(page.locator("button[type='button']")).toBeDisabled();
    });

    test('Input Field Behavior', async ({ page }) => {
        // Typing fewer than 4 characters keeps the search button disabled
        await page.locator('input').fill('abc');
        const searchButton = await page.locator('button').getByText('search');
        await expect(searchButton).toBeDisabled();
      
        // Clearing the input field
        await page.locator('input').fill('');
      
        // Typing 4 or more characters enables the search button
        await page.locator('input').fill('abcd');
        await expect(searchButton).toBeEnabled();
      });
      
      test('Search for Non-existing User', async ({ page }) => {
        const searchButton = await page.locator('button').getByText('search');
        const returnButton = await page.locator('button').getByText('return');
        await page.locator('input').fill('nonexistentuser1234');
        await searchButton.click();
        await expect(page.locator('text="Ops, something went wrong 😢"')).toBeVisible();
        await expect(returnButton).toBeVisible();
    
      });
      
      test('Search for Existing User', async ({ page }) => {
        await page.locator('input').fill('linakulakova');
        const searchButton = await page.locator('button').getByText('search');
        const returnButton = await page.locator('button').getByText('return');
        const repositoriesList = await page.locator('ul > li');
        await searchButton.click();
        await expect(page.locator('text="Look who we found 🔥"')).toBeVisible();
        const profilePicture = await page.locator('img[class="_avatar_7hzna_22"]');
        const profileName = await page.locator('img[class="_avatar_7hzna_22"]');
        await expect(profilePicture).toBeVisible();
        // Check that user info section is displayed and has right text
        await expect(page.locator('div[class="_userInfo_7hzna_67"]')).toContainText('Name: linakulakova'); 
        await expect(page.locator('div[class="_userInfo_7hzna_67"]')).toContainText('Repositories: 4'); 
        await expect(repositoriesList).toHaveCount(4)
        await expect(returnButton).toBeVisible();
      });
      
      test('Return Button Functionality After Failure', async ({ page }) => {
        await page.locator('input').fill('nonexistentuser1234');
        const searchButton = await page.locator('button').getByText('search');
        const returnButton = await page.locator('button').getByText('return');
        await searchButton.click();
        await expect(page.locator('text="Ops, something went wrong 😢"')).toBeVisible();
        await returnButton.click();
    
        // Verify the page has returned to the initial state
        await expect(page.locator('input')).toBeEmpty();
        await expect(searchButton).toBeDisabled();
      });
      
      test.only('Return Button Functionality After Success', async ({ page }) => {
        const searchButton = await page.locator('button').getByText('search');
        const returnButton = await page.locator('button').getByText('return');
        await page.locator('input').fill('linakulakova');
        await searchButton.click();
        await returnButton.click();
        // Verify the page has returned to the initial state
        await expect(page.locator('input')).toBeEmpty();
        await expect(searchButton).toBeDisabled();
      });
  });
