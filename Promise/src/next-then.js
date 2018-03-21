
/* 
	then() 里面有then()
	会等里面then() 执行完成 才会执行外面的 then()
	最好展开 方便代码阅读
*/

console.log('start')

new Promise( resolve => {
	setTimeout( () => {
		console.log('first blood!')// 2s 后执行
		resolve('first')
	}, 2000)
})
	.then( value => {
		console.log(value + '  blood --logs')// 2s 后执行
		return new Promise( resolve => {
			setTimeout( () => {
				console.log('second blood!')// 2s + 2s 后执行
				resolve('second')
			}, 2000)
		})
			.then( value => {
				console.log(value + '-1 blood --logs')// 2s + 2s 后执行
				return value
			})
			.then( value => {
				console.log(value + '-2 blood --logs')// 2s + 2s 后执行
				return  value
			})
			.then( value => {
				console.log(value + '-3 blood --logs')// 2s + 2s 后执行
				return  value
			})
	})
	.then( value => {
		console.log( value + '-over blood --logs')// 2s + 2s 后执行
	}) 