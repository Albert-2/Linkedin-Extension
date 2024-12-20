export default defineContentScript({
  matches: ["*://*.linkedin.com/*"],
  main() {
    console.log("LinkedIn Automation Script Running.");
  },
});
