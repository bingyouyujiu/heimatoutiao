<template>
      <van-button :icon="value===1 ? 'good-job' : 'good-job-o'" :class="{ liked: value===1 }" :loading="loading" @click="onCollect" />
</template>

<script>
import { addLike, deleteLike } from '@/api/article.js'
export default {
  name: 'LikeArticle',
  components: {

  },
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  mounted () {

  },
  created () {

  },
  methods: {
    async onCollect () {
      this.loading = true

      try {
        if (this.value === 1) {
          // 已点赞，取消点赞
          await addLike(this.articleId)
          this.$emit('input', -1)
        } else {
          // 未点赞，添加点赞
          await deleteLike(this.articleId)
          this.$emit('input', 1)
        }
        this.$toast.success(this.value === 1 ? '点赞成功' : '取消点赞')
      } catch (error) {
        this.$toast.fail('操作失败，请重试')
      }

      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
 .liked {
     .van-icon {
        color: #e5645f !important;
     }
}
</style>
