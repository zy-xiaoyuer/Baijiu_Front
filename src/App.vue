<template>
  <keep-alive><router-view /></keep-alive>
</template>

<style lang="less">
// 去除滚动条

::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
</style>
