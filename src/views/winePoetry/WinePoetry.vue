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
          class="sbutton"
          color="#7D3030"
          @click="handleSearch"
        >
          搜索
        </el-button>
      </div>
    </div>

    <div class="main-content">
      <div
        id="rank"
        ref="rank"
        class="rank"
      >
        分类统计
        <div
          id="rank1"
          ref="rank1"
          class="rank-item1"
        ></div>
        <div
          id="rank2"
          ref="rank2"
          class="rank-item2"
        ></div>
      </div>

      <div class="text">
        <h3>共{{ total }}条数据</h3>
        <hr />
        <div
          v-for="poem in paginatedPoems"
          :key="poem.id"
          class="poem-item-wrapper"
        >
          <router-link
            class="poem-item"
            :to="{
              name: 'winePoetryDetail',
              params: { winePoetryDetailId: poem.id },
            }"
          >
            <div class="poem-header">
              <span class="custom-title">{{ poem.title }}</span>
              <span class="custom-author">{{ poem.author }}</span>
              <span class="custom-type">{{ poem.dynasty }}</span>
            </div>
            <p class="custom-content">{{ poem.content }}</p>
          </router-link>
          <hr />
        </div>
        <div class="demo-pagination-block">
          <el-pagination
            v-model:current-page="currentPage4"
            v-model:page-size="pageSize4"
            :page-sizes="[10, 20, 30, 40]"
            :size="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @current-change="handlePageChange"
            @size-change="handleSizeChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import {
  ref,
  computed,
  reactive,
  onMounted,
  onBeforeUpdate,
  onUpdated,
} from "vue";
import request from "@/api/request.js";
import { ElMessage } from "element-plus";

interface Poem {
  id: number;
  title: string;
  dynasty: string;
  author: string;
  content: string;
  place: string;
  time: number;
  emotion: string;
  emotionList: string;
}

const input = ref("");
const currentPage4 = ref(1);
const pageSize4 = ref(10);
const size = ref("default");

const poems = ref<Poem[]>([]);
const total = ref(0);
const filteredPoems = ref<Poem[]>([]);

const dynastyData = ref({});
const authorData = ref({});

function fetchPoems(searchTerm: string) {
  request
    .post("poemsbydynasty/api/listPage", {
      pageSize: pageSize4.value,
      pageNum: currentPage4.value,
      params: {
        search: searchTerm || input.value,
      },
    })
    .then((res) => {
      console.log("----------------------------------------");
      console.log(res);
      if (res.code === 200) {
        poems.value = res.data;
        filteredPoems.value = res.data;
        total.value = res.total;
      } else {
        ElMessage.error("数据获取失败：" + res.msg);
      }
    });
}

const handleSizeChange = (newSize: number) => {
  // queryParam.pageSize = newSize;
  pageSize4.value = newSize;
  fetchPoems();
};

const handleSearch = () => {
  // queryParam.pageNum = 1; // 重置到第一页
  fetchPoems();
};

const paginatedPoems = computed(() => {
  let start = (currentPage4.value - 1) * pageSize4.value;
  start = 0;
  console.log(
    "paginatedPoems computed value:",
    filteredPoems.value.slice(start, start + pageSize4.value),
    filteredPoems.value
  );
  return filteredPoems.value.slice(start, start + pageSize4.value);
});

const searchPoems = () => {
  // 根据用户输入筛选诗词
  const query = input.value.toLowerCase();
  filteredPoems.value = poems.value.filter(
    (poem) =>
      poem.title.toLowerCase().includes(query) ||
      poem.author.toLowerCase().includes(query) ||
      poem.content.toLowerCase().includes(query)
  );
};

const handlePageChange = (newPage: number) => {
  // queryParam.pageNum = newPage;
  currentPage4.value = newPage;
  // console.log("currentPage4.value:",currentPage4.value,newPage)
  fetchPoems();
};

const fetchPoemsByDynasty = async () => {
  try {
    const response = await request.get("/poemsbydynasty/api/getPoemByIdsearch");
    if (response.code === 200 && response.data) {
      return response.data;
    } else {
      ElMessage.error("获取数据失败：" + response.msg);
    }
  } catch (error) {
    console.error("请求失败:", error);
    ElMessage.error("网络请求失败：" + error.message);
  }
  return [];
};

const initChart = (chartId, category, data) => {
  const chartDom = document.getElementById(chartId);
  if (chartDom) {
    const myChart = echarts.init(chartDom);
    const option = {
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
      legend: { data: [category] },
      grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
      xAxis: [{ type: "value" }],
      yAxis: [{ type: "category", data: Object.keys(data) }],
      series: [
        {
          name: category,
          color: "#7D3030",
          type: "bar",
          data: Object.values(data),
        },
      ],
    };
    myChart.setOption(option);
    // 初始化图表实例并监听点击事件
    myChart.on('click', (params) => {
  if (params.componentType === 'series') {
    const selectedItem = params.name; // 获取被点击的项
    console.log("Clicked item:", selectedItem);
    // 执行筛选逻辑
    fetchPoems(selectedItem); // 传递筛选参数
  }
});
  }
};

onMounted(async () => {
  const poemsData = await fetchPoemsByDynasty();
  if (poemsData.length > 0) {
    poemsData.forEach((poem) => {
      dynastyData.value[poem.dynasty] = (dynastyData.value[poem.dynasty] || 0) + 1;
      authorData.value[poem.author] = (authorData.value[poem.author] || 0) + 1;
    });
    // 初始化两个图表
    initChart("rank1", "朝代", dynastyData.value);
    initChart("rank2", "作者", authorData.value);
  }
  fetchPoems();
  console.log("组件第一次加载...", poems.value);
});

onBeforeUpdate(() => {
  console.log("paginatedPoems", paginatedPoems);
});

onUpdated(() => {
  console.log("paginatedPoems onUpdated", paginatedPoems.value);
});
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
    height: 10vw;
    width: 100vw;
    margin-left: -2vw;
    .serach {
      padding: 1vw 0 0 37vw;
      .input {
        width: 24vw;
        margin-right: 1vw;
      }
      .sbutton {
        font-size: 1rem;
      }
    }
  }
  .main-content {
    display: flex;
    align-items: flex-start;
    gap: 2vw;
  }
  .rank {
    position: relative;
    top: -4vw;
    margin-left: 1vw;
    width: 18vw;
    height:88vw;
    background: #f6f3e5;
    border-radius: 1vw;
    padding: 2vw;
    .rank-item1 {
      width: 100%;
      border-radius: 1vw;
      height: 17vw;
      margin-bottom: 3vw;
      border: 1px solid #7d3030;
    }
    .rank-item2 {
      width: 100%;
      border-radius: 1vw;
      height: 67vw;
      margin-bottom: 3vw;
      border: 1px solid #7d3030;
    }
  }
  .text {
    position: relative;
    top: -4vw;
    flex: 1;
    background: #f6f3e5;
    padding: 2vw;
    margin-right: 1vw;
    .poem-item-wrapper {
      margin-bottom: 1vw;
    }
    .poem-item {
      display: flex;
      flex-direction: column;
      background: #f6f3e5;
      border-radius: 0.5vw;
      padding: 1vw;
      position: relative;
      text-decoration: none;
      transition: background-color 0.3s;
      &:hover {
        background-color: #e0d8d1;
      }
    }
    .poem-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5vw;
    }
    .custom-title {
      font-family: "Source Han Sans", sans-serif;
      color: #3d3d3d;
      flex: 2;
      text-align: left;
    }
    .custom-author {
      font-family: "Source Han Sans", sans-serif;
      color: #3d3d3d;
      flex: 1;
      text-align: center;
    }
    .custom-type {
      font-family: "Source Han Sans", sans-serif;
      color: #3d3d3d;
      flex: 1;
      text-align: right;
    }
    .custom-content {
      font-family: "Source Han Sans", sans-serif;
      color: #908d8d;
      margin-top: 0.5vw;
    }
    .demo-pagination-block {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1vw;
    }
  }
}
</style>