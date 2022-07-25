import {Guards} from './Source/Guards.js'

export class Guard{
    constructor(v, schema, obj){
        this.obj=obj
        this.g = new Guards()
        console.log(this.g)
        this.guard(v, 0, schema)
    }

    guard(v, v_indx, schema){

        for(var i = 0; i<schema.length; i++){
            try {
                this.nextGuard(v, v_indx,  schema[i])
            }catch(err){
            }
        }
    }

    nextGuard(v, v_indx, schema){
        console.log(schema)

        if(this.g.isObjArr(schema)){
            console.log("here")
            this.guard(v, v_indx, schema)

        }else if(this.g.isObj(schema)){
            console.log("here")
            this.passGuard(v, v_indx, schema)

        }else{
            throw Error('schema must be of type object or of type array')
        }
    }

    passGuard(v, v_indx, schema){

        if(this.g.isNKeys(schema, 1)){
            var passGuard = this._passGuard(v, v_indx, schema)
            if(passGuard[0]){
                schema = passGuard[1]
                this.nextGuard(v, v_indx+1, schema)
            }

        }else{
            throw Error(
                `Schema error, should never have more than 1 key 
                to a non terminating level and should never have 
                more than 2 keys to a terminating level`
            )
        }
    }

    _passGuard(v, v_indx, schema){
        if(this.g.isTerminatingGuard(schema)){
            this.terminate(v, schema)
        }else{
            return [this.callGuard( Object.keys(schema)[0], v[v_indx]) , schema[Object.keys(schema)[0]]]
        }
    }

    callGuard(func, _v){
        func='this.g.'+func
        func = this.buildParams(func, _v)

        if(eval(func)){
            return true
        }else{
            return false
        }
    }

    terminate(v, schema){
        if(this.g.isString(schema[Object.keys(schema)[0]])){
        }else{
            if(this.callGuard(Object.keys(schema)[0], v[v.length-1])){
                this._terminate(v, schema, false)
            }else{
                this._terminate(v, schema, true)
            }
        }
    }  

    _terminate(v, schema, deflt){
        if(deflt){
            v.pop()
            v.push(schema[Object.keys(schema)[0]]['DEFAULT'])
        }
        var func = schema[Object.keys(schema)[0]]['FUNCTION']
        func='this.obj.'+func
        func=this.buildParams(func, v)
        eval(func)
    }

    isTerminatingGuard(schema){
        var objKeys = Object.keys(schema)
        if(objKeys.length==1){
            if(this.g.isObj(schema[objKeys[0]])){
                var obj = schema[objKeys[0]]
                if(Object.keys(obj).length==2){
                    if(this.g.isString(obj['DEFAULT']) && this.g.isString(obj['FUNCTION'])){
                        return true
                    }
                }
            }
        }
        return false
    }    

    buildParams(func, v){
        func+='('
        v.forEach((_v)=>{
            if(this.g.isString(_v)){
                func+="'"+_v+"'"+','
            }else{
                func+=_v+','
            }
        })
        func = func.substring(0, func.length-1)
        func+=')'
        return func
    }
}