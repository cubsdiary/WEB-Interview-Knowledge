// 定时执行

console.log('start')

new Promise( resolve => {
	setTimeout( () => {
		console.log('yangjing') // 2 秒后执行
		resolve('yangjing')
	}, 2000)
})
	.then(value => {
		console.log(value + ', hello word!') // 2 秒后执行
	})