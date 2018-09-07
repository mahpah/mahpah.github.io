---
title: Ruby gem install certificate verify failed
permalink: ruby-gem-install-certificate-verify-failed
layout: post
---

Sáng nay chuyển qua windows định cài sass thì dính lỗi này.

```
λ gem install sass
ERROR:  Could not find a valid gem 'sass' (>= 0), here is why:
          Unable to download data from https://rubygems.org/ - SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed (https://api.rubygems.org/latest_specs.4.8.gz)
```
Chuyện là để an toàn thì máy chủ và máy khách cần có một hệ thống ổ khóa và chìa khóa do một bên uy tín (CA - certificate agency) cung cấp, ví dụ Việt Tiệp, ở xứ Tây gọi tắt là SSL . Ổ khóa, tây gọi là private key, do anh máy chủ cầm và giấu đi, mỗi khi có anh khách nào hỏi thông tin, ở đây chính là gem của chúng ta hỏi thì ảnh đòi xem chìa (public key) của chúng nó xem có khít với khóa của ảnh không. Khít thì mới cho quan hệ. Gem thì tất nhiên có sẵn public key và chúng ta chẳng cần quan tâm đến nó. Bỗng một ngày đẹp trời anh server anh ấy đổi hình thức đọ khóa từ SHA-1 sang SHA-2 thế là các anh gem cũ chết thẳng cẳng vì chưa biết mặt mũi cái chìa mới như nào.

Thật may mắn là các nhà phát triển ruby gem đã kịp thời cập nhật để chúng ta có thể lấy được gem về "ép đồ". Vậy điều duy nhất cần làm là cập nhật gem.

1. Tải bản cập nhật
Đầu tiên kiểm tra phiên bản gem đang dùng ```gem --version```, sau đó tải bản update tương ứng
  - Running 1.8.x: download [1.8.30](https://github.com/rubygems/rubygems/releases/tag/v1.8.30)
  - Running 2.0.x: donwload [2.0.15](https://github.com/rubygems/rubygems/releases/tag/v2.0.15)
  - Running 2.2.x: download [2.2.3](https://github.com/rubygems/rubygems/releases/tag/v2.2.3)

2. Và, bạn đoán đúng rồi, cài nó
```
λ gem install --local "path\to\rubygems-update-2.2.3.gem"
λ update_rubygems --no-ri --no-rdoc
```

And here we go, it work like a charm
```
λ gem -v
2.2.3

λ gem install sass
Fetching: sass-3.4.13.gem (100%)
Successfully installed sass-3.4.13
Parsing documentation for sass-3.4.13
Installing ri documentation for sass-3.4.13
Done installing documentation for sass after 12 seconds
1 gem installed
```

Tất nhiên nếu bạn là một bad ass programmer thì hẳn bạn sẽ yêu thích cách thủ công dưới đây
[Source](https://gist.github.com/luislavena/f064211759ee0f806c88)
