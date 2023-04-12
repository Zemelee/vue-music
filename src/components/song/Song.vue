<template>
  <div class="song">
    <div class="left">
      <img :src="footer.al.picUrl" alt="" />
      <div>{{ footer.al.name }}</div>
      <div>
        <span v-for="(item, index) in footer.ar" :key="index">
          
          {{ item.name }}
        </span>
      </div>

      <div class="center">
        <i class="el-icon-back" @click="test"></i>
        <i class="el-icon-video-play" @click="play" v-if="playing"></i>
        <i class="el-icon-video-pause" @click="play" v-if="!playing"></i>
        <i class="el-icon-right"></i>
        <div>
          <input
            type="range"
            class="range"
            min="0"
            :max="duration"
            :value="currentTime"
            step="0.05"
          />
         <!-- {{currentTime}} - {{duration}} -->
        </div>
      </div>
    </div>

    <div class="right">
      <p v-for="(item, index) in lyricsHandel()" :key="index">
        {{ item.lyc }}
      </p>
    </div>
  </div>
</template>

<script>
import { getLyrics } from "@/request/api/home.js";
import { mapState, mapMutations } from "vuex";
export default {
  //父组件Footer传来的值：vuex中的footer
  props: ["dt"],
  data() {
    return {
      lyric: "", //歌曲歌词
      interVal: 0, //定时器
    };
  },
  computed: {
    //footer数据、当前播放时间、播放状态、歌曲时长
    ...mapState(["footer", "currentTime", "playing", "duration"]),
    currentTime: {
      get() {
        return this.$store.state.currentTime;
      },
      set() {},
    },
  },
  mounted() {
    this.lyricsHandel();
    //更新duration
    setTimeout(() => {
      // this.dt = this.$parent.$parent.audio.duration
      console.log("this.dt", this.dt);
      this.$store.commit("updateDuration", this.dt);
    }, 1500);
  },
  methods: {
    test() {
      console.log();
    },
    lyricsHandel() {
      let arr;
      if (this.lyric) {
        arr = this.lyric.split(/[(\r\n)\r\n]+/); //用换行符分割歌词
        //返回一个arr数组
        arr = arr.map((item, i) => {
          //[01:10:897]试着做人间的旅行者;slice前闭后开
          let min = item.slice(1, 3); //分
          let sec = item.slice(4, 6); //秒
          let mill = item.slice(7, 10); //毫秒
          let lyc = item.slice(11, item.length);
          let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + mill;
          //如果Number(mill)为非数字
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9);
            lyc = item.slice(10, item.length);
            time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + mill;
          }
          return { min, sec, mill, lyc, time };
        });
        arr.map((item, i) => {
          if (i == arr.length - 1) {
            //如果到最后一句歌词
            item.pre = 0; //下一句歌词的时间
          } else {
            // item.pre = item[i + 1].time;
          }
        });
      }
      // //   console.log("arr:", arr);
      return arr;
    },
    play() {
      console.log("this.$parent", this.$parent.$parent.$refs);
      if (this.$parent.$parent.$refs.audio.paused) {
        //如果暂停时play则播放
        this.$parent.$parent.$refs.audio.play();
        this.updatePlaying(false); //隐藏暂停键
        this.updateTime(); //播放就传值
      } else {
        //如果播放时play则暂停
        this.$parent.$parent.$refs.audio.pause();
        this.updatePlaying(true); //显示暂停键
        clearInterval(this.interVal); //暂停清楚定时器
      }
    },
    //每隔1秒更新当前播放时间
    updateTime() {
      this.interVal = setInterval(() => {
        console.log();
        this.$store.commit(
          "updateCurrentTime",
          this.$parent.$parent.$refs.audio.currentTime
        );
      }, 1000);
    },
    ...mapMutations(["updatePlaying"]),
  },
  created() {
    console.log("footer:", this.footer);
    getLyrics(this.footer.id).then((res) => {
      this.lyric = res.data.lrc.lyric;
    });
  },
};
</script>

<style lang="less" scoped>
.song {
  width: 100%;
  // display: inline-block;
  display: flex;
  .left {
    text-align: center;
    width: 37%;
    height: 40%;
    margin-left: 8%;
    border: 1px solid red;
    img {
      width: 60%;
      height: 60%;
      border-radius: 20px;
      box-shadow: 2px 2px 5px #000;
    }
    .center {
      font-size: 45px;
      .range {
        width: 100%;
      }
    }
  }
  .right {
    height: 100vh;
    overflow: scroll;
    margin-left: 5%;
    text-align: center;
    font-size: 15px;
  }
}
</style>