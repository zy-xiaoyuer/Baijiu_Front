<template>
  <div class="about">
    <div class="serachTop">
      <div class="serach">
        <el-input
          class="input"
          v-model="input"
          placeholder="检索你感兴趣的内容"
          clearable
        />
        <el-button type="primary" color="#7D3030" class="sbutton"
          >搜索</el-button
        >
      </div>
    </div>

    <div id="rank" ref="rank" class="rank">
      分类统计
      <div id="rank1" ref="rank1" class="rank1">朝代</div>
    </div>

    <div class="text">
      <h3>共100条数据</h3>
      <hr />
      <el-button
        link
        @click="toOut2"
        class="btn"
        style="position: absolute; width: 115vw; top: 4vw"
      >
        查看酒器细节
      </el-button>
      <el-card style="max-width: 14vw">
        <!-- <template #header>Yummy hamburger</template> -->
        <img
          src="http://inews.gtimg.com/newsapp_match/0/14521737333/0"
          style="width: 12vw"
        />
      </el-card>
      <el-card style="max-width: 14vw">
        <!-- <template #header>Yummy hamburger</template> -->
        <img
          src="http://inews.gtimg.com/newsapp_match/0/14521737333/0"
          style="width: 12vw"
        />
      </el-card>
      <el-card style="max-width: 14vw">
        <!-- <template #header>Yummy hamburger</template> -->
        <img
          src="http://inews.gtimg.com/newsapp_match/0/14521737333/0"
          style="width: 12vw"
        />
      </el-card>
      <el-space class="vertical">
        <el-space
          >前往 <el-input-number v-model="num" />页
          <template #decrease-icon>
            <el-icon>
              <ArrowDown />
            </el-icon>
          </template>
        </el-space>
      </el-space>
    </div>
  </div>
</template>
<script lang="ts" setup>
import geoJson from "@/assets/json/china.json";
import * as echarts from "echarts";
import poi from "@/assets/json/position.json";
import "echarts-gl";
import {
  onMounted,
  ref,
  watch,
  onUnmounted,
  reactive,
  computed,
  methods,
} from "vue";
import { textProps } from "element-plus";
import type { ComponentSize } from "element-plus";
import { ArrowDown, ArrowUp, Minus, Plus } from "@element-plus/icons-vue";

const activeNames = ref(["1"]);
const handleChange = (val: string[]) => {
  console.log(val);
};
const num = ref(1);

const size = ref<ComponentSize>("default");

const nowClientWidth1 = reactive({
  value: window.innerWidth,
});

function handleResize1() {
  nowClientWidth1.value = window.innerWidth;
  initChart1();
  console.log(nowSize1(1));
}

const nowSize1 = (val: number) => {
  const initWidth = 1920;
  return val * (nowClientWidth1.value / initWidth);
};
let myChart1 = null;
const initChart1 = () => {
  const mapChart1: HTMLElement = document.getElementById(
    "rank1"
  ) as HTMLElement;
  if (myChart1) {
    myChart1.dispose();
  }
  let xData = [23, 24, 36, 38, 43, 48, 49, 96];
  let yData = [
    "先秦",
    "汉朝",
    "魏晋",
    "南北朝",
    "隋朝",
    "唐朝",
    "宋朝",
    "辽朝",
  ];
  myChart1 = echarts.init(mapChart1);
  // 绘制图表
  let option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      textStyle: {
        fontSize: nowSize1(1),
      },
    },
    legend: {},
    grid: {
      left: nowSize1(0) + "%",
      right: nowSize1(0) + "%",
      bottom: nowSize1(0) + "%",
      top: nowSize1(20) + "%",
      containLabel: true,
    },
    xAxis: {
      show: false,
      type: "value",
      boundaryGap: [0, 0.01],
      splitLine: {
        show: false, // 不显示网格线
      },
    },
    yAxis: [
      {
        //   show: false,
        type: "category",
        axisTick: {
          show: false, // 不显示坐标轴刻度线
        },
        axisLine: {
          show: false, // 不显示坐标轴线
        },
        position: "left",
        axisLabel: {
          show: true,
          fontSize: nowSize1(20),
          color: "#3D3D3D",
        },
        data: yData,
      },
    ],
    series: [
      {
        // name: "2011",
        type: "bar",
        data: xData,
        itemStyle: {
          color: "#7D3030",
          shadowColor: "#7b4885",
          shadowOffsetX: nowSize1(0),
          shadowOffsetY: nowSize1(0),
          shadowBlur: nowSize1(1),
        },
        label: {
          show: false,
          position: "right",
          // color: "#9d7294",
          offset: [nowSize1(0), 0],
          textStyle: {
            fontSize: nowSize1(2),
          },
        },
      },
    ],
  };
  myChart1.setOption(option);
};
onMounted(() => {
  initChart1();
  window.addEventListener("resize", handleResize1);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize1);
});

const toOut2 = () => {
  window.location.href = "/WineVesselDetail";
};
</script>
  <style lang="less" scoped>
.about {
  background-image: url("@/assets/images/background.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 96vw;
  margin-left: 2vw;
  padding: 0 0 5vw 0;
  .serachTop {
    height: 25vw;
    width: 100vw;
    margin-left: -2vw;
    background-size: 100% 100%;
    // border: 1px solid #000;
    .serach {
      padding: 1vw 0 0 37vw;
      .input {
        width: 24vw;
        margin-right: 1vw;
        font-size: 0.8rem;
      }
      .sbutton {
        font-size: 1rem;
      }
    }
  }
  .rank {
    position: relative;
    padding: 2vw;
    left: 2vw;
    top: -12vw;
    width: 18vw;
    height: 23vw;
    border-radius: 1vw;
    opacity: 1;

    background: #f6f3e5;
    .rank1 {
      position: absolute;
      left: 1vw;
      top: 4vw;
      width: 19vw;
      height: 17vw;
      border-radius: 1vw;
      opacity: 1;

      box-sizing: border-box;
      border: 1px solid #7d3030;
    }
  }
  .text {
    position: absolute;
    // padding: 2vw;
    left: 32vw;
    top: 8vw;
    width: 60vw;
    height: 53vw;
    border-radius: 1px;
    opacity: 1;

    background: #f6f3e5;
    .el-descriptions {
      margin-top: 1vw;
      padding: 0.5vw;
      background-color: #f6f3e5;
    }
    .margin-top1 {
      margin-top: 1vw;
    }
    .margin-top2 {
      margin-top: 1vw;
    }
    .margin-top3 {
      margin-top: 1vw;
    }
    .margin-top4 {
      margin-top: 1vw;
    }
    .margin-top5 {
      margin-top: 1vw;
    }
    .margin-top6 {
      margin-top: 1vw;
    }
    .vertical {
      position: relative;
      left: 24vw;
      top: 7vw;
      width: 12vw;
      height: 1vw;
      opacity: 1;

      // background: #ffffff;

      box-sizing: border-box;
      // border: 1px solid rgba(145, 119, 119, 0.8);
    }
  }
}
</style>
