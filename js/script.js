const input = document.querySelector("#city")
const place = document.querySelector(".place")
const temperature = document.querySelector(".temperature")
const img = document.querySelector(".img")
const wind = document.querySelector(".wind")
const result = document.querySelector(".result")

search = () =>{
    if(!input.value) return
    getDataApi()
}

async function getDataApi(){
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
        input.value
    )}&units=metric&appid=b4645352d65a2639ca324ae0616c5111`;

    try{
        await fetch(url)
        .then((res) => res.json())
        .then((data) => {
            if(data?.cod && data === "404"){
                return alert("Localização não encontrada. Tente novamente!")
            }

            loadData(data)

        })
    }catch(err){
        console.log(err)
    }
}

function loadData(data){
    place.innerHTML = `${data.name}, ${data.sys.country}`
    temperature.innerHTML = `Temperatura: ${Math.floor(data.main.temp)}°C`
    img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    wind.innerHTML = `Vento: ${data.wind.speed} km/h`
    result.style.visibility = "visible"
}