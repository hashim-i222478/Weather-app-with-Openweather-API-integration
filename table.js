//when the mouse is over the forecast table, zoom in the table
document.getElementById('forecast_table').onmouseover = function () {
    document.getElementById('forecast_table').style.transform = 'scale(1.01)';
}

//when the mouse is out of the forecast table, zoom out the table
document.getElementById('forecast_table').onmouseout = function () {
    document.getElementById('forecast_table').style.transform = 'scale(1)';
}

//function to search for a city
function search_city() {

    let city_name = document.getElementById('city').value;
    let api_key = '6235f3a1d357b365fc3db88b6dd6caa2';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}`;

    fetch(url) //fetch the data from the url
        .then(response => {
            if (!response.ok) { //if the response is not ok, alert the user that the city is not found
                alert('City not found');
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data =>  //if the response is ok, get the data and fetch the forecast
            fetchForecast(data.coord.lat, data.coord.lon, api_key))

        .catch(error => console.error('Error:', error)) //catch any error and log it to the console
}

//function to fetch the forecast of the city
function fetchForecast(lat, lon, api_key) {

    let forecast_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;

    fetch(forecast_url)
        .then(response => response.json()) //fetch the data from the url
        .then(forecastData => {
            create_table(forecastData);
            Pagination_working(forecastData);
        })
        .catch(error => console.error('Error:', error)) //catch any error and log it to the console
    // .finally(() => hideLoader()); // hideLoader is not defined in the original code snippets, commenting out to avoid error
}


//function to create the pagination
function Pagination_working(forecastData) {
    let page_curr = 1;
    const total_rows_page = 10;
    const total_rows = forecastData.list.length;
    const totalPages = Math.ceil(total_rows / total_rows_page);

    function renderPage(page) { //function to render the page

        let table_body = document.getElementById('table_body');
        table_body.innerHTML = '';
        let strt_pg = (page - 1) * total_rows_page;
        let end_pg = strt_pg + total_rows_page;
        let pageEntries = forecastData.list.slice(strt_pg, end_pg);

        pageEntries.forEach(entry => { //for each entry in the page, create a row in the table
            let row = document.createElement('tr');

            let date = new Date(entry.dt * 1000);
            let day = date.toLocaleDateString();

            //add the date, temperature, weather description, humidity and wind speed to the row
            row.innerHTML = ` 
                <td>${day} </td>
                <td>${entry.main.temp} °C</td>
                <td>${entry.weather[0].description}</td>
                <td>${entry.main.humidity} %</td>
                <td>${entry.wind.speed} m/s</td>
            `;

            table_body.appendChild(row); //append the row to the table
        });
    }

    //add event listener to the previous button
    document.getElementById('prev').onclick = () => {
        if (page_curr > 1) {
            page_curr--;
            renderPage(page_curr);
        }
    };

    document.getElementById('next').onclick = () => {
        if (page_curr < totalPages) {
            page_curr++;
            renderPage(page_curr);
        }

    };

    renderPage(page_curr); // Initial render
}

let originalData = [];

//function to apply the filter to the table
function apply_filter() {
    let filter_opt = document.getElementById('sort-options').value;
    let table_body = document.getElementById('table_body');
    let rows = originalData.slice();

    if (filter_opt === 'asc') { //if the filter option is ascending, sort the rows in ascending order
        rows.sort((a, b) => a.main.temp - b.main.temp);
    }
    else if (filter_opt === 'desc') { //if the filter option is descending, sort the rows in descending order
        rows.sort((a, b) => b.main.temp - a.main.temp);
    }

    else if (filter_opt === 'rain') { //if the filter option is rain, filter the rows to show only the rows with rain
        rows = rows.filter(entry => entry.weather[0].main === 'Rain');
    }

    else if (filter_opt === 'highest') { //if the filter option is highest, get the row with the highest temperature
        let high_temp;

        if (rows.length > 0) {
            high_temp = rows[0];
            for (let i = 1; i < rows.length; i++) {
                if (rows[i].main.temp > high_temp.main.temp) {
                    high_temp = rows[i];
                }
            }
        }
        rows = [high_temp];
    }

    table_body.innerHTML = '';

    rows.forEach(entry => {
        let row = document.createElement('tr');
        let date = new Date(entry.dt * 1000);
        let day = date.toLocaleDateString();

        row.innerHTML = `
            <td>${day} </td>
            <td>${entry.main.temp} °C</td>
            <td>${entry.weather[0].description}</td>
            <td>${entry.main.humidity} %</td>
            <td>${entry.wind.speed} m/s</td>
        `;

        table_body.appendChild(row);
    });
}

//function to create the table
function create_table(forecastData) {
    originalData = forecastData.list.slice(0, 10);
    let table_body = document.getElementById('table_body');
    table_body.innerHTML = '';

    originalData.forEach(entry => {
        let row = document.createElement('tr');
        let date = new Date(entry.dt * 1000);
        let day = date.toLocaleDateString();

        row.innerHTML = `
            <td>${day} </td>
            <td>${entry.main.temp} °C</td>
            <td>${entry.weather[0].description}</td>
            <td>${entry.main.humidity} %</td>
            <td>${entry.wind.speed} m/s</td>
        `;

        table_body.appendChild(row);
    });
}

//function to send chat to chatbot
function Send_chat() {
    let question = document.getElementById('question').value;
    let chatbox = document.getElementById('chat');

    let userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'chat-message user-message';

    let userMessage = document.createElement('p');
    userMessage.textContent = question;

    userMessageDiv.appendChild(userMessage);
    chatbox.appendChild(userMessageDiv);

    // Check if the question is related to weather
    if (question.toLowerCase().includes('weather')) {
        let city_name = question.split(' ').pop(); // Assuming the city name is the last word
        let api_key = '6235f3a1d357b365fc3db88b6dd6caa2';
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    alert('City not found'); //if the response is not ok, alert the user that the city is not found
                    throw new Error("City not found");
                }
                return response.json();
            })
            .then(data => { //if the response is ok, get the data and display the weather details

                let weatherMessageDiv = document.createElement('div');
                weatherMessageDiv.className = 'chat-message bot-message';

                let weatherMessage = document.createElement('p');

                let temp_in_celsius = data.main.temp - 273.15;

                weatherMessage.textContent = `The weather in ${city_name} is ${data.weather[0].description} with a temperature of ${temp_in_celsius.toFixed(2)} °C.`;

                weatherMessageDiv.appendChild(weatherMessage);
                chatbox.appendChild(weatherMessageDiv);
            })
            .catch(error => {
                let errorMessageDiv = document.createElement('div');
                errorMessageDiv.className = 'chat-message bot-message';
                let errorMessage = document.createElement('p');
                errorMessage.textContent = 'City not found';
                errorMessageDiv.appendChild(errorMessage);
                chatbox.appendChild(errorMessageDiv);
            });
    } else { // If the question is not related to weather, send the question to the chatbot
        const api_key = 'AIzaSyAWEM5eJ9ubBEmWyJR7q3RtiXGApdCjvr4';
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${api_key}`;

        const re_body = { // Request body
            contents: [
                {
                    parts: [
                        {
                            text: question
                        }
                    ]
                }
            ]
        };

        fetch(url, { // Fetch the response from the chatbot
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(re_body)
        })
            .then(response => response.json())
            .then(data => {
                let botMessageDiv = document.createElement('div');
                botMessageDiv.className = 'chat-message bot-message';

                let botMessage = document.createElement('p');

                if (data.candidates && data.candidates.length > 0) { // Check if the response is valid
                    botMessage.textContent = data.candidates[0].content.parts[0].text;
                } else {
                    botMessage.textContent = "Response not valid.";
                }

                botMessageDiv.appendChild(botMessage); // Append the bot message to the chat
                chatbox.appendChild(botMessageDiv);
            })
            .catch(error => {
                let errorMessageDiv = document.createElement('div');
                errorMessageDiv.className = 'chat-message bot-message';
                let errorMessage = document.createElement('p');
                errorMessage.textContent = 'Error fetching response: ' + error;
                errorMessageDiv.appendChild(errorMessage);
                chatbox.appendChild(errorMessageDiv);
            });
    }

    // Clear input
    document.getElementById('question').value = "";
    // Scroll to bottom
    chatbox.scrollTop = chatbox.scrollHeight;
}