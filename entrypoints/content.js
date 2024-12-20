export default defineContentScript({
  matches: ["*://*.linkedin.com/*"],
  main() {
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

    // Listen for messages from the background or other parts of the extension
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === "runAutomation") {
        console.log("Received automation request:", message);

        // Prevent multiple intervals from running
        if (automationInterval !== null) {
          console.log(
            "Automation already running. Ignoring duplicate request."
          );
          sendResponse({
            success: false,
            error: "Automation already running.",
          });
          return;
        }

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

        sendResponse({ success: true });
      }
    });
  },
});
