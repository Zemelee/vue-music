<template>
  <div class="home">
    <Recommend/>
    <el-divider></el-divider>
    <Artists/>
    <el-divider style="margin:0"></el-divider>
    <RecommendSongs/>

  </div>
</template>

<script>
import Recommend from './recommend/Recommend.vue'
import RecommendSongs from './recommend/RecommendSongs.vue'
import Artists from './singer/Artists.vue'
export default{
  components:{
    Recommend,
    Artists,
    RecommendSongs
  }
}
</script>

<style>
</style>