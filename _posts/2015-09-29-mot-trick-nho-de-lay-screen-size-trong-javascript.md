---
title: Trick  nhỏ để lấy screen size trong javascript
permalink: mot-trick-nho-de-lay-screen-size-trong-javascript
layout: post
---

Lấy screen size ở đây tôi muốn nói với việc phát hiện xem màn hình browser có kích thước vừa hay to nhỏ thế nào. Cái này quá đơn giản, có gì mà phải trick, bạn có thể gọi ngay `window.innerWidth` rồi so sánh với các mức định trước là ra liền chứ gì.

Hừm, vấn đề ở đây là các hàm hay thuộc tính đó trả về kết quả là pixel (px). Mà cái này lại phụ thuộc độ phân giải, màn hình nhỏ nhưng độ phân giải rất to (retina chẳng hạn) thì có rất nhiều pixel. Do vậy không thể đếm pixel mà biết người dùng đang dùng màn hình to hay bé được. 

Hiện nay, với sự lên ngôi thiết kế đáp ứng (responsive) hay thiết kế tương thích (adaptive design), đơn vị được ưa chuộng là `em`. Nếu ai có thắc mắc thì mình giải thích ngắn gọn 1 em = bề rộng của một ký tự. Như vậy, nếu màn hình của tôi hiển thị 1 ký tự mất 10 pixel theo chiều ngang thì '1 em của tôi' bằng 5px, còn màn hình của bạn retina 1 ký tự rộng 20 pixel thì '1 em của bạn' = 20px. Dùng em để đánh giá độ rộng màn hình rất là tiện lợi, người dùng sẽ điều chỉnh zoom ra zoom vào đến khi nào đọc được chữ thì thôi, thế nên màn hình mà chiều ngang hiện được càng nhiều chữ thì càng to.

**Đếm `em`**

Vậy đếm `em` thế nào, thật may mắn css có "media query" để chúng ta style phần tử dựa vào kích thước màn hình, và chúng hỗ trợ `em`

```css
body::before {
  display: none;
  content: "small";
}

@media only screen and (min-width: 54em) {
  body::before {
    content: "medium"; 
  } 
}

@media only screen and (min-width: 84em) {
  body::before {
    content: "large"; 
  } 
}
```

He he, cách hack ở đây là style cho phần tử ảo body::before và thay đổi content dựa trên độ rộng màn hình. Bây giờ để lấy size chỉ cần đọc thuộc tính content của nó.

```js
function getSize() {
  return window.getComputedStyle(document.body, '::before')
    .getPropertyValue('content')
    .replace(/["']/g, '');
}
```

Chú ý ở đây `getPropertyValue('content')` sẽ trả về nguyên cả chuỗi `"large"` gồm cả dấu nháy nên phải trim nó đi.

Rất đơn giản phải không nào.

---
This post appeared first here and cross-posted on [kipalog](http://kipalog.com/posts/Trick--nho-de-lay-screen-size-trong-javascript).

[Read more tech post](http://mahpahh.com/tag/tech/)
