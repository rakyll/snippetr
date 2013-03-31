var config = require('../config.json'),
    readdirp = require('readdirp'),
    async = require('async'),
    fs = require('fs');

/**
 * Performs no operation.
 */
var noop = function() {}

/**
 * Provides utilities to extract snippets from a remote repo
 * and write them to snippets files.
 * @type {Object}
 */
var snippets = {
  /**
   * Validates the global config and stops execution
   * if a mandatory setting is not presented.
   * @param  {Function} callback
   */
  validateConfig: function(callback) {
    // TODO
    callback(null);
  },
  init: function(callback) {
    config.languages.forEach(function(lang) {
      lang.beginRegex = lang.commentPre + '-begin\\[(\\w+)\\]';
      lang.endRegex = lang.commentPre + '-end\\[(\\w+)\\]';
    });
    callback(null);
  },
  /**
   * Inits the remote repo into a temp directory.
   * @param  {Function} callback
   */
  initRepo: function(callback) {
    // TODO
    callback(null);
  },
  /**
   * Looks up for source code files for each language
   * presented on global config file.
   * @param  {Function} callback
   */
  findFiles: function(callback) {
    var that = this, jobs = [];
    config.languages.forEach(function(lang) {
      jobs.push(function(done) {
        lookup('.', lang, done);
      });
    });
    async.parallel(jobs, callback);
  },
  /**
   * Parses each source code file to extract snippets.
   * @param  {Object}   groups
   * @param  {Function} callback
   */
  parse: function(groups, callback) {
    var snippets = {};
    groups = groups || {};
    groups.forEach(function(group) {
      snippets[group.lang.tag] = extractSync(group.lang, group.files);
    });
    callback && callback(null, snippets);
  },
  /**
   * Writes the snippets to indiviual snippet files.
   * @param  {Object}   snippets
   * @param  {Function} callback
   */
  writeSnippets: function(snippets, callback) {
    callback(null, snippets);
  },
  /**
   * Starts the snippet extraction flow.
   * @param {Function=} opt_callback Optional callback.
   */
  start: function(opt_callback) {
    var flow = [
      this.validateConfig,
      this.init,
      this.initRepo,
      this.findFiles,
      this.parse,
      this.writeSnippets];
    async.waterfall(flow, opt_callback);
  },
};

/**
 * Exports snippets.
 * @type {Object}
 */
module.exports = snippets;


/**
 * Looks up for files with given language's extension.
 * @param  {string}   rootDir Root directory where lookup starts.
 * @param  {object}   lang The language.
 * @param  {Function} callback
 */
var lookup = function(rootDir, lang, callback) {
  readdirp({
    root: rootDir,
    fileFilter: lang.patterns }, noop, function(err, res) {
    callback && callback(err, { files: res.files, lang: lang });
  });
};

var extractTagsSync = function(lang, lines) {
  var beginRegex = new RegExp(lang.beginRegex, 'g'),
      endRegex = new RegExp(lang.endRegex, 'g'),
      tags = {};
  var addIndex = function(tag, key, index) {
    tags[tag] = tags[tag] || {};
    tags[tag][key] = tags[tag][key] || [];
    tags[tag][key].push(index);
  };
  lines.forEach(function(line, index) {
    if (m = beginRegex.exec(line)) {
      addIndex(m[1], 'begin', index);
    } else if (m = endRegex.exec(line)) {
      addIndex(m[1], 'end', index);
    }
  });
  return tags;
};

var extractSync = function(lang, files) {
  var snippets = {};
  files = files || [];
  files.forEach(function(file) {
    var contents = fs.readFileSync(file.fullPath, 'utf-8'),
        lines = contents.split('\n') || [],
        tags = extractTagsSync(lang, lines);
    for (var key in tags) {
      snippets[key] = [];
      for (var i = 0; i < tags[key].begin.length; i++) {
        var snippet = lines.slice(tags[key].begin[i] + 1, tags[key].end[i]).join('\n');
        snippets[key].push(snippet);
      }
    }
  });
  return snippets;
};

