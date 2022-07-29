import { Guards } from "./Guards.js";
import { Rand } from "./Rand.js";

export class New{
    constructor(utils){
        this.guardFuncBag=utils.guardFuncBag
        this.new=this
        this.guards=utils.guards
        this.rand=utils.rand
    }

    GuardFunc(){
        return this.rand.Selection(this.guardFuncBag)
    }

    RecursiveTypeBlockObj(){
        var newGuardFuncStr = this.new.GuardFunc()
        return {
            [newGuardFuncStr]:[]
        }
    } 

    RecursiveDefaultBlockObj(){
        var newGuardFuncStr = this.new.GuardFunc()
        return {
            '~DEFAULT~':this.new.defVal(newGuardFuncStr),
            [newGuardFuncStr]:[]
        }
    }

    TerminalTypeBlockObj(guardFuncStr){
        var newGuardFuncStr = this.new.GuardFunc()
        return {
            [newGuardFuncStr]:guardFuncStr+newGuardFuncStr
        }
    }

    TerminalDefaultBlockObj(guardFuncStr){
        var newGuardFuncStr = this.new.GuardFunc()
        return {
            '~DEFAULT~':this.new.defVal(newGuardFuncStr),
            [newGuardFuncStr]:guardFuncStr+newGuardFuncStr
        }
    }

    defVal(guardFunc){
        //generate a random value with the type in question and return it
        if(guardFunc=='isStr'){
            return this.rand.Str()
        }else if(guardFunc=='isInt'){
            return this.rand.Int()
        }else if(guardFunc=='isArr'){
            return this.rand.Arr()
        }else if(guardFunc=='isIntArr'){
            return this.rand.IntArr()
        }else if(guardFunc=='isEnc'){
            return this.rand.Enc()
        }else if(guardFunc=='isEncArr'){
            return this.rand.EncArr()
        }else if(guardFunc=='isStrArr'){
            return this.rand.StrArr()
        }else if(guardFunc=='isObj'){
            return this.rand.Obj()
        }else if(guardFunc=='isObjArr'){
            return this.rand.ObjArr()
        }
    }

    Params(func, params){
        if(this.guards.isArr(params)){
            func+='('+JSON.stringify(params)+')'
            return func
        }else{
            func+='('+JSON.stringify(params)+')'
            return func
        }
    }
}