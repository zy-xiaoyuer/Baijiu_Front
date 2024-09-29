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
        <el-button type="primary" class="sbutton" color="#7D3030" @click="handleSearch">
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
<<<<<<< HEAD
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
=======
        <div id="rank1" ref="rank1" class="rank-item1"></div>
        <div id="rank2" ref="rank2" class="rank-item2"></div>
>>>>>>> 522e2c0378011776ce9a6df6d298ed43224b25f3
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
            @click="toTop"
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

let currentFilterCategory = ref(null);
let currentFilterSelectedItem = ref(null);

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

<<<<<<< HEAD
=======
function fetchFilteredPoems(category, selectedItem) {
  currentFilterCategory.value = category;
  currentFilterSelectedItem.value = selectedItem;
  request
    .post("poemsbydynasty/api/listPage", {
      pageSize: pageSize4.value,
      pageNum: currentPage4.value,
      params: {
        search: selectedItem,
      },
    })
    .then((res) => {
      console.log("----------------------------------------");
      console.log(res);
      if (res.code === 200 && res.data) {
        poems.value = res.data;
        filteredPoems.value = res.data;
        total.value = res.total;
        currentPage4.value = 1; // 重置到第一页
      } else {
        ElMessage.error("数据获取失败：" + res.msg);
      }
    })
    .catch((error) => {
      console.error("请求失败:", error);
      ElMessage.error("网络请求失败：" + error.message);
    });
}

>>>>>>> 522e2c0378011776ce9a6df6d298ed43224b25f3
const handleSizeChange = (newSize: number) => {
  pageSize4.value = newSize;
  fetchPoems();
};

const handleSearch = () => {
  fetchPoems();
};

const toTop = () => {
  document.documentElement.scrollTop = 0;
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
  if (currentFilterCategory.value && currentFilterSelectedItem.value) {
    // 如果存在筛选条件，则使用筛选条件获取数据
    fetchFilteredPoems(
      currentFilterCategory.value,
      currentFilterSelectedItem.value
    );
  } else {
    // 否则，获取未筛选的全部数据
    fetchPoems();
  }
};

const markCharts = (
  id: string,
  data: string[],
  category: string,
  seriesData: number[]
) => {
  const chartDom = document.getElementById(id);
<<<<<<< HEAD
  const myChart = echarts.init(chartDom);
  const option = {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: { data: [category] },
    grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
    xAxis: [{ type: "value", show: false }],
    yAxis: [{ type: "category", axisTick: { show: false }, data }],
    series: [
      {
        name: category,
        type: "bar",
        color: "#7D3030",
        label: { show: false, position: "inside" },
        emphasis: { focus: "series" },
        data: [200, 170, 240, 244, 200, 220, 210, 150],
      },
    ],
  };
  myChart.setOption(option);

  // 添加点击事件
  myChart.on("click", (params) => {
    const selectedItem = params.name; // 获取被点击的项
    filterPoemsByCategory(category, selectedItem); // 根据点击的项筛选诗词
  });
};

const filterPoemsByCategory = (category: string, selectedItem: string) => {
  filteredPoems.value = poems.value.filter((poem) => {
    if (category === "朝代") {
      console.log("filterPoemsByCategory", poem.dynasty.includes(selectedItem));
      return poem.dynasty.includes(selectedItem); // 根据朝代筛选诗词
    } else if (category === "作者") {
      return poem.author.includes(selectedItem); // 根据作者筛选诗词
    }
    return true;
  });
=======
  if (chartDom) {
    const myChart = echarts.init(chartDom);
    const option = {
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
      legend: { data: [category] },
      grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
      xAxis: [{ type: "value", show: false }],
      yAxis: [{ type: "category", axisTick: { show: false }, data }],
      series: [
        {
          name: category,
          type: "bar",
          color: "#7D3030",
          label: { show: false, position: "inside" },
          emphasis: { focus: "series" },
          data: seriesData, // 使用传入的 seriesData 作为数据源
        },
      ],
    };
    myChart.setOption(option);

    // 添加点击事件
    myChart.on("click", (params) => {
      const selectedItem = params.name; // 获取被点击的项
      fetchFilteredPoems(category, selectedItem);
    });
  }
>>>>>>> 522e2c0378011776ce9a6df6d298ed43224b25f3
};

const rankData = ref([
  {
    id: "rank1",
<<<<<<< HEAD
    data: ["辽朝", "宋朝", "盛唐", "隋朝", "南北朝", "魏晋", "汉", "先秦"],
    category: "朝代",
=======
    data: [
      "秦",
      "清",
      "唐",
      "隋",
      "当代",
      "魏晋南北朝",
      "汉",
      "先秦",
      "现当代",
      "民国",
    ],
    category: "朝代",
    seriesData: [20000, 28855, 46890, 32000, 29140, 40000, 24000, 42000, 32900, 27320],
>>>>>>> 522e2c0378011776ce9a6df6d298ed43224b25f3
  },
  {
    id: "rank2",
    data: [
      "李白",
<<<<<<< HEAD
      "白居易",
      "刘禹锡",
      "杜甫",
      "王维",
      "孟浩然",
      "韩愈",
      "柳宗元",
    ],
    category: "作者",
=======
      "王维",
      "徐安贞",
      "王缙",
      "高适",
      "白履忠",
      "苏广文",
      "李嶷",
      "王希明",
      "丁仙芝",
      "孙逖",
      "祖咏",
      "刘慎虚",
      "李元纮",
      "源乾曜",
      "孟浩然",
      "王昌龄",
      "王翰",
      "李颀",
      "王湾",
      "王之涣",
      "魏奉古",
      "李隆基",
      "蔡孚",
      "李皓",
      "张子容",
      "张九龄",
      "李咸",
      "周利用",
      "赵彦伯",
      "郑南金",
      "赵冬曦",
      "刘升",
      "释智严",
      "梁知微",
      "裴光庭",
      "徐彦伯",
      "武平一",
      "崔沔",
      "崔日用",
      "萧至忠",
      "卢藏用",
      "李迥秀",
      "阎朝隐",
      "岑羲",
      "屈原",
      "文种",
      "两汉乐府",
      "杨雪窗",
      "诗经",
      "无名氏",
      "王易",
      "叶楚伧",
      "柳亚子",
    ],
    category: "作者",
    seriesData: [
      1900,1902,1500,1600,1600,1300,1399,1499,1500,1500,1500,1500,1500,1500,1600,1788,1344,1988,1974,1976,1994,2000,2000,2001,2004,2008,2200,2100,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2000, 4689, 3200, 4000, 3700, 2000, 2200, 2100, 2000, 2100, 2000,
    ],
>>>>>>> 522e2c0378011776ce9a6df6d298ed43224b25f3
  },
]);

onMounted(() => {
  rankData.value.forEach((rank) => {
    markCharts(rank.id, rank.data, rank.category, rank.seriesData);
  });
  fetchPoems();
  // filteredPoems.value = poems.value;
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
    height: 5vw;
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
    margin-left: 1vw;
    width: 18vw;
    height: 77vw;
    background: #f6f3e5;
    border-radius: 1vw;
    padding: 2vw;
    .rank-item1 {
      width: 100%;
      top: 1vw;
      height: 17vw;
      margin-bottom: 3vw;
      border-radius: 1vw;
      border: 1px solid #7d3030;
    }
    .rank-item2 {
      width: 100%;
      top: 1vw;
      height: 56vw;
      margin-bottom: 2vw;
      border-radius: 1vw;
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
