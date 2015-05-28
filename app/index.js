/**
 * generator-npms - index.js
 * Created by mds on 15/5/28.
 */

'use strict';

'use strict';
var yeoman = require('yeoman-generator');
var path = require('path');
var _ = require('lodash');
var shell = require('shelljs');

module.exports = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);
        this.cwd = path.basename(process.cwd());
    },
    prompting: function () {
        var done = this.async();
        var prompts = [
            {
                type    : 'input',
                name    : 'name',
                message : 'Your project name',
                default : _.kebabCase(this.appname) // Default to current folder name
            },
            {
                type    : 'input',
                name    : 'version',
                message : 'Your project version',
                default : '0.0.0' // Default to 0.0.0
            },
            {
                type    : 'input',
                name    : 'author',
                message : 'Your project author',
                default : 'mdemo' // Default to mdemo
            }
        ];
        this.prompt(prompts, function (answers) {
            this.name = answers.name;
            this.version = answers.version;
            this.author = answers.author;
            done();
        }.bind(this));
    },
    writing: {
        mkdir: function () {
            if (this.name != this.cwd) {
                shell.mkdir(this.name);
                process.chdir(this.name);
            }
        },
        template: function () {
            this.template('package.json', 'package.json', {
                name: this.name,
                version: this.version,
                author: this.author
            });
            this.template('README.md', 'README.md', {
                name: this.name
            });
        }
    },
    end: function(){
        shell.exec('npm publish')
    }
});