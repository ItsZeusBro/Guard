import {Guard} from './Guard.js'
import {Guards} from './Source/Guards.js'
import * as assert from "node:assert"
export const GUARD=[
    {
            'isStr':"isString"

    },
    {
            'isInt':"isInteger"

    },
    {
            'isStr':[
                    {
                            'isEnc':[
                                {
                                    "isInt":"isStringIsEncodingIsInteger"
                                }
                            ]
                    },
                    {
                            'isStr':"isStringIsString"
                    },
                    {
                            'isStr':[
                                    {
                                        'isInt':'isStringIsStringIsInt'
                                    }
                            ]
                    },
                    {
                            'isInt':[
                                    {
                                        'isStr':'isStringIsIntIsString'
                                    }
                            ]
                    },
                    {
                            'isInt':[
                                    {
                                        'isInt':'isStringIsIntIsInt'
                                    }
                            ]
                    },
                    {
                            'isEncArr':'isStringIsEncodingArray'
                    }   
            ]
    },
    {
            'isInt':[
                    {
                            'isInt':'isIntegerIsInteger'
                    },
                    {
                            'isInt':{
                                "DEFAULT":0,
                                "FUNCTION": 'isIntegerIsInteger'
                            }
                    },
                    {
                            'isStr':{
                                "DEFAULT":"",
                                "FUNCTION": 'isIntegerIsString'
                            }
                    },
                    {
                            'isIntArr':'isIntegerIsIntegerArray'
                    },
                    {
                            'isArr':"isIntegerIsArray"
                    }
            ]   
    },
    {
            'isArr':'isStringIsSeparatorIsEncoding' 
    }
]

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

    isStringIsStringIsInt(v){
        assert.equal("isStringIsStringIsInt", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isStringIsStringIsInt("+ this.expectedResult[1]+')', 'PASSES')   
    }

    isStringIsIntIsString(v){
        assert.equal("isStringIsIntIsString", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isStringIsIntIsString("+ this.expectedResult[1]+')', 'PASSES')    
    }

    isStringIsIntIsInt(v){
        assert.equal("isStringIsIntIsInt", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isStringIsIntIsInt("+ this.expectedResult[1]+')', 'PASSES')    
    }

    isStringIsIntIsInt(v){
        assert.equal("isStringIsIntIsInt", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isStringIsIntIsInt("+ this.expectedResult[1]+')', 'PASSES')    
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
}

class Test{
    constructor(){
        this.constructorTests()
    }

    constructorTests(){
        new TestObj(['someString'], ['isString', ['someString']])
        new TestObj(['string1', 'string2'], ['isStringIsString', ['string1', 'string2']])
        new TestObj(['string1', 'string2', 4], ['isStringIsStringIsInt', ['string1', 'string2', 4]])
        new TestObj(['string1', 5, 'string2'], ['isStringIsIntIsString', ['string1', 5, 'string2']])
        new TestObj([2], ['isInteger', [2]])
        new TestObj([2, null], ['isIntegerIsInteger', [2, 0]])
        new TestObj([2, 4], ['isIntegerIsInteger', [2, 4]])
        new TestObj([2, "somestring"], ['isIntegerIsString', [2, "somestring"]])
        
        new TestObj([2, [1, 2, 3, 4]], ['isIntegerIsIntegerArray', [2, [1, 2, 3, 4]]])
        // new TestObj(2, ['1', '2', 3, 4])
        // new TestObj('string1', 4, 5)
        // new TestObj('string1', null) //we need default logic
        // new TestObj('string1', 'utf8', 3)
    }
}

new Test()
