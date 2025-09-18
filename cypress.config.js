// const { defineConfig } = require("cypress");
 
// module.exports = defineConfig({
//   e2e: {
//     experimentalStudio: true,
//     screenshotOnRunFailure: true, // Auto-screenshot on test failure
//     screenshotsFolder: 'cypress/screenshots',
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });
 
const { defineConfig } = require('cypress');
 
module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com',
  },
 
  // Screenshots
  screenshotOnRunFailure: true, // Automatically capture screenshots on test failure
  screenshotsFolder: 'cypress/screenshots', // Folder to save screenshots
 
  // Video recording
  video: true, // Record videos of test runs
  videoUploadOnPasses: true, // Upload videos even for passing tests
  videosFolder: 'cypress/videos', // Folder to save videos
 
  // Viewport size
  viewportWidth: 1280,
  viewportHeight: 720,
 
  // Reporter configuration
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    reportPageTitle: 'OrangeHRM Test Report',
    inlineAssets: true,
  },
});
 
 
 