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
                path: '/default/usersinfo/userevent',
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
                path: '/default/usersinfo/followeds',
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
import { formatDate } from "@/assets/public.js";
import { getUser } from "@/request/api/home.js";
import UserEvent from "../UserEvent.vue";
export default {
  components: {
    UserEvent,
  },
  data() {
    return {
      userinfo: {},
      uid: "", //
    };
  },
  watch: {
    "this.$route": {
      handler(newV, oldV) {
        console.log("新", newV);
        console.log("旧", oldV);
      },
      immediate: true,
      deep: true,
    },
  },
  updated() {
    this.uid = this.$route.query.uid;
    getUser(this.uid).then((res) => {
      this.userinfo = res;
      console.log("用户信息:", this.userinfo);
    });
  },
  created() {
    this.uid = this.$route.query.uid;
    console.log("this.uid", this.uid);
    getUser(this.uid).then((res) => {
      this.userinfo = res;
      console.log("用户信息:", this.userinfo);
    });
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