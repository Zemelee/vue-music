<template>
  <div class="recommend">
    <!-- 歌单推荐 -->
    <div class="content">
      
        <div class="items" v-for="item in recommendList" :key="item.id">
          <router-link :to="{ path: '/recommenddetails', query: { id: item.id } }">
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
    getRecommends(42).then((res) => {
      this.recommendList = res.data.result;
    });
  },
};
</script>

<style lang="less" scoped>
.recommend {
  margin: auto;
  .content {
    // display: inline-block;
    .items {
      display: inline-block;
      margin: 5px;
      width: 130px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 10px;
        position: relative;
      }
      p {
        height: 30px;
        width: 100px;
        font-size: 10px;
        font-weight: 200px;

        display: -webkit-box;
        text-overflow: ellipsis; /*超出内容用省略号*/
        overflow: hidden; /*内容超出后隐藏*/
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /*2行*/
        word-break: break-all;
      }
    }
    img:hover {
      cursor: pointer;
    }
  }
}
</style>