<template>
  <div id="order">
    <!-- 下单页面 -->
    <div class="order_content">
      <!-- 头部等待信息 -->
      <div class="order_info">
        <div class="order_top">
          <!-- <img :src="urltimer" alt /> -->

          <div class="order_info_right">
            <h2>{{table}}号桌待门店接单</h2>
            <p>请及时联系服务员确认一点菜品信息!</p>
          </div>
        </div>

        <h3>
          已点菜品28份,合计 :
          <span>{{totalprice}}元</span>
        </h3>
      </div>

      <!-- 菜品详情列表 -->
      <div class="order_list">
        <h3>商品详情</h3>

        <ul>
          <li v-for=" item in orderlist" :key="item.id">
            <div class="title">{{item.name}}</div>
            <div class="num">{{item.num}}份</div>
            <div class="price">{{item.price}}元</div>
          </li>
        </ul>
      </div>
    </div>
   <div class="time">
      {{m}}分{{s}}秒
   </div>
    <div class="gridlist">
      
          <Button type="primary" to="Order" disabled>结账</Button>
      
          <Button type="primary" to="Home">主页</Button>
      
          <Button type="primary" to="Cart" >购物车</Button>
        
  </div>
  </div>
</template>

<script>

export default {
  name: "order",
  data() {
    return {
    //   urltimer: require('../assets/images/timer.png'),
      msg: "开始组件挂载",
      orderlist:this.$store.state.menulocal,
      table:this.$store.state.table,
      ordertime:'',
      settime:'',
      s:1,
      m:1
    };
  },
  computed:{
     totalprice(){
          let total = 0;
        for (let i = 0; i < this.orderlist.length; i++) {
          const list = this.orderlist[i];
            total += list.num*list.price
        }
        return total
      }
  },
  methods:{
     showtime(){
          /*   var nowtime = new Date(),  //获取当前时间
              endtime = new Date("2020/8/8");  //定义结束时间
          var lefttime = endtime.getTime() - nowtime.getTime(),  //距离结束时间的毫秒数
              leftd = Math.floor(lefttime/(1000*60*60*24)),  //计算天数
              lefth = Math.floor(lefttime/(1000*60*60)%24),  //计算小时数
              leftm = Math.floor(lefttime/(1000*60)%60),  //计算分钟数
              lefts = Math.floor(lefttime/1000%60);  //计算秒数
          return this.ordertime =  leftd + "天" + lefth + ":" + leftm + ":" + lefts;  //返回倒计时的字符串 */
          // var m = 1;  //设置分
          // var this.s = 5;    //设置秒
          this.s = this.s-1;
          if(this.s==0){
              this.m = this.m -1;
              this.s = 60
          }
          if(this.m==0){
            // window.location='http://www.ewceo.com';//倒计时结束跳转到www.ewceo.com
          }
            
          if(this.m<0 && this.s==60){   //当时间为0分1秒时，暂停
              clearInterval(this.settime);
              this.$router.push({name:'Home'})
          }
     }
  },
  mounted(){
    let that = this
      this.settime = setInterval (function () {
           that.showtime();
      }, 1000);  //反复执行函数本身
  }
  
};
</script>

<style lang="scss" scoped>
#order{
    /*@charset "utf-8";*/
  width: 100vw;
  height: 100vh;
.order_content{

    margin: .5rem;
    
    /*头部客户信息*/
    .order_info{

        background: #fff;
        border-radius: .5rem;
        padding: .5rem;
        .order_top{

            display: flex;
            // flex-wrap: wrap;
            img{
                
                width: 5rem;
                height: 5rem;
            }

            .order_info_right{
                flex: 1;
                
                
                h2,p{
                    padding-left: .5rem;
                }
                h2{
                    font-size: 2rem;
                    line-height: 3rem;
                }
                p{
                    font-size: 1.5rem;
                }
                
            }
        }

        h3{
            padding: 1rem 0rem .5rem 0rem;

            font-size: 1.6rem;
            text-indent: .5rem;
            
            span{
                color: #ff0000;
                font-size: 2rem;
            }
        }
    }

    /* 菜品详情*/
    .order_list{
        
        margin: .5rem 0rem;

        background: #fff;
        padding: .5rem;
        border-radius: .5rem;

        h3{
            line-height: 3rem;
        }
        ul{
            
            li{
                display: flex;
                padding: .5rem .5rem;

                font-size: 1.5rem;
                .title{
                    flex: 2;
                }
                .num,.price{
                    flex: 1;
                }
            }
        }
    }

    /*菜品详情支付页面*/ 

    .order_pay{

        background: #fff;
        border-radius: .5rem;
        padding: .5rem;

        

        h3{
            line-height: 1.5rem;
            // display: inline;
            text-align: center;
            font-size: .6rem;

        }

        .order_pay_detail{

            display: flex;

            font-size: .4rem;
            line-height: 1rem;

            border-bottom: 1px solid #e2e2e2;

            .desk_num,.people_num,.order_timer{
                flex: 1;
            }

            
        }

        .order_pay_info{

            display: flex;
            margin: .4rem 0rem;
            padding-top: .5rem;

            .price_list{

                flex: 1;
                font-size: .4rem;

                span{
                    color: #ff0000;
                    font-size: .7rem;
                }
            }

            .pay_button{
                
                font-size: .5rem;
                background: #ff0000;
                border-radius: .5rem;

                text-align: center;
                line-height: 1rem;
                width: 3rem;
            }
        }

    }
}
.time{
  margin: 0 auto;
  width: 220px;
  height: 60px;
  background: #555;
  font-size: 30px;
  line-height: 60px;
  color: #fff;
}
.gridlist{
    position: fixed;
    bottom: 0;
    width: 100vw;
    padding: 5px;
    background-color: #1565c0;
    box-sizing: border-box;
    display: flex;
    justify-content:space-around;
    align-items: center;
    
  }
}
</style>