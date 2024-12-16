        //set view: latitudine, longitudine, zoom 
        var map = L.map('map-osm').setView([45.066010, 7.684252], 18);

        //qui vado a pescare dai server di openstreetmap i mattoncini della cartina
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        //aggiungo un marker sulle stesse coordinate
        var marker = L.marker([45.066010, 7.684252]).addTo(map);

        //posso aggiungere un popup al marker appena creato
        marker.bindPopup("<b>Jamatours</b>").openPopup();

        //per approfondire: https://leafletjs.com/examples.html
