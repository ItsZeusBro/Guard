
export class Get{
    constructor(guardFuncBag){
        this.guardFuncBag=guardFuncBag
        this.get=this
        this.is=new Is()
    }

    GuardKey(obj){
        if(this.get.GuardObj(obj)){
            if(this.guardFuncBag.includes(Object.keys(this.get.GuardObj(obj))[0])){
                return Object.keys(this.get.GuardObj(obj))[0]
            }
        }
    }

    GuardObj(guardObj){
        var keys = Object.keys(guardObj)
        if(!(keys.length>=1)){return}
        for(var i = 0; i<keys.length; i++){
            if(keys[i]=='~DEFAULT~'){
                keys.splice(i, 1)
            }
        }
        return {[keys[0]]:guardObj[keys[0]]}
    }


    DefaultObj(guardObj){
        if(guardObj['~DEFAULT~']){
            return {'~DEFAULT~':guardObj['~DEFAULT~']}
        }
    }

    TerminalString(obj){
        return obj[this.get.GuardKey(obj)]
    }

    NextRecursiveBlockObj(obj){
        return this.get.GuardObj(obj)[this.get.GuardKey(obj)]
    }



    RecursiveDefaultBlockObj(guardObj){
        for(var i = 0; i<Object.keys(guardObj).length; i++){
            if(this.is.RecursiveDefaultBlockObj(guardObj[Object.keys(guardObj)[i]])){return true}
        }
    }
    RecursiveTypeBlockObj(guardObj){
        for(var i = 0; i<Object.keys(guardObj).length; i++){
            if(this.is.RecursiveTypeBlockObj(guardObj[Object.keys(guardObj)[i]])){return true}
        }
    }
    TerminalDefaultBlockObj(guardObj){
        for(var i = 0; i<Object.keys(guardObj).length; i++){
            if(this.is.TerminalDefaultBlockObj(guardObj[Object.keys(guardObj)[i]])){return true}
        }
    }
    TerminalTypeBlockObj(guardObj){
        for(var i = 0; i<Object.keys(guardObj).length; i++){
            if(this.is.TerminalTypeBlockObj(guardObj[Object.keys(guardObj)[i]])){return true}
        }
    }

    DefaultBlockObj(guardObj){
        for(var i = 0; i<Object.keys(guardObj).length; i++){
            if(this.is.RecursiveDefaultBlockObj(guardObj[Object.keys(guardObj)[i]])){return true}
            if(this.is.TerminalDefaultBlockObj(guardObj[Object.keys(guardObj)[i]])){return true}
        }
    }

    TypeBlockObj(guardObj){
        for(var i = 0; i<Object.keys(guardObj).length; i++){
            if(this.is.RecursiveTypeBlockObj(guardObj[Object.keys(guardObj)[i]])){return true}
            if(this.is.TerminalTypeBlockObj(guardObj[Object.keys(guardObj)[i]])){return true}  
        }
    }
}