# Guard

## Main Objectives and Fundamental Concepts:
1. Function contexts should be defined in terms of their interface
2. Interfaces should be defined minimalistically to avoid future waste of test cases created for that interface
3. Test Schema should be able to be built from Interface Schema (Guard Schema), however manual expected output should be manually inserted into the schema
4. Statistically we should be able to understand the ranges of the data types in a function interface that result in error most frequently and continuously improve our code qualitatively overtime in a way that doesnt go away.

Guard Schema maps helper functions to type checking functions with an orientation to variadic interfaces contexts.

It solves quite a few problems that are not obvious (I believe its because the variadic context switching functional paradigm is superior design, but others might disagree). One such problem is keeping function namespaces small, easy to document, and easy to remember, and therefore more likely to be reused and iterated upon. You can search documentation for a broad term like search, or sort, or whatever, and you will always find the part of the documentation your looking for without having to remember some really weird long function name.

What you end up with is a more general set of functions that you are reasoning about from a very high level based on the input context. It ends up more and more like natural language overtime, where "interpretations" become possible for general functions as opposed to exposing a very specific tool for a very specific job to the user.

Guard dictates the way you write functions all the way down to your low level functions, but does not force your hand on those functions. It keeps you thinking about your functions in a general way by emphasiszing the use of variadic contexts. Switching context is easy with guard, and each low-level function has a very well defined wordy purpose that is mapped in schema to a general function name and context map.

Furthermore, this enables other features. For example you can bypass some of the limitations of languages when it comes to how paramters enable default values and where. Anything can have a default value when you use schema and variadic parameters as opposed to language function base interfaces


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
		    'isEnc': [ { 'isArr': 'wackyFunction6' } ]
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
