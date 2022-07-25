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
                            var func = Object.keys(schema_obj)[0]
                            var val = schema_obj[func]
                            if(this.g.isGuard(func)){
                                //attempt to pass guard
                                if(this.g.passGuard(func, v[v_indx])){
                                    //if we pass the guard, we need to check if it terminates
                                    //on a string or object, then call terminate
                                    if(this.isTerminal(val)=='string'){
                                        return
                                    }else if(this.isTerminal(val)=='obj'){
                                        return
                                    }else{
                                        console.log(v[v_indx], "passed guard", func, "but is not terminal")
                                        this.guard(v, v_indx+1, schema_obj)
                                    }
                                }else{
                                    throw Error(v[v_indx], "did not pass guard", func)
                                }
                            }else{throw Error("schema error:", schema_obj, "is not a guard object")}
                        }else{throw Error(`Schema Error, multiple guard keys at same level`)}
                    }else{throw Error('Schema Error: must be an object if its not an array')}
            }catch(err){}
        })
    }

    isTerminal(val){
        //console.log("HERE", val)
    }

    terminatingObj(){

    }
    terminatingStr(){

    }
}