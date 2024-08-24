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
        <el-button type="primary" class="sbutton" @click="searchPoems">
          搜索
        </el-button>
      </div>
    </div>

    <div class="main-content">
      <div id="rank" ref="rank" class="rank">
        分类统计
        <div id="rank1" ref="rank1" class="rank1"></div>
        <div id="rank2" ref="rank2" class="rank2"></div>
      </div>

      <div class="text">
        <h3>共{{ total }}条数据</h3>
        <hr />
        <div
          v-for="(poem, index) in paginatedPoems"
          :key="index"
          class="poem-item"
        >
          <el-descriptions
            :column="3"
            :size="size"
            :style="blockMargin"
            class="poem-description custom-descriptions"
          >
            <el-descriptions-item class="custom-title">{{
              poem.title
            }}</el-descriptions-item>
            <el-descriptions-item class="custom-author">{{
              poem.author
            }}</el-descriptions-item>
            <el-descriptions-item class="custom-type">{{
              poem.type
            }}</el-descriptions-item>
            <el-descriptions-item class="custom-content">{{
              poem.content
            }}</el-descriptions-item>
          </el-descriptions>

          <router-link
            class="view-link"
            :to="{
              name: 'winePoetryDetail',
              params: { winePoetryDetailId: poem.id },
            }"
          >
            查看诗词
          </router-link>
          <hr />
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
            :total="2"
            @current-change="handlePageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, ref, computed, watch } from "vue";
import type { ComponentSize } from "element-plus";

const input = ref("");
const num = ref(1);
// const size = ref("default");
const selectedPageSize = ref(10); // 默认每页条数

const currentPage4 = ref(1);
const pageSize4 = ref(10);
const size = ref<ComponentSize>("default");

const poems = ref([
  {
    id: 1,
    title: "赠崔秋浦三首 其一",
    author: "盛唐 李白",
    type: "五言律诗",
    content:
      "吾爱崔秋浦,宛然陶令风。门前五杨柳，井上二梧桐。山鸟下厅事，檐花落酒中。怀君未忍去，惆怅意无穷。",
  },
  {
    id: 2,
    title: "赠郭将军",
    author: "盛唐 李白",
    type: "七言律诗",
    content:
      "将军少年出武威（一作豪荡有英威），入（一作昔）掌银台护紫微。平明拂剑朝天去，薄暮垂鞭醉酒归。爱子临风吹玉笛，美人向月舞罗衣。畴昔雄豪如梦里，相逢且欲醉春晖（一作今日相逢俱失路，何年霸上弄春晖）。",
  },
  {
    id: 3,
    title: "陪侍郎叔游洞庭醉后三首 其二",
    author: "盛唐 李白",
    type: "五言绝句",
    content: "船上齐桡乐，湖心泛月归。白鸥闲不去，争拂酒筵飞。",
  },
  {
    id: 4,
    title: "赠崔秋浦三首 其一",
    author: "盛唐 李白",
    type: "五言律诗",
    content:
      "吾爱崔秋浦,宛然陶令风。门前五杨柳，井上二梧桐。山鸟下厅事，檐花落酒中。怀君未忍去，惆怅意无穷。",
  },
  {
    id: 5,
    title: "赠郭将军",
    author: "盛唐 李白",
    type: "七言律诗",
    content:
      "将军少年出武威（一作豪荡有英威），入（一作昔）掌银台护紫微。平明拂剑朝天去，薄暮垂鞭醉酒归。爱子临风吹玉笛，美人向月舞罗衣。畴昔雄豪如梦里，相逢且欲醉春晖（一作今日相逢俱失路，何年霸上弄春晖）。",
  },
  {
    id: 6,
    title: "陪侍郎叔游洞庭醉后三首 其二",
    author: "盛唐 李白",
    type: "五言绝句",
    content: "船上齐桡乐，湖心泛月归。白鸥闲不去，争拂酒筵飞。",
  },
  // 更多诗词
]);

const background = ref(false);
const disabled = ref(false);


const total = computed(() => poems.value.length);
const maxPage = computed(() => Math.ceil(total.value / selectedPageSize.value));

const paginatedPoems = computed(() => {
  const start = (num.value - 1) * selectedPageSize.value;
  return poems.value.slice(start, start + selectedPageSize.value);
});

watch(num, (newVal) => {
  if (newVal > maxPage.value) {
    num.value = maxPage.value;
  } else if (newVal < 1) {
    num.value = 1;
  }
});

watch(selectedPageSize, () => {
  num.value = 1; // 每次更改每页条数时，将页码重置为第一页
});

const searchPoems = () => {
  // 搜索逻辑
};

const handlePageChange = (page) => {
  num.value = page;
};

// const handlePageSizeChange = (value) => {
//   selectedPageSize.value = value; // 更新每页条数
// };

const markCharts = (id, data, category) => {
  var chartDom = document.getElementById(id);
  var myChart = echarts.init(chartDom);
  var option = {
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
  option && myChart.setOption(option);
};

onMounted(() => {
  markCharts(
    "rank1",
    ["辽朝", "宋朝", "唐朝", "隋朝", "南北朝", "魏晋", "汉朝", "先秦"],
    "朝代"
  );
  markCharts(
    "rank2",
    ["李白", "白居易", "刘禹锡", "杜甫", "王维", "孟浩然", "韩愈", "柳宗元"],
    "作者"
  );
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
    background-size: 100%;
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
    top: 1vw;
    margin-left: 1vw;
    width: 18vw;
    background: #f6f3e5;
    padding: 2vw;
    .rank1,
    .rank2 {
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

    .poem-item {
      width: 100%;
      background: #f6f3e5;
      border-radius: 0.5vw;
      padding: 1vw;
      position: relative;
      margin-bottom: 1vw;
    }

    .custom-descriptions {
      .custom-title,
      .custom-author,
      .custom-type {
        color: #3D3D3D; /* 标题、作者、类型的颜色 */
      }

      .custom-content {
        color: #908D8D; /* 诗句内容颜色 */
      }
    }

    .view-link {
      position: absolute;
      top: 1vw;
      right: 1vw;
      color: #7d3030;
      text-decoration: underline;
    }

    .demo-pagination-block {
      display: flex;
      justify-content: center; /* 使分页组件居中对齐 */
      align-items: center;
      gap: 1vw;
    }
  }
}
</style>
