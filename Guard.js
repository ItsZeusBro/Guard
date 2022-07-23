//you cant have two optional variables with default behavior
//at the same level in a subschema
export const GUARD_MAP={
    'Strofr':{
        'isStringArray':{
                'isEncodingArray':'_stringEncodedArrayOrStringArrayEncodedArray',
                'isEncoding':{
                    'DEFAULT':'utf-32',
                    'FUNCTION':'_stringArrayEncodedOrStringEncoded'
                }
        }, 

        'isString':{
                'isSeparator':{
                    'isEncoding': {
                        'DEFAULT':'utf-32',
                        'FUNCTION': '_stringSeparated'
                    }                    
                }, 
                'isEncoding':{
                    'DEFAULT':'utf-32',
                    'FUNCTION': '_stringSeparated'
                },
                'isEncodingArray':'_stringEncodedArrayOrStringArrayEncodedArray'
        }, 
        "isBufferArray":{
                'isEncodingArray':'_bufferArrayEncodedArray', 
                'isEncoding':{
                    'DEFAULT':'utf-32',
                    'FUNCTION': '_bufferArrayEncoded'
                }
        },
        "isBuffer":{
		        'isSeparator':'_bufferSeparated', 
                'isEncodingArray':'_bufferEncodedArray', 
                'isEncoding':{
                    'DEFAULT':'utf-32',
                    'FUNCTION': '_bufferEncoded'
                }
        }
        "isCell":{
            'isEncoding':{
                'DEFAULT':'utf-32',
                'FUNCTION': '_cellEncoding'
            }
        }
        "isRow":{
            'isEncoding':{
                'DEFAULT':'utf-32',
                'FUNCTION': '_rowEncoding'
            },
            'isEncodingArray':'_rowEncodedArray'
        }
    }
}


export class Guard{
    //attributions
    //https://stackoverflow.com/questions/14636536/how-to-check-if-a-variable-is-an-integer-in-javascript
    //https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
    //https://stackoverflow.com/questions/4059147/check-if-a-variable-is-a-string-in-javascript
    //https://javascript.plainenglish.io/how-to-check-for-null-in-javascript-dffab64d8ed5
    //https://stackoverflow.com/questions/3390396/how-can-i-check-for-undefined-in-javascript
    //https://stackoverflow.com/questions/4339288/typeof-for-regexp
    //v is just a schema that get passed in
    constructor(v, obj){

    }
    guard(){

    }

    isArray(v){ return ((Array.isArray(v)) && v.length) }

	isString(v){ return (typeof v === 'string' && v instanceof String) }

    isStringArray(v){ 
		if(!this.isArray(v)){ return }
		v.forEach( (e) => { if( !this.isString(e) ) { return } } );
		return true
	}

    isEncoding(v){ return Buffer.isEncoding(v); }

	isEncodingArray(v){ 
        if(!this.isArray(v)) {return}
        v.forEach( (e) => { if( !Buffer.isEncoding(e) ) { return } } );
        return true
		
	}

    isObj(v){ return (typeof v === 'object' && !Array.isArray(v) && v !== null) }

    isObjArray(v){
        if(!this.isArray(v)) {return}
		v.forEach( (e) => { if( !this.isObj(e) ) { return } } );
		return true
    }

    isInt(v){
        var x;
        return isNaN(value) ? !1 : (x = parseFloat(value), (0 | x) === x); //
    }

    isIntArray(v){
        if(!this.isArray(v)) {return}
        v.forEach( (e) => { if( !this.isInt(e) ) { return } } );
        return true
    }

    isBuffer(v){ return Buffer.isBuffer(v); }
	
	isBufferArray(v){ 
        if(!this.isArray(v)) { return }
        v.forEach((e)=>{ if(!Buffer.isBuffer(e)){ return } })
        return true
	}

    isNull(v){ return (v==null && v===null) }

    isUndefined(v){ return (typeof v === "undefined" && v===undefined) }

    isRegX(v){ return (v instanceof RegExp && v.constructor == RegExp) }

    isArrayOfRegX(v){
        if(!this.isArray(v)) { return }
        v.forEach((e)=>{ if(!Buffer.isRegX(e)){ return } })
        return true
    }

    // isGuarded(v){

    // }

    // isArrayOfGuarded(v){

    // }
}
