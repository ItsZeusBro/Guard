export class Guard{
    constructor(guards, v, schema, obj, term=true){
        this.obj=obj
        this.term=term
        this.didTerminate=false
        this.g = guards
        this.guard(v, 0, schema)
    }

    guard(v, v_indx, schema){
        schema.forEach((schema_obj)=>{
            try {
                    if(this.didTerminate){return}

                    if(this.g.isObjArr(schema_obj)){

                            this.guard(v, v_indx, schema_obj)

                    }else if(this.g.isObj(schema_obj)){
                        if(this.g.isNKeys(schema_obj, 1)){
                            //it has to be a guard or we throw an error
                            if(this.isGuard(schema_obj)){
                                //attempt to pass guard
                                if(this.passGuard(schema_obj, v[v_indx])){
                                    //if we pass the guard, we need to check if it terminates
                                    if(this.isTerminal(schema_obj)){
                                        //terminate
                                    }
                                }
                            }else{throw Error("schema error:", schema_obj, "is not a guard object")}
                        }else{throw Error(`Schema Error, multiple guard keys at same level`)}
                    }else{throw Error('Schema Error: must be an object if its not an array')}
            }catch(err){

            }
        })
    }


    passGuard(func, v){
        func='this.g.'+func

        func = this.buildParams(func, v)

        if(eval(func)){
            return true
        }else{
            return false
        }
    }

    buildParams(func, v){
        func+='('+JSON.stringify(v)+')'
        
        return func
        
    }
}