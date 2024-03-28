
const locators = {
    searchInput: () => 'input[placeholder="Type a GitHub username"]',
    searchButton: () => 'button >> text="search"',
    errorMessage: () => 'text="Ops, something went wrong 😢"',
    successMessage: () => 'text="Look who we found 🔥"',
    returnButton: () => 'button >> text="Return"',
    pageTitle: () => 'h2[class="_title_1kib8_23"]',
    footerText: () => 'h2[class="_title_1ymcw_14"]',
    githubIcon: 'img[alt="github-icon"]',
    repositoriesList: 'ul > li',
    userDetails: 'div[class="_userInfo_7hzna_67"]',
    profilePicture: 'img[class="_avatar_7hzna_22"]'



};

export default locators;
