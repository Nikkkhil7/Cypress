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
});
 
 
 