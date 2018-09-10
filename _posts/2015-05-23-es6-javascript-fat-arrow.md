---
permalink: es6-javascript-fat-arrow
title: '[ES6] Javascript fat arrow'
image: /content/images/2015/05/4628fbb9dc70514d389ed9491243866f_400x400.png
---

_Bài viết cũng được post trên Kipalog [#](http://kipalog.com/posts/F3d2BWs4hk10VKc3C0r9Lg)_

> Bài này giới thiệu hàm mũi tên - arrow function trong ECMA Script 6, phiên bản kế tiếp của Javascript hay ECMAScript 5 (ES5)

Uhm, trước khi đi vào vấn đề chính thì cần luộc lại một số khái niệm cơ bản về hàm trong Javascript. Lưu ý rằng phần sau đây thuần túy là các khái niệm chung trong Javascript, trong trường hợp bạn chỉ muốn biết về JS mà không quan tâm đến ES6 hay các công nghệ tiên phong thì đây là phần dành cho bạn (tất nhiên với một điều kiện nữa là bạn mới tiếp cận với JS).

## ABC về hàm js

### Function

Định nghĩa của hàm cho phép tôi được bỏ qua, tôi xin đi vào luôn phân loại. Hàm trong javascript có thể được chia làm 2 loại phân theo chức năng: phương thức và thủ tục con. Lưu ý đây chỉ là phân loại về chức năng, còn về mặt thực hành, chỉ có duy nhất 1 kiểu function.

- Phương thức (method): Là một hành động, khả năng của một đối tượng thực hiện một tác vụ hoàn chỉnh có ý nghĩa với đối tượng đấy.
- Thủ tục con (subroutine): Là một phần của tác vụ được chia nhỏ ra để phục vụ cho việc đơn giản hóa và tái sử dụng mã.

Nếu bạn cảm thấy khó hiểu thì đó là lỗi của tôi, vì đã đưa ra mấy cái định nghĩa lằng nhằng làm phức tạp hóa vấn đề. Cho tôi lấy ví dụ:

> Bạn là một đối tượng, có một khả năng là đi, việc này rõ ràng có ý nghĩa với bạn, vậy _đi_ là một phương thức của bạn. Bạn định nghĩa việc đi bằng một chuỗi các động tác như di chuyển chân trái lên trên 1 đoạn, rồi tiếp đến chân phải. Các hành động nhấc chân trái, nhấc chân phải không thực hiện một chức năng hoàn chỉnh, như vậy chúng được coi là thủ tục con

```js
var  you = {
    go: function(step) { <-- method
        function moveYourFoot(){ // <-- subroutine
            // magic code that make your foot move
        }

        while (step--) {
            moveYourFoot();
        }
    }
}
```

### Closure

Ở đây nảy sinh một vấn đề, thủ tục con là một phần nhỏ của phương thức, vậy nên chăng thủ tục con nên được tiếp cận với các biến của phương thức? Ví dụ, trong thủ tục `moveYourFoot` chúng ta nên biết số bước đã thực hiện để còn điều chỉnh tốc độ (đi nhiều sẽ mỏi, phải không?). OK, vậy ta sẽ hiểu rằng phạm vi (scope) của moveYourFoot là bao đóng của scope của go, vì các biến của go có thể được truy cập từ moveYourFoot

> **Định nghĩa bao đóng:**

    Cho lược đồ quan hệ R=(U, F). Bao đóng của tập thuộc tính X (X ⊆ U), ký hiệu X+ là tập tất hợp cả các thuộc tính mà có thể suy diễn logic từ X.

^ lòe thiên hạ tí ;))

_Scope_ là một khái niệm chỉ có ý nghĩa đối với máy chạy (engine) để xử lý các biến, không có đối tượng nào là scope cả. Bởi khi muốn truy xuất giá trị một biến, máy chạy phải hiểu ta đang nói đến biến nào trong một đống các biến cùng tên. Nôm na là thế.

Ví dụ tiếp:

```js
function foo() {
  var a = 2

  function bar() {
    console.log(a)
  }

  return bar
}

var baz = foo()

baz()
/* - console
2
*/
```

Ở đây `bar` có scope là bao đóng của scope của `foo` (_bar has a closure over the scope of foo_). Sau đó `baz` lại tham chiếu đến `bar` và khi thực hiện hàm `baz` (thực tế là ta đã thực hiện hàm `bar` ở ngoài phạm vi khai báo) ta vẫn có thể truy cập đến biến `a` mặc dù biến này nằm trong scope của `foo` mà đúng ra khi thực hiện xong `foo` scope này đã phải bị thu hồi.

Việc `bar` hay `baz` vẫn tham chiếu đến scope của `foo` được gọi thân thương là closure. Lưu ý là không phải mọi ngôn ngữ đều xử lý scope theo cách này.

OK, phần này có vẻ đi hơi quá xa với chủ đề của chúng ta.

### Ngữ cảnh và `this`

Bạn đã dùng biến this trong một số trường hợp nào đó mà có thể là vẫn chưa hiểu _cái này_ thực sự là _cái gì_.

Thú thật là tên biến `this` gây nhầm lẫn cho rất nhiều người, nhất là những người quen thuộc với các ngôn ngữ thuần hướng đối tượng như Java (I blame you Brendan). Sau đây là một số nhầm lẫn phổ biến.

#### HL1: `this` tham chiếu đến bản thân hàm

Ok, vậy ví dụ thế này

```js
function theF() {
  this.count++
}

theF.count = 0
console.log(theF.count)

for (var i = 0; i < 5; i++) {
  console.log(i)
  theF() // increase theF.count, sure
}

console.log('And now count is', theF.count)
// 0 <-- wtf?
```

Muốn tham chiếu đến bản thân hàm, hãy dùng tên hàm. Trong ví dụ trên, thay `this.count` bằng `theF.count` bạn sẽ nhận được điều mình muốn (ít nhất là tôi muốn).

#### HL2: `this` là scope

Tôi e là không, như trên đã nói, scope phải được hiểu là một khái niệm của máy dịch và máy chạy, không phải một đối tượng mà ta có thể tham chiếu đến. Không đồng ý? hãy xem ví dụ:

```js
function foo() {
  var a = 2
  return bar

  function bar() {
    console.log('a is', this.a)
  }
}

var baz = foo()
baz()
// a is undefined
```

Đồng ý là scope của `foo` có biến `a` và `a = 2`. Như đã nói ở trên baz là closure và được truy cập đến scope của `foo`, tức là `this` theo ý bạn. Tuy nhiên lại chẳng có `this.a` nào cả :P :P :P

**Vậy `this` là?**

Chúng ta có một khái niệm nữa, ngữ cảnh - context. Một hàm js có thể được định nghĩa ở một chỗ và thực thi ở chỗ khác. Nếu bây giờ bạn mở console lên và định nghĩa một hàm và thực thi thì hàm đó có ngữ cảnh là toàn cục, hay global, hay `window`. Tuy nhiên nếu bây giờ bạn định nghĩa hàm là phương thức của một đối tượng thì ngữ cảnh của hàm chính là đối tượng đó. Ví dụ:

```js
function b() {
  console.log(this === window)
}

var a = {
  method: function() {
    console.log(this === a)
  },
}

a.method()
b()
// true
// true
```

Đã rõ ràng hơn chút nào chưa nhỉ? Bây giờ thêm một ví dụ nữa là ta hoàn toàn có thể chỉ định ngữ cảnh của hàm được gọi, thậm chí một hàm định nghĩa trong đối tượng này nhưng có thể được gọi với ngữ cảnh là đối tượng khác.

```js
function sayMyName() {
  console.log(this.name)
}

var me = {
  name: 'Ha Pham',

  write: function() {
    console.log(this.name + ' so handsome')
  },
}

var you = {
  name: 'Anonymous',
}

sayMyName.call(me)
// Ha Pham

sayMyName.call(you)
// Anonymous

me.write()
// Ha Pham is so handsome

me.write.call(you)
// Anonymous is so handsome

var youWrite = me.write.bind(you)
youWrite()
// Anonymous is so handsome
```

Bind cũng giống như call, chỉ định ngữ cảnh gọi hàm, nhưng thay vì thực hiện hàm, nó trả lại một hàm khác và bạn có thể thực thi sau đó.

Tiếp theo, `new` làm gì? Đơn giản `new` tạo ra một ngữ cảnh mới và thực thi hàm với ngữ cảnh mới đó.

Tóm lại, hàm trong Js không phải là một đối tượng mà ngữ cảnh thực thi hàm mới là đối tượng. Tuy nhiên tôi không chắc _ngữ cảnh_ là một _đối tượng_ hay _đối tượng_ là cách gọi theo ngôn ngữ hướng đối tượng của ngữ cảnh.

Phần tiếp theo đây mới là thứ tôi dự định viết ban đầu

## ES6 arrow function

Để dễ hình dung, cú pháp arrow function như sau

```js
(a, b) => a + b;

(a, b) => {
    return a + b;
}

typeof (x) => x+1
// function
```

Vậy, arrow function cũng là một hàm thôi có gì đâu, vẽ ra làm gì cho phức tạp. Xin hãy xem ví dụ sau:

```js
obj = {
    a : 1;

    delayLog: function() {
        var that = this;
        setTimeout(function(){
            console.log(that.a);
        }, 1000);
    }
}
```

Hãy cho tôi biết điều gì xảy ra nếu không gán `that = this` và log luôn `this.a`. Bạn thấy là ngữ cảnh của hàm vô danh tức thủ tục con trong setTimeout bị chuyển thành global đúng không. Tuy nhiên, hãy viết lại đẹp hơn chút thế này.

```js
obj = {
    a : 1;

    delayLog: function() {
        setTimeout(function(){
            console.log(this.a);
        }.bind(this), 1000);
    }
}
```

Hell yeah, no more that = this (Nếu không hiểu, đọc lại phần đầu bài viết, nếu vẫn chưa hiểu , viết bản kiểm điểm, mai bảo bố mẹ đến gặp tôi)
Đẹp hơn nhiều nhỉ, nhưng vẫn có thể đẹp hơn

```js
obj = {
    a : 1;

    delayLog: function() {
        setTimeout(() => {
            console.log(this.a);
        }, 1000);
    }
}
```

Vậy arrow function chỉ đơn giản là một thủ tục con được gán sẵn ngữ cảnh là ngữ cảnh của bố nó. Thật tiện lợi, hơn nữa chúng ta đã có thể phân định rõ ràng giữa phương thức và thủ tục con, đúng không.

### Một số đặc điểm của arrow function

- Luôn luôn được gán sẵn ngữ cảnh.

- Không được sử dụng là constructor, tức không thể `new` được, bởi arrow function đã có ngữ cảnh sẵn, bạn không thể tạo một ngữ cảnh mới và gán cho nó được.

- Có thể có tên, nhưng chỉ có thể truy cập trong bản thân hàm

```js
var add = named(a, b) => a + b;

console.log(named);
// ReferenceError: named is not defined
```

OK, vậy là chúng ta đã duyệt lại một vòng về hàm trong Javascript và giới thiệu được một thứ mới. Hy vọng giúp các bạn hiểu rõ hơn chút xíu về JS, một ngôn ngữ dễ mà chẳng dễ chút nào.

Hiu hiu
![Js the good parts](/assets/images/2015/05/wR3ZxfB.jpg)
