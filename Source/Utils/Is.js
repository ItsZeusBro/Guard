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
    //we only want to check base case operation here because iterator passes an individual object to us
}

