import { api } from "../services/AxiosService.js"

export class Weather {
    constructor(data) {
        this.name = data.name
        this.weather = data.weather
        this.temp = data.main.temp
        this.celsius = false
    }

    get WeatherTemplate() {
        const tempCelsius = this.temp - 273.15
        const tempFahrenheit = (this.temp - 273.15) * 1.8 + 32

        let finalTemp = 0
        if (this.celsius) {
            finalTemp = tempCelsius
        } else {
            finalTemp = tempFahrenheit
        }

        let weatherItemsString = ''

        weatherItemsString = `<p>${this.weather[0].description}</p>`

        // this.weather.forEach(item => {
        //     weatherItemsString += `<p>${item.description}</p>`
        // });
        return `
        <section class="row">
          <p>${this.name}</p>
          <p>${weatherItemsString}</p>
          <p>${Math.round(finalTemp)}</p>
           <p> <span> Celsius/Fahrenheit </span> <input ${this.celsius ? 'checked' : ''} onchange="app.WeathersController.toggleCelsius()" type="checkbox"></p>
        
        </section>
        `
    }

}