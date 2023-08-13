// Import stylesheets
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM Loaded");
const form: HTMLFormElement | null = document.querySelector('#defineform');

if (form) {
form.onsubmit = async () => {
 
  const formData = new FormData(form);
  const word = formData.get('defineword') as string;
  

  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  if(response.ok){
    const data = await response.json();

    const theDefinition = HTMLUListElement = document.querySelector('#definitionList');
   
    update(theDefinition); }
    else { 
      console.error('API request failed'); 
    }
    return false;
    
  } } } ) 









function update(word: string){
  const main = document.querySelector('.container') as HTMLDivElement;
  const listItems =  `<li>${word}</li>`;
  console.log(listItems);

  const list = document.createElement('ul');
  list.className = 'list-unstyled';
  list.id = 'definitionList';
  list.innerHTML = listItems;
  
  main.innerHTML = ''; // Clear previous content
  main.appendChild(list);
}


