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
          class="rank-item"
        ></div>
        <div
          id="rank2"
          ref="rank2"
          class="rank-item"
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
  year?: number;
  tags: string[];
}

const input = ref("");
const currentPage4 = ref(1);
const pageSize4 = ref(10);
const size = ref("default");

const poems = ref<Poem[]>([]);
const total = ref(0);
const filteredPoems = ref<Poem[]>([]);

// const queryParam = reactive({
//   search: '',
//   pageNum: 1,
//   pageSize: 10,
// });

function fetchPoems() {
  request
    .post("poemsbydynasty/api/listPage", {
      pageSize: pageSize4.value,
      pageNum: currentPage4.value,
      params: {
        search: input.value,
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

// 定义 rankData 变量
const rankData = ref<
  { id: string; data: string[]; category: string; seriesData: number[] }[]
>([]);

const markCharts = async (id: string, category: string) => {
  const chartDom = document.getElementById(id);
  if (chartDom) {
    const myChart = echarts.init(chartDom);
    try {
      const response = await request.get("poemsbydynasty/api/getPoemInfoById", {
        params: { category: category },
      });
      if (response.code === 200 && response.data) {
        const data = response.data;
        const option = {
          tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
          legend: { data: [category] },
          grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
          xAxis: [{ type: "value", show: false }],
          yAxis: [
            {
              type: "category",
              axisTick: { show: false },
              data: Object.keys(data),
            },
          ],
          series: [
            {
              name: category,
              type: "bar",
              color: "#7D3030",
              label: { show: false, position: "inside" },
              emphasis: { focus: "series" },
              data: Object.values(data), // 使用接口返回的数据作为数据源
            },
          ],
        };
        myChart.setOption(option);

        // 添加点击事件
        myChart.on("click", (params) => {
          const selectedItem = params.name; // 获取被点击的项
          fetchPoems();
        });
      } else {
        ElMessage.error("数据获取失败：" + response.msg);
      }
    } catch (error) {
      console.error("请求失败:", error);
      ElMessage.error("网络请求失败：" + error.message);
    }
  }
};

onMounted(async () => {
  try {
    const responseDynasty = await request.get("poemsbydynasty/api/getPoemInfoById", {
      params: { id: "dynasty" },
    });
    const responseAuthor = await request.get("poemsbydynasty/api/getPoemInfoById", {
      params: { id: "author" },
    });

    if (responseDynasty.code === 200 && responseAuthor.code === 200) {
      rankData.value = [
        {
          id: "rank1",
          data: [responseDynasty.data.dynasty],
          category: "朝代",
          seriesData: [1], // 示例数据，需要根据实际数据调整
        },
        {
          id: "rank2",
          data: [responseAuthor.data.author],
          category: "作者",
          seriesData: [1], // 示例数据，需要根据实际数据调整
        },
      ];
    } else {
      ElMessage.error(
        "数据获取失败："(responseDynasty.msg || responseAuthor.msg)
      );
    }
  } catch (error) {
    console.error("请求失败:", error);
    ElMessage.error("网络请求失败：" + error.message);
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
    margin-left: 1vw;
    width: 18vw;
    background: #f6f3e5;
    padding: 2vw;
    .rank-item {
      width: 100%;
      height: 17vw;
      margin-bottom: 3vw;
      border: 1px solid #7d3030;
    }
  }
  .text {
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