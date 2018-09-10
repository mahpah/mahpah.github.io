---
title: Tạo một ES6 web app
permalink: tao-mot-es6-webapp
layout: post
image: /content/images/2015/10/20-Resources-on-ES6-for-JavaScript-Developers.jpg
---

*Also cross-posted on [Kipalog](http://kipalog.com/posts/Tao-mot-ES6-web-app)*

Chuẩn ES6 hay ES2015 đã hoàn tất và các [trình duyệt đều đã bắt đầu hỗ trợ rộng rãi](https://kangax.github.io/compat-table/es6/). Giờ là lúc chúng ta tận dụng sức mạnh mới được ban cho này để viết những ứng dụng web hoàn hảo.

> Nhớ xem qua một số bài viết của tôi về es6 tại đây nhé http://mahpahh.com/tag/es6/

Ở đây tôi sử dụng transpiler [babel](https://babeljs.io/). Có thể nói đây là transpiler đầy đủ nhất hiện nay. Công cụ để đóng gói là [webpack](https://webpack.github.io/), được chọn bởi tính đơn giản trong việc config. Ngoài ra [browserify](https://gist.github.com/substack/68f8d502be42d5cd4942) là một lựa chọn tốt không kém nếu bạn không thích việc nhét tất tần tật (js, css, template html) vào chung 1 file js.

## Cài đặt các thứ

Hãy bắt đầu bằng việc tạo một thư mục và khởi tạo file `package.json`

```sh
mkdir my-awesome-app
cd my-awesome-app
npm init -y
```

Các gói bạn cần vào lúc này là

```json
// package.json
"devDependencies": {
    "babel-loader": "*",
    "babel-runtime": "*",
    "css-loader": "*",
    "file-loader": "*",
    "node-sass": "*",
    "raw-loader": "*",
    "sass-loader": "*",
    "style-loader": "*",
    "url-loader": "*",
    "webpack": "*",
    "webpack-dev-server": "*"
}
```

`webpack` import các file nguồn vào thành một file bundle duy nhất, và nó sử dụng các loader để biên dịch các loại file khác nhau. Tất nhiên "người ta" đã viết ra cả kho loader cho bạn chỉ việc xài mà thôi.

`webpack-dev-server` là một gói dùng để tạo một server phục vụ file tĩnh có tính năng tự động tải lại trang khi bundle thay đổi, trường hợp thay đổi css thì không cần tải lại trang. Tuyệt vời.

## Cấu hình webpack

Hãy sử dụng một file config, ví dụ tôi đặt tên là "webpack.conf.js", sau đó sử dụng webpack với file config này để build với lệnh (chỉ chạy nếu bạn cài đặt webpack global)

```sh
webpack --config webpack.conf.js
```

Thêm một script vào `package.json` để đỡ phải nhớ lệnh dài dòng;

```json
// package.json

"scripts": {
   "build": "webpack --config webpack.config.js"
}
```

Và chạy npm script:

```
npm run build
```

(Nếu chưa quen với npm scripts, bạn có thể xem ở đây: http://mahpahh.com/su-dung-npm-lam-build-tool/)

Tạm thời nó sẽ báo lỗi, vì đã config gì đâu. Chúng ta sẽ sử dụng config như thế này:

```js
var path = require('path');

module.exports = {
  name: 'app',

  // ngụ ý rằng môi trường chúng ta hướng tới là browser, webpack cũng có thể dùng làm build tool cho node. Cơ mà theo tôi thì có lẽ hơi thừa.
  target: 'web',

  // điểm bắt đầu để import module, bạn có thể định nghĩa nhiều điểm bắt đầu.
  entry: {
    app: [
      './src/index.js',

      // thêm đoạn script này để webpack-dev-server có thể hoạt động. Khi triển khai có thể bỏ nó đi.
      'webpack-dev-server/client?http://localhost:8080',
    ],
  },

  // thư mục ra
  output: {
    path: path.resolve(__dirname, './dist'),

    // ví dụ ở trên entry của tôi là app thì file ra sẽ là app.bundle.js
    filename: '[name].bundle.js',
  },

  devServer: {
    contentBase: './dist',
  },

  // phần này config các loader theo từng loại file.
  module: {

    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css',
      },
      {
        // đúng thế, ES6 module sẽ được babel transform nhờ cấu hình này
        test: /\.js$/,
        loader: 'babel?optional[]=runtime',
        exclude: /node_modules/,
      },
      {
        // các file ảnh ọt và font được copy sang thư mục đích. Tôi lần mò mãi mới đưa được font-awesome lên hình.
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file',
      }, {
        // copy nội dung file template vào code js.
        test: /\.tpl.html$/,
        loader: 'raw',
      }, {
        // file index.html, chỉ đơn giản là copy và giữ nguyên tên.
        test: /index.html$/,
        loader: 'file?name=[name].[ext]',
      }, {
        // loader cho file sass
        test: /\.scss$/,
        loader: 'style!css!sass',
      }, {
        // tôi thêm dòng này để dịch file .sass nếu các bạn thích.
        test: /\.sass$/,
        loader: 'style!css!sass?indentedSyntax',
      },
    ],
  },

};
```

### Viết vài ba script
Cấu trúc thư mục của chúng ta sẽ thế này

```sh
$ tree
my-awesome-app
└───dist
└───src
│   ├───app
│   │   └───app.module.js
│   └───index.js
│   └───index.html
└───webpack.conf.js
└───package.json

```

`index.js` là nơi tình yêu bắt đầu, như đã config. Hãy import gì đó.

```js
// index.js
import './index.html';
import app from './app/app.module.js';

// ví dụ dùng angular chẳng hạn
import {bootstrap} from 'angular';

bootstrap(document, [app]);

```

> Nếu bạn quan tâm đến angular thì tôi có một tut sơ lược về angular và ES6 tại đây http://mahpahh.com/viet-ung-dung-angular-1-voi-es6/

Ok, lúc này chạy lại lệnh build và xem thành quả. Rất tuyệt phải không nào.

## Sử dụng dev-server
`webpack-dev-server` sẽ dịch on-the-fly và tạo một static server cho các bạn.

Lại thêm script vào `package.json`

```
// package.json

"scripts": {
  "dev": "webpack-dev-server --config webpack.config.js --hot --inline",
}
```

Và `npm run dev` để bắt đầu thôi nào.

## Thêm chút test cho bờ rồ

Để trông cho có vẻ chuyên nghiệp tôi cũng set up 1 test framework vào cho hoành tráng. Framework dùng ở đây là mocha và chai, sử dụng test runner là karma.

### Cài thêm các gói

```
npm i --save-dev karma karma-mocha karma-chai mocha chai karma-sourcemap-loader phantomjs karma-phantomjs-launcher karma-webpack karma-mocha-reporter
```

Phew, hơi nhiều nhỉ.

### Cấu hình karma
Tương tự webpack, karma cũng sử dụng một file `.js` để cấu hình

```js
// karma.config.js

module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['mocha', 'chai'],

    // sử dụng một file giống như là file entry của webpack để import các file spec.
    files: [
      'bundle.spec.js',
    ],

    exclude: [],

    preprocessors: {
      'bundle.spec.js': ['webpack', 'sourcemap'],
    },

    // tương tự như file cấu hình webpack
    webpack: {
      module: {
        loaders: [
          {
            test: /\.css$/,
            loader: 'style!css',
          },
          {
            test: /\.js$/,
            loader: 'babel?optional[]=runtime',
            exclude: /node_modules/,
          },
          {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file',
          }, {
            test: /\.tpl.html$/,
            loader: 'raw',
          }, {
            test: /index.html$/,
            loader: 'file?name=[name].[ext]',
          }, {
            test: /\.scss$/,
            loader: 'style!css!sass',
          },
        ],

        preLoaders: [
          {
            test: /\.js$/,
            exclude: /(node_modules\/|\.spec.js$)/,
            loader: 'isparta-instrumenter',
          },
        ],
      },
    },

    webpackServer: {
      noInfo: true,
    },

    reporters: ['mocha'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['PhantomJS'],

    singleRun: false,

    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-chai',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader',
    ],
  });
};

```

File `bundle.spec.js` ta import các test case

```
// bundle.spec.js

// chỗ này có thể thay đổi tùy framework bạn sử dụng
import angular from 'angular';
import mocks from 'angular-mocks';

// các file test của chúng ta sẽ là [filename].spec.js
let context = require.context('./src', true, /\.spec\.js/);

context.keys().forEach(context);
```

Thêm script chạy karma vào `package.json` nữa nhỉ

```json
// package.json
"scripts": {
    "test": "karma start karma.conf.js"
}
```

Viết vài dummy test case

```js
// dummy.spec.js
describe('Dummy', () => {
  let a;
  let b = 2;

  beforeEach(() => {
    a = b;
  });

  it('should do abc', () => {
    expect(a).to.equal(b);
    expect(true).to.not.be.false;
  });

});
```

`npm run test` thôi, chờ gì nữa.

Kết quả bạn nên mong đợi:
![](/assets/images/2015/10/test.png)

Vậy là chúng ta đã setup test framework xong. Vấn đề thực sự quan trọng lúc này là **test cái gì bây giờ?**. Mong có cao thủ nào chỉ giáo cho chút ít. Tại hạ vô cùng cảm phục.

---
Tất cả mã nguồn ví dụ được đặt ở repo này, lưu ý các gói và test case đều nhắm tới angular 1. https://github.com/mahpah/ng16

Cover image credit: http://codecondo.com/learn-ecmascript-6-resources-javascript-devs/
