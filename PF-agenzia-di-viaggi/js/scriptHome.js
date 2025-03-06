document.addEventListener("DOMContentLoaded", function () {
  let cardsContainer = document.querySelector("#cards-container");
  let carouselContainer = document.querySelector("#carousel");
  let destinazioni = [];

  //   function recuperaDati() {
  //     const URLEndpoint = `https://www.freetestapi.com/api/v1/destinations`;

  //     fetch(URLEndpoint)
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error("Errore nella richiesta API");
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         destinazioni = data;
  //         let carouselHTML = creaCarousel(destinazioni.slice(0, 10)); // Poblar el carousel con los primeros 10 elementos
  //         carouselContainer.innerHTML = carouselHTML;

  //         data.slice(7, 11).forEach((destinazione, index) => {
  //           let cardHTML = creaCard(destinazione, index);
  //           cardsContainer.innerHTML += cardHTML;
  //         });

  //         console.log(destinazioni);
  //       })
  //       .catch((error) =>
  //         console.error("Errore durante il recupero dei dati:", error)
  //       );
  //   }

  async function recuperaDati() {
    try {
      const response = await fetch(
        "https://www.freetestapi.com/api/v1/destinations"
      );
      console.log("Status:", response.status); // Verifica el código de estado
      console.log("Headers:", response.headers);

      if (!response.ok) throw new Error("Errore nella richiesta API");

      const data = await response.json();
      console.log("Dati ricevuti:", data); // Muestra la data en consola

      destinazioni = data;
      carouselContainer.innerHTML = creaCarousel(destinazioni.slice(0, 10));
      cardsContainer.innerHTML = data.slice(7, 11).map(creaCard).join("");
    } catch (error) {
      console.error("Errore durante il recupero dei dati:", error);
    }
  }

  recuperaDati();

  // Funzione per creare la card come stringa HTML
  function creaCard(destinazione) {
    return `
            <div class="col-lg-3 mb-4">
                <a href="dettaglioViaggio.html" class="text-decoration-none" onclick="prenota('${
                  destinazione.id
                }')">
                    <div class="card h-100 transition rounded border-0 bg-dark bg-gradient text-white">
                        <img height="200" src="${
                          destinazione.image
                        }" alt="${destinazione.name}">
                        <div class="card-body">
                            <h5 class="card-title">${destinazione.name}</h5>
                            <p class="card-text">${
                              destinazione.description ||
                              "Descrizione non disponibile"
                            }</p>
                            <button class="btn btn-danger" onclick="prenota('${
                              destinazione.id
                            }')">offerte</button>
                        </div>
                    </div>
                </a>
            </div>
        `;
  }

  // Funzione per creare il carousel come stringa HTML
  function creaCarousel(destinazioni) {
    let indicatorsHTML = "";
    let itemsHTML = "";

    destinazioni.forEach((destinazione, index) => {
      let isActive = index === 0 ? "active" : "";
      indicatorsHTML += `
                <button type="button" data-bs-target="#jamatoursCarousel" data-bs-slide-to="${
                  destinazione.id
                }" class="${isActive}" aria-current="true" aria-label="Slide ${
        index + 1
      }"></button>
            `;

      itemsHTML += `
                
                <div class="carousel-item ${isActive} position-relative" data-bs-interval="10000">
                    <picture>
                        <source srcset="${
                          destinazione.image
                        }" media="(min-width:1200px)">
                        <source srcset="${
                          destinazione.image
                        }" media="(min-width:580px)">
                        <img src="${
                          destinazione.image
                        }" class="img-fluid filtro-oscuro" alt="carousel-${
        destinazione.id + 1
      }">
                        <div class="position-absolute top-50 start-50 text-center translate-middle">
                            <p class="fs-1 fw-semibold">Scopra il suo lugo speciale</p>
                            <p class="fs-2">${destinazione.name} !</p>
                            <button class="btn btn-danger"  onclick="prenota(${
                              destinazione.id
                            })">Prenota ora</button>
                        </div>
                    </picture>
                </div>
            `;
    });

    return `
            <div id="jamatoursCarousel" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    ${indicatorsHTML}
                </div>
                <div class="carousel-inner text-white">
                    ${itemsHTML}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#jamatoursCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#jamatoursCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        `;
  }

  // Funzione per memorizzare i dati nel localStorage e aprire la pagina di dettaglio
  window.prenota = function (id) {
    let destinazioneSelezionata = destinazioni.find((dest) => dest.id == id);
    localStorage.setItem(
      "destinazione",
      JSON.stringify(destinazioneSelezionata)
    );
    window.location.href = "dettaglioViaggio.html";
  };

  // Recupera i dati al caricamento della pagina
  recuperaDati();
});
