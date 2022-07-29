export class Rand{
    constructor(){
        this.rand=this
    }
    Str(){return this.rand._Str(this.rand.Range(0, 3))}
    Int(){return this.rand.Range(0,3)}
    Arr(n){var arr=[]; for(var i=0;i<n;i++){arr.push(this.rand.thing())}; return arr}
    thing(){
        return[
            this.rand.IntArr, this.rand.Str, this.rand.Int, this.rand.Enc, this.rand.EncArr, this.rand.StrArr,
            this.rand.Obj, this.rand.ObjArr
        ].sample()()
    }
    IntArr(n=this.rand.Int()){var arr=[]; for(var i=0;i<n;i++){arr.push(this.rand.Int())}; return arr}
    Enc(){return "utf8"}
    EncArr(){return ['utf8']}
    StrArr(n=this.rand.Int()){var arr=[]; for(var i=0;i<n;i++){arr.push(this.rand.Str())}; return arr}
    Obj(n=this.rand.Int()){if(n){return {[this.rand.Str()]:this.rand.Obj(n-1)}}else{return {}}};
    ObjArr(n=this.rand.Int()){var arr=[]; for(var i=0;i<n;i++){arr.push(this.rand.Obj())}; return arr}
    Selection(bag){
        return bag[Math.floor(Math.random() * bag.length)];
    }
    Range(min, max){
        return Math.floor(Math.random()*(max-min+1)+min)
    }
    _Str(len, chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'){
        //programiz.com
        var str='';
        for (var i = 0; i<len; i++){str+=chars.charAt(Math.floor(Math.random()*chars.length))}
        return str;
    }
    Mod10(){
        return Math.floor(Math.random()*(100-0+1)+0)%2
    }
}