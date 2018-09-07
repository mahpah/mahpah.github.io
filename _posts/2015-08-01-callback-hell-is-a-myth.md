---
permalink: callback-hell-is-a-myth
layout: post
tags:
  - es6
  - tech
  - async
title: Callback hell is a myth
---

> Bài gốc http://thecodebarbarian.com/2015/03/20/callback-hell-is-a-myth, viết bởi Valeri Karpov. Hoàng Hà chuyển ngữ.
>
> **Lưu ý:** Văn phong phỏng theo cán bộ Đảng *chỉ* với mục đích vui vẻ.

Thưa các đồng chí, trong giai đoạn Javascript phát triển như vũ bão hiện nay, có thể thấy rõ thái độ chống đối "địa ngục callback" xuất hiện dày đặc từ nhiều blogger JavaScript và các đồng chí làm công tác phát triển mã nguồn mở. Có vô số mô-đun, như async, zone, và các thư viện promise mang đến hy vọng sẽ cứu các đồng chí khỏi con quái vật callback đang đe dọa miếng cơm manh áo của các đồng chí. Thậm chí, tôi cũng đã thử nghiệm framework async của riêng mình. Tuy nhiên, qua thực tiễn tôi nhận thấy địa ngục callback là một hiện tượng chứ không phải là bản chất. Nếu các đồng chí không nhận ra các vấn đề cơ bản ẩn sau đó, việc sử dụng một thư viện như async sẽ chỉ giúp trì hoãn các hậu quả tất yếu.

## Các vấn đề tiềm ẩn là gì?

Thưa các đồng chí, lần đầu tiên sử dụng module Async, tôi cảm thấy như giấc mơ trở thành sự thật. Hàm waterfall() trở thành người bạn tốt nhất mới của tôi. Nhưng khi đoạn mã phức tạp hơn và nhiều đồng chí khác cùng tham gia xây dựng, chúng trở nên càng lúc càng rối rắm. Rất nhanh sau đó tôi đã sử dụng async.series() và async.parallel() bên trong waterfall() và mã thậm chí còn trở nên khó sửa hơn cả trước khi tôi sử dụng async. Nhưng ít nhất tôi không có địa ngục callback, phải không?

Không đúng. Vấn đề của tôi không nằm ở các callback lồng nhau, vấn đề là hàm của tôi đã kiêm nhiệm quá nhiều công tác. Async giúp tôi giấu vấn đề này xuống dưới tấm thảm trong một thời gian, nhưng việc tổ chức mã có độ hợp lý chưa cao cuối cùng đã quay trở lại tấn công tôi. Async và promise đã được sử dụng quá thường xuyên như là một thuốc chữa bách bệnh để chữa những đoạn mã cồng kềnh và thiết kế phần mềm tệ hại.

## Tại sao tôi yêu Callback

Nhiều đồng chí luôn bối rối khi tôi nói tôi thích NodeJS bất chấp thực tế là tôi đồng ý (ít nhất là trên tinh thần, chứ không phải ở con số chính xác) với câu châm ngôn (tức là câu nói châm biếm ấy mà :v ) của đồng chí Linus Torvalds "nếu các đồng chí cần lùi đầu dòng nhiều hơn 3 mức, đồng chí đang quay như chong chóng, và nên sửa lại chương trình". Một phần lý do tại sao tôi thích NodeJS từ đầu là việc viết callbacks chỉ gây ra mức tổn thương nhất định, và tôi cho thế là vừa phải.

Giống như nỗi đau do các đồng chí bị bỏng tay có nghĩa là đồng chí vừa nhấc nhầm một nồi nước nóng trong nhà bếp, hoặc đau đầu vào buổi sáng là lời cảnh báo đồng chí đã quá chén trong bữa liên hoan đêm qua, nỗi đau đớn gây ra bởi 10 lớp callbacks lồng nhau trong một hàm là dấu hiệu cho tôi biết chương trình đã đến lúc phải cải tổ lại. Sự khó chịu khi viết callback chỉ vừa đủ để khiến các đồng chí cân nhắc thêm về sự cần thiết của việc thêm một thao tác nhập xuất dữ liệu hoặc một hướng thiết kế tốt hơn. Tôi vẫn thích sử dụng một framework như async hoặc promise để giữ gìn sự trong sáng của mã. Nhưng, nếu các đồng chí đang trông chờ vào promise hoặc async.waterfall () cứu vớt bạn khỏi đống code như rau muống, thì vấn đề nằm ở thiết kế phần mềm của các đồng chí hơn là ở khung lập trình không đồng bộ.

## Hướng dẫn sử dụng callback một cách thiếu hiệu quả nhất

Chúng ta hãy xem xét một vài ví dụ về pyramid of doom tôi lấy từ Google images. Dưới đây là một ví dụ về "callback hell" điển hình mượn từ một bài đăng trên medium.com [^n].

![callback hell](/assets/images/2015/08/callback-hell1.png)

Nếu các đồng chí bỏ qua nhiều vấn đề rõ ràng khác của đoạn mã này, các đồng chí sẽ thấy rằng callbacks không phải là vấn đề ở đây, mà là do thiếu một sự trừu tượng hóa đúng đắn. Xem xét cẩn thận: liệu có thật ghế cần phải được lưu sau khi bàn đã được lưu? Hơn nữa, có cấu trúc lập trình cho phép các đồng chí không cần liệt kê tất cả các Items một cách tường minh, chúng được gọi là cho vòng lặp. Nếu đồng chí sử dụng mongoose, đồng chí sẽ chỉ cần sử dụng hàm `create()`. Thậm chí không cần mongoose, `async.parallel ()`, hoặc `promise.all ()`, các đồng chí vẫn có thể viết lại hàm này một cách sáng sủa hơn.

```js
function create(items, callback) {
  var numItems = items.length;
  var done = false;
  for (var i = 0; i < items.length; ++i) {
    items[i].save(function(error) {
      if (done) {
        return;
      }
      if (error) {
        done = true;
        return callback(error);
      }
      --numItems || callback();
    });
  }
}
```
Một giải pháp thay thế sử dụng đệ quy đơn cho một giải pháp ngắn gọn hơn (12 dòng code, 4 rẽ nhánh) mà vẫn đạt được mục đích như mã ban đầu. Đây chỉ làm một ví dụ khác cho thấy các đồng chí phát triển viên trẻ nên bớt thời gian làm ứng dụng iPhone đặng mà thực hành thuật toán[^n].

```js
function create(items, callback, index) {
  index = index || 0;
  if (index >= items.length) {
    callback();
  }
  items[i].save(function(error) {
    if (error) {
      return callback(error);
    }
    create(items, callback, index + 1);
  });
}
```

Một ví dụ khác tôi đưa ra, phức tạp hơn, xuất phát từ bài trình bày này [^n] về tranh cãi địa ngục callback với async. Bấm vào hình ảnh để phóng to thêm một chút, nếu các đồng chí đủ can đảm.

<a href="http://mahpahh.com/assets/images/2015/08/EGGwaXP.png" title="callback hell" target="_blank">
![http://mahpahh.com/assets/images/2015/08/EGGwaXP.png](/assets/images/2015/08/EGGwaXP.png)
</a>
Trường hợp này là một ví dụ cổ điển cho thấy một hàm phải đảm nhận quá nhiều trách nhiệm, hay còn được gọi là mô hình cá nhân kiệt xuất chủ quan duy ý chí hết sức nên tránh [^n]. Như các đồng chí đã thấy, hàm này kiêm nhiệm rất nhiều chức năng.

- Đăng ký một việc trong hàng đợi công việc
- dọn dẹp hàng đợi công việc
- đọc và ghi dữ liệu từ S3 với các tùy chọn được giữ cố định trong mã
- thực hiện hai lệnh shell
- vv vv

Quá nhiều chức năng và quá nhiều điểm có thể phát sinh lỗi mà hầu hết là bị bỏ qua. Promise và async có các cơ chế để giúp các đồng chí kiểm tra lỗi một cách ngắn gọn hơn, nhưng vấn đề là, nếu đồng chí đã không kiểm tra lỗi trong callbacks, đồng chí cũng sẽ bỏ qua chúng ngay cả khi đồng chí sử dụng promise.catch () hoặc async.waterfall(). Địa ngục callback chỉ là điểm hạn chế nhỏ nhất của cái hàm này.

Kể cả các đồng chí có viết bằng Python hay Ruby, hàm này vẫn là một cơn ác mộng cho việc kiểm tra và sửa lỗi. Vậy các đồng chí phải suy nghĩ biện pháp làm thế nào để cái hàm này trở nên gần gũi, dễ hiểu, dễ kiểm tra, giám sát hơn.

Trước tiên, các đồng chí nên bắt đầu bằng cách trừu tượng hóa phần mã mà quản lý beanstalkd - mã mà hiện nay đang làm công tác quản lý hàng đợi lại nằm trong cùng khu vực xử lý chuyên môn nghiệp vụ. Cần phải chuyên môn hóa, các đồng chí ạ, không thể khác được. Đoạn lùi đầu dòng lớn nhất trong đoạn mã lên tới 30. Nếu các đồng chí tách thành một hàm riêng phụ trách đoạn từ dòng 62 đến 92 thì có thể cắt giảm lùi đầu dòng xuống còn 20.
Thêm một hàm cho việc tải đối tượng từ S3, giải nén, đặt vào thư mục (tự tạo thư mục này nếu chưa tồn tại) sẽ giảm lùi dòng tối đa xuống còn 14. Đấy, thế và vì là mkdirs có thể tạo thư mục đệ quy, các đồng chí có thể bỏ phần gọi fs và để hàm xử lý tải file ở trên làm việc tạo thư mục, nhờ đó giảm thêm một bậc thụt đầu dòng nữa.
Cuối cùng, các đồng chí tạo ra một hàm xử lý việc đọc tập tin và tải nó lên S3 và sẽ giảm lùi đầu dòng xuống chỉ còn 10 (5 x 2).

Bằng việc phân chia chức năng của hàm này cho một vài hàm chuyên trách, các đồng chí đã giải quyết được vấn đề callback hell. Nói cách khác, ví dụ callback hell này là ngụy tạo - không có ai cho phép một cán bộ viết phần mềm chuyên nghiệp viết những đoạn mã như thế này.

## Kết luận

Callback và callback hell đã nhận được những lời đánh giá không tốt từ phía cộng đồng NodeJS. Tuy nhiên, qua thực tiễn cho thấy, callback hell thường là có ích. Nó đóng vai trò như một cơ chế tự thẩm tra mã, qua đó cho chúng ta biết cần phải duy trì mã gọn gàng, trong sáng, tập trung, dễ tái sử dụng, chứ không được viết các đoạn code rối rắm, dài dằng dặc, duy ý chí. Nó giúp ngăn ngừa các đồng chí khỏi việc lơ là kiểm tra lỗi. Trong thời gian tới, trước khi các đồng chí gọi async.waterfall(), tôi mong các đồng chí suy nghĩ kỹ hơn để tái cơ cấu cho đúng chỗ.

Chào thân ái và quyết thắng.

**UPDATE**
[Using async.queue(), LOL](http://nodejsreactions.tumblr.com/post/104084537714/using-asyncqueue)
![image](/assets/images/2015/08/mWPefaQ.gif)

---
**Phụ lục**
[^n]: [To Survive the Pyramid of Doom…](https://medium.com/@mlfryman/to-survive-the-pyramid-of-doom-4e8ce4fb5d6b)

[^n]: https://sites.google.com/site/codetrick/superprimerib

[^n]: [Building a fast web scraper and parallelized work queue with node.js and async](http://slides.com/michaelholroyd/asyncnodejs#/)

[^n]: [God object on Wikipedia](https://en.wikipedia.org/wiki/God_object)
