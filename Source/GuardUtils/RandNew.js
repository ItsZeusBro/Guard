import { Guards } from "../Guards";

export class Rand{
    randStr(){return this.genStr(this.randRange(0, 3))}
    randInt(){return this.randRange(0,3)}
    randArr(n){var arr=[]; for(var i=0;i<n;i++){arr.push(this.rand())}; return arr}
    rand(){
        return[
            this.randIntArr, this.randStr, this.randInt, this.randEnc, this.randEncArr, this.randStrArr,
            this.randObj, this.randObjArr
        ].sample()()
    }
    randIntArr(n=this.randInt()){var arr=[]; for(var i=0;i<n;i++){arr.push(this.randInt())}; return arr}
    randEnc(){return "utf8"}
    randEncArr(){return ['utf8']}
    randStrArr(n=this.randInt()){var arr=[]; for(var i=0;i<n;i++){arr.push(this.randStr())}; return arr}
    randObj(n=this.randInt()){if(n){return {[this.randStr()]:this.randObj(n-1)}}else{return {}}};
    randObjArr(n=this.randInt()){var arr=[]; for(var i=0;i<n;i++){arr.push(this.randObj())}; return arr}
    randSelection(bag){
        return bag[Math.floor(Math.random() * bag.length)];
    }
    randRange(min, max){
        return Math.floor(Math.random()*(max-min+1)+min)
    }
    genStr(len, chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'){
        //programiz.com
        var str='';
        for (var i = 0; i<len; i++){str+=chars.charAt(Math.floor(Math.random()*chars.length))}
        return str;
    }
    randMod10(){
        return Math.floor(Math.random()*(100-0+1)+0)%2
    }
}

export class New{
    constructor(){
        this.new=this
        this.guards= new Guards()
        this.rg= new Rand()
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