module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    builddir: '.',
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
          xSmall: '@font-size-base: 10px;',
          small: '@font-size-base: 12px;',
          normal: '@font-size-base: 14px;'
        }
      },
      cerulean:{
        variations:{
          xSmall: '@font-size-base: 10px;',
          small: '@font-size-base: 12px;',
          normal: '@font-size-base: 14px;'
        }
      },
      cosmo:{
        variations:{
          xSmall: '@font-size-base: 11px;',
          small: '@font-size-base: 13px;',
          normal: '@font-size-base: 15px;'
        }
      },
      custom:{
        variations:{
          xSmall: '@font-size-base: 10px;',
          small: '@font-size-base: 12px;',
          normal: '@font-size-base: 14px;'
        }
      },
      cyborg:{
        variations:{
          xSmall: '@font-size-base: 10px;',
          small: '@font-size-base: 12px;',
          normal: '@font-size-base: 14px;'
        }
      },
      darkly:{
        variations:{
          xSmall: '@font-size-base: 11px;',
          small: '@font-size-base: 13px;',
          normal: '@font-size-base: 15px;'
        }
      },
      default:{
        variations:{
          xSmall: '@font-size-base: 10px;',
          small: '@font-size-base: 12px;',
          normal: '@font-size-base: 14px;'
        }
      },
      flatly:{
        variations:{
          xSmall: '@font-size-base: 11px;',
          small: '@font-size-base: 13px;',
          normal: '@font-size-base: 15px;'
        }
      },
      journal:{
        variations:{
          xSmall: '@font-size-base: 11px;',
          small: '@font-size-base: 13px;',
          normal: '@font-size-base: 15px;'
        }
      },
      lumen:{
        variations:{
          xSmall: '@font-size-base: 10px;',
          small: '@font-size-base: 12px;',
          normal: '@font-size-base: 14px;'
        }
      },
      readable:{
        variations:{
          xSmall: '@font-size-base: 10px;',
          small: '@font-size-base: 12px;',
          normal: '@font-size-base: 14px;'
        }
      },
      simplex:{
        variations:{
          xSmall: '@font-size-base: 10px;',
          small: '@font-size-base: 12px;',
          normal: '@font-size-base: 14px;'
        }
      },
      slate:{
        variations:{
          xSmall: '@font-size-base: 10px;',
          small: '@font-size-base: 12px;',
          normal: '@font-size-base: 14px;'
        }
      },
      spacelab:{
        variations:{
          xSmall: '@font-size-base: 10px;',
          small: '@font-size-base: 12px;',
          normal: '@font-size-base: 14px;'
        }
      },
      superhero:{
        variations:{
          xSmall: '@font-size-base: 11px;',
          small: '@font-size-base: 13px;',
          normal: '@font-size-base: 15px;'
        }
      },
      united:{
        variations:{
          xSmall: '@font-size-base: 10px;',
          small: '@font-size-base: 12px;',
          normal: '@font-size-base: 14px;'
        }
      },
      yeti:{
        variations:{
          xSmall: '@font-size-base: 11px;',
          small: '@font-size-base: 13px;',
          normal: '@font-size-base: 15px;'
        }
      }
    },
    clean: {
      preBuild: {
        src: ['dist']
      },
      build: {
        src: ['*/build*.less', '!global/build.less']
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

  grunt.registerTask('default', 'build a theme', function() {
    grunt.task.run(['clean:preBuild','swatch']);
  });
};
