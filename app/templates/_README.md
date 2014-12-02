# <%= serviceName %> Project

├── Gruntfile.js
├── README.md
├── app
│   ├── scripts
│   │   ├── app.js
│   │   ├── controllers
│   │   │   ├── LoginCtrl.js
│   │   │   └── MainCtrl.js
│   │   └── service
│   │       ├── createTokenService.js
│   │       ├── feedToArrayService.js
│   │       ├── reflexDataService.js
│   │       └── templateService.js
│   ├── styles
│   │   ├── index.scss
│   │   └── index
│   │       ├── layouts
│   │       │   └── _l-main.scss
│   │       ├── modules
│   │       │   └── _m-main.scss
│   │       ├── _base.scss
│   │       ├── _mixins.scss
│   │       ├── _utilities.scss
│   │       └── _variables.scss
│   ├── views
│   │   └── MainView.html
│   ├── pdf
│   │   └── template_person.html　(pdf出力用テンプレート)
│   ├── xls
│   │   └── template_person.xls (xls出力用テンプレート)
│   ├── remote 
│   │   └── person.js (サーバサイドロジック)
│   ├── 400.html
│   ├── 404.html
│   ├── error.html
│   ├── favicon.ico
│   ├── index.html
│   ├── login.html
│   └── robots.txt
├── auth.txt
├── bower.json
├── circle.yml
├── karma-e2e.conf.js
├── karma.conf.js
├── package.json
├── protractor.conf.js
├── rxcp.sh
├── setup
│   ├── _html　(コンテンツ、フォルダのACL設定)
│   │   ├── 400.html
│   │   ├── fonts
│   │   ├── images
│   │   ├── login.html
│   │   ├── pdf
│   │   ├── scripts
│   │   ├── styles
│   │   └── xls
│   ├── _settings (各種設定)
│   │   ├── adduser (ユーザ追加時のメール送信文)
│   │   ├── error.html (エラー画面)
│   │   ├── passreset (パスワードリセット時のメール送信文)
│   │   └── template (スキーマテンプレート)
│   ├── master (マスターデータ)
│   │   └── food
│   └── userinit.xml (初期ログイン時に生成されるユーザフォルダ設定)
├── userinit
│   └── _settings
│       └── userinit.xml (初期ログイン時に生成されるユーザフォルダ設定)
└── example_data
    └── parson_data.xls (xls->json変換のサンプル)
