<h1 align="center"> Testing Challenge - Lina Kulakova </h1> <br>

## Introduction

This pull request contains:
- some e2e tests in playwright that cover the page
- api tests possible to cover => only GET method is available to the user so only this one was used
- yml file => example of yml file to run the tests in Github actions (since I added the tests to GH, I created yml file for Github actions)

## Instructions

Before runing the tests locally, please make sure you have all dependencies installed:
*For the project itself*
- `yarn` to install dependencies


In order to be able to run the tests locally, please first initiate the localhost:
- `yarn dev` to run the project in development mode

*To run the tests*

All e2e tests in Chromium:
- `npm run tests:e2e`

All api tests:
- `npm run tests:api`

Specific browser:
- `npm run tests:{browser}`

## Notes

If I would have more time I would:
1. Increase the coverage of e2e tests
2. Add more negative tests
3. Finish the page object refactoring
4. Finish all locators clean up and beautify
5. Upgare the project doc

Constraints: 
1. Since api only allowed 60 calls per day, in the beggining it was difficult to write tests because in 10 runs I used them all and after that I only get error messages which was an impediment to continue writing tests on that day

## Final note

Thank you for checking!
