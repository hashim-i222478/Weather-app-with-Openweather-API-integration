// Global state for unit toggling
let currentCelsius = 0;

document.addEventListener('DOMContentLoaded', () => {
    // Set initial date
    updateDate();
    // Default search
    document.getElementById('city').value = 'London';
    get_Weather_details();
    get_forecast();
});

function updateDate() {
    const dateElement = document.getElementById('date-time');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    dateElement.innerText = today.toLocaleDateString('en-US', options);
}

function toggleTemperature() {
    const tempElement = document.getElementById('temp');
    const toggleBtn = document.getElementById('toggleTemp');
    const spans = toggleBtn.getElementsByTagName('span');

    if (tempElement.innerText.includes('°C')) {
        let fahrenheit = (currentCelsius * 9 / 5) + 32;
        tempElement.innerText = fahrenheit.toFixed(1) + '°F';
        spans[0].classList.remove('active-unit');
        spans[1].classList.add('active-unit');
    } else {
        tempElement.innerText = currentCelsius.toFixed(1) + '°C';
        spans[1].classList.remove('active-unit');
        spans[0].classList.add('active-unit');
    }
}

function get_Weather_details() {
    const city_name = document.getElementById('city').value;
    const api_key = '6235f3a1d357b365fc3db88b6dd6caa2';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                alert('City not found');
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            // Update Text Elements
            document.getElementById("city-name").innerText = data.name;

            // Temperature
            currentCelsius = data.main.temp - 273.15;
            document.getElementById("temp").innerText = currentCelsius.toFixed(1) + '°C';

            // Details
            document.getElementById("humidity").innerText = data.main.humidity + '%';
            document.getElementById("wind").innerText = data.wind.speed + ' m/s';

            // Weather Condition & Icon
            const description = data.weather[0].description;
            const mainCondition = data.weather[0].main;
            document.getElementById("weather").innerText = description.charAt(0).toUpperCase() + description.slice(1);

            const iconElement = document.getElementById("icon");
            iconElement.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
            iconElement.classList.remove('hidden');

            // Theme Switching
            updateTheme(description);
        })
        .catch(error => console.error(error));
}

function updateTheme(description) {
    const body = document.body;
    body.className = ''; // Reset classes

    if (description.includes('rain') || description.includes('drizzle')) {
        body.classList.add('rain-theme');
    } else if (description.includes('cloud')) {
        body.classList.add('cloud-theme');
    } else if (description.includes('clear')) {
        body.classList.add('clear-theme');
    } else {
        // Default fallback
        body.classList.add('cloud-theme');
    }
}

function get_forecast() {
    const city_name = document.getElementById('city').value;
    const api_key = '6235f3a1d357b365fc3db88b6dd6caa2';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${api_key}`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Error fetching forecast');
            return response.json();
        })
        .then(data => {
            const forecastData = data.list;
            // Get 5 days forecast (approximate by taking every 8th item (24hrs))
            const filteredData = forecastData.filter((_, index) => index % 8 === 0).slice(0, 5);

            const dates = [];
            const temps = [];
            const weatherConditions = {};

            filteredData.forEach(entry => {
                const date = new Date(entry.dt_txt).toLocaleDateString('en-US', { weekday: 'short' });
                dates.push(date);
                temps.push((entry.main.temp - 273.15).toFixed(1));

                const condition = entry.weather[0].main;
                weatherConditions[condition] = (weatherConditions[condition] || 0) + 1;
            });

            updateCharts(dates, temps, weatherConditions);
        })
        .catch(error => console.error(error));
}

// Chart Instances
let tempChartInstance = null;
let doughnutChartInstance = null;
let lineChartInstance = null;

function updateCharts(dates, temps, weatherConditions) {
    // Colors matching CSS variables
    const accentSecondary = '#08d9d6';
    const accentColor = '#ff2e63';

    // Common Chart Options
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: { color: 'rgba(255,255,255,0.8)', font: { family: 'Inter' } }
            }
        },
        scales: {
            x: {
                ticks: { color: 'rgba(255,255,255,0.7)' },
                grid: { color: 'rgba(255,255,255,0.05)' }
            },
            y: {
                ticks: { color: 'rgba(255,255,255,0.7)' },
                grid: { color: 'rgba(255,255,255,0.05)' }
            }
        }
    };

    // 1. Bar Chart (Temp Forecast)
    const tempCtx = document.getElementById('tempChart').getContext('2d');
    if (tempChartInstance) tempChartInstance.destroy();

    tempChartInstance = new Chart(tempCtx, {
        type: 'bar',
        data: {
            labels: dates,
            datasets: [{
                label: 'Forecast (°C)',
                data: temps,
                backgroundColor: 'rgba(8, 217, 214, 0.4)', // Cyan transparent
                borderColor: accentSecondary,
                borderWidth: 1,
                borderRadius: 8,
                hoverBackgroundColor: accentSecondary
            }]
        },
        options: commonOptions
    });

    // 2. Doughnut Chart (Conditions)
    const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
    if (doughnutChartInstance) doughnutChartInstance.destroy();

    doughnutChartInstance = new Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(weatherConditions),
            datasets: [{
                data: Object.values(weatherConditions),
                backgroundColor: [
                    '#ff2e63', // Pink
                    '#08d9d6', // Teal
                    '#fbd38d', // Yellow/Orange
                    '#a8edea'  // Light Cyan
                ],
                borderColor: 'rgba(20, 20, 40, 0.8)', // Matches background
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: { color: 'white', boxWidth: 12 }
                }
            }
        }
    });

    // 3. Line Chart (Temp Trend)
    const lineCtx = document.getElementById('lineChart').getContext('2d');
    if (lineChartInstance) lineChartInstance.destroy();

    lineChartInstance = new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Trend',
                data: temps,
                backgroundColor: 'rgba(255, 46, 99, 0.1)',
                borderColor: accentColor,
                borderWidth: 3,
                pointBackgroundColor: '#fff',
                tension: 0.4,
                fill: true
            }]
        },
        options: commonOptions
    });
}
