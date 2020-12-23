var U=(function(window,document){
           /*  getStyle获取非行间样式
       * param  obj  元素  (object)
       * param  attr 属性  (string)
       */
      function getStyle(obj,attr) {
        if (window.getComputedStyle) { 
            //如果window存在getComputedStyle 就为真
            return  getComputedStyle(obj)[attr]
        } else {
            //IE
           return  obj.currentStyle[attr]
        }     
    }


    /* 移动框架
    param  obj 元素  object
    param  attr 属性 string
    param  step 步长 number
    param  target 目标值 number
    
    */
   
   function move(obj, attr,step, target) { //obj元素   attr 属性
    clearInterval(obj.timer)
    /* 
    初始值  0  目标值 500  step正
    初始值 500 目标值 0  step负值
    
    */
    var fined=parseInt(getStyle(obj, attr))
     step = fined>target?-step:step

    obj.timer = setInterval(function () {
        // 判断不一样
        var speed = parseInt(getStyle(obj, attr)) + step
        if ((speed <= target&&step<0)||(speed >= target&&step>0)) { 
            speed = target
            clearInterval(obj.timer)
        }
        obj.style[attr] = speed + 'px'
    }, 30)
}


/* 
*获取几到几之间的随机数
* param max 最大值
* param min 最小值 
*/
function random(max,min){
    return Math.floor(Math.random()*(max-min+1)+min)
 }

     /* 
*获取负几到几之间的随机数
* params max 最大值 正值
* param min 最小值  0
*/
 function randomfuSHU(max,min){
    return (Math.round(Math.random()) * 2 - 1)*Math.floor(Math.random()*(max-min+1)+min)
 }


/* 
*Event 事件绑定的兼容处理
* params obj {object} 元素
* params type {string} 事件类型 例如 click
* params fun {function} 函数名 
*/
function Event(obj,type,fun){
if(obj.addEventListener){ //标准
    obj.addEventListener(type,fun)
}else{
    obj.attachEvent('on'+type,fun)
}
}
/* 
*Drag 
* params obj {object} 元素  必须是绝对定位的
*/

function Drag(obj) {//obj 元素
//1、 给对象加按下事件
obj.onmousedown = function (ev) {
    // 8.2 ie 设置全局捕获  处理图片问题
    if (obj.setCapture) {
        obj.setCapture()
    }
    // 9、按下拿到可视区宽高
    var ClientW = document.documentElement.clientWidth
    var ClientH = document.documentElement.clientHeight
    console.log(ClientW)
    console.log(ClientH)

    var ev = window.event || ev
    // 2、求鼠标到 盒子的x轴和y轴
    var downx = ev.clientX - obj.offsetLeft
    var downy = ev.clientY - obj.offsetTop

    // 3、移动时 不断求left值，并赋值
    document.onmousemove = function (ev) {
        var ev = window.event || ev
        // 4、求left值
        var movex = ev.clientX - downx
        var movey = ev.clientY - downy

        //10、限制盒子移动范围
        var maxX = ClientW - obj.offsetWidth
        var maxY = ClientH - obj.offsetHeight
        //11、 x
        if (movex <= 0) {
            movex = 0
        } else if (movex >= maxX) {
            movex = maxX
        }
        //12、y
        if (movey <= 0) {
            movey = 0
        } else if (movey >= maxY) {
            movey = maxY
        }


        //5、 给盒子赋值
        obj.style.left = movex + 'px'
        obj.style.top = movey + 'px'
    }

    // 鼠标抬起
    document.onmouseup = function () {
        // 6、取消移动
        document.onmousemove = null
        document.onmouseup = null


        // 8.1释放全局捕获
        if (obj.releaseCapture) {
            obj.releaseCapture()
        }
    }
    // 7、取消默认选中文字和图片
    return false

}
}

/* 
*solomove(obj,target,attr) 单属性运动
* params obj {object} 元素  必须是绝对定位的
* params target {number}  目标值   opacity max==100  min ==0
* params  attr {string} 运动的属性
*/

function solomove(obj,target,attr) {
// 频繁触发定时器时也要进行清除定时器
clearInterval(obj.timer)
obj.timer=setInterval(function () {
    // 获取当前的位置
    if(attr=='opacity'){
        var current =parseFloat(getStyle(obj,attr))*100
    }else{
        var current = parseInt(getStyle(obj, attr))
    }
 
    var speed =(target-current) /10
      speed= speed>0?Math.ceil(speed):Math.floor(speed)

    // 在500位置停止
    if(current==target){
        clearInterval(obj.timer)
    }
    if(attr=='opacity'){
        obj.style[attr] =(current +speed)/100
    }else{
        obj.style[attr] = current +speed+ 'px'
    }
    
}, 30)
}



/* 
*opacity(obj,target,attr) 单属性opacity运动
* params obj {object} 元素  必须是绝对定位的
* params target {number}  目标值  max==100  min ==0
* params  attr {string} 运动的属性  'opacity'
*/
function opacity(obj,attr,target) {
// 频繁触发定时器时也要进行清除定时器
clearInterval(obj.timer)
obj.timer=setInterval(function () {
    // 获取当前的位置
    console.log(current)
    var current =parseFloat(getStyle(obj,attr))*100
     var speed =(target-current)/10
    speed= speed>0?Math.ceil(speed):Math.floor(speed)
    // // // 在100位置停止
    if(current==target){
        clearInterval(obj.timer)
    }

    obj.style[attr] =(current +speed)/100
}, 30)
}

/* 
*buffermove(obj,json,callback) 多属性同时运动
* params obj {object} 元素  必须是绝对定位的
* params json {'width':500}}  
* params  callback {Function}} 可选 
*/

function buffermove(obj,json,callback) { //(obj,target,attr)  callback 形参
// 频繁触发定时器时也要进行清除定时器
clearInterval(obj.timer)
obj.timer=setInterval(function () {

    var flag=true
    for(var key in json){
        // console.log(key)
        // console.log(json[key])
    // 获取当前的位置
    if(key=='opacity'){
        var current =parseFloat(getStyle(obj,key))*100
    }else{
        var current = parseInt(getStyle(obj, key))
    }
 
    var speed =(json[key]-current) /10
      speed= speed>0?Math.ceil(speed):Math.floor(speed)

    // 在500位置停止
    if(current!=json[key]){
        // 只要有属性未到目标值,就继续往下执行，不清除定时器
        flag=false
    }
    if(key=='opacity'){
        obj.style[key] =(current +speed)/100
    }else{
        obj.style[key] = current +speed+ 'px'
    }    
}

// 所有属性都到达目标值，停止定时器
if(flag==true){ 
    clearInterval(obj.timer)
    if(callback){
        // var callback= function(){}
        callback()
    }else{
        console.log('')
    }
    // callback&&callback()
}
}, 30)
}



 /* ajax(url, method, data, success) 
 *url  {string}  请求地址
 *method {string} 请求方式
 * data {string}=="age=18" 请求的参数
 * success 成功时回调函数 接受一个参数 res 结果
 *     
 */


function ajax(method, url, data, success) {
    // 1、创建ajax 对象
    var xhr = new XMLHttpRequest()
    if (method.toLocaleLowerCase() == 'get') {
        if (data) { //如果data有参数
            // 2、建立连接
            xhr.open(method, url + '?' + data, true)
        } else {
            xhr.open(method, url, true)
        }
        xhr.send()
    } else { //post
        xhr.open(method, url, true)
        // 设置请求头
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        if (data) {//如果data有参数
            xhr.send(data)
        } else {
            xhr.send()
        }
    }

    // 4、注册监听事件
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){//服务器响应完毕 并且 数据请求成功
            // 调用回调函数
            success(xhr.responseText)
        }
    }
}


// 对象属性名和属性值相同的情况下可以省略属性名
return {
    getStyle,
    move,
    random,
    randomfuSHU,
    Event,
    Drag,
    solomove,
    opacity,
    buffermove,
    ajax
}
})(window,document)
    

    