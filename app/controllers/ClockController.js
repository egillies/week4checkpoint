import { AppState } from "../AppState.js";



export class ClockController {
    constructor() {
        console.log("Clock controller loaded");
        AppState.on('account', _drawClock)
    }
}

function _drawClock() {
    let date = new Date();

    document.getElementById('clock').innerText = date.toLocaleTimeString();

    let t = setTimeout(_drawClock, 1000);
}

