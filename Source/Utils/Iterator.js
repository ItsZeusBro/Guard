import {Is} from './Is.js'
import {Terminal} from './Terminal.js'
import {Utils} from './Utils.js'
class Iterator{
    constructor(guard){
        this.is = new Is()
        this.utils=new Utils()
        this.guard=guard //schema
        this.sentinel;
    }
    //this one changes the state, and is used for looping blocks
    next(val){

        return this.itercursion(array, 1)
    }

    //we could use it in a while(_next(val))

    itercursion(array, n){


    }

    drill(){


    }
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


//Itercursion uses a sentinal value that follows rules that you specify based on its value


//  Sentinel see's an array                                                                                                                    
//                                                                                                                  vvv                                      
//  [                         1                                                0                                    ]   
//      {                   isStr:                  },  {                    isArr:                             }
//          [         1                0         ]           [        1                  0                  ]                  
//              {   isStr:  },  {   isArr:  }                   {   isStr:  },    {   isArr:,   isInt: }                     
//                  [  0 ]          [  0 ]                          [  0 ]            [  0 ]    [  0 ]                        
//                    {}              {}                              {}                {}        {}                       
//
//  

//  Sentinel grabs the first item in an array and then sees an object with only one key
//  [                         1                                                0                               vvv  ]   
//      {                   isStr:                  },  {                    isArr:                              }
//          [         1                0         ]           [        1                  0                   ]                  
//              {   isStr:  },  {   isArr:  }                   {   isStr:  },    {   isArr:,   isInt: }  
//                  [  0 ]          [  0 ]                          [  0 ]            [  0 ]    [  0 ]                     
//                    {}              {}                              {}                {}        {}                        
//

//  Sentinel always 
//  [                         1                                                0                                    ]   
//      {                   isStr:                  },                                                              <--delete
//          [         1                0         ]           [        1                  0                    ]                  
//              {   isStr:  },  {   isArr:  }                   {   isStr:  },    {   isArr:,   isInt: }  
//                  [  0 ]          [  0 ]                          [  0 ]            [  0 ]    [  0 ]                     
//                    {}              {}                              {}                {}        {}                        
//

//                             1                                               0                                                                
//  [                                                                                                               ]   
//      {                   isStr:                  },      [         1                 0                      ]    <--collapse
//          [         1               0          ]              {   isStr:  },    {   isArr:,   isInt:   }              
//              {   isStr:  },  {   isArr:  }                       [  0 ]            [  0 ]    [  0 ]             
//                  [  0 ]          [  0 ]                            {}                {}        {}               
//                    {}              {}                                                           
//



//                             1                                               0                                                                
//  [                                                                                              vvv              ]   
//      {                   isStr:                  },      [         1                 0                       ]       
//          [         1               0          ]              {   isStr:  },    {   isArr:,   isInt:   }              
//              {   isStr:  },  {   isArr:  }                       [  0 ]            [  0 ]    [  0 ]             
//                  [  0 ]          [  0 ]                            {}                {}        {}               
//                    {}              {}                                                           
//



//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [          1                 0       vvv            ]       
//          [         1               0          ]               {   isStr:  },    {   isArr:,   isInt:   }        
//              {   isStr:  },  {   isArr:  }                       [  0 ]            [  0 ]    [  0 ]                
//                  [  0 ]          [  0 ]                            {}                {}        {}                        
//                    {}              {}                                                           
//


//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [          1                 0                      ]       
//          [         1               0          ]               {   isStr:  },    {   isArr:,      vvv   }        
//              {   isStr:  },  {   isArr:  }                       [  0 ]            [  0 ]    [  0 ]                
//                  [  0 ]          [  0 ]                            {}                {}        {}                        
//                    {}              {}                                                           
//

//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [          1                 0                      ]       
//          [         1               0          ]               {   isStr:  },    {   isArr:,            }        
//              {   isStr:  },  {   isArr:  }                       [  0 ]            [  0 ]    [ vvv ]                
//                  [  0 ]          [  0 ]                            {}                {}        {}                        
//                    {}              {}                                                           
//

//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [          1                vvv                     ]       
//          [         1               0          ]               {   isStr:  },    {   isArr:             }        
//              {   isStr:  },  {   isArr:  }                       [  0 ]            [  0 ]                    <--- delete               
//                  [  0 ]          [  0 ]                            {}                {}                                
//                    {}              {}                                                           
//

//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [          1                                        ]       
//          [         1               0          ]               {   isStr:  },       [  0 ]                   <---collapse
//              {   isStr:  },  {   isArr:  }                       [  0 ]              {}                           
//                  [  0 ]          [  0 ]                            {}                                                
//                    {}              {}                                                           
//



//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [         1                   vvv                   ]       
//          [         1               0         ]               {   isStr:  },        [ 0  ]                           
//              {   isStr:  },  {   isArr:  }                       [  0 ]              {}               
//                  [  0 ]          [  0 ]                            {}                                        
//                    {}              {}                                                           
//

//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [         1                 0                       ]       
//          [                                   ]               {   isStr:  },        [ vvv]                     
//              {   isStr:  },  {   isArr:  }                       [  0 ]              {}               
//                  [ 0  ]          [  0 ]                            {}                                        
//                    {}              {}                                                           
//

//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [         1                 0                       ]       
//          [         1               0         ]               {   isStr:  },        [ 0  ]                      
//              {   isStr:  },  {   isArr:  }                       [  0 ]              {}               
//                  [ 0  ]          [ 0  ]                            {}                                        
//                    {}              {}                                                           
//

//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [         1                                         ]       
//          [        1                0         ]               {   isStr:  }                                   <---delete        
//              {   isStr:  },  {   isArr:  }                       [  0 ]                            
//                  [ 0  ]          [ 0  ]                            {}                                        
//                    {}              {}                                                           
//

//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [         1                                         ]       
//          [        1                0         ]               {   isStr:  }                                   <---delete        
//              {   isStr:  },  {   isArr:  }                       [  0 ]                            
//                  [ 0  ]          [ 0  ]                            {}                                        
//                    {}              {}                                                           
//



//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [         1                 0                       ]       
//          [        1                0          ]               {   isStr:  }                                  <---nothing to collapse            
//              {   isStr:  },  {   isArr:  }                       [    ]                    
//                  [    ]          [    ]                            {}                                        
//                    {}              {}                                                           
//

//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [         0     vvv                                 ]       
//          [         1               0          ]               {   isStr:  }                                   
//              {   isStr:  },  {   isArr:  }                       [ 0  ]                    
//                  [ 0  ]          [ 0  ]                            {}                                        
//                    {}              {}                                                           
//

//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [         0     vvv                                 ]       
//          [         1               0          ]                                                              <---delete
//              {   isStr:  },  {   isArr:  }                       [ 0  ]                    
//                  [ 0  ]          [ 0  ]                            {}                                        
//                    {}              {}                                                           
//




//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [        0                                          ]       
//          [         1               0          ]                 [ 0  ]                            <---collapse                                   
//              {   isStr:  },  {   isArr:  }                        {}                   
//                  [ 0  ]          [ 0  ]                                                                    
//                    {}              {}                                                           
//

//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [        0 vvv                                      ]       
//          [         1               0          ]                 [ 0  ]                                                                 
//              {   isStr:  },  {   isArr:  }                        {}                   
//                  [ 0  ]          [ 0  ]                                                                    
//                    {}              {}                                                           
//

//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [         0                                         ]       
//          [         1               0          ]                 [ vvv]                                                                 
//              {   isStr:  },  {   isArr:  }                        {}                   
//                  [ 0  ]          [ 0  ]                                                                    
//                    {}              {}                                                           
//

//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [         0                                         ]       
//          [         1               0          ]                 [    ]                                                                 
//              {   isStr:  },  {   isArr:  }                           <---delete                                                
//                  [ 0  ]          [ 0  ]                                                                    
//                    {}              {}                                                           
//

//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [                                                   ]       
//          [         1               0          ]                                                              <---delete                                
//              {   isStr:  },  {   isArr:  }                                                                           
//                  [ 0  ]          [ 0  ]                                                                    
//                    {}              {}                                                           
//

//                             0                                                   1                                                                  
//  [                                                                                                           ]   
//      {                   isStr:                  }                                                           <---delete
//          [         1               0          ]                                                                                      
//              {   isStr:  },  {   isArr:  }                                                                           
//                  [ 0  ]          [ 0  ]                                                                    
//                    {}              {}                                                           
//


//Basically, just repeat the same operations on this one
//                             0                                                   1                                                                  
//  [                                                                                                           ]   
//      {                   isStr:                  }                                                        
//          [         1               0          ]                                                                                      
//              {   isStr:  },  {   isArr:  }                                                                           
//                  [ 0  ]          [ 0  ]                                                                    
//                    {}              {}                                                           
//