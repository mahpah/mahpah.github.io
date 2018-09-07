---
title: Phòng thí nghiệm di truyền
permalink: phong-thi-nghiem-di-truyen
tags:
    - es6 
    - genetic_algorithm
---

Hôm nọ có đi xem công viên khủng long, à không, thế giới khủng long, Jurassic World[^n] đấy, nên về nảy ra ý định viết bài này để kể chuyện người ta mô phỏng quá trình di truyền trong tin học, mà các cụ gọi là giải thuật di truyền. *Qua đó mong trình bày một chút quan điểm về sử dụng sản phẩm biến đổi gen.*

Nghe rất là oai. Cơ mà vì lười nên hôm nay mới viết được :shame:

Đầu tiên tớ kể chuyện về di truyền đã, tớ không phải chuyên gia gì nên nói tóm tắt những chuyện tớ hiểu thôi nhé, những cái này có trong chương trình sinh học lớp 11 thì phải. Bắt đầu thế này:

- Mỗi cá thể trong một loài thì có một chuỗi thông tin di truyền trong mình, gọi là gen. Cái này có trong nhân của tất cả các tế bào của cá thể nhé. Chuỗi gen này gồm các đơn vị nucleotide nối vào nhau, người ta gọi là polyme đấy (hóa lớp 12)[^n]. Nucleoitide thì có 4 loại, vậy nếu chuỗi gen dài 50 chẳng hạn, sẽ có 4 ^ 50 kiểu gen khác nhau, rất kinh đúng không. Mà các loài thường có độ dài gen rất cao, như người 20000 đến 25000 thì con số tổ hợp rất là khủng. Trong máy tính, tớ mô phỏng bằng 1 chuỗi các ký tự gọi là id của cá thể. Ở đây, để đơn giản tớ cho chỉ có 2 loại nu là 0 và 1, chiều dài gen thì cố định luôn. Như vậy cá thể được xác định bằng kiểu gen id.

- Tiếp theo, khi 2 cá thể ấy ấy nhau và đẻ con thì có một nửa gen đến từ bố và nửa gen đến từ mẹ để tạo ra bộ gen mới. Con số 1 nửa là tương đối vì kích thước bộ gen là khác nhau. Trong quá trình này cũng không tránh khỏi sai sót, khi đó chúng ta gọi là đột biến. Sẽ có đột biến xấu và đột biến làm cá thể có những phẩm chất tốt hơn, X-men chẳng hạn. Cách mô phỏng ở đây là tớ chặt đôi id của bố và mẹ ra và ghép lại, còn khi gặp trường hợp đột biến thì sinh id mới ngẫu nhiên. Tỷ lệ số trường hợp đột biến trên tất cả các trường hợp gọi là **tỷ lệ đột biến** (hẳn rồi)

- Sau đó trong phòng thí nghiệm, của OsCorp chẳng hạn, bằng một cách nào đó tớ xác định được một kiểu gen rất hay, và tôi muốn tạo ra cá thể mang gen đó, tất nhiên khó mà cắt ghép gen được, nên tớ phải làm như thế này:

  - Gây một quần thể ngẫu nhiên có n cá thể. Xác định cá thể có kiểu gen gần giống kiểu đích nhất, gọi là talent đi.
  - Cho giao phối ngẫu nhiên, chọn n-1 cá thể, cùng với cá thể talent tạo ra quần thể n cá thể mới. Tiếp tục tìm cá thể talent băng cách tính toán kiểu gen nào gần kiểu gen đích nhất.
  - Lặp lại các bước trên đến khi tìm ra cá thể có kiểu gen đích hoặc sai số cho phép => hero.

Như vậy vấn đề tiếp là tạo ra một cơ chế tính toán để xác định kiểu gen nào có độ phù hợp cao nhất với kiểu gen đích để "giữ lại làm giống". Ở đây tớ đơn giản đếm tỷ lệ miss/hit so với kiểu gen gốc. Ai quan tâm đến code có thể xem code ví dụ tớ để ở cuối bài [^n].
    
OK, toàn bộ quá trình như trên gọi là chọn lọc nhân tạo kết hợp với gây đột biến. Chọn lọc nhân tạo thể hiện ở việc chúng ta giữ lại các cá thể phù hợp cho bước nhân giống tiếp theo. Còn gây đột biến thể hiện ở chỗ trong phòng thí nghiệm có thể sử dụng các biện pháp kỹ thuật để **tăng tỷ lệ đột biến**.

OK, quay lại vấn đề in nghiêng ở đầu bài. Có quan điểm cho rằng một số sản phẩm không biến đổi gen hiện nay có phẩm chất cao hơn rất nhiều so với trước kia. Ví dụ kích thước bắp ngô bình thường hiện nay lớn hơn 1000 lần bắp ngô cách đây 100 năm hay đại loại thế. Tuy nhiên vấn đề ở đây tớ nghĩ không nằm ở kết quả đạt được về phẩm chất của sản phẩm, mà là cách tạo ra chúng. Trước kia chúng ra chỉ chọn lọc nhân tạo, nghĩa là không làm thay đổi tỷ lệ đột biến. Nhưng với phương pháp biến đổi gen như hiện nay thì ngược lại, tỷ lệ đột biến tăng lên gấp nhiều lần. Nếu ai chạy thử code mẫu thì sẽ thấy với tỷ lệ 0.015, chiều dài gen 64 chỉ khoảng 10 vòng lặp là chúng ta đạt được kết quả mong muốn. Thực tế người ta có thể gây đột biến  Sẽ thế nào nếu kiểu gen đích là kiểu gen xấu? Với tỷ lệ đột biến tự nhiên rất thấp, nếu chẳng may có những đột biến thành loài mới, thì thường song song với nó cũng sẽ có loài thiên địch tương ứng để khống chế loài này.

Với tốc độ chọn lọc khủng khiếp như chúng ta đang làm hiện nay, liệu thiên nhiên có thay đổi kịp để ứng phó?

---
**Chú thích**

[^n]: http://www.imdb.com/title/tt0369610/

[^n]: https://vi.wikipedia.org/wiki/ADN

[^n]: https://github.com/mahpah/genetic-algorithm-example. Tớ viết bằng es6 dùng systemjs để load. Cũng lâu lâu rồi mà lười chưa kiểm tra lại không biết chạy được không. Có gì comment nhé
