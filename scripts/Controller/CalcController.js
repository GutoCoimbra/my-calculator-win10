class CalcController {

    constructor(){ //ler sobre constructor
       
        this._lastOperator = '';
        this._lastNumber = '';
        this._operation = [];
        this._displayCalcEl = document.querySelector('#display');
        this.initialize();
        this.initButtonsEvents();
       
    }

    initialize(){

        this.setLastNumberToDisplay();

    }

    addEventListenerAll(element, events, fn){

        events.split(' ').forEach(event =>{

            element.addEventListener(event, fn, false);

        })

    }

    clearAll(){

        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';

        this.setLastNumberToDisplay();

    }

    clearEntry(){

        this._operation.pop();

        this.setLastNumberToDisplay();

    }

    getLastOperation(){
   
        return this._operation[this._operation.length-1];

    }

    setLastOperation(value){

        this._operation[this._operation.length-1] = value;
        
    }

    isOperator(value){
            
        return (['+', '-', '%', '*', '/'].indexOf(value) > -1)
    }

    pushOperation(value){

        this._operation.push(value);

        if (this._operation.length > 3) {

            this.calc();

        }
    }

    getResult(){
     
        return eval(this._operation.join(""));

    }
    calc(){

        let last = '';

        this._lastOperator = this.getLastItem();

        if (this._operation.length < 3){

            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        }

        if (this._operation.length > 3) {

            last = this._operation.pop();

            this._lastNumber = this.getResult();
        
        } else if (this._operation.length == 3) {

            this._lastNumber = this.getLastItem(false);
        }

        let result = this.getResult();

        if (last == '%') {

            result /= 100;

            this._operation = [result];
        
        } else {
        
            this._operation = [result];

            if (last) this._operation.push(last);

        }
        
        this.setLastNumberToDisplay();

    }

    getLastItem(isOperator = true){

        let lastItem;
        
        for (let i = this._operation.length-1; i >= 0; i--){

            if (this.isOperator(this._operation[i]) == isOperator){

                lastItem = this._operation[i];

                break;
            }
        }

        if (!lastItem){

            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }

        return lastItem;
    }

    setLastNumberToDisplay(){
        
        let lastNumber = this.getLastItem(false);
       
        if (!lastNumber) lastNumber = 0;
    
        this.displayCalc = lastNumber
    }

    addOperation(value){
        

        if (isNaN(this.getLastOperation())) { 
           
            if (this.isOperator(value)) {
                
                this.setLastOperation(value);

            } else {
                
                this.pushOperation(value);

                this.setLastNumberToDisplay();
                
            }

        } else {

            if (this.isOperator(value)) {

                this.pushOperation(value);

            } else {

            let newValue = this.getLastOperation().toString() + value.toString();
            
            this.setLastOperation(newValue);

            this.setLastNumberToDisplay();

            }

        }
 
    }

    setError(){

        this.displayCalc = "Error"
        
    }

    addComma(){
        
       let lastOperation =  this.getLastOperation();

       if (typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;
    
       if (this.isOperator(lastOperation) || !lastOperation){

        this.pushOperation('0.');
    
       } else {

        this.setLastOperation(lastOperation.toString() + '.');
       }

       this.setLastNumberToDisplay();
    }

    execBtn(value){

        switch (value) {
            
            case '%':
                this.addOperation('%');
                break;
            case '√':
                this.addOperation('√');
                break;
            case 'x²':
                this.addOperation('x²');
                break;
            case '¹/x':
                this.addOperation('¹/x');
                break;
            case 'CE':
                this.clearEntry();
                break;
            case 'C':
                this.clearAll();
                break;
            case '←':
                this.delete();
                break;
            case '÷':
                this.addOperation('/');
                break;
            case 'X':
                this.addOperation('*');
                break;
            case '-':
                this.addOperation('-');
                break;
            case '+':
                this.addOperation('+');
                break;
            case '=':
                this.calc();
                break;
            case ',':
                this.addComma();
                break;
            case '±':
                this.addOperation('±');
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            
            default:
                this.setError();
                break;
                
            }
    }

    initButtonsEvents() {

        let buttons = document.querySelectorAll("button.btn");
 
        buttons.forEach((btn, index)=>{
 
         this.addEventListenerAll(btn, 'click drag', e => {
 
             let txtBtn = btn.innerHTML;
 
             this.execBtn(txtBtn);
         
         })
 
         this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
 
             btn.style.cursor = "pointer";
 
         })
 
        })
 
     }

get displayCalc() {
    
    return this._displayCalcEl.innerHTML;

    
}

set displayCalc(value) {
    this._displayCalcEl.innerHTML = value;
}
}