
//假如在 then() 里面不返回一个新的 Promise ，会怎样？

console.log('start')

new Promise( resolve => {
	setTimeout( () => {
		console.log('first blood!') // 2s 后执行
		resolve('first')
	}, 2000)
})
	.then( value => {
		console.log(value + ' blood --logs')// 2s 后执行
		// 自执行前面必须加 ';' , 不然会报错  (console.log() is not a function)
		;(function () {
			return new Promise( resolve => {
				setTimeout( () => {
					console.log('second blood！')// 2s + 2s 后执行
					resolve('second')
				}, 2000)
			})
		}())
		return false
	})

	.then( value => {
		console.log(' blood --logs');// 2s 后执行
	})