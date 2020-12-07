<template>
<div class="update-photo">
  <img :src="img" class="img" alt="" ref="img">

    <div class="toolbar">
        <div class="cancel" @click="$emit('close')">取消</div>
        <div class="confirm" @click="onConfirm">完成</div>
    </div>
</div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user.js'

export default {
  name: 'UpdatePhoto',
  components: {

  },
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false
    })
    // console.log(cropper)
  },
  created () {

  },
  methods: {
    onConfirm () {
    //   console.log(this.cropper.getData())
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        this.cropper.getCroppedCanvas().toBlob(async (blob) => {
          const formData = new FormData()
          formData.append('photo', blob)
          const { data } = await updateUserPhoto(formData)
          this.$emit('close')
          this.$emit('update-photo', data.data.photo)
          this.$toast.success('更新成功')
        })
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.update-photo {
    background-color: #000;
    height: 100%;
    .toolbar {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;

        .cancel, .confirm {
            width: 90px;
            height: 90px;
            font-size: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
        }
    }
}
.img {
    max-width: 100%;
}
</style>
