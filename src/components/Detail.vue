<template>
<el-header>
  <a>Bolg详情页</a>
  <p>{{articleNo}} 王</p>
  <p>正文 {{articleDetail.articleText}}</p>
  <p>作者 {{articleDetail.authorName}}</p>
  <p>点赞 {{articleDetail.like}}</p>
  <p>收藏 {{articleDetail.favorite}}</p>

</el-header>
</template>

<script>
export default {
  name: 'Detail',
  articleNo: '',
  data () {
    return {
      articleNo: '',
      articleDetail: {
        articleNo: '',
        authorName: '',
        articleText: '',
        status: '',
        statusName: '',
        like: '',
        favorite: ''
      }
    }
  },

  created () {
    let storeArticleNo = localStorage.getItem('ArticleNo')
    if (this.$route.params.articleNo === undefined) {
      // 如果进入页面是自己刷新,从localStorage中取值
      if (storeArticleNo.length > 0) {
        // 如果localStorage中有值,取它
        this.articleNo = localStorage.getItem('ArticleNo')
        this.getDetail(this.articleNo)
        return
      }
      // 如果localStorage中没有值,回到主页
      this.$router.push({name: 'Main'})
    }

    // 如果页面是从主页进入,从路由参数中取值
    this.articleNo = this.$route.params.articleNo
    console.log(this.articleNo)
    this.$store.commit('changeAnything', {ArticleNo: this.articleNo, key: 'ArticleNo'})
    this.getDetail(this.articleNo)
  },

  methods: {
    getDetail (ArticleNo) {
      let data = new FormData()
      data.append('articleNo', ArticleNo)
      console.log(data)
      this.$axios.post('/centos/article/getArticleDetail'
        , data
      ).then(
        (res) => {
          console.log(res.data)
          this.articleDetail = res.data.data
        }
      )
    }
  }

}
</script>

<style scoped>
</style>
