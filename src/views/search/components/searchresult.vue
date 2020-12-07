<template>
  <div class="search-result">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="err" error-text="加载失败，请稍后重试">
        <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
      </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search.js'
export default {
  name: 'searchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  components: {

  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      err: false
    }
  },
  mounted () {

  },
  created () {

  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText
        })
        // if (Math.random() > 0.5) {
        //   JSON.parse('dofjadjfkasjdkfjalsdj')
        // }
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        this.err = true
        this.loading = false
        // this.$toast('获取结果失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
