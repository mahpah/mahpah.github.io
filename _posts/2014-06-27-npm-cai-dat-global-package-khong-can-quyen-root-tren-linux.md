---
permalink: npm-cai-dat-global-package-khong-can-quyen-root-tren-linux
title: "[npm] cài đặt global package không cần quyền root trên linux"
---

Tại sao phải làm điều này?

- Vì quá mệt mỏi phải gõ sudo trước mỗi lệnh npm install -g

- Gặp lỗi khi cài [yeoman genarator](http://stackoverflow.com/questions/18212175/npm-yeoman-install-generator-angular-without-sudo)

Sau khi search loanh quanh cuối cùng mình tìm được cách này. (Lưu ý: đọc chú ý cuối bài trước khi làm)

1 – Tạo thư mục .npm-packages trong home để đảm bảo bạn có đủ quyền với nó
```
mkdir -p ~/.npm-packages
```
2 – Thêm biến vào  file ~/.bashrc
```
NPM_PACKAGES="~/.npm-packages"
```
3 – Tạo file ~/.npmrc và thêm cái dòng này vào:
```
prefix=~/.npm-packages
```
4 – Thêm dòng này vào file ~/.bashrc để node nó biết chỗ để global package, ngoài ra thêm mấy dòng cuối để tìm được các gói đã cài rồi với cả sách hướng dẫn sử dụng.
```
NODE_PATH="$NPM_PACKAGES/lib/node_modules:$NODE_PATH"
PATH="$NPM_PACKAGES/bin:$PATH"
# Unset manpath so we can inherit from /etc/manpath via the `manpath`
# command
unset MANPATH  # delete if you already modified MANPATH elsewhere in your config
MANPATH="$NPM_PACKAGES/share/man:$(manpath)"
```
Chú ý cực to:

– Dường như từ sau npm 1.4.10 file npmrc đã không còn được dùng nữa, các thím phải kiểm tra xem mình đang dùng ver nào bằng npm -v nhé. Nếu trót dùng ver mới hơn mà vẫn muốn chơi bài này thì downgrade nó đi:
```
sudo npm i -g npm@1.4.10
```
Nếu không thì chỉ còn cách thêm tham số `–prefix=”/path/to/dir”` mỗi lần cài -g thôi :P

Theo http://stackoverflow.com/questions/10081293/install-npm-into-home-directory-with-distribution-nodejs-package-ubuntu/13021677#13021677
