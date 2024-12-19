export default defineBackground(() => {
  console.log('Background script running!');

  // Listen for messages from the popup or other parts of the extension
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'runAutomation') {
      console.log('Received automation request:', message);

      // Get the active tab
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        if (activeTab?.id) {
          // Inject the content script into the active tab
          chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            func: () => {
              // Reuse the logic for clicking buttons directly
              const buttons = document.querySelectorAll('button');
              buttons.forEach((button) => {
                const htmlButton = button as HTMLButtonElement;
                if (htmlButton.textContent?.trim() === 'Connect') {
                  htmlButton.click();
                  console.log('Clicked a Connect button:', htmlButton);
                }
              });
            },
          });
          sendResponse({ success: true });
        } else {
          sendResponse({ success: false, error: 'No active tab found.' });
        }
      });

      return true; // Indicates asynchronous response
    }
  });
});
