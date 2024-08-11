document.addEventListener('DOMContentLoaded', () => {
    console.log('Script loaded and DOM is ready');

    const resultsContainer = document.getElementById('results');
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const resetButton = document.getElementById('resetButton');
    const currentTimeElement = document.getElementById('currentTime');

    const createCard = (name, imageUrl, description, timeZone) => {
        const options = { timeZone: timeZone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const currentTime = new Date().toLocaleTimeString('en-US', options);
        return `
            <div class="card mb-3 bg-dark text-white" style="max-width: 500px;">
                <div class="card-header">${name} - Current Time: ${currentTime}</div>
                <img src="${imageUrl}" class="card-img-top" alt="${name}" style="height: 300px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">${description}</p>
                    <a href="#" class="btn btn-primary">Visit</a>
                </div>
            </div>
        `;
    };

    const displayResults = (data, keyword) => {
        console.log('Displaying results for keyword:', keyword);
        resultsContainer.innerHTML = '';
        let resultsFound = false;

        if (keyword) {
            const lowerCaseKeyword = keyword.toLowerCase();

            data.countries.forEach(country => {
                if (country.name.toLowerCase().includes(lowerCaseKeyword)) {
                    resultsFound = true;
                    country.cities.forEach(city => {
                        resultsContainer.innerHTML += createCard(city.name, city.imageUrl, city.description, 'Australia/Sydney');
                    });
                } else {
                    country.cities.forEach(city => {
                        if (city.name.toLowerCase().includes(lowerCaseKeyword)) {
                            resultsFound = true;
                            resultsContainer.innerHTML += createCard(city.name, city.imageUrl, city.description, 'Australia/Sydney');
                        }
                    });
                }
            });

            data.temples.forEach(temple => {
                console.log('Checking temple:', temple.name);
                if (temple.name.toLowerCase().includes(lowerCaseKeyword)) {
                    console.log('Match found for temple:', temple.name);
                    resultsFound = true;
                    resultsContainer.innerHTML += createCard(temple.name, temple.imageUrl, temple.description, 'Asia/Phnom_Penh');
                }
            });

            data.beaches.forEach(beach => {
                console.log('Checking beach:', beach.name);
                if (beach.name.toLowerCase().includes(lowerCaseKeyword)) {
                    console.log('Match found for beach:', beach.name);
                    resultsFound = true;
                    resultsContainer.innerHTML += createCard(beach.name, beach.imageUrl, beach.description, 'Pacific/Tahiti');
                }
            });

            if (!resultsFound) {
                resultsContainer.innerHTML = '<p>No results found.</p>';
            }
        } else {
            resultsContainer.innerHTML = '<p>Enter a search term to see results.</p>';
        }
    };

    const fetchData = (keyword = '') => {
        console.log('Fetching data...');
        fetch('https://raw.githubusercontent.com/Zerrad0z/Zerrad0z.github.io/main/travel_recommendation_api.json')
        .then(response => {
                console.log('Response:', response);
                return response.json();
            })
            .then(data => {
                console.log('Data fetched successfully:', data);
                displayResults(data, keyword);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const updateCurrentTime = () => {
        if (currentTimeElement) {
            const options = { timeZone: 'Africa/Casablanca', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
            const currentTime = new Date().toLocaleTimeString('en-US', options);
            currentTimeElement.textContent = `Current Time in Casablanca: ${currentTime}`;
        }
    };

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log('Search form submitted');
        const keyword = searchInput.value.trim();
        console.log('Search form submitted with keyword:', keyword);
        fetchData(keyword);
    });

    resetButton.addEventListener('click', () => {
        console.log('Reset button clicked');
        searchInput.value = '';
        resultsContainer.innerHTML = '<p></p>';
    });

    // Initial state
    console.log('Setting initial state');
    resultsContainer.innerHTML = '<p></p>';
    setInterval(updateCurrentTime, 1000);
    updateCurrentTime();
});