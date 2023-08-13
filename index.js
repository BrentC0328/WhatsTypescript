"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import stylesheets
require("./style.css");
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Loaded");
    const form = document.querySelector('#defineform');
    if (form) {
        form.onsubmit = () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("form submitted");
            const formData = new FormData(form);
            const word = formData.get('defineword');
            console.log(word);
            const response = yield fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (response.ok) {
                const data = yield response.json();
                console.log(data);
                const theDefinition = HTMLUListElement = document.querySelector('#definitionList');
                console.log(theDefinition);
                update(theDefinition);
            }
            else {
                console.error('API request failed');
            }
            return false;
        });
    }
});
function update(word) {
    const main = document.querySelector('.container');
    const listItems = `<li>${word}</li>`;
    console.log(listItems);
    const list = document.createElement('ul');
    list.className = 'list-unstyled';
    list.id = 'definitionList';
    list.innerHTML = listItems;
    main.innerHTML = ''; // Clear previous content
    main.appendChild(list);
}
