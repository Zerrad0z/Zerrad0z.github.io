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
        document.getElementById('results').innerText = 'No results found';
        return;
    }

    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    let results = '';

    const getCurrentTime = (timeZone) => {
        const options = { timeZone: timeZone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date().toLocaleTimeString('en-US', options);
    };

    if (searchQuery === 'temples' || searchQuery === 'temple') {
        data.temples.forEach(temple => {
            const currentTime = getCurrentTime('Asia/Phnom_Penh'); // Assuming temples are in Cambodia
            results += `
                <div class="card mb-3 bg-dark text-white" style="max-width: 500px;">
                    <div class="card-header">${temple.name} - Current Time: ${currentTime}</div>
                    <img src="${temple.imageUrl}" class="card-img-top" alt="${temple.name}" style="height: 300px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${temple.name}</h5>
                        <p class="card-text">${temple.description}</p>
                        <a href="#" class="btn btn-primary">Visit</a>
                    </div>
                </div>
            `;
        });
    } else if (searchQuery === 'beaches' || searchQuery === 'beach') {
        data.beaches.forEach(beach => {
            const currentTime = getCurrentTime('Pacific/Tahiti'); // Assuming beaches are in Tahiti
            results += `
                <div class="card mb-3 bg-dark text-white" style="max-width: 500px;">
                    <div class="card-header">${beach.name} - Current Time: ${currentTime}</div>
                    <img src="${beach.imageUrl}" class="card-img-top" alt="${beach.name}" style="height: 300px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${beach.name}</h5>
                        <p class="card-text">${beach.description}</p>
                        <a href="#" class="btn btn-primary">Visit</a>
                    </div>
                </div>
            `;
        });
    } else {
        data.countries.forEach(country => {
            if (country.name.toLowerCase().includes(searchQuery)) {
                country.cities.forEach(city => {
                    const currentTime = getCurrentTime('Australia/Sydney'); // Assuming cities are in Australia
                    results += `
                        <div class="card mb-3 bg-dark text-white" style="max-width: 500px;">
                            <div class="card-header">${city.name} - Current Time: ${currentTime}</div>
                            <img src="${city.imageUrl}" class="card-img-top" alt="${city.name}" style="height: 300px; object-fit: cover;">
                            <div class="card-body">
                                <h5 class="card-title">${city.name}</h5>
                                <p class="card-text">${city.description}</p>
                                <a href="#" class="btn btn-primary">Visit</a>
                            </div>
                        </div>
                    `;
                });
            }
        });
    }
    document.querySelector('#results').classList.add("result-card");
    document.getElementById('results').innerHTML = results;
}

function clearResults() {
    document.getElementById('searchInput').value = '';
    document.getElementById('results').innerHTML = '';
}

document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchButton = document.getElementById('btnSearch');
    const clearButton = document.getElementById('resetButton');

    if (searchForm && searchButton && clearButton) {
        searchForm.addEventListener('submit', handleSearch);
        clearButton.addEventListener('click', clearResults);
    } else {
        console.error('Form or buttons not found in the DOM.');
    }
});