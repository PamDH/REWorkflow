const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    watchForFileChanges: false,
    baseUrl: 'https://dev.delekhomes.com',
    viewportWidth: 1400,
    viewportHeight: 1200,
    specPattern: [
      'cypress/e2e/*.js',
      'cypress/e2e/**/*.js'
    ],
  screenshotsFolder: 'cypress/outputScreenshots',
  videosFolder: 'cypress/outputVideos',
  video: true,
  videoCompression: 32,
  videoUploadOnPasses: false,
  screenshotOnRunFailure: true
  },
});
