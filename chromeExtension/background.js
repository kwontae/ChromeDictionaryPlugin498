function getword(info,tab) {
  let site = "http://www.dictionary.com/browse/" + info.selectionText + "?s=t";
    chrome.tabs.create({  
      url: site
    });
  }
  chrome.contextMenus.create({
    title: "Search: %s", 
    contexts:["selection"], 
    onclick: getword,
  });