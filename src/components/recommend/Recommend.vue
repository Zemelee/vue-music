<template>
  <div class="recommend">
    <!-- 头部：歌单提示 -->
    <div class="tip">
      <div class="left" @click="routerPush('recommendmore')">
        <span>歌单</span>
        <i class="el-icon-arrow-right"></i>
      </div>
      <div class="right">
        <i class="el-icon-arrow-left"></i>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <!-- 歌单推荐 -->
    <div class="content">
      <div
        class="items"
        :title="item.name"
        v-for="item in recommendList"
        :key="item.id"
      >
        <router-link
          :to="{ path: '/recommenddetails', query: { id: item.id } }"
        >
          <img :src="item.picUrl" alt="" />
          <p>{{ item.name }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecommends } from "@/request/api/home.js";
export default {
  data() {
    return {
      recommendList: [],
    };
  },
  methods: {
    routerPush(path) {
      this.$router.push(`/${path}`);
    },
  },
  created() {
    getRecommends(11).then((res) => {
      this.recommendList = res.data.result;
    });
  },
};
</script>

<style lang="less" scoped>
.recommend {
  .tip {
    display: flex;
    justify-content: space-between;
    .left:hover {
      cursor: pointer;
    }
    .right i {
      height: 30px;
      width: 30px;
      margin-right: 10px;
    }
  }
  .content {
    width: 100%;
    overflow: scroll;
    overflow-y: hidden; //去掉滚动条
    overflow-x: hidden; //去掉滚动条
    display: flex;

    .items {
      display: inline-block;
      margin: 10px;
      width: 100px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 10px;
        position: relative;
      }
      .router-link-active {
        text-decoration: none;
      }
      a {
        text-decoration: none;
        color: #606266;
      }
      p {
        font-size: 10px;
        font-weight: 200px;
        width: 100px;
        display: -webkit-box;
        text-overflow: ellipsis; /*超出内容用省略号*/
        overflow: hidden; /*内容超出后隐藏*/
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /*2行*/
        word-break: break-all;
        text-decoration: none;
        a.router-link-exact-active {
          background-color: orange;
          color: #fff;
        }
      }
    }
    .items p:hover {
      text-decoration-line: underline;
    }
    .items:hover {
      cursor: pointer;
    }
  }
}
</style>