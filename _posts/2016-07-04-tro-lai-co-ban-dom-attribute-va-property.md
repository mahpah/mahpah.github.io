---
title: "[Trở lại cơ bản] DOM attribute và property"
permalink: tro-lai-co-ban-dom-attribute-va-property
layout: post
---

> Trong loạt bài **Trở lại cơ bản** này mình xin trình bày lại các khái niệm cơ bản về tất cả mọi thứ mình đã từng được học bằng ngôn ngữ đơn giản nhất có thể. Bài viết này, nằm trong mục **Web development** chủ yếu giải thích về các khái niệm xung quanh HTML và DOM.

## HTML
Như các bạn đã biết HTML là ngôn ngữ đánh dấu siêu văn bản. Nó là một XML namespace, hay hiểu đại khái là tập các thẻ XML mà các trình duyệt quen mặt. *Chúng ta nhìn vào một file HTML thì nhìn thấy text, còn trình duyệt nhìn vào sẽ thấy cây DOM.*

## DOM
Viết tắt của Document Object Model, DOM là một cấu trúc dạng cây, cho trình duyệt biết cấu trúc của văn bản, từ đó thể hiện dưới dạng hình ảnh trực quan. Ví dụ, cho đoạn mã HTML như sau

```html
<section>
  <h1>Title</h1>
  <p>Content</p>
</section>
```

trình duyệt, hay máy xử lý siêu văn bản, biết rằng có một đoạn văn bản có tiêu đề 'Title' và nội dung là 'Content'.

*Như vậy, một siêu văn bản (hyper text document) được thể hiện dưới 2 dạng: Trình xử lý văn bản thông thường sẽ nhìn thấy như mã HTML, còn trình xử lý siêu văn bản, hay trình duyệt, sẽ nhìn thấy như cây DOM.*

Không chỉ dừng lại là một cấu trúc dữ liệu, nói đến DOM ta còn hiểu nó là một giao diện (programming interface) cho phép thao tác với các phần trong văn bản. Ví dụ đoạn mã sau, viết bằng Javascript, đặt nội dung của đoạn văn là 'nội dung đoạn văn'

```js
var paragraphs = document.getElementsByTagName('P');
var firstParagraph = paragraphs[0];
firstParagraph.innerText = 'Nội dung đoạn văn';
```
Đáng lưu ý ở đây, đối tượng `document` (có phương thức `getElementsByTagName()`) không phải là một đối tượng sẵn có trong Javascript. Đây là một đối tượng của DOM, chính là nút gốc của cây DOM.

Từ ví dụ trên, ta thấy *DOM thể hiện và lưu giữ cấu trúc của văn bản, còn javascript được dùng để truy cập và sửa đổi cấu trúc này. Web (XML) API được hiểu là giao diện cho Javascript truy xuất DOM.* Đến nay javascript gần như là con đường duy nhất để làm việc này. Vì sự gắn kết chặt chẽ như vậy nên các đối tượng DOM cùng các phương thức của chúng thường bị hiểu lầm là đối tượng và phương thức của JS.

> Web API = DOM + Javascript

> Web API là tập đối tượng và phương thức của DOM thể hiện dưới dạng các đối tượng Javascript.

## DOM Attributes

Như đã nói, DOM là một cấu trúc dạng cây, đã là cây thì phải có các nốt (node). Cây DOM có 4 dạng nốt. Cụ thể xem xét cây DOM có thể hiện HTML như sau;

```html
<!DOCTYPE html>
<html>
  <body width="200px">
    This dummy
  </body>
<html>
```
Cây DOM có sơ đồ như sau
```
document
|__ documentElement (HTML)
   |__ bodyElement (BODY)
      |__ widthAttribute (value = 200px)
      |__ textNode (CDATA = 'This dummy')
```

- document là nút gốc, điểm bắt đầu xây dựng cây DOM
- element: nút phần tử, được phép có các nhánh con. Nút phần tử documentElement thường được đồng nhất với nút document. Theo mình biết hiện chỉ có Firefox phân biệt 2 nút này.
- attribute: nút thuộc tính, là nút con của nút phần tử, đây là lá, không có nhánh
- text: nút văn bản, đây là lá, không có nhánh. Cho biết nội dung có thể đọc (human readable), bởi đã là văn bản tất nhiên phải có nội dung gì đó để đọc.

Như vậy, *`attribute` là thuộc tính của các phần tử DOM*. Attribute cho biết các đặc điểm của phần tử DOM đó.

## Property
Như đã đề cập ở trên, các phần tử DOM được ánh xạ thành các đối tượng Javascript khi ta sử dụng Js để thao tác với DOM.

```js
var paragraphs = document.getElementsByTagName('P'); // (1)
var firstParagraph = paragraphs[0]; // (2)
```

Phần tử `<P>` đầu tiên của văn bản được ánh xạ thành đối tượng JS được trỏ bởi biến `firstParagraph`. (Chú ý `getElementsByTagName()` trả lại NodeList, là một cấu trúc dữ liệu tương tự 1 mảng các Node, tức là có thuộc tính length, và truy xuất thông qua chỉ số.)

Phần tử DOM được ánh xạ thành đối tượng Js, là đối tượng thì sẽ có thuộc tính và phương thức. Thuộc tính của đối tượng Js, được gọi là property. Vậy:

> Attribute là thuộc tính của phần tử DOM. Property là thuộc tính của đối tượng Javascript.

**Lưu ý**

- *Attribute của DOM element và property của Js object tương ứng không có quan hệ 1 - 1*. Ví dụ, attribute `class` được ánh xạ thành property `className`, attribute `for` được ánh xạ thành `htmlFor`

- Để tương tác với attribute, dùng phương thức `getAttribute(name)` và `setAttribute('name', 'value')`. Để thao tác với property, dùng dot notation (`element.property = value`)

- Thay đổi property không chắc chắn làm thay đổi attribute và ngược lại.
Ví dụ, attribute `value` của phần tử `<input type="text" value="type to search"/>`
Ban đầu, giá trị trong input được đặt là 'type to search', propery tương ứng cũng vậy. Sau khi người dùng nhập dữ liệu, 'abc' chẳng hạn, thì property sẽ được thiết lập thành 'abc', tuy vậy, attribute vẫn không thay đổi

```js
console.log(input.getAttribute('value'));
// type to search

console.log(input.value);
// 'abc'
```

## Kết luận
Dù tên giống nhau (ít nhất là khi dịch ra tiếng ta), nhưng attribute và property thuộc về 2 thế giới hoàn toàn khác nhau. Cần nắm rõ để tránh các hiểu lầm không cần thiết.

## Bonus

### Framework hiện đại
`JSX` và angular2 template sử dụng property thay cho attribute. Ví dụ:

- JSX
```html
<MyInput className="input-class" htmlFor="username"/>
```

- Angular2
```html
<input [value]="userName"></input>
<!-- gắn giá trị của biến userName vào *property* value của input, để chỉ định việc gán vào attribute, dùng attr -->

<input [attr.value]="userName"></input>
```

### Phần tử form

Các property của form trỏ đến input với name tương ứng nếu có. Ví dụ

``` language-html
<form name="leForm">
    <input type="text" name="name"> <!-- (1) -->
    <input type="text" name="user" value="ggg"> <!-- (2) -->
</form>
```

Khi này `form.user` sẽ trỏ đến `input` (2). Điều này cũng tạo ra một side effect, đó là `form.name` sẽ không còn là "leForm" nữa mà trỏ đến `input` (1) [^n]. Vì vậy để lấy tên form một cách an toàn, hãy lấy giá trị attribute 'name' của nó.

---

[^n]: Side effect này không xuất hiện ở Internet Explorer. Mình chưa thử với Edge.


*Cross-posted on [kipalog](http://kipalog.com/posts/Tro-lai-co-ban--DOM-attribute-va-property)*
