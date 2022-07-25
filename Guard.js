export class Guard{
    constructor(guards, v, schema, obj, term=true){
        this.obj=obj
        this.term=term
        this.didTerminate=false
        this.g = guards
        this.guard(v, 0, schema)
    }

    guard(v, v_indx, schema){
        schema.forEach((_schema)=>{
            try {
                    if(this.didTerminate){return}

                    if(this.g.isObjArr(_schema)){

                            this.guard(v, v_indx, _schema)

                    }else if(this.g.isObj(_schema)){

                        if(this.g.isNKeys(_schema, 1)){

                                var passGuard = this.passGuard(v, v_indx, _schema)
                                
                                if(passGuard[0]){

                                        _schema = passGuard[1]
                                        this.nextGuard(v, v_indx+1, _schema)
                                }

                        }else{
                            throw Error(`Schema Error`)
                        }
                    }else{
                        throw Error('Schema Error')
                    }
            }catch(err){
            }
        })
    }


    passGuard(v, v_indx, schema){
        if(this.isTerminatingGuard(v, v_indx, schema)){
            this.terminate(v, schema)
        }else{
            return [this.callGuard( Object.keys(schema)[0], v[v_indx]) , schema[Object.keys(schema)[0]]]
        }
    }

    callGuard(func, _v){
        func='this.g.'+func

        func = this.buildParams(func, _v)
        // console.log("WHAT?!", func)
        //console.log("wow!",_v, func)
        if(eval(func)){
            return true
        }else{
            return false
        }
    }

    terminate(v, schema){
        if(this.g.isStr(schema[Object.keys(schema)[0]])){
            //the last parameter should be passed to callGuard because we are terminating
            if(this.callGuard(Object.keys(schema)[0], v[v.length-1])){
                this._terminate(v, schema, false)
            }
        }else{
            console.log(v, schema)
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
        if(this.g.isStr(schema[Object.keys(schema)[0]])){
            var func = schema[Object.keys(schema)[0]]
            func='this.obj.'+func
            func=this.buildParams(func, v)
            eval(func)
        }else{
            var func = schema[Object.keys(schema)[0]]['FUNCTION']
            func='this.obj.'+func
            func=this.buildParams(func, v)
            eval(func)
        }
        this.didTerminate=true
    }

    isTerminatingGuard(v, v_indx, schema){
        if (v.length-1!=v_indx){return false}
        var objKeys = Object.keys(schema)

        if(objKeys.length==1){

            if(this.g.isStr(schema[objKeys[0]])){

                return true
            }
            else if(this.g.isObj(schema[objKeys[0]])){

                var obj = schema[objKeys[0]]
                if(Object.keys(obj).length==2){
                    if(this.g.isKey(obj, 'DEFAULT') && this.g.isKey(obj, 'FUNCTION')){
                        //console.log(obj)

                        return true
                    }
                }
            }
        }
        return false
    }    

    buildParams(func, v){
        func+='('+JSON.stringify(v)+')'
        //console.log(func)
        // if(this.g.isArr(v)){
        //     var arr = '['
        //     v.forEach((_v)=>{
        //         if(this.g.isStr(_v)){
        //             arr+="'"+_v+"'"+','
        //         }else{
        //             arr+=_v+','
        //         }
        //     })
        //     arr = arr.substring(0, func.length-1)
        //     arr+=']'
        //     func+=arr+')'
        //     console.log(func)
        //     return func
        // }else{
        //     if(this.g.isStr(v)){
        //         func+="'"+v+"'"+')'
        //         return func
        //     }else{
        //         func+=v+')'
        //         return func
        //     }
        // }
        return func
        
    }
}