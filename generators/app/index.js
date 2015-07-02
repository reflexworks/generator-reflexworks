'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

var ReflexworksGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../../package.json');
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
      this.d = "$";

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      mkdirp('app');
      mkdirp('example_data');

      mkdirp('app/scripts');
      mkdirp('app/scripts/controllers');
      mkdirp('app/scripts/service');

      mkdirp('app/server');
      mkdirp('app/styles');
      mkdirp('app/styles/index');
      mkdirp('app/styles/index/layouts');
      mkdirp('app/styles/index/modules');

      mkdirp('app/views');
      mkdirp('app/images');
      mkdirp('app/pdf');
      mkdirp('app/xls');

      mkdirp('setup');
      mkdirp('setup/_html');
      mkdirp('setup/_settings');
      mkdirp('setup/master');

      mkdirp('userinit');
      mkdirp('userinit/_settings');

      this.template('app/index.html', 'app/index.html');
      this.template('app/login.html', 'app/login.html');
      this.template('app/400.html', 'app/400.html');
      this.template('app/error.html', 'app/error.html');
      this.copy('app/favicon.ico', 'app/favicon.ico');

      this.template('app/scripts/app.js', 'app/scripts/app.js');
      this.template('app/scripts/controllers/MainCtrl.js', 'app/scripts/controllers/MainCtrl.js');
      this.template('app/scripts/controllers/LoginCtrl.js', 'app/scripts/controllers/LoginCtrl.js');
      this.template('app/scripts/controllers/PDFCreateDemoCtrl.js', 'app/scripts/controllers/PDFCreateDemoCtrl.js');
      this.template('app/scripts/controllers/ReflexDataServiceDemoCtrl.js', 'app/scripts/controllers/ReflexDataServiceDemoCtrl.js');
      this.template('app/scripts/controllers/XLSCreateDemoCtrl.js', 'app/scripts/controllers/XLSCreateDemoCtrl.js');
      this.template('app/scripts/controllers/ServerSideJavascriptDemoCtrl.js', 'app/scripts/controllers/ServerSideJavascriptDemoCtrl.js');
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
      this.template('app/views/PDFCreateDemo.html', 'app/views/PDFCreateDemo.html');
      this.template('app/views/reflexDataServiceDemo.html', 'app/views/reflexDataServiceDemo.html');
      this.template('app/views/XLSCreateDemo.html', 'app/views/XLSCreateDemo.html');
      this.template('app/views/ServerSideJavascriptDemo.html', 'app/views/ServerSideJavascriptDemo.html');

      this.copy('app/xls/preson_template.xls', 'app/xls/preson_template.xls');
      this.copy('app/pdf/template_person.html', 'app/pdf/template_person.html');
      this.copy('app/server/person_get.js', 'app/server/person_get.js');
      this.copy('app/server/person_post.js', 'app/server/person_post.js');
      this.copy('app/server/person_delete.js', 'app/server/person_delete.js');
      this.copy('app/server/person_put.js', 'app/server/person_put.js');

      this.template('example_data/parson_data.xls', 'example_data/parson_data.xls');

      this.template('setup/_html/400.html', 'setup/_html/400.html');
      this.template('setup/_html/images', 'setup/_html/images');
      this.template('setup/_html/login.html', 'setup/_html/login.html');
      this.template('setup/_html/pdf', 'setup/_html/pdf');
      this.template('setup/_html/scripts', 'setup/_html/scripts');
      this.template('setup/_html/styles', 'setup/_html/styles');
      this.template('setup/_html/xls', 'setup/_html/xls');
      this.template('setup/_settings/adduser', 'setup/_settings/adduser');
      this.template('setup/_settings/error.html', 'setup/_settings/error.html');
      this.template('setup/_settings/passreset', 'setup/_settings/passreset');
      this.template('setup/_settings/template', 'setup/_settings/template');
      this.template('setup/master/food', 'setup/master/food');

      this.template('userinit/_settings/userinit.xml', 'userinit/_settings/userinit.xml');

      this.template('_auth.txt', 'auth.txt');
      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');
      this.template('_circle.yml', 'circle.yml');
      this.template('_README.md', 'README.md');
      this.template('_Gruntfile.js', 'Gruntfile.js');
      this.copy('_rxcp.sh', 'rxcp.sh');
    },

    projectfiles: function () {
      this.copy('bowerrc', '.bowerrc');
      this.copy('editorconfig', '.editorconfig');
      this.copy('jshintrc', '.jshintrc');
    }
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = ReflexworksGenerator;
