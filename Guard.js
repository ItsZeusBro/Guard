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
                            //we know its a possible guard, try and pass it
                                //pass guard
                                if(this.passGuard( Object.keys(schema_obj)[0], v[v_indx])){

                                    //before calling guard, check if the value is a terminating string
                                    if(this.g.isStr(schema_obj[Object.keys(schema_obj)[0]])){
                                        //terminate
                                        this.terminate(v, schema_obj)
                                    }

                                    this.guard(v, v_indx+1, schema_obj)
                                }else{

                                    throw Error('could not pass guard', Object.keys(schema_obj)[0])
                                }
                        }if(this.g.isNKeys(schema_obj, 2)){
                            //check for terminal object
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


    passGuard(func, _v){
        func='this.g.'+func

        func = this.buildParams(func, _v)

        if(eval(func)){
            return true
        }else{
            return false
        }
    }

    terminate(v, func){

    }  

    _terminate(v, schema, deflt){

    }



    buildParams(func, v){
        func+='('+JSON.stringify(v)+')'
        
        return func
        
    }
}