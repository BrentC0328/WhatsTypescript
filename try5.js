var url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
var result = document.getElementById("definitionList");
var sound = document.getElementById("sound");
var btn = document.getElementById("search-btn");
if (btn) {
    btn.addEventListener("click", function () {
        var inpWord = document.getElementById("defineword").value;
        fetch("".concat(url).concat(inpWord))
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log(data);
            if (result) {
                result.innerHTML = "\n                        <div class=\"word\">\n                            <h3>".concat(inpWord, "</h3>\n                            <button onclick=\"playSound()\">\n                                <i class=\"fas fa-volume-up\"></i>\n                            </button>\n                        </div>\n                        <div class=\"details\">\n                            <p>").concat(data[0].meanings[0].partOfSpeech, "</p>\n                            <p>/").concat(data[0].phonetics[0].text, "/</p>\n                        </div>\n                        <p class=\"word-meaning\">\n                            ").concat(data[0].meanings[0].definitions[0].definition, "\n                        </p>\n                        <p class=\"word-example\">\n                            ").concat(data[0].meanings[0].definitions[0].example || "", "\n                        </p>");
            }
            if (sound) {
                sound.setAttribute("src", "https:".concat(data[0].phonetics[0].audio));
            }
        })
            .catch(function () {
            if (result) {
                result.innerHTML = "<h3 class=\"error\">Couldn't Find The Word</h3>";
            }
        });
    });
}
function playSound() {
    if (sound) {
        sound.play();
    }
}
