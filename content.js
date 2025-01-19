// ===================
// Constants & Config
// ===================
const POPUP_TIMEOUT = 2000; // Time in ms before popup disappears
const BUTTON_SELECTORS = {
    arrange: '#sketchy-arrange-menu',
    align: '[aria-label="Align a"]',
    alignLeft: '[aria-label="Left l"]',
    alignRight: '[aria-label="Right r"]',
    alignTop: '[aria-label="Top t"]', // TODO: Check to see if this is correct
    alignBottom: '[aria-label="Bottom b"]', // TODO: Check to see if this is correct
    // Add more selectors as needed
};

// ===================
// UI Setup
// ===================
const popup = document.createElement('div');
popup.className = 'extension-popup';
popup.innerHTML = `
    <h2>Alignment Mode Active</h2>
    <p>Press a button for an action</p>
    <div class="timer-bar"></div>
`;
popup.tabIndex = 0;
document.body.appendChild(popup);

// ===================
// UI Utilities
// ===================
function cleanup() {
    popup.classList.remove('show');
}

function createMouseEvent(type, element) {
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
}

// ===================
// Button Interactions
// ===================
function simulateClick(element) {
    if (!element) return false;
    element.focus();
    element.dispatchEvent(createMouseEvent('mousedown', element));
    element.dispatchEvent(createMouseEvent('mouseup', element));
    return true;
}

function findButton(selector) {
    return document.querySelector(selector)?.parentElement?.parentElement;
}

// ===================
// Alignment Actions
// ===================
function alignLeft() {
    // Try direct access first
    const alignLeftButton = findButton(BUTTON_SELECTORS.alignLeft);
    if (alignLeftButton) {
        return simulateClick(alignLeftButton);
    }

    // If direct access fails, go through menus
    const arrangeButton = document.querySelector(BUTTON_SELECTORS.arrange);
    if (!arrangeButton) return false;

    simulateClick(arrangeButton);
    
    const alignButton = document.querySelector(BUTTON_SELECTORS.align)?.parentElement;
    if (!alignButton) return false;
    
    simulateClick(alignButton);
    
    // Try again after menu is open
    const newLeftButton = findButton(BUTTON_SELECTORS.alignLeft);
    return simulateClick(newLeftButton);
}

function alignRight() {
    // Try direct access first
    const alignRightButton = findButton(BUTTON_SELECTORS.alignRight);
    if (alignRightButton) {
        return simulateClick(alignRightButton);
    }

    // If direct access fails, go through menus
    const arrangeButton = document.querySelector(BUTTON_SELECTORS.arrange);
    if (!arrangeButton) return false;

    simulateClick(arrangeButton);
    
    const alignButton = document.querySelector(BUTTON_SELECTORS.align)?.parentElement;
    if (!alignButton) return false;
    
    simulateClick(alignButton);
    
    // Try again after menu is open
    const newRightButton = findButton(BUTTON_SELECTORS.alignRight);
    return simulateClick(newRightButton);
}

// ===================
// Event Handlers
// ===================
function handleKeyPress(event) {
    console.log('Key pressed:', event.key);
    
    switch(event.key.toLowerCase()) {
        case 'l':
            console.log('Left align triggered');
            alignLeft();
            cleanup();
            break;
        // Add more cases as needed
        case 'r':
            console.log('Right align triggered');
            alignRight();
            cleanup();
            break;
        default:
            console.log(`Unmapped key: ${event.key}`);
    }
}

function showPopup() {
    console.log('Showing alignment popup');
    popup.classList.add('show');
    popup.focus();
    popup.addEventListener('keydown', handleKeyPress);
    
    setTimeout(() => {
        cleanup();
        // popup.removeEventListener('keydown', handleKeyPress);
    }, POPUP_TIMEOUT);
}

// ===================
// Message Handling
// ===================
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Message received:', message.action);
    if (message.action === 'showPopup') {
        showPopup();
    }
});

// ===================
// Initialization
// ===================
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