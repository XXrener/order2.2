<template>
    <div class="message">
        你好
        <ul>
            <!-- <PostListItem v-for="post in posts"
                :key="post.id"
                :post="post"
                @vote="handleVote(post.id)"></PostListItem> -->
               <!--  <li v-for=" item in posts" :key="item.id">
                    {{item.title}}
                </li> -->
                <!-- 监听自定义事件 -->
                <button @click="tiop">
                    消息提示
                </button>
                <PostListItem v-if="showTip" :post="mess" @vote="handleVote"></PostListItem>
        </ul>
    </div>    
</template>
<script>
import PostListItem from './mess.vue'
export default {
    name:"message",
    components:{
        PostListItem
    },
    data(){
        return{
            date:"2020",
            posts:[
                {id:1,title:"《Servlet/JSP深入详解》怎么样",author:"张三",date:"2019-10-21 20:10:15",vote:0},
                {id:2,title:"《vc++深入详解》观后感",author:"李四",date:"2019-11-11 15:22:03",vote:0},
                {id:3,title:"《vuejs无难事》观后感",author:"王五",date:"2019-10-10 15:22:03",vote:0}
            ],
            mess:{},
            showTip:false
        }
    },
    methods:{
        handleVote(){
            let val = {
                title:'尊贵的用户',
                tip:'你点击按钮喔'
            }
            this.mess = val;
            let that = this
            setTimeout(function(){
                that.showTip = false
            },3000)
            console.log(this.mess,"你添加了什么")
        },
        tiop(){
            this.showTip=true
            this.handleVote();
        }
    }
}
</script>

<style lang="scss">
    .message{
        button{
            margin-top: 300px;
        }
    }
</style>