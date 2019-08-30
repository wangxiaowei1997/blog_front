<template>
<el-header>
  <a>Bolg详情页</a>
  <p>{{articleNo}} 王</p>
</el-header>
</template>

<script>
export default {
  name: 'Detail',
  articleNo: '',
  data () {
    return {
      articleNo: ''
    }
  },

  created () {
    let storeArticleNo = localStorage.getItem('ArticleNo')
    if (this.$route.params.articleNo === undefined) {
      // 如果进入页面是自己刷新,从localStorage中取值
      if (storeArticleNo.length > 0) {
        // 如果localStorage中有值,取它
        this.articleNo = localStorage.getItem('ArticleNo')
        return
      }
      // 如果localStorage中没有值,回到主页
      this.$router.push({name: 'Main'})
    }

    // 如果页面是从主页进入,从路由参数中取值
    this.articleNo = this.$route.params.articleNo
    this.$store.commit('changeAnything', {ArticleNo: this.articleNo, key: 'ArticleNo'})
  }
}
</script>

<style scoped>

</style>
