let feedNome = document.querySelector("#feedNome");
let feedCognome = document.querySelector("#feedCognome");
let feedEmail = document.querySelector("#feedEmail");
let feedTel = document.querySelector("#feedTel");

let nome = document.querySelector("#nome");
let cognome = document.querySelector("#cognome");
let tel = document.querySelector("#telefono");
let email = document.querySelector("#email");

let btnInvia = document.querySelector("#invia")


let formContattaci = document.querySelector("#formContattaci");
let formPagamento = document.querySelector("#formPagamento");


function controllaCampi() {
    nome.value = "";
    cognome.value = "";
    tel.value = "";
    email.value = "";

    return alert('Per favore, compila tutti i campi.');
}

nome.addEventListener("blur", function(){
    let nome = document.querySelector("#nome").value;
    checkNome(nome);
})

cognome.addEventListener("blur", function(){
    let cognome = document.querySelector("#cognome").value;
    checkCognome(cognome);
})

email.addEventListener("blur", function(){
    let email = document.querySelector("#email").value;
    checkEmail(email);
})

tel.addEventListener("blur", function(){
    let tel = document.querySelector("#telefono").value;
    checkTel(tel);
})

function checkNome(nome){
    if(nome.length > 0){
        feedNome.textContent = ""
        return true;
    }else{
        feedNome.textContent = "Non hai inserito il nome";
        return false
    }
}

function checkCognome(cognome){
    if(cognome.length > 0){
        feedCognome.textContent = "";
        return true;
    }else{
        feedCognome.textContent = "Non hai inserito il cognome";
        return false
    }
}

/**
 * 
 * @param {string} email 
 */
function checkEmail(email){
    let regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

    if(email.match(regexMail)){
        feedEmail.textContent = "";
        return true;
    }else{
        feedEmail.textContent = "Stai sbagliando la mail";
        return false;
    }

}

function checkTel(tel){
    let regexTel = /\d{10}/;
    if(tel.match(regexTel)){
        feedTel.textContent = "";
        return true;
    }else{
        feedTel.textContent = "Numero di telefono non corretto";
        return false;
    }
}

function checkRuolo(ruolo){
    if(ruolo){
        feedRuolo.textContent = "";
        return true;
    }else{
        feedRuolo.textContent = "Ruolo non selezionato"
        return false;
    }
}

btnInvia.addEventListener("click", controllaCampi)
