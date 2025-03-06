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
    function creaSlide(destinazione) {
        return `
            <div class="swiper-slide">
                    <a href="dettaglioViaggio.html" class="text-decoration-none " onclick="prenota(${destinazione.id})">
                        <div class="card transition rounded border-0 h-100 bg-dark bg-gradient text-white ">
                            <img height="200" src="${destinazione.image}" rounded" alt="${destinazione.name}">
                            <div class="card-body ">
                                <h5 class="card-title">${destinazione.name}</h5>
                                <p class="card-text mb-5">${destinazione.description || 'Descrizione non disponibile'}</p>
                            </div>
                        </div>
                    </a>
            </div>
        `;
    }

    //Per aprire la card in una finestra nueva del navegador
    // function creaSlide(destinazione, index) {
    //     return `
    //         <div class="swiper-slide">
    //             <div 
    //                 class="card transition rounded border-0 h-100 bg-dark bg-gradient text-white" 
    //                 style="cursor: pointer;" 
    //                 onclick="window.open('dettaglioViaggio.html', '_blank')"
    //             >
    //                 <img height="200" src="${destinazione.image}" alt="${destinazione.name}">
    //                 <div class="card-body">
    //                     <h5 class="card-title">${destinazione.name}</h5>
    //                     <p class="card-text mb-5">${destinazione.description || 'Descrizione non disponibile'}</p>
    //                     <button 
    //                         class="btn btn-danger" 
    //                         onclick="prenota(${index}); event.stopPropagation();"
    //                     >
    //                         Prenota
    //                     </button>
    //                 </div>
    //             </div>
    //         </div>
    //     `;
    // }
    

    // Funzione per memorizzare i dati nel localStorage e aprire la pagina di dettaglio
    window.prenota = function(id) {
        let destinazioneSelezionata = destinazioni.find(dest => dest.id == id);
        localStorage.setItem('destinazione', JSON.stringify(destinazioneSelezionata));
        window.location.href = 'dettaglioViaggio.html';
    };

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
                    slidesPerView: 1.5,
                    spaceBetween: 11
                },
                768: {
                    slidesPerView: 2.5,
                    spaceBetween: 11
                },
                1024: {
                    slidesPerView: 3.5,
                    spaceBetween: 11
                }
            }
        });
    }

    // Recupera i dati al caricamento della pagina
    recuperaDati();
});








