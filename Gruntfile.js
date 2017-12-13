module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    builddir: '.',
    buildtheme: '',
    banner: '/*!\n' +
            ' * <%= pkg.name %> v<%= pkg.version %>\n' +
            ' * Homepage: <%= pkg.homepage %>\n' +
            ' * Copyright 2012-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license %>\n' +
            ' * Based on Bootstrap\n' +
            '*/\n',
    swatch: {
      amelia:{
        variations:{
          tiny: '@font-size-base: 8px;',
          small: '@font-size-base: 10px;',
          normal: '@font-size-base: 12px;'
        }
      },
      cerulean:{
        variations:{
          tiny: '@font-size-base: 8px;',
          small: '@font-size-base: 10px;',
          normal: '@font-size-base: 12px;'
        }
      },
      cosmo:{
        variations:{
          tiny: '@font-size-base: 9px;',
          small: '@font-size-base: 11px;',
          normal: '@font-size-base: 13px;'
        }
      },
      custom:{
        variations:{
          tiny: '@font-size-base: 8px;',
          small: '@font-size-base: 10px;',
          normal: '@font-size-base: 12px;'
        }
      },
      cyborg:{
        variations:{
          tiny: '@font-size-base: 8px;',
          small: '@font-size-base: 10px;',
          normal: '@font-size-base: 12px;'
        }
      },
      darkly:{
        variations:{
          tiny: '@font-size-base: 9px;',
          small: '@font-size-base: 11px;',
          normal: '@font-size-base: 13px;'
        }
      },
      default:{
        variations:{
          tiny: '@font-size-base: 8px;',
          small: '@font-size-base: 10px;',
          normal: '@font-size-base: 12px;'
        }
      },
      flatly:{
        variations:{
          tiny: '@font-size-base: 9px;',
          small: '@font-size-base: 11px;',
          normal: '@font-size-base: 13px;'
        }
      },
      journal:{
        variations:{
          tiny: '@font-size-base: 9px;',
          small: '@font-size-base: 11px;',
          normal: '@font-size-base: 13px;'
        }
      },
      lumen:{
        variations:{
          tiny: '@font-size-base: 8px;',
          small: '@font-size-base: 10px;',
          normal: '@font-size-base: 12px;'
        }
      },
      paper:{
        variations:{
          tiny: '@font-size-base: 9px;',
          small: '@font-size-base: 11px;',
          normal: '@font-size-base: 13px;'
        }
      },
      readable:{
        variations:{
          tiny: '@font-size-base: 8px;',
          small: '@font-size-base: 10px;',
          normal: '@font-size-base: 12px;'
        }
      },
      sandstone:{
        variations:{
          tiny: '@font-size-base: 8px;',
          small: '@font-size-base: 10px;',
          normal: '@font-size-base: 12px;'
        }
      },
      simplex:{
        variations:{
          tiny: '@font-size-base: 8px;',
          small: '@font-size-base: 10px;',
          normal: '@font-size-base: 12px;'
        }
      },
      slate:{
        variations:{
          tiny: '@font-size-base: 8px;',
          small: '@font-size-base: 10px;',
          normal: '@font-size-base: 12px;'
        }
      },
      spacelab:{
        variations:{
          tiny: '@font-size-base: 8px;',
          small: '@font-size-base: 10px;',
          normal: '@font-size-base: 12px;'
        }
      },
      superhero:{
        variations:{
          tiny: '@font-size-base: 9px;',
          small: '@font-size-base: 11px;',
          normal: '@font-size-base: 13px;'
        }
      },
      united:{
        variations:{
          tiny: '@font-size-base: 8px;',
          small: '@font-size-base: 10px;',
          normal: '@font-size-base: 12px;'
        }
      },
      yeti:{
        variations:{
          tiny: '@font-size-base: 9px;',
          small: '@font-size-base: 11px;',
          normal: '@font-size-base: 13px;'
        }
      },
      hacker:{
        variations:{
          tiny: '@font-size-base: 8px;',
          small: '@font-size-base: 10px;',
          normal: '@font-size-base: 12px;'
        }
      }
    },
    clean: {
      build: {
        src: ['*/build.less', '!global/build.less']
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: false,
        footer: ""
      },
      dist: {
        src: [],
        dest: ''
      }
    },
    less: {
      dist: {
        options: {
          compress: false
        },
        files: {}
      }
    },
    watch: {
      files: ['*/variables.less', '*/bootswatch.less', '*/index.html'],
      tasks: 'build',
      options: {
        livereload: true,
        nospawn: true
      }
    },
    connect: {
      base: {
        options: {
          port: 3000,
          livereload: true,
          open: true
        }
      },
      keepalive: {
        options: {
          port: 3000,
          livereload: true,
          keepalive: true,
          open: true
        }
      }
    }
  });

  grunt.registerTask('none', function() {});

  grunt.registerTask('build', 'build a regular theme', function(theme, compress) {
    var variation = ""
    var compress = compress == undefined ? true : compress;

    var concatSrc;
    var concatDest;
    var lessDest;
    var lessSrc;
    var files = {};
    var dist = {};
    if (theme.indexOf("_" !== -1)){
      chunks = theme.split("_");
      theme = chunks[0];
      variation = (chunks[1] == undefined) ? "normal": chunks[1];
    }
    concatSrc = 'global/build.less';
    concatDest = theme + '/build.'+variation+'.less';
    lessDest = '<%=builddir%>/dist/bootstrap.'+theme+"."+variation+'.css';
    lessSrc = [ theme + '/' + 'build.'+variation+'.less' ];

    dist = {src: concatSrc, dest: concatDest};
    grunt.config('concat.dist', dist);
    files = {}; files[lessDest] = lessSrc;
    grunt.config('less.dist.files', files);
    grunt.config('less.dist.options.compress', false);

    if(undefined !== grunt.config.get('variations')){
      grunt.config('concat.options.footer', grunt.config.get('variations')[variation]);
    }

    grunt.task.run(['concat', 'less:dist', 'clean:build',
      compress ? 'compress:'+lessDest+':'+'<%=builddir%>/dist/bootstrap.'+theme+"."+variation+'.min.css':'none']);
  });

  grunt.registerTask('compress', 'compress a generic css', function(fileSrc, fileDst) {
    var files = {}; files[fileDst] = fileSrc;
    grunt.log.writeln('compressing file ' + fileSrc);

    grunt.config('less.dist.files', files);
    grunt.config('less.dist.options.compress', true);
    grunt.task.run(['less:dist']);
  });

  grunt.registerMultiTask('swatch', 'build a theme', function() {
    var t = this.target;
    var variations = this.data.variations;
    grunt.config.set("variations",variations);
    if (variations !== null && variations !== undefined){
      for(var variation in variations){
        grunt.task.run('build:'+t+"_"+variation);
      }
    }else{
      grunt.task.run('build:'+t);
    }
  });

  grunt.event.on('watch', function(action, filepath) {
    var path = require('path');
    var theme = path.dirname(filepath);
    grunt.config('buildtheme', theme);
  });

  grunt.registerTask('server', 'connect:keepalive')

  grunt.registerTask('default', ['connect:base', 'watch']);
};
