export default defineBackground(() => {
  console.log("Background script running!");

  // Listen for messages from the popup or other parts of the extension
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "runAutomation") {
      console.log("Received automation request:", message);

      // Get the active tab
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        if (activeTab?.id) {
          // Check if chrome.scripting is available
          if (!chrome.scripting) {
            console.error(
              "chrome.scripting API is unavailable. Check your permissions or browser compatibility."
            );
            sendResponse({
              success: false,
              error: "chrome.scripting API is unavailable.",
            });
            return;
          }

          // Inject the content script into the active tab
          chrome.scripting
            .executeScript({
              target: { tabId: activeTab.id },
              files: ["content.js"], // Inject content.js (compiled from content.ts)
            })
            .then(() => {
              console.log("Content script injected successfully.");
              sendResponse({ success: true });
            })
            .catch((error) => {
              console.error("Failed to inject content script:", error);
              sendResponse({ success: false, error: error.message });
            });
        } else {
          console.error("No active tab found or invalid tab ID.");
          sendResponse({ success: false, error: "No active tab found." });
        }
      });

      return true; // Indicates asynchronous response
    }
  });
});
