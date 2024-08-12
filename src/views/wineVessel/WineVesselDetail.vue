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
          src="http://inews.gtimg.com/newsapp_match/0/14521737333/0"
          style="width: 12vw"
        />
      </el-card>
      <el-container>
        <el-header
          style="
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

            font-variation-settings: 'opsz' auto;
            font-feature-settings: 'kern' on;
            color: #908D8D;
          "
          >出处:XXX</el-header
        >
        <el-main
          style="
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

            font-variation-settings: 'opsz' auto;
            font-feature-settings: 'kern' on;
            color: #3D3D3D;
          "
          >相关描述</el-main
        >
        <el-footer
          style="
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

            font-variation-settings: 'opsz' auto;
            font-feature-settings: 'kern' on;
            color: #908d8d;
          "
          >方彝是中国古代盛酒器,盛行于商晚期至西周中期。方彝的造型特征是长方形器身,带盖,直口,直腹,圈足。器盖上小底大,做成斜坡式屋顶形,圈足上往往每边都有一个缺口。方彝的盖与器身往往铸有4条或8条凸起的扉棱,全器满饰云雷纹地,上凸雕出兽面、动物等纹样，给人以庄重华丽的感觉。
</el-footer
        >
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
  }
}
</style>

