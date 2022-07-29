import { Guards } from "../Guards";
import { Rand } from "./Rand.js";

export class New{
    constructor(){
        this.new=this
        this.guards= new Guards()
        this.rand= new Rand()
    }

    GuardFunc(){
        return this.rg.randSelection(this.gfBag)
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
        var defVal=this.new.defVal(newGuardFuncStr)
        return {
            '~DEFAULT~':defVal,
            [newGuardFuncStr]:guardFuncStr+newGuardFuncStr
        }
    }

    defVal(guardFunc){
        //generate a random value with the type in question and return it
        if(guardFunc=='isStr'){
            return this.rg.randStr()
        }else if(guardFunc=='isInt'){
            return this.rg.randInt()
        }else if(guardFunc=='isArr'){
            return this.rg.randArr()
        }else if(guardFunc=='isIntArr'){
            return this.rg.randIntArr()
        }else if(guardFunc=='isEnc'){
            return this.rg.randEnc()
        }else if(guardFunc=='isEncArr'){
            return this.rg.randEncArr()
        }else if(guardFunc=='isStrArr'){
            return this.rg.randStrArr()
        }else if(guardFunc=='isObj'){
            return this.rg.randObj()
        }else if(guardFunc=='isObjArr'){
            return this.rg.randObjArr()
        }
    }

    Params(func, v){
        if(this.guards.isArr(v)){
            func+='('+JSON.stringify(v)+')'
            return func
        }else{
            func+='('+JSON.stringify(v)+')'
            return func
        }
    }
}