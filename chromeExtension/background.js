function getword(info,tab) {
    chrome.tabs.create({  
      url: "popup.html"
    });
  }
  chrome.contextMenus.create({
    title: "Search: %s", 
    contexts:["selection"], 
    onclick: getword,
  });