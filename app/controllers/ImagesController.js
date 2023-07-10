import { AppState } from "../AppState.js";
import { imagesService } from "../services/ImagesService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";


function _drawImages() {
    const images = AppState.images

    const htmlBody = document.body

    htmlBody.style.backgroundImage = `url(${images.largeImgUrl})`

    setHTML('imageDetails', images.DetailsTemplate)
}

export class ImagesController {
    constructor() {
        this.getRandomImages()

        AppState.on('images', _drawImages)

        console.log('images controller loaded')
    }

    async getRandomImages() {
        try {
            imagesService.getRandomImages()
        } catch (error) {
            Pop.error(error.message)
            console.error(error);
        }
    }

    // async getRandomImagesByQuery(event) {
    //     try {
    //         event.preventDefault()

    //         let form = event.target

    //         let formData = getFormData(form)

    //         console.log('form data', formData);

    //         imagesService.getRandomImagesByQuery(formData)
    //     } catch (error) {
    //         Pop.error(error.message)
    //         console.error(error);
    //     }
    // }
}