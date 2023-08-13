// Import stylesheets
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#defineform') as HTMLFormElement;
  const main = document.querySelector('.container') as HTMLDivElement;

  form.onsubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const word = formData.get('defineword') as string;

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (response.ok) {
        const data = await response.json();
        const theDefinition = data[0].meanings[0].definitions[0].definition;
        update(main, theDefinition);
      } else {
        console.error('API request failed');
      }
    } catch (error) {
      console.error('Error fetching definition:', error);
    }
  };
});

function update(container: HTMLDivElement, word: string) {
  const listItems = `<li>${word}</li>`;
  const list = document.createElement('ul');
  list.className = 'list-unstyled';
  list.innerHTML = listItems;

  container.innerHTML = ''; // Clear previous content
  container.appendChild(list);
}