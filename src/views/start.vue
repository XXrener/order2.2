<template>
    <div id="start">
        <header>
            <div class="start-title">
                菜鸟点餐系统
            </div>
        </header>
        <main>
            <div class="people">
            <h3>请选择用餐人数</h3>
            <div class="layout">
                <div class="layout-list"  v-for=" (item,index) in people" :key="item.id" @click="changePeople(index)">
                    <span ref="people" :class="[selectPeople==index?'btnColor':null]" >{{item}}</span>
                </div>
            </div>
        </div>
        <div class="table">
            <h3>请选择桌子号</h3>
            <div class="layout" >
                <div class="layout-list"
                :class="[selectTable==index?'tableColor':null]" 
                v-for=" (item,index) in table" :key="item.id" 
                @click="changeTable(index)">
                    <span ref="table">{{item}}</span>
                </div>
            </div>
        </div>
        <div class="remarks">
            <p> 备注:</p>
            <Input
            type="text" 
            v-model="remarks"
            @on-blur="changeBlur"
           
            @on-enter="changeEnter"
            placeholder="请选择你的口味..."           
            ref="remarks"/>
            
            <div class="marked-words" >
                <Button type="default" :class="[selectWord?'words':null]"
                    v-for=" (item,index) in markedWords" :key="item.id"
                    @click="changeWords(index)"
                    ref="words">{{item}}</Button>
            </div>

        </div>
        </main>
        <footer>
            <Button type="primary" @click="beginOrder">点餐</Button>
        </footer>
        <Mess v-if="showTip" :post="messlist" @vote="handleVote"></Mess>
    </div>
</template>

<script>
    export default{
        name:'start',
        data(){
            return {
                people:['1','2','3','4','5','6','7','8','9','10','11','12'],
                table:['1','2','3','4','5','6','7','8','9','10'],
                markedWords:['微辣','变态辣','不要香菜','清淡'],
                remarks:'',         //备注
                forRemarks:[],      //临时备注
                selectPeople:'',  //人数类名
                selectTable:-1,    //桌子类名
                selectWord:false,   //备注按钮
                messlist:{},    //消息提示
                showTip:false   //是否显示
               
            }
        },
        methods:{
            handleVote(){   //消息提示
                let val = {
                    title:"尊贵用户",
                    tip:"你还没用选择桌号"
                }
                this.messlist = val;
                let that = this;
                setTimeout(function(){
                    that.showTip = false
                },2000)
            },
            changePeople(index){
                this.selectPeople = index;    //类名变更
                let people = this.people[index];
                this.$store.commit('changePeople',people); //人数储存
                console.log(index,"人数")
              
            },
            changeTable(index){
                console.log(index,"桌子")
               this.selectTable = index;    //类名变更
               let table = this.table[index];
               this.$store.commit('changeTable',table); //桌子储存
            //    console.log()
            },
            
            beginOrder(){
                    console.log(!table == "" && !this.remarks =="","1111")
                    let table = this.$store.state.table;
                    if(table == ""){
                        this.showTip = true;
                        this.handleVote()
                    }else{
                        this.$store.commit('changeRemarks',this.remarks)
                        this.$router.push({name:'Home'})
                    }
                   
                    
            },
            changeWords(index){ //添加提示词 
                let word = this.markedWords[index];
                let tes = this.remarks  //源数据
                
               
                let str = new RegExp(word)
                let oldTes = new RegExp(tes)

                if(!str.test(oldTes)){  //验证重复 将备注添加到 data中
                    this.remarks +=word+' ';
                    this.forRemarks.push(word);
                    this.$nextTick(()=>{    //获取焦点
                        this.$refs.remarks.focus()
                    })
                }

            
            },
            changeEnter(){
                this.$nextTick(()=>{
                    this.$refs.remarks.blur()
                })
                console.log("回车触发")
                let n = this.remarks.split(" ")
                let s = n.filter(function(item , index , n){ //filter
                    console.log(item,"item")
                    console.log(index,"index")
                    console.log(n,"nnnnnn")
                    return n.indexOf(item,0)===index;
                })
                    this.remarks = s.toString()
                console.log(this.remarks,"分割成什么样子")
            },
            changeBlur(){ //
                    console.log("失去焦点触发")
            } 
        },
        mounted(){//初始化 人数为1 桌子数为空 备注为空
            this.$store.commit('changePeople',1)
        }
    }
</script>

<style lang="scss">
#start{
    width: 100%;
    height: 100%;
    // background-color: aqua;
    list-style: none; /*去掉远点*/
    header{
        .start-title{
            height: 50px;
            width: 100vw;
            background-color: #1565c0;
            color: #fff;
            font-size: 24px;
            line-height: 50px;
            letter-spacing: 5px;
        }
    }
    main{
        .people,.table{
            // border: 1px solid #555;
            margin: 5px;
            h3{
                line-height: 40px;
                font-size: 24px;
                color: #888;
                background-color: #bbdefb;
            }
            .layout{
                display: flex;
                justify-content: space-around;
                flex-flow: row wrap;
                &::after{
                    content: '';
                    flex:  1 0 auto;
                }
                .layout-list{
                    height: 40px;
                    width: 25%;
                    &.tableColor{
                        span{
                            background-color: blue;
                            color: #fff;
                        }        
                    }

                    span{
                        background-color: #f0f0f0;
                        box-sizing: border-box;
                        display: block;
                        margin: 5px;
                        text-align: center;
                        line-height: 30px;
                         font-weight: 600;
                        &.btnColor{
                            background-color: blue;
                            color: #fff;
                           
                        }
                        
                    }
                }

            }
        }
        .remarks{
            p{
                text-align: left;
                font-size: 18;
                font-weight: bold;
                color: red;
            }
            input{
                // width: 150px;
            }
            .marked-words{
                margin: 5px;
                button{
                    margin: 0 5px;
                    &.words{
                        background-color: blue;
                        color: #fff;
                    }
                }
            }
        }
    }
    footer{
        margin-top: 20px;
        button{
            width: 80px;
            height: 50px;
            font-size: 20px;
            letter-spacing: 5px;
        }
    }
    
}
</style>