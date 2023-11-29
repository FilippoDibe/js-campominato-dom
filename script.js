// campo minato :
// 1- creo i bottoni con le selezione delle modalita 
//     selezione opzione 1 --> griglia grande 
//     selezione opzione 2 --> griglia piu grando 
// 2- le varie selezioni fanno venire fuori una griglia diversa

// dichiarazione punteggio e bombe 
let punteggio=0;
let gameOn =false;
function generaGriglia() {
    // Leggi la selezione dell'utente
    let modalita = document.getElementById("modalita").value;

    // Trova il container
    let container = document.getElementById("container");

    punteggio=0;
    gameOn=true;

    // pulisce la griglia prima di crearne una nuova 
    container.innerHTML=" ";

    // Determina il numero massimo per la modalità selezionata
    let numeroMassimo;

    if (modalita === "facile") {
        numeroMassimo = 100;
    } else if (modalita === "medio") {
        numeroMassimo = 81;
    } else if (modalita === "difficile") {
        numeroMassimo = 49;
    }
    // determina il numero di caselle 
    let casellePerRiga;
    if (modalita === "facile") {
        casellePerRiga = 10;
    } else if (modalita === "medio") {
        casellePerRiga = 9;
    } else if (modalita === "difficile") {
        casellePerRiga = 7;
    }
    // calcolo il numero di righe 
    let nRighe=Math.ceil(numeroMassimo / casellePerRiga);

    // genera casualmente le bombe 
    let newBombe = bombe(numeroMassimo);
 
    if(gameOn){
        let quadrati = document.querySelectorAll(".square");
        quadrati.forEach(quadrato => {
            quadrato.addEventListener("click", function(){
                gestisciClick(this, newBombe)
            });
        });
    }

    let arrayBombe = bombe(numeroMassimo);
    // Genera quadratini con numeri da 1 al numero massimo
    for (let i = 1; i <= numeroMassimo; i++) {
        let quadrato = document.createElement("div");
        quadrato.className = "square";
        quadrato.textContent = i;
        // container.appendChild(quadrato);
        // funzione per il click dei quadrati che stampa in console
       
            quadrato.addEventListener("click", function() {
                gestisciClick(this, arrayBombe);
            });
        
        container.appendChild(quadrato);
        
        if (i % casellePerRiga === 0) {
            container.appendChild(document.createElement("br"));
        }
    }
    

    // Mostra il container
    container.style.display = "block";

    // Puoi fare ulteriori azioni in base alla modalità selezionata
    alert("Modalità selezionata: " + modalita);
}

// funzione che crea gestisce le bombe e le posizione in un array 
function bombe(numeroMassimo){
    let arrayBombe = [];
    while(arrayBombe.length<= 16){
        let casualBomba = Math.floor(Math.random()* numeroMassimo) +1;
        if(!arrayBombe.includes(casualBomba)){
            arrayBombe.push(casualBomba);
        }
    }
    return arrayBombe;
}


function gestisciClick(quadrato, arrayBombe){
    // controlla se il gioco e ancora in corso 
// gameOn deve essere true.
// la classe "bomba" non deve essere presente nel quadrato.
// il dataset cliccato deve essere false (indicando che la cella non è stata cliccata in precedenza).
    if(!gameOn || quadrato.classList.contains("bomba")||quadrato.dataset.cliccato){
        return;
    }
    quadrato.dataset.cliccato =true;
    if(arrayBombe.includes(parseInt(quadrato.textContent))){
        // se e solo se e una bomba 
        quadrato.className="square bomba"
        gameOn =false;
        gameEnd(false, punteggio);
    }else {
        // se e solo se non è una bomba 
        // se non è una bomba
         quadrato.style.backgroundColor = "lightblue";
         punteggio++;
            if (punteggio === numeroMassimo - arrayBombe.length) {
                // Se non ci sono più bombe, hai vinto
                // Imposta il flag del gioco come non attivo
                gameOn = false;
                gameEnd(true, punteggio);
            }
        }
    wiewPunteggio(punteggio);
 }


// funzione per mostrare il punteggio in pagina 

function wiewPunteggio(punteggio){
    let punteggioDove= document.getElementById("punteggio").innerHTML= "punteggio : "+ punteggio;
}