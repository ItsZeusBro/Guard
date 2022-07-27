# Guard
Guard Schema maps helper functions to type checking functions with an orientation to variadic interfaces contexts.

This allows programmers to create general namespaces for their functions (search(), sort(), map(), whatever()), as opposed to writing a huge set of exposed api functions that deal with the same variables and slightly different function names that are a derivitive of a more general function. It keeps api's short but sweet and subtle.

Guard dictates the way you write functions all the way to your low level functions. It keeps you thinking about type checking and generalization of your functions by emphasiszing the use of variadic contexts.

### Future Premium Services
Eventually we want a semantics engine that interprets user inputs to your api's to further sanitize inputs semantically to make sure your inputs remain sanitary. This also makes your api's "sticky" in that general intention can be expressed in your general functions and is routed towards the proper functions in your backend.

## An example test schema:
We use arrays because strings can have their own schema and complex types. You would want to check complex string types before checking if it were a mere string type


	const SCHEMA=
	[
	  {
	    isEncArr: [
	      {
		isEnc: [
		  {
		    isArr: [
		      { '~DEFAULT~': 'utf8', isEnc: 'wackyFunction1' }
		    ]
		  }
		]
	      },
	      {
		isStrArr: [
		  {
		    '~DEFAULT~': [ 'utf8' ],
		    isEncArr: [
		      {
			'~DEFAULT~': 'Wm',
			isStr: 'wackyFunction2'
		      },
		      {
			'~DEFAULT~': [ { '6K': { hDz: undefined } }, undefined ],
			isObjArr: 'wackyFunction3'
		      }
		    ]
		  },
		  {
		    isStrArr: [
		      {
			'~DEFAULT~': [
			  { hLM: undefined },
			  { HMi: { FpT: undefined } },
			  undefined
			],
			isObjArr: 'wackyFunction4'
		      },
		      {
			'~DEFAULT~': [ 'utf8' ],
			isEncArr: 'wackyFunction5'
		      }
		    ]
		  }
		]
	      },
	      {
		'~DEFAULT~': { G: { S5: { '': undefined } } },
		isObj: [
		  {
		    isEnc: [ { '~DEFAULT~': [], isArr: 'wackyFunction6' } ]
		  }
		]
	      }
	    ]
	  },
	  {
	    isStr: [
	      {
		'~DEFAULT~': [],
		isIntArr: [
		  {
		    isArr: [
		      {
			'~DEFAULT~': [ 0, 2, 3 ],
			isIntArr: 'wackyFunction7'
		      }
		    ]
		  }
		]
	      }
	    ]
	  },
	  {
	    '~DEFAULT~': [],
	    isArr: [
	      {
		'~DEFAULT~': [
		  { c: undefined },
		  { iDI: { '': { y: undefined } } }
		],
		isObjArr: [
		  {
		    '~DEFAULT~': [ 2 ],
		    isIntArr: [
		      {
			'~DEFAULT~': [ 'AQo' ],
			isStrArr: 'wackyFunction8'
		      },
		      {
			'~DEFAULT~': { p0: undefined },
			isObj: 'wackyFunction9'
		      }
		    ]
		  },
		  {
		    isIntArr: [ { '~DEFAULT~': 2, isInt: 'wackyFunction10' } ]
		  }
		]
	      },
	      {
		isStr: [
		  {
		    '~DEFAULT~': '',
		    isStr: [
		      {
			'~DEFAULT~': [ 'Uvo', 'evH' ],
			isStrArr: 'wackyFunction11'
		      }
		    ]
		  }
		]
	      }
	    ]
	  }
	]
