document.addEventListener("DOMContentLoaded", function () {
    var container = document.querySelector(".container");
    var searchInput = container === null || container === void 0 ? void 0 : container.querySelector("input");
    var volume = container === null || container === void 0 ? void 0 : container.querySelector(".word i");
    var lead = container === null || container === void 0 ? void 0 : container.querySelector(".lead");
    var synonyms = container === null || container === void 0 ? void 0 : container.querySelector(".synonyms .list");
    var removeIcon = container === null || container === void 0 ? void 0 : container.querySelector(".search span");
    var audio;
    function data(result, word) {
        if (result.title) {
            lead.innerHTML = "Can't find word meaning <span>\"".concat(word, "\"</span>");
        }
        else {
            container === null || container === void 0 ? void 0 : container.classList.add("active");
            var definitions = result[0].meanings[0].definitions[0]; // Corrected the path to definitions
            var phonetics = "".concat(result[0].meanings[0].partOfSpeech, "  /").concat(result[0].phonetics[0].text, "/"); // Corrected the path to partOfSpeech
            document.querySelector("#definitionList").innerText = result[0].word; // Corrected the selector
            document.querySelector(".word span").innerText = phonetics;
            document.querySelector(".meaning span").innerText = definitions.definition;
            document.querySelector(".example span").innerText = definitions.example;
            audio = new Audio(result[0].phonetics[0].audio);
            if (!definitions.synonyms || definitions.synonyms.length === 0) { // Corrected the condition
                synonyms.parentElement.style.display = "none";
            }
            else {
                synonyms.parentElement.style.display = "block";
                synonyms.innerHTML = "";
                for (var i = 0; i < definitions.synonyms.length && i < 5; i++) { // Corrected the loop condition
                    var tag = "<span onclick=\"search('".concat(definitions.synonyms[i], "')\">").concat(definitions.synonyms[i], "</span>");
                    synonyms.insertAdjacentHTML("beforeend", tag);
                }
            }
        }
    }
    function search(word) {
        fetchApi(word);
        searchInput.value = word;
    }
    function fetchApi(word) {
        container.classList.remove("active");
        lead.style.color = "#000";
        lead.innerHTML = "Searching the meaning of <span>\"".concat(word, "\"</span>");
        var url = "https://api.dictionaryapi.dev/api/v2/entries/en/".concat(word);
        fetch(url).then(function (response) { return response.json(); }).then(function (result) { return data(result, word); }).catch(function () {
            lead.innerHTML = "Can't find the meaning of <span>\"".concat(word, "\"</span>. Please, try to search for another word.");
        });
    }

    document.querySelector("#defineform").addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the default form submission behavior

        var word = searchInput.value.trim();
        if (word) {
            fetchApi(word);
        }
    }); 
    
    volume.addEventListener("click", function () {
        volume.style.color = "#4D59FB";
        audio.play();
        setTimeout(function () {
            volume.style.color = "#999";
        }, 800);
    });
    removeIcon.addEventListener("click", function () {
        searchInput.value = "";
        searchInput.focus();
        container.classList.remove("active"); // Corrected the class name
        lead.style.color = "#9A9A9A"; // Corrected the class name
        lead.innerHTML = "Type any existing word and press enter to get meaning, example, synonyms, etc."; // Corrected the class name
    });
});
