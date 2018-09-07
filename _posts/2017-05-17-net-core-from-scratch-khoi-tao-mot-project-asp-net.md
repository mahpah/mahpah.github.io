---
title: ".NET Core from scratch: Khởi tạo một project ASP.NET"
permalink: net-core-from-scratch-khoi-tao-mot-project-asp-net
layout: post
---

> Trong loạt bài này, tôi log lại những kiến thức thu được qua việc học CSharp và ASP.NET từ con số 0. Mong rằng loạt bài này sẽ giúp ích cho các bạn mới bắt đầu tìm hiểu ASP.NET Core để xây dựng các ứng dụng web-based

- **Phần 1**: Khởi tạo một project ASP.NET (from scratch)

## Walkthrough: Các bước khởi tạo một ASP.NET Core server cơ bản

### Prerequisite

Ở đây tôi giả thiết rằng các bạn đã cài đạt được dotnet core, bao gồm runtime và SDK. Hãy cùng nhắc lại một chút, .NET Framework là một framework (thank you, Captain Obvious), bao gồm tập hợp các thư viện, tiện ích, công cụ, đồ chơi và mô hình giúp tạo và chạy các ứng dụng chủ yếu trên môi trường windows. Điểm đạc biệt của framework này là hỗ trợ nhiều ngôn ngữ. Các ngôn ngữ trong dòng họ này đều được dịch ra một loại mã trung gian là *Common Intermediate Language* để chạy trên một môi trường thực thi tên là *Common Language Runtime*, hay CLR, tương tự Java byte code chạy trên máy ảo Java. Nhờ đó các thư viện viết bằng các ngôn ngữ khác nhau có thể sử dụng chéo nhau. Điều này cũng hứa hẹn là ứng dụng sẽ chạy cross-platform, miễn là CLR có thể chạy trên các platform này. Sau nhiều năm dừng ở mức hứa hẹn thì điều này đang dần trở thành hiện thực nhờ việc release phiên bản .NET Core, phiên bản cross platform và **open source** của .NET Framework.

![.NET Framework component stack, from wikipedia](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/DotNet.svg/300px-DotNet.svg.png)

- Runtime: như đã nói, thành phẩn này chỉ giúp các ứng dụng có thể thực thi dược. .NET Core sử dụng runtime tên là [coreclr](https://github.com/dotnet/coreclr)
- SDK: bộ công cụ phát triển, đây là công cụ dành cho các công nhân lập trình chúng ta, SDK của .NET Core chỉ có một cli tool (Command Line Interface - Công cụ sử dụng giao diện dòng lệnh) tên là `dotnet`. Ngoài các thao tác cơ bản, công cụ này còn cho phép tùy từng dự án mà tải thêm phần mở rộng để có thêm chức năng mong muốn. `dotnet ef` của Entity Framwork là một ví dụ.

Ngoài các công cụ trên thì bạn nên có những hiểu biết cơ bản về Web cũng như Giao thức HTTP. Tôi sẽ cover trong một bài viết khác.

Bắt tay vào tạo project mới từng bước một. Phần đưới đây target chủ yếu đến môi trường Linux, các môi trường khác có cách thực hiện tương tự.

### Step 1: Tạo mới project

Bắt đầu với việc tạo mới một folder, trong folder đó tạo một file có đuôi .csproj chỉ dịnh kiểu project muốn tạo.

```sh
# bash
$ mkdir MyAwesomeAspNetServer
$ cd MyAwesomeAspNetServer
$ code ./MyAwesomeAspNetServer.csproj
```
```xml
<!-- filename: MyAwesomeAspNetServer.csproj -->
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>netcoreapp1.1</TargetFramework>
  </PropertyGroup>
</Project>
```

Convention ở đây là đặt tên folder trùng với tên project và tên file csproj. Đây cũng sẽ là tên namespace gốc của chúng ta.

> `namespace` là vùng khai báo các đối tượng liên quan đến nhau. Một ứng dụng thường có rất nhiều class và có thể có cùng tên, vì vậy cần đến `namespace` để tránh việc phải thêm thắt các từ không cần thiết vào tên lớp chỉ để tránh việc trùng lặp. Ví dụ, ai đó sẽ phải viết một interface tên là `IPhonePhảiThêmĐuôiThếNàyVìAppleĐãĐăngKýTênKiaNhưngVẫnTrùngNênPhảiThêmTiếpĐoạnNày`.
>
> `namespace` có thể lồng nhau. Để refer đến các đối tượng ở namespace khác ta dùng directive `using`, ví dụ `using System.IO;`. Lưu ý cần phân biệt `using` directive dùng để chỉ đẫn cho trình dịch biết chúng ta đang refer đến một namespace khác, vả `using` statment là một câu lệnh tương tự như `try - catch`.

Target framework chỉ cho compiler biết chúng ta sử dụng phiên bản .NET framework nào, có rất nhiều phiên bản, ví dụ .NET 3.0, 4.0..., tất nhiên tôi chỉ sử dụng các bản .NET Core là phiên bản cross platform, chạy được trên nhiều môi trường, ngoài windows.

Sau dó dùng lệnh `dotnet restore`, thấy ngay 1 thư mục `obj` hiện ra. Vậy thư mục này chính là thư mục chứa các gói mà dotnet cli tải về. Hãy cho nó vào gitignore.

Thêm gói `Microsoft.AspNetCore`, sử dụng lệnh.

```sh
dotnet add package Microsoft.AspNetCore
dotnet restore
```

Nếu mở file `MyAwesomeAspNetServer.csproj` bạn sẽ thấy xuất hiện thêm 1 đoạn:

```xml
<ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore" Version="1.1.2" />
</ItemGroup>
```
Như vậy dotnet cli đã thêm giúp chỉ đẫn đến 1 package cùng phiên bản tương ứng vào vào đây, để khi triển khai ở chỗ khác thì chỉ cần restore thì các gói được kéo về. Việc này khá giống với việc dùng lệnh `npm install --save <package>` nếu các bạn đã quen làm việc với nodejs.

Ngoài ra điều này cũng gợi ý rằng chỉ cần sửa file .csproj thêm tên gói tương ứng rồi restore cũng có tác dụng tương tự. Tuy vậy tôi nghĩ rằng việc này không mang tính thực tiễn lắm, bởi `dotnet add package` không chỉ thêm một vài dòng vào file csproj mà còn kiểm tra và tìm phiên bản phù hợp giúp bạn nữa.

> Ngoài `dotnet add package ` bạn còn có thể dùng `dotnet add reference ` để trỏ đến các project khác nữa. Trong phiên bản sắp tới `dotnet add tool ` cũng sẽ được thêm vào để thêm các extension cho cli tool,

Thêm 2 class

`Program`: anh này là entry point của app. Khi chạy sẽ gọi hàm static `Main`, tương dối giống với Java. Trong hàm này khởi tạo WebHostBuilder dùng Kestrel làm server và chỉ định kiểu starup là Startup (OK đặt tên thế nào chả được)
```cs
// @filename Program.cs
using Microsoft.AspNetCore.Hosting;

namespace Minimal {
  public class Program
  {
    public static void Main(string[] args)
    {
      // generate new webhost, using kestrel server
      // specify a startup type, which can be defined in Startup.cs file
      var host = new WebHostBuilder()
        .UseKestrel()
        .UseStartup<Startup>()
        .Build();
      host.Run();
    }
  }
}
```

`Startup`: anh này chỉ cần có phương thức configure là được. Convention là *luôn luôn* đặt tên file giống tên class định nghĩa trong file đó. Cũng có nghĩa là một file chỉ định nghĩa tối đa 1 class.
```cs
// @filename Startup.cs

namespace Minimal
{
  public class Startup
  {
    public void Configure()
    {

    }
  }
}
```
Thử chạy xem

```sh
dotnet run
// Hosting environment: Production
// Content root path: /home/mahpah/repo/labs/minimal-dotnet/bin/Debug/netcoreapp1.1
// Now listening on: http://localhost:5000
// Application started. Press Ctrl+C to shut down.
```

Voilà! Xong, hết việc. Uhm, chắc là chưa, vì dù server đã lắng nghe request nhưng không xử lý gì cả.

### Step2: Add some static files

Thêm gói `Microsoft.AspNetCore.StaticFiles`
```sh
$ dotnet add package Microsoft.AspNetCore.StaticFiles
$ dotnet restore
```

Cấu hình builder, chỉ định thư mục hiện tại làm thư mục gốc
```cs
// @filename Program.cs
new WebHostBuilder()
  // ...
  .UseContentRoot(Directory.GetCurrentDirectory())
  // ...
```
Config startup task
```cs
// @filename Startup.cs
public void Configure(IApplicationBuilder app)
{
  app.UseStaticFiles();
}
```
Tạo thư mục webroot, mặc định là `${content-root}/wwwroot`
Thêm vài file lăng nhăng
Run thử và curl để xem. Done.

![](https://mahpahh.com/assets/images/2017/05/Screenshot-from-2017-05-17-21-27-32.png)

### Step 3: First controller

Với việc sử dụng mô hình MVC, mỗi request đến server sẽ được xử lý bởi một phương thức nào đó của controller. Ví dụ, GET request đến uri: `http://localhost:5000/api/blog` sẽ được xử lý bởi phương thức `BlogController.GetAll()`.

> Đọc thêm về MVC https://docs.microsoft.com/en-us/aspnet/core/mvc/overview

Đầu tiên tôi thêm gói `Microsoft.AspNetCore.Mvc` để dùng các công cụ dành riêng cho mô hình MVC.
```sh
$ dotnet add package Microsoft.AspNetCore.Mvc
$ dotnet restore
```

Cấu hình lại class Startup
```cs
// ...
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

public void ConfigureServices(IServiceCollection services)
{
  // Dòng này chỉ ra rằng tôi muốn sử dụng các service của MVC trong ứng dụng.
  // Tôi sẽ giải thích thêm sau.
  services.AddMvc();
}

public void Configure(IApplicationBuilder app)
{
  // Tương tự dòng này chỉ dẫn rằng hãy xử lý các request đến theo mô hình MVC
  app.UseMvc();
}
```

Sau đó thêm một controller nho nhỏ, với một phương thức Get duy nhất.

```cs
// @filename DumbController.cs
using Microsoft.AspNetCore.Mvc;

namespace Minimal.Controllers {

  [Route("/route-den-dumb-controller")]
  public class DumbController : Controller {

    [HttpGet]
    public IActionResult GetSomething() {
      return Ok(new { name = "minimal" });
    }
  }
}
```
Trông hơi lạ mắt thì phải. Ở đây chúng ta sử dụng thêm các attribute, cũng nằm trong gói công cụ của `Microsoft.AspNetCore.Mvc`, ví dụ `[Route(string uri)]`, hoặc `[HttpGet]`, `[HttpPost]`... Thực tế tên đầy đủ của nó là `RouteAttribute`... và bạn có thể viết là `[HttpGetAttribute]`, nhưng bớt được chữ nào hay chữ ấy phải không? Đây là một trong số các kỹ thuật thuộc mô thức `Declarative programing paradigms`, hay lập trình khai báo, ý tưởng là bạn chỉ cần mô tả mình muốn làm gì, thay vì mô tả cách làm việc đó như thế nào. Ở đây code tuy trông lạ mắt (với một số người) nhưng vẫn có thể doán là controller đón các request đến địa chỉ được khai báo và thực thi phương thức tương ứng với HTTP Method.

Thử chạy app. Mượt luôn.

```sh
dotnet run
```

![](https://mahpahh.com/assets/images/2017/05/Screenshot-from-2017-05-17-21-52-16.png)

## Let's recap. Ứng dụng asp.net core khởi động như thế nào?

### Program

Giống các ứng dụng C# khác, ứng dụng asp.net cũng bắt đầu từ phương thức `Main` của class `Program`. Phương thức này khởi tạo mới một dối tượng `WebHostBuiler` và gọi đến phương thức `Build()`của nó để tạo ra webhost. Ở đây có thể thấy C# rất khuyến khích việc sử dụng Builder Pattern.

> *Builder Pattern* là một Creational pattern (các khuôn mẫu liên quan đến việc khởi tạo object) cho phép khởi tạo các đối tượng với số lượng tham số rất lớn. Ví dụ
>
> ```cs
> builder = tạo ComputerBuilder()
>   .Dùng(Main AsusX)
>   .Dùng(CPU IntelK)
>   .Dùng(RAM Kingston)
>   .Dùng(storage Samsung, type = SSD)
>   .Dùng(bàn phím Logitech)...
> máyTínhMới = builder.build()
> ```

Tất nhiên web host tạo ra mà không xử lý request thì cũng không làm gì cả. Thế nên builder của chúng ta sẽ khai báo một class Startup có chức năng định nghĩa cách mà một request được xử lý trong ứng dụng của chúng ta (request pipe line).

```cs
var host = new WebHostBuilder()
  // ...
  .UseStartup<TypeStartup>()
```
```cs
public class TypeStartup
{

}
```

Theo convention phổ biến thì ta hay đặt tên class Startup là `Startup` cho cả làng cùng hiểu.

### Lớp Startup

Lớp Startup có 2 phương thức đáng chú ý (ngoài constructor), là `Configure()` và `ConfigureServices()`, cả 2 phương thức này đều có thể sử dụng được một vài service có sẵn lúc khởi động, thông qua Dependency Injection.

> *Dependency Injection* là một nguyên lý lập trình cho phép loại trừ sự phụ thuộc giữa các module. Ở đây hiểu DI là một dịch vụ của Framework đảm bảo việc cung cấp các thành phần phụ thuộc khi cần thiết, chẳng hạn với định nghĩa phương thức `Configure(ILoggerFactory logger)`, logger được khởi tạo bởi DI mà không cần sự can thiệp thủ công, Configure không cần có sự hiểu biết nào về object này (ngoài interface, tất nhiên)

- `Configure()`: Quy định vòng đời của một request, thông qua các middleware. Các service inject được: `IApplicationBuilder`, `IHostingEnvironment`, `ILoggerFactory`, `IApplicationLifetime`.
- `ConfigureServices()`: đang ký các service với DI để các class khác có thể sử dụng. Thành phân duy nhất inject được ở đây là service container, cụ thể là `IServiceCollection`.

Hãy thử đặt cạnh một server nodejs cơ bản để so sánh

```js
const http = require('http');

const app = http.createServer( // <= tạo server, giống new WebHostBuilder
  (request, response) => { // <= request handler, hàm này quy định luồng xử lý request, giống Startup.Configure

  }
)

app.listen(5000) // <= tương ứng với WebHostBuilder.Build()
```

Như vậy có thể thấy quá trình khởi tạo tương đối giống nhau, có điều NodeJs không hỗ trợ sẵn dependency injection, cần một vài nỗ lực để tạo ra nó (dù cũng không đơn giản lắm).

Trong phần tiếp theo, chúng ta sẽ xem xét việc lưu trữ và query dữ liệu với Model và Database Context.

