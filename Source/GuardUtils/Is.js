import { Guards } from "../Guards.js";
export class Is{
    constructor(guardFuncBag){
        this.is=this
        this.guardFuncBag=guardFuncBag
        this.guards = new Guards()
    }
    DefaultBlock(obj){
        if(guardObj['~DEFAULT~']){
            return true
        }
    }

    TerminalBlockObj(guardObj){
        try{
            if(this.is.TerminalTypeBlockObj(guardObj)|| this.is.TerminalDefaultBlockObj(guardObj)){
            return true;
            }
        }catch{
        }
            
    }
    
    RecursiveBlockObj(guardObj){
        if(this.is.RecursiveDefaultBlockObj(guardObj)||this.is.RecursiveTypeBlockObj(guardObj)){
            return true;
        }
    }

    RecursiveTypeBlockObj(guardObj){
        if((this.guardFuncBag.includes(Object.keys(guardObj)[0])== true) && Object.keys(guardObj).length==1){
            return true;
        }
    }

    RecursiveDefaultBlockObj(guardObj){
        var defaultPresent;
        var recursivePresent;
        for(var i = 0; i<Object.keys(guardObj).length; i++){
            if(this.guardFuncBag.includes(Object.keys(guardObj)[i])){recursivePresent=true}
        }
        if(Object.keys(guardObj).includes('~DEFAULT~')){defaultPresent=true}
        if(defaultPresent&&recursivePresent){
            return true;
        }
    }

    TerminalTypeBlockObj(guardObj){
        if(Object.keys(guardObj).length==1){
            var arr = guardObj[Object.keys(guardObj)[0]].split('is')
            var guard = 'is'+arr.pop()
            if(
                this.guardFuncBag.includes(Object.keys(guardObj)[0])
                &&
                this.guardFuncBag.includes(guard)
            ){
                return true
            }
        }
    }

    TerminalDefaultBlockObj(guardObj){
        if(Object.keys(guardObj).length==2){
            var defaultPresent;
            var recursivePresent;
            var recursiveIndex;
            for(var i = 0; i<Object.keys(guardObj).length; i++){
                try{
                    var arr = guardObj[Object.keys(guardObj)[i]].split('is')
                    var guard = 'is'+arr.pop()
                    if(this.guardFuncBag.includes(guard)){
                        recursivePresent=true
                        recursiveIndex=i
                    }
                }catch{}
            }

            if(Object.keys(guardObj).includes('~DEFAULT~')){defaultPresent=true}
            try{
                var arr = guardObj[Object.keys(guardObj)[recursiveIndex]].split('is')
                var guard = 'is'+arr.pop()
                if(
                    this.guardFuncBag.includes(Object.keys(guardObj)[recursiveIndex])
                    &&
                    this.guardFuncBag.includes(guard)
                    &&
                    defaultPresent
                ){
                    return true
                }
            }catch{}
        }
    }

    Guard(func){
        if( typeof eval('this.guards.'+func) === "function" ){
          return true
        }
      }
}