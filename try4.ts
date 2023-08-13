document.addEventListener("DOMContentLoaded", function () {
const container = document.querySelector(".container");
let searchInput = container?.querySelector("input");
let volume = container?.querySelector(".word i");
let lead = container?.querySelector(".lead");
let synonyms = container?.querySelector(".synonyms .list");
let removeIcon = container?.querySelector(".search span");
let audio;

function data(result, word){
    if(result.title){
        lead.innerHTML = `Can't find word meaning <span>"${word}"</span>`;
    } else {
        container?.classList.add("active");
        let definitions = result[0].meanings[0].definitions[0]; // Corrected the path to definitions
        let phonetics = `${result[0].meanings[0].partOfSpeech}  /${result[0].phonetics[0].text}/`; // Corrected the path to partOfSpeech
        document.querySelector("#definitionList").innerText = result[0].word; // Corrected the selector
        document.querySelector(".word span").innerText = phonetics;
        document.querySelector(".meaning span").innerText = definitions.definition;
        document.querySelector(".example span").innerText = definitions.example;
        audio = new Audio(result[0].phonetics[0].audio);
        if(!definitions.synonyms || definitions.synonyms.length === 0){ // Corrected the condition
            synonyms.parentElement.style.display = "none";
        } else {
            synonyms.parentElement.style.display = "block";
            synonyms.innerHTML = "";
            for (let i = 0; i < definitions.synonyms.length && i < 5; i++) { // Corrected the loop condition
                let tag = `<span onclick="search('${definitions.synonyms[i]}')">${definitions.synonyms[i]}</span>`;
                synonyms.insertAdjacentHTML("beforeend", tag);
            }
        }
    }
}

function search(word){
    fetchApi(word);
    searchInput.value = word;
}

function fetchApi(word){
    container.classList.remove("active");
    lead.style.color = "#000";
    lead.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then(response => response.json()).then(result => data(result, word)).catch(() =>{
        lead.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
    });
}

searchInput.addEventListener("keyup", e =>{
    let word = e.target.value.trim();
    if(e.key === "Enter" && word){
        fetchApi(word);
    }
});

volume.addEventListener("click", ()=>{
    volume.style.color = "#4D59FB";
    audio.play();
    setTimeout(() =>{
        volume.style.color = "#999";
    }, 800);
});

removeIcon.addEventListener("click", ()=>{
    searchInput.value = "";
    searchInput.focus();
    container.classList.remove("active"); // Corrected the class name
    lead.style.color = "#9A9A9A"; // Corrected the class name
    lead.innerHTML = "Type any existing word and press enter to get meaning, example, synonyms, etc."; // Corrected the class name
});
}