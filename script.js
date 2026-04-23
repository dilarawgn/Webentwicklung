let addButton= document.getElementById('addButton');
console.log(addButton);
addButton.addEventListener('click', sayHello);

function sayHello() {
  console.log('Hallo');
  addButton.textContent = "Hinzugügen";
  console.log(addButton.id);
    const input = document.getElementById('wordInput'); // Zugriff auf Inputfeld
    console.log(input.value);

    aktuelleLose.push( input.value)
    displayLose();
}

let aktuelleLose = [ "Staubsaugen", "Wäsche waschen",]
  console.log(aktuelleLose);
  displayLose();
  storeData();

  function displayLose(){
    const Losfeld = document.getElementById('meinText');
    Losfeld.innerHTML = "";
    for (let los of aktuelleLose){
      Losfeld.innerHTML += "<li>"+los+"</li>"
    }
  }

let Archiv = [ {Listenname: "To Do's", Liste:[ "Staubsaugen", "Wäsche waschen",]},
{Listenname: "Uni Aufgaben", Liste:[ "AV Video hochladen", "Webentwicklung abgeben",]},
{Listenname: "Eisauswahl", Liste: [ "Schokolade", "Vanillie", "Erdbeere", "Mango"]},
{Listenname: "Aktivitäten", Liste: [ "Wandern gehen", "Schwimmbad", "Freizeitpark", "Keramik bemalen"]}
]
