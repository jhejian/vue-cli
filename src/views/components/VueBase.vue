<template>
    <div>
        <main v-world='`directive`'></main>
        <br>
        <article v-wbs='`江西.赣州`'></article>
        <br>
        <section v-changeBackground='`20px`'></section>
        <br>
        <aside class="aside" v-drag>

        </aside>
        <br>
        <p>
            <span>普通属性：{{ msg }}</span>
            <br>
            <span>计算属性：{{ msg2 }}</span>
            <br>
            <span>计算属性：{{ reverseMsg }}</span>
            <br>
            <el-button size='small' @click="changeMsg">changeMsg</el-button>
            <br>
            计算属性：<mark>{{ fullName }}</mark>
        </p>
    </div>
</template>
<script>
// 一.自定义指令
// Vue自定义指令和组件一样存在着全局注册和局部注册两种方式。
// 先来看看注册全局指令的方式，通过 Vue.directive( id, [definition] ) 方式注册全局指令，第二个参数可以是对象数据，也可以是一个指令函数。
// 注：使用指令时必须在指令名称前加前缀v-，即v-指令名称
// vue自定义指令的几个钩子函数？
    // bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

    // inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。

    // update：被绑定元素所在模板更新时调用，但是可能发生在其子 VNode 更新之前。

    // componentUpdated：被绑定元素所在模板完成一次更新周期时调用。

    // unbind：只调用一次，指令与元素解绑时调用。

// 钩子函数参数？
    // el：指令所绑定的元素，可以用来直接操作 DOM

    // binding：一个对象，包含以下属性
        // name：指令名，不包括 v- 前缀。
        // value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
        // expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"
        // arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
        // modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }

// 示例：
import Vue from 'vue'
Vue.directive('world', {
  bind(el, binding) {
    console.log(el);//指令所绑定的元素，DOM对象,<main v-world='`directive`'></main>
    el.style.color = 'red';
    console.log(binding);
    // {
    //     def: {bind: ƒ}//方法集锦
    //     expression: "`directive`"//指令表达式
    //     modifiers: {}//包含修饰符的对象
    //     name: "world"//指令名，不包括 v- 前缀
    //     rawName: "v-world"//'v+指令名'
    //     value: "directive"//指令的绑定值
    // }
    el.innerHTML = binding.value
  }
});
// 函数简写
// 在很多时候，你可能想在 bind 和 update 时触发相同行为，而不关心其它的钩子
// 示例：
//传入一个简单的函数，bind和update时调用
Vue.directive('wbs',function(el, binding){
   console.log(el)
   console.log(binding)
   el.innerHTML = binding.value
});

// 引入自封装功能指令
import '@/directive/drag'
export default {
    // 计算属性
    // 计算属性也是用来存储数据，但具有以下几个特点：
        // a.数据可以进行逻辑处理操作
        // b.对计算属性中的数据进行监视

    // 计算属性 vs 普通属性
    // 可以像绑定普通属性一样在模板中绑定计算属性，在定义上有区别：计算属性的属性值必须是一个函数
    // 计算属性与普通属性的比较：
    data() {//普通属性
        return {
            msg:'welcome to beijing',
            firstName: '张三',
            lastName: '李四'
        }
    },
    computed: {//计算属性
        msg2: function(){ //该函数必须有返回值，用来获取属性，称为get函数
            return '欢迎来到北京';
        },
        reverseMsg(){
            //可以包含逻辑处理操作，同时reverseMsg依赖于msg,一旦msg发生变化，reverseMsg也会跟着变化
            return this.msg.split(' ').reverse().join(' ');
        },

        // 计算属性由两部分组成：get和set，分别用来获取计算属性和设置计算属性
        // 默认只有get，如果需要set，要自己添加。另外set设置属性，并不是直接修改计算属性，而是修改它的依赖
        fullName: {
            // getter
            get: function () {
                return this.firstName + ' love ' + this.lastName
            },
            // setter
            set: function (newValue) {
                //this.fullName = newValue 这种写法会报错
                var names = newValue.split(' ').reverse()
                this.firstName = names[0]//对它的依赖进行赋值
                this.lastName = names[names.length - 1]//对它的依赖进行赋值
            }
        }
    },
    // 计算属性 vs 方法
    // 将计算属性的get函数定义为一个方法也可以实现类似的功能
    // 区别：
        // a.计算属性是基于它的依赖进行更新的，只有在相关依赖发生改变时才能更新变化
        // b.计算属性是缓存的，只要相关依赖没有改变，多次访问计算属性得到的值是之前缓存的计算结果，不会多次执行
    methods: {
        changeMsg(){
            this.msg = 'I am from ganzhou'
        }
    },
    // 局部注册
    directives: {
        changeBackground: {
            bind(el, binding){
                el.style.background = 'pink'
                el.style.height = binding.value
            }
        }
    },

    // vue生命周期函数
    beforeCreate(){//组件实例刚刚创建，还未进行数据观测和事件配置
        // 这里不要被beforeCreate误导，实际上组件实例已经创建了
        console.log(`组件实例刚刚创建`)
    },
    created(){//实例已经创建完成，并且已经完成数据观测，属性和方法的运算，watch/event 事件回调。//常用！！！
        console.log(`实例已经创建完成`)
    },
    beforeMount(){//模板编译之前，还没挂载，页面仍未展示，但虚拟Dom已经配置
        //先把坑占住了，到后面mounted挂载的时候再把值渲染进去
        console.log(`模板编译之前`)
    },
    mounted(){//模板编译之后，已经挂载，此时才会渲染页面，才能看到页面上数据的展示//常用！！！
        console.log(`模板编译之后`)
        // 注意: mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted
        this.fullName = '张三 love 李四'//给计算属性赋值会触发fullName.set方法，绑定在视图view上触发的是fullName.get方法
    },
    beforeUpdate(){
        console.log(`组件更新之前`)
    },
    updated(){
        console.log(`组件更新之后`)
    },
    beforeDestroy(){
        console.log(`组件销毁之前`)
    },
    destroyed(){
        console.log(`组件销毁之后`)
    }
}
</script>
<style>
    .aside{
        width: 1rem;
        height: 1rem;
        background: yellowgreen;
        position: absolute;
        right: .1rem;
        top: 2.5rem;
    }
</style>
