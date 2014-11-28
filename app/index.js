'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var ReflexworksGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the stylish Reflexworks generator!'
    ));

    var prompts = [{
      name: 'serviceName',
      message: 'Service Name?'
    },{
      name: 'serviceHostUrl',
      message: 'Domain Name?'
    },{
      name: 'apiKey',
      message: 'Api Key?'
    },{
      name: 'account',
      message: 'Account Name?'
    },{
      name: 'password',
      message: 'Password?'
    }];

    this.prompt(prompts, function (props) {
      this.serviceName = props.serviceName;
      this.serviceHostUrl = props.serviceHostUrl;
      this.apiKey = props.apiKey;
      this.account = props.account;
      this.password = props.password;
      this.yeoman = {
            // configurable paths
            app: 'app',
            dist: 'dist',
            livereload : 35729
      };

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.dest.mkdir('app');
      this.dest.mkdir('app/scripts');
      this.dest.mkdir('app/scripts/controllers');
      this.dest.mkdir('app/scripts/service');
      this.dest.mkdir('app/styles');
      this.dest.mkdir('app/styles/index');
      this.dest.mkdir('app/styles/index/layouts');
      this.dest.mkdir('app/styles/index/modules');
      this.dest.mkdir('app/views');

      this.template('app/index.html', 'app/index.html');
      this.template('app/scripts/app.js', 'app/scripts/app.js');
      this.template('app/scripts/controllers/MainCtrl.js', 'app/scripts/controllers/MainCtrl.js');
      this.template('app/scripts/service/createTokenService.js', 'app/scripts/service/createTokenService.js');
      this.template('app/scripts/service/feedToArrayService.js', 'app/scripts/service/feedToArrayService.js');
      this.template('app/scripts/service/reflexDataService.js', 'app/scripts/service/reflexDataService.js');
      this.template('app/scripts/service/templateService.js', 'app/scripts/service/templateService.js');
      this.template('app/styles/index.scss', 'app/styles/index.scss');
      this.template('app/styles/index/_base.scss', 'app/styles/index/_base.scss');
      this.template('app/styles/index/_mixins.scss', 'app/styles/index/_mixins.scss');
      this.template('app/styles/index/_utilities.scss', 'app/styles/index/_utilities.scss');
      this.template('app/styles/index/_variables.scss', 'app/styles/index/_variables.scss');
      this.template('app/styles/index/layouts/_l-main.scss', 'app/styles/index/layouts/_l-main.scss');
      this.template('app/styles/index/modules/_m-main.scss', 'app/styles/index/modules/_m-main.scss');
      this.template('app/views/MainView.html', 'app/views/MainView.html');

      this.template('_auth.txt', 'auth.txt');
      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');
      this.template('_circle.yml', 'circle.yml');
      this.template('_README.md', 'README.md');
      this.template('_Gruntfile.js', 'Gruntfile.js');
    },

    projectfiles: function () {
      this.src.copy('_rxcp.sh', 'rxcp.sh');
      this.src.copy('bowerrc', '.bowerrc');
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
    }
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = ReflexworksGenerator;
