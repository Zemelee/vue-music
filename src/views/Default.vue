<template>
  <div class="home">
    <el-container>
      <el-aside width="170px">
        <el-col>
          <el-button @click="routerPush('login')">login</el-button>
          <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            style="background-color: #d3dce6"
          >
            <el-menu-item index="1" @click="routerPush('home')">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="2" @click="routerPush('userinfo')">
              <i class="el-icon-user"></i>
              <span slot="title">我的</span>
            </el-menu-item>
            <el-menu-item index="3" @click="routerPush('setting')">
              <i class="el-icon-setting"></i>
              <span slot="title">设置</span>
            </el-menu-item>

            <el-submenu index="4" @click="routerPush('home')">
              <template slot="title">
                <span>创建的歌单</span>
              </template>
              <!-- <el-menu-item index="1-1">选项1</el-menu-item> -->
            </el-submenu>

            <el-submenu index="5" @click="routerPush('home')">
              <template slot="title">
                <span>收藏的歌单</span>
              </template>
              <!-- <el-menu-item index="1-1">选项1</el-menu-item> -->
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main> <router-view></router-view> </el-main>
        <el-footer>
          <Footer />
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// // @ is an alias to /src
import Footer from "@/views/Footer.vue";
import Header from "@/views/Header.vue";

export default {
  // name: 'HomeView',
  components: {
    Footer,
    Header,
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    routerPush(path) {
      console.log(path);
      this.$router.push(`/default/${path}`);
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  margin: 0;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  height: 40%;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  // background-color: ;
  color: #333;
  height: 451px;
}
</style>
