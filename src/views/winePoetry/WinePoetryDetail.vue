<template>
  <div class="detail">
    <div class="back-button">
      <el-button
        type="primary"
        @click="goBack"
        >返回</el-button
      >
    </div>
    <div
      class="content"
      v-if="poetry"
    >
      <h1>{{ poetry.title }}</h1>
      <h3>{{ poetry.author }}</h3>
      <p class="poetry-content">{{ poetry.content }}</p>
      <div class="additional-info">
        <p><strong>作诗地点：</strong>{{ poetry.place }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import request from "@/api/request"; // 确保这是你的请求方法的路径

const route = useRoute();
const router = useRouter();
const poetryId = ref<number>(
  parseInt(route.params.winePoetryDetailId as string, 10)
);
const poetry = ref<any>(null);

const fetchPoetryDetail = async () => {
  try {
    const res = await request.get(`poemsbydynasty/api/getPoemById`, {
      params: { id: poetryId.value },
    });
    if (res.code === 200 && res.data) {
      poetry.value = res.data;
    } else {
      poetry.value = {
        title: "未找到诗词",
        author: "",
        content: "该诗词不存在。",
        place: "",
        characters: [],
      };
    }
  } catch (error) {
    console.error("请求失败:", error);
    poetry.value = {
      title: "未找到诗词",
      author: "",
      content: "请求失败。",
      place: "",
      characters: [],
    };
  }
};

onMounted(() => {
  fetchPoetryDetail();
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
  .additional-info {
    text-align: left;
    font-size: 1rem;
    color: #444;
    margin-top: 2vw;
    p {
      margin: 0.5vw 0;
      color: #3d3d3d;
    }
    ul {
      list-style: none;
      padding: 0;
      li {
        margin: 0.5vw 0;
        text-indent: 2em; /* 每段首行缩进两个字符 */
      }
    }
  }
}
</style>
