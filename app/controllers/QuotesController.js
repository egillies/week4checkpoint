import { AppState } from "../AppState.js";
import { quotesService } from "../services/QuotesService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawQuotes() {
    const quote = AppState.quote
    let template = quote.QuoteTemplate
    setHTML('quotes', template)
}

export class QuotesController {
    constructor() {
        console.log('quotes controller loaded')
        AppState.on('quote', _drawQuotes)
        AppState.on('account', this.getQuotes)
    }

    async getQuotes() {
        try {
            quotesService.getQuotes()
        } catch (error) {
            Pop.error(error.message)
            console.error(error);
        }
    }
}