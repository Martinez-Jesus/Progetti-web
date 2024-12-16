// document.addEventListener("DOMContentLoaded", function() {

//     let card5 = document.querySelector("#card5");
//     let card6 = document.querySelector("#card6");
//     let card7 = document.querySelector("#card7");
//     let card8 = document.querySelector("#card8");
//     let card9 = document.querySelector("#card9");
//     let card10 = document.querySelector("#card10");
//     let card11 = document.querySelector("#carD11");
//     let card12 = document.querySelector("#card12");

//     let destinazioni = [];

//     function recuperaDati() {
//         const URLEndpoint = `https://www.freetestapi.com/api/v1/destinations`;

//         fetch(URLEndpoint)
//         .then(response =>{
//             return response.json();
//         })
//         .then(data =>{
//             console.log(destinazioni);
            
//             data.forEach(destinazione, index => {
//                 destinazioni.push(destinazione);
//             });

//             console.log(destinazioni);
            
//             card5.innerHTML = creaCard(destinazioni[4]);
//             card6.innerHTML = creaCard(destinazioni[5]);
//             card7.innerHTML = creaCard(destinazioni[6]);
//             card8.innerHTML = creaCard(destinazioni[7]);
//             card9.innerHTML = creaCard(destinazioni[8]);
//             card10.innerHTML = creaCard(destinazioni[9]);
//             card11.innerHTML = creaCard(destinazioni[10]);
//             card12.innerHTML = creaCard(destinazioni[11]);
//         })
//         .catch(error => console.error('Errore durante il recupero dei dati:', error));
//     }

//     function creaCard(destinazione, index) {
//         return `
//             <div class="card">
//                 <img src="${destinazione.image}" class="card-img-top" alt="${destinazione.name}">
//                 <div class="card-body">
//                     <h5 class="card-title">${destinazione.name}</h5>
//                     <p class="card-text">${destinazione.description || 'Descrizione non disponibile'}</p>
//                     <a href="${destinazione.url || '#'}" class="btn btn-primary">Prenota</a>
//                 </div>
//             </div>
//         `;
//     }

//     window.prenota = function(index) { 
//         localStorage.setItem('destinazione', JSON.stringify(destinazioni[index])); 
//         window.location.href = 'dettaglio.html'; }

    
//     recuperaDati();
// });


// document.addEventListener("DOMContentLoaded", function() {
//     let cardsContainer = {
//         Europe: document.querySelector('#Europe .row'),
//         Asia: document.querySelector('#Asia .row'),
//         America: document.querySelector('#America .row'),
//         Africa: document.querySelector('#Africa .row'),
//         Oceania: document.querySelector('#Oceania .row')
//     };

//     let destinazioni = [];

//     function recuperaDati() {
//         const URLEndpoint = `https://www.freetestapi.com/api/v1/destinations`;

//         fetch(URLEndpoint)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Errore nella richiesta API');
//             }
//             return response.json();
//         })
//         .then(data => {
//             destinazioni = data;
//             data.forEach((destinazione, index) => {
//                 let cardHTML = creaCard(destinazione, index);
//                 if (cardsContainer[destinazione.continent]) {
//                     cardsContainer[destinazione.continent].innerHTML += cardHTML;
//                 }
//             });
//         })
//         .catch(error => console.error('Errore durante il recupero dei dati:', error));
//     }

//     // Funzione per creare la card come stringa HTML
//     function creaCard(destinazione, index) {
//         return `
//             <div class="col-md-3 mb-5">
//                 <a href="dettaglioViaggio.html" class="text-decoration-none" onclick="prenota(${index})">
//                     <div class="card h-100 transition shadow p-3 mb-5  rounded border-0">
//                         <img src="${destinazione.image}" class="img-fluid" alt="${destinazione.name}">
//                         <div class="card-body">
//                             <h5 class="card-title">${destinazione.name}</h5>
//                             <p class="card-text">${destinazione.description || 'Descrizione non disponibile'}</p>
//                             <button class="btn btn-primary" onclick="prenota(${index})">Prenota</button>
//                         </div>
//                     </div>
//                 </a>
//             </div>
//         `;
//     }

//     // Funzione per memorizzare i dati nel localStorage e aprire la pagina di dettaglio
//     window.prenota = function(index) {
//         localStorage.setItem('destinazione', JSON.stringify(destinazioni[index]));
//         window.location.href = 'dettaglioViaggio.html';
//     }

//     // Recupera i dati al caricamento della pagina
//     recuperaDati();
// });


document.addEventListener("DOMContentLoaded", function() {
    const carouselContainers = {
        Europe: document.querySelector('#EuropeCarousel'),
        Asia: document.querySelector('#AsiaCarousel'),
        America: document.querySelector('#AmericaCarousel'),
        Africa: document.querySelector('#AfricaCarousel'),
        Oceania: document.querySelector('#OceaniaCarousel')
    };

    let destinazioni = [];

    function recuperaDati() {
        const URLEndpoint = `https://www.freetestapi.com/api/v1/destinations`;

        fetch(URLEndpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nella richiesta API');
            }
            return response.json();
        })
        .then(data => {
            destinazioni = data;
            data.forEach((destinazione, index) => {
                let slideHTML = creaSlide(destinazione, index);
                if (carouselContainers[destinazione.continent]) {
                    carouselContainers[destinazione.continent].innerHTML += slideHTML;
                }
            });

            // Inicializa Swiper para cada continente después de haber agregado los slides
            initSwiper('.mySwiperEurope');
            initSwiper('.mySwiperAsia');
            initSwiper('.mySwiperAmerica');
            initSwiper('.mySwiperAfrica');
            initSwiper('.mySwiperOceania');
        })
        .catch(error => console.error('Errore durante il recupero dei dati:', error));
    }

    // Funzione per creare la slide come stringa HTML
    function creaSlide(destinazione, index) {
        return `
            <div class="swiper-slide">
                    <a href="dettaglioViaggio.html" class="text-decoration-none " onclick="prenota(${index})">
                        <div class="card transition rounded border-0 h-100 bg-dark bg-gradient text-white ">
                            <img src="${destinazione.image}" class="img-fluid rounded" alt="${destinazione.name}">
                            <div class="card-body ">
                                <h5 class="card-title">${destinazione.name}</h5>
                                <p class="card-text mb-5">${destinazione.description || 'Descrizione non disponibile'}</p>
                            </div>
                        </div>
                    </a>
            </div>
        `;
    }

    // Funzione per memorizzare i dati nel localStorage e aprire la pagina di dettaglio
    window.prenota = function(index) {
        localStorage.setItem('destinazione', JSON.stringify(destinazioni[index]));
        window.location.href = 'dettaglioViaggio.html';
    }

    // Funzione per inicializar Swiper
    function initSwiper(selector) {
        new Swiper(selector, {
            slidesPerView: 1,
            spaceBetween: 10,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 20
                }
            }
        });
    }

    // Recupera i dati al caricamento della pagina
    recuperaDati();
});








