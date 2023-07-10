import { AppState } from "../AppState.js";
import { Image } from "../models/Image.js";
import { api } from "./AxiosService.js";

class ImagesService {
    async getRandomImages() {
        
        const res = await api.get('api/images')

        console.log('got random image', res.data);

        const newImage = new Image(res.data)

        AppState.images = newImage
    }

}

export const imagesService = new ImagesService