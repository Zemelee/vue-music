<template>
  <div class="recommendSongs" onselectstart="return false">
    <div class="tip">
      <div class="left" @click="routerPush('recommendmore')">
        <span>新歌速递</span>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <div class="list">
      <div style="margin-left: 50px; font-weight: 800; margin-bottom: 10px">
        <span style="display: inline-block; width: 27%">音乐</span>
        <span style="display: inline-block; width: 22%">歌手</span>
        <span style="display: inline-block; width: 22%">专辑</span>
        <span style="display: inline-block; width: 20%">时长</span>
      </div>

      <div
        class="music"
        v-for="music in topSongs"
        :key="music.id"
        @dblclick="playMusic(music)"
      >
        <span
          ><img
            style="width: 30px; height: 30px; border-radius: 4px"
            :src="music.album.blurPicUrl"
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
            v-for="singer in music.album.artists"
            :key="singer.name"
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
import { durationFormat } from "@/assets/public.js";
import { getTopSong } from "@/request/api/home.js";
export default {
  data() {
    return {
      topSongs: [], //新歌
    };
  },
  methods: {
    routerPush(path) {
      this.$router.push(`/${path}`);
    },
    playMusic(music) {
      console.log("双击参数：", music);
      let temp = {};
      temp.al = music.album;
      temp.ar = music.artists;
      temp.id = music.id;

      //更新当前vuex中存储的歌曲
      this.$store.commit("updateFooter", temp);
      this.$store.commit("updateDuration", music?.hMusic?.playTime); //歌曲时长
      console.log("双击");
    },
    formatDuration(duration) {
      return durationFormat(duration);
    },
  },
  created() {
    console.log(11);
    getTopSong().then((res) => {
      console.log("新歌速递top10：", res.data.data.slice(0, 10));
      this.topSongs = res.data.data.slice(0, 10);
    });
  },
};
</script>

<style lang="less" scpoed>
.router-link-active {
  text-decoration: none;
}
a {
  text-decoration: none;
  color: #606266;
}
a:hover {
  text-decoration: underline;
}
.tip {
  display: flex;
  margin-bottom: 10px;
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
.list {
  margin-top: 0px;
  .music {
    width: 100%;
    height: 50px;
    border-radius: 10px;
    span {
      margin: 5px;
      display: inline-block;
      vertical-align: middle;
    }

    .name {
      cursor: default;
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
      cursor: default;
      width: 20%;
    }
  }
  .music:hover {
    background-color: #ebeef5;
  }
}
</style>