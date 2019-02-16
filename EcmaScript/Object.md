#  原型链
  > 每个对象拥有一个原型对象，对象以其原型为模板、从原型继承方法和属性。原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为原型链 (prototype chain)，它解释了为何一个对象会拥有定义在其他对象中的属性和方法。

  > 准确地说，这些属性和方法定义在Object的构造器函数(constructor functions)之上的prototype属性上，而非对象实例本身。

  > 在传统的 OOP(面向对象编程) 中，首先定义“类”，此后创建对象实例时，类中定义的所有属性和方法都被复制到实例中。在 JavaScript 中并不如此复制——而是在对象实例和它的构造器之间建立一个链接（它是__proto__属性，是从构造函数的prototype属性派生的），之后通过上溯原型链，在构造器中找到这些属性和方法。

  > 注意: 理解对象的原型（可以通过Object.getPrototypeOf(obj)或者已被弃用的__proto__属性获得）与构造函数的prototype属性之间的区别是很重要的。前者是每个实例上都有的属性，后者是构造函数的属性。也就是说，Object.getPrototypeOf(new Foobar())和Foobar.prototype指向着同一个对象。

## 使用Javascript中的原型

在javascript中，函数可以有属性。 每个函数都有一个特殊的属性叫作原型（prototype） ，正如下面所展示的。

```
  function doSomething(){}
  doSomething.prototype.foo = "bar";
  console.log( doSomething.prototype );

  /*
    {
      foo: "bar",
      constructor: ƒ doSomething(),
      __proto__: {
        constructor: ƒ Object(),
        hasOwnProperty: ƒ hasOwnProperty(),
        isPrototypeOf: ƒ isPrototypeOf(),
        propertyIsEnumerable: ƒ propertyIsEnumerable(),
        toLocaleString: ƒ toLocaleString(),
        toString: ƒ toString(),
        valueOf: ƒ valueOf()
      }
    }
  */
```
然后，我们可以使用 new 运算符来在现在的这个原型基础之上，创建一个 doSomething 的实例。正确使用 new 运算符的方法就是在正常调用函数时，在函数名的前面加上一个 new 前缀. 通过这种方法，在调用函数前加一个 new ，它就会返回一个这个函数的实例化对象. 然后，就可以在这个对象上面添加一些属性. 看.

```
function doSomething(){}
doSomething.prototype.foo = "bar"; // add a property onto the prototype
var doSomeInstancing = new doSomething();
doSomeInstancing.prop = "some value"; // add a property onto the object
console.log( doSomeInstancing );
doSomeInstancing.__proto__ === doSomething.prototype
doSomeInstancing.__proto__.__proto__ === doSomething.prototype.__proto__ === Object.prototype
/*
  {
    prop: "some value",
    __proto__: {
      foo: "bar",
      constructor: ƒ doSomething(),
      __proto__: {
          constructor: ƒ Object(),
          hasOwnProperty: ƒ hasOwnProperty(),
          isPrototypeOf: ƒ isPrototypeOf(),
          propertyIsEnumerable: ƒ propertyIsEnumerable(),
          toLocaleString: ƒ toLocaleString(),
          toString: ƒ toString(),
          valueOf: ƒ valueOf()
      }
    }
  }
*/

```
> 就像上面看到的, `doSomeInstancing` 的 `__proto__` 属性就是`doSomething.prototype`. 但是这又有什么用呢? 好吧,当你访问 `doSomeInstancing` 的一个属性, 浏览器首先查找 `doSomeInstancing` 是否有这个属性. 如果 `doSomeInstancing` 没有这个属性, 然后浏览器就会在 `doSomeInstancing` 的 `__proto__` 中查找这个属性(也就是 `doSomething.prototype`). 如果 `doSomeInstancing` 的 `__proto__` 有这个属性, 那么 `doSomeInstancing` 的 `__proto__` 上的这个属性就会被使用. 否则, 如果 `doSomeInstancing` 的 `__proto__` 没有这个属性, 浏览器就会去查找 `doSomeInstancing` 的 `__proto__` 的 `__proto__` ，看它是否有这个属性. 默认情况下, 所有函数的原型属性的 `__proto__` 就是 `window.Object.prototype.` 所以 `doSomeInstancing` 的 `__proto__` 的 `__proto__` (也就是 `doSomething.prototype` 的 `__proto__` (也就是 `Object.prototype`)) 会被查找是否有这个属性. 如果没有在它里面找到这个属性, 然后就会在 `doSomeInstancing` 的 `__proto__` 的 `__proto__` 的 `__proto__` 里面查找. 然而这有一个问题: `doSomeInstancing` 的 `__proto__` 的 `__proto__` 的 `__proto__` 不存在. 最后, 原型链上面的所有的 `__proto__` 都被找完了, 浏览器所有已经声明了的 `__proto__` 上都不存在这个属性，然后就得出结论，这个属性是 `undefined`.

## `prototype` 属性：继承成员被定义的地方

> 那么，那些继承的属性和方法在哪儿定义呢？如果你查看 `Object` 参考页，会发现左侧列出许多属性和方法——大大超过我们在 `person1` 对象中看到的继承成员的数量。某些属性或方法被继承了，而另一些没有——为什么呢？

> 原因在于，继承的属性和方法是定义在 `prototype` 属性之上的（你可以称之为子命名空间 (`sub namespace`) ）——那些以 `Object.prototype.` 开头的属性，而非仅仅以 `Object.` `开头的属性。prototype` 属性的值是一个对象，我们希望被原型链下游的对象继承的属性和方法，都被储存在其中。

> 于是 `Object.prototype.watch()`、`Object.prototype.valueOf()` 等等成员，适用于任何继承自 `Object()` 的对象类型，包括使用构造器创建的新的对象实例。

> `Object.is()`、`Object.keys()`，以及其他不在 `prototype` 对象内的成员，不会被“对象实例”或“继承自 `Object()` 的对象类型”所继承。这些方法/属性仅能被 `Object()` 构造器自身使用。

1. 你可以检查已有的 prototype 属性。回到先前的例子，在 JavaScript 控制台输入：

`Person.prototype`

2. 输出并不多，毕竟我们没有为自定义构造器的原型定义任何成员。缺省状态下，构造器的 prototype 属性初始为空白。现在尝试：

`Object.prototype`

> 重要：prototype 属性大概是 JavaScript 中最容易混淆的名称之一。你可能会认为，this 关键字指向当前对象的原型对象，其实不是（还记得么？原型对象是一个内部对象，应当使用 __proto__ 访问）。prototype 属性包含（指向）一个对象，你在这个对象中定义需要被继承的成员。

## create()

我们曾经讲过如何用 Object.create() 方法创建新的对象实例。

例如，在上个例子的 JavaScript 控制台中输入：

`var person2 = Object.create(person1);`

create() 实际做的是从指定原型对象创建一个新的对象。这里以 person1 为原型对象创建了 person2 对象。在控制台输入：

`person2.__proto__`

结果返回对象person1。

## 原型式的继承

### 开始
```
function Person(first, last, age, gender, interests) {
  this.name = {
    first,
    last
  };
  this.age = age;
  this.gender = gender;
  this.interests = interests;
};
```
所有的方法都定义在构造器的原型上，比如：
```
Person.prototype.greeting = function() {
  alert('Hi! I\'m ' + this.name.first + '.');
};
Person.prototype.farewell = function() {
  alert(this.name.first + ' has left the building. Bye for now!');
}
var person1 = new Person('Tammi', 'Smith', 17, 'female', ['music', 'skiing', 'kickboxing']);
```
### 定义 `Teacher()` 构造器函数

```
function Teacher(first, last, age, gender, interests, subject) {
  Person.call(this, first, last, age, gender, interests);
  this.subject = subject;
}
```
### 设置 `Teacher()` 的原型和构造器引用

到目前为止一切看起来都还行，但是我们遇到问题了。我们已经定义了一个新的构造器，这个构造器默认有一个空的原型属性。我们需要让`Teacher()`从`Person()`的原型对象里继承方法。我们要怎么做呢？

1. 在您先前添加的代码的下面增加以下这一行：
```
Teacher.prototype = Object.create(Person.prototype);
```

这里我们的老朋友`create()`又来帮忙了——在这个例子里我们用这个函数来创建一个和`Person.prototype`一样的新的原型属性值（这个属性指向一个包括属性和方法的对象），然后将其作为`Teacher.prototype`的属性值。这意味着`Teacher.prototype`现在会继承`Person.prototype`的所有属性和方法。

2. 接下来，在我们动工之前，还需要完成一件事 — 现在`Teacher()`的`prototype`的`constructor`属性指向的是`Person()`, 这是由我们生成`Teacher()`的方式决定的。(这篇 `Stack Overflow post `文章会告诉您详细的原理) — 将您写的页面在浏览器中打开，进入`JavaScript`控制台，输入以下代码来确认：
```
Teacher.prototype.constructor
```
3. 这或许会成为很大的问题，所以我们需要将其正确设置——您可以回到源代码，在底下加上这一行代码来解决：
```
Teacher.prototype.constructor = Teacher;
```
4. 当您保存并刷新页面以后，输入`Teacher.prototype.constructor`就会得到`Teacher()`。

> 注：每一个函数对象（Function）都有一个`prototype`属性，并且只有函数对象有`prototype`属性，因为`prototype`本身就是定义在`Function`对象下的属性。当我们输入类似`var person1=new Person(...)`来构造对象时，`JavaScript`实际上参考的是`Person.prototype`指向的对象来生成`person1`。另一方面，`Person()`函数是`Person.prototype`的构造函数，也就是说`Person===Person.prototype.constructor`（不信的话可以试试）。
>
> 在定义新的构造函数`Teacher`时，我们通过`function.call`来调用父类的构造函数，但是这样无法自动指定`Teacher.prototype`的值，这样`Teacher.prototype`就只能包含在构造函数里构造的属性，而没有方法。因此我们利用`Object.create()`方法将`Person.prototype`作为`Teacher.prototype`的原型对象，并改变其构造器指向，使之与`Teacher`关联。
>
> 任何您想要被继承的方法都应该定义在构造函数的`prototype`对象里，并且永远使用父类的`prototype`来创造子类的`prototype`，这样才不会打乱类继承结构。

### 向 `Teacher()` 添加一个新的`greeting()`函数
```
Teacher.prototype.greeting = function() {
  var prefix;

  if(this.gender === 'male' || this.gender === 'Male' || this.gender === 'm' || this.gender === 'M') {
    prefix = 'Mr.';
  } else if(this.gender === 'female' || this.gender === 'Female' || this.gender === 'f' || this.gender === 'F') {
    prefix = 'Mrs.';
  } else {
    prefix = 'Mx.';
  }

  alert('Hello. My name is ' + prefix + ' ' + this.name.last + ', and I teach ' + this.subject + '.');
};
```
