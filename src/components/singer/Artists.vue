<template>
  <div>
    <!-- 提示信息 -->
    <div class="tip">
      <div class="left" @click="routerPush('singermore')">
        <span>热门歌手</span>
        <i class="el-icon-arrow-right"></i>
      </div>
      <div class="right">
        <i class="el-icon-arrow-left"></i>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <!-- 歌手top -->
    <div class="artists">
      <div class="artistItem" v-for="(item, index) in topSingers" :key="index">
        <router-link :to="{ path: '/singer', query: { id: item.id } }">
          <img style="width: 120px; height: 120px" :src="item.img1v1Url" />
          <p>{{ item.name }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getSingersTop } from "@/request/api/home.js";
export default {
  data() {
    return {
      topSingers: [], //热门歌手top10
    };
  },
  methods: {
    routerPush(path) {
      this.$router.push(`/${path}`);
    },
  },
  created() {
    getSingersTop(10).then((res) => {
      this.topSingers = res.data.artists;
      console.log("热门歌手top10:", this.topSingers);
    });
  },
};
</script>

<style scoped lang="less">
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
.artists {
  width: 100%;
  overflow: scroll;
  overflow-y: hidden;
  overflow-x: auto;
  display: flex;
  .artistItem {
    margin-left: 12px;
    img {
      border-radius: 50%;
    }

    text-align: center;
  }
}
</style>