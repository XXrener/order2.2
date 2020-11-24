<template>
  <div id="remarks">
    <header>
      <div class="remarks-title">菜鸟点餐系统</div>
    </header>
    <main>
      <div class="people">
        <h3>请选择用餐人数</h3>
        <div class="remarks-people">
          <Input
            type="text"
            v-model="people"
            placeholder="请输入用餐人数"
            ref="table"
          />
        </div>
      </div>
      <div class="table">
        <h3>请输入桌号</h3>
        <div class="remarks-table">
          <!-- @on-change="changeRemarks" -->
          <!-- @on-enter="changeRemarks" -->
          <!-- v-model="remarks"  -->
          <Input
            type="text"
            v-model="table"
            placeholder="请输入桌号..."
            ref="table"
          />
        </div>
      </div>
      <div class="remarks">
        备注:
        <!-- @on-change="changeRemarks" -->
        <!-- @on-enter="changeRemarks" -->
        <!-- v-model="remarks"  -->
        <Input
          type="textarea"
          :rows="2"
          v-model="remarks"
          placeholder="请选择你的口味..."
          ref="remarks"
        />

        <div class="marked-words">
          <Button
            :class="[selectWord ? 'words' : null]"
            v-for="(item, index) in markedWords"
            :key="item.id"
            @click="changeWords(index)"
            ref="words"
            >{{ item }}</Button
          >
        </div>
      </div>
    </main>
    <footer>
      <Button type="default" to="Cart">取消</Button>
      <Button type="default" @click="queren">确认</Button>
    </footer>
  </div>
</template>

<script>
export default {
  name: "remarks",
  data() {
    return {
      people: "",
      table: "",
      markedWords: ["微辣", "变态辣", "不要香菜", "清淡"],
      remarks: "",
      selectPeople: "", //人数类名
      selectTable: -1, //桌子类名
      selectWord: false, //备注按钮
    };
  },
  methods: {
    changePeople(index) {
      this.selectPeople = index; //类名变更
      let people = this.people[index];
      this.$store.commit("changePeople", people); //人数储存
      console.log(index, "人数");
    },
    changeTable(index) {
      console.log(index, "桌子");
      this.selectTable = index; //类名变更
      let table = this.table[index];
      this.$store.commit("changeTable", table); //桌子储存
      //    console.log()
    },

    beginOrder() {
      // let people = this.$store.state.people;
      console.log(!table == "" && !this.remarks == "", "1111");
      let table = this.$store.state.table;
      if (table == "") {
        alert("你还有没有填桌号!");
        return;
      }
      if (this.remarks == "") {
        alert("你还有备注没填");
        return;
      }
      this.$store.commit("changeRemarks", this.remarks);
      this.$router.push({ name: "Home" });
    },
    changeWords(index) {
      //添加提示词
      let word = this.markedWords[index];
      let tes = this.remarks;

      let str = new RegExp(word);
      let oldTes = new RegExp(tes);

      if (!str.test(oldTes)) {
        //验证重复 将备注添加到 data中
        this.remarks += " " + word;
      }
    },
  },
  mounted() {
    //初始化 人数为1 桌子数为空 备注为空
    this.$store.commit("changePeople", 1);
  },
};
</script>

<style lang="scss">
#remarks {
  width: 100%;
  height: 100%;
  background-color: aqua;
  list-style: none; /*去掉远点*/
  header {
    .remarks-title {
      height: 50px;
      width: 100vw;
      background-color: #1565c0;
      color: #fff;
      font-size: 24px;
      line-height: 50px;
      letter-spacing: 5px;
    }
  }
  main {
    .people,
    .table {
        border: 1px #555 solid;
        margin-top:20px;
      h3 {
        // line-height: 60px;
        color: #fff;
        font-weight: 700;
        font-size: 24px;
        text-align: left;
        background-color: #777;
      }
      .remarks-people,.remarks-table{
          input{
              height: 40px;
              font-size: 24px;
          }
      }
    }
    .remarks {
      text-align: left;
      input {
        width: 150px;
      }
      .marked-words {
        margin: 5px;
        button {
          margin: 0 5px;
          &.words {
            background-color: blue;
            color: #fff;
          }
        }
      }
    }
  }
  footer {
    margin-top: 20px;
  }
}
</style>