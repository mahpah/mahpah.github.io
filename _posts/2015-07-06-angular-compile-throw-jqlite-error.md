---
permalink: angular-compile-throw-jqlite-error
title: [Angular] $compile throw jQlite error
layout: post
tags:
    - angularjs
    - tech
    - javascript
---

Tôi vừa phải dùng service $compile của angular để dịch một đoạn text thành html (He, tôi đang định viết 1 tut về $compile :smile:) Nôm na là angular $compile sẽ nhận vào một chuỗi hoặc một phần tử html để chuyển nó thành một hàm biên dịch. Bản thân hàm biên dịch này lại nhận vào một đối tượng $scope để rồi trả về đối tượng HTML. À có code ví dụ đây, ví dụ thôi nhé, chứ chẳng ai làm thế này đâu nhé :smile:

```js
var elmScope = scope.scope || $rootScope.$new();
elmScope.test = 'Hello';
elm.empty();
var child;
try {
    var templateFn = $compile(htmlString);
    child = templateFn(elmScope);
    elm.append(child);
} catch (e) {
    alert(e);
    console.error(e.stack);
}
```

plunker http://plnkr.co/edit/14l7zncAklYObOw36exO?p=preview

Với đoạn code kia thì khi bạn nhập một đoạn html đàng hoàng với các thẻ đóng mở, mọi việc rất êm thấm, tuy nhiên nếu thử nhập một đoạn text gì đó, như "abc" chẳng hạn, lỗi xảy ra:

```plaintext
Error: [jqLite:nosel] Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element
http://errors.angularjs.org/1.4.1/jqLite/nosel
    at https://code.angularjs.org/1.4.1/angular.js:68:12
    at JQLite (https://code.angularjs.org/1.4.1/angular.js:2747:13)
    ...
```

Sao lạ thế nhỉ, tôi đâu có lookup cái gì đâu, ngẫm nghĩ một lúc vẫn không hiểu, đành mở code angular ra xem thì hóa ra thế này.

```js
// file compile.js
function compile($compileNodes, transcludeFn, maxPriority, ignoreDirective, previousCompileContext) {
      if (!($compileNodes instanceof jqLite)) {
        // jquery always rewraps, whereas we need to preserve the original selector so that we can
        // modify it.
        $compileNodes = jqLite($compileNodes);
      }
    ...
  }
```

```js
//file jqlite.js
function JQLite(element) {
  ...
  if (isString(element)) {
    element = trim(element);
    argIsString = true;
  }
  if (!(this instanceof JQLite)) {
    if (argIsString && element.charAt(0) != '<') {
      throw jqLiteMinErr('nosel', 'Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element');
    }
    return new JQLite(element);
  }
// ...
```

Hiu hiu, hóa ra là cái chuỗi mình nhập vào nó phải bắt đầu bằng `'<'` thì nó mới biết là tạo mới element chứ không phải đi lookup. Đừng chửi tôi, tôi chẳng dùng jQuery bao giờ nên không biết TT__TT

Cuối cùng để an toàn đành wrap đoạn string trong một element khác.

```js
var wrapper = angular.element('<div>');
wrapper.html(scope.ngAppend);
console.log(wrapper, wrapper.contents());
var templateFn = $compile(wrapper.contents());
child = templateFn(elmScope);
```

Xem Plunker chạy được ở đây: http://plnkr.co/edit/hJRShbNqU2Sp5iD5GNYT?p=preview 