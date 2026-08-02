let buchungen = JSON.parse(localStorage.getItem("buchungen")) || [];

function speichern(){

    let beschreibung = document.getElementById("beschreibung").value;
    let betrag = Number(document.getElementById("betrag").value);
    let art = document.getElementById("art").value;
    let konto = document.getElementById("konto").value;
    let datum = document.getElementById("datum").value;

    if(!beschreibung || !betrag){
        alert("Bitte Daten eingeben");
        return;
    }

    buchungen.push({
        beschreibung: beschreibung,
        betrag: betrag,
        art: art,
        konto: konto,
        datum: datum
    });

    localStorage.setItem(
        "buchungen",
        JSON.stringify(buchungen)
    );

    anzeigen();

    document.getElementById("beschreibung").value="";
    document.getElementById("betrag").value="";
}



function anzeigen(){

    let konten = {
        Girokonto:0,
        Bargeld:0,
        Sparen:0
    };

    let liste = document.getElementById("liste");

    if(!liste) return;

    liste.innerHTML="";


    buchungen.forEach(function(b){

        if(b.art === "einnahme"){
            konten[b.konto] += b.betrag;
        } else {
            konten[b.konto] -= b.betrag;
        }


        liste.innerHTML += `
        <div class="buchung">

        <b>${b.datum ? new Date(b.datum).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
}) : ""}</b>

        <br>

        ${b.beschreibung}

        <br>

        ${b.betrag.toFixed(2)} €

        </div>`;
    });


    document.getElementById("giro").innerHTML =
    konten.Girokonto.toFixed(2)+" €";

    document.getElementById("bar").innerHTML =
    konten.Bargeld.toFixed(2)+" €";

    document.getElementById("sparen").innerHTML =
    konten.Sparen.toFixed(2)+" €";


    document.getElementById("gesamt").innerHTML =
    (
        konten.Girokonto +
        konten.Bargeld +
        konten.Sparen
    ).toFixed(2)+" €";
}
    

document.getElementById("datum").value =
new Date().toISOString().split("T")[0];

anzeigen();
