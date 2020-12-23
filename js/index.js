// 头部的右侧点击效果
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
// banner 轮播效果
var bannerBox = document.getElementsByClassName('banner')[0]
var oul = document.getElementsByClassName('banul')[0]
var n = 0
var timer = null
var bannerIn = document.getElementsByClassName('bannerIn')
// ajax请求数据
U.ajax('get', '../json/banner.json', 'name=张三', function (res) {
    var bannerIn = document.getElementsByClassName('bannerIn')
    var banner = JSON.parse(res).banner
    var banWidth = parseInt(U.getStyle(bannerBox, 'width'))
    // oul.style.width=(banWidth*banner.length)+'px'
    var str = ''
    for (var i = 0; i < banner.length; i++) {
        str += '<li><img src=' + banner[i] + ' alt=""></li>'
    }
    oul.innerHTML = str
    var oli = oul.getElementsByTagName('li')
    var oliw = parseInt(U.getStyle(oli[0], 'width'))
    var firstli = oli[0].cloneNode(true)
    oul.appendChild(firstli)
    var n = 0
    // 开启定时器定时轮播
    timer = setInterval(auto, 2000)
    function auto() {
        if (n >= oli.length - 1) {
            n = 0
            oul.style.left = '0px'
        }
        n++
        console.log(n)
        change()
        // 引入buffermove封装的运动函数
        U.buffermove(oul, { 'left': -n * oliw })
    }
    //小按钮点击切换图片
    var btn = document.getElementsByClassName('btn')[0]
    var ospan = btn.getElementsByTagName('span')
    for (var k = 0; k < ospan.length; k++) {
        ospan[k].index = k
        ospan[k].onclick = function () {
            clearInterval(timer)
            n = this.index
            change()
            U.buffermove(oul, { 'left': -n * 1366 })
        }
    }
    function change() {
        for (var j = 0; j < ospan.length; j++) {
            ospan[j].className = ''
        }
        if (n == ospan.length) {
            // n=0
            ospan[0].className = 'active'
        } else {
            console.log(n)
            ospan[n].className = 'active'
        }
    }
    // 点击左右按钮切换图标
    var divLeft = document.getElementsByClassName('leftBtn')
    var divRight = document.getElementsByClassName('rightBtn')
    divLeft[0].onclick = function () {
        if (n <= 0) {
            n = oli.length - 1
            oul.style.left = -n * 1366 + 'px'
        }
        n--
        change()
        U.buffermove(oul, { 'left': -n * 1366 })
    }
    divRight[0].onclick = function () {
        auto()
    }
    //鼠标划上的时候关闭定时器
    bannerIn[0].onmouseover = function () {
        clearInterval(timer)
    }
    //鼠标离开的时候开启定时器
    bannerIn[0].onmouseout = function () {
        timer = setInterval(auto, 2000)
    }
    // 热门直播选项卡切换效果
    var rightA = document.getElementsByClassName('rightA')[0]
    var oli1 = rightA.getElementsByTagName("li")
    var leftA = document.getElementsByClassName('leftA')[0]
    var oa = leftA.getElementsByTagName('a')
    for (var i = 0; i < oli1.length; i++) {
        oli1[i].index = i
        oli1[i].onmouseover = function () {
            for (var j = 0; j < oli1.length; j++) {
                oli1[j].className = ''
            }
            for (var k = 0; k < oa.length; k++) {
                oa[k].className = ''
            }
            this.className = 'active'
            oa[this.index].className = 'active'
        }
    }
})
//ajax请求数据，渲染精品网课模块
U.ajax('get', '../json/wangke.json', 'name=张三', function (res) {
    var wangke1 = JSON.parse(res).wangke
    var arr1 = wangke1[0].arr1
    var kecheng = document.getElementsByClassName('kecheng')[0]
    var ospan = kecheng.getElementsByTagName('span')
    var wangke = document.querySelector('.wangke')
    var jpContent = wangke.querySelector('.jpContent')
    //未划上的时候添加八张图片
    for (var i = 0; i < arr1.length; i++) {
        var jpCli = document.createElement('li')
        jpCli.innerHTML = `
        <img src=`+ arr1[i].img + ` alt="">
        <p>`+ arr1[i].jieshi + `</p>
        <div class="jpmoney clearfix">
            <span class="fl">￥`+ arr1[i].price + `.00</span>
            <i class="fr">`+ arr1[i].keshi + `课时</i>
        </div>
        `
        jpContent.appendChild(jpCli)
    }
    ospan[0].style.color = '#fa7a79'
    ospan[0].style.textDecoration = 'underline'
    for (var k = 0; k < ospan.length; k++) {
        ospan[k].index = k
        ospan[k].onmousemove = function () {
            for (var j = 0; j < ospan.length; j++) {
                ospan[j].style.color = '#cccccc'
                ospan[j].style.textDecoration = 'none'
            }
            this.style.color = '#fa7a79'
            this.style.textDecoration = 'underline'
            jpContent.innerHTML = ''
            var arr2 = wangke1[this.index].arr1
            for (var i = 0; i < arr1.length; i++) {
                var jpCli = document.createElement('li')
                jpCli.innerHTML = `
                <img src=`+ arr2[i].img + ` alt="">
                <p>`+ arr2[i].jieshi + `</p>
                <div class="jpmoney clearfix">
                    <span class="fl">￥`+ arr2[i].price + `.00</span>
                    <i class="fr">`+ arr2[i].keshi + `课时</i>
                </div>
                `
                jpContent.appendChild(jpCli)
            }
        }
    }
})
//ajax请求数据，渲染免费网课模块
U.ajax('get', '../json/mianfei.json', 'name=张三', function (res) {
    var mianfei = JSON.parse(res).mianfei
    var mfarr1 = mianfei[0].mfarr
    var mfkc = document.querySelector('.mfkc')
    var mfContent = mfkc.querySelector('.jpContent')
    for (var mf = 0; mf < mfarr1.length; mf++) {
        var mfCli = document.createElement('li')
        mfCli.innerHTML = `
        <img src=`+ mfarr1[mf].img + ` alt="#">
        <p>`+ mfarr1[mf].jieshi + `</p>
        <div class="jpmoney clearfix">
            <span class="fl">￥`+ mfarr1[mf].price + `.00</span>
            <i class="fr">`+ mfarr1[mf].keshi + `课时</i>
        `
        mfContent.appendChild(mfCli)
    }
    var mfkcdaohang = mfkc.querySelector('.jpwkdaohang')
    var mfdaohangli = mfkcdaohang.querySelectorAll('li')
    mfdaohangli[0].style.color = '#fa7a79'
    mfdaohangli[0].style.textDecoration = 'underline'
    for (var x = 0; x < mfdaohangli.length; x++) {
        mfdaohangli[x].index = x
        mfdaohangli[x].onmouseover = function () {
            for (var t = 0; t < mfdaohangli.length; t++) {
                mfdaohangli[t].style.color = '#666'
                mfdaohangli[t].style.textDecoration = 'none'
            }
            this.style.color = '#fa7a79'
            this.style.textDecoration = 'underline'
            mfContent.innerHTML = ''
            var mfarr = mianfei[this.index].mfarr
            var str = ''
            for (var o = 0; o < mfarr.length; o++) {
                var mfCli = document.createElement('li')
                mfCli.innerHTML = `
                <img src=`+ mfarr[o].img + ` alt="#">
                <p>`+ mfarr[o].jieshi + `</p>
                <div class="jpmoney clearfix">
                    <span class="fl">￥`+ mfarr[o].price + `.00</span>
                    <i class="fr">`+ mfarr[o].keshi + `课时</i>
                `
                mfContent.appendChild(mfCli)
            }
        }
    }
})
U.ajax('get', '../json/youlian.json', 'name=张三', function (res) {
    var youlian = JSON.parse(res).youlian
    var ylarr1 = youlian[0].itlianjie
    var ylian = document.querySelector('.youlian')
    var youlianBom = ylian.querySelector('.youlianBom')
    for (var y = 0; y < ylarr1.length; y++) {
        var ylCli = document.createElement('li')
        ylCli.innerHTML = ylarr1[y]
        youlianBom.appendChild(ylCli)
    }
    var youliantop = ylian.querySelector('.youliantop')
    var ylh5 = youliantop.querySelectorAll('h5')
    ylh5[0].style.color = '#ff0000'
    for (var yl = 0; yl < ylh5.length; yl++) {
        ylh5[yl].index = yl
        ylh5[yl].onmouseover = function () {
            for (var t = 0; t < ylh5.length; t++) {
                ylh5[t].style.color = '#6c3333'
            }
            this.style.color = '#ff0000'
            youlianBom.innerHTML = ''
            var arr = youlian[this.index].itlianjie
            for (var i = 0; i < arr.length; i++) {
                var youlianli = document.createElement('li')
                youlianli.innerHTML = arr[i]
                youlianBom.appendChild(youlianli)
            }
        }
    }
})
//ajax请求数据渲染友情链接模块
U.ajax('get', '../json/youlian.json', 'name=张三', function (res) {
    var youlian = JSON.parse(res).youlian
    var ylarr1 = youlian[0].itlianjie
    var ylian = document.querySelector('.youlian')
    var youlianBom = ylian.querySelector('.youlianBom')
    for (var y = 0; y < ylarr1.length; y++) {
        var ylCli = document.createElement('li')
        ylCli.innerHTML = ylarr1[y]
        youlianBom.appendChild(ylCli)
    }
    var youliantop = ylian.querySelector('.youliantop')
    var ylh5 = youliantop.querySelectorAll('h5')
    ylh5[0].style.color = '#ff0000'
    for (var yl = 0; yl < ylh5.length; yl++) {
        ylh5[yl].index = yl
        ylh5[yl].onmouseover = function () {
            for (var t = 0; t < ylh5.length; t++) {
                ylh5[t].style.color = '#6c3333'
            }
            this.style.color = '#ff0000'
            youlianBom.innerHTML = ''
            var arr = youlian[this.index].itlianjie
            for (var i = 0; i < arr.length; i++) {
                var youlianli = document.createElement('li')
                youlianli.innerHTML = arr[i]
                youlianBom.appendChild(youlianli)
            }
        }
    }
})







