import { AppState } from "../AppState.js"
import { Weather } from "../models/Weather.js"
import { weathersService } from "../services/WeathersService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"


function _drawWeather() {
    const weather = AppState.weather
    let template = weather.WeatherTemplate
    setHTML('weather', template)
}

export class WeathersController {
    constructor() {
        console.log('weather controller loaded')
        AppState.on('weather', _drawWeather)
        AppState.on('account', this.getWeather)
    }

    async getWeather() {
        try {
            weathersService.getWeather()
        } catch (error) {
            Pop.error(error.message)
            console.error(error);
        }
    }

    toggleCelsius() {
        const celsius = AppState.weather.celsius
        AppState.weather.celsius = !celsius

        _drawWeather()
    }
}