---
permalink: javascript-promise-part-2
title: Javascript promise part 2
tags: javacscript es promise tech
---

> Bài trước chúng ta đã xem xét tác vụ không đồng bộ và có định nghĩa promise, là một đối tượng thenable là kết quả của tác vụ không đồng bộ. Bài này tôi sẽ kể một vài trường hợp sử dụng và tác dụng của promise.
> *Bài này cũng đã được post trên [kipalog](http://kipalog.com/posts/Javascript-promise--phan-2)*

Tiếp tục loạt bài về promise, như tôi đã hứa ở cuối [bài trước](http://mahpahh.com/javascript-promise/). Hả? Không, còn mỗi bài này nữa thôi, tôi thề.

Bài trước chúng ta đã xem xét tác vụ không đồng bộ và có định nghĩa promise, là một đối tượng thenable là kết quả của tác vụ không đồng bộ. Bài này tôi sẽ kể một vài trường hợp sử dụng và tác dụng của promise.

À cho tí thời gian kể chuyện đã. Hôm qua tôi và một số người bạn vào quán cafe chém gió. Sau khi gọi đồ uống cô nhân viên liền đưa cho một cái cục, khi nào nó sáng lên thì đến lấy đồ. Đây chính là một ví dụ về promise. Bạn yêu cầu đồ uống chính là việc bạn gọi một tác vụ không đồng bộ, bởi tất nhiên bạn không dừng tất cả mọi việc và chờ đồ uống làm xong, bạn sẽ đi làm việc khác. Sau đó có 2 trường hợp xảy ra:

- Bạn đăng ký một callback: khi nào xong em gọi anh nhé. Với cách này, em nhân viên phải nhớ callback tương ứng để làm.
- Bạn nhận cái cục đen đen, khi nào xong cái cục đó nó thông báo thì bạn tự quyết định sẽ làm gì tiếp theo.

*Hết phần kể chuyện*

## 1. Đối mặt với callback hell
Kể chuyện tiếp, khi bạn yêu cầu cô nhân viên ghi order, khi nào xong mang đồ uống tới cho tôi, khi đó cô ấy nhận một callback. Đến lượt mình, cô ấy lại đăng ký với anh pha chế, khi nào làm xong gọi em. Cô ghi số điện thoại của mình kẹp vào dưới ly (vì tôi đẹp trai :lol:), rồi ủy nhiệm callback khác cho anh chàng chạy bàn, mang cái này cho anh kia, *nếu* ảnh hỏi gì thì qua đây bảo chị. Vậy chỉ một công việc đơn giản chúng ta đã dùng đến 3 callback và bạn sẽ nhanh chóng mất kiểm soát với đống callback lồng nhau đó. Nếu viết bằng promise bạn sẽ thu được 1 thứ tương tự thế này.

```js
asyncThing1().then(function() {
  return asyncThing2();
}).then(function() {
  return asyncThing3();
}).catch(function(err) {
  return asyncRecovery1();
}).then(function() {
  return asyncThing4();
}, function(err) {
  return asyncRecovery2();
}).catch(function(err) {
  console.log("Don't worry about it");
}).then(function() {
  console.log("All done!");
});
```

Rất dễ hiểu và dễ bắt lỗi đúng không.

## 2. Phân tách chức năng
Separation of concerns, tôi chả biết từ tiếng Việt tương đương là gì. Thôi, cứ cho là thế đi.
Ví dụ với đoạn mã sau

```js
var db = createDatabaseConnection();
function getUser (request, response) {
	db.get(request.params.user_id, function getDataDone(error, data) {
    	if(!error) {
        	response.json(data);
        }
    });
}
```

Một đoạn mã rất quen thuộc cho những ai đã dùng nodejs. Tuy nhiên ở đây xảy ra 2 vấn đề:

1. response là đối tượng của router, hay controller gì đó, nhưng lại được sử dụng bởi phương thức của db thuộc về tầng model (tôi nghi ngờ kiến thức của tôi về MVC, xin lỗi, các bạn bỏ quá cho). Tóm lại là db phải thao tác với thứ không thuộc về nó, đúng là làm khó nhau mà.

2. Bạn phải mở tài liệu ra để xem callback của hàm db.get nó nhận những tham số nào, có đúng là error và data không, hay là error ở sau data. Chuyện này sẽ không xảy ra với promise. Bạn luôn biết chắc callback của then chỉ nhận 1 tham số duy nhất.

> Promise như là mức trừu tượng hóa của tác vụ không đồng bộ.

Câu này nghe hơi khó hiểu phải không. Tôi thừa nhận. Ý nghĩa của nó có thể là, promise đại diện cho tác vụ không đồng bộ, chúng ta có thể mang nó đi làm gì ở đâu đó.vv.. Nhờ vậy chúng ta giải quyết được 2 vấn đề: vấn đề thứ nhất và vấn đề thứ 2 (LOL). Xem lại đoạn mã ví dụ dùng promise:

```js
var db = createPromisifiedDatabaseConnection();
function getUser (request, response) {
	var getDataPromise = db.get(request.params.user_id);
    getDataPromise.then(function(data) {
        response.json(data);
    });
}
```
Bằng cách `db.get` trả lại một promise, luồng điều khiển đã được trả lại cho controller thay vì nằm trong phương thức của model như trước đây. Mặc khác, nếu anh chàng viết thư viện db có chỉnh sửa gì đó cũng không liên quan đến tôi, miễn là anh ấy vẫn đưa cho tôi promise, thế là được. Khỏe re, đúng không.

*Ngoài lề*: Tôi viết bài này chỉ vì comment này.
![](/content/images/2015/07/promise.jpg)
Tôi nghĩ anh ta đã hiểu lầm ở đâu đó nên tôi muốn viết một chút để giải thích lại. Có thể các bạn nghĩ tôi thật nhỏ nhen và máu ăn thua, nhưng tôi chỉ nghĩ là nếu tôi có thể giải thích tốt hơn, tại sao tôi không làm điều đó, thay vì việc chê bai? Tôi sẽ kể một câu chuyện khác về quan điểm này vào lúc khác (lại kể chuyện, dạo này hơi bị thích kể chuyện :smile:). Tuy nhiên vì [90% mọi thứ trên đời là vớ vẩn](http://mahpahh.com/mot-vai-loai-dao-cao-pho-bien/) nên thôi, đọc tiếp đi các bạn :))

## 3. Xử lý luồng điều khiển song song
Javascript chỉ chạy trên một luồng, điều này khiến cho việc sử dụng các tác vụ không đồng bộ trở nên quan trọng, nhưng từ đó thì các luồng điều khiển cũng phức tạp hơn. Ví dụ việc nấu cơm, nấu canh, rán trứng... có thể làm song song (nếu bạn khéo léo, tất nhiên rồi), nhưng phải làm xong hết cả chỗ đó mới bắt đầu bữa ăn được. Rồi lại có những việc dù chạy song song nhưng chỉ cần một thứ xong là ok rồi. Đừng lo, promise giải quyết hết. Chúng ta có 2 hàm static của class Promise:

- `Promise.all(arr: Iterable )`: trả lại 1 promise, fulfill khi tất cả các promise trong arr được fulfill, reject khi một trong các promise bị reject. Iterable nôm na là một thứ có thể lặp được, hôm nào mát giời tôi kể tiếp nghen, hôm nay cứ tạm hiểu là mảng đi ha.

- `Promise.race(arr: Iterable)`: tương tự, nhận vào một mảng (Iterable) và fulfill hay reject ngay khi bất kỳ một promise nào trong mảng fulfill hay reject.

Gì cơ? Tuần tự á? Chẳng phải chúng ta có chaining promise rồi sao? Hoy đi nha.

## 4. Xử lý ngoại lệ
Sử dụng `catch` như tôi đã nói trong phần 1. Cũng đơn giản như đan rổ,  nhể.
Ngày xửa ngày xưa promise còn có thêm phương thức finally, giống như try catch ấy, nhưng promise/A+ giờ đã không còn nữa. Lúc đầu tôi cũng thấy hơi bối rối, nhưng nhìn kỹ thì đúng là finally là thừa, bởi catch cũng trả lại một promise, thế là chỉ cần chain thêm 1 then nữa sau catch là có finally rồi, hề hề.

```js
function errorProne () {
  var promise = new Promise(function(resolve, reject) {
  	// 50% cơ hội xảy ra lỗi
    return Math.random() > 0.5 ? resolve() : reject();
  });
  return promise;
};

errorProne()
  .then(function() {
    console.log('ok');
  })
  .catch(function() {
    console.warn('recover');
  })
  .then(function (argument) {
    console.log('finally');
  });
```

Ví dụ trong phần 1 cũng là một luồng điều khiển với phần xử lý lỗi lằng nhằng, nếu phải viết với callback chắc tôi phải nhờ ai viết hộ cho chắc ăn.

![](/content/images/2015/07/promise-chain-1.svg)

Cái hình này tôi chôm ở [đây](http://www.html5rocks.com/en/tutorials/es6/promises/) đấy, hi hi.

Một lưu ý nữa là catch được gọi ngay cả khi bạn tung ra một ngoại lệ, như này này:

```js
aPromise.then(function() {
	// ngoại lệ sẽ được tung ra
	return JSON.parse('not a valid json');
}).catch(function(error) {
	// đừng lo, catch sẽ bắt được
    return {
    	message: 'You suck';
    };
}).then(function(data) {
	// keep going, man
})
```

Đấy, ngắn gọn chỉ có thế thôi, tất cả tài liệu về Promise có thể xem ở đây: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise. Chúc các bạn cuối tuần vui vẻ.
