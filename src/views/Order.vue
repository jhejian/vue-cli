<template>
    <div>
        订单
        <p>
            订单id：{{ OrderId }}
            <br>
            订单编号：{{ OrderNumber }}
        </p>

        element树形控件：若子选中，父也要选中
        <!-- show-checkbox：节点是否可被选择，默认false -->
        <!-- default-expand-all：是否默认展开所有节点 -->
        <!-- default-checked-keys：默认勾选的节点的key的数组 -->
        <!-- node-key：每个树节点用来作为唯一标识的属性，整棵树应该是唯一的 -->
        <!-- @check="checkClick：选中所触发的事件 -->
        <!-- highlight-current：是否高亮当前选中节点，默认值是 false -->
        <!-- props：配置选项，具体看下表 -->
        <el-tree
            :data="trees"
            :show-checkbox="true"
            :default-expand-all="true"
            :default-checked-keys="checkedKeys"
            node-key="id"
            ref="tree"
            @check="checkClick"
            highlight-current
            :props="defaultProps">
        </el-tree>
        <el-button size='small' @click="submitCheck">
            提交
        </el-button>
        <el-button size='small' @click="edit">
            编辑
        </el-button>
    </div>
</template>
<script>
export default {
    name: 'Order',
    data() {
        return {
            OrderId: '',//订单id
            OrderNumber: '',//订单编号

            checkedKeys: [],//默认勾选的节点的key的数组，eg：[101]
            defaultProps: {//配置选项,指定孩子属性名和页面显示的字段名称
                children: "child",
                label: "address"
            },
            trees: [{//树形控件数据
                id: 1,
                address: "江西",
                child: [{
                    id: 10,
                    address: "赣州",
                    child: [{
                        id: 101,
                        address: "南康"
                    },{
                        id: 102,
                        address: "上犹"
                    }]
                }]
            },{
                id: 2,
                address: "广东",
                child: [{
                    id: 20,
                    address: "深圳",
                    child: [{
                        id: 201,
                        address: "宝安"
                    },{
                        id: 202,
                        address: "龙岗"
                    }]
                }]
            }],
            checkedList: []//选中的值，需提交给后台
        }
    },
    methods: {
        checkClick(val){
            // console.log(val, '选择触发事件')
        },
        submitCheck(){
            // 做权限管理的时候，若果有子集被选中了，父级也要被选中，最后把所有的id连接成一个数组发送给后端
            // 官方文档中有这个方法，可以获取到半选中状态的父级的id集合，然后把选中的和半选中的通过concat连接成新数组。
            let checkedListHalf = this.$refs.tree.getHalfCheckedKeys()//获取半选中的父级
            let checkedList = this.$refs.tree.getCheckedKeys()//获取菜单树下选中的菜单列表，缺少半选中的父级
            this.checkedList = checkedList.concat(checkedListHalf)
            console.log(this.checkedList, '提交后台')
        },
        edit(){
            // 做完之后，再次编辑的时候获取后端数据，还是那个数组，需要过滤掉半选中的数据，重新设置好树形控件的选中状态
            // 解决办法：
            // 在methods中写一个过滤函数
            
            // 然后在点击编辑按钮时，后端返回的数据中调用该过滤函数
            if(false){
                var url = api.saverolegroup;
                this.$http.get(url, { 
                    params: { 
                        id: row.id 
                    } 
                }).then(res => {
                    let data = res.data;
                    if (data.code == 200) {
                        var rules = data.result.rules;
                        var needdelarr = [];
                        rules.map((v, i) => {
                            this.diguiquchu(
                                data.result.rules,
                                data.result.list,
                                v,
                                i,
                                needDelArr
                            );
                        });
                        console.log(needDelArr);
                        console.log(rules);
                        rules = rules.filter(item => !needDelArr.includes(item));
                        console.log(rules);
                        this.checkedKeys = rules;
                    }
                }).catch(error => {
                    console.log(error);
                });
            }else{
                this.checkedKeys = [101, 201]
            }
        },
        // 过滤函数
        diguiquchu(datas, arr, v, i, needdelarr) {
            //递归找出半选中的数据
            arr.map((item, index) => {
                if (item.id == v && item.child) {
                    needdelarr.push(v);
                    this.diguiquchu(datas, item.child, v, i, needdelarr);
                } else if (item.id != v && item.child) {
                    this.diguiquchu(datas, item.child, v, i, needdelarr);
                }
            });
        },
    },
    mounted() {
        this.OrderId = this.$route.params.OrderId;
        this.OrderNumber = this.$route.params.OrderNumber
    },
}
</script>
