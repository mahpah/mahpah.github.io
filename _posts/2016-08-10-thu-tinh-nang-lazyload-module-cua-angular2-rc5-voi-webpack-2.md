---
title: Thử tính năng lazyload module của angular2 rc5 với webpack 2
permalink: thu-tinh-nang-lazyload-module-cua-angular2-rc5-voi-webpack-2
layout: post
---

Hello bà con, hôm nay team angular2 release phiên bản RC5 có một số thay đổi, trong đó có việc giới thiệu NgModule và khả năng lazy load cho router. Em cũng xem qua vì hứng thú với lazy load.

NgModule thì dễ hiểu rồi, nhất là đối với các bác đã làm angular 1. Đó là một gói các thành phần gồm provider, component, pipe, module con. Khai báo như này:

```
@NgModule({
  imports: [
    // các module phụ thuộc, route cũng sẽ tính là module, tí nói sau.
  ],
  declarations: [
    // các thứ dùng trong template, tức là component, directive với pipe
  ],
  bootstrap: [
    // cái module chính có cái này để bộ dịch biết load cái component nào là root.
  ],
  providers: [
    // các provider
  ],
})
class AppModule {}
```

OK. Quay lại routes, chúng ta cần khai báo một route module như vầy
```
import { Routes, RouterModule } from '@angular/router';
export const AppRoutes: Routes = [
  {
    path: '',
    component: MainWrapper,
    children: [
      {
        path: 'library',
        // component này là lazy, khi nào access route 'library' mới load.
        loadChildren: './library', // (*)
      },
    ],
  }, {
    path: 'login',
    // đây là 1 component bình thường, load cùng app
    component: Login,
  },
];
export const routeModule = RouterModule.forRoot(AppRoutes);
```

Sau đó khai báo vào NgModule:
```
@NgModule({
  imports: [
    routeModule
  ],
})
class AppModule {}
```

Phần ví dụ trên dùng SystemJS, chỗ (*) load rất đơn giản vì systemjs load async tât cả các file rồi. Tuy nhiên mình lại bundle bằng webpack, tất cả gộp làm 1 nên phải sửa đổi 1 tí.

Về webpack thì nó hỗ trợ chia nhỏ bundle thành các chunk, để làm được điều này thay vì import trực tiếp thì các bác dùng require.ensure với webpack 1 và system.import với webpack 2:

```
// wp1
require.ensure([], (require) => {
   require(path-to-file)
})

// wp2
System.import(path-to-file)

```
Phần require.ensure mình không chắc chắn lắm, đại khái thế.
Khi build webpack sẽ nhét các file này vào các chunk riêng, lúc nào gọi mới load.

Như thế chúng ta có thể khai báo router như sau:

```
// chỗ này để ngăn thằng typescript báo lỗi type missmatch
const asyncWrap: Type = (a: Function) => a;

export const AppRoutes: Routes = [
  {
    ...
    children: [
      ...
      {
        path: 'library',
        loadChildren: asyncWrap(() => System.import('./library').then(r => r.LibraryModule)),
      },
    ],
  },
  ...
];

```
Dụng ý là đưa cho loadChildren một hàm, và bảo nó khi nào load component thì thực thi hàm này để lấy ra file cần load.  
Chúng ta cần sửa đổi `NgModuleFactoryLoader`, cái này thực hiện việc load module async

```
import {
  NgModuleFactoryLoader,
  Injectable,
  Compiler,
  NgModuleFactory,
  Type,
} from '@angular/core';

@Injectable()
export class AsyncNgModuleLoader implements NgModuleFactoryLoader {
  constructor(private compiler: Compiler) {}

  load(modulePath: string | Function): Promise<NgModuleFactory<any>> {
    if (typeof modulePath === 'function') {
      return Promise
        .resolve(modulePath())
        .then((type: any) => checkNotEmpty(type, '', ''))
        .then((type: any) => this.compiler.compileModuleAsync(type));
    }

    return Promise.resolve(undefined);
  }
}

function checkNotEmpty(value: any, modulePath: string, exportName: string): any {
  if (!value) {
    throw new Error(`Cannot find '${exportName}' in '${modulePath}'`);
  }
  return value;
}
```

Sau đó khai báo với App là tao dùng thằng loader mới này thay cho thằng cũ. Dependencies injection muôn năm

```
@NgModule({
  ....
  providers: [
    { provide: NgModuleFactoryLoader, useClass: AsyncNgModuleLoader },
  ],
})
export class AppModule {}
```

Chạy ngon. Đã gì đâu.
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/blob_ase1sdgxhh)

*Hình trên thể hiện cảnh file `0.bundle.js` được load khi click link library.*

Viết xong đọc suýt hiểu, thôi thì đây là [repo minh họa](https://bitbucket.org/mahpah/craven) =)))

Sắp tới em sẽ tổng hợp một series về angular2, tùy độ nhiệt tình của các bác. Không thích thì hoy đi nha.

----
[*] AsyncLoader được ăn trộm, hoặc lấy cảm hứng từ repo của [Brandon Roberts](https://github.com/brandonroberts/angular2-webpack)

*Bài viết cũng được post trên [kipalog](http://kipalog.com/posts/Thu-tinh-nang-lazyload-module-cua-angular2-rc5-voi-webpack-2)*
