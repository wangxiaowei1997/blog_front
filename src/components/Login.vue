<template xmlns:el-col="http://www.w3.org/1999/html">
  <div>
    <div class="outer_label">
      <img class="inner_label login_logo" src="../assets/logo.png">
    </div>
    <div class="login_form">
      <el-input  prefix-icon="el-icon-user" type="text" class="cc" placeholder="用户名" v-model="userName"></el-input><br>
      <el-input  prefix-icon="el-icon-key" type="text" class="cc" placeholder="密码" v-model="password"></el-input><br>
      <!--<button class="login_btn el-button el-button&#45;&#45;primary is-round" type="primary" round>登录</button>-->
      <el-button class="login_btn" @click.native="login" type="primary" round :loading="isBtnLoading">登录</el-button>
      <div style="margin-top: 10px">
        <el-col :span="9" offset="3"><span style="float: right;color: #000099;" @click="login">司机账号登陆</span></el-col>
        <el-col :span="9" offset="3"><span style="float: left;color: #A9A9AB">忘记密码？</span></el-col>
      </div>
    </div>
  </div>
</template>

<script>
//  import { userLogin } from '../../api/api';

export default {
  data () {
    return {
      userName: '',
      password: '',
      isBtnLoading: false
    }
  },
  created () {
    if (JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).userName) {
      this.userName = JSON.parse(localStorage.getItem('user')).userName
      this.password = JSON.parse(localStorage.getItem('user')).password
    }
  },
  computed: {
    btnText () {
      if (this.isBtnLoading) return '登录中...'
      return '登录'
    }
  },
  methods: {
    login () {
      if (!this.userName) {
        this.$message.error('请输入用户名')
        return
      }
      if (!this.password) {
        this.$message.error('请输入密码')
      }
      let data = {'username':this.userName,'password':this.password}
      // this.$http.post('/centos/login',data).then((res)=>{console.log(res)
      //    let data = res.data;
      //    if(data.code ==='200'){
      //      console.log('卢本伟牛逼')
      //      let token = data.data.Token
      //      this.$store.commit("changeLogin",{Authorization:token})
      //      console.log(this.$store.state)
      //      this.$router.push('/main')
      //
      //
      //    }
      // })

      this.$axios.post('/centos/login'
        ,data
        ,{headers:{
           // 'Token':this.$store.state.Authorization,
          'Content-Type':'application/json'
        }}
        )
        .then((res)=>{
         console.log(res.data)
         let data = res.data;
         if(data.code ==='200'){
           console.log('卢本伟牛逼')
           let token = data.data.Token
           this.$store.commit("changeLogin",{Authorization:token})
           console.log(this.$store.state)
            this.$router.push('/main')

         }
      })
    }
  }
}
</script>
<style>
  .login_form {
    padding-top: 5%;
    padding-left: 10%;
    padding-right: 10%;
  }

  .qxs-ic_user {
    background: url("../assets/login/ic_user.png") no-repeat;
    background-size: 13px 15px;
    background-position: 3%;
  }

  .qxs-ic_password {
    background: url("../assets/login/ic_user.png") no-repeat;
    background-size: 13px 15px;
    background-position: 3%;
    margin-bottom: 20px;
  }

  .login_logo {
    height: 100%;
  }

  .login_btn {
    margin: 20px;
    margin-left: 5%;
    width: 20%;
    font-size: 16px;
    background: -webkit-linear-gradient(left, #000099, rgba(33, 84, 250, 0)); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #000099, #2154FA); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #000099, #2154FA); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, rgba(65, 179, 250, 0.6), rgb(69, 44, 250)); /* 标准的语法 */
    filter: brightness(1.4);
  }
</style>
