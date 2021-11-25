<template>
  <div class="home">
    home
    <el-button @click="logoutClick" type="info">退出</el-button>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  methods: {
    logoutClick() {
      // 清空token
      window.sessionStorage.clear();
      // 跳转到登录页
      this.$router.push("./login");
    }
  }
};
</script>


