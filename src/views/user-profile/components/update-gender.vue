<template>
  <div class="update-gender">

     <van-picker
        title="标题"
        show-toolbar
        :default-index="value"
        :columns="columns"
        @change="onChange"
        @confirm="onComfirm"
        @cancel="$emit('close')"
        />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'
export default {
  name: 'UpdateGender',
  components: {

  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      localGender: this.value
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
        await updateUserProfile({
          gender: this.localGender
        })
        this.$emit('input', this.localGender)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (error) {
        // console.log(error)
        this.$toast.fail('更新失败')
      }
    },
    onChange (picker, value, index) {
      this.localGender = index
    }
  }
}
</script>

<style lang="less" scoped>

</style>
