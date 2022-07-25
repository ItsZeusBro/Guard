import {Guard} from './Guard.js'

export const GUARD=[
    {
            'isStr':"isString"

    }
    // {
            
    //         'isStr':[
    //                 {
    //                         'isStr':"isStringIsString"
    //                 },
    //                 {
    //                         'isStr':[
    //                                 {
    //                                     'isInt':'isStringIsStringIsInt'
    //                                 }
    //                         ]
    //                 },

    //                 {
    //                         'isSep':[
    //                                 {
    //                                         'isEncoding': {
    //                                             'DEFAULT':'utf8',
    //                                             'FUNCTION': 'isStringIsSeparatorIsEncoding'
    //                                         }    
    //                                 }
    //                         ]
    //                 }, 
    //                 {
    //                         'isEnc':{
    //                                 'DEFAULT':'utf8',
    //                                 'FUNCTION': 'isStringIsEncoding'
    //                         }
    //                 },
    //                 {
    //                         'isEncArr':'isStringIsEncodingArray'
    //                 }   
    //         ]
    // },
    // {
    //         'isInt':[
    //                 {
    //                         'isInt': {
    //                             'DEFAULT':10,
    //                             'FUNCTION': 'isIntegerIsInteger'
    //                         }    
    //                 },

    //                 {
    //                         'isStr':{
    //                             "DEFAULT":"",
    //                             "FUNCTION": 'isIntegerIsString'
    //                         }
    //                 },
    //                 {
    //                         'isIntArr':{
    //                             "DEFAULT":[],
    //                             "FUNCTION": 'isIntegerIsIntegerArray'
    //                         }
    //                 },
    //                 {
    //                         'isArr':[
    //                                 {
    //                                     'isArray':"isIntegerIsArrayIsArray"
    //                                 },
    //                                 {
    //                                     'isString':"isIntegerIsArrayIsString"
    //                                 }
    //                         ]
    //                 },
    //     ]
            
    // },
    // {
    //         'isArr':'isStringIsSeparatorIsEncoding' 
    // }
]

class TestObj{
    constructor(...v){
        new Guard(v, GUARD,  this)
    }

    isString(...v){

        console.log("isString(", v, ")")

    }
    isStringIsString(...v){
        console.log("isStringIsString(", v, ")")

    }
    isStringIsStringIsInt(...v){
        console.log("isStringIsStringIsInt(", v, ")")

    }
    isStringIsIntIsString(...v){
        console.log("isStringIsIntIsString(", v, ")")

    }

    isStringIsIntIsInt(...v){
        console.log("isStringIsIntIsInt(", v, ")")

    }
    isStringIsEncoding(...v){
        console.log("isStringIsEncoding(", v, ")")

    }
    isStringIsSeparatorIsEncoding(...v){
        console.log("isStringIsSeparatorIsEncoding(", v, ")")
    }
    

    isStringIsSeparatorIsEncoding(...v){
        console.log("isStringIsEncodingIsInt(", v, ")")
    }
    
}

class Test{
    constructor(){

        this.constructorTests()
    }

    constructorTests(){
        new TestObj('someString')
        // new TestObj('string1', 'string2')
        // new TestObj('string1', 'string2', 4)
        // new TestObj('string1', 5, 'string2')
        // new TestObj('string1', 4, 5)
        // new TestObj('string1', 'utf8')
        // new TestObj('string1', 'sep:,', 'utf8')
        // new TestObj('string1', 'utf8', 3)

    }
}


new Test()
