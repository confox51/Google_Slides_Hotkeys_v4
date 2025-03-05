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
    <p>Press a key:</p>
    <ul class="shortcut-list">
        <li><strong>L</strong> - Left align</li>
        <li><strong>R</strong> - Right align</li>
        <li><strong>C</strong> - Center align</li>
        <li><strong>T</strong> - Top align</li>
        <li><strong>B</strong> - Bottom align</li>
        <li><strong>M</strong> - Middle align</li>
        <li><strong>W</strong> - Change width</li>
    </ul>
    <div class="timer-bar"></div>
`;
popup.tabIndex = 0;
document.body.appendChild(popup);

// Create width input popup (hidden by default)
const widthPopup = document.createElement('div');
widthPopup.className = 'extension-popup width-popup';
widthPopup.innerHTML = `
    <h2>Width</h2>
    <div class="input-container">
        <input type="number" id="width-input" step="0.1" min="0.01" placeholder="Enter width in inches">
        <span class="unit">in</span>
    </div>
    <div class="apply-mode">
        <p class="small-text">Apply to:</p>
        <label class="radio-label">
            <input type="radio" name="apply-mode" value="group" checked> All objects as a group
        </label>
        <label class="radio-label">
            <input type="radio" name="apply-mode" value="individual"> Each object individually
        </label>
    </div>
    <p class="small-text">Press Enter to apply</p>
    <div id="width-status" class="status-message"></div>
`;
widthPopup.tabIndex = 0;
document.body.appendChild(widthPopup);

// ===================
// UI Utilities
// ===================
function cleanup() {
    popup.classList.remove('show');
}

function cleanupWidthPopup() {
    widthPopup.classList.remove('show');
    widthPopup.removeEventListener('keydown', handleWidthInputKeyPress);
    const widthInput = document.getElementById('width-input');
    if (widthInput) {
        widthInput.value = '';
    }
    updateWidthStatus('');
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
        case 'w':
            console.log('Width adjustment triggered');
            showWidthInputPopup();
            // We don't clean up here as we want to switch to the width popup
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
    
    // Clear any existing timeout
    if (window.popupTimeoutId) {
        clearTimeout(window.popupTimeoutId);
    }
    
    // Set a new timeout
    window.popupTimeoutId = setTimeout(() => {
        cleanup();
        // popup.removeEventListener('keydown', handleKeyPress);
    }, POPUP_TIMEOUT);
}

function showWidthInputPopup() {
    console.log('Showing width input popup');
    
    // Hide the alignment popup
    cleanup();
    
    // Show width popup
    widthPopup.classList.add('show');
    
    // Reset status message
    updateWidthStatus('');
    
    // Focus the input field
    setTimeout(() => {
        const widthInput = document.getElementById('width-input');
        widthInput.focus();
    }, 50);
    
    // Add event listener for keydown
    widthPopup.addEventListener('keydown', handleWidthInputKeyPress);
}

function handleWidthInputKeyPress(event) {
    console.log('Key pressed in width input popup:', event.key);
    
    if (event.key === 'Enter') {
        const widthInput = document.getElementById('width-input');
        const widthValue = widthInput.value;
        console.log('Width value:', widthValue);
        
        if (!widthValue || isNaN(parseFloat(widthValue))) {
            updateWidthStatus('Please enter a valid number', 'error');
            return;
        }
        
        // Get the apply mode from the radio buttons
        const applyModeRadios = widthPopup.querySelectorAll('input[name="apply-mode"]');
        let applyMode;
        applyModeRadios.forEach(radio => {
            if (radio.checked) {
                applyMode = radio.value;
            }
        });
        
        // Show loading status
        updateWidthStatus('Applying width...', 'loading');
        
        // Apply the width to the selected element
        changeElementWidth(widthValue, applyMode);
        
        // We don't clean up here as the changeElementWidth function will handle it
    } else if (event.key === 'Escape') {
        // Allow closing without applying changes
        cleanupWidthPopup();
    }
}

// Function to update status message in width popup
function updateWidthStatus(message, type = '') {
    const statusElement = document.getElementById('width-status');
    if (statusElement) {
        statusElement.textContent = message;
        statusElement.className = 'status-message';
        if (type) {
            statusElement.classList.add(type);
        }
    }
}

// ===================
// Width Change Action
// ===================
function changeElementWidth(width, applyMode) {
    console.log('Changing width to:', width);
    
    if (applyMode === 'group') {
        // First, try to find the width input field directly
        let widthInput = document.querySelector('[aria-label="Width, measured in inches. Value must be between 0.01 and 58712"]');
        
        // If width input is not found, we need to open the Format Options panel
        if (!widthInput) {
            updateWidthStatus('Opening format options...', 'loading');
            console.log('Width input field not found, opening Format Options');
            
            // Try to find and click the Format Options button
            const formatOptionsButton = document.querySelector('[aria-label="Format options"]');
            if (!formatOptionsButton) {
                console.error('Format Options button not found, trying Format menu');
                updateWidthStatus('Trying alternative method...', 'loading');
                
                // Try alternative approach via Format menu
                return openFormatMenuAndSetWidth(width);
            }
            
            // Click the Format Options button
            simulateClick(formatOptionsButton);
            
            // Use a retry mechanism to find the width input after the panel opens
            let retryCount = 0;
            const maxRetries = 10;
            const retryInterval = 100; // ms
            
            const findWidthInputAndApply = () => {
                retryCount++;
                console.log(`Attempt ${retryCount} to find width input`);
                updateWidthStatus(`Looking for width input (${retryCount}/${maxRetries})...`, 'loading');
                
                // Try to find the Size & Position section if it's not already open
                const sizePositionSection = Array.from(document.querySelectorAll('.goog-zippy-header')).find(
                    el => el.textContent.includes('Size & Position')
                );
                
                if (sizePositionSection && !sizePositionSection.parentElement.classList.contains('goog-zippy-expanded')) {
                    simulateClick(sizePositionSection);
                }
                
                // Try to find the width input again
                widthInput = document.querySelector('[aria-label="Width, measured in inches. Value must be between 0.01 and 58712"]');
                
                if (widthInput) {
                    console.log('Width input found, applying value');
                    updateWidthStatus('Width input found!', 'success');
                    applyWidthValue(widthInput, width);
                    return true;
                } else if (retryCount < maxRetries) {
                    // Try again after a short delay
                    setTimeout(findWidthInputAndApply, retryInterval);
                    return true;
                } else {
                    console.error('Width input field not found after maximum retries, trying Format menu');
                    updateWidthStatus('Trying alternative method...', 'loading');
                    // Try alternative approach via Format menu
                    return openFormatMenuAndSetWidth(width);
                }
            };
            
            // Start the retry process
            setTimeout(findWidthInputAndApply, retryInterval);
            return true;
        }
        
        // If we found the width input directly, apply the width value immediately
        updateWidthStatus('Width input found!', 'success');
        return applyWidthValue(widthInput, width);
    } else if (applyMode === 'individual') {
        // Check if multiple objects are selected
        const multipleSelectionIndicator = document.querySelector('.docs-material-menu-button-flat-default-caption');
        const isMultipleSelection = multipleSelectionIndicator && multipleSelectionIndicator.textContent.includes('objects');
        
        if (isMultipleSelection) {
            console.log('Multiple objects detected, applying width to each individually');
            updateWidthStatus('Applying width to multiple objects...', 'loading');
            
            // Store the current selection state by taking a screenshot of the current state
            // We'll use this to reselect everything later
            
            // First, deselect everything by clicking on an empty area of the slide
            // Find the slide canvas
            const slideCanvas = document.querySelector('.punch-viewer-content');
            if (slideCanvas) {
                // Click in a likely empty area (top-left corner)
                const emptyAreaClick = new MouseEvent('mousedown', {
                    bubbles: true,
                    cancelable: true,
                    clientX: 10,
                    clientY: 10,
                    button: 0
                });
                slideCanvas.dispatchEvent(emptyAreaClick);
                slideCanvas.dispatchEvent(new MouseEvent('mouseup', {
                    bubbles: true,
                    cancelable: true,
                    clientX: 10,
                    clientY: 10,
                    button: 0
                }));
                
                // Now we need to find all objects on the slide
                // This is challenging without direct API access, but we can try to find them through the UI
                
                // Get all selectable elements on the slide
                // This selector might need adjustment based on the actual DOM structure
                const selectableElements = document.querySelectorAll('.punch-viewer-svgpage-content g[aria-label]');
                
                if (selectableElements && selectableElements.length > 0) {
                    console.log(`Found ${selectableElements.length} potential objects to resize`);
                    
                    // Process each element one by one
                    let processedCount = 0;
                    
                    const processNextElement = (index) => {
                        if (index >= selectableElements.length) {
                            // All elements processed, show success message
                            updateWidthStatus(`Width applied to ${processedCount} objects!`, 'success');
                            setTimeout(cleanupWidthPopup, 2000);
                            return;
                        }
                        
                        const element = selectableElements[index];
                        
                        // Click to select this element
                        const rect = element.getBoundingClientRect();
                        if (rect.width > 0 && rect.height > 0) {
                            // Click in the center of the element
                            const selectClick = new MouseEvent('mousedown', {
                                bubbles: true,
                                cancelable: true,
                                clientX: rect.left + rect.width / 2,
                                clientY: rect.top + rect.height / 2,
                                button: 0
                            });
                            element.dispatchEvent(selectClick);
                            element.dispatchEvent(new MouseEvent('mouseup', {
                                bubbles: true,
                                cancelable: true,
                                clientX: rect.left + rect.width / 2,
                                clientY: rect.top + rect.height / 2,
                                button: 0
                            }));
                            
                            // Wait a bit for the selection to take effect
                            setTimeout(() => {
                                // Apply width to this element
                                const widthInput = document.querySelector('[aria-label="Width, measured in inches. Value must be between 0.01 and 58712"]');
                                
                                if (widthInput) {
                                    // Apply width
                                    applyWidthValue(widthInput, width);
                                    processedCount++;
                                    
                                    // Wait for the width to be applied
                                    setTimeout(() => {
                                        // Deselect by clicking in an empty area again
                                        slideCanvas.dispatchEvent(emptyAreaClick);
                                        slideCanvas.dispatchEvent(new MouseEvent('mouseup', {
                                            bubbles: true,
                                            cancelable: true,
                                            clientX: 10,
                                            clientY: 10,
                                            button: 0
                                        }));
                                        
                                        // Process the next element
                                        setTimeout(() => {
                                            updateWidthStatus(`Processing object ${index + 1}/${selectableElements.length}...`, 'loading');
                                            processNextElement(index + 1);
                                        }, 100);
                                    }, 200);
                                } else {
                                    // Width input not found, skip this element
                                    console.log(`Width input not found for element ${index}, skipping`);
                                    // Deselect and move to next
                                    slideCanvas.dispatchEvent(emptyAreaClick);
                                    slideCanvas.dispatchEvent(new MouseEvent('mouseup', {
                                        bubbles: true,
                                        cancelable: true,
                                        clientX: 10,
                                        clientY: 10,
                                        button: 0
                                    }));
                                    
                                    setTimeout(() => {
                                        updateWidthStatus(`Processing object ${index + 1}/${selectableElements.length}...`, 'loading');
                                        processNextElement(index + 1);
                                    }, 100);
                                }
                            }, 200);
                        } else {
                            // Element has no size, skip it
                            processNextElement(index + 1);
                        }
                    };
                    
                    // Start processing elements
                    processNextElement(0);
                    return true;
                } else {
                    console.error('No selectable elements found on slide');
                    updateWidthStatus('Could not find objects on slide', 'error');
                    setTimeout(cleanupWidthPopup, 2000);
                    return false;
                }
            } else {
                console.error('Slide canvas not found');
                updateWidthStatus('Slide canvas not found', 'error');
                setTimeout(cleanupWidthPopup, 2000);
                return false;
            }
        }
    }
    
    // If not multiple selection, proceed with the original logic
    // First, try to find the width input field directly
    let widthInput = document.querySelector('[aria-label="Width, measured in inches. Value must be between 0.01 and 58712"]');
    
    // If width input is not found, we need to open the Format Options panel
    if (!widthInput) {
        updateWidthStatus('Opening format options...', 'loading');
        console.log('Width input field not found, opening Format Options');
        
        // Try to find and click the Format Options button
        const formatOptionsButton = document.querySelector('[aria-label="Format options"]');
        if (!formatOptionsButton) {
            console.error('Format Options button not found, trying Format menu');
            updateWidthStatus('Trying alternative method...', 'loading');
            
            // Try alternative approach via Format menu
            return openFormatMenuAndSetWidth(width);
        }
        
        // Click the Format Options button
        simulateClick(formatOptionsButton);
        
        // Use a retry mechanism to find the width input after the panel opens
        let retryCount = 0;
        const maxRetries = 10;
        const retryInterval = 100; // ms
        
        const findWidthInputAndApply = () => {
            retryCount++;
            console.log(`Attempt ${retryCount} to find width input`);
            updateWidthStatus(`Looking for width input (${retryCount}/${maxRetries})...`, 'loading');
            
            // Try to find the Size & Position section if it's not already open
            const sizePositionSection = Array.from(document.querySelectorAll('.goog-zippy-header')).find(
                el => el.textContent.includes('Size & Position')
            );
            
            if (sizePositionSection && !sizePositionSection.parentElement.classList.contains('goog-zippy-expanded')) {
                simulateClick(sizePositionSection);
            }
            
            // Try to find the width input again
            widthInput = document.querySelector('[aria-label="Width, measured in inches. Value must be between 0.01 and 58712"]');
            
            if (widthInput) {
                console.log('Width input found, applying value');
                updateWidthStatus('Width input found!', 'success');
                applyWidthValue(widthInput, width);
                return true;
            } else if (retryCount < maxRetries) {
                // Try again after a short delay
                setTimeout(findWidthInputAndApply, retryInterval);
                return true;
            } else {
                console.error('Width input field not found after maximum retries, trying Format menu');
                updateWidthStatus('Trying alternative method...', 'loading');
                // Try alternative approach via Format menu
                return openFormatMenuAndSetWidth(width);
            }
        };
        
        // Start the retry process
        setTimeout(findWidthInputAndApply, retryInterval);
        return true;
    }
    
    // If we found the width input directly, apply the width value immediately
    updateWidthStatus('Width input found!', 'success');
    return applyWidthValue(widthInput, width);
} // Close if (applyMode === 'individual')

// Alternative approach to access width input via Format menu
function openFormatMenuAndSetWidth(width) {
    // Click on Format menu
    const formatMenu = document.querySelector('#docs-format-menu');
    if (!formatMenu) {
        console.error('Format menu not found');
        updateWidthStatus('Format menu not found', 'error');
        setTimeout(cleanupWidthPopup, 2000);
        return false;
    }
    
    simulateClick(formatMenu);
    
    // Use a retry mechanism to find and click Size & Position
    let retryCount = 0;
    const maxRetries = 10;
    const retryInterval = 100; // ms
    
    const findSizePositionAndClick = () => {
        retryCount++;
        updateWidthStatus(`Looking for Size & Position (${retryCount}/${maxRetries})...`, 'loading');
        
        // Look for Size & Position menu item
        const menuItems = Array.from(document.querySelectorAll('.goog-menuitem'));
        const sizePositionItem = menuItems.find(item => {
            const text = item.textContent || '';
            return text.includes('Size & position');
        });
        
        if (sizePositionItem) {
            simulateClick(sizePositionItem);
            updateWidthStatus('Size & Position found!', 'success');
            
            // Now try to find the width input with another retry mechanism
            let inputRetryCount = 0;
            const findWidthInput = () => {
                inputRetryCount++;
                updateWidthStatus(`Looking for width input (${inputRetryCount}/${maxRetries})...`, 'loading');
                const widthInput = document.querySelector('[aria-label="Width, measured in inches. Value must be between 0.01 and 58712"]');
                
                if (widthInput) {
                    updateWidthStatus('Width input found!', 'success');
                    applyWidthValue(widthInput, width);
                    return true;
                } else if (inputRetryCount < maxRetries) {
                    setTimeout(findWidthInput, retryInterval);
                    return true;
                } else {
                    console.error('Width input not found after opening Size & Position');
                    updateWidthStatus('Could not find width input', 'error');
                    setTimeout(cleanupWidthPopup, 2000);
                    return false;
                }
            };
            
            setTimeout(findWidthInput, retryInterval);
            return true;
        } else if (retryCount < maxRetries) {
            setTimeout(findSizePositionAndClick, retryInterval);
            return true;
        } else {
            console.error('Size & Position menu item not found');
            updateWidthStatus('Size & Position not found', 'error');
            setTimeout(cleanupWidthPopup, 2000);
            return false;
        }
    };
    
    setTimeout(findSizePositionAndClick, retryInterval);
    return true;
}

// Helper function to apply the width value to an input field
function applyWidthValue(inputElement, width) {
    // Set value and dispatch input event
    inputElement.value = width;
    inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    
    // Force focus on the input to ensure the value is applied
    inputElement.focus();
    
    // Simulate pressing Enter to apply the change
    const enterEvent = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        key: 'Enter',
        keyCode: 13
    });
    inputElement.dispatchEvent(enterEvent);
    
    // Show success message and clean up after a delay
    updateWidthStatus('Width changed successfully!', 'success');
    setTimeout(cleanupWidthPopup, 1000);
    
    return true;
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