(function () {
  window.onload = function () {
    document.getElementById("checkPage").onclick = APICall;
  }

  export function APICall(word) {
    let textArea = document.getElementById("word");
    let text = "";
    if (word) {
      text = word;
    } else {
      text = textArea.value + "";
    }
    let url = "http://api.pearson.com/v2/dictionaries/wordwise/entries?headword=" + text.toLowerCase();
    fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'default'
    })
      .then(response => {
        return response.json();
      })
      .then(definitionData => {
        handleAPI(definitionData.results);
      })
      .catch((errormsg) => {
        error(errormsg);
      })
  }

  function handleAPI(responseJSON) {
    let def = document.getElementById("definition");
    def.innerHTML = "<pre>";
    for (var i = 0; i < responseJSON.length; i++) {
      let obj = responseJSON[i];
      let headword = obj.headword;
      let definition = obj.senses[0].definition;
      let partOfSpeech = obj.part_of_speech;
      if (partOfSpeech) {
        def.innerHTML += ("Word: " + headword + "<br />" + "Part of Speech: " + partOfSpeech + "<br />" + "Definition: " + definition + "<br />");
      } else {
        def.innerHTML += ("Word: " + headword + "<br />" + "Definition: " + definition + "<br />");
      }
    }
    def.innerHTML += "</pre>";
  }

  function error(message) {
    alert(message);
  }

  // chrome.contextMenus.create({
  //   title: "Search: %s",
  //   contexts: ["selection"],
  //   onclick: getword
  // });

  // function getword(info, tab) {
  //   chrome.tabs.create({
  //     url: "popup.html",
  //   });
  //   // APICall(info.selectionText);
  // }
  // function getword(info,tab) {
  //   console.log("Word " + info.selectionText + " was clicked.");
  //   chrome.windows.create({'url': 'popup.html', 'type': 'popup'}, function(window) {
  //   });          
  // }
  // chrome.contextMenus.create({
  //   title: "Search: %s", 
  //   contexts:["selection"], 
  //   onclick: getword,
  // });
})();

