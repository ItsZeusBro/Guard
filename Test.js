import {Guard} from './Guard.js'
import {Guards} from './Source/Guards.js'
import * as assert from "node:assert"
import * as util from "node:util"

class GaurdWalk{
    constructor(){
        this.gs=new Guards()
        this.r=new RandGen()
        this.u=new guardUtils()
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
            this.randObj, this.randObjArr, this.randBuff,this.randBuffArr, this.randReg, this.randRegArr
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
        this.gs=new Guards()
        this.r=new RandGen()
    }
    log(obj){
        if(obj){
            console.log(util.inspect(obj, false, null, true /* enable colors */))
        }
    }
    objKeyArrDef(key, bag){
        var defaultVal=this.defaultVal(key)
        return {
            '~DEFAULT~':defaultVal,
            [key]:[]
        }
    }
    objKeyArr(key){
        return {
            [key]:[]
        }
    } 
    funcDef(bag, funcStr){
        var key = this.r.randKey(bag)
        var defaultVal=this.defaultVal(key)
        return {
            '~DEFAULT~':defaultVal,
            [key]:funcStr+key
        }
    }
    func(bag, funcStr){
        var key = this.r.randKey(bag)
        return {
            [key]:funcStr+key
        }
    }
    defaultVal(key){
        //generate a random value with the type in question and return it
        if(key=='isStr'){
            return this.r.randStr()
        }else if(key=='isInt'){
            return this.r.randInt()
        }else if(key=='isArr'){
            return this.r.randArr()
        }else if(key=='isIntArr'){
            return this.r.randIntArr()
        }else if(key=='isEnc'){
            return this.r.randEnc()
        }else if(key=='isEncArr'){
            return this.r.randEncArr()
        }else if(key=='isStrArr'){
            return this.r.randStrArr()
        }else if(key=='isObj'){
            return this.r.randObj()
        }else if(key=='isObjArr'){
            return this.r.randObjArr()
        }
    }
}
class GuardGen{
    constructor(h, w, bag){
        this.tests=[]
        this.h=h
        this.w=w
        this.gs=new Guards()
        this.gu=new GuardUtils()
        this.r=new RandGen()
        this.ggen = this.gen(h, w, bag, "")
    }
    
    gen(h, w, bag, funcStr){
        var guard=[]
        for(var i = 0; i<w; i++){
            guard.push(this._gen(h, this.r.randRange(1, w), bag, funcStr))
        }
        return guard
    }
    _gen(h, w, bag, funcStr){
        var arrKeyObj;
        if(h==0){
                //if we have a function string context we simply return it
            if(this.r.randMod10()){
                return this.gu.func(bag, funcStr)
            }else{
                return this.gu.funcDef(bag, funcStr)
            }
        }else{
            if(this.r.randMod10()){
                //if we have a default/function context we simply build and return it
                var key = this.r.randKey(bag)
                funcStr+=key
                arrKeyObj=this.gu.objKeyArrDef(key, bag)
                for(var i=0; i<w;i++){
                    arrKeyObj[key].push(this._gen(h-1, this.r.randRange(1, w), bag, funcStr))
                }
            }else{
                var key = this.r.randKey(bag)
                funcStr+=key
                arrKeyObj=this.gu.objKeyArr(key)
                for(var i=0; i<w;i++){
                    arrKeyObj[key].push(this._gen(h-1, this.r.randRange(1, w), bag, funcStr))
                }
            }
        }
        //trailing construction case
        return arrKeyObj;
    }
    

}

var h=3;
var w=3;
var bag=['isStr', 'isInt', 'isArr', 'isIntArr', 'isEnc', 'isEncArr', 'isStrArr', 'isObj', 'isObjArr']//, 'isBuff', 'isBuffArr', 'isReg', 'isRegArr']
var ggen = new GuardGen(h, w, bag).ggen
var gu = new GuardUtils()
gu.log(ggen)
