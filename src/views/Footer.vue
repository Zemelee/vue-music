<template>
  <div class="footer">
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${footer.id}.mp3`"
    ></audio>
    <div class="left">
      <span class="stateCover" @click="dialogVisible = true">
        <img :src="footer.al.picUrl" alt="" />
      </span>
      <span class="info">
        <span v-for="(singer, index) in footer.ar" :key="index"
          >{{ singer.name }}|</span
        >
        <div>{{ footer?.al?.name }}</div>
      </span>
    </div>
    <div style="align-self: center">
      <span>{{ ct }}/{{ dt }}</span>
    </div>

    <div class="center">
      <div>
        <i class="el-icon-back" @click="test"></i>
        <i
          class="el-icon-video-play"
          style="margin: 0 10px"
          @click="play"
          v-if="playing"
        ></i>
        <i
          class="el-icon-video-pause"
          style="margin: 0 10px"
          @click="play"
          v-if="!playing"
        ></i>
        <i class="el-icon-right"></i>
      </div>

      <div class="progess">
        <div>
          <el-slider
            @change="sliderPlay"
            @input="sliderStop"
            :show-tooltip="false"
            :min="0"
            :max="duration"
            :format-tooltip="(val) => durationFormat(val)"
            v-model="currentTime"
            @mousedown.native="isChange = true"
            @mouseup.native="isChange = false"
          ></el-slider>
        </div>
      </div>
    </div>

    <div class="right">
      <i class="el-icon-phone-outline" @click="test"></i>
    </div>

    <!-- 歌曲详情子组件 -->
    <el-dialog :visible.sync="dialogVisible" width="30%" :fullscreen="true">
      <Song :dt="duration" />
    </el-dialog>
  </div>
</template>

<script>
import { durationFormat } from "@/assets/public.js";
import Song from "@/components/song/Song.vue";
import { mapMutations, mapState } from "vuex";
export default {
  components: {
    Song,
  },
  data() {
    return {
      dialogVisible: false, //弹出框展示状态
      interVal: 0, //定时器
      isChange: false, //是否正在被拖动
      sound: 100, //音量
    };
  },
  updated() {
    this.duration = this.$store.state.duration;
  },

  mounted() {
    setTimeout(() => {
      this.$store.commit("updateDuration", this.$refs.audio.duration);
    }, 3400);
    //
  },

  methods: {
    durationFormat,
    //正在被拖动时执行
    sliderStop(value) {
      if (this.isChange) {
        clearInterval(this.interVal);
        let audio = this.$refs.audio;
        audio.pause();
        console.log("正在被拖动时改变当前播放值");
        audio.currentTime = value;
        // console.log("正在被拖动时执行audio.currentTime",audio.currentTime);
        this.$store.commit("updateCurrentTime", value);
        this.playing = false;
      }
    },

    //拖拽结束时执行
    sliderPlay(value) {
      console.log("拖拽结束点：", value);
      let audio = this.$refs.audio;
      console.log("拖拽结束时执行audio.currentTime",audio.currentTime);
      this.play();
      this.isChange = false;
    },
    test() {
      console.log("currentTime:", this.currentTime);
    },
    play() {
      if (this.$refs.audio.paused) {
        //如果暂停时play则播放
        this.$refs.audio.play();
        this.updatePlaying(false); //隐藏暂停键
        this.updateTime(); //播放就传值
      } else {
        //如果播放时play则暂停
        this.$refs.audio.pause();
        this.updatePlaying(true); //显示暂停键
        clearInterval(this.interVal); //暂停清楚定时器
      }
    },
    addDuration() {
      this.$store.commit("updateDuration", this.$refs.audio.duration);
    },
    //???
    updateTime() {
      this.interVal = setInterval(() => {
        this.$store.commit("updateCurrentTime", this.$refs.audio.currentTime);
      }, 1000);
    },

    ...mapMutations(["updatePlaying"]),
  },

  computed: {
    ...mapState(["footer", "duration", "currentTime", "playing"]),
    currentTime: {
      get() {
        return this.$store.state.currentTime;
      },
      set() {},
    },
    playing: {
      get() {
        return this.$store.state.playing;
      },
      set() {},
    },
    duration: {
      get() {
        return this.$store.state.duration;
      },
      set() {},
    },
    dt() {
      return durationFormat(this.duration);
    },
    ct() {
      return durationFormat(this.currentTime);
    },
  },
};
</script>

<style lang="less" scoped>
.footer {
  height: 100%;
  display: flex;
  justify-content: space-between;
  .left {
    align-self: center;
    height: 100%;
    .stateCover {
      display: inline-block;
      width: 60px;
      height: 100%;
      margin-left: 0;
      img {
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
    .info {
      display: inline-block;
      margin-bottom: 10px;
      position: relative;
      bottom: 10px;
      div,
      span {
        margin: 0 0 10px 20px;
      }
    }
  }

  .center {
    align-self: center;
    text-align: center;
    width: 30%;
    height: 100%;
    justify-items: center;
    .progess {
      // display: inline-block;
      el-slider {
        width: 100%;
      }
    }
    i {
      font-size: 35px;
      // height: 20px;
    }
  }
  .right {
    display: flex;
    align-self: center;
    i {
      font-size: 35px;
    }
  }
}
</style>