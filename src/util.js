export function getRedirectPath(data){
	// 根据用户信息 返回跳转地址
	// user.type /boss /genius
	// user.avatar /bossinfo /geniusinfo 
/* 	let url = (type==='boss')?'/boss': '/genius'
	if (!avatar) {
		url += 'info'
    } */
    console.log(data)
    let url = '/photolist'
	return url
}