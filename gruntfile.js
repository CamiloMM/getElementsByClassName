module.exports = function(grunt) {
	
	var path = require('path');
	
	grunt.initConfig({
		closurecompiler: {
			compile: {
				files: {
					'./build/polyfill.min.js': ['./build/polyfill.js']
				},
				options: {
					'compilation_level': 'ADVANCED_OPTIMIZATIONS',
					'output_wrapper': '(function(){%output%}());'
				}
			}
		},
		'string-replace': {
			cleanNewlines: {
				files: {
					'./build/polyfill.min.js': './build/polyfill.min.js'
				},
				options: {
					replacements: [
						{
							pattern: /\n/gm,
							replacement: ''
						}
					]
				}
			}
		},
		concat: {
			polyfill: {
				src: ['./src/polyfill.js'],
				dest: './build/polyfill.js'
			},
			tests: {
				src: [
					'./src/tests/polyfill-module.js',
					'./src/tests/polyfill/*.js'
				],
				dest: './tests/tests.js'
			}
		},
		connect: {
			root: {
				options: {
					port: 7357, // "TEST"
					base: '.'
				}
			}
		},
		qunit: {
			online: {
				options: {
					urls: [
						'http://localhost:7357/tests/index.html'
					]
				}
			},
			offline: {
				options: {
					urls: [
						'./tests/index.html'
					]
				}
			}
		},
		karma: {
			test: {
				configFile: path.resolve(__dirname, 'karma.conf.js'),
				autoWatch: false,
				singleRun: true
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-closurecompiler');
	grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-karma-0.9.1');
	
	grunt.registerTask('build', ['concat:polyfill', 'concat:tests']);
	grunt.registerTask('compile', ['closurecompiler:compile', 'string-replace:cleanNewlines']);
	grunt.registerTask('onlineTest', ['connect:root', 'qunit:online']);
	grunt.registerTask('offlineTest', ['qunit:offline']);
	grunt.registerTask('quickTest', ['offlineTest']);
	grunt.registerTask('realTest', ['karma:test']);
	grunt.registerTask('test', ['realTest']);
	
	grunt.registerTask('default', ['build', 'compile', 'quickTest']);
	
};
