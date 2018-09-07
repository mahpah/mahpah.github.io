---
title: Extract critical CSS
permalink: extract-critical-css
layout: post
---

Bây giờ chỗ nào chúng nó cũng đòi hỏi load async async. FIle css thì càng lúc càng to, vứt hết vào trong head thì quá trình render page sẽ bị block, làm thằng người dùng cảm giác trang web chậm rất khó chịu, rồi chúng nó chửi dev không ra gì. Vậy nên mấy thằng dev lại phải nghĩ ra cách là inline các CSS quan trọng, còn cái file css thì dùng javascript để load sau. Trong [bài viết này (#)](http://kipalog.com/posts/Render-Blocking-CSS), @KawaiNT cũng có nhắc ở khổ thơ cuối. Có điều ngồi phân tích xem CSS nào quan trọng thì mất công hơn việc trông ảnh hồ sơ mà đoán được đại biểu nào đủ đức đủ tài. May thay có anh @addyosmani đã viết một cái tool để extract hộ chúng ta, tên là [`critical`](https://github.com/addyosmani/critical).

Sử dụng rất đơn giản, chỉ việc cài đặt qua npm

```
npm i critical
```

Rồi viết 1 script js nhỏ, chỉ đến file html cần bóc tách

```js
const critical = require('critical');

critical.generate({
    inline: true,
    base: 'test/',
    src: 'index.html',
    dest: 'index-critical.html',
    width: 1300,
    height: 900
});
```

Chạy script đó

```
node extract.js
```

Thế là xong, file out put sẽ được inline đoạn css đó, kèm theo luôn hàm `loadCss` tiện dụng. Quá nhanh, quá nguy hiểm.

---
**NOTE:** 

- Critical CSS thường là đoạn css tối thiểu để hiển thị phần đầu tiên mà người dùng trông thấy, góp phần tạo ảo tưởng về tốc độ tải trang web của chúng ta.

-  Tool này còn nhiều config khác, xin tham khảo README
