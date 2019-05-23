<template>
    <div>  
        实例的属性和方法
        <nav ref="nav">
            庐山
        </nav>
        <header ref="header">
            滕王阁
        </header>
        <section ref="section">
            {{ msg }}
        </section>
        <el-button size="small" @click="changeMsg">
            changeMsg
        </el-button>
        <article class="userInfo">
            姓名：{{ user.name }}&nbsp;&nbsp;&nbsp;&nbsp;
            年龄：{{ user.age }}
        </article>
        <el-button size='small' @click="doAdd">
            年龄+
        </el-button>
        <el-button size='small' type='danger' @click="doDelete">
            deleteAge
        </el-button>
        <hr>

        <!-- 修改element-ui默认样式无效问题 -->
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane label="江西省" name="first">
                <el-card class="box-card">
                    <div v-for="(item,index) in ['南昌', '赣州', '九江', '上饶']" :key="index" class="text item">
                        {{ item }}
                    </div>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="赣州市" name="second">
                <el-card class="box-card">
                    <div v-for="(item,index) in ['赣县', '章贡', '南康', '经开', '蓉江新区']" :key="index" class="text item">
                        {{ item }}
                    </div>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="南康区" name="third">
                <el-card class="box-card">
                    <div v-for="(item,index) in ['唐江', '太窝', '镜坝', '十八塘']" :key="index" class="text item">
                        {{ item }}
                    </div>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="唐江镇" name="fourth">
                <el-card class="box-card">
                    <div v-for="(item,index) in ['通古', '茶亭', '横江', '九驳桥']" :key="index" class="text item">
                        {{ item }}
                    </div>
                </el-card>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
// 引入覆盖样式@cover css覆盖样式
import './style/BaseVue.css'
export default {
    // 实例的属性和方法
    // 1. 属性
        // vm.$el:Vue实例使用的根 DOM 元素
        // vm.$data:获取数据对象data
        // vm.$options:获取自定义属性
        // vm.$refs:一个对象，持有注册过 ref 特性的所有 DOM 元素和组件实例
    // el: '#itany',在这里其实不必定义
    name: 'BaseVue',
    data() {
        return {
            activeName2: 'first',
            msg: 'hello',
            // @2.3
            user: {
                id: 1001,
                name: 'tom'
            }
        }
    },
    show: function(){
	     console.log('show');
    },
    mounted() {
        // vm.属性名 获取data中的属性
        console.log(this.msg)//'hello'
        // vm.$el 获取vue实例关联的元素
        console.log(this.$el)//本页根dom节点
        console.log(this.$el.innerHTML)//'实例的属性和方法'
        this.$el.style.color = 'red'
        // vm.$data //获取数据对象data
        console.log(this.$data)
        // {
        //     msg: "hello"
        // }
        console.log(this.$data.msg)//'hello'
        // vm.$options //获取自定义属性
        console.log(this.$options.name);//'BaseVue'
        this.$options.show();//'show'
        // vm.$refs 获取所有添加ref属性的元素
        console.log(this.$refs);//{nav: nav, header: header}
        console.log(this.$refs.nav);//dom:el:nav
        console.log(this.$refs.header);//dom:el:header
        this.$refs.nav.style.color = 'blue';
        this.$refs.header.style.color = 'green';

        // @2.2
        this.msg = '周杰伦'//页面展示已经更改过来了，但DOM还没更新完
        //Vue实现响应式并不是数据发生改变之后DOM立即变化，需要按一定的策略进行DOM更新，需要时间！！
        console.log(this.$refs.section.textContent)//'hello'---原因是dom还没更新完
        this.$nextTick(() => {
            //DOM更新完成，更新完成后再执行此代码
            console.log(this.$refs.section.textContent);//'周杰伦'
        })
    },

    // 2. 方法
        // vm.$mount():手动挂载vue实例//vm.$mount('#itany');
        // vm.$destroy():销毁实例
        // vm.$nextTick(callback):在DOM更新完成后再执行回调函数，一般在修改数据之后使用该方法，以便获取更新后的DOM
        // vm.$set(target, key, value)与Vue.set用法相同
        // vm.$delete(target, key)与Vue.delete用法相同
        // vm.$watch(data,callback[,options])数据监视
    // vm.$mount()使用场景@2.1
    // var vm=new Vue({
    //     data: {
    //         msg:'欢迎来到南京网博',
    //         name:'tom'
    //     }
    // }).$mount('#itany')

    // vm.$nextTick()使用场景@2.2

    // vm.$set(target, key, value)使用场景
    // 用法：向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。
    // 它必须用于向响应式对象上添加新属性，因为Vue 无法探测普通的新增属性,比如 
    // 下面例子中的this.user.age=25，页面并不能展示{{this.user.age}}的数据@2.3

    // vm.$delete(target, key)使用场景@2.4
    // 用途：删除对象的属性。如果对象是响应式的，确保删除能触发更新视图。
    methods: {
        handleClick(tab, event){
            console.log(tab, event)
            console.log(event.target)//dom
            console.log(event.target.innerHTML)//'赣州市'
            console.log(tab.active)//是否选中 true
            console.log(tab.index)//索引 '1'
            console.log(tab.label)//'赣州市'
            console.log(tab.name)//'second'
            console.log(tab.paneName)//'second'
        },
        // @2.3
        doAdd(){
            //通过普通方式为对象添加属性时vue无法实时监视到
            // this.user.age = 25;// 无效
            // console.log(this.user.age)// 25

            //通过vue实例的$set方法为对象添加属性，可以实时监视
            // this.$set(this.user,'age',18);
            // console.log(this.user.age)// 18
          
            if(this.user.age) {
                this.user.age++;
            }else{
                this.$set(this.user, 'age', 18);
            }
        },
        // @2.4
        doDelete(){
            if (this.user.age) {
                // delete this.user.age;// 此方法无效
                this.$delete(this.user, 'age');
            }else{
                console.log(this.user.age)//undefined
            }
        },
        changeMsg(){
            this.msg = 'jhe'
        }
    },

    // vm.$watch( expOrFn, callback, [options] )使用场景@2.5
        // expOrFn：监听的属性
        // callback：回调函数
        // options：{
                // deep：为了发现对象内部值的变化，可以在选项参数中指定 deep: true 。注意监听数组的变动不需要这么做。
                // immediate：boolean
        // }
    // 用途:观察 Vue 实例变化的一个表达式或计算属性函数。回调函数得到的参数为新值和旧值。

    // @2.5
    watch: { //方式2：使用vue实例提供的watch选项
        msg: (newValue, oldValue) => {
            console.log(`原值：${oldValue} 新值：${newValue}`);
            // 原值：hello 新值：周杰伦
            // 原值：周杰伦 新值：jhe
        },
        user: {
            // handler：固定写法
            handler: (newValue, oldValue) => {
                console.log(`user.age原值：${oldValue.age} 新值：${newValue.age}`);
                // 
            },
            deep: true //深度监视，当对象中的属性发生变化时也会监视
        }
    }
    //方式1：使用vue实例提供的$watch()方法
    // vm.$watch('name', function (newValue, oldValue) {
        // console.log('name被修改啦，原值：' + oldValue + '，新值：' + newValue);
    // });
    // 当对象中的属性发生变化时,也可以采用这种办法
    // vm.$watch（"user",function(newValue,oldValue){
        // console.log('user被修改啦，原值：'+oldValue.name+'，新值：'+newValue.name);
    // },true)
}
</script>

<style scoped>
/* 自写样式覆盖不了element官方样式罪魁祸首：scoped */

/* 解决方法一：去除scoped属性（不建议） */
/* 解决方法二：抽离出去以js的方式引入（建议）@cover css覆盖样式 */
/* .el-tabs__item{
    color: red!important;
}
.el-tabs__item.is-active{
    color: #409EFF!important;
} */
article.userInfo{
    color: pink;
}
</style>
