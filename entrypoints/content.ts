export default defineContentScript({
  matches: ['*://*.linkedin.com/*'],
  main() {
    console.log('LinkedIn Automation Script Running.');

    // Function to click all visible "Connect" buttons
    const clickConnectButtons = () => {
      const buttons = document.querySelectorAll('button');
      buttons.forEach((button) => {
        const htmlButton = button as HTMLButtonElement; // Cast to HTMLButtonElement
        if (htmlButton.textContent?.trim() === 'Connect') {
          htmlButton.click();
          console.log('Clicked a Connect button:', htmlButton);
        }
      });
    };

    // Function to handle modals (e.g., "Send now" in popups)
    const handleModals = () => {
      const modalButton = document.querySelector('button[aria-label="Send now"]') as HTMLButtonElement | null;
      if (modalButton) {
        modalButton.click();
        console.log('Clicked Send Now button');
      }
    };

    // Periodically check and click Connect buttons
    const interval = setInterval(() => {
      clickConnectButtons();
      handleModals();
    }, 2000);

    // Stop the script when navigating away
    window.addEventListener('beforeunload', () => {
      clearInterval(interval);
      console.log('Stopped LinkedIn Automation Script.');
    });
  },
});
