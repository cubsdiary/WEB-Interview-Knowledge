// 错误捕获
	

console.log('start')
new Promise( resolve => {
	setTimeout( () => {
		throw new Error('bad Girls')
		console.log('yangjing') // 2 秒后执行
		resolve('yangjing')
	}, 2000)
})
	.then(value => {
		console.log(value + ', hello word!') // 2 秒后执行
	})
	.catch( err => {
		console.log('Error: ====' + err)
	})
	.then(value => {
		console.log(', hello word!aaa') // 2 秒后执行
	})
	.then(value => {
		console.log(', hello word!aaa') // 2 秒后执行
	})
	.then(value => {
		console.log(', hello word!aaa') // 2 秒后执行
	})