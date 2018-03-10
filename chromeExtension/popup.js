(function() {
    window.onload = function() {
        test("red");
        document.getElementById("checkPage").onclick = APICall;
    }

    function test(color) {
        document.getElementById("checkPage").style.backgroundColor = color;
    }

    function APICall(word) {
        let textArea = document.getElementById("word");
        let url = "https://od-api.oxforddictionaries.com/api/v1/entries/en/" + textArea.value;
            fetch(url, {
                credentials: 'include', 
                headers: {
                  'app_id': '6ee4c4be',
                  'app_key': 'ab20d491303fd365a2f9e02a527580e6'
                },
              })
              .then(handleAPI)
              .catch(error)
    }

    function handleAPI(responseJSON) {
        alert(JSON.stringify(responseJSON));
        document.getElementById("definition").value = "";
        document.getElementById("definition").value = JSON.stringify(responseJSON);
    }

    function error(message) {
        alert(message);
    }

    function getword(info,tab) {;
        APICall(info.selectionText);         
    }
    chrome.contextMenus.create({
        title: "Search: %s", 
        contexts:["selection"], 
        onclick: getword,
      });
})();

