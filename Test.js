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


//new Test()


// var schema={}

// var testGen = (test_case, schema, func, expectedResult)=>{
//     eval(
//             `class TestGen{
//                 constructor(test_case, schema, expected_result){
//                     this.expectedResult=expected_result
//                     new Guard(new Guards(), test_case, schema,  this)
//                     //console.log(${func})
//                 }
    
    
//                 ${func}(v){
//                     assert.deepEqual(v, this.expectedResult[1])
//                     console.log(func+"("+ JSON.stringify(this.expectedResult[1])+')', 'PASSES')
//                 }
//             } 
//             new TestGen(${test_case}, ${schema}, ${expectedResult})
//         `
//     )

// }

class Schema{
    constructor(h, w, bag){
        console.log(util.inspect(this.schema(h, w, bag, ""), false, null, true /* enable colors */))
    }
    schema(h, w, bag, funcStr){
        var scm=[]
        for(var i = 0; i<w; i++){
            scm.push(this._schema(h, this.rr(1, w), bag, funcStr))
        }
        return scm
    }

    _schema(h, w, bag, funcStr){
        var arrKeyObj;
        if(h==0){
                //if we have a function string context we simply return it
            return this.func(bag, funcStr)
        }else if(h==1){
            if(this.mod()){
                //if we have a default/function context we simply build and return it
                return this.defaultObj(bag, funcStr)
            }else{
                var key = this.randKey(bag)
                funcStr+=key
                arrKeyObj=this.objKeyArr(key)
                arrKeyObj[key].push(this._schema(h-1, this.rr(1, w), bag, funcStr))
            }
        }else{
            //if we have a objKeyArr context we grab the objKeyArr
            //and recursively push to it
            var key = this.randKey(bag)
            funcStr+=key
            arrKeyObj=this.objKeyArr(key)
            for(var i=0; i<w;i++){
                arrKeyObj[key].push(this._schema(h-1, this.rr(1, w), bag, funcStr))
            }
        }
        //trailing construction case
        return arrKeyObj;
    }
    mod(){
        return Math.floor(Math.random()*(100-0+1)+0)%2
    }
    rr(min, max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }
    objKeyArr(key){
        return {[key]:[]}
    }
    defaultObj(bag, funcStr){
        var key = this.randKey(bag)
        return {
            [key]:{
                'DEFAULT':this.defaultVal(key),
                'FUNCTION':funcStr+=key
            }
        }
    }
    func(bag, funcStr){
        return {
            [this.randKey(bag)]:funcStr
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
        }else if(key=='isBuff'){
            return this.randBuff()
        }else if(key=='isBuffArr'){
            return this.randBuffArr()
        }else if(key=='isReg'){
            return this.randReg()
        }else if(key=='isRegArr'){
            return this.randRegArr()
        }
    }

    randStr(){return ""}
    randInt(){return ""}
    randArr(){return ""}
    randIntArr(){return ""}
    randEnc(){return ""}
    randEncArr(){return ""}
    randStrArr(){return ""}
    randObj(){return ""}
    randObjArr(){return ""}
    randBuff(){return ""}
    randBuffArr(){return ""}
    randReg(){return ""}
    randRegArr(){return ""}

    randKey(bag){
        return bag[Math.floor(Math.random() * bag.length)];
    }
}

new Schema(3, 3, ['isStr', 'isInt', 'isArr', 'isIntArr', 'isEnc', 'isEncArr', 'isStrArr', 'isObj', 'isObjArr', 'isBuff', 'isBuffArr', 'isReg', 'isRegArr'])

