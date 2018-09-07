---
title: Wifi 2.4GHz, 5GHz là gì? Và tại sao?
permalink: wifi-2-4ghz-5ghz-la-gi-va-tai-sao-2
layout: post
---

> Góp nhặt một vài hiểu biết của mình về viễn thông, chủ yếu là học lỏm từ 1 số quyển đồ án có chất lượng thấp. Chỗ nào sai xin chỉ bảo đừng gạch đá tội nghiệp.

Nói một chút về truyền tín hiệu, các tín hiệu được biểu diễn bằng các hàm tuần hoàn, ví dụ `2 * sin(x) + cos(x)`. Khi nói đến tín hiệu người thường quan tâm đến tần số của nó. Ví dụ âm thanh, nốt La có tần số 440Hz chẳng hạn. Đặc trưng của các tín hiệu này là tần số thấp, nên khả năng truyền đi cũng không xa được. Vì vậy người ta thường tìm cách "đính kèm" vào một sóng có tần số cao hơn nhiều lần, gọi là sóng mang (carrier), quá trình này gọi là điều chế. Khi nhận được tín hiệu đã qua điều chế này, người ta trích xuất ra thông tin ban đầu, gọi là quá trình giải điều chế. Có 2 phương thức điều chế là:

- điều chế biên độ, gọi tắt là điều biên. Tức là làm cho biên độ của sóng mang thay đổi theo biên độ tín hiệu. Cái này ai hay nghe radio sẽ thấy đó là các kênh AM.

- điều chế tần số, hay điều tần. Tương tự là làm cho tần số sóng mang thay đổi theo biên độ tín hiệu. Trên đài radio sẽ thấy nó ghi là FM.

Đọc giải thích thì hơi khó hiểu, nhìn hình này sẽ hiểu ngay
![](https://upload.wikimedia.org/wikipedia/commons/a/a4/Amfm3-en-de.gif)

*Fun fact*: kiến thức về điều chế tần số đã từng được giảng dạy trong chương trình học phổ thông, môn Công nghệ lớp 11. Hiện nay thì không biết bộ giáo dục đã cải cách đến đâu rồi.

Nói lằng nhằng thế chỉ để giải thích con số 2.4GHz và 5GHz chỉ tần số của sóng mang tín hiệu wifi.

Ok, trên đời có vô số đối tượng muốn truyền tín hiệu, các đôi yêu nhau chẳng hạn, nên mỗi người sẽ chọn một vài tần số nào đấy để phát. Mà sóng thì cũng có hàng tỉ tần số, tại sao cứ phải chọn 2.4 với 5GHz. Thực ra cũng không phải vậy, sóng có tần số sóng khác nhau có những tính chất rất khác nhau, việc sử dụng sóng mang nào còn phụ thuộc loại thông tin được truyền tải. Chẳng hạn sóng cực ngắn không bị khí quyển phản xạ nên được dùng để giao tiếp với vệ tinh... Ngoài ra còn một lí do quan trọng nữa là phát sóng tần số càng cao thì càng... tốn điện. Đấy là còn chưa nói đến ảnh hưởng đến sức khỏe của người sử dụng.

Vì vậy chỉ có một số ít tần số được sử dụng, và tất nhiên khi có ít tần số mà nhiều người muốn dùng thì người ta phải xin phép chính quyền(1). Người định nghĩa ra các tần số của wifi (hay tiêu chuẩn 802.11) là các bác ở IEEE, các bác này thì vẽ ra rất nhiều chuẩn, không kể hết được.

Nói đến 2.4GHz không phải là nói đến 1 tần số, mà gồm 1 dải liên tục nhiều tần số, được gọi là băng tần, từ 2.4GHz đến khoảng 2.5GHz. Tuy nhiên không phải là 1 bộ phát wifi sẽ phát trên toàn bộ băng tần ấy, mà chỉ phát trên một khoảng nhỏ hơn, gọi là kênh. Nếu coi băng tần là một con đường thì mỗi kênh này sẽ tương tự như một làn đường. Chỉ là so sánh gần đúng, vì thực tế là các kênh này sẽ chồng lấn lên nhau một ít. Wifi 2.4GHz được chia thành 14 kênh, rộng 20MHz mỗi kênh, mà tổng độ rộng băng tần của nó chỉ có 100MHz, từ đó có thể đoán ra rằng phần chồng lấn cũng không phải là ít. Vì thế nhiễu tương đối cao do các bộ phát trên các kênh khác nhau vẫn tranh chấp nhau. Thực tế nhiều quốc gia quy định chỉ cho phép bộ phát được phát trên vài kênh không chồng lấn. Ở Việt Nam thì không có chuyện đó, mọi người được tự do cấu hình AP phát trên bất kỳ kênh nào tùy thích, dân chủ đến thế là cùng.

![Các kênh 802.11 2.4GHz](/assets/images/2017/07/hinh1-6-large.jpg)

*Hình trên tả cảnh các con kênh chen chúc nhau trong băng tần 2.4GHz*

Ngoài ra, cũng phải nói thêm là ngoài wifi có khá nhiều thiết bị phát trong băng tần này, như một số loại điện thoại di động, bluetooth, và, bất ngờ làm sao, lò vi sóng cũng phát ra sóng ở tần số 2.45GHz. Điều này làm cho sóng wifi phát trên băng tần 2.4GHz bị nhiễu rất nhiều.

Nói đến độ rộng kênh thì kênh càng rộng tàu bè qua lại càng dễ. Nhận thấy điều đó, ông Shannon (một nhà toán học lỗi lạc đặt nền móng cho ngành viễn thông, nay đã ra người thiên cổ), đã phát biểu một công thức động trời:

C = W*log2 (1+ S/N)

Với:

- C: thông lượng, hay số bit được truyền trên 1 giây
- W: độ rộng kênh
- S: công suất tín hiệu
- N: công suất nhiễu

Qua đó thấy rằng muốn truyền thông tin ồ ạt ngoài giảm nhiễu, tăng công suất phát thì nên xem xét mở rộng băng thông.

Tất nhiên điều đấy thì trẻ con nó cũng hiểu nhưng mà chúng ta lại phải giải quyết một nghịch lý mang tính chất chính trị ở (1), làm cho việc mở rộng băng thông không phải là điều dễ dàng. Sau một thời gian đàm phán và suy nghĩ vất vả thì các bác IEEE cũng đi đến được lựa chọn ra băng tần 5GHz, từ 5 đến 6 thế là có hẳn 1GHz tha hồ mà chia kênh. À ừ thì cũng phải giả cho đội radar thời tiết một ít, nhưng mà thế cũng dùng nhòe rồi. Kênh rộng nhất của wifi 5GHz có thể lên tới 160MHz, so với 20MHz thì đúng là kinh khủng, nghe đâu có thể lên đến suýt soát 7Gb/s, nhanh hơn cả SATA 3 thì phải.

Nghe đồn chuẩn wifi 802.11ad còn được phát trên băng tần 60GHz. Mong là tần số này vẫn an toàn cho đường sinh sản.
