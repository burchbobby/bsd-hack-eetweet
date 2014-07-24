/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, jquery:true, node:true, indent:2, maxerr:50 */

/*
 * Grunt Task File
 * ---------------
 *
 * Task: Mounteee
 * Description: Take an EE Template as files directory, and save it into mountee format
 * Dependencies:
 *
 */

// == syntax
// mountee: {
//   site1: {
//     src: 'templates/default_site',
//     dest: 'mountee/default_site'
//     volume: 'client.bluestatedigital.com default'
//   }
// }
//
module.exports = function(grunt) {
  "use strict";
  // External libs.

  var crypto = require('crypto');
  
  //Do not copy these files from /templates to /dist/mountee:
  var skip = /DS_Store|sass_cache|low_vars|styles\.group/; 

  
  // ==========================================================================
  // HELPERS
  // ==========================================================================
  
  var mountify = function(file, src) {

    grunt.log.verbose.write('Found: ' + file);

    // stip .group from template name
    file = file.replace('.group','');

    // .html and .feed need to change for mountee
    file = file.replace('.html', '.php');
    file = file.replace('.feed', '.rss');

    // get rid of the templates/site_name/
    file = file.replace(src + '/', '');

    grunt.log.verbose.writeln('; Changed it to: ' + file);
    return file;

  };

/**
 * [mounteeWrite does too much:
 *  gets the list of local templates
 *  gets the list of Mountee templates
 *  determines whether the local template should update Mountee
 *  writes the template
 * @param  {string} destpath - the 'dist/short_name/mountee directory'
 * @param  {string} volume - the Mountee volume
 * @param  {boolean} deploy - whether to actually write the files
 * @return {undefined}
 */
  var mounteeWrite = function(destpath, volume, deploy, task) {

    var dist = grunt.file.expand({dot:true},destpath + '**');
    var mountee = grunt.file.expand({dot:true},volume + '/**');
    var writeCount = 0;
    var excludeFromMountee = /Global Variables|Snippets/;

    // Don't need global vars/snippets
    // TODO: but we do want certain specified low vars
    mountee = mountee.filter(function(file){
      if (!excludeFromMountee.test(file)) {
        return file;
      }
    });

    // Hack to skip low vars (-jg)
    var re2 = /low_vars|styles.group|DS_Store/;
    dist = dist.filter(function(file){
      if(!re2.test(file)) {
        return file;
      }
    });

    if (dist.length === 0) {
      grunt.fatal("Did not find any matching files to copy to Mounted Volume.");
    }

    grunt.log.header('Looping through dist directory to find templates to write:');
        
    grunt.file.recurse(destpath, function(abspath, rootdir, subdir, filename){
      
      if (!skip.test(filename)){
        var destFile = volume + '/' + subdir + '/' + filename,
            tmplPath = subdir + '/' + filename,
            localFile = abspath,
            index = mountee.indexOf(destFile),
            localFileContents;
          

        // check to see if that file is in the list of mountee files
        if (index > -1 ) {
          grunt.log.debug('Comparing "' + tmplPath + '"...');

          // compare and write or skip
          if (!compareFiles(localFile, destFile)) {
            grunt.log.verbose.warn('"' + tmplPath + '" are different');

            if (deploy) {
              localFileContents = grunt.file.read(localFile);
              grunt.file.write(destFile, localFileContents);

              // Fail task if errors were logged.
              if (task.errorCount) { return false; }
              // Otherwise, print a success message.
              grunt.log.write('Updating "' + destFile + '"...').ok();
            } else {
              grunt.log.write('Would Update "' + destFile + '"...').ok();
            }
            writeCount ++;
          } else {
            grunt.log.verbose.write('"' + tmplPath + '" are identical...').ok();
          }

          // remove from list of mountee files
          mountee.splice(index, 1);

        } else {
          if (deploy) {
            grunt.file.write( destFile, localFileContents );
            // Fail task if errors were logged.
            if (task.errorCount) { return false; }
            // Otherwise, print a success message.
            grunt.log.write('Creating "' + destFile + '"...').ok();
          } else {
            grunt.log.write('Would Create "' + destFile + '"...').ok();
          }
          writeCount++;
        }
      }
    });

    // are there any files left in the mountee array which don't exist in dist
    // todo: add an option to delete

    if (writeCount === 0) {
      grunt.log.writeln('No templates written to mounted volume');
    }

    if (mountee.length > 0) {
      grunt.log.warn('These files exist only in the mounted volume');
      grunt.log.warn('They may need to be manually deleted:');
      mountee.forEach(function(file) {
        if (grunt.file.isFile(file)) grunt.log.writeln(file);
      });
    }

  };

  /**
   * [getHash returns an md5 hash of whatever gets sent to it]
   * @param  {string} file - file contents
   * @return {string} - md5 hash of file
   */
  var getHash = function(file){
    var algo = 'md5',
        encoding = 'hex',
        hash = crypto.createHash(algo);

    hash.update(file);

    return hash.digest(encoding);
    
  };

  /**
   * @function compareFiles
   * Takes 2 files and compares their md5 hashes.
   *
   * @param {string} file1 - one file path
   * @param {string} file2 - another file path
   * @return {boolean} true if files ===, false if !==
   * 
   */

  var compareFiles = function(filePath1, filePath2){
    var hash1 = getHash(grunt.file.read(filePath1)),
        hash2 = getHash(grunt.file.read(filePath2));

    return hash1 === hash2 ? true : false;

  };
  
  
  
  // ==========================================================================
  // TASKS
  // ==========================================================================

  // todo: not sure if we want a multiTask or a single task.  we only want to run this on a single target
  grunt.registerMultiTask('mountee', 'Goes from EE templates as files to Mountee format.', function() {

    var src = this.data.src,
        mounteeDest = 'dist/' + this.data.dest,
        volume = '/Volumes/' + this.data.volume,
        deploy = false;

    // test to see if we're deploying, if so, set deploy to true    
    deploy = this.args[0] === 'deploy' ? true : false;
    
    // create a mountee friendly version of the template dir
    grunt.file.recurse(src, function(abspath, rootdir, subdir, filename){
      if(!skip.test(filename)){
        grunt.log.verbose.writeln('Writing ' + abspath + ' to ' + mounteeDest + '/' + mountify(subdir + '/' + filename, src));
        grunt.file.copy(abspath, mounteeDest + '/' + mountify(subdir + '/' + filename, src));
      }
    });

    // files.forEach(function(file) {
    //   var destpath = mountify(file, src);
    //   grunt.file.copy(file, mountee + destpath);
    // });
    // todo: validate volume path/connection before trying to write
    grunt.log.verbose.writeln('Going to compare to: ' + volume);
    mounteeWrite(mounteeDest, volume, deploy, this);

  });

};