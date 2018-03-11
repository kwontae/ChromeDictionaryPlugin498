(function () {
  window.onload = function () {
    test("red");
    document.getElementById("checkPage").onclick = APICall;
  }

  function test(color) {
    document.getElementById("checkPage").style.backgroundColor = color;
  }

  function APICall(word) {
    let textArea = document.getElementById("word");
    let text = textArea.value + "";
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

  function getword(info, tab) {
    ;
    APICall(info.selectionText);
  }
  chrome.contextMenus.create({
    title: "Search: %s",
    contexts: ["selection"],
    onclick: getword,
  });
})();

