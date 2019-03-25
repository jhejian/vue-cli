<template>
    <div>
        消息：{{ content }}
        <p>
            <button @click="getAjax">
                Form Data请求
            </button>
        </p>
        <p>
            <button @click="getAjax1">
                Json字符串请求
            </button>
        </p>
    </div>
</template>
<script>
let Base64 = require('js-base64').Base64;
export default {
    name: 'Message',
    data() {
        return {
            content: '',//消息内容
            send: {
                depAddressCode: '440105019'//发货地址编码
            },
            receive: {
                desAddressCode: '120104007'//目的地地址编码
            },
            ContainerSize: '20GP',//箱型(20GP,40H)
            EBusinessID: 1279441,//用户id
            APIKey: 'af5c859e-9741-452c-a908-140a25aba90f'//密钥
        }
    },
    methods: {
        getAjax(){
            // Axios传参的两种方式，表单数据和json字符串
            // 第一种方式：Form Data
            let RequestData = {
                DepAddressCode: this.send.depAddressCode,//发货地址编码
                DesAddressCode: this.receive.desAddressCode,//目的地地址编码
                ContainerSize: this.ContainerSize//箱型(20GP,40H)
            }
            let RequestDataStr = JSON.stringify(RequestData)//json字符串
            let EBusinessID = this.EBusinessID//用户id
            let APIKey = this.APIKey//密钥
            let DataSign = encodeURIComponent(Base64.encode(this.$MD5(RequestDataStr + APIKey).toString()));//签名
            this.$axios({
                method: 'post',//请求类型
                url: 'http://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx',//请求地址
                // transformRequest: [data => {//在请求之前对data传参进行格式转换
                //     data = this.$Qs.stringify(data)
                //     return data
                // }],// 此例可去除
                params: {//params传参，以下内容会接在接口地址后面
                    DataType: 2,//返回数据类型为json
                    EBusinessID,//用户ID
                    RequestType: 5002,//请求指令类型
                    RequestData: encodeURIComponent(RequestDataStr),//请求数据
                    DataSign//签名
                },
                // data: {//这里是发送给后台的数据
                //     DataType: 2,//返回数据类型为json
                //     EBusinessID,//用户ID
                //     RequestType: 5002,//请求指令类型
                //     RequestData,//请求数据
                //     DataSign//签名
                // }// 此例可省略
            }).then(res => {
                console.log(res, 'Form Data请求法')
            })
        },

        getAjax1(){
            // 第二种方式：Json字符串
            this.$axios({
                method: 'post',// 请求类型
                url: 'http://192.168.0.222:48910/JobManager/GetJobConfigList',// 请求地址
                headers: {// 设置请求头
                    // 'Content-Type': 'application/json',
                    'auth': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1hZG1pbmlkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwidGlja3MiOiI2MzY4ODYwNzI3MTIxNjMxNDkifQ.JjsX45BkXD1aSsvXqU_EbvxTOQ_88wXF5lEUkY7HtIQ'
                },
                // transformRequest: [function(data) {
                //     data = JSON.stringify(data)
                //     return data
                // }], //此处不需要
                data: {// 传的参数
                    JobAssembly: '',
                    JobClass: '',
                    JobCronExp: '',
                    JobDesc: '',
                    JobMethod: '',
                    JobName: '',
                    PageIndex: 1,
                    PageSize: 20
                }
            }).then(res => {
                console.log(res, 'Json字符串请求法')
            })
        }
    },
    mounted() {
        this.content = this.$route.params.content
    },
}
</script>
