## new

### 一个简单的例子

#### 通过一个普通的函数定义一个''人''

	(```)
	function createNewPerson (name) {
		var obj = {};
		obj.name = name;
		obj.greeting = function () {
			alert('Hi! I\'m ' + this.name + '.');
		}
		return obj;
	}
	(```)
#### 通过调用这个函数创建一个新的叫 salva 的人，在您浏览器的JavaScript console 试试 ：

	```
	var salva = createNewPerson('salva');
	var salva2 = new createNewPerson('salva2');
	```

> 上述代码运行良好，但是有点冗长；如果我们知道如何创建一个对象，就没有必要创建一个新的空对象并且返回它。幸好 JavaScript 通过构建函数提供了一个便捷的方法，方法如下：

#### 将之前的代码用如下代码代替：
	```
	function Person(name) {
		this.name = name;
		this.greeting = function() {
			alert('Hi! I\'m ' + this.name + '.');
		};
	}
	```
#### 通过调用这个函数创建一个新的叫 salva 的人
	```
	var salva = createNewPerson('salva'); // 不用new字符, salva 返回 undefined
	var salva2 = new createNewPerson('salva2');
	```

> 注： 一个构建函数通常是大写字母开头，这样便于区分构建函数和普通函数。
