<template>
    <div class="mess" id="mess">
        <h2>{{post.title}}</h2>
        <li>
           {{post.tip}}
        </li>
    </div>
</template>

<script>
    export default {
        name:'mess',
        data(){
            return {
                // post:this.post
            }
        },
        props:{
            post:{
                type:Object
            }
        },
        methods:{
            handleVote(){
                this.$emit("vote")
            }
        },
        mounted(){
            console.log(this.post)
        }
    }
</script>
<style lang="scss">
    #mess{
        width: 100%;
        height: 80px;
        background-color: burlywood;
        position: fixed;
        top: 0;
        left: 0;
        box-shadow:0px 5px 5px #555;
    }
</style>
