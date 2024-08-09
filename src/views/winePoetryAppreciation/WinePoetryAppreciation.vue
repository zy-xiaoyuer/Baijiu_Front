<template>
  <div class="appreciationMain">
    <div class="poetryMap">
      <poetryMap></poetryMap>
    </div>
    <div class="poetryRank">
      <poetryRank></poetryRank>
    </div>
    <div class="poetryImages">
      <div class="wordCloud">
        <wordCloud></wordCloud>
      </div>
      <div class="hotMap">
        <hotMap></hotMap>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import poetryMap from "@/views/winePoetryAppreciation/PoetryMap";
import poetryRank from "@/views/winePoetryAppreciation/PoetryRank";
import wordCloud from "@/views/winePoetryAppreciation/WordCloud";
import hotMap from "@/views/winePoetryAppreciation/HotMap";
</script>

<style lang="less" scoped>
.appreciationMain {
  background-image: url("@/assets/images/background.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 96vw;
  margin-left: 2vw;
  padding: 0 0 5vw 0;
}
</style>
