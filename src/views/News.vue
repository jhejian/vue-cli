<template>
    <div>
        新闻
        <p>
            标题：{{ title }}
            <br>
            内容：{{ content }}

            <!-- 挂载组件 -->
            <Directive></Directive>
        </p>
    </div>
</template>
<script>
// 引入组件
import Directive from './Directive'
export default {
    name: 'News',
    data() {
        return {
            title: '',//标题
            content: ''//内容
        }
    },
    mounted() {
        this.title = this.$route.query.title;
        this.content = this.$route.query.content;
    },
    // 注册组件
    components: {
        Directive
    }
}
</script>
