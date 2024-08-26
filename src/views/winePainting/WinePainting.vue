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
        <el-button
          type="primary"
          color="#7D3030"
          class="sbutton"
          @click="search"
        >
          搜索
        </el-button>
      </div>
    </div>

    <div id="rank" ref="rank" class="rank">
      分类统计
      <div id="rank1" ref="rank1" class="rank1"></div>
    </div>

    <div class="text">
      <h3>共{{ messages.length }}条数据</h3>
      <hr />
      <div id="imgs">
        <div
          class="card"
          v-for="message in messages"
          :key="message.id"
          v-bind:title="message.title"
        >
          <img class="img" :src="message.src" @click="viewDetail(message.id)" />
          <br />
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
          :total="messages.length"
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
import type { ComponentSize } from "element-plus";

const input = ref("");
const currentPage4 = ref(1);
const pageSize4 = ref(10);
const size = ref<ComponentSize>("default");

const messages = ref([
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
  // 其他图片数据
]);

const markCharts = () => {
  var chartDom = document.getElementById("rank1");
  var myChart = echarts.init(chartDom);
  var option = {
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

const viewDetail = (id: string) => {
  // 跳转到详情页，并传递 id 参数
  window.location.href = `/WinePaintingDetail/${id}`;
};

const handlePageChange = (page: number) => {
  currentPage4.value = page;
};

const search = () => {
  // 你可以在这里实现搜索功能
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
    background: #f6f3e5;
    
    .rank1 {
      position: absolute;
      left: 1vw;
      top: 4vw;
      width: 19vw;
      height: 17vw;
      border-radius: 1vw;
      box-sizing: border-box;
      border: 1px solid #7d3030;
    }
  }
  
  .text {
    position: absolute;
    left: 32vw;
    top: 14vw;
    width: 60vw;
    height: 56vw; /* Changed to auto to fit content */
    border-radius: 1px;
    background: #f6f3e5;
    padding: 1vw;
    #imgs {
      margin-top: 1vw;
      display: flex;
      flex-wrap: wrap;
      justify-content: center; /* Center the images */
      align-content: flex-start;
    }
    
    .card {
      margin-top: 1vw;
      width: 17vw;
      height: 14vw;
      display: flex;
      flex-wrap: wrap;
      justify-content: center; /* Center cards */
      margin-bottom: 1vw;
      margin-left: 0; /* Adjust left margin */
    }
    
    .card .img {
      height: 14vw;
      width: 11vw;
    }
    
    .demo-pagination-block {
      width: 100%; /* Full width to center */
      display: flex;
      justify-content: center; /* Center pagination */
      align-items: center;
      margin-top: 1vw; /* Space between images and pagination */
    }
  }
}
</style>
