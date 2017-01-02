chrome.commands.onCommand.addListener(command => {
  console.log('Command: ', command);

  if (command === 'save-window-state') {
    SaveWindowState();  
  }
});

function SaveWindowState() {
  chrome.windows.getLastFocused({populate: true}, window => {
    const urls = window.tabs.map(tab => tab.url);
    const tabData = {
      url: chrome.extension.getURL('popup.html'),
      active: false
    };

    chrome.tabs.create(tabData, tab => {
      const h = 300;
      const w = 1000;
      chrome.windows.create({
        tabId: tab.id,
        type: 'popup',
        focused: true,
        height: h,
        width: w,
        left: Math.round((screen.availWidth/2)-(w/2)),
        top: Math.round((screen.availHeight/2)-(h/2))
      }); 
    });
  });
}
