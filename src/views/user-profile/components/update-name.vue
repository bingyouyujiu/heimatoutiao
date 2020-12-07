<template>
  <div class="update-name">
      <!-- 导航栏 -->
      <van-nav-bar
        title="设置昵称"
        left-text="取消"
        right-text="完成"
        @click-left="$emit('close')"
        @click-right="onComfirm"
        />
      <!-- 导航栏 -->

    <!-- 输入框 -->

    <div class="field-warp">
        <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
        />
    </div>

    <!-- 输入框 -->

  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'
export default {
  name: 'UpdateName',
  components: {

  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  mounted () {

  },
  created () {

  },
  methods: {
    async onComfirm () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        if (!this.localName.length) {
          this.$toast('昵称不能为空')
          return
        }
        await updateUserProfile({
          name: this.localName
        })
        this.$emit('input', this.localName)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (error) {
        // console.log(error)
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
   .field-warp {
       padding: 20px;
   }
</style>
