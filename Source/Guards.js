export class Guards{
    constructor(){
    }

    isNKeys(obj, n){
        return (Object.keys(obj).length==n)
    }

    greaterThanNKeys(obj, n){
        return (Object.keys(obj).length>n)
    }

    isArr(v){ return (Array.isArray(v)) }

    isStr(v){
        return (typeof v === 'string' || v instanceof String)
    }

    isStrArr(v){
        if(!this.isArr(v)){ return }
        v.forEach( (e) => { if( !this.isStr(e) ) { return } } );
        return true
    }

    isKey(obj, wouldbkey){
      if (wouldbkey in obj){return true}
    }

    isEnc(v){
        return Buffer.isEncoding(v);
    }

    isEncArr(v){
        if(!this.isArr(v)) {return}
        v.forEach( (e) => { if( !Buffer.isEncoding(e) ) { return } } );
        return true
    }

    isObj(v){ 
        return (typeof v === 'object')    
    }

    isObjArr(v){
        if(!this.isArr(v)) {return}
        v.forEach( (e) => { if( !this.isObj(e) ) { return } } );
        return true
    }

    isEmptyObj(obj){
        return Object.keys(obj).length === 0;
    }

    isInt(v){
        return Number.isInteger(v);
    }

    isIntArr(v){
        if(!this.isArr(v)) {return false}
        for(var i=0; i<v.length; i++){
            if(this.isStr(v[i]) || !this.isInt(v[i])){ 
                return false
            } 
        }
        return true
    }

    isBuff(v){ return Buffer.isBuffer(v); }

    isBuffArr(v){
          if(!this.isArr(v)) { return }
          v.forEach((e)=>{ if(!Buffer.isBuffer(e)){ return } })
          return true
    }

    isNull(v){ return (v==null || v===null) }

    isUndef(v){ return (typeof v === "undefined" || v===undefined) }

    isReg(v){ return (v instanceof RegExp || v.constructor == RegExp) }

    isRegArr(v){
        if(!this.isArr(v)) { return }
        v.forEach((e)=>{ if(!this.isReg(e)){ return } })
        return true
    }

    isGuard(func){
      if( typeof eval('this.'+func) === "function" ){
        return true
      }
    }

    passGuard(func, v){
      func='this.'+func
      func = this.buildParams(func, v)
      var ev = eval(func)
      if(ev){
          return true
      }else{
          return false
      }
    }

    buildParams(func, v){
        if(this.isArr(v)){
            func+='('+JSON.stringify(v)+')'
            return func
        }else{
            func+='('+JSON.stringify(v)+')'
            return func
        }
    }
}