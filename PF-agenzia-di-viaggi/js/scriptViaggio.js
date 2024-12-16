document.addEventListener("DOMContentLoaded", function() {
    let dettagliContainer = document.querySelector('#dettagli-container');
    let destinazione = JSON.parse(localStorage.getItem('destinazione'));


    let dettagliHTML = creaDettagli(destinazione);
    dettagliContainer.innerHTML = dettagliHTML;
    
});

// Funzione per creare i dettagli della destinazione come stringa HTML
function creaDettagli(destinazione) {
    return `
        <div class="card shadow">
            <img src="${destinazione.image}" class="card-img-top" alt="${destinazione.name}">
            <div class="card-body">
                <h5 class="card-title">${destinazione.name}</h5>
                <p class="card-text">${destinazione.description}</p>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>Country:</strong> ${destinazione.country}</li>
                    <li class="list-group-item"><strong>Continent:</strong> ${destinazione.continent}</li>
                    <li class="list-group-item"><strong>Population:</strong> ${destinazione.population}</li>
                    <li class="list-group-item"><strong>Currency:</strong> ${destinazione.currency}</li>
                    <li class="list-group-item"><strong>Language:</strong> ${destinazione.language}</li>
                    <li class="list-group-item"><strong>Best Time to Visit:</strong> ${destinazione.best_time_to_visit}</li>
                </ul>
                <h5 class="mt-3">Top Attractions</h5>
                <ul class="list-group list-group-flush attractions-list">
                    ${destinazione.top_attractions.map(attraction => `<li class="list-group-item">${attraction}</li>`).join('')}
                </ul>
                <h5 class="mt-3">Local Dishes</h5>
                <ul class="list-group list-group-flush dishes-list">
                    ${destinazione.local_dishes.map(dish => `<li class="list-group-item">${dish}</li>`).join('')}
                </ul>
                <h5 class="mt-3">Activities</h5>
                <ul class="list-group list-group-flush activities-list">
                    ${destinazione.activities.map(activity => `<li class="list-group-item">${activity}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}