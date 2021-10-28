/* eslint-disable operator-linebreak */
/* eslint-disable no-param-reassign */
/* eslint-disable no-trailing-spaces */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable no-undef */
/// ///////////////
/// //////////////
//  CONTATORE/////
/// /////////////
const daysId = document.querySelector('#days'); // Prendo l'elemento con id days
const hoursId = document.querySelector('#hours'); // Prendo l'elemento con id hours
const minutesId = document.querySelector('#minutes'); // Prendo l'elemento con id minutes
const secondsId = document.querySelector('#seconds'); // Prendo l'elemento con id seconds
let deadLine = new Date('December, 25, 2021, 07:00').getTime(); // Prendo la data e della scadenza in millisecondi

let millisecondsInADay = 1000 * 60 * 60 * 24; // Variabile con le 24H in ms
let millisecondsInAnHour = 1000 * 60 * 60; // Variabile con il valore di un ora in ms
let millisecondsInASecond = 1000 * 60; // Variabile con il valore di un minuto in ms

function remainingTime() {
    let now = new Date().getTime(); // Variabile con la data attuale in ms

    let deltaTime = deadLine - now; // Tempo rimanente in ms
    if (deltaTime > 0) {
        // Se deltaTime > 0 è true
        let days = Math.floor(deltaTime / millisecondsInADay); // Tempo rimanente fratto le 24 ore in ms e ottengo i giorni mancanti
        let hours = Math.floor(
            (deltaTime % millisecondsInADay) / millisecondsInAnHour,
        ); // Ottengo il resto del tempo rimante diviso le 24H, che saranno ore che divido per 1minuto in ms
        let minutes = Math.floor(
            (deltaTime % millisecondsInAnHour) / millisecondsInASecond,
        ); //
        let seconds = Math.floor((deltaTime % millisecondsInASecond) / 1000); //

        daysId.innerHTML = `<p class='lead textShadow'>Giorni</p><h2 class='display-3 textShadow'>${days}</h2>`; // Inserisco all'interno dell'elemento con id days questo codice
        hoursId.innerHTML = `<p class='lead textShadow'>Ore</p><h2 class='display-3 textShadow'>${hours}</h2>`; //
        minutesId.innerHTML = `<p class='lead textShadow'>Minuti</p><h2 class='display-3 textShadow'>${minutes}</h2>`; //
        secondsId.innerHTML = `<p class='lead textShadow'>Secondi</p><h2 class='display-3 textShadow'>${seconds}</h2>`; //
    } else {
        // Se deltaTime > 0 è false
        daysId.innerHTML = '<h2 class=`display-5 textShadow`>Take</h2>'; // Inserisco all'interno dell'elemento con id days questo codice
        hoursId.innerHTML = '<h2 class=`display-5 textShadow`>your</h2>'; //
        minutesId.innerHTML = '<h2 class=`display-5 textShadow`>time,</h2>'; //
        secondsId.innerHTML = '<h2 class=`display-5 textShadow`>mate</h2>'; //
    }
}
setInterval(remainingTime, 1000); // Invoco la funzione ogni secondo

/// ////////////////////////////////
/// ///////////////////////////////
/// ///////////////////////////////
// CARD CATEGORIE CON ////////////
// PIù PRODOTTI///////////////
/// ///////////////////////////
/// //////////////////////////

fetch('./data.json') // Prendo i dati dal file data //! data è un array di oggetti contenente categorie, prodotti, prezzi etc
    .then((response) => response.json()) // Trasformo in json (stringa)
    .then((data) => {
        let categories = data.map((el) => el.category_name); // Creo un array dove gli elementi son formati dalle categorie_name
        let frequencyCategories = categories.reduce((t, n) => {
            // Con il metodo reduce faccio un controllo sulle categorie (totale, (nuovo elemento))
            // eslint-disable-next-line no-unused-expressions
            t[n] ? (t[n] += 1) : (t[n] = 1); //* se nell'oggetto esiste una chiave per quell'elemento incrementalo di uno, se non esiste inseriscilo impoststo a 1
            return t;
        }, {}); //! Parto da un oggetto vuoto
        //* Ottengo un oggetto con chiave la categoria e valore il numero di volte che compare

        let topCategories = Object.entries(frequencyCategories) // Creo un array di array formato dalle coppie chiave, valore
            .sort((a, b) => b[1] - a[1]) // Ordino in ordine decrescente in base alla quantità di prodotti in una categoria
            .slice(0, 4) // Prendo i primi quattro
            .map((el) => el[0]); // Prendo solo le categorie
        //* Ottengo un array contenente le prime 4 categorie con più prodotti

        let pillsTab = document.querySelector('#pills-tab'); // Prendo l'elemento con id pills-tab dalla pagina html
        let pillsTabContent = document.querySelector('#pills-tab-content'); // Prendo l'elemento con id pills-tab-content
        topCategories.forEach((category, indice) => {
            // ciclo sull'array: per ogni elemento
            let li = document.createElement('li'); // creo un tag li
            li.classList.add('nav-item'); // a cui assegno la classe nav-item
            li.innerHTML =
                // Nell'elemento list creo questo html
                `
        <button class="nav-link ${
            indice === 0 ? 'active' : ''
        }" id=pills-${category}-tab" data-bs-toggle="pill" data-bs-target="#pills-${category}" type="button" role="tab" aria-controls="pills-home" aria-selected="true">${category}</button>
        `; // ${indice === 0 ? "active" : ""} Se l'indice dell'array è 0 (primo elemento) dai la classe active

            pillsTab.appendChild(li); // inserisco l'html nel tag li
            //* Ottengo 4 tasti con le categorie ottenute dall'array precedentemente creato

            let productsByCategory = data // inizializzo la variabile productsByCategory con data
                .filter((products) => products.category_name === category) // per ogni elemento filtra gli elementi con category_name === a category (ottengo 4 array con i prodotti delle 4 categorie)
                .sort((a, b) => new Date(b.date) - new Date(a.date)) // Li ordino in ordine decrescente in base alle date
                .slice(0, 4); // Prendo i primi 4
            //* Ottengo un array con i primi 4 prodotti per ogni categoria

            let head = '<div class="row">'; // Creo una stringa contenente i tag di apertura del div delle card
            let tail = '</div>'; // creo una stringa con i tag di chiusura del div delle card
            let string = productsByCategory
                .map((product) => {
                    // creo un array formato da stringhe con l'html delle cards
                    return `
            <div class="col-12 col-md-6 col-lg-3 mt-3">
                <div class="card-product shadow-lg">
                    <div>
                        <h4>${product.product_name.substring(0, 20)} [...]</h4>
                        <p>${product.category_name} 
                            <span class="float-end">
                                ${product.product_price} €
                            </span>
                        </p>
                    </div>
                    <p class="small">${product.product_description.substring(
                        0,
                        40,
                    )} [...]</p>
                    <a href="#" class="card-product-link shadow"><i class="fas fa-chevron-right"></i></a>
                </div>
            </div>
            `;
                })
                //* Ottengo 4 array con l'html delle card che andrò a popolare

                .join(''); // Converto gli array in stringhe

            let div = document.createElement('div'); // creo l'html delle tabs
            div.classList.add('tab-pane', 'fade');
            if (indice === 0) {
                div.classList.add('show', 'active'); // do le classi show e active alla prima tab
            }
            div.setAttribute('id', `pills-${category}`);
            div.innerHTML =
                //* inserisco il contenuto delle tab cioè le card precedentemente create
                `
            ${head + string + tail}
            `;
            pillsTabContent.appendChild(div);
        });
    });

/// ///////////////////
/// ///////////////////
// FORM SIGNUP/////////
// LOGIN//////////////
/// /////////////////

const SIGNUPBUTTON = document.querySelector('#signUp');
const LOGINBUTTON = document.querySelector('#logIn');
const CLOSE = document.querySelector('#close');
const CLOSELOGIN = document.querySelector('#closeLogIn');
const MODALSIGNUP = document.querySelector('#modalSignUp');
const MODALLOGIN = document.querySelector('#modalLogIn');
// const SHOPBUTTON = document.querySelector('#shopButton')

LOGINBUTTON.addEventListener('click', () => {
    // al click al bottone log in cambio il valore della chiave display da 'none' a 'block'
    MODALLOGIN.style.display = 'block';
});

CLOSELOGIN.addEventListener('click', () => {
    // al click sul tasto di chiusura ripristino il valore a 'none'
    MODALLOGIN.style.display = 'none';
});

SIGNUPBUTTON.addEventListener('click', () => {
    // come sopra
    MODALSIGNUP.style.display = 'block';
});

CLOSE.addEventListener('click', () => {
    MODALSIGNUP.style.display = 'none';
});

/* SHOPBUTTON.addEventListener('click', () => {
    MODALLOGIN.style.display = 'block'
}) */

/* const USER = document.querySelector('#user');
const PASSWORD = document.querySelector('#password');
const REDIRECTUSERPAGEBUTTON = document.querySelector('#redirectUserPageButton');
console.log(REDIRECTUSERPAGEBUTTON);
if (USER === 'fabio.angelici' && PASSWORD === 'password') {
    
     REDIRECTUSERPAGEBUTTON.addEventListener('click', () => {
        REDIRECTUSERPAGEBUTTON.setAttribute('href', './user.html') 
        //     console.log('ok');
    //     window.location.href = 'user.html';
        
    });
} */
