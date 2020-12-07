<template>
    <div class="article-list">
        <van-pull-refresh v-model="isreFreshLoading" @refresh="onRefresh" :success-text="refreshSuccessText">
            <van-list v-model="loading" :error.sync="error" error-text="请求失败，点击重新加载" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <article-item v-for="(article, index) in list" :key="index" :article="article" />
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item/index.vue'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isreFreshLoading: false,
      refreshSuccessText: '刷新成功了哟'
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })

        // if (Math.random() > 0.8) {
        //   JSON.parse('dofjadjfkasjdkfjalsdj')
        // }

        const result = data.data.results
        this.list.push(...result)
        this.loading = false

        if (result.length) {
          this.timestamp = data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
        this.$toast('请求失败')
      }
    },
    async onRefresh () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        const { results } = data.data
        this.list.unshift(...results)
        this.isreFreshLoading = false
        this.refreshSuccessText = `刷新成功了，一共刷新了${results.length}条数据`
      } catch (err) {
        this.isreFreshLoading = false
        this.refreshSuccessText = '刷新失败'
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .article-list {
    height: 79vh;
    overflow-y: auto;
  }
</style>
