import { Guards } from "../Guards.js"
import * as util from "node:util"
import * as assert from "node:assert"

class RandGen{
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

class Get{
    constructor(){
        this.is=new Is()
    }
    TerminalString(obj){
        return obj[this.getGuardKey(obj)]
    }
    NextRecursiveBlockObj(obj){
        return this.getGuardObj(obj)[this.getGuardKey(obj)]
    }

    GuardKey(obj){
        if(this.getGuardObj(obj)){
            if(this.guardFuncBag.includes(Object.keys(this.getGuardObj(obj))[0])){
                return Object.keys(this.getGuardObj(obj))[0]
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

class Is{
    constructor(){

    }
    DefaultBlock(obj){
        if(guardObj['~DEFAULT~']){
            return true
        }
    }

    TerminalBlockObj(guardObj){
        try{
            if(this.isTerminalTypeBlockObj(guardObj)|| this.isTerminalDefaultBlockObj(guardObj)){
            return true;
            }
        }catch{
        }
            
    }
    
    RecursiveBlockObj(guardObj){
        if(this.isRecursiveDefaultBlockObj(guardObj)||this.isRecursiveTypeBlockObj(guardObj)){
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
    
}

class New{
    constructor(){
        this.rg=RandGen()
    }
    GuardFunc(){
        return this.rg.randSelection(this.gfBag)
    }

    RecursiveTypeBlockObj(){
        var newGuardFuncStr = this.GuardFunc()
        return {
            [newGuardFuncStr]:[]
        }
    } 

    RecursiveDefaultBlockObj(){
        var newGuardFuncStr = this.GuardFunc()
        return {
            '~DEFAULT~':this.defaultVal(newGuardFuncStr),
            [newGuardFuncStr]:[]
        }
    }

    TerminalTypeBlockObj(guardFuncStr){
        var newGuardFuncStr = this.GuardFunc()
        return {
            [newGuardFuncStr]:guardFuncStr+newGuardFuncStr
        }
    }

    TerminalDefaultBlockObj(guardFuncStr){
        var newGuardFuncStr = this.GuardFunc()
        var defaultVal=this.defaultVal(newGuardFuncStr)
        return {
            '~DEFAULT~':defaultVal,
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
}

export class GuardUtils{

    constructor(guardFuncBag){
        this.guardFuncBag=guardFuncBag;
        this.guards = new Guards();
        this.rg = new RandGen();
        this.is = new Issers();
        this.get = new Getters();
        this.new = new Blocks();
        this.defaultPaths=[]
        this.gfBag = guardFuncBag;
    }

    log(obj){
        if(obj){
            console.log(util.inspect(obj, false, null, true))
        }
    }

    verify(guard){
        for(var i = 0; i<guard.length; i++){
            var guardFuncStr=guardFuncStr+this.get.GuardKey(guard[i]);
            this._verify(guard[i], guardFuncStr)
        }
    }
    _verify(guard, guardFuncStr){
        for(var i = 0; i<guard.length; i++){
            if(this.isTerminalBlockObj(guard[i])){
                if(this.isDefaultBlock(guard[i])){

                }
                guardFuncStr=guardFuncStr+this.get.GuardKey(guard[i])
                assert.equal(guardFuncStr, this.get.TerminalString(guard[i]))
                return
            }else if(this.isRecursiveBlockObj(guard[i])){
                guardFuncStr=guardFuncStr+this.get.GuardKey(guard[i])
                this._verify(this.get.NextRecursiveBlockObj(guard[i]), guardFuncStr)
            }
        }
        return
    }

    

    

    

    testGuard(){
        return (test_case, guard, func, expectedResult)=>{
            eval(
                `class TestGen{
                    constructor(test_case, guard, expected_result){
                        this.expectedResult=expected_result
                        new Guard(new Guards(), test_case, guard,  this)
                        //console.log(${func})
                    }
                    ${func}(v){
                        assert.deepEqual(v, this.expectedResult[1])
                        console.log(func+"("+ JSON.stringify(this.expectedResult[1])+')', 'PASSES')
                    }
                } 
                new TestGen(${test_case}, ${guard}, ${expectedResult})
                `
            )
        }
    }

    isGuard(func){
        if( typeof eval('this.guards.'+func) === "function" ){
          return true
        }
      }
  
    passGuard(func, v){
        if(!this.isGuard(func)){return false}
        func='this.guards.'+func
        func = this.buildParams(func, v)
        if(eval(func)){
            return true
        }else{
            return false
        }
    }
  
    buildParams(func, v){
        if(this.guards.isArr(v)){
            func+='('+JSON.stringify(v)+')'
            return func
        }else{
            func+='('+JSON.stringify(v)+')'
            return func
        }
    }
}