<template>
  <div class="about">
    <div class="common-layout1">
      <el-card
        style="
          max-width: 14vw;
          position: relative;
          width: 18vw;
          top: 6vw;
          left: 32vw;
          margin-left: 2vw;
          margin-bottom: 2vw;
        "
        class="1"
      >
        <!-- <template #header>Yummy hamburger</template> -->
        <img
          src="https://img.zcool.cn/community/015e215bfb7bf0a80120925252effc.jpg@2o.jpg"
          style="width: 12vw"
        />
      </el-card>
      <el-container>
        <el-header class="header11">出处:XXX</el-header>
        <el-main class="main11">相关描述</el-main>
        <el-footer class="footer11">XXX </el-footer>
      </el-container>
    </div>
  </div>
</template>

<style lang="less" scoped>
.about {
  background-image: url("@/assets/images/background.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 96vw;
  margin-left: 2vw;
  padding: 0 0 5vw 0;
  .common-layout1 {
    position: relative;
    left: 3vw;
    top: 2vw;
    width: 88vw;
    height: 44vw;
    border-radius: 1vw;
    opacity: 1;

    background: #f6f3e5;
    .header11 {
      position: relative;
      left: 52vw;
      top: 6vw;
      width: 12vw;
      height: 3vw;
      opacity: 1;

      font-family: Source Han Sans;
      font-size: 1vw;
      font-weight: normal;
      line-height: normal;
      letter-spacing: 0em;

      font-variation-settings: "opsz" auto;
      font-feature-settings: "kern" on;
      color: #908d8d;
    }
    .main11 {
      position: relative;
      left: 4vw;
      top: 9vw;
      width: 12vw;
      height: 3vw;
      opacity: 1;

      font-family: Source Han Sans;
      font-size: 1vw;
      font-weight: normal;
      line-height: normal;
      letter-spacing: 0em;

      font-variation-settings: "opsz" auto;
      font-feature-settings: "kern" on;
      color: #3d3d3d;
    }
    .footer11 {
      position: relative;
      left: 6vw;
      top: 10vw;
      width: 66vw;
      height: 4vw;
      opacity: 1;

      font-family: Source Han Sans;
      font-size: 1vw;
      font-weight: normal;
      line-height: normal;
      letter-spacing: 0em;

      font-variation-settings: "opsz" auto;
      font-feature-settings: "kern" on;
      color: #908d8d;
    }
  }
}
</style>
