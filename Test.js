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




var guardFuncBag=['isStr', 'isInt', 'isArr', 'isIntArr', 'isEnc', 'isEncArr', 'isStrArr', 'isObj', 'isObjArr']

//var gu = new GuardUtils(guardFuncBag)

new TestUtils(guardFuncBag)


class GuardGen{
    constructor(h, w, guardFuncBag){
        this.tests=[]
        this.h=h
        this.w=w
        this.guards=new Guards()
        this.rg=new RandGen()
        this.gu=new GuardUtils(guardFuncBag)
        this.ggen = this.gen(h, w, "")
    }
    
    gen(h, w, guardFuncStr){
        var guard=[]
        for(var i = 0; i<w; i++){
            guard.push(this._gen(h, this.rg.randRange(1, w), guardFuncStr))
        }
        return guard
    }

    _gen(h, w, guardFuncStr){
        var block;
        if(h==0){
                //if we have a function string context we simply return it
            if(this.rg.randMod10()){
                return this.gu.newTerminalTypeBlockObj(guardFuncStr)
            }else{
                return this.gu.newTerminalDefaultBlockObj(guardFuncStr)
            }
        }else{
            if(this.rg.randMod10()){
                //if we have a default/function context we simply build and return it
                block=this.gu.newRecursiveDefaultBlockObj(guardFuncStr)
                for(var i=0; i<w;i++){
                    block[key].push(this._gen(h-1, this.rg.randRange(1, w), guardFuncStr))
                }
            }else{
                block=this.gu.newRecursiveTypeBlockObj(guardFuncStr)
                for(var i=0; i<w;i++){
                    block[key].push(this._gen(h-1, this.rg.randRange(1, w), guardFuncStr))
                }
            }
        }
        //trailing construction case
        return block;
    }
}

// var h=3;
// var w=3;
// // var ggen = new GuardGen(h, w, guardFuncBag).ggen
// var guardFuncBag=['isStr', 'isInt', 'isArr', 'isIntArr', 'isEnc', 'isEncArr', 'isStrArr', 'isObj', 'isObjArr']

// var gu = new GuardUtils(guardFuncBag)

