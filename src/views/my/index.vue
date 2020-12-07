<template>
    <div class="my-container">

        <!-- 已登录页面布局 -->
        <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image
            class="avatar"
            :src="userInfo.photo"
            round
            fit="cover"
          />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button size="mini" round to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>

        <!-- 已登录页面布局 -->

        <!-- 未登录头部区域 -->
        <div class="header not-login" v-else>
          <div class="login-btn" @click="$router.push('/login')">
            <img class="mobile-img" src="~@/assets/mobile.png" alt="">
            <span class="text">登录 / 注册</span>
          </div>
        </div>
        <!-- 未登录头部区域 -->

        <!-- 导航区域 -->
        <van-grid class="grid-nav" :column-num="2" clickable>
          <van-grid-item class="grid-item">
            <i slot="icon" class="iconfont iconshoucang"></i>
            <span slot="text" class="text">收藏</span>
          </van-grid-item>
          <van-grid-item class="grid-item">
            <i slot="icon" class="iconfont iconshoucang"></i>
            <span slot="text" class="text">收藏</span>
          </van-grid-item>
        </van-grid>
        <!-- 导航区域 -->

        <van-cell title="消息通知" is-link />
        <van-cell class="mb-9" title="小智同学" is-link />
        <van-cell v-if="user" class="logout-cell" title="退出登录" clickable @click="onLogout" />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'

export default {
  name: 'MyIndex',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    onLogout () {
      this.$dialog.confirm({
        title: '退出登录',
        message: '确认退出登录？'
      })
        .then(() => {
          // on confirm
          // 清除vuex的user
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取数据失败请稍后重试')
      }
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
  .my-container {
    .header {
      height: 361px;
      background: url("~@/assets/banner.png");
      background-size: cover;
    }
    .not-login {
      display: flex;
      justify-content: center;
      align-items: center;
      .login-btn {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .mobile-img {
          width: 132px;
          height: 132px;
          margin-bottom: 15px;
        }
        .text {
          font-size: 28px;
          color: #fff;
        }
      }
    }
    .user-info {
       .base-info {
    height: 231px;
    padding: 76px 32px 23px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .avatar {
        width: 132px;
        height: 132px;
        border: 4px solid #fff;
        margin-right: 23px;
      }
      .name {
        font-size: 30px;
        color: #fff;
      }
    }
  }
  .data-stats {
    display: flex;
    .data-item {
      height: 130px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      .count {
        font-size: 36px;
      }
      .text {
        font-size: 23px;
      }
    }
  }

    }
    .grid-nav {
      .grid-item {
        height: 141px;
        i.iconfont {
          font-size: 45px;
        }
        .iconshoucang {
          color: #eb5253;
        }
        .iconlishi {
          color: #ff9d1d;
        }
        span.text {
          font-size: 28px;
        }
      }
    }
    .logout-cell {
    text-align: center;
    color: #d86262;
    border:1px solid #ff9d1d;
    }
    .mb-9 {
    margin-bottom: 9px;
    }

  }

</style>
