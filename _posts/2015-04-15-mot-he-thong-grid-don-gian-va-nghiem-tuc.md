---
permalink: mot-he-thong-grid-don-gian-va-nghiem-tuc
layout: post
title: Một hệ thống grid đơn giản (và nghiêm túc)
---

> Việc sử dụng các framework CSS như foundation hay bootstrap dường như đang khiến cho thế giới web trở nên giống hệt nhau, như kết quả của ngành công nghiệp dao kéo Hàn Quốc. Trong bài này tôi khuyến khích việc từ bỏ các framework đồ sộ này và giới thiệu một grid system rất nhỏ gọn và mềm dẻo.

## Sự cần thiết của một grid system
Nếu là một người làm công việc thiết kế web, hẳn bạn đã từng sử dụng hoặc chí ít là nghe đến các css framework như bootstrap, foundation,... Đến tôi là một thằng thiết kế web tay ngang còn biết nữa là. Một trong các thành phần cốt lõi của các framework này là hệ thống lưới (grid system). Tại sao lại cần có một hệ thống lưới? Thử tượng tượng hồi lớp 1 cô giáo bắt bạn tập viết trên một tờ giấy A4 trống trơn mà không có cái dòng kẻ nào, thật là thử thách gian nan đúng không? Bạn không biết nên bắt đầu từ chỗ nào, vẽ con chữ bằng bao nhiêu thì vừa, đuôi chữ g này nên kéo đến đâu. Việc thiết kế web còn phức tạp hơn khi mà bạn phải làm vừa lòng hàng trăm ngàn "thằng người dùng" mà mỗi thằng lại có một tờ giấy to nhỏ khác nhau. Thế là hệ thống lưới ra đời đóng vai trò các đường kẻ ô ly và cùng với đó một loạt các "thiết kế web viên" chuyên nghiệp với nhiệt huyết sục sôi đã đứng ra lo việc kẻ ô như cô giáo vỡ lòng của chúng ta vậy.

## Vậy vấn đề ở đây là gì?

Nghe qua thì quả là tuyệt khi có một số thầy cô vỡ lòng kẻ vở giúp chúng ta như vậy, nhưng việc này liệu có nhất thiết cần đến không? Vâng cũng giống như những vấn đề muôn thuở của nền giáo dục nước nhà, là dạy thế nào cho đúng, thì ở đây chúng ta lại đặt ra câu hỏi *"kẻ thế nào cho đúng?"* hoặc khái quát lên tầm triết học, *"liệu có tồn tại một cách kẻ đúng hay không?"*. Việc trả lời câu hỏi này đã tạo ra vô vàn các hệ thống lưới khác nhau, mà nhà thiết kế kỳ cựu nào cũng tạo ra một hệ. Đầu tiên phải kể đến [960 grid system](960.gs) với giả định các khung nhìn có độ phân giải tối ưu 960px mà đến nay đã không còn được coi là một giả thuyết hợp lý, khi mà các màn hình đang tiến đến mức 4K. Tiếp đến là các hệ thống lưới responsive (đáp ứng) hay adaptive (tương thích) đang được nói đến nhiều hiện nay. (Về sự khác biết giữa 2 xu hướng này tôi sẽ dành nói trong bài viết khác). Dù giống hay khác nhau thế nào thì các grid system cũng đều tìm cách chia khung nhìn thành nhiều phần đều nhau. Và thế là lại xuất hiện thêm câu hỏi *"bao nhiêu phần là đủ?"*. Các kỹ sư đứng sau bootstrap và foundation thống nhất chọn con số 12 vì chia khung nhìn thành 2 hay 3 hay 4 phần đều rất dễ dàng, lớn hơn nữa thì không nên vì khi đó bố cục trở nên rất vụn và quá nhiều chi tiết. Trong khi đó, goldengrid lại nói: Chúng mày ngu lắm, phải chia khung nhìn thành 18 phần và để dành 2 phần làm lề (tức là còn 16 phần để vẽ).

Ừ, các bố đúng cả, thế con muốn vẽ theo tỷ lệ vàng (1.618) thì lấy bao nhiêu cột hả các bố?

A ha, đến đây thì các bạn thấy vấn đề ngày càng trầm trọng, nếu bạn đang cố nghĩ xem cách nào hợp lý thì tôi khá lo cho bạn đấy. Bạn đã bị đánh lạc hướng giống rất nhiều người. Như vậy, dù có sử dụng grid nào, bao nhiêu cột thì bạn cũng đang chuyển từ một việc đầy tính sáng tạo là thiết kế, sang việc tô hình theo những đường kẻ sẵn. Tức là thay vì các bạn nghĩ là, ừm, side bar như này, có hình và text ngang hàng, luôn luôn hiện, thì set chiều rộng bằng chừng này, thì bạn lại nói, tôi có sidebar chiếm 3/12 column, vậy tôi vẽ hình và đặt text bên cạnh chứ không phải bên dưới. Bạn đã áp dụng rập khuôn kinh nghiệm của các nhà thiết kế đi trước. Điều này, đối với một người phát triển, không chuyên thiết kế như tôi, để đảm bảo về thời gian thì có lẽ chấp nhận được nhưng đối với các bạn thiết kế gia, tôi mong các bạn đừng sa chân vào.

## Còn sau đây là giải pháp

Đây, theo tôi chính là hệ thống lưới bạn cần, Dead Simple Grid by [@Vladimir Agafonkin](http://agafonkin.com/en), nhà phát triển [Leaflet](http://leafletjs.com/)

[Github: https://github.com/mourner/dead-simple-grid](https://github.com/mourner/dead-simple-grid)

Tất cả những gì bạn nhận được là:

  - 250bytes CSS. Trong nhiều project tôi phải adopt cả framework như bootstrap chỉ để có được một grid system. Thêm vào đó, tôi sẽ tiện tay sử dụng các class định sẵn như button, label, nếu có customize cũng chưa chắc phù hợp với giao diện tôi dự định ban đầu.
  - 2 class ```.row``` và ```.col```
  - column có độ rộng toàn bộ trang với lề cố đinh (set mặc định là 1.5em)
  - lồng nhau vô hạn

Ý tưởng là chúng ta có dòng và các cột mặc định mặc định rộng 100%, điều các bạn phải làm là

- đặt thêm class mô tả nội dung vào cột
- định độ rộng theo nội dung, khả năng mềm dẻo vô hạn, vì độ rộng tính bằng %, ví dụ:

```css
.col.intro {
	width: 33.3%;
}
```
- sử dụng media query để style theo các kích thước màn hình, tức bạn có khả năng điều chỉnh tất cả mọi thứ, không cần nhớ hàng trăm thứ class như ```.hidden-xs```, ```.col-push-md-12```, vân vân... Nhờ đó, nhìn vào css của mình tôi thực sự có thể hiểu điều gì sẽ xảy ra.

	**Tip:** Hãy style cho màn hình nhỏ trước (mobile-first), ví dụ:
```css
@media only screen {
	.content {
    	width: 100%; //không cần thiết vì 100% là chiều rộng col mặc định
    }
    .sidebar {
    	display: none;
    }
}
@media only screen and (min-width: 30em) {
    .content {
    	width: 66.66%;
    }
    .sidebar {
    	width: 33.33%;
    }
}
```

## Kết luận
Đây là một cách tiếp cận mà một người luôn muốn điều khiển tất cả mọi thứ như tôi ưa thích sử dụng. Còn các bạn, tùy thuộc mục đích là gì, hãy lựa chọn một grid system phù hợp với thiết kế của các bạn. Tôi nhắc lại, lựa chọn grid system phù hợp với thiết kế, chứ không phải thiết kế theo grid system bạn chọn. Cheers.
