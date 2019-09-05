<template>
  <div id="main">
    <h2>Ele</h2>

    <div class="line"></div>
    <!--导航栏-->
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item>
        <a href="http://127.0.0.1:8091">
          <img src="//cdn2.jianshu.io/assets/web/nav-logo-4c7bbafe27adc892f3046e6978459bac.png" alt="Nav logo" height="56" width="100">
        </a>
      </el-menu-item>
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
    </el-menu>
    <!--表格-->
    <div v-for="(content) in msg1" :key="content.articleNo">
      <el-row>
        <hr style="height:1px;border:none;border-top:1px solid #555555;"/>
      </el-row>
      <el-row type="flex">
        <el-col :span="6" :offset="6">
          <div class="content" style="text-align: left">
            <a class="title" @click="goToDetailPage(content.articleNo)" >
              <b style="cursor: pointer">{{content.title}}</b>
            </a>
            <P class="description">
              {{content.description}}
            </P>
          </div>
        </el-col>
        <el-col :span="3">
          <img class="img-blur-done"
               :src = 'content.imgUrl'
               alt="120" height="98" width="148"
               style="vertical-align: middle"/>
        </el-col>
      </el-row>
      <el-row>
        <hr style="height:1px;border:none;border-top:1px solid rgba(85,19,57,0.85);"/>
      </el-row>
    </div>

  </div>

</template>

<script type="text/javascript">
export default {
  data () {
    return {
      msg1: [
        {
          title: '你最喜欢的食物是什么',
          description: '小时候最期待的早饭，就是蛋炒饭。可是当时家里条件不宽裕',
          imgUrl: 'https://upload-images.jianshu.io/upload_images/14108690-c128e0df84c4d7e7?imageMogr2/auto-orient/strip|imageView2/1/w/360/h/240',
          articleNo: 'sn5400'
        },
        {
          title: '你最喜欢的女同学是谁',
          description: '小时候，',
          imgUrl: 'http://imgsrc.baidu.com/forum/w%3D580/sign=dde5e450482309f7e76fad1a420c0c39/e82b4c24ab18972b46a8f10ee8cd7b899f510a25.jpg',
          articleNo: 'SN777901'
        }
      ]
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    getList () {
      this.$axios.get('/centos/book/list'
        , {headers: {
          'Token': this.$store.state.Authorization
        }}
      )
        .then((res) => {
          console.log(res.data)
          this.tableData = res.data
        })
    },
    dialogCreate (data) {
      this.dialogFormVisible = true
      console.log(data)
      this.form.book_id = data.book_id
      this.form.book_name = data.book_name
      this.form.book_price = data.book_price
      this.form.date = data.date
    },
    editTableListDetails (form) {
      this.dialogFormVisible = false
      console.log(form)
      let data = {
        book_id: form.book_id,
        book_name: form.book_name,
        book_price: form.book_price,
        date: form.date
      }

      this.$axios.post('/centos/book/update'
        , {
          headers: {
            'Token': this.$store.state.Authorization,
            'Content-Type': 'application/json'
          }
        }, data
      ).then((res) => {
        console.log(res.data)
      })
    },

    goToDetailPage (no) {
      this.$router.push({name: 'Detail', params: {articleNo: no}})
    }

  },
  created () {
    // this.getList()
  }
}
</script>

<style scoped>
/*h1{*/
  /*max-font-size: 11;*/
/*}*/
  .title:hover{
    text-decoration: underline;
  }
</style>
