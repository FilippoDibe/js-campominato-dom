// campo minato :
// 1- creo i bottoni con le selezione delle modalita 
//     selezione opzione 1 --> griglia grande 
//     selezione opzione 2 --> griglia piu grando 
// 2- le varie selezioni fanno venire fuori una griglia diversa



function generaGriglia() {
    // Leggi la selezione dell'utente
    var modalita = document.getElementById("modalita").value;

    // Trova il container
    var container = document.getElementById("container");

    // Determina il numero massimo per la modalità selezionata
    var numeroMassimo;
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
    // punteggio di partenza 
    let punteggio = 0;
    // Genera quadratini con numeri da 1 al numero massimo
    for (let i = 1; i <= numeroMassimo; i++) {
        let quadrato = document.createElement("div");
        quadrato.className = "square";
        quadrato.textContent = i;
        container.appendChild(quadrato);
        // funzione per il click dei quadrati che stampa in console
       
            quadrato.addEventListener("click", function() {
                if(arrayBombe.includes(parseInt(this.textContent))){
                    // se e solo se e una bomba 
                    this.className="square bomba"
                    gameEnd(false, punteggio);
                }else {
                    // se e solo se non è una bomba 
                    this.removeEventListener("click", arguments.callee);
                    punteggio++;
                    if(punteggio === numeroMassimo - arrayBombe.length){
                        // vinci solo se tocchi tutte le caselle trenne le bombe 
                        gameEnd(true, punteggio);
                    }
                }
            })(quadrato);
        
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
function bombe(){
    let arrayBombe = [];
    while(arrayBombe.length<= 16){
        let casualBomba = Math.floor(Math.random()* numeroMassimo) +1;
        if(!arrayBombe.includes(casualBomba)){
            arrayBombe.push(casualBomba);
        }
    }
    return arrayBombe;
}
// funzione del fine gioco mostra punteggio o hai perso 
function gameEnd(vittoria, punteggio){
    if(vittoria){
        alert("hai vinto!! complimenti il tuo punteggio e di :"+ punteggio)
    }else{
        alert("hai perso mi dispiace il tuo punteggio e di :" + punteggio)
    }
}

