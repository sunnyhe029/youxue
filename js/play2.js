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
var left1 = document.querySelector('.left1')
var menu = document.querySelector('.menu')
console.log(left1)
// ajax请求数据渲染右侧导航内容
var menu = document.querySelector('.menu')
U.ajax('get', '../json/viedo.json', '', function (res) {
    // console.log(res)
    var viedo = JSON.parse(res).viedo
    for (var i = 0; i < viedo.length; i++) {
        var oli = document.createElement('li')
        oli.innerHTML = `
            <div class="num fl">01</div>
            <div class="title fl" >
                直播开班仪式[2020-02-09 10:00]
                <span>已学完</span>
                </div>
                <img src="./images/bofang.jpg" alt="" class="fr">
        `
        menu.appendChild(oli)
    }
    var cli=menu.querySelectorAll("li")
    console.log(cli.length)
    // console.log(menu)
    var ovideo=document.querySelector('video')
    console.log(ovideo)
    for(var j=0;j<cli.length;j++){
        cli[j].index=j
        // console.log(cli[j].index)
        cli[j].onclick=function(){
            for(var k=0;k<cli.length;k++){
                ovideo.innerHTML=''
            }
            console.log(viedo[this.index].poster)
            console.log(viedo[this.index].img)
            ovideo.src=viedo[this.index].img
            ovideo.poster=viedo[this.index].poster
        }  
    }
})


