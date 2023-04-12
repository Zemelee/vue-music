<template>
  <div class="header">
    <div @click="$router.go(-1)">
      <i class="el-icon-arrow-left"></i>
    </div>
    <div class="search" @click="centerDialogVisible = true">
      <el-input
        class="search_input"
        placeholder="搜索歌曲"
        prefix-icon="el-icon-search"
      >
      </el-input>
    </div>
    <el-dialog :visible.sync="centerDialogVisible" width="30%" center>
      <el-input
        v-model="searchKeyWord"
        @keyup.enter.native="
          routerPush('searchresult', searchKeyWord), addHistory(searchKeyWord)
        "
        @change="SearchSuggest"
        placeholder="搜索歌曲"
      ></el-input>
      <el-divider></el-divider>
      <div v-show="dialog1" class="dialog1">
        <!-- 热搜 -->
        <div class="left">
          <span style="font-size: 20px; font-wight: 100; color: black"
            >热门搜索</span
          >
          <div
            style="padding-bottom: 5px; color: black; cursor: pointer"
            v-for="(item, index) in hotSearch"
            :key="index"
          >
            {{ index + 1 }}.{{ item.first }}
          </div>
        </div>
        <!-- 搜索记录 -->
        <div class="right">
          <span style="font-size: 20px; font-wight: 100; color: black"
            >搜索历史</span
          >
          <div v-for="item in keyWordList" :key="item">
            {{ item }}
          </div>
          <i class="el-icon-delete" v-if="keyWordList.length"></i>
        </div>
      </div>
      <!-- 搜索建议框默认不展示：dialog默认为true -->
      <div v-show="!dialog1" class="dialog2">
        <div v-for="(item, index) in Suggests.songs" :key="index">
          <span>{{ index + 1 }}.{{ item.name }}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getSearchHot, getSearchSuggest } from "@/request/api/home.js";
export default {
  data() {
    return {
      centerDialogVisible: false, //对话框展示状态
      dialog1: true, //搜索建议对话框展示状态取反
      searchKeyWord: "", //搜索关键词
      keyWordList: "", //搜索记录
      hotSearch: [], //热搜
      Suggests: [], //搜索建议
    };
  },
  computed: {
    // ...mapState(["searchHistory"]), //vuex中的搜索记录
  },
  created() {
    getSearchHot().then((res) => {
      this.hotSearch = res.data.result.hots;
      console.log("热搜：", res);
    });
    console.log("vuex-history:", this.searchHistory);
  },
  mounted() {
    //每次进入该页面均从localStorage中获取搜索记录
    this.keyWordList = JSON.parse(localStorage.getItem("keyWordList")) || []; //json转对象
  },
  watch: {
    searchKeyWord(newVal, oldVal) {
      console.log("新旧：", newVal, "-", oldVal);
      if (newVal == "") {
        this.dialog1 = true;
      }
    },
  },
  methods: {
    routerPush() {
      if (this.searchKeyWord !== "") {
        this.$router.push({
          path: "searchresult",
          query: {
            searchKeyWord: this.searchKeyWord,
          },
        });
        this.centerDialogVisible = false;
      }
    },

    //添加搜索历史
    addHistory(searchKeyWord) {
      console.log("localStorage", localStorage);
      if (this.searchKeyWord !== "") {
        this.keyWordList.unshift(searchKeyWord);
        //去重
        let arr = new Set(this.keyWordList); //一个没有重复内容的类数组
        this.keyWordList = [...arr]; //将类数组变成数组并赋值给keyWordList
        //固定搜索记录长度
        if (this.keyWordList.length > 10) {
          this.keyWordList.splice(this.keyWordList.length - 1, 1); //从最后一个开始删除一个元素
        }
        //将搜索记录添加在本地存储中
        localStorage.setItem("keyWordList", JSON.stringify(this.keyWordList)); //对象转JSON
      }
    },
    SearchSuggest() {
      getSearchSuggest(this.searchKeyWord).then((res) => {
        this.Suggests = res.data.result;
        console.log("搜索建议：", this.Suggests);
      });
      this.dialog1 = false;
    },
  },
};
</script>

<style lang="less" scpoed>
.header {
  position: relative;
  top: 10px;
  justify-items: center;
  display: flex;
  justify-content: space-between;
  .el-icon-arrow-left {
    font-size: 40px;
    background-color: #c0c4cc;
    border-radius: 50%;
  }
  .el-icon-arrow-left:hover {
    background-color: #909399;
    cursor: pointer;
  }
  .search {
    display: flex;
  }
  .dialog1 {
    display: flex;
    justify-content: space-between;
    .left {
      width: 45%;
      border: 1px solid red;
    }
    .right {
      width: 45%;
    }
  }
}
</style>