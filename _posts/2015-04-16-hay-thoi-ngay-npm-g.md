---
permalink: hay-thoi-ngay-npm-g
image: /content/images/2015/04/Npm-logo-svg.png
title: Ai cần nodejs global package?
---

*Or `npm run` to run them all*

Đây là điều tôi học được sau một thời gian sử dụng [npm làm build tool](http://mahpahh.com/su-dung-npm-lam-build-tool/) thay cho gulp hay grunt hay đủ loại js build tool khác. Như các bạn đã biết, có 2 vị trí đặt các gói của nodejs/iojs là locals ```your-directory/node_modules``` và global ```{prefix}/bin``` (với prefix thường là /usr/locals). Thường thì các gói bạn sử dụng trong chương trình của mình (programmatic) sẽ được cài local và các gói được sử dụng như một lệnh shell thì cài global.

Ví dụ, tôi dùng [grunt](http://gruntjs.com) làm build tool, tôi sẽ phải cài grunt local và grunt-cli global chỉ để có lệnh shell dùng trong việc build grunt locals, chẳng hạn
```
npm install --global grunt-cli
grunt concat:dist
```
## chửi
Chuyện gì xảy ra nếu tôi tham gia vào một dự án khác dùng grunt locals bản cũ hơn và grunt-cli (luôn được cập nhật bản mới nhất, tất nhiên) của tôi từ chối chạy? Hẳn là tôi phải downgrade grunt-cli xuống bản cũ hơn rồi. Thật là phiền toái, lát nữa đến tối tôi lại lang thang contribute cho các dự án nguồn mở khác, tôi lại phải chuyển lại grunt-cli mới của mình !#@%^$%^. Sự việc cũng tương tự (có khi còn rắc rối hơn) khi đội trưởng dự án yêu cầu update các gói grunt plugin.

Một rắc rối nữa, tôi thường phải cài đặt các gói global với quyền sudo, vì thư mục {prefix} mặc định là /usr/locals thường đòi quyền sudo để ghi. Tất nhiên có thể khắc phục được, song cũng mất thời gian[#](http://mahpahh.com/npm-cai-dat-global-package-khong-can-quyen-root-tren-linux/). Hôm nọ tôi thử deploy một app lên một cloud platform, mà để build thì lại phải dùng grunt-cli. Vậy là tôi phải liên hệ hỗ trợ để họ cài giúp, rất phiền.

## chữa
Khi các bạn cài một gói có file chạy, ví dụ gói grunt-cli có file chạy là grunt, node-sass có file chạy node-sass, npm sẽ tạo đường dẫn đến file vào thư mục `node_modules/.bin`. Vậy nếu bạn gõ đường dẫn đến `node_modules/.bin/ten_file` thì các bạn ngay lập tức dùng được những file này. Ngoài ra vì thư mục ` {global_node_modules}/.bin ` cũng được thêm vào biến môi trường PATH[^1] , vì vậy bạn có thể chạy được các gói đó từ bất cứ đâu.

Có cách nào tiện lợi hơn không? Câu trả lời là có. npm cung cấp cho bạn lệnh npm run dùng để chạy các lệnh quy định trong ```scripts``` của file ```package.json```. Khi chạy các lệnh này thì ```path/to/node_modules/.bin``` tự động được thêm vào PATH.
Ví dụ:
```
npm i grunt-cli //cài local nhé
```

```js
//package.json
{
	"scripts": {
    	"grunt": "concat:dist"
    }
}
```

```
npm run grunt
```
Ồ dê, chạy phà phà luôn.

## Túm lại
- Các gói dùng trong project, bất kể được dùng một các programmatic hay chỉ dùng để build, hãy cài local.
- Các gói là dependency của một ứng dụng nào đó, utility thôi, không liên quan đến bất kỳ project nào, khi đó hãy cài global. Ví dụ plugin sublimelinter-jshint cần jshint thì bạn cài jshint global thôi[^2]. Cố gắng giảm số gói global xuống ít nhất có thể.

---

[^1]: `PATH` là biến môi trường giúp hệ thống xác định vị trí file chạy được gọi. Ví dụ PATH là ```/usr/bin:/usr/locals/bin```, khi bạn gọi ```cp``` thì hệ thống sẽ tìm file chạy cp trong các thư mục ```/usr/bin```, ```/usr/locals/bin``` lần lượt theo thứ tự khai báo. Các hệ điều hành Unix-like, DOS, Windows đều dùng biến môi trường này.

[^2]: Thực tế sublimelinter cho phép bạn thiết lập đường dẫn đến các linter. Bạn có thể cài jshint vào thư mục package của sublime chẳng hạn, sửa đường dẫn đến nó, vậy là sau này sẽ được move cùng sublime, tiết kiệm kha khá thời gian thiết lập môi trường phát triển.
