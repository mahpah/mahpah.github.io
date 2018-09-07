---
title: Build Brackets.io trên Ubuntu
permalink: build-brackets-io-tren-ubuntu
layout: post
---

> **UPDATE**: Hiện brackets đã release 1.0 và có build cho Ubuntu

[Brackets.io](http://brackets.io/) là một code-editor mã nguồn mở dành cho việc thiết kế và phát triển web được phát triển bởi “some guys in Adobe” (từ hồi sắp tận thế đến giờ Adobe có vẻ tự nhiên quan tâm đến open-source lạ nha). Slogan của nó là “build with the web for the web“. Tại sao lại có slogan này thì bài sau mình sẽ giải thích. Còn bây giờ là note nhanh lại cách cài trên Ubuntu .

Hiện tại Brackets chưa chính thức release mà mới ra đến các bản dev sau mỗi sprint. Hiện đã đến Sprint 19 mà vẫn chưa được build cho Linux, mới có Windows và Mac. Việc cài dưới đây sử dụng sprint 16, sprint 19 do thay đổi về cách hiển thị menu, ở đây chưa update kịp

Để dễ tưởng tượng thì có thể giải thích nôm na là Brackets được viết gồm 2 phần brackets-shell (đấy là một engine giống như engine của trình duyệt để render HTML và CSS ra các phần tử giao diện như ta thấy trên màn hình) và UI (html + css + js). Đây chính là build with the web đây :D

Dài dòng văn tự thế thôi chứ tóm gọn lại là chúng ta sẽ build bản mod của một anh đẹp zai khoai không biết thế nào tên là Pritam Baral [github](https://github.com/pritambaral)

## 1 – Chuẩn bị

cài gyp:
```sh
sudo apt-get install gyp

# cài các gói dependency
sudo apt-get install build-essential libgtk2.0-dev libglib2.0-dev
```


##2 – Build brackets-shell

Brackets-shell chạy với Js engine CEF của google. Cái này chưa có build bản cài trên Linux. Down 1 bản source code ở đây https://github.com/pritambaral/brackets-shell/downloads
Khuyến cáo bạn chọn cef_binary_3.1271.889_linux 32 hoặc 64 bit tùy hệ thống.

Clone cái github này về https://github.com/pritambaral/brackets-shell
```sh
git clone https://github.com/pritambaral/brackets-shell -b linux
```

Nhớ là clone xong phải kiểm tra xem mình ở đúng branch linux chưa, cái này hết sức quan trọng, không có là ko build được đâu.

```sh
git branch
git checkout linux
```

trong thư mục brackets-shell tạo thư mục deps, giải nén cef_binary ra thư mục /cef trong deps

Cấu trúc thư mục sẽ như sau
```
brackets-shell
   deps
      cef
         // CEF3 binary content in this folder
   appshell
      // appshell source
   README.md
   ...
```
chạy các lệnh sau trong thư mục brackets-shell để biên dịch

```sh
scripts/make_symlinks.sh
gyp --depth .
make
```
Sau khi build thành công sản phẩm nằm trong thư mục out/Release

##3 – Hoàn tất

Down bản brackets mới nhất, ở đây là sprint16 https://github.com/downloads/pritambaral/brackets-shell/brackets-sprint-16.tar.bz2

Giải nén vào thư mục brackets-shell Release vừa dịch

Chạy Brackets.

Done!



 ----

**OK, và sau đây là một bí mật**

Đó là các bạn không nhất thiết phải build vì trong trang download anh ý build sẵn cho chúng ta brackets-shell rồi, để ý là thấy :)













