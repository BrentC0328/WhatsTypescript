// Import stylesheets
import './style.css';


const form: HTMLFormElement = document.querySelector('#defineform');


form.onsubmit = async () => {
  const formData = new FormData(form);
  const word = formData.get('defineword') as string;

  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  if(response.ok){
    const data = await response.json();
    const theDefinition = "chicken nuggets";

    update(theDefinition); }
    else { 
      console.error('API request failed'); 
    }
    return false;
  }








const main = document.querySelector('.container') as HTMLDivElement;

function update(word: string){

  const listItems =  '<li>${word}</li>';

  const list = document.createElement('ul');
  list.className = 'list-unstyled';
  list.innerHTML = listItems;
  
  main.innerHTML = ''; // Clear previous content
  main.appendChild(list);
}


