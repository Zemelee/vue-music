<template>
  <div class="details">
    <!-- top -->
    <div class="top">
      <div class="left">
        <img :src="singerInfo?.artist?.cover" alt="" />
      </div>
      <div class="right">
        <div style="font-weight: bold; margin: 0 0 10px 0">
          {{ singerInfo.artist?.name }}
        </div>

        <div v-if="singerInfo.identify">
          {{ singerInfo.identify?.imageDesc }}
        </div>
        <div class="des" @click="centerDialogVisible = true">
          {{ singerInfo.artist?.briefDesc }}
        </div>
        <!-- 弹出框 -->
        <el-dialog
          title="歌单介绍"
          :visible.sync="centerDialogVisible"
          width="50%"
          center
        >
          <div>{{ singerInfo.artist?.briefDesc }}</div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="centerDialogVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
    </div>
    <div class="list">
      音乐 - 歌手 - 专辑 - 时长
      <div
        class="music"
        v-for="music in top50"
        :key="music.id"
        @dblclick="playMusic(music)"
      >
        <span
          ><img
            style="width: 30px; height: 30px; border-radius: 4px"
            :src="music.al.picUrl"
        /></span>
        <span class="name">
          {{ music.name }}
          <span style="font-size:10px;color:#909399" v-if="music.fee == 1">VIP</span>
          </span>
        <span class="singer">
          <span v-for="singer in music.ar" :key="singer.name">
            <router-link :to="{ path: '/singer', query: { id: singer.id } }">
            <span>{{ singer.name }}</span>
            </router-link>
          </span>
        </span>
        <span class="album">{{ music.al.name }}</span>
        <span class="duration">{{ formatDuration(music.dt) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
//获取歌手详情、歌手热门50首
import { getSinger, getSingerTop } from "@/request/api/home.js";
import { durationFormat } from "@/assets/public.js";
export default {
  data() {
    return {
      singerInfo: "", //歌手总信息
      centerDialogVisible: false, //弹出框展示状态
      top50: [], //歌手热门50首
    };
  },
  methods: {
    playMusic(music) {
      //更新当前vuex中存储的歌曲
      this.$store.commit("updateFooter", music);
      console.log("双击");
    },
    formatDuration(duration) {
      return durationFormat(duration);
    },
  },
  created() {
    console.log(this.$route.query.id);
    getSinger(this.$route.query.id).then((res) => {
      // console.log("歌手信息：", res);
      this.singerInfo = res.data.data;
      console.log("歌手信息：\n", this.singerInfo);
    });
    getSingerTop(this.$route.query.id).then((res) => {
      this.top50 = res.data.songs;
      console.log("热门50首：", this.top50);
    });
  },
};
</script>


<style lang="less" scoped>
.details {
  .top {
    display: flex;
  }
  .left {
    img {
      width: 200px;
      height: 200px;
      border-radius: 10px;
    }
  }
  .right {
    margin: 10px 0 0 10px;
    .des {
      margin-top: 20px;
      width: 300px;
      display: -webkit-box;
      text-overflow: ellipsis; /*超出内容用省略号*/
      overflow: hidden; /*内容超出后隐藏*/
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5; /*2行*/
      word-break: break-all;
      cursor: pointer;
    }
  }
  .list {
    margin-top: 10px;
    .music {
      width: 100%;
      height: 50px;
      span {
        margin: 5px;
        display: inline-block;
        vertical-align: center;
      }

      .name {
        margin-left: 10px;
        width: 25%;
      }
      .singer {
        width: 20%;
      }
      .album {
        width: 20%;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .duration {
        width: 20%;
      }
    }
    .music:hover {
      background-color: aqua;
    }
  }
}
</style>