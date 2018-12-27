# 深拷贝和浅拷贝

  * [深拷贝和浅拷贝的区别](#深拷贝和浅拷贝的区别)
  * [为什么要使用深拷贝？](#为什么要使用深拷贝？)
  * [深拷贝的要求程度](#深拷贝的要求程度)
  * [怎么检验深拷贝成功](#怎么检验深拷贝成功)
  * [只做第一层深拷贝](#只做第一层深拷贝)
    * [深拷贝数组](#深拷贝数组)
      * [直接遍历](#直接遍历)
      * [slice()](#slice())
      * [concat()](#concat())
    * [深拷贝对象](#深拷贝对象)
  * [拷贝所有层级](#拷贝所有层级)

## 深拷贝和浅拷贝的区别

- 1.浅拷贝： 将原对象或原数组的引用直接赋给新对象，新数组，新对象／数组只是原对象的一个引用

-  2.深拷贝： 创建一个新的对象和数组，将原对象的各项属性的“值”（数组的所有元素）拷贝过来，是“值”而不是“引用”

## 为什么要使用深拷贝？

- 我们希望在改变新的数组（对象）的时候，不改变原数组（对象）

## 深拷贝的要求程度
- 我们在使用深拷贝的时候，一定要弄清楚我们对深拷贝的要求程度：是仅“深”拷贝第一层级的对象属性或数组元素，还是递归拷贝所有层级的对象属性和数组元素？

## 怎么检验深拷贝成功

- 改变任意一个新对象/数组中的属性/元素, 都不改变原对象/数组

## 只做第一层深拷贝

### 深拷贝数组
- 只拷贝第一级数组元素 
- **直接遍历**

  ```
   var arr = [1,2,3,4];

   function copy(arg){

   var newArr = [];

    for(var i = 0; i < arr.length; i++) {
      newArr.push(arr[i]);
    }

    return newArr;
   }

  var newArry = copy(arr);
  console.log(newArry);
  newArry[0] = 10;
  console.log(newArry); // [10,2,3,4]
  console.log(arr)  // [1,2,3,4]
  ```
- **`slice()`**
  ```
  var arr = [1,2,3,4]
  var copyArr = arr.slice();
  copyArr[0] = 10;
  console.log(copyArr); // [10,2,3,4]
  console.log(arr); // [1,2,3,4]
  ```
  - `slice()` 方法返回一个从已有的数组中截取一部分元素片段组成的新数组(不改变原来的数组！)
  - 用法：`array.slice(start,end)`, `start`表示是起始元素的下标,`end`表示的是终止元素的下标
  - 当`slice()`不带任何参数的时候，默认返回一个长度和原数组相同的新数组
- **`concat()`**
  ```
    var arr = [1,2,3,4]
    var copyArr = arr.concat();
    copyArr[0] = 10;
    console.log(copyArr); // [10,2,3,4]
    console.log(arr); // [1,2,3,4]
  ```
  - `concat()`方法用于连接两个或多个数组。( 该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。)

  - 用法：`array.concat(array1,array2,......,arrayN)`

  - 因为我们上面调用`concat`的时候没有带上参数，所以`var copyArray = array.concat();`

  - 实际上相当于`var copyArray = array.concat([]);`也即把返回数组和一个空数组合并后返回。

  - 但是，事情当然不会这么简单，我上面的标题是“深拷贝数组（只拷贝第一级数组元素）”，这里说的意思是对于一级数组元素是基本类型变量（如`number`, `String`, `boolean`）的简单数组。

- **上面这三种拷贝方式都能成功，但对第一级数组元素是对象或者数组等引用类型变量的数组，上面的三种方式都将失效，例如：**
  ```
  var arr = [
    {number:1},
    {number:2},
    {number:3}
  ]
  var copyArr = arr.slice();
  copyArr[0].number = 10;
  console.log(copyArr);  // [{number: 100}, { number: 2 },{ number: 3 }]
  console.log(arr); // [{number: 100}, { number: 2 }, { number: 3 }]
  ```
### 深拷贝对象

- **直接遍历**

  ```
  var obj = {
    name: "张三",
    job: "学生"
  }

  function copy (arg) {
    let newobj = {}
    for(let item in obj) {
      newobj[item] = obj;
    }
    return newobj;
  }

  var copyobj = copy(obj)
  copyobj.name = "李四"
  console.log(copyobj) // {name: '李四', job:: '学生'}
  console.log(obj) // {name: '张三', job:: '学生'}
  ```
- **ES6的`Object.assign`**
  ```
  var obj = {
    name: '张三',
    job: '学生'
  }

  var copyobj = Object.assign({},obj)
  copyobj.name = '李四'
  console.log(copyobj) // {name: '李四', job:: '学生'}
  console.log(obj)    // {name: '张三', job:: '学生'}
  ```
  - `Object.assign`：用于对象的合并，将源对象`source`的所有可枚举属性，复制到目标对象`target`，并返回合并后的`target`。用法： `Object.assign(target, source1, source2)`  所以 `copyObj = Object.assign({}, obj);`这段代码将会把`obj`中的一级属性都拷贝到｛｝中，然后将其返回赋给`copyObj`。

- **ES6扩展运算符：**
  ```
  var obj = {
    name: '张三',
    job: '学生'
  }

  var copyobj = {...obj}
  copyobj.name = '李四'
  console.log(copyobj)
  console.log(obj)
  ```
  - 扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中对多层嵌套对象。
- **很遗憾，上面三种方法，都会失败：**
  ```
  var obj = {
    name: {
      firstname: '张',
      lastname: '三'
    },
    job: '学生'
  }

  var copyobj = Object.assign({},obj)
  copyobj.name.firstname = '王'
  console.log(copyobj.name.firstname) // 王
  console.log(obj.name.firstname)     // 王
  ```

## 拷贝所有层级
- **有没有更强大一些的解决方案呢？使得我们能够**
  - 1. 不仅拷贝第一层级，还能够拷贝数组或对象所有层级的各项值
  - 2. 不是单独针对数组或对象，而是能够通用于数组，对象和其他复杂的`JSON`形式的对象

- **手动复制**
  - 把一个对象的属性复制给另一个对象的属性

   ```
   var obj1 = { a: 10, b: 20, c: 30 };
   var obj2 = { a: obj1.a, b: obj1.b, c: obj1.c };
   obj2.b = 100;
   console.log(obj1); // { a: 10, b: 20, c: 30 } <-- 沒被改到
   console.log(obj2); // { a: 10, b: 100, c: 30 }
   ```
  - 但这样很麻烦，要一个一个自己复制；而且这样的本质也不能算是 `Deep Copy`，因为对象里面也可能回事对象，如像下面这个状况：
   ```
   var obj1 = { body: { a: 10 } };
   var obj2 = { body: obj1.body };
   obj2.body.a = 20;
   console.log(obj1); // { body: { a: 20 } } <-- 被改到了
   console.log(obj2); // { body: { a: 20 } }
   console.log(obj1 === obj2); // false
   console.log(obj1.body === obj2.body); // true
   ```
  - 虽然`obj1`跟`obj2`是不同对象，但他们会共享同一个`obj1.body`，所以修改`obj2.body.a`时也会修改到旧的。


- **对象只有一层的话可以使用上面的：`Object.assign()`函数**

  - `Object.assign({}, obj1)`的意思是先建立一个空对象{}，接着把`obj1`中所有的属性复制过去，所以`obj2`会长得跟`obj1`一样，这时候再修改`obj2.b`也不会影响`obj1`。

  - 因为`Object.assign`跟我们手动复制的效果相同，所以一样只能处理深度只有一层的对象，没办法做到真正的 `Deep Copy`。不过如果要复制的对象只有一层的话可以考虑使用它。

- **转成 `JSON` 再转回来**

  - 用`JSON.stringify`把对象转成字符串，再用JSON.parse把字符串转成新的对象。
   ```
   var obj1 = { body: { a: 10 } };
   var obj2 = JSON.parse(JSON.stringify(obj1));
   obj2.body.a = 20;
   console.log(obj1); // { body: { a: 10 } } <-- 沒被改到
   console.log(obj2); // { body: { a: 20 } }
   console.log(obj1 === obj2); // false
   console.log(obj1.body === obj2.body); // false
   ```
  - 这样做是真正的`Deep Copy`，这种方法简单易用。

  - 但是这种方法也有不少坏处，譬如它会抛弃对象的`constructor`。也就是深拷贝之后，不管这个对象原来的构造函数是什么，在深拷贝之后都会变成`Object`。

  - 这种方法能正确处理的对象只有 `Number`, `String`, `Boolean`, `Array`, 扁平对象，即那些能够被 `json` 直接表示的数据结构。`RegExp` 对象是无法通过这种方式深拷贝。

  - 也就是说，只有可以转成`JSON`格式的对象才可以这样用，像`function`没办法转成`JSON`。
  ```
  var obj1 = { fun: function(){ console.log(123) } };
  var obj2 = JSON.parse(JSON.stringify(obj1));
  console.log(typeof obj1.fun); // 'function'
  console.log(typeof obj2.fun); // 'undefined' <-- 没复制
  ```
  - 要复制的`function`会直接消失，所以这个方法只能用在单纯只有数据的对象。

- **递归拷贝**
  ```
  function deepClone(initalObj, finalObj) {    
   var obj = finalObj || {};    
   for (var i in initalObj) {        
     if (typeof initalObj[i] === 'object') {
       obj[i] = (initalObj[i].constructor === Array) ? [] : {};            
       arguments.callee(initalObj[i], obj[i]);
     } else {
       obj[i] = initalObj[i];
     }
   }    
   return obj;
  }
  var str = {};
  var obj = { a: {a: "hello", b: 21} };
  deepClone(obj, str);
  console.log(str.a);
  ```

  - 上述代码确实可以实现深拷贝。但是当遇到两个互相引用的对象，会出现死循环的情况。

  - 为了避免相互引用的对象导致死循环的情况，则应该在遍历的时候判断是否相互引用对象，如果是则退出循环。

  - 改进版代码如下：

  ```
  function deepClone(initalObj, finalObj) {    
    var obj = finalObj || {};    
    for (var i in initalObj) {        
      var prop = initalObj[i]; // 避免相互引用对象导致死循环，如initalObj.a  initalObj的情况
      if(prop === obj) {            
        continue;
      }        
      if (typeof prop === 'object') {
        obj[i] = (prop.constructor === Array) ? [] : {};            
        arguments.callee(prop, obj[i]);
      } else {
        obj[i] = prop;
      }
    }    
    return obj;
  }
  var str = {};
  var obj = { a: {a: "hello", b: 21} };
  deepClone(obj, str);
  console.log(str.a);
  ```
- ~~**使用`Object.create()`方法**~~
 	- ~~直接使用`var newObj = Object.create(oldObj)`，可以达到深拷贝的效果。~~

- **jquery**

 	- `jquery` 有提供一个`$.extend`可以用来做 `Deep Copy`。
  ```
   var $ = require('jquery');
   var obj1 = {
       a: 1,
       b: { f: { g: 1 } },
       c: [1, 2, 3]
   };
   var obj2 = $.extend(true, {}, obj1);
   console.log(obj1.b.f === obj2.b.f); // false
   ```
- **lodash**
  - 另外一个很热门的函数库`lodash`，也有提供`_.cloneDeep`用来做 `Deep Copy`。
  ```
   var _ = require('lodash');
   var obj1 = {
       a: 1,
       b: { f: { g: 1 } },
       c: [1, 2, 3]
   };
   var obj2 = _.cloneDeep(obj1);
   console.log(obj1.b.f === obj2.b.f); // false
   ```
  - 这个性能还不错，使用起来也很简单。

- **存在大量深拷贝需求的代码——`immutable`提供的解决方案**

  - 存在大量深拷贝需求的代码——`immutable`提供的解决方案实际上，即使我们知道了如何在各种情况下进行深拷贝，我们也仍然面临一些问题：

  - 深拷贝实际上是很消耗性能的。（我们可能只是希望改变新数组里的其中一个元素的时候不影响原数组，但却被迫要把整个原数组都拷贝一遍，这不是一种浪费吗？）所以，当你的项目里有大量深拷贝需求的时候，性能就可能形成了一个制约的瓶颈了。

  - `immutable`的作用：
  - 通过`immutable`引入的一套`API`，实现：
    - 1.在改变新的数组（对象）的时候，不改变原数组（对象）
    - 2.在大量深拷贝操作中显著地减少性能消耗
  - 先睹为快：
  ```
  const { Map } = require('immutable')
  const map1 = Map({ a: 1, b: 2, c: 3 })
  const map2 = map1.set('b', 50)
  map1.get('b') // 2
  map2.get('b') // 50
  ```
