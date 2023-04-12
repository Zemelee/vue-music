<template>
  <div class="user">
    <!-- 个人信息 -->
    <div class="selfInfo">
      <div class="avatar">
        <img :src="userinfo?.data?.profile?.avatarUrl" alt="" />
      </div>
      <div>
        <!-- 昵称、等级、性别 -->
        <div class="title">
          <span style="font-size: 25px">{{
            userinfo?.data?.profile?.nickname
          }}</span>

          <span style="font-weight: 800; color: red"
            >LV.{{ userinfo?.data?.level }}</span
          >

          <span v-if="userinfo.data?.profile?.gender">boy</span>
          <span v-if="!userinfo.data?.profile?.gender">girl</span>
        </div>
        <el-divider></el-divider>
        <!-- 社交信息 -->
        <div class="social">
          <div class="socialItem">
            <router-link
              :to="{
                path: '/default/userinfo/userevent',
                query: { uid: uid },
              }"
            >
              <div>
                <span>{{ userinfo.data?.profile?.eventCount }}</span>
              </div>
              动态</router-link
            >
          </div>

          <el-divider direction="vertical"></el-divider>
          <div class="socialItem">
            <div>
              <span>{{ userinfo.data?.profile?.follows }}</span>
            </div>
            关注
          </div>

          <el-divider direction="vertical"></el-divider>
          <div class="socialItem">
            <router-link
              :to="{
                path: '/default/userinfo/followeds',
                query: { uid: uid },
              }"
            >
              <div>
                <span>{{ userinfo.data?.profile?.followeds }}</span>
              </div>
              粉丝
            </router-link>
          </div>
        </div>

        <!-- 个人介、生日、城市。 -->
        <div
          style="color: rgb(120, 120, 120); margin-top: 10px; font-size: 10px"
        >
          <div>
            个人介绍：
            <span>{{ userinfo.data?.profile.signature }}</span>
          </div>
          <div style="">
            <span>
              所在地区：
              <span v-if="userinfo.data?.profile?.city == 500101">重庆市</span>
              <span v-else>{{ userinfo.data?.profile?.city }}</span>
            </span>
            <span style="margin-left: 20px">
              生日：
              <span>{{ formatDate(userinfo.data?.profile?.birthday) }} </span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { formatDate } from "@/assets/public.js";
// import { getUser } from "@/request/api/home.js";
import UserEvent from "./UserEvent.vue";
export default {
  components: {
    UserEvent,
  },
  data() {
    return {
      userinfo: {}, //用户信息user的备份
      uid: "", //
    };
  },
  computed: {
    ...mapState(["user"]), //未登录状态为{}
  },
  mounted() {
    this.userinfo = this.user; //复制用户信息(刚登录则不为空，否则为空)
    console.log("userinfo(转json前):", this.userinfo);
    // console.log("userinfo(转json后):", JSON.stringify(this.userinfo));
    // 刷新后默认为｛｝，只有登录时请求到用户数据并提交到vuex中得user才不为空
    // 如果vuex中的user不为空（说明在登录），则存储到localStorage中
    if (JSON.stringify(this.userinfo) !== "{}") {
      localStorage.setItem("userInfo", JSON.stringify(this.userinfo)); //obj转json
    } else {
      //若为空{}则从localStorage取值
      this.userinfo = JSON.parse(localStorage.getItem("userInfo")); //json转obj
      console.log(this.userinfo);
    }
    
    console.log("UserInfo的$route.query", this.$route.query);

    //赋值uid
    //如果query.uid为undefined，说明不是从登录页面跳转，则从Storage中取uid
    if (this.uid == undefined || this.uid == '' || this.uid == {}) {
      console.log("为空");
      this.uid = this.userinfo.data.profile.userId;
      console.log("this.uid",this.uid);
    }else{
      console.log("不为空");
      //如果不为空，则说明由登录页面跳转，将登录页传递的uid赋值即可
      this.uid = this.$route.query.uid;
    }

  },
  methods: {
    formatDate,
  },
};
</script>

<style lang="less" scpoed>
.user {
  // display: flex;
  .selfInfo {
    display: flex;
    .avatar {
      width: 20%;
      height: 20%;
      margin-right: 50px;
      border: 1px solid rgb(206, 206, 206);
      img {
        width: 100%;
        height: 100%;
        // border-radius: 50%;
      }
    }
    .title {
      span {
        margin: 0 10px;
      }
      align-content: space-between;
    }
    .social {
      display: flex;
      el-divider {
        font-size: 100px;
      }
      .socialItem {
        text-align: center;
        // border: 1px solid rgb(206, 206, 206);
        width: 70px;
        color: rgb(120, 120, 120);
        span {
          font-size: 30px;
        }
        font-size: 10px;
      }
    }
  }
}
</style>