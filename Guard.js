export class Guard{
    constructor(guards, v, schema, obj, term=true){
        this.obj=obj
        this.term=term
        this.didTerminate=false
        this.g = guards
        this.q=[];
        this.guard(v, 0, schema)
        try{
            //if the last item pushes to the queue, did not throw an error, flush the queue
            eval(this.q.shift())
        }catch{

        }
    }

    guard(v, v_indx, schema){
        schema.forEach((schema_obj)=>{
            try {
                    if(this.didTerminate){return}
                    if(this.g.isObjArr(schema_obj)){
                        this.guard(v, v_indx+1, schema_obj)
                    }else if(this.g.isObj(schema_obj)){

                        if(this.g.isNKeys(schema_obj, 1)){
                            var func = Object.keys(schema_obj)[0];
                            var val = schema_obj[func];
                            if(this.g.isGuard(func)){
                                if(this.g.passGuard(func, v[v_indx])){
                                    if(this.isTerminal(v, v_indx, val)=='string'){
                                        this.terminatingStr(v, val);
                                    }else if(this.isTerminal(v, v_indx, val)=='obj'){
                                        //this is where things go wrong
                                        this.terminatingObj(func, v, v_indx, val);

                                    }else{
                                        this.guard(v, v_indx+1, schema_obj[func]);
                                    }
                                }else{
                                    if(this.isTerminal(v, v_indx, val)=='obj'){
                                        //AND HERE
                                        this.terminatingObj(func, v, v_indx, val);
                                    }else{
                                        throw Error("did not pass guard and is not terminal object with default value")
                                    }
                                }
                            }else{throw Error("schema error:", schema_obj, "is not a guard object")}
                        }else{throw Error("Schema Error, multiple guard keys", Object.keys(schema_obj), "at same level")}
                    }else{throw Error("Schema Error:",schema_obj, "must be an object if its not an array but is not")}
            }catch(err){
            }
        })
        return
    }

    isTerminal(v, v_indx, val){
        if(this.g.isStr(val)&&(v_indx==v.length-1)){
            return 'string';
        }else if(this.g.isObj(val)&&(!this.g.isArr(val))&&(v_indx==v.length-1)){
            //deep check required!
            if(this.g.isKey(val,'DEFAULT')&&this.g.isKey(val, 'FUNCTION')){
                return 'obj';
            }
        }
    }

    terminatingObj(func, v, v_indx, obj, lookahead=true){
        // console.log(func, v, v_indx, obj, lookahead)
        if(!lookahead){
            this.didTerminate=true
        }
        else{
            if(this.g.passGuard(func, v[v_indx])){
                func = this.g.buildParams(obj['FUNCTION'], v)
                this.q.push('this.obj.'+func)
            }
        }   
    }

    terminatingStr(v, str, lookahead=true){
        if(!lookahead){
            this.didTerminate=true
        }else{
            var func = this.g.buildParams(str, v)
            this.q.push('this.obj.'+func)
        }

    }
}