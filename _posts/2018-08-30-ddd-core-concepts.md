---
title: DDD core concepts
tags:
    - DomainDrivenDesign
---

> Do các khái niệm này còn khá lạ lẫm, nếu đọc vào tài liệu ngay sẽ rất mông lung nên mình liệt kê ra các thuật ngữ cơ bản chia theo các nhóm để mọi người cò dàn ý tìm  hiểu theo cho dễ.

Trước khi nói về các thuật ngữ trong DDD, cần nhắc lại một chút về pattern. Pattern là một "giải pháp chung cho một vấn đề nào đó thường lặp đi lặp lại nhiều lần", ví dụ để giải quyết vấn đề là laptop của mình sử dụng nguồn điện có hiệu điện thế 12V, trong khi các ổ điện trong nhà đều ở mức 220V, mình sử dụng pattern adapter để chuyển đổi nguồn điện, pattern này được implement cho nhiều laptop khác nhau, nhưng đều có chung giải pháp là sử dụng máy biến thế. Như vậy khi nói đến pattern, cần quan tâm đến "vấn đề" và "giải pháp", nhưng cần nói rõ giải pháp là định hướng cách giải quyết, không phải là một thực thi cụ thể.

DDD có thể coi là một cách tiếp cận vấn đề, hơn là giải pháp hay nhóm các giải pháp. Ta có thể bắt gặp một vài pattern thường dùng, nhưng không có nghĩa là cứ implement các pattern đó là làm DDD.

## Các thuật ngữ về process

- *Domain*, tức lĩnh vực. Cái này chỉ không gian khái niệm mà sản phẩm của chúng ta đang cố gắng muốn giải quyết vấn đề trong đó. "Không gian khái niệm" là một từ mình tự bịa ra, ý nghĩa là "domain" sẽ giúp xác định được ý nghĩa của một khái niệm nào đó, không chỉ bao gồm các định nghĩa mà còn gồm cả cách thức hoạt động. Ví dụ trong lĩnh vực "thực phẩm", "cần" là một loại rau, dùng để xào thịt bò, ăn bằng cách bỏ vào mồm nhai, nhưng trong khái; trong khi trong lĩnh vực phê và tự phê, "cần" lại chỉ một loại lá gây nghiện, rút gọn từ "cần sa", sử dụng bằng cách mút. Ứng dụng evermind, chẳng hạn, có thể xếp vào lĩnh vực "Văn thư lưu trữ".

- *Subdomain*: Domain thường rất rộng và chung chung, mỗi sản phẩm thường chỉ tập trung vào giải quyết vấn đề trong một phần nào đó của lĩnh vực, ta có khái niếm subdomain. Đây có lẽ chỉ là khái niệm góp phần vào việc làm rối trí developer.

- *Bounded Context*: Khi đã hiểu về các khái niệm và luồng hoạt động của trong domain, ta nhận thấy có thể chia nhỏ chúng thành một nhóm các hoạt động có liên quan đến nhau. Chẳng hạn một lĩnh vực tiêu biểu như thư viện, có các hoạt động về nhập và dán nhãn sách, hầu như không có dính líu gì đến việc quản lý thành viên cũng như cho mượn sách vở. Nên chú ý rằng việc xác định bounded context phụ thuộc cách nhìn nhận của chúng ta đối với vấn đề, chứ không phải là sự phân loại của các chuyên gia lĩnh vực đặt ra, mà trong quá trình phát triển chúng ta tự cảm nhận được, có thể trùng khớp với phân loại của các chuyên gia nọ, hoặc không. Bounded context giúp phân chia giải pháp thành các vấn đề nhỏ hơn, từ đó nghĩ ra cách áp dụng pattern cụ thể sao cho phù hợp. Như vậy, domain là khái niệm liên quan đến *vấn đề*, còn bounded context liên quan đến giải pháp. Một đối tượng có thể quan trọng trong bounded context này, nhưng sẽ không quan trọng trong context khác. Chẳng hạn là người quản lý nghiệp vụ nhập và lưu trữ sách, tôi chỉ quan tâm có 3 bản đang được mượn, còn người quản lý thành viên và mượn sách có thể cần biết 3 cuốn đó do ai mượn và mượn từ lúc nào.

## Các thuật ngữ về mô hình

Các khái niệm này là ánh xạ các đối tượng thực tế để đưa vào code

- *Entities*

- *Value Object*

- *Services*

## Sự liên minh giữa các đối tượng

Như đã bàn ở trên, cách ta nhìn nhận vấn đề sẽ giúp chia các đối tượng thành nhiều nhóm có liên hệ mật thiết với nhau trong hoạt động thường ngày của chúng. Từ đó chúng ta có khái niệm aggregate và aggregate root.

- *Aggregate*

- *Aggregate Root*

## Lưu trữ các đối tượng

- *Repository*

