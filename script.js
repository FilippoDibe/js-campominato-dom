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
    // Genera quadratini con numeri da 1 al numero massimo
    for (var i = 1; i <= numeroMassimo; i++) {
        var quadrato = document.createElement("div");
        quadrato.className = "square";
        quadrato.textContent = i;
        container.appendChild(quadrato);
        // funzione per il click dei quadrati che stampa in console
        quadrato.addEventListener("click", function() {
            // this.style.backgroundColor = "lightblue";
            console.log("Cella cliccata: " + this.textContent);
        });

        if (i % casellePerRiga === 0) {
            container.appendChild(document.createElement("br"));
        }
    }

    // Mostra il container
    container.style.display = "block";

    // Puoi fare ulteriori azioni in base alla modalità selezionata
    alert("Modalità selezionata: " + modalita);
}

