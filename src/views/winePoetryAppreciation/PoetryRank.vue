<template>
  <div class="poetryRank">
    <div class="title">
      <img
        class="titleImg"
        src="@/assets/images/titleAppreciation2.png"
      />
    </div>

    <div
      id="ranking"
      ref="ranking"
      class="ranking"
    ></div>
    <div class="textInfo">
      <img
        class="imgInfo"
        src="@/assets/images/infoAppreciation2.png"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import geoJson from "@/assets/json/china.json";
import * as echarts from "echarts";
import poi from "@/assets/json/position.json";
import "echarts-gl";
import { onMounted, ref, watch, onUnmounted, reactive } from "vue";

// 监听窗口变化
// let nowClientWidth = document.documentElement.clientWidth;
// console.log(nowClientWidth);

const nowClientWidth = reactive({
  value: window.innerWidth,
});

function handleResize() {
  nowClientWidth.value = window.innerWidth;
  initChart();
  console.log(nowSize(2));
}

const nowSize = (val: number) => {
  const initWidth = 1920;
  return val * (nowClientWidth.value / initWidth);
};
let myChart = null;
const initChart = () => {
  const mapChart: HTMLElement = document.getElementById(
    "ranking"
  ) as HTMLElement;
  if (myChart) {
    myChart.dispose();
  }
  let xData = [23, 24, 36, 38, 43, 48, 49, 96, 303, 343];
  let yData = [
    "江苏南京(金陵)",
    "陕西渭南(下邽)",
    "湖北荆州(江陵)",
    "重庆(渝州)",
    "江西九江(江州)",
    "四川成都(益州)",
    "浙江杭州(临安)",
    "江苏苏州(苏州)",
    "陕西西安(长安)",
    "河南洛阳(东都)",
  ];
  myChart = echarts.init(mapChart);
  // 绘制图表
  let option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      textStyle: {
        fontSize: nowSize(16),
      },
    },
    legend: {},
    grid: {
      left: nowSize(10) + "%",
      right: nowSize(10) + "%",
      bottom: nowSize(6) + "%",
      top: nowSize(10) + "%",
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
          fontSize: nowSize(20),
          color: "#9d7294",
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
          color: "#d1abc0",
          shadowColor: "#7b4885",
          shadowOffsetX: nowSize(5),
          shadowOffsetY: nowSize(5),
          shadowBlur: nowSize(10),
        },
        label: {
          show: true,
          position: "right",
          color: "#9d7294",
          offset: [nowSize(6), 0],
          textStyle: {
            fontSize: nowSize(20),
          },
        },
      },
    ],
  };
  myChart.setOption(option);
};
onMounted(() => {
  initChart();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style lang="less" scoped>
.poetryRank {
  .title {
    padding-top: 2vw;
    .titleImg {
      height: 3vw;
      width: 100vw;
      margin: 2vw 0 0 -2vw;
    }
  }

  .ranking {
    display: inline-block;
    background-color: #f6f3e5;
    margin: 5vw 0 0 15vw;

    width: 40vw;
    height: 62vh;
    border-radius: 20px;
  }
  .textInfo {
    position: absolute;
    display: inline-block;
    width: 22vw;
    height: 80vh;
    // background-color: #f6f3e5;
    margin: 5vw 0 0 5vw;
    .imgInfo {
      width: 100%;
    }
  }
}
</style>
