module.exports = function(grunt) {
	
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
		}		
	});
	
	grunt.loadNpmTasks('grunt-closurecompiler');
	grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	
	grunt.registerTask('build', ['concat:polyfill']);
	grunt.registerTask('compile', ['closurecompiler:compile', 'string-replace:cleanNewlines']);
	grunt.registerTask('onlineTest', ['connect:root', 'qunit:online']);
	grunt.registerTask('offlineTest', ['qunit:offline']);
	grunt.registerTask('test', ['offlineTest']);
	
	grunt.registerTask('default', ['build', 'compile', 'test']);
	
};
