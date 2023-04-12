<template>
  <div class="details">
    <!-- top -->
    <div class="top">
      <div class="left">
        <img :src="playListInfo.coverImgUrl" alt="" />
      </div>
      <div class="right">
        <div style="font-weight: bold; margin: 0 0 10px 0">
          {{ playListInfo.name }}
        </div>
        <div v-if="playListInfo.algTags !== null">
          标签：
          <el-tag
            style="margin: 10px 5px"
            v-for="item in playListInfo.algTags"
            :key="item"
          >
            {{ item }}
          </el-tag>
        </div>
        <div v-else-if="playListInfo.algTags == null">
          <span>标签：暂无</span>
        </div>
        <div>创建者：{{ playListInfo?.creator?.nickname }}</div>
        <!-- 弹出框 -->
        <div class="des" @click="centerDialogVisible = true">
          {{ playListInfo.description }}
        </div>
        <el-dialog
          title="歌单介绍"
          :visible.sync="centerDialogVisible"
          width="50%"
          center
        >
          <div>{{ playListInfo.description }}</div>
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
        v-for="music in songList"
        :key="music.id"
        @dblclick="playMusic(music)"
      >
        <span
          ><img
            style="width: 30px; height: 30px; border-radius: 4px"
            :src="music.al.picUrl"
        /></span>
        <span class="name"
          >{{ music.name }}
          <span style="font-size: 10px; color: #909399" v-if="music.fee == 1"
            >VIP</span
          >
        </span>
        <span class="singer">
          <span
            style="text-decoration: none"
            v-for="singer in music.ar"
            :key="singer.name"
          >
            <router-link :to="{ path: '/singer', query: { id: singer.id } }">
              {{ singer.name }}
            </router-link>
          </span>
        </span>
        <span class="album">
          {{ music.al.name }}
        </span>
        <span class="duration">{{ formatDuration(music.dt) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getRecommendDetails,
  getRecommendMusicList,
} from "@/request/api/home.js";
import { durationFormat } from "@/assets/public.js";
export default {
  data() {
    return {
      playListInfo: [], //歌单总信息
      centerDialogVisible: false, //弹出框展示状态
      songList: [], //歌单歌曲列表
    };
  },
  methods: {
    playMusic(music) {
      //更新当前vuex中存储的歌曲
      this.$store.commit("updateFooter", music);
      this.$store.commit("updateDuration", music.dt);

      console.log("双击");
    },
    formatDuration(duration) {
      return durationFormat(duration);
    },
  },
  created() {
    // console.log(this.$route.query.id);
    // 获取歌单介绍信息
    getRecommendDetails(this.$route.query.id).then((res) => {
      this.playListInfo = res.data.playlist;
      console.log("歌单介绍信息:", res.data.playlist);

    });
    //获取歌单歌曲列表
    getRecommendMusicList(this.$route.query.id).then((res) => {
      this.songList = res.data.songs;
      console.log("歌单歌曲列表：", this.songList);
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
      -webkit-line-clamp: 3; /*2行*/
      word-break: break-all;
      cursor: pointer;
    }
  }
  .list {
    margin-top: 10px;
    .music {
      width: 100%;
      height: 50px;
      border-radius: 10px;
      span {
        margin: 5px;
        display: inline-block;
        vertical-align: center;
        vertical-align: middle;
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
      background-color: #ebeef5;
    }
  }
}
</style>