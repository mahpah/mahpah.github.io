---
title: Lọc cộng tác là gì?
permalink: loc-cong-tac
tags:
    programming
    colaborative filtering
    recommendation system
---

Ờm hôm nay sẽ post một chủ đề hơi đau đầu một tí. Đây là vấn đề mình tìm hiểu thời gian qua.

Đầu tiên vấn đề đặt ra là làm thế nào mà các website như facebook, spotify, lastfm, amazon đưa ra được mấy cái chỗ Recommedation nhiều khi rất là không liên quan (như kiểu gợi ý bạn có 1 bạn chung với bạn (?)). Câu trả lời cực kỳ đơn giản là họ có một hệ thống gợi ý - Recommendation System =))

OK. Đùa chút thôi, vấn đề là hệ thống đó hoạt động như thế nào.

Trong trường hợp FB chẳng hạn, thì gợi ý bạn bè có thể đưa ra theo kiểu: cùng quê, cùng nơi đang sống, làm việc, học tập (dưới mái trường xã hội chủ nghĩa chẳng hạn), cùng hội thích gái xinh blah blah. Đây chính là gợi ý dựa trên đặc thù của chính đối tượng - content based recommendation. Tương tự với sách thì có thể dùng nhà xuất bản, tác giả, thẻ nội dung, thể loại... làm căn cứ. Tuy nhiên có các đối tượng có nội dung không rõ ràng như nhạc chẳng hạn, bạn khó mà phân biệt được chính xác nội dung bài hát này tương tự bài hát kia, nhất là nhạc không lời. (Có thể bạn pro thì nhận định được chứ tôi thì chịu chết). Có thể dùng tác giả, thể loại vv.. làm căn cứ tuy nhiên các bản nhạc (lậu) thường có metadata không đầy đủ. Vẫn cố gắng thực hiện gợi ý theo kiểu content-based thì một số người có khả năng đỉnh cao họ sẽ sử dụng phổ âm sắc để đánh giá dựa vào giai điệu tiết tấu của ca khúc. Thực sự đây là một việc rất khó, nghe đồn mỗi bản nhạc có đến trung bình 480 thuộc tính (Đừng hỏi gì cả, tôi chỉ nghe đồn thôi). Thế mà bên Pandora người ta đã xây dựng hẳn được một Music Genome Project phân tích tuốt tuồn tuột, tất nhiên đội ngũ của họ có tất nhiều chuyên gia trong lĩnh vực âm nhạc, và cả tiền nữa. Khó như vậy nên tất nhiên dữ liệu trong đó chỉ có thể dùng để bán kiếm tiền, chẳng ai ngu gì share miễn phí cả.

Khó như vậy không lẽ thôi à?

Rất may cách đây rất lâu người ta cũng đã nghĩ ra một cách rất tuyệt vời, đó là Collaborative Filtering (Lọc cộng tác - CF). Cách này dựa vào Luật số lớn và Trí tuệ đám đông. Điều đó không có nghĩa là Đám đông lúc nào cũng đúng mà phải là đám đông "liên quan" đến mình cơ (thế mới phải lọc). Ví dụ tôi thích đi xe máy, uống cà phê, trà đá chém gió. Anh Bình thích đi ô tô, uống rượu Tây thì tất nhiên không cùng gu với tôi, nên nếu thôi rủ ảnh đi phượt xe máy thì khả năng anh ấy đồng ý khá là thấp.

OK vậy vấn đề trở thành làm thế nào để lọc ra được các anh cùng gu với tôi? Có nhiều cách để thực hiện việc này, nhưng trước tiên hãy xem xét thông tin đầu vào và đầu ra như thế nào đã. Đầu tiên độ ưa thích của tôi với các item được thể hiện thành một véc-tơ như sau: (nếu cảm thấy không quen thuộc lắm với định nghĩa véc-tơ tôi đề nghị chuyển sang gọi là bảng-có-một-dòng)

.    |Chó |  Mèo |  Lợn |  Gà |  Ông |  Bà |  Bố |  Mẹ
-----|----|------|------|-----|------|-----|-----|------
Tôi  | 2  | 3    | 0    | 0   | 1    | 5   | 2   | 2


Coi như là tôi bị bắt phải chấm điểm cho các đối tượng theo thang điểm từ 1 đến 5. Chỗ nào bằng 0 là tôi chưa chấm. Nếu có 3 thằng người khác nữa cũng chấm điểm thì ta sẽ có được một ma trận (hay là bảng-gồm-nhiều-dòng)

_              | Chó | Mèo | Lợn | Gà | Ông | Bà | Bố | Mẹ
---------------|-----|---- |-----|----|-----|----|----|----
Tôi            | 2   | 3   | 0   | 0  | 1   | 5  | 2  | 2
Thằng 1        | 0   | 3   | 5   | 0  | 0   | 5  | 2  | 2
Thằng 2        | 1   | 5   | 0   | 0  | 1   | 5  | 2  | 2
Thằng 3        | 2   | 3   | 1   | 3  | 0   | 5  | 0  | 2

Bảng còn khá nhiều chỗ để trống (tức điền 0). Điền vào những chỗ đó là công việc của hệ thống phải làm.

Thoáng nhìn vào bảng có thể thấy thằng 3 cho điểm khá là giống tôi vậy nhiều khả năng là nó cũng hợp gu với tôi. Tôi có thể chạy đến bảo nó: "Ê cu chắc mày cũng không thích ông già mày lắm". Chắc nó sẽ bảo "Ừ, tao còn thích con gà nhà tao hơn, chắc mày cũng vậy hả?"

(Đừng bận tâm, đây chỉ là ví dụ thôi)

Đó là nhận xét cảm tính, còn tính toán chính xác phải làm như nào? Hãy sử dụng một công thức tính khoảng cách. Ví dụ:

#### 1. Khoảng cách Euclide (đọc là Ơ-cơ-lít):

Chắc hẳn bạn còn nhớ công thức tính khoảng cách giữa 2 điểm (x1, y1) vả (x2, y2) trên một mặt phẳng tọa độ (2 chiều):

$$ d = \sqrt{(x_{1}-x_{2})^{2} + (y_{1}-y_{2})^{2}} $$

Mở rộng ra với n chiều cũng tương tự, ví dụ khoảng cách giữa tôi với thằng 1 là

$$ d = \sqrt{(2-0)^2 + (3-3)^2 + (0-5)^2 + (0-0)^2 + (0-1)^2 + (5-5)^2 + (2-2)^2 + (2-2)^2} =  5.48 $$

Khi đó độ tương tự có thể tính là $$ s1 =1/(1+d) = 0.15 $$

(Con số 1 đảm bảo rằng s chỉ chạy trong nửa đoạn từ 0 đến 1, không tính 0)

Tương tự thằng 2 và thằng 3 là $$ s2 = 0.31 $$, $$ s3= 0.21 $$

#### 2. Khoảng cách Cosine
Đây chính là cos của góc giữa 2 véc-tơ trong mặt phẳng tọa độ.
<*Chỗ này các bạn tự tìm giúp tôi công thức nhé, làm biếng viết quá*>

Như vậy dù bằng cách nào thì chúng ta cũng đã có ma trận (hay bảng) độ tương tự giữa người với người. Từ đó sinh gợi ý như nào đây. Rất dễ, điểm tôi chấm cho sản phẩm X bằng trung bình của các thằng đã chấm điểm sản phẩm X với trọng số chính là độ tương tự của nó so với tôi.

Ví dụ: Tôi sẽ chấm cho Gà: $$ g = (5*s1 + 1*s3)/(s1+ s3) = 2.67 $$

Cũng không khó lắm nhỉ.

Đây là sơ lược về lọc cộng tác, các kỹ thuật cao cấp hơn sẽ giới thiệu ở phần sau. Tuy vậy cũng có một vài kết luận có thể được rút ra:

1. Hãy cho tôi biết bạn bè của bạn là ai, tôi sẽ nói cho bạn biết bạn là người như thế nào.

2. Đám đông luôn có khả năng tác động đến bạn.

3. Những thằng chưa làm thì ý kiến của nó không có ý nghĩa, dù nó có hợp gu với mình thế nào đi nữa.
