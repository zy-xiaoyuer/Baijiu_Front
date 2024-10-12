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
      v-if="message && message.imagename"
    >
      <img
        class="img"
        v-if="message.image"
        :src="getImageUrl(message.image)"
        alt="酒画图片"
        @error="handleImageError"
      />
      <h3>{{ message.imagename }}</h3>
      <p class="poetry-content">{{ message.dynasty }}</p>
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
const messageId = ref(
  parseInt(route.params.winePaintingDetailId as string, 10)
);
const message = ref({
  image: "",
  dynasty: "",
  imagename: "",
});

const getImageUrl = (image: string) => {
  const imageUrl =
    globals.$config?.serverUrl + `/upload/${image.split("\\").pop()}`;
  console.log("Image URL:", imageUrl);
  return imageUrl;
};

const fetchMessageDetail = async () => {
  try {
    const res = await request.get(`/poemimages/api/getPoemById`, {
      params: { id: messageId.value },
    });
    console.log("Response:", res);
    if (res.code === 200) {
      message.value = res.data;
      console.log("Picture from backend:", message.value.image); // 确认 picture 有值
    } else {
      message.value.imagename = "该酒画不存在。";
    }
  } catch (error) {
    console.error("请求失败:", error);
    message.value.imagename = "请求失败。";
  }
};

const handleImageError = (event) => {
  console.error("Image load error:", event);
};

onMounted(() => {
  fetchMessageDetail();
});

const goBack = () => {
  router.back();
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
.img {
  width: 50%;
}
</style>
