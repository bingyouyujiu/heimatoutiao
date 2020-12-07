<template>
  <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  error-text="加载失败，请重试"
  :error="err"
  :immediate-check="false"
>
  <comment-item v-for="(item,index) in list" :key="index" :comment="item" @reply-click="$emit('reply-click',$event)" />
</van-list>
</template>

<script>
import { getComments } from '@/api/comment.js'
import CommentItem from './comment-item'
export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      err: false
    }
  },
  mounted () {

  },
  created () {
    this.loading = true
    this.onLoad()
  },
  methods: {
    async onLoad () {
      try {
        // console.log(1)
        const { data } = await getComments({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        })
        // console.log(2)
        // console.log(data)
        const { results } = data.data
        this.list.push(...results)
        this.$emit('onload-success', data.data)

        this.loading = false
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (error) {
        // console.log(error)
        this.err = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
