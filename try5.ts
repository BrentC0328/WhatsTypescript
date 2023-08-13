const url: string = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result: HTMLElement | null = document.getElementById("definitionList");
const sound: HTMLAudioElement | null = document.getElementById("sound") as HTMLAudioElement;
const btn: HTMLElement | null = document.getElementById("search-btn");

if (btn) {
    btn.addEventListener("click", () => {
        const inpWord: string | null = (document.getElementById("defineword") as HTMLInputElement).value;
        fetch(`${url}${inpWord}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (result) {
                    result.innerHTML = `
                        <div class="word">
                            <h3>${inpWord}</h3>
                            <button onclick="playSound()">
                                <i class="fas fa-volume-up"></i>
                            </button>
                        </div>
                        <div class="details">
                            <p>${data[0].meanings[0].partOfSpeech}</p>
                            <p>/${data[0].phonetics[0].text}/</p>
                        </div>
                        <p class="word-meaning">
                            ${data[0].meanings[0].definitions[0].definition}
                        </p>
                        <p class="word-example">
                            ${data[0].meanings[0].definitions[0].example || ""}
                        </p>`;
                }
                if (sound) {
                    sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
                }
            })
            .catch(() => {
                if (result) {
                    result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
                }
            });
    });
}

function playSound() {
    if (sound) {
        sound.play();
    }
}