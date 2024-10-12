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
      v-if="message && message.age"
    >
      <img
        class="img"
        v-if="message.picture"
        :src="getImageUrl(message.picture)"
        alt="酒器图片"
        @error="handleImageError"
      />
      <h3>{{ message.now }}</h3>
      <p class="poetry-content">{{ message.age }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";
import request from "@/api/request.js";
import { globals } from "@/main";

const route = useRoute();
const router = useRouter();
const messageId = ref(parseInt(route.params.wineVesselDetailId as string, 10));
const message = ref({
  picture: "",
  now: "",
  age: "",
});

// 定义getImageUrl函数
const getImageUrl = (picture: string) => {
  const imageUrl =
    globals.$config?.serverUrl + `/upload/${picture.split("\\").pop()}`;
  console.log("Image URL:", imageUrl);
  return imageUrl;
};

const fetchMessageDetail = async () => {
  try {
    const res = await request.get(`/vessel/api/getPoemById`, {
      params: { id: messageId.value },
    });
    console.log("Response:", res);
    if (res.code === 200) {
      message.value = res.data;
      console.log("Picture from backend:", message.value.picture); // 确认 picture 有值
    } else {
      message.value.age = "该酒画不存在。";
    }
  } catch (error) {
    console.error("请求失败:", error);
    message.value.age = "请求失败。";
  }
};

onMounted(() => {
  fetchMessageDetail();
});

const goBack = () => {
  router.back();
};

const handleImageError = (event) => {
  console.error("Image load error:", event);
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
      text-indent: 2em;
    }
  }
}
.img {
  // width: 80%;
}
</style>
