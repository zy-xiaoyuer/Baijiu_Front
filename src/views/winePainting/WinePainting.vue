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

    <div
      id="rank"
      ref="rank"
      class="rank"
    >
      分类统计
      <div
        id="rank1"
        ref="rank1"
        class="rank1"
      ></div>
    </div>

    <div class="text">
      <h3>共{{ total }}条数据</h3>
      <hr />
      <div id="imgs">
        <div
          class="card"
          v-for="message in paginatedMessages"
          :key="message.id"
          v-bind:title="message.title"
        >
          <img
            class="img"
            :src="message.src"
            @click="viewDetail(message.id)"
          />
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
          :total="total"
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, ref, computed } from "vue";
import type { ComponentSize } from "element-plus";

const input = ref("");
const currentPage4 = ref(1);
const pageSize4 = ref(10);
const size = ref<ComponentSize>("default");

const messages = ref<any[]>([
  {
    id: "1",
    title: "酒画1",
    src: "https://img.zcool.cn/community/015e215bfb7bf0a80120925252effc.jpg@1280w_1l_2o_100sh.jpg",
    dynasty: "唐朝",
  },
  {
    id: "2",
    title: "酒画2",
    src: "https://img.zcool.cn/community/015e215bfb7bf0a80120925252effc.jpg@1280w_1l_2o_100sh.jpg",
    dynasty: "唐朝",
  },
  {
    id: "3",
    title: "酒画3",
    src: "https://img.zcool.cn/community/015e215bfb7bf0a80120925252effc.jpg@1280w_1l_2o_100sh.jpg",
    dynasty: "唐朝",
  },
  {
    id: "4",
    title: "酒画4",
    src: "https://img.zcool.cn/community/015e215bfb7bf0a80120925252effc.jpg@1280w_1l_2o_100sh.jpg",
    dynasty: "唐朝",
  },
  {
    id: "5",
    title: "酒画4",
    src: "https://img.zcool.cn/community/015e215bfb7bf0a80120925252effc.jpg@1280w_1l_2o_100sh.jpg",
    dynasty: "唐朝",
  },
  {
    id: "6",
    title: "酒画6",
    src: "https://img.zcool.cn/community/015e215bfb7bf0a80120925252effc.jpg@1280w_1l_2o_100sh.jpg",
    dynasty: "唐朝",
  },
  {
    id: "7",
    title: "酒画7",
    src: "https://img.zcool.cn/community/015e215bfb7bf0a80120925252effc.jpg@1280w_1l_2o_100sh.jpg",
    dynasty: "唐朝",
  },
  {
    id: "8",
    title: "酒画8",
    src: "https://img.zcool.cn/community/015e215bfb7bf0a80120925252effc.jpg@1280w_1l_2o_100sh.jpg",
    dynasty: "唐朝",
  },
  {
    id: "9",
    title: "酒画9",
    src: "https://img.zcool.cn/community/015e215bfb7bf0a80120925252effc.jpg@1280w_1l_2o_100sh.jpg",
    dynasty: "唐朝",
  },
  // 其他图片数据
]);
// 用于存储过滤后的信息
const filteredMessages = ref<any[]>(messages.value);

const total = computed(() => filteredMessages.value.length);

const paginatedMessages = computed(() => {
  const start = (currentPage4.value - 1) * pageSize4.value;
  return filteredMessages.value.slice(start, start + pageSize4.value);
});

const search = () => {
  const query = input.value.toLowerCase();
  filteredMessages.value = messages.value.filter((message) =>
    message.title.toLowerCase().includes(query)
  );
  currentPage4.value = 1; // 搜索后重置分页到第一页
};

const handlePageChange = (page: number) => {
  currentPage4.value = page;
};

const markCharts = () => {
  const chartDom = document.getElementById("rank1");
  const myChart = echarts.init(chartDom);
  const option = {
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

  myChart.on("click", (params) => {
    const selectedItem = params.name; // 获取被点击的项
    filterMessagesByCategory(selectedItem); // 根据点击的项筛选数据
  });
};

const filterMessagesByCategory = (selectedItem: string) => {
  filteredMessages.value = messages.value.filter((message) => {
    return message.dynasty === selectedItem;
  });
  currentPage4.value = 1; // 筛选后重置分页到第一页
};

onMounted(() => {
  setTimeout(() => {
    markCharts();
  }, 1000);
});

const viewDetail = (id: string) => {
  window.location.href = `/WinePaintingDetail/${id}`;
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
