<template>
  <el-container class="home-container">

    <!-- 头部 -->
    <el-header>
      <div>
        <img src="~assets/img/Liverpool.jpg" alt="">
        <span>电商后管理系统</span>
      </div>
      <el-button @click="logoutClick" type="info" class="logoutBtn">退出</el-button>
    </el-header>

    <el-container>

      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">

        <!-- 点击折叠侧边栏 -->
        <div @click="toggleCollapse" class="toggle-button">|||</div>

        <!-- 侧边菜单栏 -->
        <el-menu unique-opened :collapse="isCollapse" :collapse-transition="false" :router="true" :default-active="activePath" class="" background-color="#333744" text-color="#fff" active-text-color="#525ddd">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 一级图标与文本 -->
              <i :class="iconObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="subItemClick(subItem.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>

          </el-submenu>
        </el-menu>

      </el-aside>

      <!-- 主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>

    </el-container>

  </el-container>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      menuList: {},
      iconObj: {
        '125': 'iconfont icon-yonghu',
        '103': 'iconfont icon-quanxianyuechi',
        '101': 'iconfont icon-dingdan',
        '102': 'iconfont icon-shangpin',
        '145': 'iconfont icon-baobiao'
      },
      // 是否折叠菜单，默认false
      isCollapse: false,

      // 被激活的链接
      activePath: ''
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logoutClick() {
      // 清空token
      window.sessionStorage.clear()
      // 跳转到登录页
      this.$router.push('/login')
    },

    // 获取左侧菜单数据
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')

      // 请求失败
      if (res.meta.status !== 200) {
        return (this.$message.error = res.meta.msg)
      }

      this.menuList = res.data
      console.log(res)
      console.log(this.menuList)
    },

    // 折叠按钮
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },

    // 左侧菜单点击事件
    // 保存激活的菜单路径
    subItemClick(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

/* 头部区域 */
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
  }
}

.el-header span {
  margin-left: 25px;
  color: #fff;
  font-size: 20px;
}

.el-header img {
  width: 50px;
  height: 50px;
  border: 1px solid #eee;
  border-radius: 25px;
}

.title span {
  color: #fff;
}

/* 侧边栏区域 */
.el-aside {
  background-color: #333744;
  transition: all 0.3s;
}

.el-menu {
  width: 100%;
  border-right: 0;
}

.iconfont {
  margin-right: 15px;
}

.toggle-button {
  background-color: #4a5064;
  // width: 100%;
  line-height: 24px;
  color: #fff;
  font-size: 12px;
  letter-spacing: 0.2em;
  text-align: center;
  cursor: pointer;
}

/* 主体部分 */
.el-main {
  background-color: #eaedf1;
}
</style>
