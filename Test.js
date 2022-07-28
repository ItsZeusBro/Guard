import {Guard} from './Guard.js'
import {Guards} from './Source/Guards.js'
import * as assert from "node:assert"
import * as util from "node:util"


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
    randObj(n=this.randInt()){if(n){return {[this.randStr()]:this.randObj(n-1)}}};
    randObjArr(n=this.randInt()){var arr=[]; for(var i=0;i<n;i++){arr.push(this.randObj())}; return arr}
    randKey(guardFuncBag){
        return guardFuncBag[Math.floor(Math.random() * guardFuncBag.length)];
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

class TestGuard{
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
}

class GuardUtils{
    constructor(){
        this.guards=new Guards()
        this.rg=new RandGen()
        this.gu=new guardUtils()
    }

    log(obj){
        if(obj){
            console.log(util.inspect(obj, false, null, true /* enable colors */))
        }
    }
    walk(guard){
        if(!this.guards.isArr(guard)){throw Error('guard schema has no base array')}
        var arr = []

        return arr
    }

    _walk(guard, arr){
        if(!this.guards.isArr(guard)){throw Error('guard schema has no base array')}
        
        return arr
    }

    getGuard(guard, indx){

    }

    isRecursiveTypeBlock(){

    }
    isRecursiveDefaultBlock(){

    }
    isTerminalTypeBlock(){

    }
    isTerminalDefaultBlock(){

    }
    
    recursiveTypeBlock(guardFunc){
        return {
            [guardFunc]:[]
        }
    } 

    recursiveDefaultBlock(guardFunc, guardFuncBag){
        var defaultVal=this.defaultVal(guardFunc)
        return {
            '~DEFAULT~':defaultVal,
            [guardFunc]:[]
        }
    }

    terminalTypeBlock(guardFuncBag, guardFunc){
        var newGuardFunc = this.rg.randKey(guardFuncBag)
        return {
            [newGuardFunc]:guardFunc+newGuardFunc
        }
    }

    terminalDefaultBlock(guardFuncBag, guardFunc){
        var newGuardFunc = this.rg.randKey(guardFuncBag)
        var defaultVal=this.defaultVal(newGuardFunc)
        return {
            '~DEFAULT~':defaultVal,
            [newGuardFunc]:guardFunc+newGuardFunc
        }
    }
    
    defaultVal(guardFunc){
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


class GuardGen{
    constructor(h, w, guardFuncBag){
        this.tests=[]
        this.h=h
        this.w=w
        this.guards=new Guards()
        this.gu=new GuardUtils()
        this.rg=new RandGen()
        this.ggen = this.gen(h, w, guardFuncBag, "")
    }
    
    gen(h, w, guardFuncBag, guardFuncStr){
        var guard=[]
        for(var i = 0; i<w; i++){
            guard.push(this._gen(h, this.rg.randRange(1, w), guardFuncBag, guardFuncStr))
        }
        return guard
    }
    _gen(h, w, guardFuncBag, guardFuncStr){
        var block;
        if(h==0){
                //if we have a function string context we simply return it
            if(this.rg.randMod10()){
                return this.gu.terminalTypeBlock(guardFuncBag, guardFuncStr)
            }else{
                return this.gu.terminalDefaultBlock(guardFuncBag, guardFuncStr)
            }
        }else{
            if(this.rg.randMod10()){
                //if we have a default/function context we simply build and return it
                var key = this.rg.randKey(guardFuncBag)
                guardFuncStr+=key
                block=this.gu.recursiveDefaultBlock(key, guardFuncBag)
                for(var i=0; i<w;i++){
                    block[key].push(this._gen(h-1, this.rg.randRange(1, w), guardFuncBag, guardFuncStr))
                }
            }else{
                var key = this.rg.randKey(guardFuncBag)
                guardFuncStr+=key
                block=this.gu.recursiveTypeBlock(key)
                for(var i=0; i<w;i++){
                    block[key].push(this._gen(h-1, this.rg.randRange(1, w), guardFuncBag, guardFuncStr))
                }
            }
        }
        //trailing construction case
        return block;
    }
    

}

var h=3;
var w=3;
var guardFuncBag=['isStr', 'isInt', 'isArr', 'isIntArr', 'isEnc', 'isEncArr', 'isStrArr', 'isObj', 'isObjArr']//, 'isBuff', 'isBuffArr', 'isReg', 'isRegArr']
var ggen = new GuardGen(h, w, guardFuncBag).ggen
var gu = new GuardUtils()
gu.log(ggen)

