const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'bda2e2dd1bmsh6559c0a4d8b3618p1ce090jsnb44e9cf406bc',
		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
};

function showNotification(){
	const notification =new Notification("Weather alert from wise work project!!", {
		body:"The temperature is above 25 degrees apply sun screen"
	});
	
}

console.log(Notification.permission);
if(Notification.permission=="granted"){
	showNotification();
}
else if(Notification.permission!=="denied"){
	Notification.requestPermission().then(permission=>{
		if(permission==="granted"){
			showNotification();
		}
	});
}

const getWeather = (city) =>{
	cityName.innerHTML=city
	fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city , options)
		.then(response => response.json())
		.then(response => {
			console.log(response)
			cloud_pct.innerHTML = response.cloud_pct
			temp.innerHTML = response.temp
			feels_like.innerHTML = response.feels_like
			humidity.innerHTML = response.humidity
			min_temp.innerHTML = response.min_temp
			max_temp.innerHTML = response.max_temp
			wind_speed.innerHTML = response.wind_speed
	})
	.catch(err => console.error(err));
}



const getWeatherH = (city) =>{
	cityName.innerHTML=city
	fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city , options)
		.then(response => response.json())
		.then(response => {
			console.log(response)
			
			temph.innerHTML = response.temp
			
			humidityh.innerHTML = response.humidity
			
			
	})
	.catch(err => console.error(err));
}

const getWeathera = (city) =>{
	cityName.innerHTML=city
	fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city , options)
		.then(response => response.json())
		.then(response => {
			console.log(response)
			
			tempa.innerHTML = response.temp
			
			humiditya.innerHTML = response.humidity
			
	})
	.catch(err => console.error(err));
}

const getWeatherd = (city) =>{
	cityName.innerHTML=city
	fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city , options)
		.then(response => response.json())
		.then(response => {
			console.log(response)
			
			tempd.innerHTML = response.temp
			
			humidityd.innerHTML = response.humidity
			
			
	})
	.catch(err => console.error(err));
}
submit.addEventListener("click", ()=>{
	getWeather(city.value)
})

getWeatherH("Hyderabad")
getWeather("Bangalore")
getWeathera("Adilabad")
getWeatherd("Delhi")