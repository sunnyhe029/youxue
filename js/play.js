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

var menu=document.querySelector('.menu')
var oli=menu.querySelectorAll('li')
console.log(oli)
var ovideo=document.querySelectorAll('video')
console.log(ovideo)
// 点击右侧边导航内容的时候左侧的视频显示
for(var i=1;i<oli.length;i++){
    oli[i].index=i
    oli[i].onclick=function(){
        for(var j=0;j<oli.length;j++){
            ovideo[j].className=''
        }
        ovideo[this.index].className='active'
    }
    
    
}

