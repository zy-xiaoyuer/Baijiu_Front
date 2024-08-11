<template>
  <div class="about">
    <h1>酒画</h1>
    <el-button
      link
      @click="toggleChange"
      class="btn"
    >
      跳转查看酒画细节
    </el-button>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

// 跳转登录
const toggleChange = () => {
  window.location.href = "/WinePaintingDetail";
};

// 回到顶部

onMounted(() => {
  //
});

onUnmounted(() => {
  //
});
</script>
