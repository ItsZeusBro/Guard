import {Guard} from './Guard.js'
import {Guards} from './Source/Guards.js'
import * as assert from "node:assert"
import * as util from "node:util"


class GookPattern{
    constructor(){
        this.type=getType()
        //all patterns are described as objects in one of the following ways
        
        //{
        //  'key':/regex/ or undefined
        //}
        //or
        //its arbitrary what a base can be represented as, so that can have its own recursion
        //base case is a lookahead function that tries to match the base case if its a subset of the
        //recursion 
        //{
        //  'asscoiativeString':{
        //      'anyKey':/regex/ or undefined
        //      'n':numberOfLevels   
        //  } 
        //}
        //{
        //  'asscoiativeArray':{
        //      'types':['0-100', /strRegex/, {'key':/regex/}, {'association':{'key':/regex/, 'n':someInteger}}] or undefined
        //      'n':numberOfItems
        //         
        //  } 
        //}
    }
    getType(){
    }

}


class GookUtils{   
    constructor(){
        //payload key or pattern (pattern should not conflict with recursive key pattern)
        this.pp=this.findPayloadPattern()
        //recursive pattern
        this.rp=findRecursivePattern()
        //base pattern
        this.bp=findBasePattern()
    }

    findBasePattern(){
        //the base pattern is what is found after a recursive pattern has been found
        //but is no longer found after n number of recursions
    }
    findRecursivePattern(){
        //a recursive pattern is the minimum pattern recognized 
        //from the top down, that is also recognized from the base up
    }
    findPayloadPattern(){
        //what is not recursively patterned, is payload at any given level
    }
}

class Gook{
    constructor(){
        this.gut=new GookUtils()
    }
    walk(gook){

    }
}





class GaurdWalk{
    constructor(){
        this.g=new Guards()
        this.r=new RandGen()
        this.u=new GookUtils()
    }
    walk(guard){
        var arr = []
        for(var i = 0; i<gook.length; i++){
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
class TestGook{
    testGook(){
        return (test_case, gook, func, expectedResult)=>{
            eval(
                `class TestGen{
                    constructor(test_case, gook, expected_result){
                        this.expectedResult=expected_result
                        new Guard(new Guards(), test_case, gook,  this)
                        //console.log(${func})
                    }
                    ${func}(v){
                        assert.deepEqual(v, this.expectedResult[1])
                        console.log(func+"("+ JSON.stringify(this.expectedResult[1])+')', 'PASSES')
                    }
                } 
                new TestGen(${test_case}, ${gook}, ${expectedResult})
                `
            )
        }
    }
}
class Gobbledy{
    constructor(h, w, bag){
        this.paths=[]
        this.tests=[]
        this.h=h
        this.w=w
        this.g=new Guards()
        this.r=new RandGen()
        this.gook = this.gook(h, w, bag, "")
    }
    
    gook(h, w, bag, funcStr){
        var gook=[]
        for(var i = 0; i<w; i++){
            gook.push(this._gook(h, this.r.randRange(1, w), bag, funcStr))
        }
        return gook
    }
    _gook(h, w, bag, funcStr){
        var arrKeyObj;
        if(h==0){
                //if we have a function string context we simply return it
            if(this.r.randMod10()){
                return this.func(bag, funcStr)
            }else{
                return this.funcDef(bag, funcStr)
            }
        }else{
            if(this.r.randMod10()){
                //if we have a default/function context we simply build and return it
                var key = this.r.randKey(bag)
                funcStr+=key
                arrKeyObj=this.objKeyArrDef(key, bag)
                for(var i=0; i<w;i++){
                    arrKeyObj[key].push(this._gook(h-1, this.r.randRange(1, w), bag, funcStr))
                }
            }else{
                var key = this.r.randKey(bag)
                funcStr+=key
                arrKeyObj=this.objKeyArr(key)
                for(var i=0; i<w;i++){
                    arrKeyObj[key].push(this._gook(h-1, this.r.randRange(1, w), bag, funcStr))
                }
            }
        }
        //trailing construction case
        return arrKeyObj;
    }
    log(obj){
        if(obj){
            console.log(util.inspect(obj, false, null, true /* enable colors */))
        }else{
            console.log(util.inspect(this.gook, false, null, true /* enable colors */))
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
        this.paths.push(funcStr+key)
        return {
            '~DEFAULT~':defaultVal,
            [key]:funcStr+key
        }
    }
    func(bag, funcStr){
        var key = this.r.randKey(bag)
        this.paths.push(funcStr+key)
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

var h=3;
var w=3;
var bag=['isStr', 'isInt', 'isArr', 'isIntArr', 'isEnc', 'isEncArr', 'isStrArr', 'isObj', 'isObjArr']//, 'isBuff', 'isBuffArr', 'isReg', 'isRegArr']
var gobbledy = new Gobbledy(h, w, bag)

//gobbledy.log(gobbledy.gook)
// gobbledy.log(gobbledy.gook)
// var guardWalk = new GuardWalk()
// guardWalk.walk(gobbledy.gook)

new Gook(new GookPattern(), )