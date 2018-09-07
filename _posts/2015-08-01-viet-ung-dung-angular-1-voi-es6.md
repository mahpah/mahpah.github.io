---
title: Viết ứng dụng angular 1 bằng ES6
permalink: viet-ung-dung-angular-1-voi-es6
layout: post
---

Trong khi chờ đợi angular 2 chính thức ra mắt (thực ra tôi nghĩ còn lâu lắm, vì ng2 dùng một số công cụ của ES7 như annotation), chúng ta có thể, và nên làm quen từ từ bằng việc chuyển sang viết angular 1 với ES6.

> Nhớ xem qua một số bài viết về es6 tại đây nhé http://mahpahh.com/tag/es6/

ES6 đã chính thức ra mắt được một thời gian rồi, nghe đâu cứ 12 tháng họ lại ra một chuẩn mới, thế nên ES6 sẽ được gọi chính thức là ECMAScript 2015 hay ES2015, một cái tên dài hơn, chắc là trang trọng hơn. Và với tốc độ cập nhật nhanh như vậy chúng ta có vắt chân lên cổ mà học theo cũng chẳng kịp nữa là các hãng làm trình duyệt phải implement, thành ra cách tốt nhất để sử dụng là dùng các bộ phiên dịch (transpiler). Ở đây tôi dùng traceur của anh google, đơn giản vì tôi thích google, ngoài ra tôi thấy traceur dịch cũng rất ngắn gọn, có vẻ dung lượng thấp hơn babel (cái này tôi chưa kiểm chứng).

## module
Ban đầu, tôi nghĩ như khi viết ES5, đó là viết từng thành phần ra một file rồi nối lại (concatenate) bằng gulp hay grunt, nhưng sau đó chợt nhớ ra là ES6 có module, vậy tội gì mà phải gộp kiểu công nhân như vậy. Và đây là lệnh dịch module cua traceur.

```
traceur --module main.js --out app.js
```

Các file js sẽ như thế này

```js
// dog.class
class Dog {
	bark() {
    	console.log('dog dog');
    }
}

export default Dog;

// main.module.js
import Dog from './dog.class.js'

let kiki = new Dog();
kiki.bark();
```

Traceur sẽ tự tìm các file được import để ghép vào cùng, tiện phải không các bạn, he he.

Sau đây là ví dụ một module angular đủ các thành phần

## Service
```js
// donut-factory.service.js
class DonutFactory($q) {
	constructor() {
    	this.$q = $q;
    }
    
    makeDonut(taste) {
    	return this.$q.resolve({
        	name: 'donut',
            taste: taste
        });
    }
}

// dependencies inject go here
DonutFactory.$inject = ['$q'];

// tôi thích export default, tôi không nghĩ là nên import
// nhiều hơn một thứ từ một file
export default DonutFactory;
```

## Controller

```js
// donut.ctrl.js

class DonutController {
	constructor() {}
    
    // controller của angular2 component sẽ có 1 số phương thức
    // đặc biệt, ta có khi cũng nên bắt đầu sử dụng cho quen
    activate() {
    
    }
}

DonutController.$inject = [];

export default DonutController;
```

## Directive
Thay vì export class, ta export function, thực ra cũng như thế cả.
```js
// donut.directive.js

function donutDirective() {
	return {
    	template: '',
        controller: 'DonutController',
        controllerAs: 'donut',
        scope: true,
        bindToController: {
        	taste: '@'
        }
    };
}

donutDirective.$inject = [];

export default donutDirective;
```

Tương tự, các hàm run và config cũng được viết như vậy.

Tuy nhiên các bạn cũng có thể thấy là các file này đều chưa liên quan gì đến angular cả, việc làm cho chúng liên quan là việc của file module.

## angular module

Trong file module, import tất cả và đăng ký với hệ thống DI của angular.

```js
// donut.module.js

import DonutService from './donut.service.js';
import DonutController from './donut.ctrl.js';
import donutDirective from './donut.directive.js';

export default angular.module('donut', [])
	.service('DonutService', DonutService)
    .controller('DonutController', DonutController)
    .directive('donut', donutDirective);
```

Nếu bạn có một module nữa sử dụng module donut thì bạn cũng có thể import vào và dùng rất đơn giản:

```js
// main.module.js
import donut from './donut.module.js';

export angular.module('main', [
	donut.name //thật tuyệt là angular module có thuộc tính name, tôi sẽ không phải lo lắng việc ghi nhầm tên module nữa.
]);
```

## html
Trong file html, các bạn chỉ cần load thêm traceur runtime trước khi load file app là OK.
```
<script src="../node_modules/traceur/bin/traceur-runtime.js" charset="utf-8"></script>
<script src="../dist/js/app.js" charset="utf-8"></script>
```


Đại loại là như thế. Đây là file package.json chứa các script để build js với traceur, có thêm phần build sass, watch và một static file server. Tôi sẽ cập nhật cấu trúc thư mục và repo ví dụ sau. Stay tuned.

```
{
  "scripts": {
    "build:js": "traceur --module src/scripts/main.module.js --out dist/js/app.js",
    "build:sass": "node-sass  ./src/sass/ -o ./dist/css",
    "prebuild": "rimraf dist/",
    "build": "npm run build:js && npm run build:sass",
    "watch:js": "nodemon -w src/scripts/ -e js -x \"npm run build:js\"",
    "watch:sass": "nodemon -w src/sass/ -e sass -x \"npm run build:sass\"",
    "watch": "parallelshell \"npm run watch:sass\" \"npm run watch:js\"",
    "serve:dev": "http-server",
    "dev": "parallelshell \"npm run serve:dev\" \"npm run watch\""
  },
  "dependencies": {
    "angular": "^1.4.3",
    "traceur": "~0.0.90"
  },
  "author": "mahpahh",
  "license": "MIT",
  "devDependencies": {
    "http-server": "^0.8.0",
    "node-sass": "^3.2.0",
    "nodemon": "^1.3.7",
    "parallelshell": "^1.2.0",
    "rimraf": "^2.4.0"
  }
}
```

**UPDATE**: boilerplate repo here http://mahpahh.com/su-dung-npm-lam-build-tool/
