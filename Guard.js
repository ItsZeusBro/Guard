import {Cell} from "./Cell.js"
//you cant have two optional variables with default behavior
//at the same level in a subschema


export const GUARDS=[

        {
                'isString':[
                        {
                                'isSeparator':[
                                        {
                                                'isEncoding': {
                                                    'DEFAULT':'utf8',
                                                    'FUNCTION': 'isStringIsSeparatorIsEncoding'
                                                }    
                                        }
                                ]
                        }, 
                        {
                                'isEncoding':{
                                        'DEFAULT':'utf8',
                                        'FUNCTION': 'isStringIsEncoding'
                                }
                        },
                        {
                                'isEncodingArray':'isStringIsEncodingArray'

                        }   
                ]
        },
        {
                'isString':[
                        {
                                'isEncodingArray':'isStringIsEncodingArray'
                        },
                        {
                                'isEncoding':{
                                        'DEFAULT':'utf8',
                                        'FUNCTION':'isStringIsEncoding'
                                }
                        }
                ]
        },
        {
                "isCell":[
                        {
                                'isEncoding':{
                                        'DEFAULT':'utf8',
                                        'FUNCTION': 'isCellIsEncoding'
                                }
                        }

                ]
        },       
        {
                "isCell":[
                        {
                                'isString':[

                                        {
                                            'DEFAULT':'utf8',
                                            'FUNCTION': 'isRowIsEncoding'
                                        }
                                ]
                        },
                        {
                                'isString':'isRowIsEncodingArray'
                        }
                ]
        }
]

export class Guard{
    constructor(v, schema, obj, terminate=true){
        this.terminate=terminate
        this.didTerminate=false
        this.guard(v, 0, schema, obj)
    }
    guard(v, v_indx, schema, obj){
        var _nG;
        //recursive function nextGuard() returns nothing. It succeeds at each level or throws an error
       
        try{
            for(var i = 0; i<schema.length; i++){
                try {
                    this.nextGuard(v, v_indx,  schema[i], obj)
                    if(this.terminate&&this.didTerminate){
                        return
                    }
                }catch(err){
                    console.log(err)
                }
            }
        }catch{

        }
    }

    nextGuard(v, v_indx, schema, obj){
        if(this.isObjArray(schema)){
            console.log( "SCHEMA IS OBJECT ARRAY")
            console.log( v[v_indx], schema, '\n')

            this.guard(v, v_indx, schema, obj)

        }else if(this.isObj(schema)){
            if(this.isNKeys(schema, 1)){
                console.log( "SCHEMA IS GUARD OBJECT")
                console.log( v[v_indx], schema, '\n')
                //if passGuard uses a terminating guard, it doesn't recurse, short circuits if condition
                if(this.passGuard( v, v_indx, schema)){
                    //if the whole program returns true, this would recurse!
                    //shrink obj
                    if(this.terminate && this.didTerminate){
                        return
                    }else{
                        this.nextGuard(v, v_indx+1, this.passGuard( v, v_indx, schema))
                    }
                }
            }else{
                throw Error( "Schema error, should never have more than 1 key to a non terminating level and should never have more than 2 keys to a terminating level")
            }

        //     //if there are three or more, throw schema error
        //     console.log("OBJ", schema)
        }else{
            throw Error( 'schema must be of type object or of type array')
        }

    }
    terminate(v, schema){
        this.didTerminate=true
        console.log("TERMINATING FUNCTION", v, schema, '\n\n\n\n\n\n')
    }  

    passGuard(v, v_indx, schema){

        //if there is a default in the schema, we treat it differently if it doesn't pass the guard
        //we need to look ahead and see if this is a terminating guard
        if(isTerminatingGuard(v, v_indx, schema)){
            this.terminate
        }
        console.log( "TRYING GUARD")
        //grab the key, and assume it is the guard function and call it
        console.log( Object.keys(schema)[0], '\n')
        this.callGuard( Object.keys(schema)[0], v[v_indx])
        return schema[Object.keys(schema)[0]]
    }
    callGuard( func, _v){
        try{
            func+='('+'"' +_v + '"' + ')'
            func='this.'+func
            console.log( "CALLING GUARD", func, '\n')
    
            if(eval(func)){
                console.log( "PASSED GUARD", func, '\n\n\n\n')
                return true
            }else{
                throw Error( "Did not pass guard", func)
            }
        }catch{
            throw Error( "Cannot Call Guard function, Check Schema")
        }
    }
    






    isNKeys(obj, n){
        return (Object.keys(obj).length==n)
    }
    greaterThanNKeys(obj, n){
        return (Object.keys(obj).length>n)
    }
    isArray(v){ return ((Array.isArray(v)) && v.length) }

	isString(v){ 
        return (typeof v === 'string' || v instanceof String) 
    }
    isStringArray(v){ 
		if(!this.isArray(v)){ return }
		v.forEach( (e) => { if( !this.isString(e) ) { return } } );
		return true
	}

    isEncoding(v){ 
        return Buffer.isEncoding(v); 
    }

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
    isEmptyObject(obj){
        return Object.keys(obj).length === 0;
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

    isNull(v){ return (v==null || v===null) }

    isUndefined(v){ return (typeof v === "undefined" || v===undefined) }

    isRegX(v){ return (v instanceof RegExp || v.constructor == RegExp) }

    isArrayOfRegX(v){
        if(!this.isArray(v)) { return }
        v.forEach((e)=>{ if(!Buffer.isRegX(e)){ return } })
        return true
    }

    isSeparator(v){ 

        if(v.includes('s:')){ 
            return true 
        } 
    }

	sameLength(arr1, arr2){
		if( this.isArray(arr1) && this.isArray(arr2) ){ return ( arr1.length == arr2.length ) }	
	}

	
	isRow(strofr){
		if(this.isArray(strofr)){
			strofr.forEach((cell)=>{
				if(!this.isCell(cell)){return false}
			})
			return true
		}
	}
	
	isCell(cell){
		if(cell instanceof Cell && cell.v && cell.e && cell.i){
			return true
		}
	}

	sameLength(...v){
		if( this.isArray(arr1) && this.isArray(arr2) ){ return ( arr1.length == arr2.length ) }	
	}

    // isGuarded(v){

    // }

    // isArrayOfGuarded(v){

    // }
}


class someObj{
    constructor(){

    }

    isStringIsEncodingArray(v){
        console.log("isStringIsEncodingArray(", v, ")")
    }
    isStringIsEncoding(v){
        console.log("isStringIsEncoding(", v, ")")

    }
    isStringIsSeparatorIsEncoding(v){
        console.log("isStringIsSeparatorIsEncoding(", v, ")")

    }
    isStringIsEncoding(v){
        console.log("isStringIsEncoding(", v, ")")

    }
    isStringIsEncodingArray(v){
        console.log("isStringIsEncodingArray(", v, ")")

    }
    isBufferArrayIsEncodingArray(v){
        console.log("isBufferArrayIsEncodingArray(", v, ")")

    }
    isBufferArrayIsEncoding(v){
        console.log("isBufferArrayIsEncoding(", v, ")")

    }
    isBufferIsSeparator(v){
        console.log("isBufferIsSeparator(", v, ")")

    }
    isBufferIsEncodingArray(v){
        console.log("isBufferIsEncodingArray(", v, ")")

    }
    isBufferIsEncoding(v){
        console.log("isBufferIsEncoding(", v, ")")

    }
    isBufferIsSeparator(v){
        console.log("isBufferIsSeparator(", v, ")")

    }
    isBufferIsEncodingArray(v){
        console.log("isBufferIsEncodingArray(", v, ")")

    }
    isBufferIsEncoding(v){
        console.log("isBufferIsEncoding(", v, ")")

    }
    isCellIsEncoding(v){
        console.log("isCellIsEncodings(", v, ")")

    }
    isRowIsEncoding(v){
        console.log("isRowIsEncoding(", v, ")")

    }
    isRowIsEncodingArray(v){
        console.log("isRowIsEncodingArray(", v, ")")

    }
}


new Guard(["strng", "s:separator", "null"], GUARDS,  new someObj())

    //attributions
    //https://stackoverflow.com/questions/14636536/how-to-check-if-a-variable-is-an-integer-in-javascript
    //https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
    //https://stackoverflow.com/questions/4059147/check-if-a-variable-is-a-string-in-javascript
    //https://javascript.plainenglish.io/how-to-check-for-null-in-javascript-dffab64d8ed5
    //https://stackoverflow.com/questions/3390396/how-can-i-check-for-undefined-in-javascript
    //https://stackoverflow.com/questions/4339288/typeof-for-regexp
    //https://bobbyhadz.com/blog/javascript-check-if-object-is-empty

    
