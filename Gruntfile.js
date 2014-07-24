module.exports = function(grunt) {
    "use strict";

    var sites = require('./package.json').sites,
        copy = {},
        concat = {},
        jshint = {},
        mountee = {},
        sass = {},
        uglify = {},
        watch = {};
    var active_site = 'default_site';

    sites.forEach(function(site){
        // Set the document root for each site
        var docroot = site.short_name === 'default_site' ? 'htdocs' : 'htdocs-' + site.short_name;
        var dist = 'dist/' + site.short_name;
        if (site.active) {
            active_site = site.short_name;
        }
        grunt.log.verbose.writeln("docroot: " + docroot);
        grunt.log.verbose.writeln("dist: " + dist);
        // ==========
        // = Concat =
        // ==========
        concat[site.short_name] = {
            options: {
                separator: ';'
            },
            src: [
                  docroot + '/js/lib/!(jquery-|jquery.min.js)*.js',
                  docroot +'/js/plugins.js'],
            dest: docroot + '/js/source.dev.js'
        };

        // ========
        // = Copy =
        // ========
        copy[site.short_name] = {
            files: [{
                    dest: dist + '/mountee/js/source-min.js.js',
                    src: dist + '/assets/js/source.min.js'},
                {
                    dest: dist + '/mountee/js/source.js.js',
                    src: dist + '/assets/js/source.js'},
                {
                    dest: dist + '/assets/js/main.js',
                    src: docroot + '/js/main.js'},
                {
                    dest: dist + '/mountee/js/main.js.js',
                    src: docroot + '/js/main.js'},
                {
                    dest: dist + '/assets/css/styles.css',
                    src: docroot + '/css/styles.css'},
                {
                    dest: dist + '/assets/css/styles-desktop.css',
                    src: docroot + '/css/styles-desktop.css'},
                {
                    dest: dist + '/mountee/styles/index.css.css',
                    src: dist + '/assets/css/styles.css'},
                {
                    dest: dist + '/mountee/styles/index-desktop.css.css',
                    src: dist + '/assets/css/styles-desktop.css'
                }]
        };

        // The lint task will run the build configuration and the application
        // JavaScript through JSHint and report any errors.  You can change the
        // options for this task, by reading this:
        // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md

        // Set our jshint options here:
        // http://www.jshint.com/options/
        jshint[site.short_name] = {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: false,
                    bQuery: false,
                    _gaq: false,
                    google: false,
                    console: false,
                    FB: false,
                    _: false
                }
            },
            src: [docroot + '/js/main.js']
        };
        // ===========
        // = Mountee =
        // ===========
        mountee[site.short_name] = {
                src: 'templates/' + site.short_name,
                dest:  site.short_name + '/mountee',
                volume: site.mountee_volume
        };

        // =============
        // = Sass Task =
        // =============
        sass[site.short_name + '_dev'] = {
            options: {
                style: 'expanded',
                compass: 1,
                lineNumbers: 1
            },
            files: [{
                        src: [docroot + '/scss/styles.scss'],
                        dest: docroot + '/css/styles.dev.css'
                    },
                    {
                        src: [docroot + '/scss/styles-desktop.scss'],
                        dest: docroot + '/css/styles-desktop.dev.css'
                    }]
        };
        sass[site.short_name] = {
            options: {
                style: 'compressed',
                compass: 1,
                debugInfo: false,
                lineNumbers: false
            },
            files: [{
                        src: [docroot + '/scss/styles.scss'],
                        dest: docroot + '/css/styles.css'
                    },
                    {
                        src: [docroot + '/scss/styles-desktop.scss'],
                        dest: docroot + '/css/styles-desktop.css'
                    }]
        };

        // ==========
        // = Uglify =
        // ==========
        uglify[site.short_name] = {
            options: {
              banner: '/*! ' + site.name +
                '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            src: [docroot + '/js/source.dev.js'],
            dest: dist + '/assets/js/source.min.js'
        };

        // =========
        // = Watch =
        // =========
        watch[site.short_name + '_all'] = {
            files: [docroot + '/scss/*.scss', docroot + '/js/*.js'],
            tasks: ['common:' + site.short_name]
        };

        watch[site.short_name + '_sass'] = {
            files: [docroot + '/scss/*.scss'],
            tasks: ['sass:' + site.short_name + '_dev']
        };
    });


    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            clean: ['dist/*']
        },
        concat: concat,
        copy: copy,
        mountee: mountee,
        jshint: jshint,
        sass: sass,
        uglify: uglify,
        watch: watch

    });

    // Load the grunt plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadTasks('grunt');

    // Default task(s).
    // grunt.registerTask('release', ['common', 'sass:dist', 'copy', 'mountee:site1']);
    // grunt.registerTask('deploy', ['common', 'sass:dist', 'copy', 'mountee:site1:deploy']);

    grunt.registerTask('common', 'Common tasks.', function(site){
        site = site || active_site;
        grunt.log.verbose.writeln('Running common tasks for ' + site);
        grunt.task.run(['clean',
                        'jshint:' + site,
                        'concat:' + site,
                        'uglify:' + site
        ]);
    });

    grunt.registerTask('default', 'Tasks for local dev', function(site){
        site = site || active_site;
        grunt.log.verbose.writeln('Running dev tasks for ' + site);
        grunt.task.run(['common:' + site,
                        'sass:' + site + '_dev',
                        'watch:' + site + '_sass'
        ]);
    });

    grunt.registerTask('build', 'Build tasks, no deploy', function(site){
        site = site || active_site;
        grunt.log.verbose.writeln('Running build tasks for ' + site);
        grunt.task.run(['common:' + site,
                        'sass:' + site,
                        'copy:' + site,
                        'mountee:' + site]);
    });
    grunt.registerTask('release', 'This task is deprecated! Use grunt:build', function(site){
        grunt.log.error('grunt:release is deprecated! use grunt:build');

    });
    grunt.registerTask('deploy', 'Build, then deploy templates.', function(site){
        site = site || active_site;
        grunt.log.verbose.writeln('Running build tasks for ' + site);
        grunt.task.run(['common:' + site,
                        'sass:' + site,
                        'copy:' + site]);
        grunt.log.verbose.writeln('Deploying templates for ' + site);
        grunt.task.run(['mountee:' + site + ":deploy"]);
    });
};