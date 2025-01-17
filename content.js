console.log('Content script loaded for Google Slides');

// Create and inject popup element
const popup = document.createElement('div');
popup.className = 'extension-popup';
popup.innerHTML = `
    <h2>Alignment Mode Active</h2>
    <p>Press a button for an action</p>
    <div class="timer-bar"></div>
`;
popup.tabIndex = 0;
document.body.appendChild(popup);

const arrangeButton = document.querySelector('#sketchy-arrange-menu');
console.log(arrangeButton);

// Function to show popup with timeout
function showPopup() {
    console.log('Showing alignment popup');
    popup.classList.add('show');
    
    popup.focus();
    popup.addEventListener('keydown', (event) => {
        console.log(event);
        if (event.key === 'a') {
            console.log('A pressed');
        }
    });
    // Hide popup after 2 seconds
    setTimeout(() => {
        cleanup();
    }, 2000);
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Message received:', message.action);
    
    if (message.action === 'showPopup') {
        showPopup();
    } else if (message.action === 'alignLeft') {
        // alignObjectsLeft();
        // testFunction();
        cleanup();
    }
});

// Function to check if Google Slides is ready
function checkGoogleSlidesReady() {
    const presentationElement = document.querySelector('#docs-editor');
    if (presentationElement) {
        console.log('Google Slides editor detected and ready');
    }
};

// Initial check
setTimeout(checkGoogleSlidesReady, 1000);

// Set up a mutation observer to detect when the editor loads
const observer = new MutationObserver((mutations) => {
    checkGoogleSlidesReady();
});

// Start observing the document body for changes
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Cleanup observer after 10 seconds
setTimeout(() => {
    observer.disconnect();
    console.log('Observer disconnected');
}, 10000);