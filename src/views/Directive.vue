<template>
    <div>
        <!-- 准备实现需求：在span标签上面，加上一个按钮，当点击按钮时候，对count实现一次自增操作，当count等于5的时候，在控制台输出‘it is a test’-->
        <div v-if="count < 5">
            <el-button size='small' @click="handleClick">
                点击
            </el-button>
            <!-- 绑定自定义指令 -->
            <span v-change>
                自定义指令
            </span>
        </div>
        <div v-else>
            <!-- 绑定自定义指令并传参 -->
            <h3 v-background-color="myBgColor">
                it is a header1
            </h3>
            <el-button size='small' @click="skin">
                换肤
            </el-button>
        </div>
    </div>
</template>
<script>
// Vue自带的指令很多，
// v-for v-if v-else v-else-if v-model v-bind v-on v-show v-html v-text...
// 但是这些指令都是比较偏向于工具化，有些时候在实现具体的业务逻辑的时候，发现不够用，如何来自定义指令
export default {
    name: 'Directive',
    data() {
        return {
            count: 0,
            myBgColor: 'red'
        }
    },
    methods: {
        handleClick(){
            this.count++;
        },
        skin(){
            var arr = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']
            var str = '#'
            for(var i=0; i<6; i++){
                str += arr[ Math.floor(Math.random()*16)]
            }
            this.myBgColor = str
        }
    },
    // 自定义指令
    directives: {
        // 在自定义指令时，在指令对应的配置对象中有3个处理函数指令对应的操作
        change: {
            // bind方法以及update方法 都是有参数的，
            // 一个是el，对应的是调用指令的元素
            // 一个bindings，是一个对象
            bind(el, bindings){//指令在绑定到元素要执行的操作
                console.log('指令已经绑定到元素了');//'指令已经绑定到元素了'
                console.log(el);//dom：span
                console.log(bindings);//{name: "change", rawName: "v-change", modifiers: {…}, def: {…}}
                console.log(bindings.rawName, 'v-指令名称')//'v-change' 'v-指令名称'
                console.log(bindings.name, '指令名称')//'change' '指令名称'
                console.log(bindings.def.bind)//ƒ bind(el, bindings) {}
                console.log(bindings.def.update)//ƒ update(el, bindings) {}
                console.log(bindings.def.unbind)//ƒ unbind() {}
                el.innerHTML = 0
            },
            update(el, bindings){//如果在调用指令时候，传了参数，当参数变化时候，就会执行update所指定的方法
                console.log('指令的数据有所变化');//'指令的数据有所变化'
                console.log(el);//dom：span
                el.innerHTML = Number(el.innerHTML) + 1;
            },
            unbind(){//解绑要执行的操作
                console.log('解除绑定了');
            }
        },
        // 注意事项：
        // 建议在给指令的命名采用小驼峰式的命名方式，比如changeBackgroundColor,在使用的时候，采用烤串式写法 v-change-background-color
        backgroundColor: {
            bind: function(el, bindings){
                console.log(bindings)
                // {
                //     def: {bind: ƒ, update: ƒ}//方法集锦
                //     expression: "myBgColor"//绑定的变量名称
                //     modifiers: {}
                //     name: "background-color"//指令名称
                //     rawName: "v-background-color"//v-指令名称
                //     value: "red"//绑定的变量取值
                // }
                el.style.backgroundColor = bindings.value;
            },
            update(el, bindings){
                console.log(bindings)
                // {
                //     def: {bind: ƒ, update: ƒ}//方法集锦
                //     expression: "myBgColor"//绑定的变量名称
                //     modifiers: {}
                //     name: "background-color"//指令名称
                //     oldArg: undefined
                //     oldValue: "#8cc464"//旧值
                //     rawName: "v-background-color"//v-指令名称
                //     value: "#561e6a"//新值
                // }
                el.style.backgroundColor = bindings.value;
            }
        }
　　}
}
</script>
