function initialiserDonnees() {
    const xhr = new XMLHttpRequest();
    const url = "https://restcountries.com/v3.1/all";

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                afficherDonnees(data);
            } else {
                document.querySelector('#resultat').innerHTML = `<p style="color: red;">Erreur lors de la récupération des données</p>`;
            }
        }
    };

    xhr.open("GET", url, true);
    xhr.send();
}

// function afficherDonnees(data) {
//     let resultatHtml = "<ul>";
//     data.forEach(pays => {
//         resultatHtml += `<li>${pays.name.common} - Population: ${pays.population} - Région: ${pays.region}</li>`;
//     });
//     resultatHtml += "</ul>";
//     document.querySelector('#resultat').innerHTML = resultatHtml;
// }

function afficherDonnees(data) {
    let resultatHtml = "<ol>";
    data.forEach(pays => {
        const nomPays = pays.name.common;
        const capitale = pays.capital ? pays.capital[0] : "N/A";
        const population = pays.population.toLocaleString();
        const region = pays.region;

        resultatHtml += `<li>
                            <strong>Pays:</strong> ${nomPays} <br>
                            <strong>Capitale:</strong> ${capitale} <br>
                            <strong>Population:</strong> ${population} <br>
                            <strong>Région:</strong> ${region}
                        </li>`;
    });
    resultatHtml += "</ol>";
    document.querySelector('#resultat').innerHTML = resultatHtml;
}