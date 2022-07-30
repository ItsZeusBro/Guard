import { Guards } from "./Guards.js";
export class Is{
    constructor(utils){
        this.is=this
        this.guardFuncBag=utils.guardFuncBag
        this.guards = utils.guards
    }
    
    Base(obj){
        if(!this.guards.isObj(obj)){return}
        
        //  {
        //      'isGuard':[]    
        //  }


        //  {
        //      'isGuard':{
        //              //any arbitrary object
        //         }    
        //  }


        //  {
        //      'isGuard':''        
        //  }

    }

    Recursive(obj){
        if(!this.guards.isObj(obj)){return}

        //returns the type of recursive case it is or undefined
        //recursive pattern

        //  {
        //      'isGuard':[
        //              {
        //                  'isGuard':Anything
        //              },
        //              {
        //                  'isString':Anything
        //              }
        //       ]  
        //  } 

    }



}

