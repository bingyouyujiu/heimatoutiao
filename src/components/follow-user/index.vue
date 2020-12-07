<template>
        <van-button  class="follow-btn" v-if="isFollowed" round size="small" @click="onFollow" :loading="loading">已关注</van-button>
        <van-button  class="follow-btn" v-else type="info" color="#3296fa" round size="small" icon="plus" @click="onFollow" :loading="loading">关注</van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user.js'
export default {
  name: 'FollowUser',
  components: {

  },
  model: {
    prop: 'isFollowed',
    event: 'update-is_followed'
  },
  props: {
    //   isFollowed
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
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
    async onFollow () {
      this.loading = true
      try {
        if (this.isFollowed) {
          // 已关注，取消关注
          await deleteFollow(this.userId)
        } else {
          // 未关注，添加关注
          await addFollow(this.userId)
        }
        this.$emit('update-is_followed', !this.isFollowed) //, !this.isFollowed
      } catch (error) {
        console.log(error)
        let message = '操作失败，请稍后重试'
        if (error.response && error.response.status === 400) {
          message = '你不能关注你自己'
        }
        this.$toast(message)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>

</style>
