<template>
    <div class="login-container">
        <!-- 导航栏 -->
        <van-nav-bar class="page-nav-bar" title="登录">
          <van-icon name="cross" slot="left" @click="$router.back()" />
        </van-nav-bar>

        <!-- 登录表单 -->
        <van-form @submit="onSubmit" ref="loginFormRef">
          <van-field v-model="user.mobile" name="mobile" type="number"  maxlength="11" left-icon="smile-o" placeholder="请输入手机号" :rules="userFormRules.mobile"><i slot="left-icon" class="iconfont iconshouji"></i></van-field>
          <van-field v-model="user.code" name="code" type="number" maxlength="6" left-icon="smile-o"  placeholder="请输入验证码" :rules="userFormRules.code"><i slot="left-icon" class="iconfont iconyanzhengma"></i>
            <template #button>
              <van-count-down :time="1000*60" format="ss s" v-if="isCountDownShow" @finish="isCountDownShow=false"></van-count-down>
              <van-button size="small" class="send-sms-btn" round type="default" @click.stop.prevent="onSendSms" v-else native-type="button">发送验证码</van-button>
            </template>
          </van-field>
          <div class="login-btn-wrap">
            <van-button  block type="info" class="login-btn" native-type="submit">登录</van-button>
          </div>
        </van-form>
    </div>
</template>

<script>
import { login, sendSms } from '@/api/user'

export default {
  name: 'LoginIndex',
  components: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3|5|7|9]\d{9}$/, message: '请填写正确的手机号' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '请填写正确的验证码' }
        ]
      },
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit () {
      // 获取表单数据
      const user = this.user
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      // 发起请求
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')

        this.$router.back()
        // console.log(res)
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    },
    async onSendSms () {
      try {
        await this.$refs.loginFormRef.validate('mobile')
      } catch (err) {
        return this.$toast.fail('请输入正确的手机号')
      }
      // 验证通过，显示倒计时
      this.isCountDownShow = true
      await sendSms(this.user.mobile)
    }
  }
}
</script>

<style lang="less" scoped>
  .login-container {
    .iconfont {
      font-size: 37px;
    }
    .send-sms-btn {
      width: 152px;
      height: 46px;
      line-height: 46px;
      background-color: #ededed;
      font-size: 22px;
      color:#666
    }
    .login-btn-wrap{
      padding: 53px 33px;
      .login-btn{
        background-color: #6db4fb;
        border: none;
      }
    }
  }

</style>
