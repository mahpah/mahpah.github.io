---
permalink: visual-studio-code-at-a-glance
title: Visual Studio Code, cái nhìn đầu tiên
---

Cuối tuần trước, khi cả nước ta đang từng bừng kỷ niệm ngày chiến thắng thì bên kia Thái Bình Dương, các bác Mai Còn Sót đang tôn vinh những người thợ xây bằng hội thảo [MS Build](http://www.buildwindows.com/), với mục đích giới thiệu những sản phẩm mới nhất. Trong đó phải kể đến, ồ xin lỗi không phải trình duyệt Edge, ý tôi là [VS Code](https://code.visualstudio.com/), một editor có tính năng gần như một IDE.

> Quảng cáo:
>
> Code focused development. Redefined.
>
> Build and debug modern web and cloud applications. Code is free and available on your favorite platform - Linux, Mac OSX, and Windows.

Mới nhìn qua (và nhìn cái trang giới thiệu lúc mới lên hình) thì tôi thấy VS code:

- được build trên Atom shell (nay đã đổi tên là Electron, vâng, vỏ nguyên tử thì hẳn là ê-lếch-tờ-rông rồi). Cụ thể là atom shell / electron 0.22.3
- Có tính năng mở file nhanh, giống <kbd>Ctrl</kbd><kbd>p</kbd> của Sublime, tuy nhiên ở đây các anh dùng <kbd>Ctrl</kbd> <kbd>o</kbd>
- Chia đôi màn hình - side by side viewing, có lẽ dùng để so sánh file thì tiện
- Các file nào đang chỉnh sửa được hiện riêng lên trên cùng sidebar, giống brackets
- Bảng mệnh lệnh, Command Pallete, giống sublime (và từ này cũng được công nhận một cách phổ biến là xuất phát từ sublime)

Ngoài ra nhìn sang hộp công cụ bên phải có thể thấy thêm

- Hộp tìm kiếm
- Hệ thống quản lý mã nguồn với git
- Công cụ gỡ lỗi.

OK. Hãy xem qua các tính năng của VSCode. (Thật ra tôi cũng mới dùng VSCode được 2 hôm thôi, nhưng vì muốn bắt kịp xu thế nên cũng viết bài giới thiệu cho "ha oai").

## Cài đặt
Tải VSCode về tại đây ha: https://code.visualstudio.com/Download
Hiện đã build trên cả 3 nền tảng Windows (tất nhiên), Linux (64-bit only) và MacOS. Cái team này dùng MacOS là nhiều hay sao đó mà các hướng dẫn trên site đều dùng tổ hợp phím của Mac.

## Cơ bản
Tính năng cơ bản của một trình soạn thảo tất nhiên là soạn thảo rồi. Viết một bài văn tả ông nội em đi. Xong phần cơ bản.

### Truy cập nhanh
<kbd>Ctrl</kbd> <kbd>p</kbd> cho phép bạn mở bảng lệnh - command pallete, <kbd>Ctrl</kbd> <kbd>o</kbd> mở bảng truy cập nhanh nói chung. Ở bảng truy cập nhanh ta thấy một lời nhắc rất thú vị: "Ấn ? để xem các hoạt động khả dĩ".
![](/assets/images/2015/05/quick-access.png)
Như vậy command pallete cũng là một bảng con của bảng quick access này. Nếu mở command pallete ra rồi xóa dấu nhắc ">" đi thì ta cũng quay về bảng quick access này thôi.
Ở bảng quick access tác vụ thường làm là bay nhảy giữa các file bằng cách gõ `tên file`, giữa các dòng bằng cách gõ `:<số thứ tự>`, gõ `tênfile:sốdòng` để chuyển đến 1 dòng xác định của 1 file, `@tên biến` đưa ta đến vị trí biến được khai báo. Tương tự sublime.

`# Open symbol by name` nghĩa là gì nhỉ? À ở đây thì các anh ấy có một chuẩn là [TypeScript type definitions](http://definitelytyped.org/). Với cái này chúng ta sẽ có định nghĩa giao diện các module của javascript rất là đẹp để mang ra gợi ý. Vậy là đã mang được khả năng gợi ý thần thánh của Visual Studio cho các ngôn ngữ có kiểu chặt chẽ lên JS. Rất tuyệt đúng không? Cái này sẽ nói rõ thêm ở phần sau. Quay trở lại với ký hiệu `#`, lệnh này sẽ đưa các bạn tới chỗ định nghĩa giao diện của cái phương thức hoặc là cái biến đó.

`!` giúp mở bảng thông báo lỗi, rất dễ hiểu

`git` chạy các lệnh git

`task` chạy các tác vụ, cái này giống build system của sublime. Sẽ cần 1 file tasks.json định nghĩa các tác vụ. [Tham khảo thêm](https://code.visualstudio.com/Docs/tasks).

### Tính năng soạn thảo
* Mở một cửa sổ mới <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>n</kbd>
* Lưu tự động
![](/assets/images/2015/05/auto-save.png)
* Ẩn hiện sidebar <kbd>Ctrl</kbd>+<kbd>B</kbd>
* Tách đôi/ba cửa sổ soạn thảo, sử dụng nút split ở góc trên bên trái khung soạn thảo. Bạn có cơ hội ấn nó 2 lần. Phím tắt: <kbd>Ctrl</kbd>+<kbd>\</kbd>
![](/assets/images/2015/05/split.png)

* Nhiều con trỏ (multi cursor)

    <kbd>Alt</kbd> + click thực hiện điều này. Bạn cũng có thể vừa giữ <kbd>Alt</kbd> vừa quét để chọn nhiều đoạn code.

    Với các bạn dùng kubuntu như tôi thì <kbd>Alt</kbd> + click sẽ lôi cả cái cửa sổ di chuyển, hãy tắt tính năng này đi, như sau:
![](/assets/images/2015/05/multi-cursor-kubuntu-1.png)

* Format code

	Tổ hợp phím được chọn là <kbd>Ctrl</kbd>+<kbd>Shift</kbd><kbd>I</kbd>. Tuy nhiên lại trùng đúng với tổ hợp phím mở Webkit Dev Tool (LOL, sao các bố ấy không disable đi nhỉ?), thế nên tốt nhất là các bạn nên dùng command pallete để làm việc này.

Vậy tạm xong phần cơ bản.

## Gợi ý code thông minh (intellisense)

Như trên đã nói, VScode cũng dùng TypeScript type definitions để định nghĩa giao diện cho các module. Nhờ đó chúng ta có các gợi ý như thế này khi code:
![](/assets/images/2015/05/codeintel.jpg)
Ở đầu file ta có một dòng tham chiếu đến tệp định nghĩa để vscode biết mà gợi ý. Thực ra sublime cũng có plugin SublimeCodeIntel để làm việc này, nhưng không thêm được các tệp giao diện tùy ý vào (hoặc có thể là tại tôi cà dốt không biết dùng, ai biết chỉ nhé).

Vấn đề là mấy cái tệp định nghĩa này lấy ở đâu đây? Đừng lo lắng, đã có vô số [chàng trai và cô gái dễ thương làm việc này cho chúng mình](https://github.com/borisyankov/DefinitelyTyped). Chúng ta có một tool dành cho việc nhặt mấy tệp này về dùng là `tsd`, giống như bower và npm.
```
npm i -g tsd
```
Tại thư mục dự án
```
tsd query node mocha --resolve --action install
```
Đây là những gì chúng ta nhận được
![](/assets/images/2015/05/d-ts.png)
Tuyệt, phải không nào?

**UPDATE 20/03/2016**: Công cụ được sử dụng hiện nay là `typings`, tương tự như tsd nhưng có thể cài đặt được từ tất cả các repo github/npm/bower nếu gói đó có chứa file .d.ts. Không còn phụ thuộc vào repo DefinitelyTyped nữa. Nếu muốn chỉ định cài từ repo DefinitelyTyped, bạn cần thêm tham số --ambient

```
typings install react --ambient --save
```

### Quick fix
Những chỗ được gạch chân ngoằn nghoèo màu xanh với chiếc bóng đèn màu vàng, là những chỗ VSCode có thể gợi ý cách sửa lỗi. Ví dụ bên dưới ta có thể thêm tham chiếu đến tệp định nghĩa angular, nếu chưa có trong thư mục typings, VSCode sẽ tự tải về hộ chúng mình.
![](/assets/images/2015/05/quick-fix.png)

### Bay nhảy giữa các khai báo biến
* Tìm khai báo biến

	Đặt con trỏ vào 1 biến và ấn <kbd>Ctrl</kbd>+<kbd>F12</kbd>, con trỏ sẽ nhảy đến vị trí biến được khai báo. Nếu ấn tổ hợp phím <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>F10</kbd> một khung nhỏ sẽ xổ ra cho phép xem và chỉnh sửa khai báo tại chỗ mà không phải nhảy đi đâu cả. Tính năng này có tên là Peek Definition.

    Kubuntu lại một lần nữa gặp rắc rối bởi <kbd>Ctrl</kbd>+<kbd>F12</kbd> trùng với tổ hợp phím tắt Show Dashboard, vì vậy tôi lại phải tắt nó đi

![](/assets/images/2015/05/ctrlF12.png)

* Xem tất cả vị trí xuất hiện của một biến, tổ hợp phím được sử dụng là <kbd>Shift</kbd>+<kbd>F12</kbd>. Một khung tương tự peek definition được xổ ra liệt kê hết các vị trí biến được sử dụng.
![](/assets/images/2015/05/shiftF12.png)

* Chọn tất cả các lần xuất hiện biến, bằng tổ hợp phím <kbd>Ctrl</kbd>+<kbd>F2</kbd>. Từ đây có thể đổi tên biến nhanh chóng.

![](/assets/images/2015/05/select-all.png)

## Tạm kết
Phần debug và tích hợp git tôi xin phép bổ sung sau.

Sau vài ngày dùng thử, tôi thấy đây là một công cụ rất đáng để thử, nhanh, intellisense mạnh mẽ. Các bạn nào đang làm web với Visual Studio nên ngó qua. ~~Thứ tôi nghĩ nên được bổ sung là khả năng cài cắm phần mở rộng, với nhân atom thì điều đó chắc cũng không phải là việc khó. À, thêm một thứ nữa là các bộ theme vui mắt giúp lập trình viên thêm hào hứng trong công việc.~~

**UPDATE**: Hiện nay VsCode đã có kho tiện ích mở rộng cho riêng mình. Kèm theo [bộ sinh mã yeoman](https://code.visualstudio.com/docs/tools/yocode) giúp anh em dễ dàng tạo phần mở tộng cũng như theme.

*(Ngoài ra tôi thắc mắc tại sao nhân atom mang ra làm các ứng dụng đa nền tảng khác thì dùng rất ngon mà sao cái Atom editor lúc nào cũng làm tôi phát ốm.)*

Tóm lại, tôi đánh giá cao [nỗ lực gần đây của Microsoft hướng đến cộng đồng nguồn mở](http://www.microsoft.com/en-us/openness/default.aspx#home). Chúc mừng các bác.
