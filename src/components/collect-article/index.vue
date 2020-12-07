<template>
  <van-button :icon="value ? 'star' : 'star-o'" :class="{ collected: value }" :loading="loading" @click="onCollect" />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article.js'
export default {
  name: 'CollectArticle',
  components: {

  },
  props: {
    value: {
      type: Boolean,
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
        if (this.value) {
        // 已关注，取消关注
          await deleteCollect(this.articleId)
        } else {
        // 未关注，添加关注
          await addCollect(this.articleId)
        }

        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (error) {
        console.log(error)
        this.$toast.fail('操作失败，请重试')
      }

      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
 .collected {
   .van-icon {
      color: #ffa500 !important;
   }
 }
</style>
