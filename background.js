// --- Background Script for API Communication ---

// --- API Endpoint ---
const API_URL = "https://6767f3e8596c3eca48a319f2.mockapi.io/analyze";

// --- Listen for Messages from Content Script ---
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "sendData") {
    try {
      // --- POST Request to Save Data ---
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(message.payload) // Send payload from content.js
      });

      const result = await response.json();
      console.log("Data saved successfully:", result);

      // Send acknowledgment back to content.js
      sendResponse({ success: true, data: result });
    } catch (error) {
      console.error("Error saving data:", error);
      sendResponse({ success: false, error: error.message });
    }
  } else if (message.action === "fetchData") {
    try {
      // --- GET Request to Fetch Data ---
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log("Fetched data:", data);

      // Send fetched data back to content.js
      sendResponse({ success: true, data });
    } catch (error) {
      console.error("Error fetching data:", error);
      sendResponse({ success: false, error: error.message });
    }
  }

  return true; // Indicate async response
});
