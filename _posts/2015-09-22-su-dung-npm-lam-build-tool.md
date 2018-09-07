---
title: Sử dụng npm làm build tool
permalink: su-dung-npm-lam-build-tool
layout: post
---

Nhiều lúc muốn làm một cái site đơn giản mà phải sử dụng đến gulp với grunt để build thì thật phiền, nên tôi làm một cái repo boilerplate dùng npm để build luôn. À đính chính lại cho ai hiểu lầm, npm là một tool thực sự mạnh, và hoàn toàn có thể thay thế được grunt, gulp, brocolli... chứ không phải chỉ để làm "cái site đơn giản" đâu nhé.

> Bài này viết về

>* npm scripts

Ở cái boilerplate này thì tôi sẽ build các thứ như này:

* HTML: Jade 
* css: Sass
* js: Browserify với babelify

Một số utilities bổ sung.

* rimraf: để xóa file, thư mục, chính là lệnh `rm -Rf` của linux viết bằng node, mục đích: cross platform
* mkdirp: tác dụng như lệnh `mkdirp`
* ncp: viết tắt của node-copy, util để copy file, cross platform

## Init
Tạo thư mục cho nó cơ bản
```
mkdir lab
cd lab
npm init
```
Trả lời mấy câu hỏi của nó. Sau đó tạo thư mục src chứa mã nguồn, cấu trúc sẽ tương tự thế này

```
lab
|__ src
|__ |__ assets // ảnh ọt phông phiếc
|__ |__ |__ img
|__ |__ js
|__ |__ sass
|__ |__ index.jade
|__ package.json
```
## npm scripts
Mở file package.json ra, các bạn sẽ thấy một mục là scripts, và ban đầu chỉ có 1 script là test.
```
// package.json
...
"scripts": {
    "test": "echo ..."
}
...
```

Các lệnh được định nghĩa trong này (`scripts`) có thể được chạy bằng cách sử dụng `npm run [tên-scripts]`. Riêng test thì có thể chạy ngắn gọn là `npm test`. Khi chạy bằng `npm run` thì các file thực thi trong thư mục `node_modules/.bin/` cũng được gọi, nhờ đó không cần sử dụng các gói global ([tôi đã từng kể chuyện này](http://mahpahh.com/hay-thoi-ngay-npm-g/)). Ví dụ, sau khi cài http-server:
```
npm i http-server --save-dev
```
Thêm vào scripts: 
```
// package.json
...
"scripts": {
    ...
    "serve": "http-server . --port=8000"
}
...
```
rồi chạy
```
npm run serve
```
Và OK, chúng ta đã có website live tại http://localhost:8000.

Ủa biết hết rồi hả, xin lỗi nha, huyên thuyên nãy giờ quê quá :3

OK, script build sẽ thế này, ở đây style sử dụng dấu ":" được ăn trộm từ gruntfile. Như các bạn thấy là build script trông đơn giản và straightforward hơn grunt config.
```
{
    "build:jade": "jade src -o dist",
    "build:sass": "node-sass src/sass -o dist/css",
    "prebuild:babel": "mkdirp dist/js",
    "build:babel": "browserify -t babelify src/js/index.js --outfile dist/js/scripts.js"
}
```
còn dependencies sẽ như thế này

```
"devDependencies": {
    "babelify": "*",
    "browserify": "*",
    "jade": "*",
    "node-sass": "*",
    "mkdirp": "*"
  },

```

**Chú ý:** scripts `prebuild:babel` sẽ được chạy trước khi chạy `build`. Mỗi npm task sẽ có pretask chạy trước và posttask chạy sau tương ứng.

Sau khi có các task build từng thành phần rồi, chúng ta sẽ gộp lại thành một task. Ngôi sao của chúng ta là parallelshell, một node module cho phép chạy các script song song.

```
// package.json
...
"devDependencies": {
    "parallelshell": "*"
},

scripts: {
    "build": "parallelshell \"npm run build:jade\" \"npm run build:sass\" \"npm run build:babel\""
}
```
*Bạn nên dùng dấu ngoặc kép và escape `\"` thay cho dấu ngoặc đơn `'` để script có thể chạy trên windows :shame:*

Sau đó có thể thêm vài task râu ria, như copy assets

```
// package.json
...
"devDependencies": {
    "ncp": "*"
},

scripts: {
    "copy:assets": "ncp src/assets dist/assets"
}
```

clean với rimraf. Nếu các bạn chỉ dùng linux thì `rm -Rf` cũng được.

```
// package.json
...
"devDependencies": {
    "rimraf": "*"
},

scripts: {
    "clean": "rimraf ./dist",
}
```

## Tích hợp vào sublime text
Sublime text cho phép định nghĩa các build system để build với tổ hợp phím <kbd>Ctrl</kbd> + <kbd>B</kbd>. Tool > Build System > New Build System
![](/content/images/2015/09/sublime-build.PNG)

```
{
	"cmd": ["npm", "run", "build"],
	"windows": {
		"shell": true
	}
}
```

Lưu lại và bạn đã có thể ấn <kbd>Ctrl</kbd> + <kbd>B</kbd> để build nhanh chóng. Sẽ không có watch task bởi vì tôi thích tự ấn Ctrl B hơn.


Đây là repo sau khi đã thêm vài task để chạy static server và live-reload https://github.com/mahpah/nbuildm. Đã test trên ubuntu và windows. Mac thì ai dùng test hộ tôi với.


---
- Xem thêm các bài viết về javacript: http://mahpahh.com/tag/javascript
- Chuyện tào lao http://mahpahh.com/tag/thought
