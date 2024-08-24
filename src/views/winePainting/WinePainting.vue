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
        <el-button type="primary" color="#7D3030" class="sbutton">
          搜索
        </el-button>
      </div>
    </div>

    <div id="rank" ref="rank" class="rank">
      分类统计
      <div id="rank1" ref="rank1" class="rank1"></div>
    </div>

    <div class="text">
      <h3>共100条数据</h3>
      <hr />
      <div id="imgs">
        <div
          class="card"
          v-for="message in messages"
          :key="message.id"
          v-bind:title="message.title"
        >
          <img class="img" :src="message.src" @click="toOut3" /><br />
        </div>
      </div>
      <div class="demo-pagination-block">
        <el-pagination
          v-model:current-page="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[10, 20, 30, 40]"
          :size="size"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="10"
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import geoJson from "@/assets/json/china.json";
import * as echarts from "echarts";
// import poi from "@/assets/json/position.json";
// import "echarts-gl";
import {
  onMounted,
  ref,
  watch,
  onUnmounted,
  reactive,
  computed,
  methods,
} from "vue";
// import { textProps } from "element-plus";
import type { ComponentSize } from "element-plus";
// import { ArrowDown, ArrowUp, Minus, Plus } from "@element-plus/icons-vue";

const input = ref("");

const activeNames = ref(['1'])
const handleChange = (val: string[]) => {
  console.log(val)
}
const num = ref(1);

const size = ref<ComponentSize>("default");

const markCharts = () => {
  var chartDom = document.getElementById("rank1");
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["朝代"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "value",
        show: false,
      },
    ],
    yAxis: [
      {
        type: "category",
        axisTick: {
          show: false,
        },
        data: [
          "辽朝",
          "宋朝",
          "唐朝",
          "隋朝",
          "南北朝",
          "魏晋",
          "汉朝",
          "先秦",
        ],
      },
    ],
    series: [
      {
        name: "朝代",
        type: "bar",
        color: "#7D3030",
        label: {
          show: false,
          position: "inside",
        },
        emphasis: {
          focus: "series",
        },
        data: [200, 170, 240, 244, 200, 220, 210, 150],
      },
    ],
  };

  option && myChart.setOption(option);
};
  onMounted(async () => {
    setTimeout(() => {
      markCharts();
    }, 1000);
  });

  const toOut3 = () => {
  window.location.href = "/WinePaintingDetail";
};
</script>
 
<script lang="ts">
export default {
  data() {
    return {
      messages: [
        {
          id: "1",
          title: "酒画1",
          src: "https://img.zcool.cn/community/015e215bfb7bf0a80120925252effc.jpg@1280w_1l_2o_100sh.jpg",
        },
        {
          id: "2",
          title: "酒画2",
          src: "https://img.zcool.cn/community/015e215bfb7bf0a80120925252effc.jpg@1280w_1l_2o_100sh.jpg",
        },
        {
          id: "3",
          title: "酒画3",
          src: "https://img.zcool.cn/community/015e215bfb7bf0a80120925252effc.jpg@1280w_1l_2o_100sh.jpg",
        },
        {
          id: "4",
          title: "酒画4",
          src: "https://img.zcool.cn/community/015e215bfb7bf0a80120925252effc.jpg@1280w_1l_2o_100sh.jpg",
        },
        {
          id: "5",
          title: "酒画4",
          src: "https://img.zcool.cn/community/015e215bfb7bf0a80120925252effc.jpg@1280w_1l_2o_100sh.jpg",
        },
        {
          id: "6",
          title: "酒画6",
          src: "https://img.zcool.cn/community/015e215bfb7bf0a80120925252effc.jpg@1280w_1l_2o_100sh.jpg",
        },
        {
          id: "7",
          title: "酒画7",
          src: "https://img.zcool.cn/community/015e215bfb7bf0a80120925252effc.jpg@1280w_1l_2o_100sh.jpg",
        },
        {
          id: "8",
          title: "酒画8",
          src: "https://img.zcool.cn/community/015e215bfb7bf0a80120925252effc.jpg@1280w_1l_2o_100sh.jpg",
        },
        {
          id: "9",
          title: "酒画9",
          src: "https://img.zcool.cn/community/015e215bfb7bf0a80120925252effc.jpg@1280w_1l_2o_100sh.jpg",
        },
      ],
    };
  },
};
</script>
 
<style lang="less" scoped>
.about {
  background-image: url("@/assets/images/background.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 96vw;
  height: 66vw;
  margin-left: 2vw;
  padding: 0 0 5vw 0;
  .serachTop {
    height: 25vw;
    width: 100vw;
    margin-left: -2vw;
    background-size: 100% 100%;
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
    left: 32vw;
    top: 8vw;
    width: 60vw;
    height: 62vw;
    border-radius: 1px;
    opacity: 1;

    background: #f6f3e5;
    .imgs {
      margin-top: 3vw;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-content: flex-start;
    }
    .card {
      margin-top: 1vw;
      width: 17vw;
      height: 14vw;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      float: left;
      margin-bottom: 1vw;
      margin-left: 3vw;
    }
    .card .img {
      height: 14vw;
      width: 11vw;
    }
    .demo-pagination-block {
      position: relative;
      left: -29vw;
      height: 98vw;
      display: flex;
      justify-content: center; /* 使分页组件居中对齐 */
      align-items: center;
      margin-top: 2vw; /* 调整与图片的间距 */
    }
  }
}
</style>
