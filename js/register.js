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
// 创建随机五位数字验证码
var yzm = document.querySelector('.yzm')
var str1 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
yzm.onclick = function () {
    var str = ''
    for (var i = 0; i < 5; i++) {
        var sjs = Math.round(Math.random() * str1.length)
        str += str1[sjs]
    }
    yzm.innerHTML = str.toLocaleLowerCase()
}
var dx = document.querySelector('.dx')
dx.onclick = function () {
    var sjs = ''
    sjs = Math.round(Math.random() * (1e5))
    this.innerHTML = sjs
}
var oform = document.querySelector('form')
//电话号码的首位为1，第二位为3，5，7，8，9，其他位数为零到九的数字
var reg1 = /^1(3|5|8|7|9)([0-9]{9})/
//密码为0-9，a-z，A-Z类型的6-12位数的数字
var reg2 = /[0-9a-zA-Z]{6,12}/
oform.onsubmit = function () {
    var tel = document.querySelector('.tel')
    var psw = document.querySelectorAll('.password')
    var txt1=document.getElementsByClassName('txt1')
    var txt2=document.querySelector('.txt2')
    if (!reg1.test(tel.value)) {
        alert('请输入正确的手机号')
        return false;
    } else if (!reg2.test(psw[0].value)) {
        alert('请输入正确的密码')
        return false
    }else if(!(psw[0].value==psw[1].value)){
        console.log(psw[0].value==psw[1].value)
        // console.log('122')
        alert('请重新确认密码')
        return false
    }else if(!(txt1.value==yzm.innerHTML)){
        alert('请重新输入验证码')
        return false
    }else if(!(txt2.value==dx.innerHTML)){
        alert('请重新输入短信验证码')
        return false
    }
    else {
        if (localStorage[tel.value] ) {
            alert('用户已经存在')
            return false
        } else {
          localStorage[tel.value]==psw[0].value
          alert('注册成功')  
        }
    }
}
