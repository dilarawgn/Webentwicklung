let addButton= document.getElementById('addButton');
console.log(addButton);
addButton.addEventListener('click', sayHello);

function sayHello() {
  console.log('Hallo');
  addButton.textContent = "Hinzugügen";
  console.log(addButton.id);
    const input = document.getElementById('wordInput');
    console.log(input.value);
    const Textfeld = document.getElementById('meinText');
    Textfeld.textContent += input.value;
}