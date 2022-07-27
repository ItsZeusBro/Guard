# Guard
Guard Schema maps helper functions to type checking functions with an orientation to variadic interfaces contexts.

This allows programmers to create general namespaces for their functions (search(), sort(), map(), whatever()), as opposed to writing a huge set of exposed api functions that deal with the same variables and slightly different function names that are a derivitive of a more general function. It keeps api name spaces clean, purposeful, general, and memorizable.

Guard dictates the way you write functions all the way to your low level functions. It keeps you thinking about type checking and generalization of your functions by emphasiszing the use of variadic contexts. Switching context is easy, and each low-level function has a very well defined wordy purpose.

Furthermore, you can bypass some of the limitations of languages when it comes to how paramters enable default values and where. Anything can have a default value when you use schema and variadic parameters as opposed to language function base interfaces

### Future Premium Services
Eventually we want a semantics engine that interprets user inputs to your api's to further sanitize inputs semantically to make sure your inputs remain sanitary. This also makes your api's "sticky" in that general intention can be expressed in your general functions and is routed towards the proper functions in your backend.

### An example of generated test schema with a few modifications for the terminal function names:


	const SCHEMA=
	[
	  {
	    'isEncArr': [
	      {
		'isEnc': [
		  {
		    'isArr': [
		      { '~DEFAULT~': 'utf8', 'isEnc': 'wackyFunction1' }
		    ]
		  }
		]
	      },
	      {
		'isStrArr': [
		  {
		    '~DEFAULT~': [ 'utf8' ],
		    'isEncArr': [
		      {
			'~DEFAULT~': 'Wm',
			'isStr': 'wackyFunction2'
		      },
		      {
			'~DEFAULT~': [ { '6K': { 'hDz': undefined } }, undefined ],
			'isObjArr': 'wackyFunction3'
		      }
		    ]
		  },
		  {
		    'isStrArr': [
		      {
			'~DEFAULT~': [
			  { 'hLM': undefined },
			  { 'HMi': { 'FpT': undefined } },
			  undefined
			],
			'isObjArr': 'wackyFunction4'
		      },
		      {
			'~DEFAULT~': [ 'utf8' ],
			'isEncArr': 'wackyFunction5'
		      }
		    ]
		  }
		]
	      },
	      {
		'~DEFAULT~': { 'G': { S5: { 'i': undefined } } },
		'isObj': [
		  {
		    'isEnc': [ { '~DEFAULT~': [], 'isArr': 'wackyFunction6' } ]
		  }
		]
	      }
	    ]
	  },
	  {
	    'isStr': [
	      {
		'~DEFAULT~': [],
		'isIntArr': [
		  {
		    'isArr': [
		      {
			'~DEFAULT~': [ 0, 2, 3 ],
			'isIntArr': 'wackyFunction7'
		      }
		    ]
		  }
		]
	      }
	    ]
	  },
	  {
	    '~DEFAULT~': [],
	    'isArr': [
	      {
		'~DEFAULT~': [
		  { 'c': undefined },
		  { 'iDI': { 'o': { 'y': undefined } } }
		],
		'isObjArr': [
		  {
		    '~DEFAULT~': [ 2 ],
		    'isIntArr': [
		      {
			'~DEFAULT~': [ 'AQo' ],
			'isStrArr': 'wackyFunction8'
		      },
		      {
			'~DEFAULT~': { 'p0': undefined },
			'isObj': 'wackyFunction9'
		      }
		    ]
		  },
		  {
		    'isIntArr': [ { '~DEFAULT~': 2, 'isInt': 'wackyFunction10' } ]
		  }
		]
	      },
	      {
		'isStr': [
		  {
		    '~DEFAULT~': '',
		    'isStr': [
		      {
			'~DEFAULT~': [ 'Uvo', 'evH' ],
			'isStrArr': 'wackyFunction11'
		      }
		    ]
		  }
		]
	      }
	    ]
	  }
	]
