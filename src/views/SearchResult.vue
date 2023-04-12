<template>
  <div class="details">
    <div class="list">
      音乐 - 歌手 - 专辑 - 时长
      <div class="music" v-for="(music, index) in searchRusult" :key="index" @dblclick="playMusic(music)">
        <span class="name"
          >{{ music.name }}
          <span style="font-size: 10px; color: #909399" v-if="music.fee == 1"
            >VIP</span
          >
        </span>
        <span class="singer">
          <span
            style="text-decoration: none"
            v-for="(singer,index) in music.artists"
            :key="index"
          >
            <router-link :to="{ path: '/singer', query: { id: singer.id } }">
              {{ singer.name }}
            </router-link>
          </span>
        </span>
        <span class="album">
          {{ music.album.name }}
        </span>
        <span class="duration">{{ formatDuration(music.duration) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearch } from "@/request/api/home.js";
import { durationFormat } from "@/assets/public.js";
export default {
  data() {
    return {
      playListInfo: [], //歌单总信息
      centerDialogVisible: false, //弹出框展示状态
      searchRusult: [], //搜索结果
    };
  },
  methods: {
    formatDuration(duration) {
      return durationFormat(duration);
    },

    playMusic(item) {
      console.log("item:",item);
      item.al = item.album
      item.al.picUrl = item.album.artist.img1v1Url
      //更新当前vuex中存储的歌曲
      this.$store.commit("updateFooter", item);
      
      // this.$store.commit(
      //   "updatePlayListIndex",
      //   this.$store.state.playList.length - 1
      // );
    },
  },
  created() {
    //搜索结果
    getSearch(this.$route.query.searchKeyWord).then((res) => {
      this.searchRusult = res.data.result.songs;
      console.log("搜索结果：", this.searchRusult);
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

      span {
        margin: 5px;
        display: inline-block;
        vertical-align:middle;
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