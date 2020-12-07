<template>
    <div class="layout-container">
        <router-view></router-view>

        <!-- 标签导航栏 -->
        <van-tabbar class="layout-tabbar" route>
            <van-tabbar-item to="/">
                <i slot="icon" class="iconfont iconshouye"></i>
                <span class="text">首页</span>
            </van-tabbar-item>
            <van-tabbar-item to="/qa">
                <i slot="icon" class="iconfont iconwenda"></i>
                <span class="text">问答</span>
            </van-tabbar-item>
            <van-tabbar-item to="/video">
                <i slot="icon" class="iconfont iconshipin"></i>
                <span class="text">视频</span>
            </van-tabbar-item>
            <van-tabbar-item to="/my">
                <i slot="icon" class="iconfont iconwode"></i>
                <span class="text" v-if="user">我的</span>
                <span class="text" v-else>未登录</span>
            </van-tabbar-item>
        </van-tabbar>
        <!-- 标签导航栏 -->
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'LayoutIndex',
  components: {},
  props: {},
  data () {
    return {

    }
  },
  created () {},
  methods: {},
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
.layout-container{
    .layout-tabbar{
        i.iconfont{
            font-size: 40px;
        }
        span.text{
            font-size: 20px;
        }
    }
}
</style>
