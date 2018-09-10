---
title: "[angularjs] Random background directive powered by Flickr"
permalink: angularjs-random-background-directive-powered-by-flickr
image: /content/images/2015/06/Flickr_logo.png
---

> Trong tut nhỏ này mình sẽ hướng dẫn các bạn mới bắt đầu với angularjs làm một directive để đặt một ảnh random lấy từ flickr làm background cho một phần tử HTML.

## Directive là gì?
Directive cho angular biết cần phải xuất dữ liệu ra như thế nào. Mình nhấn mạnh là xuất dữ liệu ra như thế nào chứ không phải dữ liệu trông như thế nào, tức là ở đây muốn nói đến cách thức trình diễn dữ liệu chứ không phải cách thức hiển thị. Ví dụ:

- `ng-repeat` cho biết dữ liệu là một "iterable" tức là thứ có thể lặp lại được, như mảng chẳng hạn. Việc trình diễn sẽ là lặp quanh mảng này và đưa ra các ứng xử giống nhau với các phần tử của mảng.
- `ng-model` cho biết dữ liệu có thể được thay đổi bởi người dùng và cập nhật với view model. Về mặt hiển thị đó có thể là textbox, checkbox, combobox,...

Tóm lại khi nghĩ đến việc thiết kế một directive, tốt nhất là hãy cân nhắc xem directive đó làm việc gì chứ không phải là nó sẽ trông như thế nào.

Ở đây, directive của chúng ta sẽ thực hiện việc lấy một cái hình bất kỳ trên flickr (đẹp đẹp một tí) và đặt nó làm background cho phần tử mà nó gắn vào.

##Flickr API
Có nhiều cách để tìm được một bức ảnh đẹp, như dùng google images, bing images. Tuy nhiên theo mình thấy trên flickr chất lượng ảnh tốt mà lại có API đàng hoàng xem ra có vẻ "pro" hơn cả. Vậy việc đầu tiên cần làm là ~~viết~~ mở tài liệu của flickr ra xem api nó như nào [#](https://www.flickr.com/services/api/).

Một phương thức trong của flickr API sẽ được gọi nhờ gửi request đến đường dẫn
```
https://api.flickr.com/services/rest/?api_key={apiKey}&method={method}&...
```
API key là thứ các bạn cần lấy trên trang developer của Flickr. Hãy tạo mới một app và lấy key.
Phần ... là các tham số khác, tham khảo trong tài liệu. Có 2 tham số ta chắc chắn sẽ dùng là:

- `format=json`
- `nojsoncallback=1`

2 tham số này bảo với flickr API là tao cần dữ liệu json, không cần gọi callback jsonp gì cả. Ví dụ ở đây tôi cần tìm các ảnh có gắn tag women, request `GET` sẽ được gọi đến là:

```
https://api.flickr.com/services/rest/?api_key={key}&method=flickr.photos.search&format=json&nojsoncallback=1&tags=women
```

## Flickr service
Mình sẽ viết thành 1 service gọi flickr API cho nó pro, thực tế chỉ là đóng gói $http service của angular lại để gọi flickr API. Vì mình muốn có thể cấu hình apiKey nên sẽ sử dụng công thức provider

```js
angular.module('app', [])
  .provider('flickr', flickrProvider)

function flickrProvider() {
  var API_key;
  var link = 'https://api.flickr.com/services/rest/';

  this.config = function (params) {
    API_key = params.key;
  }

  this.$get = function($http, $q) {
    return {
      call: call,
    }

    function call(params) {
      params = angular.extend({}, params, {
        api_key: API_key,
        format: 'json',
        nojsoncallback: 1
      });
      var opts = {
        url: link,
        params: params
      };

      return $http(opts).then(function (rsp) {
        var data =  rsp.data;
        if(data.stat !== 'ok') {
          var error = new Error('API call failed');
          error.detail = data;
          return $q.reject(error);
        }
        return data;
      }).catch(console.error.bind(console));
    }
  }
}

```

Tốt rồi, bây giờ sử dụng service này tìm kiếm hình ảnh như sau

```js
flickr.call({
	method: 'flickr.photos.search',
    tags: tags,
    sort: 'interestingness-desc',
    per_page: 30,
    group_id: '17274427@N00',
    extras: 'url_l, url_o'
});
```
Extras params sẽ báo cho thằng Flickr biết tao cần link ảnh lớn `url_l` và link ảnh gốc `url_o` coi cho đã. Group_id ở đây là id của groud 300 views. Mình thấy group này có nhiều ảnh đẹp.

## `flickr-background` directive

```js
function flickrBackground(flickr) {
  var _directive = {
    restrict: 'A',
    link: link
  };

  return _directive;

  function link(scope, elm, attr) {
    elm[0].style.backgroundSize = 'cover';
    elm[0].style.backgroundRepeat = 'no-repeat'

    attr.$observe('flickrBackground', fetch)

    function fetch(tags) {
      tags = tags || 'natural, landscape, green';
      flickr.call({
        method: 'flickr.photos.search',
        tags: tags,
        sort: 'interestingness-desc',
        per_page: 30,
        group_id: '17274427@N00',
        extras: 'url_l, url_o'
      }).then(function (data) {
        var photos = data.photos.photo.filter(function (item) {
          return item.url_l;
        });
        var randomPhoto = randome(photos);
        var photoURL = randomPhoto.url_o || randomPhoto.url_l;
        elm[0].style.backgroundImage = 'url({{photoURL}})'.replace('{{photoURL}}', photoURL);
      });
    }

    function randome(arr) {
      var id = Math.floor(Math.random() * arr.length);
      return arr[id];
    }
  }
}
```

`_directive` ở dòng 2 gọi là Directive definition object DDO - đối tượng định nghĩa directive, dùng để định nghĩa các thuộc tính của directive. Ở đây chúng ta thấy có 2 thuộc tính được dùng:

- `restrict`: giới hạn cách dùng directive, viết tắt 'E': element, 'A': attribute, 'M': comment, 'C': class. Ví dụ, `restrict: 'EA'` có thể được dùng là

```
<a-directive>
</a-directive>
<!-- hoặc -->
<div a-directive></div>
```

- `link`: quá trình gắn directive vào phần tử DOM. *Đây nên là nơi duy nhất DOM có thể được truy cập trong Angular*

Như các bạn thấy trong khi link mình theo dõi sự kiện thuộc tính `flickr-background` thay đổi, tìm hình ảnh, và thay vào background của phần tử.

Toàn bộ source code có thể xem tại [plunker](http://plnkr.co/edit/LUlOwBIbhhuvC3ceJPvy?p=info)
