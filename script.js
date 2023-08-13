//listen for inputs

document.querySelector("button").addEventListener("click", () => {
  let city = document.querySelector(".inbox").value;
  fetchapi(city);
});
document.querySelector("body").addEventListener("keydown", (eve) => {
  if (eve.key == "Enter") {
    let city = document.querySelector(".inbox").value;
    fetchapi(city);
  }
});


//Suggest city name
const allcity = [];
let data = function () {
  fetch("./city.list.min.json")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      for (let i = 0; i < res.length; i++) {
        allcity.push(res[i]["name"]);
      }
    })
    .then((res) => console.log(allcity));
};
data();

 function  suggest(value){
  
  let count= 0
  document.getElementById("datalist").innerHTML=""
  let n= allcity.length;
   for(let i=0; i<n;i++){
    
    if((allcity[i].toLowerCase()).indexOf((value.toLowerCase())) > -1){
      count++
      let node = document.createElement("option");
      let val= document.createTextNode(allcity[i]);
      node.appendChild(val);

      document.getElementById("datalist").appendChild(node)
      if(count==10)break

    }
  }
}


//fetch city weather
let fetchapi = function (city) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b7629cf264b0cfa72dd515788f9d86ad`,
    { method: "GET" }
  )
    .then((res) => {
      return res.json();
    })
    .then(display)
    .catch(()=>{
      document.querySelector(".city").innerHTML="<p>Not found in database <br/> Try different keyword</p>"
    });
};

function display(res) {
  document.querySelector(".border").classList.add("result");
  let allDirections = [
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
    "N",
  ];
  let windd = Math.floor(res.wind.deg / 22.5);
  let city = `City: ${res.name}, ${res.sys.country}`;
  let temp = `Temp: ${Math.ceil(res.main.temp - 273.15)}°`;
  let windSpeed = `Wind Speed: ${Math.floor(res.wind.speed * 3.6)} km/hr`;
  let windDire = `Wind Direction: ${allDirections[windd]}`;
  let pressure = `Pressure: ${res.main.pressure} hPa`;
  let humidity = `Humidity: ${res.main.humidity} %`;
  let weather = `Weather: ${res.weather[0].main} `;
  document.querySelector(".city").innerHTML = city;
  document.querySelector(".weather").innerHTML = weather;
  document.querySelector(".temp").innerHTML = temp;
  document.querySelector(".windspeed").innerHTML = windSpeed;
  document.querySelector(".windDire").innerHTML = windDire;
  document.querySelector(".pressure").innerHTML = pressure;
  document.querySelector(".humidity").innerHTML = humidity;
  console.log(res);
}
