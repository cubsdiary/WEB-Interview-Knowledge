// 分两次 顺序依次执行

console.log('start')

new Promise( resolve => {
	setTimeout( () => {
		console.log('first blood!')  // 2s 后执行
		resolve('first')
	}, 2000)
})
	.then( value => {
		console.log(value + 'blood --- logs') 
		return new Promise( resolve => {
			setTimeout( () => {
				console.log(', second blood!') // 2s + 2s 后执行
				resolve('second')
			}, 2000)
		})
	})
	.then( value => {
		console.log(value + ', blood --- logs') // 2s + 2s 后执行
	})