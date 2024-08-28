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
        <el-button type="primary" class="sbutton">搜索</el-button>
      </div>
    </div>

    <div id="rank" class="rank">
      分类统计
      <div id="rank1" class="rank1">朝代</div>
    </div>

    <div class="text">
      <h3>共{{ total }}条数据</h3>
      <hr />
      <div id="imgs">
        <div
          class="card"
          v-for="message in paginatedMessages"
          :key="message.id"
          :title="message.title"
        >
          <img class="img" :src="message.src" @click="viewDetail(message.id)" />
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
import { onMounted, ref, computed } from "vue";
import * as echarts from "echarts";
import type { ComponentSize } from "element-plus";

const input = ref("");
const currentPage4 = ref(1);
const pageSize4 = ref(10);
const size = ref<ComponentSize>("default");

const messages = ref<any[]>([
  {
    id: "1",
    title: "酒器1",
    src: "http://inews.gtimg.com/newsapp_bt/0/14521737333/641",
    dynasty: "唐朝",
  },
  {
    id: "2",
    title: "酒器2",
    src: "http://inews.gtimg.com/newsapp_bt/0/14521737333/641",
    dynasty: "唐朝",
  },
  {
    id: "3",
    title: "酒器3",
    src: "http://inews.gtimg.com/newsapp_bt/0/14521737333/641",
    dynasty: "唐朝",
  },
  {
    id: "4",
    title: "酒器4",
    src: "http://inews.gtimg.com/newsapp_bt/0/14521737333/641",
    dynasty: "唐朝",
  },
  {
    id: "5",
    title: "酒器5",
    src: "http://inews.gtimg.com/newsapp_bt/0/14521737333/641",
    dynasty: "唐朝",
  },
  {
    id: "6",
    title: "酒器6",
    src: "http://inews.gtimg.com/newsapp_bt/0/14521737333/641",
    dynasty: "唐朝",
  },
  {
    id: "7",
    title: "酒器7",
    src: "http://inews.gtimg.com/newsapp_bt/0/14521737333/641",
    dynasty: "唐朝",
  },
  {
    id: "8",
    title: "酒器8",
    src: "http://inews.gtimg.com/newsapp_bt/0/14521737333/641",
    dynasty: "唐朝",
  },
  {
    id: "9",
    title: "酒器9",
    src: "http://inews.gtimg.com/newsapp_bt/0/14521737333/641",
    dynasty: "唐朝",
  },
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
  filteredMessages.value = messages.value.filter(message =>
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
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: { data: ["朝代"] },
    grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
    xAxis: [{ type: "value", show: false }],
    yAxis: [
      {
        type: "category",
        axisTick: { show: false },
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
        label: { show: false },
        emphasis: { focus: "series" },
        data: [200, 170, 240, 244, 200, 220, 210, 150],
      },
    ],
  };
  myChart.setOption(option);

  myChart.on('click', (params) => {
    const selectedItem = params.name; // 获取被点击的项
    filterMessagesByCategory(selectedItem); // 根据点击的项筛选数据
  });
};

const filterMessagesByCategory = (selectedItem: string) => {
  filteredMessages.value = messages.value.filter(message => {
    return message.dynasty === selectedItem;
  });
  currentPage4.value = 1; // 筛选后重置分页到第一页
};

onMounted(() => {
  setTimeout(markCharts, 1000);
});

const viewDetail = (id: string) => {
  window.location.href = `/WineVesselDetail/${id}`;
};

</script>

<style lang="less" scoped>
.about {
  background-image: url("@/assets/images/background.jpg");
  background-size: cover;
  width: 96vw;
  height: 62vw;
  margin-left: 2vw;
  padding-bottom: 5vw;
  .serachTop {
    height: 25vw;
    width: 100%;
    background-size: cover;
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
      border: 1px solid #7d3030;
    }
  }
  .text {
    position: absolute;
    left: 32vw;
    top: 14vw;
    width: 60vw;
    height: 54vw;
    border-radius: 1px;
    background: #f6f3e5;
    padding: 1vw;
    .demo-pagination-block {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 2vw;
    }
  }
  #imgs {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .card {
    width: 17vw;
    height: 14vw;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1vw;
  }
  .img {
    height: 14vw;
    width: 16vw;
  }
}
</style>
