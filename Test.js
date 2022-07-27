import {Guard} from './Guard.js'
import {Guards} from './Source/Guards.js'
import * as assert from "node:assert"
import * as util from "node:util"

class TestObj{
    constructor(v, expectedResult){
        this.expectedResult=expectedResult
		new Guard(new Guards(), v, GUARD,  this)
    }

    isString(v){
        assert.equal("isString", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isString("+ this.expectedResult[1]+')', 'PASSES')
    }

    isStringIsString(v){
        assert.equal("isStringIsString", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isStringIsString("+ this.expectedResult[1]+')', 'PASSES')
    }

    isStringIsStringIsInteger(v){
        assert.equal("isStringIsStringIsInteger", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isStringIsStringIsInteger("+ this.expectedResult[1]+')', 'PASSES')   
    }

    isStringIsIntegerIsString(v){
        assert.equal("isStringIsIntegerIsString", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isStringIsIntegerIsString("+ this.expectedResult[1]+')', 'PASSES')    

    }

    isStringIsIntegerIsInteger(v){
        assert.equal("isStringIsIntegerIsInteger", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isStringIsIntegerIsInteger("+ this.expectedResult[1]+')', 'PASSES')    
    }
    

    isInteger(v){
        assert.equal("isInteger", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isInteger("+ this.expectedResult[1]+')', 'PASSES')     
    }
    isIntegerIsInteger(v){
        assert.equal("isIntegerIsInteger", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isIntegerIsInteger("+ this.expectedResult[1]+')', 'PASSES') 
    }

    isIntegerIsString(v){
        assert.equal("isIntegerIsString", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isIntegerIsString("+ this.expectedResult[1]+')', 'PASSES') 
    }

    isIntegerIsIntegerArray(v){
        assert.equal("isIntegerIsIntegerArray", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isIntegerIsIntegerArray("+ this.expectedResult[1]+')', 'PASSES')    
    }
    isIntegerIsArray(v){
        assert.equal("isIntegerIsArray", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isIntegerIsArray("+ this.expectedResult[1]+')', 'PASSES')
    }
    isStringIsEncodingIsInteger(v){
        assert.equal("isStringIsEncodingIsInteger", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isStringIsEncodingIsInteger("+ this.expectedResult[1]+')', 'PASSES')
    }

	isArrayIsArrayIsArrayIsArray(v){
		assert.equal("isArrayIsArrayIsArrayIsArray", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isArrayIsArrayIsArrayIsArray("+ JSON.stringify(this.expectedResult[1])+')', 'PASSES')
	}

	isArrayIsIntegerIsArrayIsArray(v){
		assert.equal("isArrayIsIntegerIsArrayIsArray", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isArrayIsIntegerIsArrayIsArray("+ JSON.stringify(this.expectedResult[1])+')', 'PASSES')
	}

	isArrayIsStringIsIntegerIsArray(v){
		assert.equal("isArrayIsStringIsIntegerIsArray", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isArrayIsStringIsIntegerIsArray("+ JSON.stringify(this.expectedResult[1])+')', 'PASSES')
	}

	isObjectIsObjectIsStringIsInteger(v){
		assert.equal("isObjectIsObjectIsStringIsInteger", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isObjectIsObjectIsStringIsInteger("+ JSON.stringify(this.expectedResult[1])+')', 'PASSES')
	}

	isObjectIsObjectIsStringIsObject(v){
		assert.equal("isObjectIsObjectIsStringIsObject", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isObjectIsObjectIsStringIsObject("+ JSON.stringify(this.expectedResult[1])+')', 'PASSES')
	}

	isObjectIsObjectIsObjectIsInteger(v){
		assert.equal("isObjectIsObjectIsObjectIsInteger", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isObjectIsObjectIsObjectIsInteger("+ JSON.stringify(this.expectedResult[1])+')', 'PASSES')
	}
	
	isObjectIsObjectIsObjectIsString(v){
		assert.equal("isObjectIsObjectIsObjectIsString", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isObjectIsObjectIsObjectIsString("+ JSON.stringify(this.expectedResult[1])+')', 'PASSES')
	}

	isObjectIsObjectIsArray(v){
		assert.equal("isObjectIsObjectIsArray", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isObjectIsObjectIsArray("+ JSON.stringify(this.expectedResult[1])+')', 'PASSES')
	}
}
//new TestObj(['someString'], ['isString', ['someString']])



class TestGuardScm{
    constructor(h, w, bag){
        this.paths=[]
        this.h=h
        this.w=w
        this.scm = this.schema(h, w, bag, "")
    }

    testGen(){
        return (test_case, schema, func, expectedResult)=>{
            eval(
                `class TestGen{
                    constructor(test_case, schema, expected_result){
                        this.expectedResult=expected_result
                        new Guard(new Guards(), test_case, schema,  this)
                        //console.log(${func})
                    }
                    ${func}(v){
                        assert.deepEqual(v, this.expectedResult[1])
                        console.log(func+"("+ JSON.stringify(this.expectedResult[1])+')', 'PASSES')
                    }
                } 
                new TestGen(${test_case}, ${schema}, ${expectedResult})
                `
            )
        }
    }
    
    schema(h, w, bag, funcStr){
        var scm=[]
        for(var i = 0; i<w; i++){
            scm.push(this._schema(h, this.randRange(1, w), bag, funcStr))
        }
        return scm
    }

    _schema(h, w, bag, funcStr){
        var arrKeyObj;
        if(h==0){
                //if we have a function string context we simply return it
            return this.func(bag, funcStr)
        }else{
            if(this.mod()){
                //if we have a default/function context we simply build and return it
                var key = this.randKey(bag)
                funcStr+=key
                arrKeyObj=this.defaultObj(key, bag, funcStr)
                for(var i=0; i<w;i++){
                    arrKeyObj[key].push(this._schema(h-1, this.randRange(1, w), bag, funcStr))
                }
            }else{
                var key = this.randKey(bag)
                funcStr+=key
                arrKeyObj=this.objKeyArr(key)
                for(var i=0; i<w;i++){
                    arrKeyObj[key].push(this._schema(h-1, this.randRange(1, w), bag, funcStr))
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
            console.log(util.inspect(this.scm, false, null, true /* enable colors */))
        }
    }
    objKeyArr(key){
        return {[key]:[]}
    }
    defaultObj(key, bag, funcStr){
        var defaultVal=this.defaultVal(key)
        return {
            [key]:[{
                '~DEFAULT~':defaultVal,
                '~FUNCTION~':funcStr+key
            }]
        }
    }
    func(bag, funcStr){
        var key = this.randKey(bag)
        this.paths.push(funcStr+key)
        return {
            [key]:funcStr+key
        }
    }

    defaultVal(key){
        //generate a random value with the type in question and return it
        if(key=='isStr'){
            return this.randStr()
        }else if(key=='isInt'){
            return this.randInt()
        }else if(key=='isArr'){
            return this.randArr()
        }else if(key=='isIntArr'){
            return this.randIntArr()
        }else if(key=='isEnc'){
            return this.randEnc()
        }else if(key=='isEncArr'){
            return this.randEncArr()
        }else if(key=='isStrArr'){
            return this.randStrArr()
        }else if(key=='isObj'){
            return this.randObj()
        }else if(key=='isObjArr'){
            return this.randObjArr()
        }
        // else if(key=='isBuff'){
        //     return this.randBuff()
        // }else if(key=='isBuffArr'){
        //     return this.randBuffArr()
        // }else if(key=='isReg'){
        //     return this.randReg()
        // }else if(key=='isRegArr'){
        //     return this.randRegArr()
        // }
    }

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
    // randBuff(){return ""}
    // randBuffArr(){return ""}
    // randReg(){return ""}
    // randRegArr(){return ""}

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
    mod(){
        return Math.floor(Math.random()*(100-0+1)+0)%2
    }
}

var h=5;
var w=5;
var bag=['isStr', 'isInt', 'isArr', 'isIntArr', 'isEnc', 'isEncArr', 'isStrArr', 'isObj', 'isObjArr']//, 'isBuff', 'isBuffArr', 'isReg', 'isRegArr']
var schema = new TestGuardScm(7, 7, bag)
schema.log(schema.scm)