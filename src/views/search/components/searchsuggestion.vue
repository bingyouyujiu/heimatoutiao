s<template>
  <div class="search-suggestion">
      <van-cell icon="search" v-for="(text,index) in suggestions" :key="index" @click="$emit('search',text)">
        <div slot="title" v-html="highlight(text)"></div>
      </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search.js'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {

  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {
      // handler (value) {
      //   this.loadSearchSuggestions(value)
      // },
      handler: debounce(function (value) {
        // console.log(value)
        this.loadSearchSuggestions(value)
      }, 500),
      immediate: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  mounted () {

  },
  created () {

  },
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
      } catch (error) {
        this.$toast('获取失败 ')
      }
    },
    highlight (text) {
      const str = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, str)
    }
  }
}
</script>

<style lang="less" scoped>
  .search-suggestion {
    /deep/ span.active {
      color: #3296fa;
    }
  }
</style>
