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

      <div id="imgs">
        <div
          class="card"
          v-for="message in messages"
          :key="message.id"
          v-bind:title="message.title"
        >
          <img class="img" :src="message.src" @click="toOut2"/><br />
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

const activeNames = ref(["1"]);
const handleChange = (val: string[]) => {
  console.log(val);
};
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

const toOut2 = () => {
  window.location.href = "/WineVesselDetail";
};
</script>
  
<script lang="ts">
export default {
  data() {
    return {
      messages: [
        {
          id: "1",
          title: "酒器1",
          src: "http://inews.gtimg.com/newsapp_bt/0/14521737333/641",
        },
        {
          id: "2",
          title: "酒器2",
          src: "http://inews.gtimg.com/newsapp_bt/0/14521737333/641",
        },
        {
          id: "3",
          title: "酒器3",
          src: "http://inews.gtimg.com/newsapp_bt/0/14521737333/641",
        },
        {
          id: "4",
          title: "酒器4",
          src: "http://inews.gtimg.com/newsapp_bt/0/14521737333/641",
        },
        {
          id: "5",
          title: "酒器4",
          src: "http://inews.gtimg.com/newsapp_bt/0/14521737333/641",
        },
        {
          id: "6",
          title: "酒器6",
          src: "http://inews.gtimg.com/newsapp_bt/0/14521737333/641",
        },
        {
          id: "7",
          title: "酒器7",
          src: "http://inews.gtimg.com/newsapp_bt/0/14521737333/641",
        },
        {
          id: "8",
          title: "酒器8",
          src: "http://inews.gtimg.com/newsapp_bt/0/14521737333/641",
        },
        {
          id: "9",
          title: "酒器9",
          src: "http://inews.gtimg.com/newsapp_bt/0/14521737333/641",
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
    .page{
      position: relative;
      left: 15vw;
      top: 1vw;
      width: 12vw;
      height: 1vw;
      opacity: 1;
      box-sizing: border-box;
    }
    .demo-pagination-block {
      position: relative;
      left: -29vw;
      height: 90vw;
      display: flex;
      justify-content: center; /* 使分页组件居中对齐 */
      align-items: center;
      margin-top: 2vw; /* 调整与图片的间距 */
    }
  }
  .imgs {
    // width: 10vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: flex-start;
  }
  .card {
    /*height: 300px;*/
    // padding: 0.5vw;
    // margin: 0.5vw;
    width: 17vw;
    height: 14vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    float: left;
    margin-bottom: 1vw;
    margin-left: 2vw;
  }
  .card .img {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    float: left;
    /*height: 250px;*/
    height: 14vw;
    width: 16vw;
    // margin-right: 0.5vw;
    // vertical-align: middle;
    // max-width: 10%;
  }
}
</style>
