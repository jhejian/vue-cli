<template>
    <div>
        <el-button type="text" @click="open">
            Message Box
        </el-button>
        <el-button type="text" @click="open2">
            删除
        </el-button>
        <el-button type="text" @click="open3">
            prompt
        </el-button>
        <el-button type="text" @click="open4">
            自定义弹框
        </el-button>
        <el-button type="text" @click="open5">
            HTML弹框
        </el-button>
    </div>
</template>
<script>
export default {
    methods: {
        // 消息提示弹框
        open: function(){      
            this.$alert('这是一段内容', '标题名称', {
                confirmButtonText: '确定',
                // 点击确认取消，都会触发callback回调函数
                callback: action => {
                    if(action === 'confirm'){
                        console.log('确定')
                    }else{
                        console.log('取消/关闭')
                    }
                    // console.log(action)
                    this.$message({
                        type: 'info',
                        message: `action: ${ action }`
                    });
                }
            });
        },

        // 确认消息弹框
        open2() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 点了确定
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                // 点了取消/关闭
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },

        // 提交内容弹框
        open3() {
            this.$prompt('请输入邮箱', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                inputErrorMessage: '邮箱格式不正确',
                inputPlaceholder: '请输入邮箱',
                roundButton: true// 是否使用圆角按钮
            }).then(({ value }) => {
                // 点了确定
                this.$message({
                    type: 'success',
                    message: `你的邮箱：${value}`
                });
            }).catch(() => {
                // 点了取消/关闭
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });       
            });
        },

        // 自定义弹框
        open4: function(){
            const h = this.$createElement;
            // console.log(h)
            this.$msgbox({
                title: '消息',//弹框标题
                message: h('p', null, [
                    h('span', null, '内容可以是 '),
                    h('i', { style: 'color: red' }, 'VNode')
                ]),
                /*
                <p>
                    <span>内容可以是 </span>
                    <i style="color: red;">VNode</i>
                </p>
                */
                showCancelButton: true,//是否显示取消按钮
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                // 在即将关闭前执行的回调
                beforeClose: (action, instance, done) => {
                    // 点了确认，先loadding，再关闭弹框
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true;//按钮loadding效果
                        instance.confirmButtonText = '执行中...';//按钮文字变化
                        setTimeout(() => {
                            // 先loadding 0.3s
                            setTimeout(() => {
                                instance.confirmButtonLoading = false;
                            }, 300);
                            // 关闭弹框 3s
                            done();
                        }, 3000);
                    } else {
                        // 点了取消/关闭，立即关闭弹框
                        done();
                    }
                }
            }).then(action => {
                // 点了确认
                this.$message({
                    type: 'success',
                    message: 'action: ' + action
                });
            }).catch(action => {
                // 点了取消/关闭
                this.$message({
                    type: 'info',
                    message: 'action: ' + action
                });
            });
        },

        // 使用HTML弹框
        open5() {
            this.$alert(`
                <ul>
                   <li>江西</li>
                   <li>广东</li>
                   <li>福建</li>
                </ul>`, 
                '标题党', 
                {
                    dangerouslyUseHTMLString: true
                }
            ).then(() => {
                console.log('点了确定')
            }).catch(() => {
                console.log('点了取消')
            });
        }
    }, 
    data() {
        return {
            // element弹框配置参数：
            title: 'MessageBox 标题	string	—	—',
            message: 'MessageBox 消息正文内容	string / VNode	—	—',
            dangerouslyUseHTMLString: '是否将 message 属性作为 HTML 片段处理	boolean	—	false',
            type: '消息类型，用于显示图标	string	success / info / warning / error	—',
            customClass: 'MessageBox 的自定义类名	string	—	—',
            callback: '若不使用 Promise，可以使用此参数指定 MessageBox 关闭后的回调	function(action, instance)，action 的值为’confirm’或’cancel’, instance 为 MessageBox 实例，可以通过它访问实例上的属性和方法	—	—',
            showClose: 'MessageBox 是否显示右上角关闭按钮	boolean	—	true',
            beforeClose: 'MessageBox 关闭前的回调，会暂停实例的关闭	function(action, instance, done)，action 的值为’confirm’或’cancel’；instance 为 MessageBox 实例，可以通过它访问实例上的属性和方法；done 用于关闭 MessageBox 实例	—	—',
            lockScroll: '是否在 MessageBox 出现时将 body 滚动锁定	boolean	—	true',//是否锁屏
            showCancelButton: '是否显示取消按钮	boolean	—	false（以 confirm 和 prompt 方式调用时为 true）',
            showConfirmButton: '是否显示确定按钮	boolean	—	true',
            cancelButtonText: '取消按钮的文本内容	string	—	取消',
            confirmButtonText: '确定按钮的文本内容	string	—	确定',
            cancelButtonClass: '取消按钮的自定义类名	string	—	—',
            confirmButtonClass: '确定按钮的自定义类名	string	—	—',
            closeOnClickModal: '是否可通过点击遮罩关闭 MessageBox	boolean	—	true（以 alert 方式调用时为 false）',
            closeOnPressEscape: '是否可通过按下 ESC 键关闭 MessageBox	boolean	—	true（以 alert 方式调用时为 false）',
            closeOnHashChange: '是否在 hashchange 时关闭 MessageBox	boolean	—	true',
            showInput: '是否显示输入框	boolean	—	false（以 prompt 方式调用时为 true）',
            inputPlaceholder: '输入框的占位符	string	—	—',
            inputType: '输入框的类型	string	—	text',
            inputValue: '输入框的初始文本	string	—	—',
            inputPattern: '输入框的校验表达式	regexp	—	—',
            inputValidator: '输入框的校验函数。可以返回布尔值或字符串，若返回一个字符串, 则返回结果会被赋值给 inputErrorMessage	function	—	—',
            inputErrorMessage: '校验未通过时的提示文本	string	—	输入的数据不合法!',
            center: '是否居中布局	boolean	—	false',
            roundButton: '是否使用圆角按钮	boolean	—	false'
        }
    },
}
</script>
