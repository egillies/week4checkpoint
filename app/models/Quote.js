import { AppState } from "../AppState.js";

export class Quote {
    constructor(data) {
        this.id = data.id
        this.content = data.content
        this.author = data.author
    }

    get QuoteTemplate() {
        return `
            <div class="col-10 d-flex">
                <section class="row quote-box p-2">
                    <p>${this.content}</p>
                    <div class="on-hover">
                        <p>${this.author}</p>
                    </div>
                </section>
            </div>
        `
    }
}