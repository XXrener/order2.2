<template>
	<div class="home" id="home">
			<header>
					<div class="home-title">菜鸟点餐系统</div>
					<div class="search">
						<input type="text"
							ref="search"
							v-model="resValue"
							@enter="changeSearch"
							@input="changeInput"
							@focus="showlist=true"
							@blur="changeblur"
							>
							<!--  -->
						<Button type="primary" @click="changeButton">
							<Icon type="md-search" />
						</Button>
						
					</div>
					<div class="header-list" v-if="showlist">
						<li ref="list" 
						v-for=" (item,index) in resVal"  :key="item.id"
						@click="changeAbout(index)">{{item}}====={{index}}
						<!-- <input type="text" readonresVally v-html="item"> -->
						</li>
					</div>
			</header>
			<main>
				<div class="home-cart">							
					<div class="home-cart-list" v-for=" item in listData" :key="item.id">
							<h3 ref="title">{{item.title}}</h3>
						<div class="home-cart-dis">
							<div class="home-cart-list-name" v-for=" food in item.list" :key="food.id">
									<div class="home-cart-list-about">
										<router-link :to="{name:'About',query:{aid:food.aid,uid:food.uid }}">
										<img :src="food.url" alt="">
										<p>{{food.name}}</p>
										<p>{{food.price}}</p>
										</router-link>
									</div>
								
							</div>
						</div>
					</div>

				</div>
			</main>
			<footer>
				<div class="bottomMenu">
					<Button type="primary" 
					:loading="btnloading1" 
					icon="md-list-box"
					@click="listMenu"
					>列表</Button>
					<Button type="primary" :loading="btnloading2" icon="md-home" to="/Home" disabled>主页</Button>
					<Button type="primary" :loading="btnloading2" icon="md-cart" to="/Cart">购物车</Button>
				</div>
				<div class="navigate" :class="[listShow==true?'list-show':null]" v-if="navigate">
					<ul>
						<li v-for=" (item,index) in listData" :key="item.id"
							@click="subMenu(index)">{{item.title}}</li>
					</ul>
				</div>
			</footer>
			<Mess v-if="showTip" :post="tip" :vote="handleVote"></Mess>
	</div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import smoothscroll from 'smoothscroll-polyfill';
/* eslint-disable */

import axios from 'axios'
export default {
	name: 'Home',
	data(){
		return {
			btnloading1:false,
			btnloading2:false,
			btnloading3:false,
			list:['菜单1','菜单1','菜单1','菜单1','菜单1','菜单1','菜单1','菜单1','菜单1'],
			navigate:false,	//子菜单列表
			listShow:false,	//子菜单类名
			listData:[],		//数据列表
			resValue:'',		//搜索列表
			searchlist:[],	//搜索菜名源
			showlist:false,	//搜索显示框
			showval:[],	//搜索显示的值
			showTip:false,  //消息显示
			tip:{}		//提示内容

		}
	},
	watch:{

	},
	computed:{
		resVal(){
			let val = this.showval.filter(function(item,index){
				return index<= 5
			})
			return val
		}
	},
	methods:{
		handleVote(val){
			
			this.tip=val
			this.showTip = true
			let that = this
			setTimeout(function(){
				that.showTip = false
			},2000)
		},
		handleScroll(e) {
				this.$nextTick(()=>{
					console.log(document.documentElement.scrollTop,"document.documentElement.scrollTop")
					// console.log(document.body.scrollTop,"document.body.scrollTop")
				})
				
		},
		listMenu(e){
			// let that = this;
			this.btnloading1 = true;
			this.navigate = !this.navigate;
			this.listShow = !this.listShow;
		},
		subMenu(index,e){
			
			this.listShow = !this.listShow
			this.navigate = !this.navigate
			this.btnloading1 = false
			/* this.$nextTick(()=>{
				console.log(this.$refs.title[index].offsetTop- document.documentElement.scrollTop)
			}) */
			this.$nextTick(()=>{
				let top=this.$refs.title[index].offsetTop-50-60//50main属性margin-top 60 元素本身高度 
				window.scrollTo({
							top:top,
							behavior:'smooth'
						})
			})
			
       
		},
		changeSearch(){
			console.log("回车 数据改变")
		},
		changeInput(){
			console.log(this.resValue,"input元数据改变了")
			// let that = this;
			let val = this.resValue
			this.showval = this.searchlist.filter(function(item){
				console.log(item,val)
				let i = RegExp(item)
				let v = RegExp(val)
				// console.log(v.test(i)==true,"检查后的对比值")
					return v.test(i)==true
			})
		},
		changefocus(){
			console.log("获取焦点")
		},
		changeblur(){	//失去焦点 触发的事件
			/* let that = this
			setTimeout(function(){
				that.showlist = false
			},500) */
		},
		changeAbout(index){	//搜索内容跳转
		let val = this.$refs.list[index].innerHTML
			// console.log(this.$refs.list[index].innerHTML,"你选了我")
			this.$store.commit('changeName',val)
			this.$router.push({name:'About'})
		},
		changeButton(){ //点击全字符匹配
			console.log(this.resValue,"值")
		
			if(this.resValue==''){
					let val ={
						title:"沙雕",
						tip:'你还没有输入菜名！'
					}
					this.handleVote(val)
			}else{
				let that = this;
				let val = this.searchlist.filter(function(item){
		
					// console.log(item==that.resValue,"按钮事件")
					return item==that.resValue
				})
				// alert("你是哥什么鬼啊 ");
				console.log(val,"你是什么鬼");
				console.log(val.toString()==this.resValue,"你到底是森么啊")
				if(val.toString()==this.resValue){
						// this.$store.commit('menuName',this.resValue)
						// let str = this.$store.state.menuName
						console.log(this.resValue,"你点击了什么")
						// this.$router.push({name:"About"})
				}else{
					alert("菜品准备中，还没上架，敬请期待")
				}
			}
				
		}
	
	},
	mounted(){
		
		window.addEventListener('scroll',this.handleScroll,true),


		axios.get('/api/menu.json').then(res =>{  //获取本地JSON

			if(res.data){
				this.listData = res.data.body.menulist
				for (let i = 0; i < this.listData.length; i++) {
					const s = this.listData[i];
					for (let j = 0; j < s.list.length; j++) {
						const a = s.list[j];
						// console.log(a.name,"获取到菜名")
						this.searchlist.push(a.name)
					}
				}
			}
			// console.log(res.data.body.menulist)
		}).catch(err =>{
			console.log(err,"本地请求出错")
		})
	},
	created(){
		let cal  = this.$store.state.table;
		if(cal==""){
			let val = {
				title:'尊贵的用户',
				tip:'你的桌号意外丢失，请重新选择！'
			}
			this.handleVote(val);
			this.$router.push({name:"Start"})
		}
	}
}
</script>
<style lang="scss">
#home{
	width: 100vw;
	// height: 100%;
	overflow: auto;
	display: flex;
	box-sizing: border-box;
	flex-direction: column;
	// justify-content: space-around;
	header{
		position: fixed;
		top: 0;
		left: 0;
		// flex: 1 0 auto;
		width: 100vw;
		// height: 60px;
		background-color: #0d47a1;
		
		display: flex;
		flex-direction: column;

		.home-title{
			font-size: 20px;
			color: #fff;
			font-weight: 700;
			letter-spacing: 10px;
			text-align: center;
			line-height: 50px;
		}
		.search{
			box-sizing: border-box;
			padding: 15px;
			display: flex;
			justify-content: space-around;
		}
		.header-list{
			position: fixed;
			left:45px;
			top: 97px;
			width: 174px;
				height: 30px;
				background-color: #fff;
			li{
				list-style: none;
				width: 174px;
				height: 30px;
				background-color:#888;
			}
		}
		
	}
	main{
		margin-top: 110px;
		width: 100%;
		// background-color: #2196f3;
		margin-bottom: 50px;

		.home-cart{
			width: 100%;
			.home-cart-list{
				width: 100%;
				h3{
					width: 100%;
					line-height: 60px;
					background-color: cadetblue;
					text-align: center;
					color: #fff;
					letter-spacing: 5px;
				}

				.home-cart-dis{
					width: 100%;
					display: flex;
					justify-content: space-around;
					flex-flow: row wrap;
					&::after{
						content: '';
						flex: 1;
					}
					.home-cart-list-name{
						// flex: 1;
						width: 50%;
						// height: 100px;
						border: crimson 1px solid;
						overflow: hidden;
						box-sizing: border-box;
							padding: 5px;
						.home-cart-list-about{
							
							a{
								img{
									width: 100%;
									height: auto;
								}
								p{
									line-height: 20px;
								}
							}
						}
					}
				}
			}
		}
		
	}
	footer{
		.bottomMenu{
			box-sizing: border-box;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100vw;
			background-color: #1565c0;
			padding: 5px;
			display: flex;
			justify-content: space-around;
		}
		.navigate{
			position: fixed;
			bottom: 40px;
			left: 0;
			width: 150px;
			// height: 200px;
			overflow: hidden;
			// border: 1px solid #000;
			background-color: #fff;
			transition: height .5s linear;
			box-shadow: 5px 0px 20px #555;
			ul{
				padding: 15px;
				list-style: none;
				li{
					margin-top: 10px;
					background-color: #1976d2;
				}
			}
		}
	}
}
</style>
