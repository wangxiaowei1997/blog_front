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
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="book_id"
          label="编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="book_name"
          label="书名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="book_price"
          label="价格">
        </el-table-column>
        <el-table-column
          label="编辑">
          <template slot-scope="scope">
            <el-button type="text" @click="dialogCreate(scope.row)" class="el-icon-edit"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--对话框-->
      <el-dialog title="编辑" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="编号" :label-width="formLabelWidth">
            <el-input v-model="form.book_id" autocomplete="off" readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="书名" :label-width="formLabelWidth">
            <el-input v-model="form.book_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="价格" :label-width="formLabelWidth">
            <el-input v-model="form.book_price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="日期" :label-width="formLabelWidth">
            <el-input v-model="form.date" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editTableListDetails(form)">确 定</el-button>
        </div>
      </el-dialog>

  </div>

</template>

<script type="text/javascript">
export default {
  data() {
    return {
      activeIndex2: '1',
      tableData: [{
        date: '2016-05-02',
        book_name: '《银河帝国》',
        book_price: 56.5,
        book_id:1001
      }],
      dialogFormVisible:false,
      form: {
        date: '',
        book_name: '',
        book_price: 0,
        book_id:0

      },
      formLabelWidth: '120px'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    getList(){
      this.$axios.get('/centos/book/list'
        ,{headers:{
            'Token':this.$store.state.Authorization
          }}
      )
        .then((res)=>{
          console.log(res.data)
          this.tableData = res.data
        })
    },
    dialogCreate(data){
      this.dialogFormVisible = true
      console.log(data)
      this.form.book_id=data.book_id
      this.form.book_name = data.book_name
      this.form.book_price = data.book_price
      this.form.date =data.date
    },
    editTableListDetails(form){
      this.dialogFormVisible = false
      console.log(form)
      let data = {
        book_id:form.book_id,
        book_name:form.book_name,
        book_price:form.book_price,
        date:form.date
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
    }

  },
  created(){
    this.getList()
  }
}
</script>

<style scoped>
/*h1{*/
  /*max-font-size: 11;*/
/*}*/
</style>
