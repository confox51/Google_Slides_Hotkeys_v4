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

// Function to cleanup UI
function cleanup() {
    popup.classList.remove('show');
}

function handleKeyPress(event) {
    console.log(event);
    switch(event.key.toLowerCase()) {
        case 'l':
            console.log('L pressed');
            let leftAlignButton = document.querySelector('[aria-label="Left l"]')?.parentElement?.parentElement;
            if (leftAlignButton) {
                console.log('found');
                console.log(leftAlignButton);
                leftAlignButton.focus();
                leftAlignButton.dispatchEvent(createMouseEvent('mousedown', leftAlignButton));
                leftAlignButton.dispatchEvent(createMouseEvent('mouseup', leftAlignButton));
            } else {
                console.log('not found');
                const arrangeButton = document.querySelector('#sketchy-arrange-menu');
                console.log(arrangeButton);
                arrangeButton.focus();
                arrangeButton.dispatchEvent(createMouseEvent('mousedown', arrangeButton));
                arrangeButton.dispatchEvent(createMouseEvent('mouseup', arrangeButton));
                const alignButton = document.querySelector('[aria-label="Align a"]')?.parentElement;
                console.log(alignButton);
                alignButton.focus();
                alignButton.dispatchEvent(createMouseEvent('mousedown', alignButton));
                alignButton.dispatchEvent(createMouseEvent('mouseup', alignButton));
                leftAlignButton = document.querySelector('[aria-label="Left l"]')?.parentElement?.parentElement;
                console.log(leftAlignButton);
                leftAlignButton.focus();
                leftAlignButton.dispatchEvent(createMouseEvent('mousedown', leftAlignButton));
                leftAlignButton.dispatchEvent(createMouseEvent('mouseup', leftAlignButton));
            }
            cleanup();
            break;
    }
}
// Function to show popup with timeout
function showPopup() {
    console.log('Showing alignment popup');
    popup.classList.add('show');
    popup.focus();
    popup.addEventListener('keydown', handleKeyPress);
    // Hide popup after 2 seconds
    setTimeout(() => {
        cleanup();
    }, 2000);
}

// Function to create a mouse event
const createMouseEvent = (type, element) => {
    const rect = element.getBoundingClientRect();
    return new MouseEvent(type, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2,
        button: 0,
        buttons: 1
    });
};
// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Message received:', message.action);
    
    if (message.action === 'showPopup') {
        showPopup();
    };
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