### JS基础知识：

---
1. 变量类型和计算
    - 变量类型和计算
    - JS 中有哪些内置函数  ?
        - Object
        - Array
        - Boolean
        - Number
        - String
        - Function
        - Date
        - RegExp
        - Error
    - JS变量按照存储方式区分为哪些类型，并描述其特点?
        - 值类型
        - 引用类型
    - 如何理解JSON？
        - 一种js  对象
        - 一种数据格式
    - [x] typeof （只能区分值类型， 前四个，不能分辨引用类型， 能区分function)
        
        ```
        typeof undefined   //  undefined
        typeof 'abc'            //  string
        typeof 123   		//  number
        typeof true 		//  boolean
        typeof {}  		//  object
        typeof []			//  object
        typeof null 		//  object 
        typeof console.log //  function
        ```
    - [x] ==
        
        ```
        100 == '100'			//  true
        0 ==  ' '				//  true
        null ==  undefined 	//  true 
        
        if (obj.a ==  null)  {
        //  这里相当于 obj.a  ===  null ||  obj.a ===  undefined 简写形式
        //  这是JQuery  源码中推荐的写法 （其他全部用 === ）
        } 
        ```
    - [x] 强制类型转换
        
        ```
        '+'      '=='      'if'    '&&'  '||'    '!'  '!!'
        ```

2. 原型和原型链
    - 如何准确判断一个变量是数组类型？
        ```
        var arr =  []
        arr instanceof Array  //  true
        ```
    - 写一个原型链继承的例子？ （写一个更贴近实战的例子）
        ```
        // 动物
        function Animal  ()  {
            this.eat =  function ()  {
                console.log('animal eat')
            }
        }
        // 狗
        function Dog  ()   {
            this.bark =  function ()   {
                console.log('dog bark')
            }
        }
        // Dog继承Animal
        Dog.prototype  =  new Animal()
        //  哈士奇
        var hashiqi =  new Dog()
        ```
    - 描述New  一个对象的过程？
        - 创建一个新对象
        - this指向这个新对象
        - 执行代码，即对this赋值
        - 返回this
    - zepto  (或者其他框架)源码中如何使用原型链？
        ```
        实战例子 （封装DOM查询的例子）
        function  Elem  (id)  {
            this.elem =  document.getElementById(id)
        }
        Elem.prototype.html =  function (val)  {
            var elem =  this.elem
            if (val)  {
                elem.innerHTML =  val
                return this  //  链式操作
            }  else {
                return elem.innerHTML
            }
        }
        Elem.prototype.on =  function (type,  fn)  {
            var elem =  this.elem
            elem.addEventListener(type,  fn)
            return this
        }
        var div1 =  new Elem('div1')
        console.log(div1.html())
        //  div1.html('<p>hello world!</p>')
        //  div1.on('click',  function ()  {
        //   	alert('clicked')
        //  })
        div1.html('<p>hello world!</p>').on('click',  function ()  {
           	alert('clicked')
         }).html('<h1>6666</h1>')
        ```
    - [x] 构造函数
        ```
        function Foo  (name,  age)  {
        this.name =  name
        this.age =  age
        this.class =  'class-1'
        //  return this  (默认有）
        }
        ```
    - [x] 构造函数-扩 展
        - var a =  {}  其实是 var a  =  new Object()  的语法糖
        - var a  =  []  其实是 var a =  new Array()  的语法糖
        - function  Foo(){...}  其实是 var  Foo  =  new Function(...) 的语法糖
        - 使用instanceof判断一个函数是否是一个变量的构造函数
    - [x] 原型规则和示例
        - 所有的引用类型（数组，对象，函数），都具有对象属性，即可自由扩展属性（除了"null"除外）
        - 所有的引用类型（数组，对象，函数），都有一个__proto__属性，属性值是一个普通的对象
        - 所有的函数，都有一个prototype（显示原型）属性，属性值也是一个普通的对象
        - 所有的引用类型（数组，对象，函数），__proto__属性值指向它的构造函数的"prototype"属性值
        - 当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么回去它的__proto__（即它的构造函数的prototype）中寻找
        - console.log(obj.__proto__  ===  Object.prototype)
    - [x] 原型链
        ![image](http://www.cubsdiary.com/imgs/yuanxinglian.png)
    - [x] instanceof
        - 用于判断引用类型属于哪个构造函数的方法
        - f instanceof  Foo  的判断逻辑：
        - f  的__proto__一层一层往上，能否对应到Foo.prototype
        - 再试着判断 f   instanceof Object
3. 作用域和闭包
    - 说一下对变量提升的理解？
        - 变量定义
        - 函数声明
    - 说明this几种不同的使用场景？
    - 创建10个<a></a>标签，点击的时候弹出对应的序号？
        ```
        for (var i = 0; i  <  10;  i++)  {
			(function (i)  {
				var a =  document.createElement('a')
				a.innerHTML =  i
				a.addEventListener('click',  function (e)  {
					e.preventDefault()
					alert(i)
				})
				document.body.appendChild(a)
			})(i)
		}
        ```
    - 如何理解作用域？
        - 自由变量
        - 作用域链，即自由变量的查找
    - 实际开发中闭包的应用？
        ```
        //  闭包实际应用中主要用于封装变量， 收敛权限
        function isFirstLoad () {
			var _list = []
			return function (id) {
				if (_list.indexOf(id) >= 0) {
					return false
				} else {
					_list.push(id)
					return true
				}
			}
		}
		// 使用
		var firstLoad = isFirstLoad()
		firstLoad(10) // true
		firstLoad(10) // false
		firstLoad(20) // true
        //  你在isFirstLoad函数外面，根本不可能修改掉_list的值
        ```
    - [x] - 执行上下文
        - 范围： 一段<script>或者一个函数
        - 全局： 变量定义。函数声明 一段<script>
        - 函数： 变量定义，函数声明，this，arguments， 函数
        - PS： 注意函数表达式 和 函数声明的区别
    - [x] - this
        - this要在执行时再能确认值，定义时无法确认
        ```
        1.作为构造函数执行
        function Foo(name)  {
            this.name =  name // this  ->  Foo
        }
        var f =  new Foo('logo')
        2.作为对象属性执行
        var a = {
            name: 'A',
            fn: function () {
                console.log(this.name)
            }
        }
        a.fn()  //  'A'
        3.作为普通函数执行
        function func () {
            console.log(this)
        }
        func()  //  window
        4.call  apply bind
        function fn1 (name,  age)  {
            alert(name,  age)
            console.log(this)
        }
        fn1.call({x:  100},  'zhangsan',  20)
        fn1.apply({x:  100}, ['zhangsan',  20])
        var fn2 =  function (name,  age)  {
            alert(name,  age)
            console.log(this)
        }.bind({y:  200})
        fn2('zhangsan',  20)
        ```
    - [x] - 作用域
        - 没有块级作用域
        - 函数作用域和全局作用域
    - [x] - 作用域链
        ```
        var  a =  100 
        function F1  ()  {
            var b =  10 
            function F2  ()  {
                var c =  1
                console.log(a,  b ,c)  //  a,  b为F2的自由变量， 会一级一级向上查询
            }
        }
        F1()
        ```
    - [x] - 闭包
        ```
        函数作为返回值
        function  F1  ()  {
            var a =  100 
            //  返回一个函数
            return  function   ()  {
                console.log(a)
            }
        }
        //  f1 得到一个函数
        var  f1 =  F1()
        var a =  200 
        f1()  //   100
        函数作为参数
        function  F1  ()  {
            var a =  100 
            //  返回一个函数
            return  function   ()  {
                console.log(a)
            }
        }
        var f1 =  F1()
        function F2  (fn)  {
            var a =  300 
            fn()
        }
        F2(f1)  //  100
        ```
4. 异步和单线程
    - 同步和异步的区别是什么？ 分别举一个同步和异步的例子 
        - 同步会阻塞代码执行， 而异步不会
        - alert是同步， setTimeout是异步
    - 一个关于setTimeout的笔试题
        ```
        console.log(100)
		setTimeout(function () {
			console.log(200)
		})
		console.log(300)
		setTimeout(function () {
			console.log(400)
		}, 1000)
        ```
    - 前端使用异步的场景有哪些
        - 定时任务： setTimeout， setInterval
        - 网络请求： ajax请求， 动态img  加载
        - 事件绑定
    - [x] 什么是异步对比同步
    - [x] 异步和单线程
        ```
        console.log(100)
		setTimeout(function () {
			console.log(200)
		})
		console.log(300)
        ->  执行第一行 打印100
        ->  执行setTimeout后，传入setTimeout的函数会被暂存起来，不会立即执行（单线程的特点，不能同时干两件事）
        ->  执行完最后一行 打印300
        ->  待所有的程序执行完，处于空闲状态时，会立马看有没有暂存起来的要执行
        ->  发现暂存起来的setTimeout  中的函数无需等待时间就立即过来执行
        ```
5.  其他
    - 获取2017-06-10格式的日期
    - 获取随机数，要求是长度一致的字符串格式
    - 写一个能遍历对象和数组的通过forEach 函数
        ```
        function forEach(data, fn) {
			var key
			if (data instanceof Array) {
				data.forEach(function(item, index) {
					fn(item, index)
				})
			} else {
				for (key in data) {
					fn(data[key], key)
				}
			}
		}
        ```
    - [x] Math 
        - Math.random()获取随机数
    - [x] 数组API 
        ```
        forEach便利所有元素
        arr.forEach(function (item, index) {
			console.log(item, index)
		})
        every  判断所有元素是否都符合条件
        var result = arr.every(function (item, index) {
			// 用来判断所有的数组元素都满足一个条件
			if (item < 4) {
				return true
			}
		})
        some  判断是否有至少一个元素符合条件
        var result = arr.some(function (item, index) {
			// 用来判断所有的数组元素至少有一个元素满足条件
			if (item < 2) {
				return true
			}
		})
        sort  排序
        var arr2 = arr.sort(function (a, b) {
			//  从小到大
			return a - b
			// 从大到小
			// return b - a
		})
        map  对元素重新组装，生成新数组
        var arr2 = arr.map(function (item, index) {
			// 将元素重新组装，并返回
			return '<b>' + item + '</b>'
		})
        filter  过滤符合条件的元素
        var arr2  = arr.filter(function (item, index) {
			// 通过某一个条件过滤数组
			if (item >= 2) {
				return true
			}
		})
        ```
    - [x]  对象API   
        ```
        var obj =  {
            x:  100,  
            y:  200,
            z:  300
        }
        for (key in obj)  {
            if (obj.hasOwnProperty(key))  {
                console.log(key,  obj[key])
            }
        }
        ```



