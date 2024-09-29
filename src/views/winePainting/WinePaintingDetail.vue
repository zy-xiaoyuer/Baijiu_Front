<template>
  <div class="detail">
    <div class="back-button">
      <el-button type="primary" @click="goBack">返回</el-button>
    </div>
    <div class="content" v-if="message">
      <h1>{{ message.image }}</h1>
      <h3>{{ message.imagename }}</h3>
      <p class="poetry-content">{{ message.dynasty }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import request from "@/api/request.js"; // 确保这是你的请求方法的路径

const route = useRoute();
const router = useRouter();
const messageId = ref<number>(
  parseInt(route.params.winePaintingDetailId as string, 10)
);
const message = ref<any>(null);

const fetchMessageDetail = async () => {
  try {
    const res = await request.get(`poemsimages/api/getPoemById`, {
      params: { id: messageId.value },
    });
    if (res.code === 200 && res.data) {
      message.value = res.data;
    } else {
      message.value = {
        image: "未找到酒画",
        dynasty: "",
        imagename: "该酒画不存在。",
      };
    }
  } catch (error) {
    console.error("请求失败:", error);
    message.value = {
      image: "未找到酒画",
      dynasty: "",
      imagename: "请求失败。",
    };
  }
};

onMounted(() => {
  fetchMessageDetail();
});

const goBack = () => {
  router.back(); // 使用 router.back() 来模拟浏览器的后退功能
};
</script>

<style lang="less" scoped>
.detail {
  padding: 2vw;
  background: #f6f3e5;
  border-radius: 1vw;
  .back-button {
    margin-bottom: 2vw;
  }
  .content {
    font-family: Source Han Sans;
    text-align: center;
    h1 {
      font-family: Source Han Sans;
      font-variation-settings: "opsz" auto;
      font-feature-settings: "kern" on;
      font-size: 2rem;
      color: #3d3d3d;
      margin-bottom: 1vw;
    }
    h3 {
      font-size: 1.5rem;
      font-variation-settings: "opsz" auto;
      font-feature-settings: "kern" on;
      color: #908d8d;
      margin-bottom: 1vw;
    }
    p {
      font-size: 1.2rem;
      line-height: 1.8rem;
      color: #908d8d;
      white-space: pre-wrap;
      margin-bottom: 2vw;
      text-indent: 2em; /* 每段首行缩进两个字符 */
    }
  }
}
</style>