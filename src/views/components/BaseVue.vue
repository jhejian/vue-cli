<template>
    <div>  
        实例的属性和方法
        <nav ref="nav">
            庐山
        </nav>
        <header ref="header">
            滕王阁
        </header>
    </div>
</template>
<script>
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
            msg: 'hello'
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
    },

    methods: {
        
    },
}
</script>
