CORS
CORS 是W3C 推荐的一种新的官方方案，能使服务器支持 XMLHttpRequest 的跨域请求。CORS 实现起来非常方便，只需要增加一些 HTTP 头，让服务器能声明允许的访问来源。
值得注意的是，通常使用CORS时，异步请求会被分为简单请求和非简单请求，非简单请求的区别是会先发一次预检请求。【简单请求】使用下列方法之一且没有人为设置对 CORS 安全的首部字段集合之外的其他首部字段：

GET
HEAD
POST

- 仅当POST方法的Content-Type值等于下列之一才算作简单请求
       - text/plain
       - multipart/form-data
       - application/x-www-form-urlencoded
请求报文：
GET /resources/public-data/ HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.5; en-US; rv:1.9.1b3pre) Gecko/20081130 Minefield/3.1b3pre
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7
Connection: keep-alive
Referer: http://foo.example/examples/access-control/simpleXSInvocation.html
Origin: http://foo.example

请求报文的第10行：Origin: foo.example 表明该请求来源于 foo.exmaple。
响应报文：

HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 00:23:53 GMT
Server: Apache/2.0.61
Access-Control-Allow-Origin: *
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Transfer-Encoding: chunked
Content-Type: application/xml
[XML Data]

响应报文的第4行：Access-Control-Allow-Origin: * 表明该资源可以被任意外域访问。
非简单请求】

使用了下面任一 HTTP 方法：


PUT
DELETE
CONNECT
OPTIONS
TRACE
PATCH


人为设置了对 CORS 安全的首部字段集合之外的其他首部字段。该集合为：


Accept
Accept-Language
Content-Language
Content-Type (but note the additional requirements below)
DPR
Downlink
Save-Data
Viewport-Width
Width


Content-Type 的值不属于下列之一:


application/x-www-form-urlencoded
multipart/form-data
text/plain

发送真正请求前会先发送预检请求，如图所示：

1.第一条OPTIONS为预检请求，中同时携带了下面两个首部字段：
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-PINGOTHER复制代码预检请求的Request中的Access-Control-Request-Method: POST，是告诉服务器，之后的实际请求将使用POST方式。Access-Control-Request-Headers 是告诉服务器，实际请求将携带两个自定义请求首部字段：X-PINGOTHER 与 Content-Type。服务器据此决定，该实际请求是否被允许
预检请求的Response中的

Access-Control-Allow-Origin: foo.example    // 标识可接受的跨域请求源；  Access-Control-Allow-Methods: POST, GET, OPTIONS   //标识可接受的跨域请求方法,如GET、POST、OPTIONS；  Access-Control-Allow-Headers: X-PINGOTHER, Content-Type //标识可接受的跨域请求自定义头；  Access-Control-Max-Age: 86400。 //标识本次预请求的有效时间（秒），期间内无需再发送预请求；

XMLHttpRequest 请求可以发送凭证请求（HTTP Cookies 和验证信息），通常不会跨域发送凭证信息，但也有一些情况需要打通不同的登录态，因此如果要发送凭证信息，需要设置 XMLHttpRequest 的某个特殊标志位。比如下面代码，可以把 XMLHttpRequest 的 withCredentials 设置为 true，这样浏览器就能跨域发送凭证信息。
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;复制代码服务端返回的响应头中的 Access-Control-Allow-Credentials 字段存在且为 true 时，浏览器才会将响应结果传递给客户端程序。另外，Access-Control-Allow-Origin 必须指定请求源的域名，否则响应失败。
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://foo.com
Access-Control-Allow-Credentials: true
Set-Cookie: pageAccess=3; expires=Wed, 31-Dec-2008 01:34:53 GMT
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain复制代码如下图所示为附带身份凭证的请求流程图：
