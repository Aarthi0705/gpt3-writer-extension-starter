// Declare new function
const insert = (content) => {
    const elements = document.getElementsByClassName('droid');
  
    if (elements.length === 0) {
      return false;
    }
  
    const element = elements[0];
  
    // Grab the first p tag so we can replace it with our injection
    const pToRemove = element.childNodes[0];
    pToRemove.remove();
  
    // Split content by \n
    const splitContent = content.split('\n');
  
    // Wrap in p tags and insert into HTML one at a time
    splitContent.forEach((content) => {
      const p = document.createElement('p');
  
      if (content === '') {
        const br = document.createElement('br');
        p.appendChild(br);
      } else {
        p.textContent = content;
      }
  
      element.appendChild(p);
    });
  
    // On success return true
    return true;
  };
  
  // This is the message listener
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'inject') {
      const { content } = request;
  
      // Call the insert function
      const result = insert(content);
  
      // If something went wrong, send a failed status
      if (!result) {
        sendResponse({ status: 'failed' });
      }
  
      // Send a success status
      sendResponse({ status: 'success' });
    }
  });
  