var row1right = document.querySelector('.row1-right')
var row1search = row1right.querySelector('input')
var row1Dw = row1right.querySelector('.row1Dw')
row1Dw.onmouseover = function () {
    row1search.style.transform = 'scaleX(1)'
    row1search.focus()
}
row1search.onblur = function () {
    this.style.transform = 'scaleX(0)'
}
//表格正则验证
var oform = document.getElementsByTagName('form')[0]
var tel = document.querySelector('.tel')
console.log(tel)
console.log(tel.value)
var psw = document.querySelector('.password')
//电话号码的首位为1，第二位为3，5，7，8，9，其他位数为零到九的数字
var reg1 = /^1(3|5|8|7|9)([0-9]{9})$/
// console.log(reg1)
//密码为0-9，a-z，A-Z类型的6-12位数的数字
var reg2 = /[0-9a-zA-Z]{6,12}/
oform.onsubmit = function () {
    console.log(psw)
    if (!reg1.test(tel.value)) {
        alert('请输入正确的手机号')
        return false;
    } else if (!reg2.test(psw.value)) {
        alert('请输入正确的密码')
        return false
    } else {
        if (localStorage[tel.value] == psw.value) {
            alert('登录成功')
        } else {
            alert('用户不存在，请输入正确的手机号或者密码')
        }
    }
}