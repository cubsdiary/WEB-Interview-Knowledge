
// 定时执行
// import './src/timeout.js'

// 分两次 顺序依次执行
// import './src/timeout2.js'

// 假如一个 Promise 已经执行完成 ， 再then() 会怎样？
// import './src/fulfilled-then.js'

//假如在 then() 里面不返回一个新的 Promise ，会怎样？
// import './src/timeout3.js'

/* 
	then() 接受两函数作为参数 ，fulfilled 和 rejected 
	then() 返回一个新的Promise 实例， 所以他可以链式调用
	当前Promise 状态改变时， then() 根据最终的状态 选择特定的状态函数 来执行

	状态响应函数可以返回新的Promise, 或其他值
	如果返回新的Promise  ，那么下一个then() 将会在新的Promise 状态改变之后执行
	如果返回其他值， 那么下一个then() 立即执行

*/

/* 
	then() 里面有then()
	会等里面then() 执行完成 才会执行外面的 then()
	最好展开 方便代码阅读
*/
// import './src/next-then.js'

/*
	下面四种 Promise 区别

	#1
	doSomething().then(function () {
		return doSomethingElse()
	}).then(finalHander)


	#2
	doSomething().then(function () {
		doSomethingElse()
	}).then(finalHander)

	#3
	doSomething().then(doSomethingElse()).then(finalHander)

	#4
	doSomething().then(doSomethingElse).then(finalHander)
*/

/*
	#1
	doSomething
	|-----------|
				doSomethingElse(undefind)
				|--------------|
								finalHander(resultdoSomethingElse)
								|----------|

*/
/*
	#2
	doSomething
	|-----------|
				doSomethingElse(undefind)
				|--------------|
				finalHander(undefind) 
				|----------|

*/
/*
	#3
	doSomething
	|-----------|
	doSomethingElse(undefind) 
	|--------------|
				finalHander(resultdoSomething) 
				|----------|

*/
/*
	#4
	doSomething
	|-----------|
				doSomethingElse(resultdoSomething) 
				|--------------|
								finalHander(resultdoSomethingElse) 
								|----------|

*/

// 错误捕获
// import './src/error.js'

// Promise.all()
// import './src/all.js'

// Modal
import './src/modal.js'


