//add hover effect to the button and toggleTemp button
function add_hover_effect() { 
  
    let button = document.getElementById('btn');
    button.style.backgroundColor = 'rgba(192, 199, 202, 0.5)';

    let toggleTempBtn = document.getElementById('toggleTemp');


    button.addEventListener('mouseover', function() {
        button.style.backgroundColor = '#808080';
        
    });

    button.addEventListener('mouseout', function() {
        button.style.backgroundColor = 'rgba(192, 199, 202, 0.5)';
       
    });


    toggleTempBtn.addEventListener('mouseover', function() {
        toggleTempBtn.style.backgroundColor = '#808080';
        
    }
    );

    toggleTempBtn.addEventListener('mouseout', function() {
        toggleTempBtn.style.backgroundColor = 'rgba(192, 199, 202, 0.5)';
        
    }
);
}

//get the weather details of the city
function get_Weather_details() {

    let city_name = document.getElementById('city').value;
    let api_key = '6235f3a1d357b365fc3db88b6dd6caa2';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}`;

    fetch(url)
        .then(response => {
            if (!response.ok) { //if the response is not ok, alert the user that the city is not found
                alert('City not found');
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => { //if the response is ok, get the data and display the weather details
            console.log(data);
            let city = document.getElementById("city-name");
            city.innerText = 'City Name: ' + data.name;

            let temp = document.getElementById("temp");
            let celsius = data.main.temp - 273.15;
            temp.innerHTML = 'Temperature: ' + celsius.toFixed(2) + '°C';

            let humidity = document.getElementById("humidity");
            humidity.innerHTML = 'Humidity: ' + data.main.humidity + '%';

            let wind_speed = document.getElementById("wind");
            wind_speed.innerHTML = 'Wind Speed: ' + data.wind.speed + 'm/s';

            let weather_desc = document.getElementById("weather");
            weather_desc.innerHTML = 'Weather: ' + data.weather[0].description;

            let weather_icon = document.getElementById("icon");
            weather_icon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

            let weather_widget = document.getElementsByClassName('weather-widget');
           
            
            weather_widget[0].style.boxShadow = '0 4px 8px 0 rgba(1, 20, 44, 0.2)';

            //when the mouse is over the widget, zoom in the widget
            weather_widget[0].onmouseover = function() {
                weather_widget[0].style.transform = 'scale(1.01)';
            }

            //when the mouse is out of the widget, zoom out the widget
            weather_widget[0].onmouseout = function() {
                weather_widget[0].style.transform = 'scale(1)';
            }

            let weather = data.weather[0].main;
            let input = document.getElementById('city');
            let button = document.getElementById('btn');
            let toggleTempBtn = document.getElementById('toggleTemp');

            //change the background of the widget based on the weather condition
            if (weather_desc.innerHTML.includes('rain')) {
                weather_widget[0].style.backgroundImage = 'url(rain.jpg)';
                weather_widget[0].style.backgroundSize = 'cover';
                weather_widget[0].style.color = 'white';
                
                input.style.backgroundColor = 'rgba(192, 199, 202, 0.5)';
                
                button.style.backgroundColor = 'rgba(192, 199, 202, 0.5)';

                toggleTempBtn.style.backgroundColor = 'rgba(192, 199, 202, 0.5)';

                add_hover_effect();

            } 
            else if (weather_desc.innerHTML.includes('cloud')) {
                weather_widget[0].style.backgroundImage = 'url(cloud.jpg)';
                weather_widget[0].style.backgroundSize = 'cover';
                weather_widget[0].style.color = 'white';
               
                input.style.backgroundColor = 'rgba(192, 199, 202, 0.5)';
              
                button.style.backgroundColor = 'rgba(192, 199, 202, 0.5)';

                toggleTempBtn.style.backgroundColor = 'rgba(192, 199, 202, 0.5)';


                add_hover_effect();

            } 
            else if (weather_desc.innerHTML.includes('clear')) {
                weather_widget[0].style.backgroundImage = 'url(clearsky.jpg)';
                weather_widget[0].style.backgroundSize = 'cover';
                weather_widget[0].style.color = 'rgb(238, 230, 8)';
                
                input.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
               
                button.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';

                toggleTempBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';

                add_hover_effect();
            } 
            else if (weather_desc.innerHTML.includes('snow')) {
                weather_widget[0].style.backgroundImage = 'url(snow.jpeg)';
                weather_widget[0].style.backgroundSize = 'cover';
                weather_widget[0].style.color = 'black';
                
                input.style.backgroundColor = 'rgba(192, 199, 202, 0.5)';
                
                button.style.backgroundColor = 'rgba(192, 199, 202, 0.5)';

                toggleTempBtn.style.backgroundColor = 'rgba(192, 199, 202, 0.5)';

                add_hover_effect();
            } 
            else if (weather_desc.innerHTML.includes('mist') || weather_desc.innerHTML.includes('fog')) {
                weather_widget[0].style.backgroundImage = 'url(mist.jpg)';
                weather_widget[0].style.backgroundSize = 'cover';
                weather_widget[0].style.color = 'rgb(238, 230, 8)';
                
                input.style.backgroundColor = 'rgba(192, 199, 202, 0.5)';
                
                button.style.backgroundColor = 'rgba(192, 199, 202, 0.5)';

                toggleTempBtn.style.backgroundColor = 'rgba(192, 199, 202, 0.5)';
              
               add_hover_effect();


            } 
            else if (weather_desc.innerHTML.includes('haze')) {
               
                weather_widget[0].style.backgroundColor = '#e0e7ea';
                weather_widget[0].style.backgroundImage = 'url(haze.jpeg)';
                weather_widget[0].style.backgroundSize = 'cover';
                weather_widget[0].style.color = 'black';
                
                input.style.backgroundColor = '#c0c7ca';
                
                button.style.backgroundColor = '#c0c7ca';

                toggleTempBtn.style.backgroundColor = '#c0c7ca';

                add_hover_effect();
            } 
            else {
                weather_widget[0].style.backgroundColor = 'lightblue';
                weather_widget[0].style.color = 'black';
               
                input.style.backgroundColor = '#9edefa';
                button.style.backgroundColor = '#9edefa';

                toggleTempBtn.style.backgroundColor = '#9edefa';

                add_hover_effect();
            }

            //toggle between celsius and fahrenheit
            document.getElementById('toggleTemp').addEventListener('click', function() {
                if (temp.innerHTML.includes('°C')) {
                    let fahrenheit = (celsius * 9 / 5) + 32;
                    temp.innerHTML = 'Temperature: ' + fahrenheit.toFixed(2) + '°F';
                } else {
                    temp.innerHTML = 'Temperature: ' + celsius.toFixed(2) + '°C';
                }
            }
            );
            

        })
        .catch(error => { //if there is an error, log the error
            console.log(error);
        })


}

//get the forecast of the city
function get_forecast() {
    
    let city_name = document.getElementById('city').value;
    let api = '6235f3a1d357b365fc3db88b6dd6caa2'; //api key
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${api}`;

    fetch(url)
        .then(response => { 
            if (!response.ok) { //if the response is not ok, alert the user that the city is not found
                alert('City not Found!!');
                throw new Error('Error');
            }
            return response.json(); //if the response is ok, return the response in json format
        })
        .then(data => { //if the response is ok, get the data and display the forecast
            let forecastData = data.list;
            //filter the forecast data to get the forecast for the next five days
            let filteredData = forecastData.filter((entry, index) => index % 8 === 0).slice(0, 5);

            let dates = []; //array to store the dates
            let temps = []; //array to store the temperatures
            let weatherConditions = {}; //object to store the weather conditions

            filteredData.forEach(entry => { //loop through the filtered data and get the dates, temperatures and weather conditions
                let date = new Date(entry.dt_txt).toLocaleDateString(); 
                dates.push(date); 
                temps.push(entry.main.temp - 273.15);

                let condition = entry.weather[0].main;
                if (weatherConditions[condition]) { //if the weather condition is already in the object, increment the value by 1
                    weatherConditions[condition]++;
                } else {
                    weatherConditions[condition] = 1;
                }
            });

            let temperature_chart = document.getElementById('tempChart').getContext('2d'); //get the context of the canvas element
            new Chart(temperature_chart, { //create a new chart
                type: 'bar',
                data: {
                    labels: dates,
                    datasets: [{ //create a dataset
                        label: 'Five Days Temperature (°C)',
                        data: temps,
                        backgroundColor: '#007BFF',
                        borderColor: 'black',
                        borderWidth: 1
                    }]
                },
                options: { //set the options for the chart
                    animation: {
                        delay: 1000 //delay the animation by 1 second
                    },
                    scales: {
                        y: {
                            beginAtZero: true //begin the y-axis at zero
                        }
                    },
                    maintainAspectRatio: false,
                    responsive: true,
                    aspectRatio: 1.5
                }
            });

            //create a doughnut chart
            let doughnut_chart = document.getElementById('doughnutChart').getContext('2d');
            new Chart(doughnut_chart, {
                type: 'doughnut',
                data: { //set the data for the doughnut chart
                    labels: Object.keys(weatherConditions),
                    datasets: [{
                        data: Object.values(weatherConditions), //set the data for the doughnut chart
                        backgroundColor: [ //set the background color for the doughnut chart
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#4BC0C0',
                            '#9966FF',
                            '#FF9F40'
                        ],
                        borderColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#4BC0C0',
                            '#9966FF',
                            '#FF9F40'
                        ],
                        borderWidth: 1
                    }]
                },
                options: { //set the options for the doughnut chart
                    animation: {
                        delay: 1000
                    },
                    maintainAspectRatio: false,
                    responsive: true,
                    aspectRatio: 1.5
                }
            });

            //create a line chart
            let line_chart = document.getElementById('lineChart').getContext('2d');
            new Chart(line_chart, { //create a new chart
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        label: 'Temperature (°C)',
                        data: temps,
                        backgroundColor: '#007BFF',
                        borderColor: '#007BFF',
                        borderWidth: 1,
                        fill: false
                    }]
                },
                options: {
                    animation: {
                        drop: true
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    maintainAspectRatio: false,
                    responsive: true,
                    aspectRatio: 1.5
                }
            });

           //add the charts to the charts_container div

        let chartsContainer = document.getElementsByClassName('charts_container')[0];
        chartsContainer.style.width = '33.3%';
        
        let tempChart = document.getElementById('tempChart');
        let doughnutChart = document.getElementById('doughnutChart');
        let lineChart = document.getElementById('lineChart');

        tempChart.style.backgroundColor = 'white';
        doughnutChart.style.backgroundColor = 'white';
        lineChart.style.backgroundColor = 'white';

        tempChart.style.boxShadow = '0 4px 8px 0 rgba(1, 20, 44, 0.2)';
        doughnutChart.style.boxShadow = '0 4px 8px 0 rgba(1, 20, 44, 0.2)';
        lineChart.style.boxShadow = '0 4px 8px 0 rgba(1, 20, 44, 0.2)';

        //when the mouse is over the chart, zoom in the chart
        tempChart.onmouseover = function() {
            tempChart.style.transform = 'scale(1.01)';
        }

        doughnutChart.onmouseover = function() {
            doughnutChart.style.transform = 'scale(1.01)';
        }

        lineChart.onmouseover = function() {
            lineChart.style.transform = 'scale(1.01)';
        }

        //when the mouse is out of the chart, zoom out the chart
        tempChart.onmouseout = function() {
            tempChart.style.transform = 'scale(1)';
        }

        doughnutChart.onmouseout = function() {
            doughnutChart.style.transform = 'scale(1)';
        }

        lineChart.onmouseout = function() {
            lineChart.style.transform = 'scale(1)';
        }


        chartsContainer.appendChild(tempChart);
        chartsContainer.appendChild(doughnutChart);
        chartsContainer.appendChild(lineChart);

        

        //add some styles to the charts

            
            // document.getElementById('tempChart').style.width = '30%';
            // document.getElementById('tempChart').style.padding = '20px';
            // document.getElementById('doughnutChart').style.width = '30%';
            // document.getElementById('lineChart').parentElement.style.width = '30%';
            // document.getElementById('tempChart').style.backgroundColor = 'white';
            // document.getElementById('doughnutChart').style.backgroundColor = 'white';
            // document.getElementById('lineChart').style.backgroundColor = 'white';

            window.addEventListener('resize', function() { //add responsiveness to the charts
                let chartsContainer = document.getElementsByClassName('charts_container')[0];
                let tempChart = document.getElementById('tempChart');
                let doughnutChart = document.getElementById('doughnutChart');
                let lineChart = document.getElementById('lineChart');

                if (window.innerWidth <= 768) {
                    chartsContainer.style.width = '100%';
                    tempChart.style.width = '100%';
                    doughnutChart.style.width = '100%';
                    lineChart.style.width = '100%';
                } else {
                    chartsContainer.style.width = '33.3%';
                    tempChart.style.width = '100%';
                    doughnutChart.style.width = '100%';
                    lineChart.style.width = '100%';
                }
                //add responsiveness for 320 x 591px
                if (window.innerWidth <= 480) {
                    
                    chartsContainer.style.width = '100%';
                    tempChart.style.width = '100%';
                    doughnutChart.style.width = '100%';
                    lineChart.style.width = '100%';
                    tempChart.style.padding = '0';
                    doughnutChart.style.padding = '0';
                    lineChart.style.padding = '0';
                    //set left margin for charts_container
                    chartsContainer.style.marginLeft = '2px';
                    

                }

            });
           
        })
        .catch(error => {
            console.log(error);
        });
}
