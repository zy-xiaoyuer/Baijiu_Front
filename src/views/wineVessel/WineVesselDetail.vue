<template>
  <div class="detail">
    <div class="back-button">
      <el-button type="primary" @click="goBack">返回</el-button>
    </div>
    <div class="content" v-if="message">
      <img v-if="message.picture" :src="getImageUrl(message.picture)" alt="酒器" style="width: 100%; height: auto;" @error="handleImageError" />
      <h3>{{ message.now }}</h3>
      <p class="poetry-content">{{ message.age }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import request from '@/api/request.js';

const instance = getCurrentInstance();
const globalProperties = instance.appContext.config.globalProperties;
const httpURL = ref(globalProperties.$httpURL);
const getImageURL = ref(globalProperties.$getimageURL);

const route = useRoute();
const router = useRouter();
const messageId = ref<number>(parseInt(route.params.wineVesselDetailId as string, 10));
const message = ref<any>(null);
const imageUrl = ref(''); 

// 定义getImageUrl函数
const getImageUrl = (picture) => {
  if (picture.startsWith('http')) {
    return picture;
  }
  return `${getImageURL.value}/${picture}`;
};

const fetchMessageDetail = async () => {
  try {
    const res = await request.get(`/vessel/api/getPoemById`, {
      params: { id: messageId.value },
    });
    console.log("Response:", res); 
    if (res.code === 200 && res.data) {
      message.value = res.data;
      if (message.value.picture instanceof ArrayBuffer) {
        const byteCharacters = new Uint8Array(message.value.picture);
        const byteNumbers = Array.from(byteCharacters).map(byte => String.fromCharCode(byte));
        const base64Image = btoa(byteNumbers.join(''));
        imageUrl.value = `data:image/jpeg;base64,${base64Image}`;
      } else {
        imageUrl.value = getImageUrl(message.value.picture);
      }
    } else {
      imageUrl.value = ""; 
      message.value = {
        now: "未找到酒器",
        age: "",
        imagename: "该酒器不存在。",
      };
    }
  } catch (error) {
    console.error("请求失败:", error);
    imageUrl.value = ""; 
    message.value = {
      now: "未找到酒器",
      age: "",
      imagename: "请求失败。",
    };
  }
};

onMounted(() => {
  fetchMessageDetail();
});

const goBack = () => {
  router.back(); 
};

const handleImageError = (event) => {
  console.error('Image load error:', event);
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
</style>