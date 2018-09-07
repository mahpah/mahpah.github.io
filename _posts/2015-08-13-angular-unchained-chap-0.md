---
title: Hành trình Angular - Chap 0
permalink: angular-unchained-chap-0
layout: post
---

Đây là loạt bài viết ghi lại những thứ tôi hiểu về AngularJS. Xin lưu ý rằng loạt bài này không phải là hướng dẫn cho người mới bắt đầu, tuy nhiên điều kiện tiên quyết không quá phức tạp. Hãy chắc chắn rằng bạn đã hoàn thành các ví dụ (4) trên trang chủ [AngularJS](https://angularjs.org/). Vậy là đủ để chúng ta có thể bắt đầu. Hy vọng loạt bài này sẽ giúp tiết kiệm thời gian cho các bạn mới bắt đầu với angular.

**NOTE:** Một thiếu sót trầm trọng tôi phải thẳng thắn thừa nhận là trong loạt bài này sẽ không đề cập đến test. Bởi vì tôi chưa tiếp cận một cách nghiêm túc khía cạnh này. Cho đến nay tôi vẫn là một solo developer nên chưa có kinh nghiệm với các vấn đề liên quan đến làm việc trong nhóm, mà test là một phần quan trọng. Hy vọng thời gian tới sẽ được làm việc chung với một team nào đó để bổ sung những khiếm khuyết này. (Dành cho ai muốn biết, [đây](https://gps.umaps.vn/demo) là dự án angular duy nhất của tôi đã chạy trên production).

## Pattern
Các mô thức quan trọng của angular. Tất nhiên có thể bạn sẽ nói ngay là MVC. Tuy nhiên khó khăn là mặc dù mô hình này đã tồn tại phổ biến khá lâu nhưng không dễ để tìm được 2 người có cùng một định nghĩa về nó. Ngoài ra có nhiều đồng nghiệp lại cho rằng Angular đi theo mô hình [MVVM](http://addyosmani.com/blog/understanding-mvvm-a-guide-for-javascript-developers/). Vậy nên tốt nhất ta tạm bỏ qua phần mập mờ này đi.
### Dependencies injection (DI)
Bạn đã thực hiện các ví dụ trên trang chủ angular chưa? Rồi thì tốt. Hãy xem ví dụ 3 (Wire up a backend). Thú thực là với một người mới bắt đầu thì ví dụ này có vẻ quá khó hiểu. Nhưng các bạn mới có thể xem ví dụ flicker background của tôi ở [đây](http://mahpahh.com/angularjs-random-background-directive-powered-by-flickr/), cover đủ từ service đến directive.

Hãy lưu ý đoạn code này:

```js
.service('fbAuth', function ($q, $firebase, $firebaseAuth, fbRef) {
  /* unrelated stuff */
});
```
Hàm fbAuth sẽ nhận vào một đống tham số gồm toàn tên của các service khác. Đây chính là chỗ dependencies injection tham gia vào. Angular injector sẽ đi tìm các service tương ứng để cung cấp cho hàm fbAuth.

Đây là bài viết giải thích về dependencies injection.

- [Bài này của tôi](http://mahpahh.com/lon-dieu-khien/)
- [Bài của Vu Nhat Minh ktmt](http://kipalog.com/posts/Inversion-of-Control-and-Dependency-Injection). Dành cho bạn nào có thể đọc được php.

### Singleton
Singleton pattern là mô thức trong đó chỉ cho phép một lớp có một thể hiện. Tức là:
```
@Singleton
class AClass {}

let a = new AClass();
let b = new AClass();

a === b; //true
```
Các service của angular đều là singleton, tức là một đối tượng là thể hiện của service đó sẽ tồn tại trong toàn hệ thống. Kết hợp với pattern DI ở trên thì 1 đối tượng service sẽ được cung cấp cho tất cả các đối tượng cần đến nó để dùng chung.

Một số pattern khác xin bổ sung sau.

## Module life cycle
Một module angular sẽ được thực thi theo 2 pha, điều này có mối quan hệ mật thiết với DI.

- Config phase: Pha cấu hình.

	Trong giai đoạn này chúng ta đăng ký với module, thực tế là với một dịch vụ đặc biệt là $provide, các hàm định nghĩa ra các dịch vụ, là injectable thing. Tức là những thứ mà DI có thể đem cung cấp cho thằng khác. Chỉ có các hằng (constant) là có thể được inject ở pha này.

- Run phase: Pha thực thi.

    Giai đoạn này thì angular sẽ thực thi các hàm đã được đăng ký ở pha config để lấy ra các thể hiện của dịch vụ (là singleton). Các injectable thing đã đăng ký ở pha cấu hình có thể đem ra chèn vô tội vạ.

Bài viết và ví dụ cụ thể sẽ có trong chương sau.

## Data flow
Lược đồ dưới đây mô tả một cách giản đơn nhất mà dữ liệu di chuyển trong Angular.

```
backend --> service --> controller --> $scope --> directive --> DOM
```

### Service

Là các injectable singleton đã nói ở trên, giúp tương tác với server và giữa các controller với nhau. Các xử lý nghiệp vụ phải được thực hiện bởi service.

### $scope

Theo định nghĩa chính thống đây là *phạm vi của các biểu thức angular*. Có 2 khái niệm cần lưu ý: phạm vi và biểu thức angular.

- Biểu thức angular. Là những thứ mà bạn có thể thấy trong 2 cặp ngoặc nhọn trong template:

```js
\{\{ a + b \}\}
```

Chúng tương tự như biểu thức javascript nhưng sẽ không có luồng điểu khiển `if`, `for`,...

- Phạm vi: được hiểu là nơi mà bộ dịch sẽ lấy giá trị của các biến. Tức là dựa vào đó bộ dịch biết a và b ở biểu thức trên là a và b ở đâu, đó là `$scope.a` và `$scope.b`. Để hiểu rõ hơn về phạm vi, có thể tham khảo phần đầu [bài viết này](http://mahpahh.com/es6-javascript-fat-arrow/)

Xem chi tiết về $scope ở chương sau (WIP).

### Controller
Theo giản đồ controller đóng vai trò lấy dữ liệu từ tầng service đưa và $scope để chúng ta có các giá trị `$scope.a` và `$scope.b` như đã nói ở trên.

### Directive
Dịch nôm na là chỉ dẫn. Như đã nói, controller lấy giá trị đã xử lý ở service đặt vào $scope. Ngược lại công việc của directive là lấy giá trị từ $scope đặt ra DOM, là chỗ chúng ta nhìn thấy trên trình duyệt. Bởi vậy tên gọi `chỉ dẫn` mang nghĩa là "Người hướng dẫn scope cách thể hiện mình".

Ví dụ:

- `ng-repeat` hướng dẫn rằng hãy lặp qua một thứ có thể lặp được (mảng, map, set...) và lấy các giá trị đó đưa vào DOM.

- `ng-bind` hướng dẫn rằng hãy thực thi biểu thức này và đưa kết quả vào DOM.
- ...

Như vậy, đến đây chúng ta có lưu ý lớn: **Tất cả các thao tác xử lý DOM phải đặt trong directive.**

## Kết
Đây là bài giới thiệu các vấn đề được đề cập trong loạt bài. Tuy nhiên không phải là tất cả. Khi nào nghĩ ra thêm tôi sẽ bổ sung tiếp. Có chỗ nào tôi hiểu sai mong các bạn chỉ ra giúp.

*Cross-posted on kipalog (http://kipalog.com/posts/Hanh-trinh-Angular---Chap-0--WIP)*

*Xem thêm các bài viết cùng chủ đề Javascript: http://mahpahh.com/tag/javascript/*
