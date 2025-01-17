// Background script for the extension
console.log('Background script loaded');

// Listen for extension installation or update
chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed/updated');
    // Log available commands
    chrome.commands.getAll((commands) => {
        console.log('Available commands:', commands);
    });
});

// Listen for commands
chrome.commands.onCommand.addListener((command) => {
    console.log('Command received:', command);
    
    // Send message to content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs[0]?.id) {
            console.log('No active tab found');
            return;
        }
        
        if (command === 'start-listening') {
            console.log('Sending showPopup message');
            chrome.tabs.sendMessage(tabs[0].id, { action: 'showPopup' });
        }
    });
});