---
title: Vòng lặp sự kiện trong javascript
permalink: vong-lap-su-kien-trong-javascript
---

Vòng lặp sự kiện trong javascript (& nodejs, iojs)

## Ví dụ:

Xem xét ví dụ sau nhé

``` language-javascript
function logger() {
  console.log('caller');
  setTimeout(iWait, 0);
  lastFunc();
}

function iWait() {
  console.log('i fired');
}

function lastFunc() {
  console.log('last line');
}
```

Console sẽ log ra như thế nào khi chạy hàm `logger`?

```
caller
last line
i fired
```

Mặc dù setTimeout với thời gian bằng 0 nhưng dòng ‘i fired’ vẫn được log ra sau cùng, tại sao lại vậy? Tại sao chờ 0s không đồng nghĩa với việc thực hiện ngay lập tức?

## Cost of I/O blocking (hình)

Hình dưới đây cho biết thời gian đọc/ghi dữ liệu từ các nguồn khác nhau, (L1, L2 là các bộ nhớ nằm sẵn trong vi xử lý (kiến trúc máy tính))
![The cost of I/O](/assets/images/2015/04/io-cost.png)
I/O cost, source: [mixu](http://blog.mixu.net/2011/02/01/understanding-the-node-js-event-loop/)
Đừng bận tâm cycle là gì, đơn giản gọi là đơn vị thời gian thôi. Như vậy việc chờ đợi các tác vụ vào ra là một lãng phí rất lớn của chương trình.

##Vòng lặp sự kiện

Có một vài cách để không phải chờ đợi I/O, như tạo một tiến trình mới hoặc tạo luồng mới (đây là cách Apache server xử lý request, và nó sẽ ngốn hết RAM của bạn, Chúa ơi) (Khi viết đến đây thì RAM máy tôi lăn quay ra chết, đây hoàn toàn là sự thật, tin hay không tùy bạn)

Như ta đã biết, javascript chạy đơn luồng, vậy làm thế nào để thoát khỏi I/O blocking? Đó là sử dụng callback pattern. Việc này giúp ta có thể thực hiện những việc khác trong khi chờ tác vụ không đồng bộ hoàn tất.

Để thực hiện được thứ ma thuật này, Javascript sử dụng vòng lặp sự kiện. Các bạn có thể tượng tượng đến một con dê trắng đang đi trên đường thì một con dê đen (tất nhiên khác con dê trắng) đang đi về phía nó, tất nhiên nó phải tránh, thế nên nó vẫn tiếp tục vừa tiến tới và vừa dịch sang bên phải một chút. Việc con dê đen tiến về phía nó (nhiều khả năng là để cà khịa) được gọi là sự kiện, còn việc con dê trắng tránh là tác vụ, hay callback ương ứng. Trong con dê trắng có một vòng lặp sự kiện gồm có sự kiện và tác vụ tương ứng, mô tả bằng lời: "*Khi* gặp vật cản *thì* né". Gặp vật cản là sự kiện, né là tác vụ tương ứng.

Javascript cũng vậy, runtime của nó chứa một hàng đợi, mỗi khi có một sự kiện xảy ra nó sẽ đưa một lời nhắc vào hàng đợi, *vòng lặp sự kiện giống như một cái máy gắp các lời nhắn trong hàng đợi*. Khi gắp được một mẩu giấy nhắn xem callback (tác vụ) tương ứng với lời nhắn đó, rồi đặt nó vào stack. Các tác vụ trong stack được thực hiện, đến khi nào stack trống (ta gọi là hết một “tick”) thì nó sẽ nhặt mẩu giấy nhắn tiếp theo để thực thi (next tick).

![Vòng lặp sự kiện, hình mang tính minh họa](/assets/images/2015/04/default.svg)
Vòng lặp sự kiện nguồn: [MozillaDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)

Có bạn sẽ cảm thấy bối rồi về câu “đặt nó vào stack” và “đến khi stack trống”. Uhm, có thể xem stack là một cái bình chỉ có 1 miệng, bạn cho một vài cái bánh vào, cái nào ở trên thì được lấy ra trước. Tức là cái nào bỏ vào sau sẽ được ăn trước, nghe có vẻ bất công nhưng trong một số trường hợp điều đó là cần thiết. Ví dụ thứ tự thực hiện các hàm được mô tả như một stack. Khi một hàm được gọi, nó (đúng hơn là con trỏ hàm chỉ đến nó) được đặt vào stack, còn khi hàm trả về thì nó được lấy ra khỏi stack. Ví dụ hàm:

```js
function f() {
  var a = g();
  return
}
```

Hàm f được đặt vào stack, khi đang thực thi, nó gọi hàm g, g được đặt vào stack, chồng lên trên f. Như vậy khi nào hàm g thực hiện xong, f mới được tiếp tục, đó là đồng bộ. Một số việc bắt buộc phải làm như vậy, ví dụ không nên cho chuối vào mồm trước khi bóc vỏ.

Quay lại ví dụ mở đầu. `setTimeout` sau một thời gian, ở đây là 0s sẽ đặt một lời nhắn vào hàng đợi. Tuy nhiên lúc này trong stack vẫn còn hàm `logger` chưa return nên lời nhắn đó sẽ không được gắp. Sau đó thực hiện tiếp hàm `logger` thì hàm `lastFunc` được gọi, tiếp tục cho hàm này vào stack, đơn giản sau khi nó log xong thì lại trả về, rồi `logger` trả về. Lúc này lời nhắn của setTimeout mới được đọc là `iWait` mới được thực thi. *Vậy chốt lại các bạn nên nhớ nếu ai đó bảo tôi làm ngay đây thì các bạn nên tiếp tục đợi đến khi hết stack người ta đang làm dở. Trong khi đó bạn hãy đi thực hiện các công việc khác thôi.*
