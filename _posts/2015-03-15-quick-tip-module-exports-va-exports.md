---
title: "[quick tip] module.exports và exports"
permalink: quick-tip-module-exports-va-exports
---

Trong nodejs, exports là một biến toàn cục, trỏ đến thuộc tính exports của đối tượng toàn cục module, dùng để khai báo giao diện của một module.
Tại sao lại phải define ra exports, câu trả lời thì tất nhiên là để cho tiện, bớt đi được 7 ký tự so với cách gõ module.exports, tiết kiệm rất nhiều công sức (thật không nhỉ?). Tuy nhiên có một vấn đề cần chú ý, nếu bạn khai báo giao diện module theo cách như thế này:

{% highlight javascript %}
module.exports = {
    awesomeMethod: awesomeMethod
};
{% endhighlight %}

thì module.exports đã trỏ sang một đối tượng khác, bây giờ module.exports !== exports. Từ sau phép gán này trở đi, exports sẽ không còn tác dụng nữa. Chú ý này tuy nhỏ nhưng một lúc nào đó sẽ giúp giải thích các đoạn code rất ma quái.
Để phòng tránh, tốt nhất là nên thống nhất, hoặc chỉ dùng exports, hoặc chỉ dùng module.exports.
Be consistent, cheers.
