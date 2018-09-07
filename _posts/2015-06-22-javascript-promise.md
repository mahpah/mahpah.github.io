---
layout: post
title: Javascript promise
permalink: javascript-promise
tags: javascript es6 tech promise
---

> Đây là một trong các concept mới được đưa vào ECMAScript 6. Việc sử dụng chúng rất dễ nhưng để hiểu được thì (đối với tôi) cũng cần kha khá thời gian nên tôi phải lưu lại đây. Bài viết này cũng đã đăng trên [kipalog](http://kipalog.com/posts/Javascript-promise)

## Tác vụ không đồng bộ
Thành thật mà nói tôi không thể cung cấp một định nghĩa cụ thể và chính xác. Tôi chỉ có thể nhận ra một tác vụ là không đồng bộ dựa vào dấu hiệu, đó là một tác vụ sẽ hoàn thành trong tương lai mà tôi không cần chờ đợi trong khi nó được thực hiện. Ví dụ:

``` language-javascript
setTimeout(function whenItCome() {
    console.log('time\'s up ');
}, 1000);
console.log('I go first');

// I go first
// time's up
```
Bạn có thể đọc thêm về cách JS xử lý bất đồng bộ ở [đây](http://mahpahh.com/vong-lap-su-kien-trong-javascript/), nhưng khoan, hãy đọc nó sau (ấy là trong trường hợp bạn không biết).

Vậy mỗi tác vụ không đồng bộ sẽ có một hàm xử lý - "task handler" được thực thi nhiều nhất là một lần khi mà tác vụ đã hoàn tất. Ví dụ đoạn mã ở trên, `setTimeout` là tác vụ, còn hàm `whenItCome` là task handler, hay thường gọi là callback. Nhưng hãy cẩn thận, callback không phải lúc nào cũng là task handler của một tác vụ không đồng bộ. Khi bạn viết `
setTimeout(callback, 10000)` thì bạn muốn callback được gọi sau ít nhất là 10s kể từ khi hàm setTimeout trả về (return). Nhưng khi viết `[1, 2, 3].forEach(doSomeStuff)` thì điều tôi mong đợi khi hàm forEach trả về là `doSomeStuff` đã được thực thi với tất cả các phần tử trong mảng. Do vậy `doSomeStuff` là một callback đồng bộ.

Quay về với tác vụ không đồng bộ, nếu bây giờ trong hàm xử lý, tôi lại thực hiện một tác vụ không đồng bộ nữa

``` language-javascript
setTimeout(function() {
   ajaxCall('/api/abc', function(data){
       // và có khi lại gọi một tác vụ không đồng bộ nữa.
   });
}, 2000);
```

Dễ thấy đoạn mã nhanh chóng trở nên xấu xí và khó đọc, cũng như tiềm ẩn lỗi, mà chúng ta sẽ gọi là pyramid of doom hoặc the callbackline-numbers hell. Hãy xem đoạn code ma quái tiêu biểu sau đây:

```js
function requestHandler(params, callback) {
	var cachedData = 'some data';
    if(Math.random() < 0.5) {
        callback('cached data');
    } else {
    	setTimeout(function(){
        	callback('uncached data');
        });
    }
}
```

Ở đây có 2 trường hợp gọi callback, nhưng ở trường hợp 1 (dòng 4), chúng ta đã gọi callback đồng bộ, tức callback này trả về trước khi requestHandler return, còn ở trường hợp 2 là callback không đồng bộ, callback sẽ trả về sau khi requestHandler return. Đây chính xác là cách Zalgo xuất hiện như Isaac Z. Schlueter đã [mô tả](http://blog.izs.me/post/59142742143/designing-apis-for-asynchrony). Vậy promise được tạo ra để giải quyết vấn đề này.

## Promise là gì?
Hãy chú ý đến các tác vụ không đồng bộ, chúng sẽ trả về giá trị là gì? Void, null, 1, 'abc', gì mà chả được, điều đó chẳng quan trọng, bởi những giá trị nó trả về sẽ được truyền luôn cho callback của nó.
Nhưng điều đó không còn đúng khi promise ra đời.

Promise là một đối tượng, là kết quả của một tác vụ không đồng bộ. Như vậy trong một thế giới lý tưởng, không còn chiến tranh và nghèo đói, tất cả các tác vụ không đồng bộ khi được gọi sẽ trả về một promise.

Khởi tạo promise cách chính thống sẽ như thế này
``` language-javascript
var promise = new Promise (function a(resolve, reject) {
	if(// task complete) {
    	resolve(value);
    } else {
    	reject(new Error());
    }
});
```
Phương thức khởi tạo chỉ có 1 tham số là một hàm thực thi (executor). Về phía hàm thực thi lại nhận 2 hàm callback làm tham số:

-  resolve: khi tác vụ không đồng bộ thành công thì hàm resolve được gọi, tham số của nó là kết quả tính toán của tác vụ không đồng bộ.
- reject: được gọi khi tác vụ thất bại, tham số của nó có thể là một đối tượng lỗi.

*Cả 2 hàm callback này đều là callback không đồng bộ.* Điều đó có nghĩa là chúng được thực thi sau khi executor đã thực thi xong.

Promise theo chuẩn A+ sẽ có đặc điểm như sau:

### 1. Trạng thái
Tại 1 thời điểm, 1 promise sẽ có 1 trong 3 trạng thái: 

- pending: kết quả chưa được xử lý xong, đang chờ.
- fulfilled: tác vụ thực hiện thành công
- rejected: tác vụ không đồng bộ đã thất bại.

2 trạng thái cuối được gọi chung là settled. Tất nhiên promise chỉ có thể chuyển từ pending sang settled, không có chiều ngược lại.

Promise khi khởi tạo sẽ có ngay trạng thái pending, sau khi chuyển sang settled thì giữ nguyên trạng thái đó (fulfilled hoặc rejected). *Promise có thể bị rejected khi ta gọi hàm reject hoặc khi có một ngoại lệ được tung ra.*

Chú ý là một promise chỉ được settled 1 lần duy nhất.

### 2. Promise là thenable
Thenable là cái gì, thenable đơn giản là một đối tượng có phương thức then. Phương thức này sẽ nhận 1 hoặc 2 tham số, đều là các hàm callback.

``` language-javascript
aPromise.then(function onFulfill(value) {
	// do something with value
}[, function onReject(reason) {
	// handle error
}]);

/* dấu ngoặc vuông chỉ ra rằng đoạn code đó là tùy chọn, không phải mảng, thanks @tovin07 */
```

Đúng như tên gọi, onFulfill được gọi khi promise fulfill, hay khi tác vụ không đồng bộ thành công, ngược lại nếu tác vụ thất bại thì onReject được gọi. Callback onReject là tùy chọn, bạn có thể xử lý lỗi, hoặc không làm gì cũng là một cách đối mặt.

Nhưng để thenable có thể là promise thì thenable đó phải thỏa mãn:

- Hàm then lại trả về một promise khác.
- Nếu hàm then trả về một giá trị không thenable thì giá trị đó được chuyển thành một promise được fulfill ngay lập tức.

2 điều trên cho phép một promise được then liên hoàn (chaining promise) một cách tuần tự.

``` language-javascript
aPromise
	.then(function(){
		// do abc
	})
    .then(function() {
    	// do more
    });
```

- Hàm then có thể được gọi nhiều lần. Khi promise được settle thì toàn bộ các callback tương ứng sẽ được gọi.

``` language-javascript
aPromise.then(doThing);
aPromise.then(doOtherThing);
aPromise.then(doFkingOtherMore, catchAFkingError);
```

### 3. Bắt lỗi với `catch`

`catch` cũng là một phương thức của promise giống như then nhưng nó chỉ được dùng để bắt lỗi.

``` language-javascript
aPromise.catch(doThisWhenItRain);

// sẽ giống với
aPromise.then(null, doThisWhenItRain);
```

Hầu như đây chỉ là cách để viết cho đẹp, hoàn toàn không có khác biệt nào giữa 2 cách gọi. Tức là bạn vẫn có thể bắt lỗi liên hoàn hoặc song song giống với then.

## Tạm kết
Uầy, đã hơn nghìn chữ rồi, lằng nhằng phết. Tôi sẽ cập nhật một số ví dụ để làm rõ hơn về promise sau. Tóm lại những thứ cần nhớ ở bày này là:

- Tác vụ không đồng bộ được thực thi mà bạn không cần chờ đợi, khi nó thực hiện xong sẽ gọi hàm callback để xử lý kết quả.
- Callback có thể là đồng bộ hoặc không đồng bộ.
- **Promise là kết quả mà lời gọi tác vụ không đồng bộ trả về, đại diện cho kết quả của tác vụ không đồng bộ.**
- Tiêu thụ kết quả (trong tương lai) của tác vụ không đồng bộ thông qua việc gọi hàm then của promise.

----
[Nguồn ảnh bìa](http://thenextweb.com/lifehacks/2014/03/30/always-promise-deliver/)