<template>
  <div class="login_container">

    <!-- 登录主盒子 -->
    <div class="login_box">

      <!-- 头像 -->
      <div class="avatar_box">
        <img src="~assets/img/logo.png" alt="">
      </div>

      <!-- 表单域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">

        <!-- 用户名 -->
        <el-form-item prop="username">
          <!-- 使用el的icon库 -->
          <!-- <el-input  prefix-icon="el-icon-user-solid"></el-input> -->
          <!-- 使用阿里icon -->
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-username"></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" prefix-icon="iconfont icon-lock"></el-input>
        </el-form-item>

        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="loginClick">登录</el-button>
          <el-button type="info" @click="resetClick">重置</el-button>
        </el-form-item>

      </el-form>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      // 登录表单
      loginForm: {
        username: 'admin',
        password: '123456'
      },

      // 表单验证规则
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    }
  },

  methods: {
    // 点击：重置表单
    resetClick() {
      this.$refs.loginFormRef.resetFields()
    },

    // 点击：登录预验证
    loginClick() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) {
          return this.$message.error('请输出入正确的用户名/密码')
        }
        const { data: res } = await this.$http.post('login', this.loginForm)
        // console.log(result);
        if (res.meta.status !== 200) {
          return this.$message.error('登录失败，输出入正确的用户名/密码')
        }
        this.$message.success('登录成功，欢迎！')

        // 1. 将登录成功之后的token，保存到客户端的 sessionStorage 中
        // 1.1 项目中，除了登录之外的其他API接口，必须在登录之后才能访问
        // 1.2 token 只应在当前网站打开期间生效，所以将token 保存到 sessionStorage 中
        window.sessionStorage.setItem('token', res.data.token)
        // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 300px;
  border-radius: 3px;
  background-color: #fff;
}

.avatar_box {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 130px;
  height: 130px;
  padding: 10px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 10px #ddd;
  img {
    width: 100%;
    height: 100%;
    border: 1px solid #eee;
    border-radius: 50%;
    background-color: #eee;
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>