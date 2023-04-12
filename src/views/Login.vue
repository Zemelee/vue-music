<template>
  <div>
    <el-button @click="login">login</el-button>
    <el-divider></el-divider>
    <el-input name="email" placeholder="email" v-model="email"></el-input>
    <el-input
      name="password"
      placeholder="password"
      v-model="password"
    ></el-input>
    <el-button @click="login">邮箱登录</el-button>
  </div>
</template>

<script>
import { getUser } from "@/request/api/home.js";
export default {
  data() {
    return {
      email: "lzm_0203@163.com",
      password: "Lzm784397919",
    };
  },
  methods: {
    async login() {
      let res = await this.$store.dispatch("getLogin", {
        email: this.email,
        password: this.password,
      });
      console.log(res);
      if (res.data.code == 200) {
        //说明登陆成功
        /*修改登录状态值、设置token、获取用户信息并添加到user、跳转路由到用户中心 */
        this.$store.commit("updateIsLogin", true);
        this.$store.commit("updateToken", res.data.token);
        let userinfo = await getUser(res.data.account.id);
        console.log("用户信息：", userinfo);
        this.$store.commit("updateUser", userinfo);
        this.$router.push({
          path: "/default/userinfo",
          query: { uid: userinfo.data.profile.userId },
        });
      } else {
        this.$message({
          message: "登录失败:" + res.message,
          type: "warning",
        });
      }
    },
  },
};
</script>

<style>
</style>