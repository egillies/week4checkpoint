import { AppState } from "../AppState.js";
import { Quote } from "../models/Quote.js";
import { api } from "./AxiosService.js";

class QuotesService {
    async getQuotes() {
        const res = await api.get('api/quotes')
        console.log('got quote', res.data);

        const newQuote = res.data

        AppState.quote = new Quote(newQuote)

        AppState.emit('quote')
    }
}




export const quotesService = new QuotesService()