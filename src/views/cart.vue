<template>
  <div id="cart">
    <!-- 购物车 -->
    <div class="cart_content">
      <div class="cart_info clearfix">
        <h2>购物车</h2>

        <div class="p_number">
          <div class="p_number_left">
            <p>
              用餐人数：
              <span>{{people}}人</span>
            </p>
            <p>
              备注：
              <span>{{remarks}}</span>
            </p>
          </div>

          <div class="p_number_right" @click="changeNum">
            <Icon type="md-create" />
            <p>修改</p>
          </div>
        </div>

        <div class="cart_p_num">
          <p>
            你购物车共
            <span>{{totalnum}}</span>个菜
          </p>
          <p>
            合计：
            <span>￥{{totalprice}}</span>
          </p>
        </div>
      </div>

      <div class="cart_list">
        <h2>详情</h2>
        <ul>
          <li class="item" v-for=" item in cartlist" :key="item.id">
            <div class="left_food">
              <img :src="item.url" />
              <div class="food_info">
                <p>{{item.name}}</p>
                <p class="price">￥{{item.price}}</p>
              </div>
            </div>

            <div class="right_cart">
              <div class="cart_num">
                <div class="input_left" @click="subtraction(item.uid)">-</div>
                <div class="input_center">
                 <input type="text" ref="value" readonly="readonly" v-model="item.num" value="" name="num" /> <!-- // v-model="item.num" -->
                </div>
                <div class="input_right" @click="addition(item.uid)">+</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

  
 <div class="gridlist">
      
          <Button type="primary" to="Order">结账</Button>
      
          <Button type="primary" to="Home">主页</Button>
      
          <Button type="primary" to="Cart" disabled>购物车</Button>
        
  </div>
  </div>
</template>

<script>
// 组件
// import BottomMenu from './bottomMenu/NavFooter' 

import axios from 'axios'
export default {
  name: "cart",
  data() {
    return {
      cartlist:this.$store.state.menulocal,//购物车列表
      people:this.$store.state.people,//用餐人数
      remarks:this.$store.state.remarks,//用餐备注
      commonlist:[]

    };
  },
  computed:{
      totalnum(){ //总数量
        let nums = 0;
        for (let i = 0; i < this.cartlist.length; i++) {
          const list = this.cartlist[i];
          console.log(list.num,"数量")
             nums +=list.num
        }
        return nums
      },
      totalprice(){
          let total = 0;
        for (let i = 0; i < this.cartlist.length; i++) {
          const list = this.cartlist[i];
            total += list.num*list.price
        }
        return total
      }
  },
  created(){

  },
  methods:{
    changeURL(index){
        console.log(index)
    },
      changeNum(){
        console.log("2222222222")
        this.$router.push({path:"/Remarks"})
        console.log("2222222222")
      },
      subtraction(uid){
       
        this.$store.commit("submenu",uid)

      },
      addition(uid){
       
        this.$store.commit("addmenu",uid);
    },
  },
  mounted(){
      axios.get('/api/list.json').then(res =>{
        console.log(res.data.list,"有没有")
        this.commonlist = res.data.list
      }).catch(err =>{
        console.log(err,"没有找到菜单")
      })
  }
};
</script>

<style lang="scss">
#cart {
  width: 100vw;
  height: 100vh;
  .cart_content {
    padding: 1rem;

    /*头部信息*/
    .cart_info {
      background: #fff;

      h2 {
        text-align: center;
        // font-size: 1.8rem;
        padding: 0.8rem 0px;
        border-bottom: 1px solid #eee;
      }
      border-radius: 0.5rem;
      padding: 0.5rem;
      .p_number {
        display: flex;

        padding: 0.5rem 0;
        border-bottom: 1px solid #eee;

        .p_number_left {
          flex: 1;

          p {
            line-height: 2;

            &:first-child {
              color: red;
            }
          }
        }

        .p_number_right {
          width: 4rem;
          height: 4rem;
          text-align: center;

          img {
            width: 3rem;
            height: 3rem;
            margin: 0 auto;
          }
        }
      }

      /*购物车总数量*/

      .cart_p_num {
        border-bottom: 1px solid #eee;
        p {
          line-height: 2;

          .price {
            font-size: 2.4rem;
            color: red;
          }
        }
      }
    }
    /*购物车列表*/

    .cart_list {
      margin-top: 1rem;
      background: #fff;
      padding: 0.15rem 5% 0.15rem 5%;
      border-radius: 0.4rem;

      h2 {
        // font-size: .4rem;
        text-align: center;
        line-height: 5rem;
        letter-spacing: 0.2rem;
        border-bottom: 1px solid #e2e2e2;
      }
      ul {
        width: 100%;
        margin-top: 1rem;

        padding: 0.5rem;

        background: #fff;

        border-radius: 0.5rem;

        // display: flex;

        .item {
          // flex: 1;
          display: flex;
          width: 100%;

          border-bottom: 1px solid #eee;

          padding: 1rem 0px;
          .left_food {
            flex: 1;

            display: flex;
            img {
              width: 4rem;
              height: 4rem;
              border-radius: 10%;
              margin-right: 0.8rem;
            }

            .food_info {
              flex: 1;
            }
          }

          .right_cart {
            width: 10rem;
          }
        }
      }
    }
  }

  /*购车加减*/
  .cart_num {
    width: 10rem;

    display: flex;
    margin-top: 0.8rem;

    .input_left,
    .input_right {
      flex: 1;

      width: 2.8rem;
      height: 2.8rem;

      line-height: 2.8rem;

      text-align: center;

      color: red;

      border: 1px solid #eee;

      font-size: 2.4rem;
    }

    .input_center {
      flex: 1;

      input {
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

  /**顾客常点菜系*/
  .hot_good {
    margin-top: 1rem;
    background: #fff;
    padding: 0.15rem 5% 0.15rem 5%;
    border-radius: 0.4rem;
    h2 {
      text-align: center;
      line-height: 5rem;
      letter-spacing: 0.2rem;
      border-bottom: 1px solid #e2e2e2;
    }
    .hot_good_list{
        background: #e2e2e2;
        margin-bottom: 5rem;
    }
  }

  // 底部按钮
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