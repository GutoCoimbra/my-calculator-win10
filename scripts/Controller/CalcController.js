class CalcController {

    constructor(){

        this._displayCalc = "0";
        this.initialize();
        this.initButtonsEvents();
    }

    initialize(){

        let displayCalcEL = document.querySelector("#display");

        displayCalcEL.innerHTML = "0"
    }

    initButtonsEvents() {

       let buttons = document.querySelectorAll("button.btn");

       buttons.forEach((btn, index)=>{

        btn.addEventListener('click', e => {

            console.log(btn.innerHTML);
        })



       })

    }

    get displayCalc() {
        return this._displayCalc;
    }

    set displayCalc(value) {
        this._displayCalc = value;
    }
}