import Vue from 'vue'
// 自定义拖拽元素的指令
Vue.directive('drag', function (el) {
    // 1.元素鼠标按下事件
    el.onmousedown = function (e) {
        var e = e || window.event
        // 阻止浏览器默认行为
        if (e && e.preventDefault) {
            e.preventDefault();//防止浏览器默认行为(W3C) 
        } else {
           window.event.returnValue = false;//IE中阻止浏览器行为 
        }

        //获取鼠标点击处分别与div左边和上边的距离：鼠标位置-div位置
        var disX = e.clientX - el.offsetLeft;
        var disY = e.clientY - el.offsetTop;
        // console.log(disX, disY);

        // 2.document的移动事件
        //包含在onmousedown里面，表示点击后才移动，为防止鼠标移出div，使用document.onmousemove
        document.onmousemove = function (e) {
            //获取移动后div的位置：鼠标位置-disX/disY
            var l = e.clientX - disX;
            var t = e.clientY - disY;
            el.style.left = l + 'px';
            el.style.top = t + 'px';
        }

        // 3.document鼠标松开事件：停止移动
        document.onmouseup = function (e) {
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }
});