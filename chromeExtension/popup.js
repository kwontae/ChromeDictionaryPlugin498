(function() {
    window.onload = function() {
        test("red");
        document.getElementById("checkPage").onclick = function() {
            let url = "https://od-api.oxforddictionaries.com/api/v1/entries/en/word";
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
    }

    function test(color) {
        document.getElementById("checkPage").style.backgroundColor = color;
    }

    function handleAPI(responseJSON) {
        alert(JSON.stringify(responseJSON));
    }

    function error(message) {
        alert(message);
    }
})();

