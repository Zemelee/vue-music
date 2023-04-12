<template>
  <div>
    <el-divider content-position="left">动态{{ events.length }}：</el-divider>
    <div v-for="(event, index) in events" :key="index">
      <div>发布时间：{{ formatDate(event.eventTime) }}</div>
      <div>信息：{{ JSON.parse(event.json).msg }}</div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/assets/public.js";
import { getUserEvent } from "@/request/api/home";
export default {
  name: "userevent",
  components: {},
  data() {
    return {
      uid: "",
      events: [], //
    };
  },
  methods: {
    formatDate,
  },
  created() {
    this.uid = this.$route.query.uid;
    getUserEvent(this.uid).then((res) => {
      this.events = res.data.events;
      console.log("动态信息：", this.events);
    });
  },
  mounted() {
    console.log("uid", this.$route);
  },
};
</script>

<style>
</style>