// Hilfe von KI //
// --- Variablen & Daten ---
let aktuelleLose = [];
let gezogeneLoseHistorie = []; 
let archiv = [];

// Eine Auswahl an kräftigen Los-Farben
const losFarben = ["#ff4757", "#2e86de", "#ffa502", "#2ed573", "#1e90ff", "#ff6b81", "#8e44ad"];

// DOM Elemente (Verknüpfung zum HTML)
const addButton = document.getElementById('addButton');
const wordInput = document.getElementById('wordInput');
const meinText = document.getElementById('meinText');
const drawButton = document.querySelector('.start-btn');
const logList = document.getElementById('logList');
const basket = document.querySelector('.basket');
const saveBtn = document.querySelector('.save-btn');
const saveListNameInput = document.getElementById('saveListName');
const actualSavedLists = document.getElementById('actualSavedLists');

// --- INITIALISIERUNG BEIM LADEN DER SEITE ---
window.onload = () => {
    loadFromLocalStorage(); // Vorherige Listen aus dem Browser laden
    displayLose();
    displayArchiv();
    logList.innerHTML = ""; // Beispielliste im HTML leeren
};

// --- 1. LOSE HINZUFÜGEN & ENTFERNEN ---

addButton.addEventListener('click', () => {
    const val = wordInput.value.trim();
    if (val !== "") {
        // Farbe wird einmalig beim Erstellen festgelegt
        const neueFarbe = losFarben[Math.floor(Math.random() * losFarben.length)];
        aktuelleLose.push({ text: val, farbe: neueFarbe });
        wordInput.value = ""; // Eingabefeld leeren
        displayLose();
    }
});

function displayLose() {
    meinText.innerHTML = ""; // Liste leeren
    aktuelleLose.forEach((los, index) => {
        const li = document.createElement('li');
        li.textContent = los.text;
        li.style.backgroundColor = los.farbe;
        li.style.color = "white"; // Textfarbe immer weiß
        
        // Klick-Event zum Löschen einzelner Lose im Korb
        li.addEventListener('click', function() {
            aktuelleLose.splice(index, 1);
            displayLose();
        });
        
        meinText.appendChild(li);
    });
}

// --- 2. ZIEHUNG STARTEN (ANIMATION & HISTORIE) ---

drawButton.addEventListener('click', () => {
    if (aktuelleLose.length === 0) {
        alert("Der Korb ist leer! Bitte füge erst Lose hinzu.");
        return;
    }

    // Zufälliges Los aus dem Korb-Array nehmen
    const index = Math.floor(Math.random() * aktuelleLose.length);
    const dasLos = aktuelleLose.splice(index, 1)[0];

    // Animation im Korb auslösen
    createFlyingTicket(dasLos.farbe);

    // Korb-Anzeige aktualisieren (Los verschwindet links)
    displayLose();

    // Das gezogene Los in die Historie (für das spätere Speichern)
    gezogeneLoseHistorie.push(dasLos);

    // Rechts in der Historie anzeigen (Text weiß auf Losfarbe)
    const li = document.createElement('li');
    li.textContent = dasLos.text;
    li.style.backgroundColor = dasLos.farbe;
    li.style.color = "white";
    logList.prepend(li); // Neues Los oben hinzufügen
});

function createFlyingTicket(farbe) {
    const ticket = document.createElement('div');
    ticket.className = 'flying-ticket';
    ticket.style.backgroundColor = farbe;
    
    // Ticket in den Korb-Bereich einfügen
    basket.appendChild(ticket);

    // Nach 0.8 Sekunden (Ende der CSS Animation) wieder entfernen
    setTimeout(() => {
        ticket.remove();
    }, 800);
}

// --- 3. SPEICHERN DER GEZOGENEN LOSE (ARCHIV) ---

saveBtn.addEventListener('click', () => {
    const name = saveListNameInput.value.trim();
    
    if (name === "") {
        alert("Bitte gib einen Namen für deine Ergebnis-Liste ein!");
        return;
    }
    if (gezogeneLoseHistorie.length === 0) {
        alert("Du musst erst Lose ziehen, bevor du ein Ergebnis speichern kannst!");
        return;
    }

    // Die gezogene Historie als neue Liste im Archiv speichern
    archiv.push({
        Listenname: name,
        Liste: [...gezogeneLoseHistorie] 
    });
    
    saveToLocalStorage(); // Im Browser-Speicher sichern
    saveListNameInput.value = "";
    displayArchiv();
});

function displayArchiv() {
    actualSavedLists.innerHTML = "";
    archiv.forEach((item, index) => {
        const li = document.createElement('li');
        li.style.background = "white";
        li.innerHTML = `
            <span style="color: #333">${item.Listenname}</span>
            <div class="list-item-btns">
                <button class="mini-load-btn" onclick="loadArchivedResult(${index})">Laden</button>
                <button class="mini-delete-btn" onclick="deleteList(${index})">×</button>
            </div>
        `;
        actualSavedLists.appendChild(li);
    });
}

// --- DATEN-SICHERUNG (LOCAL STORAGE) ---

function saveToLocalStorage() {
    // Archiv-Array in JSON-String umwandeln und speichern
    localStorage.setItem('pickMySheet_Archiv', JSON.stringify(archiv));
}

function loadFromLocalStorage() {
    const savedData = localStorage.getItem('pickMySheet_Archiv');
    if (savedData) {
        archiv = JSON.parse(savedData);
    }
}

// Lädt eine gespeicherte Ergebnis-Liste zurück in die rechte Historie-Anzeige
window.loadArchivedResult = function(index) {
    const archivierteListe = archiv[index].Liste;
    logList.innerHTML = ""; 
    gezogeneLoseHistorie = [...archivierteListe]; 

    gezogeneLoseHistorie.forEach(los => {
        const li = document.createElement('li');
        li.textContent = los.text;
        li.style.backgroundColor = los.farbe;
        li.style.color = "white";
        logList.prepend(li);
    });
};

window.deleteList = function(index) {
    if(confirm("Möchtest du diese gespeicherte Liste wirklich löschen?")) {
        archiv.splice(index, 1);
        saveToLocalStorage();
        displayArchiv();
    }
};