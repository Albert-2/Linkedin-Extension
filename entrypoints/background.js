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

          // Inject the content script into the active tab (directly embedded here)
          chrome.scripting
            .executeScript({
              target: { tabId: activeTab.id },
              func: () => {
                console.log("LinkedIn Automation Script Running.");

                // Track interval ID to prevent overlapping intervals
                let automationInterval = null;

                // Function to click all visible "Connect" buttons
                const clickConnectButtons = () => {
                  const buttons = document.querySelectorAll("button");
                  buttons.forEach((button) => {
                    if (button.textContent?.trim() === "Connect") {
                      button.click();
                      console.log("Clicked a Connect button:", button);
                    }
                  });
                };

                // Function to handle modals (e.g., "Send now" in popups)
                const handleModals = () => {
                  const modalButton = document.querySelector(
                    'button[aria-label="Send now"]'
                  );
                  if (modalButton) {
                    modalButton.click();
                    console.log("Clicked Send Now button");
                  }
                };

                // Start the periodic automation
                automationInterval = setInterval(() => {
                  try {
                    clickConnectButtons();
                    handleModals();
                  } catch (error) {
                    console.error("Error during automation:", error);
                  }
                }, 3000);

                // Stop the script when navigating away
                window.addEventListener("beforeunload", () => {
                  if (automationInterval !== null) {
                    clearInterval(automationInterval);
                    automationInterval = null;
                    console.log("Stopped LinkedIn Automation Script.");
                  }
                });
              },
            })
            .then(() => {
              console.log("Content script injected and running.");
              sendResponse({ success: true });
            })
            .catch((error) => {
              console.error("Failed to execute content script:", error);
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
