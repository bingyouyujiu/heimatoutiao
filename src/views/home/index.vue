<template>
    <div class="home-container">
        <!-- 导航栏 -->
        <van-nav-bar class="page-nav-bar" fixed>
          <van-button class="search-btn" slot="title" type="info" size="small" round icon="search" to="/search">搜索</van-button>
        </van-nav-bar>
        <!-- 导航栏 -->

        <!-- 频道列表 -->
        <van-tabs class="channel-tabs" swipeable v-model="active" animated>
          <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
            <!-- 文章列表 -->
              <article-list :channel="channel"></article-list>
            <!-- 文章列表 -->
          </van-tab>

          <div slot="nav-right" class="placeholder"></div>
          <div slot="nav-right" class="hamburger-btn" @click="isChennelEditShow=true">
            <i class="iconfont icongengduo"></i>
          </div>
        </van-tabs>
        <!-- 频道列表 -->

        <!-- 编辑频道 -->
        <van-popup v-model="isChennelEditShow" closeable position="bottom" :style="{ height: '100%' }"  close-icon-position="top-left">
          <channel-edit :my-channels="channels" :active="active" @update-active="onUpdateActive"></channel-edit>
        </van-popup>
        <!-- 编辑频道 -->
    </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/Channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage.js'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      channels: [], // 频道列表
      isChennelEditShow: false // 控制频道编辑弹出层的展示状态
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        // this.channels = data.data.channels
        let channels = []

        if (this.user) {
          // 已登录
          const { data } = await getUserChannels()
          channels = data.data.channels
        } else {
          // 未登录
          const loadChannels = getItem('TOUTIAO_CHANNELS')
          if (loadChannels) {
            // 有缓存
            channels = loadChannels
          } else {
            // 没有缓存
            const { data } = await getUserChannels()
            channels = data.data.channels
          }
        }

        this.channels = channels
      } catch (err) {
        this.$toast('获取频道列表失败')
      }
    },
    onUpdateActive (index, isChennelEditShow = true) {
      this.active = index
      this.isChennelEditShow = isChennelEditShow
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
  .home-container {
    padding-top: 174px;
    padding-bottom: 100px;
      /deep/ .van-nav-bar__title {
              max-width: unset;
            }
    .search-btn {
      width: 555px;
      height: 64px;
      background-color: #5babfb;
      border: none;
      font-size: 28px;
      .van-icon {
        font-size: 32px;
      }
    }
    /deep/ .channel-tabs {
      .van-tabs__wrap {
        position: fixed;
        top: 92px;
        z-index: 1;
        left: 0;
        right: 0;
        height: 82px;
      }
      .van-tab {
         min-width: 200px;
        border-right: 1px solid #edeff3;
        font-size: 30px;
        color: #777777;
      }
      .van-tab--active {
        color: #333;
      }
      .van-tabs__nav {
        padding-bottom: 0;
      }
      .van-tabs__line {
        bottom: 8px;
        width: 31px !important;
        height: 6px;
        background-color: #3296fa;
      }
      .hamburger-btn {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        right: 0;
        width: 66px;
        height: 82px;
        background-color: #fff;
        opacity: 0.902;
        i.iconfont {
          font-size: 33px;
        }
        &:before {
          content: "";
          position: absolute;
          left: 0;
          width: 1px;
          height: 100%;
          background-image: url(~@/assets/gradient-gray-line.png);
          background-size: contain;
        }
      }
      .placeholder {
        flex-shrink: 0;
        width: 66px;
        height: 82px;
      }
    }
  }
</style>
