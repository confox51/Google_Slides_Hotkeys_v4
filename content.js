// ===================
// Constants & Config
// ===================
const POPUP_TIMEOUT = 2000; // Time in ms before popup disappears
const BUTTON_SELECTORS = {
    arrange: '#sketchy-arrange-menu',
    align: '[aria-label="Align a"]',
    alignLeft: '[aria-label="Left l"]',
    alignRight: '[aria-label="Right r"]',
    alignCenter: '[aria-label="Center c"]',
    alignTop: '[aria-label="Top t"]', 
    alignBottom: '[aria-label="Bottom b"]',
    alignMiddle: '[aria-label="Middle m"]', 
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
    const newAlignLeftButton = findButton(BUTTON_SELECTORS.alignLeft);
    return simulateClick(newAlignLeftButton);
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
    const newAlignRightButton = findButton(BUTTON_SELECTORS.alignRight);
    return simulateClick(newAlignRightButton);
}

function alignCenter() {
    // Try direct access first
    const alignCenterButton = findButton(BUTTON_SELECTORS.alignCenter);
    if (alignCenterButton) {
        return simulateClick(alignCenterButton);
    }

    // If direct access fails, go through menus
    const arrangeButton = document.querySelector(BUTTON_SELECTORS.arrange);
    if (!arrangeButton) return false;

    simulateClick(arrangeButton);
    
    const alignButton = document.querySelector(BUTTON_SELECTORS.align)?.parentElement;
    if (!alignButton) return false;
    
    simulateClick(alignButton);
    
    // Try again after menu is open
    const newAlignCenterButton = findButton(BUTTON_SELECTORS.alignCenter);
    return simulateClick(newAlignCenterButton);
}

function alignTop() {
    // Try direct access first
    const alignTopButton = findButton(BUTTON_SELECTORS.alignTop);
    if (alignTopButton) {
        return simulateClick(alignTopButton);
    }

    // If direct access fails, go through menus
    const arrangeButton = document.querySelector(BUTTON_SELECTORS.arrange);
    if (!arrangeButton) return false;

    simulateClick(arrangeButton);
    
    const alignButton = document.querySelector(BUTTON_SELECTORS.align)?.parentElement;
    if (!alignButton) return false;
    
    simulateClick(alignButton);
    
    // Try again after menu is open
    const newAlignTopButton = findButton(BUTTON_SELECTORS.alignTop);
    return simulateClick(newAlignTopButton);
}

function alignBottom() {
    // Try direct access first
    const alignBottomButton = findButton(BUTTON_SELECTORS.alignBottom);
    if (alignBottomButton) {
        return simulateClick(alignBottomButton);
    }

    // If direct access fails, go through menus
    const arrangeButton = document.querySelector(BUTTON_SELECTORS.arrange);
    if (!arrangeButton) return false;

    simulateClick(arrangeButton);
    
    const alignButton = document.querySelector(BUTTON_SELECTORS.align)?.parentElement;
    if (!alignButton) return false;
    
    simulateClick(alignButton);
    
    // Try again after menu is open
    const newAlignBottomButton = findButton(BUTTON_SELECTORS.alignBottom);
    return simulateClick(newAlignBottomButton);
}

function alignMiddle() {
    // Try direct access first
    const alignMiddleButton = findButton(BUTTON_SELECTORS.alignMiddle);
    if (alignMiddleButton) {
        return simulateClick(alignMiddleButton);
    }

    // If direct access fails, go through menus
    const arrangeButton = document.querySelector(BUTTON_SELECTORS.arrange);
    if (!arrangeButton) return false;

    simulateClick(arrangeButton);
    
    const alignButton = document.querySelector(BUTTON_SELECTORS.align)?.parentElement;
    if (!alignButton) return false;
    
    simulateClick(alignButton);
    
    // Try again after menu is open
    const newAlignMiddleButton = findButton(BUTTON_SELECTORS.alignMiddle);
    return simulateClick(newAlignMiddleButton);
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
        case 'c':
            console.log('Center align triggered');
            alignCenter();
            cleanup();
            break;
        case 't':
            console.log('Top align triggered');
            alignTop();
            cleanup();
            break;
        case 'b':
            console.log('Bottom align triggered');
            alignBottom();
            cleanup();
            break;
        case 'm':
            console.log('Middle align triggered');
            alignMiddle();
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