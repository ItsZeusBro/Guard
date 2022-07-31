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
//  [                         1                                                0                                    ]     <---sentinel recognition
//      {                   isStr:                  },  {                    isArr:                             }
//          [         1                0         ]           [        1                  0                  ]                  
//              {   isStr:  },  {   isArr:  }                   {   isStr:  },    {   isArr:,   isInt: }                     
//                  [  0 ]          [  0 ]                          [  0 ]            [  0 ]    [  0 ]                        
//                    {}              {}                              {}                {}        {}                       
//
//  

//  Sentinel grabs the first item in an array and then sees an object with only one key
//  [                         1                                                0                               vvv  ]   
//      {                   isStr:                  },  {                    isArr:                              }  <---update sentinel value
//          [         1                0         ]           [        1                  0                   ]                  
//              {   isStr:  },  {   isArr:  }                   {   isStr:  },    {   isArr:,   isInt: }  
//                  [  0 ]          [  0 ]                          [  0 ]            [  0 ]    [  0 ]                     
//                    {}              {}                              {}                {}        {}                        
//

//  Sentinel always 
//  [                         1                                                0                                    ]   
//      {                   isStr:                  },                                                              <--sentinel consumes key value, deletes object and collapses structure
//          [         1                0         ]           [        1                  0                    ]                  
//              {   isStr:  },  {   isArr:  }                   {   isStr:  },    {   isArr:,   isInt: }  
//                  [  0 ]          [  0 ]                          [  0 ]            [  0 ]    [  0 ]                     
//                    {}              {}                              {}                {}        {}                        
//

//                             1                                               0                                                                
//  [                                                                                                               ]   
//      {                   isStr:                  },      [         1                 0                      ]    
//          [         1               0          ]              {   isStr:  },    {   isArr:,   isInt:   }          ^    
//              {   isStr:  },  {   isArr:  }                       [  0 ]            [  0 ]    [  0 ]              | collapse
//                  [  0 ]          [  0 ]                            {}                {}        {}                |
//                    {}              {}                                                           
//

//                             1                                               0                                                                
//  [                                                                                                         vvv   ]   
//      {                   isStr:                  },      [         1                 0                      ]    <---sentinel recognition
//          [         1               0          ]              {   isStr:  },    {   isArr:,   isInt:   }              
//              {   isStr:  },  {   isArr:  }                       [  0 ]            [  0 ]    [  0 ]             
//                  [  0 ]          [  0 ]                            {}                {}        {}               
//                    {}              {}                                                           
//

//                             1                                               0                                                                
//  [                                                                                                               ]   
//      {                   isStr:                  },      [         1                 0        vvv           ]     <---update sentinel value  
//          [         1               0          ]              {   isStr:  },    {   isArr:,   isInt:   }              
//              {   isStr:  },  {   isArr:  }                       [  0 ]            [  0 ]    [  0 ]             
//                  [  0 ]          [  0 ]                            {}                {}        {}               
//                    {}              {}                                                           
//



//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [          1                 0                   ]       
//          [         1               0          ]               {   isStr:  },    {   isArr:           }    <---sentinel consumes key, deletes it from object    
//              {   isStr:  },  {   isArr:  }                       [  0 ]            [  0 ]    [  0 ]                
//                  [  0 ]          [  0 ]                            {}                {}        {}                        
//                    {}              {}                                                           
//

//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [          1                 0                   ]       
//          [         1               0          ]               {   isStr:  },    {   isArr:       vvv }        
//              {   isStr:  },  {   isArr:  }                       [  0 ]            [  0 ]    [    ]            <---sentinel recognition    
//                  [  0 ]          [  0 ]                            {}                {}        {}                        
//                    {}              {}                                                           
//




//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [          1                 0                   ]       
//          [         1               0          ]               {   isStr:  },    {   isArr:           }        
//              {   isStr:  },  {   isArr:  }                       [  0 ]            [  0 ]    [ vvv]            <---update sentinel value    
//                  [  0 ]          [  0 ]                            {}                {}        {}                        
//                    {}              {}                                                           
//


//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [          1                                     ]       
//          [         1               0          ]               {   isStr:  },    {   isArr:             }        
//              {   isStr:  },  {   isArr:  }                       [  0 ]            [  0 ]     [    ]                         
//                  [  0 ]          [  0 ]                            {}                {}             <--- delete                  
//                    {}              {}                                                           
//

//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [          1                                         ]       
//          [         1               0          ]               {   isStr:  },    {   isArr:             }        
//              {   isStr:  },  {   isArr:  }                       [  0 ]            [  0 ]              <--- delete                     
//                  [  0 ]          [  0 ]                            {}                {}                               
//                    {}              {}                                                           
//


//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [          1                                        ]       
//          [         1               0          ]               {   isStr:  },     {   isArr:             }    <---nothing to collapse
//              {   isStr:  },  {   isArr:  }                       [  0 ]              [ 0 ]                          
//                  [  0 ]          [  0 ]                            {}                 {}                               
//                    {}              {}                                                           
//



//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [         1                   vvv                   ]    <---sentinel recognition   
//          [         1               0         ]               {   isStr:  },        [ 0  ]                           
//              {   isStr:  },  {   isArr:  }                       [  0 ]              {}               
//                  [  0 ]          [  0 ]                            {}                                        
//                    {}              {}                                                           
//

//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [         1                 0                       ]       
//          [                                   ]               {   isStr:  },        [ vvv]                    <---update sentinel value
//              {   isStr:  },  {   isArr:  }                       [  0 ]              {}               
//                  [ 0  ]          [  0 ]                            {}                                        
//                    {}              {}                                                           
//

//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [         1                 0                       ]       
//          [         1               0         ]               {   isStr:  },        [    ]                      
//              {   isStr:  },  {   isArr:  }                       [  0 ]                                      <---delete empty object (nothing for seninel to hold onto)
//                  [ 0  ]          [ 0  ]                            {}                                        
//                    {}              {}                                                           
//

//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [         1                                         ]       
//          [        1                0         ]               {   isStr:  }                                   <---delete empty array        
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
//      {                   isStr:                  },      [         0     vvv                                 ]<---update sentinel value       
//          [         1               0          ]               {   isStr:  }                                   
//              {   isStr:  },  {   isArr:  }                       [ 0  ]                    
//                  [ 0  ]          [ 0  ]                            {}                                        
//                    {}              {}                                                           
//

//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [         0                                        ]       
//          [         1               0          ]                                                              <---delete (sentinel holds array of object)
//              {   isStr:  },  {   isArr:  }                       [ 0  ]                    
//                  [ 0  ]          [ 0  ]                            {}                                        
//                    {}              {}                                                           
//




//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [        0                                          ]       
//          [         1               0          ]                 [ 0  ]                                       <---collapse empty array position with sentinel value                                  
//              {   isStr:  },  {   isArr:  }                        {}                   
//                  [ 0  ]          [ 0  ]                                                                    
//                    {}              {}                                                           
//

//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [        0 vvv                                      ]       
//          [         1               0          ]                 [ 0  ]                                       <---sentinel recognition                         
//              {   isStr:  },  {   isArr:  }                        {}                   
//                  [ 0  ]          [ 0  ]                                                                    
//                    {}              {}                                                           
//

//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [         0                                         ]       
//          [         1               0          ]                 [ vvv]                                       <---update sentinel value                          
//              {   isStr:  },  {   isArr:  }                        {}                   
//                  [ 0  ]          [ 0  ]                                                                    
//                    {}              {}                                                           
//

//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [         0                                         ]       
//          [         1               0          ]                 [    ]                                                                 
//              {   isStr:  },  {   isArr:  }                           <---delete empty object                                              
//                  [ 0  ]          [ 0  ]                                                                    
//                    {}              {}                                                           
//

//                             1                                                   0                                                                  
//  [                                                                                                               ]   
//      {                   isStr:                  },      [                                                   ]       
//          [         1               0          ]                                                              <---delete empty array                                
//              {   isStr:  },  {   isArr:  }                                                                           
//                  [ 0  ]          [ 0  ]                                                                    
//                    {}              {}                                                           
//

//                             0                                                   1                                                                  
//  [                                                                                                           ]   
//      {                   isStr:                  }                                                           <---delete empty array
//          [         1               0          ]                                                                                      
//              {   isStr:  },  {   isArr:  }                                                                           
//                  [ 0  ]          [ 0  ]                                                                    
//                    {}              {}                                                           
//


//Basically, just repeat the same operations on this one
//                             0                                                   1                                                                  
//  [                                              vvv                                                             ]   
//      {                   isStr:                  }                                                           <---update sentinel value
//          [         1               0          ]                                                                                      
//              {   isStr:  },  {   isArr:  }                                                                           
//                  [ 0  ]          [ 0  ]                                                                    
//                    {}              {}                                                           
//