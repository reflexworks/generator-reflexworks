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
      this.d = "$";

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.dest.mkdir('app');
      this.dest.mkdir('example_data');

      this.dest.mkdir('app/scripts');
      this.dest.mkdir('app/scripts/controllers');
      this.dest.mkdir('app/scripts/service');

      this.dest.mkdir('app/server');
      this.dest.mkdir('app/styles');
      this.dest.mkdir('app/styles/index');
      this.dest.mkdir('app/styles/index/layouts');
      this.dest.mkdir('app/styles/index/modules');

      this.dest.mkdir('app/views');
      this.dest.mkdir('app/images');
      this.dest.mkdir('app/pdf');
      this.dest.mkdir('app/xls');

      this.dest.mkdir('setup');
      this.dest.mkdir('setup/_html');
      this.dest.mkdir('setup/_settings');
      this.dest.mkdir('setup/master');

      this.dest.mkdir('userinit');
      this.dest.mkdir('userinit/_settings');

      this.template('app/index.html', 'app/index.html');
      this.template('app/login.html', 'app/login.html');
      this.template('app/400.html', 'app/400.html');
      this.template('app/error.html', 'app/error.html');
      this.src.copy('app/favicon.ico', 'app/favicon.ico');

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

      this.src.copy('app/xls/preson_template.xls', 'app/xls/preson_template.xls');
      this.src.copy('app/pdf/template_person.html', 'app/pdf/template_person.html');
      this.src.copy('app/server/person_get.js', 'app/server/person_get.js');
      this.src.copy('app/server/person_post.js', 'app/server/person_post.js');
      this.src.copy('app/server/person_delete.js', 'app/server/person_delete.js');
      this.src.copy('app/server/person_put.js', 'app/server/person_put.js');

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
      this.src.copy('_rxcp.sh', 'rxcp.sh');
    },

    projectfiles: function () {
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
