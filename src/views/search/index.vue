<template>
    <div class="search-container">
      <!-- 搜索栏 -->
        <form class="search-form" action="/">
          <van-search
            v-model="searchText"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            background="#3296fa"
            @cancel="onCancel"
            @focus="isResultShow=false"
          />
        </form>
      <!-- 搜索栏 -->

       <!-- 所搜结果 -->
      <search-result v-if="isResultShow" :search-text="searchText"></search-result>
      <!-- 所搜结果 -->

       <!-- 所搜联想建议 -->
      <search-suggestion v-else-if="searchText"
      :search-text="searchText" @search="onSearch"></search-suggestion>
      <!-- 所搜联想建议 -->

      <!-- 所搜历史 -->
      <search-history v-else :search-histories="searchHistories" @clear-seach-history="searchHistories=[]" @search="onSearch"></search-history>
      <!-- 所搜历史 -->

    </div>
</template>

<script>
import SearchHistory from './components/searchhistory.vue'
import SearchSuggestion from './components/searchsuggestion.vue'
import searchResult from './components/searchresult.vue'
import { setItem, getItem } from '@/utils/storage.js'
// import getSearchHistories from '@/api/search.js'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    searchResult
  },
  props: {},
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistories: getItem('TOUTIAO_Histories') || []

    }
  },
  watch: {
    searchHistories (val) {
      setItem('TOUTIAO_Histories', val)
    }
  },
  async created () {
    // console.log(111)
    // const { data } = await getSearchHistories()
    // console.log(data)
    // console.log(222)
    // this.searchHistories = data.data.keywords
  },
  methods: {
    onSearch (val) {
      // Toast(val)
      this.searchText = val
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      this.isResultShow = true
    },
    onCancel () {
      // Toast('取消')
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
  .search-container {
    padding-top: 108px;
    .van-search__action {
      color: #fff;
    }
    .search-form {
      position: fixed;
      z-index: 1;
      top: 0;
      left: 0;
      right: 0;
    }
  }
</style>
