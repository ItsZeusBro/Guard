import { Guards } from "./Guards.js";
export class Is{
    constructor(utils){
        this.is=this
        this.guardFuncBag=utils.guardFuncBag
        this.guards = utils.guards
    }
    
    Base(){
        //returns the type of base case it is or undefined
    }

    Recursive(){
        //returns the type of recursive case it is or undefined
    }

}