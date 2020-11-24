<template>
    <div id="pcontent">
       <!-- {{msg}} -->
        <router-link to="home">
            <div class="back">
                    <p>返回</p>
                </div>
        </router-link>
        <div class="p_content">		
            <div class="p_info">				
                <img :src="cartlist.url"/>				
                <h2>{{cartlist.name}}</h2>				
                <p class="price"><span>{{cartlist.price}}</span>/份</p>
            </div>
            <div class="p_detial">
                <h3>
                    商品详情					
                </h3>
               
                <div class="p_content"> 
                    <p>
                        {{cartlist.desc}}
                    </p>
                </div>
            </div>
        </div>

        <div class="pfooter">
                
            <div class="cart">				
                <strong>数量:</strong>
                <div class="cart_num">
                <div class="input_left" @click="subtraction">-</div>
                <div class="input_center">
                    <input type="text" v-model="nums"  readonly="readonly" value="1" name="num" id="num" />
                </div>
                <div class="input_right" @click="addition">+</div>				      
                </div>								
            
            </div>
            <Button  class="addcart" @click.stop="addCart">加入购物车</Button>
            <!-- <button>加入购物车</button>			 -->
        </div>

         <!-- <Masking></Masking> -->
    </div>
   
</template>

<script>
    import axios from 'axios'
    export default {
        name:'pcontent',
        data(){
            return{
                msg:"开始组件挂载",
             
                uid:'',
                cartlist:[],
                storelist:[],
                num:1,
                flag:true
            }
        },
        watch:{
            // people(){
            //     const val = tihs.$store.state.people
            //     deep:true
            // }
        },
        computed:{
            nums(){
                console.log(this.num,"变化")
                return this.num
            }
        },
        created(){
            let val = this.$route.query
            let name = this.$store.state.menuName
            console.log(val,"这是创建后就执行了")
            console.log(name,"这是创建后就执行了")
        },
        mounted(){
            let val = this.$route.query
            if(val?.aid){
                let { aid , uid } = this.$route.query;
                this.downLoadContent(aid ,uid)
            }else{
                let name = this.$store.state.menuName
                this.downLoad(name)
            }
        },
        methods:{
            downLoad( name){
                axios.get("/api/menu.json").then(res =>{

                    if(res.data){
                     
                        let menu  = res.data.body.menulist;
                            console.log(menu.length,"获取到了")
                        for(var i = 0; i< menu.length;i++ ){
                               const list = menu[i].list
                               
                            //    console.log(list.list,name,"所有的名字")
                            for (let j = 0; j < list.length; j++) {
                                const val = list[j];
                                // console.log(val.name,name,"最后的值")
                                if(val.name == name){
                                    this.cartlist = val
                                }
                            }
                        }
                      
                    }
                   
                }).catch( err =>{
                    console.log(err)
                })
            },
            downLoadContent( aid ,uid){
                axios.get("/api/menu.json").then(res =>{

                    if(res.data){
                     
                        let menu  = res.data.body.menulist;
                            console.log(menu.length,"获取到了")
                        for(var i = 0; i< menu.length;i++ ){
                                const list = menu[i]
                                console.log(list,"玄幻对比")
                            if(list.aid==aid){
                                
                                // let menulist = menu[i].list;
                                for(let j =0; j<list.list.length;j++){
                                    let menulist = list.list[j];
                                    if(menulist.uid == uid ){
                                        this.cartlist = menulist
                                        
                                        console.log(this.cartlist,"555555")
                                    }
                                }

                            } 
                        }
                      
                    }
                   
                }).catch( err =>{
                    console.log(err)
                })
            },
            subtraction(){
                if(this.num>1){
                    this.num-=1
                }else{
                    this.num =1
                }
               
            },
            addition(){
              this.num +=1;
            },
            /*
                加入购物车
            */
           addCart(){
              
               //桌子号 二维码获取 暂定值
                console.log(this.cartlist)
                let table = this.$store.state.table
                if(table==""){
                    alert("你还没有填桌号")
                    this.$router.push({name:"Start"})
                }else{
                    let that = this;
                    let total ={
                                uid:this.cartlist.uid,
                                name:this.cartlist.name,
                                price:this.cartlist.price,
                                url:this.cartlist.url,
                                num:this.num
                                }

                    this.$store.commit('menulocal',total)
                
                
                    setTimeout(function(){
                
                        that.$router.push({name:'Home'})
                    },1000)
                }
                
               
               
           }
        }
    }
</script>

<style lang="scss" scoped>
#pcontent{
    width: 100vw;
    height: 100vh;
    .back{
    
    
        height: 3.8rem;
        line-height: 3.8rem;
        width: 3.8rem;
        
        border-radius: 50%;
        
        
        background: #000;
        
        
        position: fixed;
        
        
        top: .5rem;
        
        left: .5rem;
        
        color: #fff;

        p{
            font-size: 1rem;
        }
        
        
        &:before{
            
            
            content: "";
            
            display: block;
            
            width: .8rem;
            height: .8rem;
            
            border-left: .2rem solid #fff;
            border-bottom: .2rem solid #fff;
            
            float: left;
            
            position: relative;
            
            top:1.3rem;
            
            left:.6rem;
            
            transform: rotate(45deg);
            
            margin-right: .4rem;
    
        }
    }

    .p_content{
        
        .p_info{
            background: #fff;      
            img{
                width: 100%;
                
                height: 18rem;
            } 
            
            h2{
                padding: .2rem .5rem;
            } 
            
            .price{
                
                padding: .2rem .5rem;
                
                color: red;
            }
        }
        
        .p_detial{
                
                
            background: #fff;
            
            margin-top: 1rem;
            margin-bottom:4rem;
            h3{
                padding: .5rem;
            }
            
            .p_content{
                padding: 1rem;
                
                
                img{
                    max-width: 100%;
                    
                    display: block;
                    
                    margin: 0 auto;
                }
                
                *{
                    
                    line-height: 1.5;
                    
                    color: #666;
                }
            }
        }
        
        
    }



/*底部*/

.pfooter{
    
  
    position: fixed;  
    
    bottom: 0px;  
    height: 4.4rem;  
    line-height: 4.4rem;
    
    background: #fff;
    
    left: 0px;
    
    width: 100%;
    
    border-top: 1px solid #eee;
    
    .cart{
        
        float: left;
        
            
        display:flex;   
        
        strong{
            
            flex: 1;
            
            font-size: 1.6rem;
            
            padding: 0rem .5rem;
        }
        
        .cart_num{
            
            width: 10rem;      
            
            display: flex;
            margin-top: .8rem;
            
            
            .input_left,.input_right{
                flex: 1;
                
                width: 2.8rem;
                height: 2.8rem;
                
                line-height: 2.8rem;
                
                text-align: center;
                
                color: red;
                
                border: 1px solid #eee;
                
                font-size: 2.4rem;
            }    
            
            .input_center{
                
                flex: 1;
                
                input{
                    
                    width: 2rem;
                    text-align: center;
                        width: 100%;
                        height: 2.8rem; 
                        border: none;
                        
                        border-top: 1px solid #eee;
                        
                        border-bottom: 1px solid #eee;
                
                        float: left;
                }
            }
        }
      
  }
  
  .addcart{
      
        float: right;
      
        background: #2196f3;
        color: #fff;
        height: 3rem;
        line-height: 3rem;
        border: none;
        padding: 0 .5rem;
        border-radius: .5rem;
        margin-top: .8rem;
        margin-right: .5rem;
  }
    
}

}
</style>