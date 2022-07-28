import {Guard} from './Guard.js'
import {Guards} from './Source/Guards.js'
import * as assert from "node:assert"
import * as util from "node:util"

class GaurdWalk{
    constructor(){
        this.guards=new Guards()
        this.rg=new RandGen()
        this.gu=new guardUtils()
    }
    walk(guard){
        var arr = []
        for(var i = 0; i<guard.length; i++){
            var arr=[]
            arr.push(this._walk(guard[i], arr))
        }
        return arr
    }
    _walk(guard, arr){
        for(var i = 0; i<guard[this.getGuardKey(guard)].length; i++){
            if(this.isBaseStep(guard[this.getGuardKey(guard)][i])){
                console.log("IS BASE STEP")
                arr.push(guard[this.getGuardKey(guard)][i])
            }else if(this.isGeneralStep(guard[this.getGuardKey(guard)][i])){
                console.log("IS GENERAL STEP")

                if(this.isGeneralDefStep(guard[this.getGuardKey(guard)][i])){
                    //if it has a default key
                    //we need to add default association to the array alongside the other
                    //key without its association
                    var obj = {
                        '~DEFAULT~':guard[this.getGuardKey(guard)][i]['~DEFAULT~'],
                        'GUARD':guard[this.getGuardKey(guard)][i][this.getGuardKey(guard[this.getGuardKey(guard)])]
                    }
                    arr.push(obj)
                    this._walk(guard[this.getGuardKey(guard)][i], arr)
                }else{
                    //if it does not have a default key
                    //just add the key to the array
                    var obj = {
                        'GUARD':guard[this.getGuardKey(guard)][i][Object.keys(guard[this.getGuardKey(guard)])[0]]
                    }
                    arr.push(obj)
                    this._walk(guard[this.getGuardKey(guard)][i], arr)
                }
            }
        }
        return arr
    }

}
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
    randKey(bag){
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
    }

    log(obj){
        if(obj){
            console.log(util.inspect(obj, false, null, true /* enable colors */))
        }
    }
    
    typeBlock(key){
        return {
            [key]:[]
        }
    } 

    defaultBlock(guardFunc, bag){
        var defaultVal=this.defaultVal(guardFunc)
        return {
            '~DEFAULT~':defaultVal,
            [guardFunc]:[]
        }
    }

    typeTerminalBlock(bag, guardFuncStr){
        var key = this.rg.randKey(bag)
        return {
            [key]:guardFuncStr+key
        }
    }

    defaultTerminalBlock(bag, guardFuncStr){
        var key = this.rg.randKey(bag)
        var defaultVal=this.defaultVal(key)
        return {
            '~DEFAULT~':defaultVal,
            [key]:guardFuncStr+key
        }
    }
    
    defaultVal(key){
        //generate a random value with the type in question and return it
        if(key=='isStr'){
            return this.rg.randStr()
        }else if(key=='isInt'){
            return this.rg.randInt()
        }else if(key=='isArr'){
            return this.rg.randArr()
        }else if(key=='isIntArr'){
            return this.rg.randIntArr()
        }else if(key=='isEnc'){
            return this.rg.randEnc()
        }else if(key=='isEncArr'){
            return this.rg.randEncArr()
        }else if(key=='isStrArr'){
            return this.rg.randStrArr()
        }else if(key=='isObj'){
            return this.rg.randObj()
        }else if(key=='isObjArr'){
            return this.rg.randObjArr()
        }
    }
}
class GuardGen{
    constructor(h, w, bag){
        this.tests=[]
        this.h=h
        this.w=w
        this.guards=new Guards()
        this.gu=new GuardUtils()
        this.rg=new RandGen()
        this.ggen = this.gen(h, w, bag, "")
    }
    
    gen(h, w, bag, guardFuncStr){
        var guard=[]
        for(var i = 0; i<w; i++){
            guard.push(this._gen(h, this.rg.randRange(1, w), bag, guardFuncStr))
        }
        return guard
    }
    _gen(h, w, bag, guardFuncStr){
        var block;
        if(h==0){
                //if we have a function string context we simply return it
            if(this.rg.randMod10()){
                return this.gu.typeTerminalBlock(bag, guardFuncStr)
            }else{
                return this.gu.defaultTerminalBlock(bag, guardFuncStr)
            }
        }else{
            if(this.rg.randMod10()){
                //if we have a default/function context we simply build and return it
                var key = this.rg.randKey(bag)
                guardFuncStr+=key
                block=this.gu.defaultBlock(key, bag)
                for(var i=0; i<w;i++){
                    block[key].push(this._gen(h-1, this.rg.randRange(1, w), bag, guardFuncStr))
                }
            }else{
                var key = this.rg.randKey(bag)
                guardFuncStr+=key
                block=this.gu.typeBlock(key)
                for(var i=0; i<w;i++){
                    block[key].push(this._gen(h-1, this.rg.randRange(1, w), bag, guardFuncStr))
                }
            }
        }
        //trailing construction case
        return block;
    }
    

}

var h=3;
var w=3;
var bag=['isStr', 'isInt', 'isArr', 'isIntArr', 'isEnc', 'isEncArr', 'isStrArr', 'isObj', 'isObjArr']//, 'isBuff', 'isBuffArr', 'isReg', 'isRegArr']
var ggen = new GuardGen(h, w, bag).ggen
var gu = new GuardUtils()
gu.log(ggen)
