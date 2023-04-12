<template>
  <div class="followeds">
    <el-divider content-position="left"
      >粉丝{{ followeds.length }}：</el-divider
    >
    <div class="followed" v-for="(item, index) in followeds" :key="index">
      <!-- 头像 -->
      <div>
        <img :src="item.avatarUrl" alt="" />
      </div>
      <div class="right">
        <!-- 昵称 -->
        <div style="color: #409eff; font-size: 13px; margin-top: 4px">
          <router-link
            :to="{ path: '/default/usersinfo', query: { uid: item.userId } }"
          >
            {{ item.nickname }}
          </router-link>
        </div>
        <!-- 动态、关注、粉丝 -->
        <div class="social">
          <div class="socialItem">
            <div>
              动态<span>{{ item.eventCount }}</span>
            </div>
          </div>

          <el-divider direction="vertical"></el-divider>

          <div class="socialItem">
            <div>
              关注<span>{{ item.follows }}</span>
            </div>
          </div>

          <el-divider direction="vertical"></el-divider>

          <div class="socialItem">
            <router-link
              :to="{ path: '/default/userinfo', query: { uid: item.userId } }"
            >
              <div>
                粉丝 <span>{{ item.followeds }}</span>
              </div>
            </router-link>
          </div>
        </div>
        <!-- 签名 -->
        <div style="color: #909399; font-size: 13px; margin-top: 4px">
          {{ item.signature }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserFolloweds } from "@/request/api/home";
export default {
  data() {
    return {
      uid: "", //uid
      followeds: [], //粉丝列表
    };
  },
  created() {
    console.log("粉丝页路由参数:", this.$route);
    this.uid = JSON.parse(localStorage.getItem("userInfo")).data.profile.userId;
    //父组件UserInfo传递的uid
    getUserFolloweds(this.$route.query.uid).then((res) => {
      this.followeds = res.data.followeds;
      console.log("粉丝列表信息:", this.followeds);
    });
  },
};
</script>

<style lang="less" scoped>
.followeds {
  display: inline-block;
  .followed {
    img {
      width: 60px;
      height: 60px;
    }
    .right {
      margin-left: 10px;
    }
    display: flex;
    .social {
      margin-top: 4px;
      display: flex;
      .socialItem {
        text-align: center;
        // border: 1px solid red;
        width: 70px;
        color: rgb(120, 120, 120);
        span {
          font-size: 10px;
        }
        font-size: 10px;
      }
    }
  }
}
</style>