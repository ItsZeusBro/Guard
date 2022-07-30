import {Is} from './Is.js'
import {Terminal} from './Terminal.js'
import {Utils} from './Utils.js'
class Iterator{
    constructor(guard){
        this.is = new Is()
        this.utils=new Utils()
        this.guard=guard //schema
    }
    //this one changes the state, and is used for looping blocks
    next(val){

        //takes the val, tries to pass the guard and return the next array of objects, or whatever else is available
    }
    //this doesn't change the state, its used for looping conditions
    _next(val){

    }

    //we could use it in a while(_next(val))
}



//itercurse uses a while loop
//next(val) would itercurse (replacing the top level array with the next level array)
//[  
//  {
//      'isGuard':[
//              {
//                  'isGuard':Anything
//              }
//       ]  
//  } 
//]

//[
//    {
//       'isGuard':Anything
//    }
//]  
//
//next(val) in this case would itercurse (replacing the top level array with the next level array)
//[  
//  {
//      'isGuard':[
//              {
//                  'isGuard':Anything
//              }
//              ...
//       ]  
//  } 
//]

//[
//    {
//       'isGuard':Anything
//    }
//    ...
//]  





//next(val) in this case
//[  
//  {
//      'isGuard':[
//              {
//                  'isGuard':Anything
//              }
//       ]  
//  } 
// ...
//]

//[  
//  {
//      'isGuard':[
//              {
//                  'isGuard':Anything
//              },
//              ...
//       ]  
//  } 
// ...
//]



//performing next on this array would yield: { 'isGuard':[arbitrary array]}
//
//[
//  {
//      'isGuard':[arbitrary array]   
//  }
//]

//performing next on this array would yield: { 'isGuard':[arbitrary array]}
//AND would pop it off the array
//[
//  {
//      'isGuard':[arbitrary array]   
//  },
// ...
//]

//performing next on this array would yield: { 'isGuard':[arbitrary array]}
//
//[
//  {
//      'isGuard':[arbitrary array]   
//  }
//]
//...

//performing next on this array would yield: { 'isGuard':[arbitrary array]}
//
//[
//  {
//      'isGuard':[arbitrary array]   
//  } 
//  ...
//]
//...





//performing next on this array would yield: { 'isGuard':[arbitrary array]}
//
//[
//  {
//      'isGuard':{//any arbitrary object}    
//  }
//]

//performing next on this array would yield: { 'isGuard':[arbitrary array]}
//AND would pop it off the array
//[
//  {
//      'isGuard':{//any arbitrary object}    
//  },
// ...
//]

//performing next on this array would yield: { 'isGuard':[arbitrary array]}
//
//[
//  {
//      'isGuard':{//any arbitrary object}    
//  }
//]
//...

//performing next on this array would yield: { 'isGuard':[arbitrary array]}
//
//[
//  {
//      'isGuard':{//any arbitrary object}    
//  } 
//  ...
//]
//...





//performing next on this array would yield: { 'isGuard':[arbitrary array]}
//
//[
//  {
//      'isGuard':'arbitrary string'        
//  }
//]

//performing next on this array would yield: { 'isGuard':[arbitrary array]}
//AND would pop it off the array
//[
//  {
//      'isGuard':'arbitrary string'        
//  },
// ...
//]

//performing next on this array would yield: { 'isGuard':[arbitrary array]}
//
//[
//  {
//      'isGuard':'arbitrary string'        
//  }
//]
//...

//performing next on this array would yield: { 'isGuard':[arbitrary array]}
//
//[
//  {
//      'isGuard':'arbitrary string'        
//  } 
//  ...
//]
//...