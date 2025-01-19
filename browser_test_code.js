// test code for the browser action
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