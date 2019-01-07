#Ajax
><b style="color:#ff502c">`Ajax`</b>是高性能`Javascript` 的基础，他可以通过延迟下载体积较大的资源文件来使得页面加载速度更快。它通过异步的方式在客户端和服务端之间传输数据，从而避免页面资源一窝蜂的下载。它甚至可以只用一个`HTTP`请求就获取整个页面资源。选择适合的传输方式和最有效的数据格式，可以显著的改善用户和网站的交互体验。

## 数据传输

  <b>ajax 是一种与服务器通信而无需重载页面的方法；数据可以从服务器获取或发送给服务器。</b>

### 请求数据
#### <b style="background-color: #fff5f5;color: red;">XMLHttpRequest(XHR)</b>
  XMLHttpRequest对象是浏览器提供的一个API，用来顺畅地向服务器发送请求并解析服务器响应，当然整个过程中，浏览器页面不会被刷新。

  1. XMLHttpRequest只是一个JavaScript对象，确切的说，是一个构造函数。换句话说，它一点也不神秘，它的特殊之处只在于它是由客户端(即浏览器)提供的（而不是JavaScript原生的），除此之外，它有属性，有方法，需要通过new关键字进行实例化。

  2. XMLHttpRequest对象是不断被扩展的。随着XML对象被广泛的接收，W3C也开始着手制定相应的标准来规范其行为。目前，XMLHttpRequest有两个级别：1级提供了XML对象的实现细节，2级进一步发展了XML对象，额外添加了一些方法，属性和数据类型。但是，并不是所有浏览器都实现了XML对象2级的内容。

  ✋让我们先从剖析XMLHttpRequest实例的属性和方法开始，先创建一个XML对象的实例：
  ```
  const xhr = new XMLHttpRequest()
  ```
- <b style="background-color: #fff5f5;color: red;">该实例的属性，方法有：</b>

  - <b style="background-color: #fff5f5;color: red;">方法</b>

    - `.open()：准备启动一个AJAX请求；`
    - `.setRequestHeader()：设置请求头部信息；`
    - `.send()：发送AJAX请求；`
    - `.getResponseHeader(): 获得响应头部信息；`
    - `.getAllResponseHeader()：获得一个包含所有头部信息的长字符串；`

    - `.abort()：取消异步请求；`

  - <b style="background-color: #fff5f5;color: red;">属性</b>

    - `.responseText`：包含响应主体返回文本；
    - `.responseXML`：如果响应的内容类型时`text/xml或application/xml`，该属性将保存包含着相应数据的`XML DOM`文档；
    - `.status`：响应的`HTTP`状态；
    - `.statusText`：HTTP状态的说明；
    - `.readyState`：表示“请求”/“响应”过程的当前活动阶段。

      - <b style="background-color: #fff5f5;color: red;">0. 未初始化，尚未调用open（）方法</b>
      - <b style="background-color: #fff5f5;color: red;">1. 启动，已经调用open（）方法，但未调用send（）方法</b>
      - <b style="background-color: #fff5f5;color: red;">2. 发送send（）方法，但尚未接受到响应</b>
       - <b style="background-color: #fff5f5;color: red;">3. 接受，已接收到部分响应数据</b>

      - <b style="background-color: #fff5f5;color: red;">4. 完成，已经接受到全部的响应数据</b>

      另外，浏览器还为该对象提供了一个onreadystatechange监听事件，每当XML实例的readyState属性变化时，就会触发该事件的发生。

- <b style="background-color: #fff5f5;color: red;">设置请求头</b>

  每个HTTP请求和响应都会带有相应的头部信息，包含一些与数据，收发者网络环境与状态等相关信息。XMLHttpRequest对象提供的.setRequestHeader()方法为开发者提供了一个操作这两种头部信息的方法，并允许开发者自定义请求头的头部信息。

  默认情况下，当发送AJAX请求时，会附带以下头部信息：

  <b style="background-color: #fff5f5;color: red;">Accept：浏览器能够处理的内容类型；</b></br>
  <b style="background-color: #fff5f5;color: red;">Accept-Charset: 浏览器能够显示的字符集；</b></br>
  <b style="background-color: #fff5f5;color: red;">Accept-Encoding：浏览器能够处理的压缩编码；</b></br>
  <b style="background-color: #fff5f5;color: red;">Accept-Language：浏览器当前设置的语言；</b></br>
  <b style="background-color: #fff5f5;color: red;">Connection：浏览器与服务器之间连接的类型；</b></br>
  <b style="background-color: #fff5f5;color: red;">Cookie：当前页面设置的任何Cookie；</b></br>
  <b style="background-color: #fff5f5;color: red;">Host：发出请求的页面所在的域；</b></br>
  <b style="background-color: #fff5f5;color: red;">Referer：发出请求的页面URI；</b></br>
  <b style="background-color: #fff5f5;color: red;">User-Agent：浏览器的用户代理字符串；</b></br>

  注意，部分浏览器不允许使用.setRequestHeader()方法重写默认请求头信息，因此自定义请求头信息是更加安全的方法：

  ```
  // 自定义请求头
  xhr.setRequestHeader("myHeader", "MyValue")
  ```
- <b style="background-color: #fff5f5;color: red;">GET请求 与 POST请求</b>
  - <b style="background-color: #fff5f5;color: red;">GET请求</b>

    GET请求用于获取数据，有时候我们需要获取的数据需要通过“查询参数”进行定位，在这种情况下，我们会将查询参数追加到URL的末尾，令服务器解析。

    查询参数是指一个由?号起始，由&符号分割的包含相应键值对的字符串。用来告知浏览器所要查询的特定资源。
    ```
    const query = "example.php?name=tom&age=24"
    // "?name=tom&age=24"即是一个查询参数
    ```
    需要注意的是，查询字符串中每个参数的名和值都必须使用`encodeURIComponent()`进行编码（这是因为URL中有些字符会引起歧义，例如“&”）。

  - <b style="background-color: #fff5f5;color: red;">POST请求</b>

    POST请求用于向服务器发送应该被保存的数据，因此POST请求天然比GET请求多需要一份需要被保存的数据。那么这些数据应该放在何处呢？毕竟，我们的.open()方法接收的三个参数都没有合适的位置。

    答案是需要发送的数据会作为.send()方法的参数最终被发往服务器，该数据可以是任意大小，任意类型。

    这里需要注意以下两点：

      - .send()方法的参数是不可为空的，也就是说，对于不需要发送任何数据的GET请求，也需要在调用.send()方法时，向其传入null值；

      - 目前为止，我们知道了两种向服务器发送数据的方式：表单提交以及发送POST请求，要注意服务器对待这两种方式并不一视同仁，这意味着服务器需要有相应的代码专门处理POST请求发送来的原始数据。

    但好在我们可以通过POST请求模拟表单提交，只需要简单两步：

      - 设置请求头参数：`Content-Type: application/x-www-form-urlencoded`（表单提交时的内容类型）；

      - 将表单数据序列化为查询字符串形式，传入.send()方法；

  - “同步”等待响应与“异步”等待响应的区别：

    “同步”意味着一旦请求发出，任何后续的JavaScript代码不会再执行，“异步”则是当请求发出后，后续的JavaScript代码会继续执行，当请求成功后，会调用相应的回调函数。

- <b style="background-color: #fff5f5;color: red;">XMLHttpRequest 2级</b>
  - <b style="background-color: #fff5f5;color: red;">（一）FormData 类型</b>

    FormData是XMLHttpRequest 2级为我们提供的新的数据类型（构造函数），还记的我们之前是如何伪装一个POST请求为一个表单提交吗？

    FormData令这一过程变得更加轻松，因为XHR对象能够识别传入的数据类型是FormData的实例，并自动配置适当的头部信息。

    FormData的使用方式如下：
    ```
    // 添加数据
    let data1 = new FormData()
    data1.append("name", "Tom")
    xhr.send(data1)

    // 提取表单数据
    let data2 = new FormData(document.forms[0])
    xhr.send(data2)
    ```
    除此之外，FormData的另一个好处是相较于传统的AJAX请求，它允许我们上传二进制数据（图片，视频，音频等），具体详情可查看该链接。

    FormData的浏览器兼容性：
      - 桌面端
        - IE 10+ 与其他浏览器均支持
      - 移动端
        - Android，Firefox Mobile，OperaMobile均支持，其余浏览器未知

  - <b style="background-color: #fff5f5;color: red;">（二）超时设定</b>

    当我们发送一个AJAX请求，却迟迟得不到服务器响应，这种感觉是很糟糕的。为了缓解这种糟糕的感觉，XMLHttpRequest 2级规范为我们提供了一个额外的属性和事件监听事件：

    - timeout属性：设置超时时间，单位为毫秒；
    - timeout事件：当响应时间超出实例对象timeout属性时被触发；

    使用方式如下：
    ```
    // 当响应时间超过1秒时，请求中止，弹出提示框
    xhr.timeout = 1000
    xhr.ontimeout = () => { alert("Request did not return in a second.") }
    ```
    注意，当请求终止时，会调用`ontimeout`事件处理程序，此时xhr的readyState属性的值可能已变为4，这意味着会继续调用`onreadystatechange`事件处理程序，但是当超时中止请求后再访问`xhr`的`status`属性会使浏览器抛出一个错误，因此需要将检查status属性的语句放入`try-catch`语句中。

    虽然带来了一些麻烦，但是我们却对`XMLHttpRequest`对象有了更多的控制。

    浏览器兼容性：
      - 桌面端
        - IE 10+ 与其他浏览器均支持
      - 移动端
        - IE Mobile 10+ 与其他浏览器均支持
- <b style="background-color: #fff5f5;color: red;">（三）overrideMimeType()方法</b>

  响应返回的响应头里，描述了返回数据的MIME类型，浏览器通过识别该类型，告知XMLHttpRequest实例处理该数据的方式。

  然而有时候（例如将XML类型数据当做纯文本处理），我们想要以我们想要的方式处理响应的数据，在XMLHttpRequest 2级规范中，我们可以使用.overrideMimeType()方法，从方法名也可以轻松猜出，该方法可以覆写响应头所描述数据的MIME类型。

  其写法如下：
  ```
  const xhr = new XMLHttpRequest()
  xhr.open("get", "example.php", true)
  xhr.overrideMimeType("text/xml") // 强迫浏览器将响应数据以指定类型方式解读
  xhr.send(null)
  ```
  浏览器兼容性：

  - 桌面端
    - IE 7+ 与其他浏览器均支持
  - 移动端
    - Firefox Mobile，Chrome for Android 均支持，其余浏览器未知
- <b style="background-color: #fff5f5;color: red;">（四）进度事件</b>

  Progress Events规范是W3C制定的一个工作草案。该规范定义了与客户端与服务器通信相关的一系列事件，这些事件监听了通信进程中的各个关键节点，使我们能够以更细的颗粒度掌控数据传输过程中的细节。目前共有6个进度事件，他们会随数据传输进展被顺序触发（除了error，abort事件），让我们看看他们的定义和浏览器兼容情况：

  <b style="background-color: #fff5f5;color: red;">loadstart</b>：在接收到响应数据的第一个字节时触发；

    桌面端：除 Safari Mobile 未知外，其他浏览器均支持

    移动端：除 Safari Mobile 未知外，其他浏览器均支持


  <b style="background-color: #fff5f5;color: red;">progress</b>：在接收响应期间持续不断地触发；

    桌面端：IE10+ 与其他浏览器均支持
    移动端：均支持


  <b style="background-color: #fff5f5;color: red;">error</b>：在请求发生错误时触发；

    桌面端：所有浏览器均支持（信息来源）
    移动端：除IE Mobile不支持外，其他浏览器均支持（信息来源）

  <b style="background-color: #fff5f5;color: red;">abort</b>：再因为调用abort()方法时触发；
    桌面端：未知
    移动端：未知

  <b style="background-color: #fff5f5;color: red;">load</b>：在接收到完整的响应数据时触发；

  桌面端：IE7+ 与其他浏览器均支持
  移动端：Chrome for Android，Edge，Firefox Mobile支持，其余浏览器未知


  <b style="background-color: #fff5f5;color: red;">loadend</b>：在通信完成或者触发error，abort或load事件后触发；

    桌面端：所有浏览器不支持      
    移动端：所有浏览器不支持

  这里我们将着重展开讲解以下两个事件：
  - <b style="background-color: #fff5f5;color: red;">① load事件</b>

    该事件帮助我们节省了readstatechange事件，我们不必在XHR对象实例上绑定该事件监听函数以追踪实例上readState属性的变化，而是可以直接使用以下代码：
    ```
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
        if ((xhr.status >= 200 && xhr.status <300) || xhr.status == 304) {
            alert(xhr.responseText)
        } else {
            alert("Something wrong!")
        }
    }
    xhr.open("get", "example.php", true)
    xhr.send(null)
    ```
  - <b style="background-color: #fff5f5;color: red;">② progress事件</b>

    该事件令我们可以实现我们梦寐以求的加载进度条效果。因为onprogress事件处理程序会接收到一个event对象，其target属性为XHR对象实例，但却额外包含着三个属性：

      lengthComputable：表示进度信息是否可用的布尔值；
      position：表示目前接收的字节数；
      totalSize：表示根据Content-Length响应头部确定的预期字节数；

      很显然，我们的加载进度条所需的一切资源都准备就绪，我们只需写出下面的代码：
    ```
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
        if ((xhr.status >= 200 && xhr.status <300) || xhr.status == 304) {
            alert(xhr.responseText)
        } else {
            alert("Something wrong!")
        }
    }
    // 加载进度条
    xhr.onprogress = function(event) {
        const divStatus = document.getElementById("status")
        if (event.lengthComputable) {
            divStatus.innerHTML = `Received ${event.postion} of ${event.totalSize} bytes`
        }
    }
    xhr.open("get", "example.php", true)
    xhr.send(null)
    ```
    一切大功告成！不过还要记得注意，需要在.open()方法前调用onprogress事件处理程序。

#### <b style="background-color: #fff5f5;color: red;">Dynamic script tag insertion 动态脚本注入</b>

  克服了XHR的最大限制：它能跨域请求数据。
  ```
  var scriptElement = document.createElement('script')
  scriptElement.src = 'http://xxx.xxx.com/lib/js/xxx.js';
  document.getElememtsByTagName('head')[0].appendChild(scriptElement);
  ```
  和XHR相比，动态脚本注入提供的控制有限，不能设置请求头信息。参数传递也只能用GET方式。你不能设置请求的超时处理或重试；

  就算请求失败了也不一定知道。你必须等待所有数据都已返回，才可以访问它们。你不能访问请求的头信息，也不能把整个响应消息作为字符串来处理。

  因为响应消息作为脚本标签的源码，它必须是可执行的JavaScript代码。你不能使用纯XML，纯JSON或者其他任何格式的数据，无论哪种格式，都必须封装在一个回调函数中。
  ```
  var scriptElement = document.createElement('script')
  scriptElement.src = 'http://xxx.xxx.com/getinfo.php?callback=jsonpcallback';
  document.getElememtsByTagName('head')[0].appendChild(scriptElement);

  function jsonpcallback (data) {
    var info = eval('('+ data + ')')
  }
  ```
  http://xxx.xxx.com/getinfo.php?callback=jsonpcallback 需要把数据封装到 <b style="background-color: #fff5f5;color: red;">jsonpcallback</b> 函数里：
  ```
  jsonpcallback({"state": 200, "data": []})
  ```
  使用这种技术从哪些你无法直接控制的服务器上请求数据时需要小心。JavaScript没有任何权限和访问控制的概念，因此你使用动态脚本注入添加到页面中的任何代码都可以完全控制整个页面。包括修改任何内容，把用户重定向到其他网站，甚至跟踪用户在页面上的操作并发送数据到其他第三方服务器。存在安全问题。

#### <b style="background-color: #fff5f5;color: red;">iframes</b>
#### <b style="background-color: #fff5f5;color: red;">Comet</b>
#### <b style="background-color: #fff5f5;color: red;">Multipart XHR(待定。。。)</b>

### 发送数据
  有时候你并不关心接受数据，而只需要将数据发送给服务器。你可以发送不涉及隐私的用户信息以备日后分析，或者你也可以捕获所有脚本的错误并把细节发送到服务器进行记录和报警。
#### <b style="background-color: #fff5f5;color: red;">XHRHttpRequest</b>

  XHR 主要用于从服务器获取数据，他同样能用于把数据传回服务器。当你要传回的数据超出浏览器的最大URL尺寸限制是XHR特别有用，这时候就可以使用POST 方式回传数据。
  ```
  var params = ['id=124', 'limit=20'];
  function xhrPost (url, params, callback) {
    var req = new XMLHttpRequest();

    req.onerror = function () { // 发送失败后，重新发送
      setTimeout(function () {
        xhrPost(url, params, callback);
      })
    }

    req.onreadystatechange = function () {
      if (req.readyState === 4) {
        if (callback && typeof callback === 'function') {
          callback();
        }
      }
    }

    req.open('POST', url, true);
    req.setRequstHeader('Content-type', 'application/x-www-from-urlencoded');
    req.setRequstHeader('Content-Length', params.length);
    req.send(params.join('&'));
  };
  ```
  当使用XHR发送数据到服务器时，GET更快，对于少量数据而言，一个GET请求往服务器只发送一个数据包。而POST至少发送两个数据包，一个装载头信息，一个装载POST正文。POST更适合发送大量数据到服务器。

#### <b style="background-color: #fff5f5;color: red;">Beacons</b>

  这项技术类似动态脚本注入。使用JavaScript创建一个新的image对象，并把src 属性设置为服务器脚本的URL。URL 包含了我们要通过GET传回的键值对数据。请注意并没有创建img元素或把它插入DOM。
  ```
  var url = '/xxx.php';
  var params = ['name=yang', 'age=3'];
  var beacon = new Image();
  beacon.src = `${url}?${params.join('&')}`
  beacon.onload = function () {
    if (this.width == 1) {
      // 成功
    } else if (this.width == 2) {
      // 失败， 稍后重试请重试或创建另一个信标
    }
  }
  beacon.onerror = function () {
    // 失败， 稍后重试请重试或创建另一个信标
  }
  ```
  <b style="background-color: #fff5f5;color: red;">优点</b>：
  - 性能消耗小
  - 服务端错误不会影响客户端

  <b style="background-color: #fff5f5;color: red;">缺点</b>:
  - 无法发送POST，而URL长度有限

  可以接受数据，使用image的load事件获取是否成功获取数据
  如果服务器返回图片的话，可以检查图片的宽度来获取服务器状态，宽度为 1 表示成功，宽度为 2 表示重试
### <b style="background-color: #fff5f5;color: red;">数据格式</b>

  <b style="background-color: #fff5f5;color: red;">XML</b> ： 通用性强，相比其他格式，XML及其冗长，每个单独的数据片段依赖大量结构，而且XML语法模糊。

  <b style="background-color: #fff5f5;color: red;">JSON</b>： 使用JavaScript对象和数组直接量编写的轻量级切易于解析的数据格式

  <b style="background-color: #fff5f5;color: red;">HTML</b>： 比XML更繁杂

  <b style="background-color: #fff5f5;color: red;">自定义格式</b>： 当你在很短时间内向客户端传送大量数据时可以考虑使用

  如果数据集很大并且对解析时间有要求，可以选择下面两种方式：

  - JSON-P数据，说那个动态脚本注入获取，把数据当成可执行的JavaScript而不是字符串，解析速度快，它能跨域使用，涉及敏感数据不应该使用它。

  - 字符分割的自定义格式，使用XHR或动态脚本注入获取，用split()解析，解析比JOSN-P更快，文件尺寸更小。


[参考博客](https://juejin.im/post/5a20b1f1f265da432529179c)
