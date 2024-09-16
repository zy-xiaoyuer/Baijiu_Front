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
          @click="serach"
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
          v-for="(poem, index) in paginatedPoems"
          :key="index"
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
              <span class="custom-type">{{ poem.type }}</span>
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
import { onMounted, ref, computed } from "vue";
import type { ComponentSize } from "element-plus";
import request from "@/api/request.js";

function load() {
  request
    .post("poemimages/api/listPage", {
      pageSize: 1,
      pageNum: 1,
      // params: {
      //   search: this.search,
      // },
    })
    .then((res) => {
      //res已经是data了
      console.log("----------------------------------------");
      console.log(res);
      // if (res.code === 200) {
      //   this.tableData = res.data;
      //   this.total = res.total;
      // } else {
      //   alert("数据获取失败：" + res.msg);
      // }
    });
}
// -----------------------------
function serach() {
  request
    .post("poemsbydynasty/api/listPage", {
      pageSize: 1,
      pageNum: 1,
      // params: {
      //   search: this.search,
      // },
    })
    .then((res) => {
      //res已经是data了
      console.log("----------------------------------------");
      console.log(res);
      // if (res.code === 200) {
      //   this.tableData = res.data;
      //   this.total = res.total;
      // } else {
      //   alert("数据获取失败：" + res.msg);
      // }
    });
    request
    .post("poemsbylocation/api/listPage", {
      pageSize: 1,
      pageNum: 1,
      // params: {
      //   search: this.search,
      // },
    })
    .then((res) => {
      //res已经是data了
      console.log("----------------------------------------");
      console.log(res);
      // if (res.code === 200) {
      //   this.tableData = res.data;
      //   this.total = res.total;
      // } else {
      //   alert("数据获取失败：" + res.msg);
      // }
    });
}

const input = ref("");
const currentPage4 = ref(1);
const pageSize4 = ref(10);
const size = ref<ComponentSize>("default");

const poems = ref<any[]>([]);

const filteredPoems = ref<any[]>([]);

const total = computed(() => filteredPoems.value.length);

const paginatedPoems = computed(() => {
  const start = (currentPage4.value - 1) * pageSize4.value;
  return filteredPoems.value.slice(start, start + pageSize4.value);
});

// const searchPoems = () => {
//   // 根据用户输入筛选诗词
//   const query = input.value.toLowerCase();
//   filteredPoems.value = poems.value.filter(
//     (poem) =>
//       poem.title.toLowerCase().includes(query) ||
//       poem.author.toLowerCase().includes(query) ||
//       poem.content.toLowerCase().includes(query)
//   );
// };

const handlePageChange = (page: number) => {
  currentPage4.value = page;
};

const markCharts = (id: string, data: string[], category: string) => {
  const chartDom = document.getElementById(id);
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
      return poem.author.includes(selectedItem); // 根据朝代筛选诗词
    } else if (category === "作者") {
      return poem.author.includes(selectedItem); // 根据作者筛选诗词
    }
    return true;
  });
};

onMounted(() => {
  load();
  markCharts(
    "rank1",
    ["辽朝", "宋朝", "盛唐", "隋朝", "南北朝", "魏晋", "汉朝", "先秦"],
    "朝代"
  );
  markCharts(
    "rank2",
    ["李白", "白居易", "刘禹锡", "杜甫", "王维", "孟浩然", "韩愈", "柳宗元"],
    "作者"
  );

  // 初始化筛选
  filteredPoems.value = poems.value;
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
