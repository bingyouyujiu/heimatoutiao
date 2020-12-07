<template>
  <div class="user-profile">
      <!-- 头部导航栏 -->
      <van-nav-bar title="个人信息" class="page-nav-bar"   left-arrow @click-left="$router.back()"></van-nav-bar>
      <!-- 头部导航栏 -->

      <input type="file" hidden ref="file" @change="onFileChange">
      <!-- 个人信息 -->
      <van-cell title="头像" is-link center class="photo-cell" @click="$refs.file.click()">
        <van-image
          class="avatar"
          fit="cover"
          round
          :src="user.photo"
        />
      </van-cell>
      <van-cell title="昵称" :value="user.name" is-link @click="isUpdateNameShow=true"></van-cell>
      <van-cell title="性别" :value="user.gender===0?'男':'女'" is-link @click="isUpdateGenderShow=true"></van-cell>
      <van-cell title="生日" :value="user.birthday" is-link @click="isUpdateBirthdayShow=true"></van-cell>
      <!-- 个人信息 -->

      <!-- 编辑昵称弹出层 -->
      <van-popup  :style="{ height: '100%' }" position="bottom" v-model="isUpdateNameShow">
        <update-name @close="isUpdateNameShow=false" v-if="isUpdateNameShow" v-model="user.name"></update-name>
      </van-popup>
      <!-- 编辑昵称弹出层 -->

      <!-- 修改性别弹出层 -->
      <van-popup  position="bottom" v-model="isUpdateGenderShow">
        <update-gender @close="isUpdateGenderShow=false" v-if="isUpdateGenderShow" v-model="user.gender" ></update-gender>
      </van-popup>
      <!-- 修改性别弹出层 -->

      <!-- 修改生日弹出层 -->
      <van-popup  position="bottom" v-model="isUpdateBirthdayShow">
        <update-birthday @close="isUpdateBirthdayShow=false" v-if="isUpdateBirthdayShow" v-model="user.birthday"></update-birthday>
      </van-popup>
      <!-- 修改生日弹出层 -->

      <!-- 修改生日弹出层 -->
      <van-popup :style="{ height: '100%' }" position="bottom" v-model="isUpdatePhotoShow">
       <update-photo @close="isUpdatePhotoShow=false" v-if="isUpdatePhotoShow" @update-photo="user.photo=$event" :img="img"></update-photo>
      </van-popup>
      <!-- 修改生日弹出层 -->
  </div>
</template>

<script>
import UpdateName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'
import UpdatePhoto from './components/update-photo.vue'
import { getUserProfile } from '@/api/user.js'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  props: {

  },
  data () {
    return {
      user: {},
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null
    }
  },
  mounted () {

  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
        // console.log(data)
      } catch (error) {
        // console.log(error)
        this.$toast.fail('获取个人信息失败，请稍后重试')
      }
    },
    onFileChange () {
      const file = this.$refs.file.files[0]
      this.img = window.URL.createObjectURL(file)
      this.isUpdatePhotoShow = true
      this.$refs.file.value = ''
    }
  }
}
</script>

<style lang="less" scoped>
  .user-profile {
    .avatar {
      width: 60px;
      height: 60px;
    }

    .van-popup {
      background-color: #f5f7f9;
    }
  }
</style>
