
var input = document.querySelector("#input");
var searchBarEl = document.querySelector("#searchBar");
var apiKey = "cc0586831cf39b9f5055de569bd8dad8"; 
var cityInfoEl = document.querySelector("#cityInfo"); 
var forecastEl = document.querySelector("#forecast");
var cityNameEl = document.querySelector("#cityName"); 
var cityTempEl = document.querySelector("#temp"); 
var windEl = document.querySelector("#wind");
var humidEl = document.querySelector("#humidity");

function searchApi(cityName) { 
    
    //futureForecast();
    cityNameEl.textContent = cityName;
    var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=cc0586831cf39b9f5055de569bd8dad8"; 
    console.log(cityName);
    fetch(weatherAPI) 
        
        .then(function (response) { 
        return response.json(); 
    }) 
        .then(function (data) { 
        console.log(data);
        var lat = data.coord.lat;
        var lon = data.coord.lon; 
        var tempature = data.main.temp; 
        var farTemp = 1.8*(tempature-273) + 32;
        var humidity = data.main.humidity; 
        var windSpeed = data.wind.speed; 
        console.log(farTemp); 
        cityTempEl.textContent = "Temp: " + farTemp + "°F"; 
        windEl.textContent = "Wind: " + windSpeed + "MPH"; 
        humidEl.textContent = "Humidity: " + humidity + "%"; 
        saveData(cityName);
        
        // begins the 5 day forecast api
        var forecastAPI = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&cnt=50&appid=" + apiKey + "&units=imperial";
        fetch(forecastAPI) 
            .then(function (response) { 
            return response.json();
            }) 
            .then(function (data) { 
                console.log (data);  
                var one = data.list[8];
                var two = data.list[16];
                var three = data.list[24];
                var four = data.list[32];
                var five = data.list[39]; 
                //document.querySelector("dateOne").textContent = "Day One";
                document.querySelector("#tempOne").textContent = "Temp: " + one.main.temp + " °F"; 
                document.querySelector("#windOne").textContent = "Wind: " + one.wind.speed + " MPH"; 
                document.querySelector("#humidityOne").textContent = "Humidity: " + one.main.humidity + "%"; 

                document.querySelector("#tempTwo").textContent = "Temp: " + two.main.temp + " °F"; 
                document.querySelector("#windTwo").textContent = "Wind: " + two.wind.speed + " MPH"; 
                document.querySelector("#humidityTwo").textContent = "Humidity: " + two.main.humidity + "%"; 

                document.querySelector("#tempThree").textContent = "Temp: " + three.main.temp + " °F"; 
                document.querySelector("#windThree").textContent = "Wind: " + three.wind.speed + " MPH"; 
                document.querySelector("#humidityThree").textContent = "Humidity: " + three.main.humidity + "%"; 

                document.querySelector("#tempFour").textContent = "Temp: " + four.main.temp + " °F"; 
                document.querySelector("#windFour").textContent = "Wind: " + four.wind.speed + " MPH"; 
                document.querySelector("#humidityFour").textContent = "Humidity: " + four.main.humidity + "%"; 

                document.querySelector("#tempFive").textContent = "Temp: " + five.main.temp + " °F"; 
                document.querySelector("#windFive").textContent = "Wind: " + five.wind.speed + " MPH"; 
                document.querySelector("#humidityFive").textContent = "Humidity: " + five.main.humidity + "%"; 

                


            })
        

    })   

}; 

function saveData(cityName) { 
    let localStorageData = JSON.parse(localStorage.getItem("searchHistory"))
    console.log(localStorageData);
    let cityObject = {
        cityName: cityName
    }
    if (localStorageData === null){ 
        localStorage.setItem('searchHistory', JSON.stringify([cityObject]))
    } else { 
        localStorageData.push(cityObject)
        localStorage.setItem('searchHistory', JSON.stringify(localStorageData))
    }
}

function displayHistory () { 
    let historyEl = document.getElementById('searchHistory');
    historyEl.innerHTML= ""
    let ul=document.createElement("ul") 
    let localStorageData = JSON.parse(localStorage.getItem('searchHistory'));
    if (localStorageData !== null){
        for (let i =0; i < localStorageData.length; i++) { 
            let li = document.createElement('li'); 
            let btn = document.createElement('button'); 
            btn.innerHTML= localStorageData[i].cityName; 
            btn.addEventListener("click", function(event){ 
                event.preventDefault(); 
                console.log(event.target.innerHTML);
                searchApi(event.target.innerHTML);
            })
            li.append(btn);
            ul.append(li);
        } 
     
        historyEl.append(ul);

    }
    
    
    
} 
displayHistory();

function init (){ 
    var cityName = searchBarEl.value.trim();
    searchApi(cityName)
}

input.addEventListener("click", init);