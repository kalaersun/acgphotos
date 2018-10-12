import { message} from 'antd'
export function getRedirectPath(data){
	// 根据用户信息 返回跳转地址
	// user.type /boss /genius
	// user.avatar /bossinfo /geniusinfo 
/* 	let url = (type==='boss')?'/boss': '/genius'
	if (!avatar) {
		url += 'info'
    } */
    console.log(data)
    let url = '/cardlist'
	return url
}
export function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
  }
  
export function beforeUpload(file) {
const isJPG = file.type === 'image/jpeg';
if (!isJPG) {
	message.error('你只能上传 JPG 文件!');
}
const isLt2M = file.size / 1024 / 1024 < 2;
if (!isLt2M) {
	message.error('图片不能大于 2MB!');
}
return isJPG && isLt2M;
}
export function getQueryString(name){
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r !== null) return unescape(r[2]);
    return null;
}
export function formatDate(datetime) {
	var year = datetime.getFullYear(),
	month = (datetime.getMonth() + 1 < 10) ? '0' + (datetime.getMonth() + 1):datetime.getMonth() + 1,
	day = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate(),
	hour = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours(),
	min = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes(),
	sec = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds();
	return year + '-' + month + '-' + day + '_' + hour + '-' + min + '-' + sec;
}