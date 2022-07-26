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
						'isInt':'isStringIsStringIsInteger'
					}
				]
			},
			{
				'isInt':[
					{
						'isStr':'isStringIsIntegerIsString'
					}
				]
			},
			{
				'isInt':[
					{
						'isInt':'isStringIsIntegerIsInteger'
					}
				]
			},
			{
				'isEncArr':'isStringIsEncodingArray'
			},
			{
				'isStr':{
					'DEFAULT':"wackyWonderfulString",
					"FUNCTION":'isStringIsString'
				}
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
		'isArr':[
			{
				'isArr':[
					{
						'isArr':[
							{
								'isArr':'isArrayIsArrayIsArrayIsArray'
							}
						]
					}
				]
			},
			{
				'isInt':[
					{
						'isArr':[
							{
								'isArr':'isArrayIsIntegerIsArrayIsArray'
							}
						]
					}
				]
			},
			{
				'isStr':[
					{
						'isInt':[
							{
								'isArr':'isArrayIsStringIsIntegerIsArray'
							}
						]
					}
				]
			}
		]
	},
	{
		'isObj':[
			{
				'isObj':[
					{
						'isStr':[
							{
								'isInt':"isObjectIsObjectIsStringIsInteger"
							},
							{
								'isObj':"isObjectIsObjectIsStringIsObject"
							}
						]
					},
					{
						'isObj':[
							{
								'isInt':"isObjectIsObjectIsObjectIsInteger"
							},
							{
								'isStr':"isObjectIsObjectIsObjectIsString"
							}
						]
					},
					{
						'isArr':"isObjectIsObjectIsArray"
					}
				]
			}
		]
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

class Test{
    constructor(){
        this.constructorTests()
    }

    constructorTests(){
        new TestObj(['someString'], ['isString', ['someString']])
        new TestObj(['string1', 'string2'], ['isStringIsString', ['string1', 'string2']])
        new TestObj(['string1', 'string2', 4], ['isStringIsStringIsInteger', ['string1', 'string2', 4]])
        new TestObj(['string1', 5, 'string2'], ['isStringIsIntegerIsString', ['string1', 5, 'string2']])
        new TestObj([2], ['isInteger', [2]])
        new TestObj([2, null], ['isIntegerIsInteger', [2, 0]])
        new TestObj([2, 4], ['isIntegerIsInteger', [2, 4]])
        new TestObj([2, "somestring"], ['isIntegerIsString', [2, "somestring"]])
        new TestObj([2, [1, 2, 3, 4]], ['isIntegerIsIntegerArray', [2, [1, 2, 3, 4]]])
        new TestObj(['string1', 4, 5], ['isStringIsIntegerIsInteger', ['string1', 4, 5]])
        new TestObj(['string1', null], ['isStringIsString', ['string1', 'wackyWonderfulString']])
        new TestObj(['string1', 'utf8', 3], ['isStringIsEncodingIsInteger', ['string1', 'utf8', 3]])
		new TestObj([[],[],[],[]], ['isArrayIsArrayIsArrayIsArray', [[],[],[],[]]])
		new TestObj([[1, 2, 3],[1, 2, 3],[3, 2, 1],[1,2,3]], ['isArrayIsArrayIsArrayIsArray', [[1, 2, 3],[1, 2, 3],[3, 2, 1],[1,2,3]]])
		new TestObj([[1, 2, 3],[1, 2, 3],[3, 2, 1]], ['isArrayIsArrayIsArrayIsArray', [[1, 2, 3],[1, 2, 3],[3, 2, 1]]])
		
		new TestObj(
			[
				{
					'some':"object"
				}, 

				{
					'another':["object"]
				}, 

				'some string', 

				123124115435
			], 
			[
				'isObjectIsObjectIsStringIsInteger', 
				[
					{
						'some':"object"
					}, 
	
					{
						'another':["object"]
					}, 
	
					'some string', 
	
					123124115435
				], 
			]
		) 

		
		new TestObj(
			[
				{
					'some':"object"
				}, 

				{
					'another':["object"]
				}, 

				'some string', 

				{
					'last':{
							"object":{}
					}
				}
			], 
			[
				'isObjectIsObjectIsStringIsObject',

				[
					{
						'some':"object"
					}, 
	
					{
						'another':["object"]
					}, 
	
					'some string', 
	
					{
						'last':{
								"object":{}
						}
					}
				]
			]
		) 



		new TestObj(
			[
				{
					"wow":"wee!"
				}, 
				{
					"pow":"ping"
				}, 
				{
					"ding": "dong"
				}, 
				0
			], 
			[
				'isObjectIsObjectIsObjectIsInteger', 
				[
					{
						"wow":"wee!"
					}, 
					{
						"pow":"ping"
					}, 
					{
						"ding": "dong"
					}, 
					0
				]
			]
		) 


		new TestObj(
			[
				{
					"wow":"wee!"
				}, 
				{
					"pow":"ping"
				}, 
				{
					"ding": "dong"
				}, 
				'wing ding'
			], 
			[
				'isObjectIsObjectIsObjectIsString', 
				[
					{
						"wow":"wee!"
					}, 
					{
						"pow":"ping"
					}, 
					{
						"ding": "dong"
					}, 

					'wing ding'
				]
			]
		)


		// new TestObj([{}, {}, []], ['isObjectIsObjectIsArray', [{}, {}, []]])


    }
}

new Test()
