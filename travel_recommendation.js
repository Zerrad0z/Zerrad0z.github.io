async function fetchData() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/Zerrad0z/Zerrad0z.github.io/main/travel_recommendation_api.json');
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

async function handleSearch(event) {
    event.preventDefault();

    const data = await fetchData();
    if (!data) {
        document.getElementById('result').innerText = 'No results found';
        return;
    }

    const searchQuery = document.getElementById('destinationInput').value.toLowerCase();
    let results = '';

    if (searchQuery == 'temples' || searchQuery == 'temple') {
        data.temples.forEach(temple => {
            results += `<div><img src="${temple.imageUrl}" alt="${temple.name}"><h3>${temple.name}</h3><p>${temple.description}</p></div>`;
        });
    } else if (searchQuery == 'beaches' || searchQuery == 'beach') {
        data.beaches.forEach(beach => {
            results += `<div><img src="${beach.imageUrl}" alt="${beach.name}"><h3>${beach.name}"></h3><p>${beach.description}</p></div>`;
        });
    } else {
        data.countries.forEach(country => {
            if (country.name.toLowerCase().includes(searchQuery)) {
                country.cities.forEach(city => {
                    results += `<img src="${city.imageUrl}" alt="${city.name}"><div><h3>${city.name}</h3><p>${city.description}</p></div>`;
                });
            }
        });
    }
    document.querySelector('#result').classList.add("result-card");
    document.getElementById('result').innerHTML = results;
}

function clearResults() {
    document.getElementById('destinationInput').value = '';
    document.getElementById('result').innerHTML = '';
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btnSearch').addEventListener('click', handleSearch);
    document.getElementById('btnClear').addEventListener('click', clearResults);
});
