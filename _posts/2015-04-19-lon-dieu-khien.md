---
title: Điều khiển lộn
permalink: lon-dieu-khien
---

> Tôi muốn nói đến cái tên Inversion of Control và Dependency Injection. Tôi cũng khá băn khoăn về cái tên này nên loanh quanh nghiên cứu (qua Google, tất nhiên rồi), và sau đây là những gì tìm hiểu được.

##Inversion of Control (IoC)
Hãy nhớ lại chương trình Tính tổng 2 số bạn đã viết vào lúc nào đó, bằng một ngôn ngữ nào đó. ~~Control flow~~, à tôi xin lỗi, luồng điều khiển sẽ như này:
```
- program: Ê cu, nhập vào số thứ nhất coi
- tôi: Dạ 1 ạ
- program: Số thứ 2 nữa:
- tôi: Vâng lại 1 nữa anh ạ
- program: thế thì tổng là 2 rồi, mày ngu thế. Thế có tính tiếp không?
- tôi: Dạ thôi cảm ơn anh ạ
- program: bye cưng, chat sau ha
```
OK, một phần mềm rất sexy phải không, thừa nhận đi. Nhưng bây giờ, khi lập trình có giao diện, luồng điều khiển thế này:
```
bạn: nhập vào 2 số *gõ gõ gõ*
bạn: click nút "Tính tổng"
program: Dạ tổng 2 số anh vừa nhập là xxx. Chúc anh một ngày tốt lành.
```
Vậy bạn đã thấy sự khác biệt giữa 2 quy trình chưa? Ở đây bạn từ thân phận con sâu cái kiến chương trình đòi gì phải làm nấy, sau cách mạng đã vươn lên làm chủ, chương trình trở thành đầy tớ của bạn (Dê dê, cách mạng muôn năm). Tất cả các phương pháp có quy trình như trên đều được gọi là Inversion of Control. Đây là một mô thức chung chung, tổng quát, bao gồm cả [event loop, callback pattern](http://mahpahh.com/vong-lap-su-kien-trong-javascript/), event drivent,...

**Sau đây là định nghĩa tổng quát và khó hiểu hơn**
Inversion of Control hướng đến việc chia tách phần "làm gì" và "làm lúc nào", đảm bảo rằng phần "làm gì" biết về phần "làm lúc nào" càng ít càng tốt và ngược lại.
(Thú thực là tôi đọc xong từ mù dở thành mù hẳn)
Ví dụ:
- Luồng điều khiển ở ví dụ chương trình tính cộng: "Khi tao bấm nút 'Tính tổng' (làm khi nào) thì mày tính cho tao tổng 2 số tao nhập bên cạnh (làm cái gì)"

## Dependency Injection
Quay lại dependency injection, đây thực tế là một dạng IoC ứng dụng vào việc cấu trúc một chương trình. Ví dụ:

- với quy trình quan liêu cũ ta có
```
class Quạt () {
	//quạt chan tự đi mua động cơ và cánh về lắp
    _constructor() {
    	this.động_cơ = new Động_Cơ(40W);
    	this.cánh = new Cánh(12cm);
    }
}
```
- với quy trình sau cách mạng
```
class Quạt () {
	Động_Cơ động_cơ; //<-- phần làm cái gì (không biết)
    Cánh cánh;

    _constructor () {
    	this.động_cơ.set('công_suất', 40); //<-- làm lúc này
        this.cánh.set('sải_cánh', 12cm);
    }
}
```
Ưu điểm: Quạt chan không cần phải đi mua động cơ và cánh nữa, cứ thế mà quẩy thôi, dê dê.

Nhược điểm: Cần có một nhà nước đứng ra điều phối có nhiệm vụ xem anh nào cần cái gì thì cấp cái đó. Tuy nhiên thường các framework sẽ có hỗ trợ chúng ta cái "nhà nước" này, nên hầu như chả phải làm gì cả. Tuyệt không?
Trong bài tới tôi sẽ bắt đầu một series về [AngularJS](http://angularjs.org) bắt đầu với dependency injection, tôi nghĩ đây là một cách rất hay để bắt đầu với angularJS

----
**Tham khảo:**

[stackoverflow](http://stackoverflow.com/questions/3058/what-is-inversion-of-control)
