import { AppState } from "../AppState.js"
import { WeathersController } from "../controllers/WeathersController.js"
import { Weather } from "../models/Weather.js"
import { api } from "./AxiosService.js"


class WeathersService {

    async getWeather() {
        const res = await api.get('api/weather')

        console.log('got weather', res.data);

        const newWeather = res.data

        AppState.weather = new Weather(newWeather)

        AppState.emit('weather')

    }
}

export const weathersService = new WeathersService