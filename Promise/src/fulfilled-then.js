// 加入一个 Promise 已经执行完成 ， 再then() 会怎样？

console.log('start')

let promise = new Promise( resolve => {
	setTimeout( () => {
		console.log('first blood!')
		resolve('first')
	}, 2000)
})


setTimeout( () => {
	promise.then( value => {
		console.log(value + ',   blood --logs')
	})
}, 4000)
