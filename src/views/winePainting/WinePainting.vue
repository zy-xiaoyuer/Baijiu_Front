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
          @click="handleSearch"
        >
          搜索
        </el-button>
      </div>
    </div>
    <div class="main-content">
    <div id="rank" ref="rank" class="rank">
      分类统计
      <div id="rank1" ref="rank1" class="rank1"></div>
    </div>

    <div class="text">
      <h3>共{{ total }}条数据</h3>
      <hr />
      <div>
      <div id="imgs">
        <router-link
          v-for="message in paginatedMessages"
          :key="message.id"
          :title="message.name"
          :to="{
              name: 'winePaintingDetail',
              params: { winePaintingDetailId: message.id },
            }"
        >
        <img
              class="img"
              :src="
                globals.$config?.serverUrl +
                '/upload/' +
                message.image.split('\\').pop()
              "
              alt="Image"
            />
            {{}}
        </router-link>
        </div>
      </div>
      <div class="demo-pagination-block">
        <el-pagination
          v-model:current-page="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[9, 18, 27, 36]"
          :size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
          @click="toTop"
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
import request from "@/api/request";
import { ElMessage } from "element-plus";
import { globals } from "@/main";


interface message {
  dynasty: string;
  id: number;
  imagename: string;
  // eslint-disable-next-line no-undef
  image: string;
}

const input = ref("");
const currentPage4 = ref(1);
const pageSize4 = ref(9);
const size = ref<ComponentSize>("default");

const messages = ref<any[]>([]);
// 用于存储过滤后的信息
const filteredMessages = ref<any[]>(messages.value);

// const total = computed(() => filteredMessages.value.length);
const total = ref(0);

const searchQuery = ref(""); 

function load() {
  request
    .post("poemimages/api/listPage", {
      pageSize: pageSize4.value,
      pageNum: currentPage4.value,
      params: {
        imagename: searchQuery.value,
      },
    })
    .then((res) => {
      console.log(globals.$config?.serverUrl);
      if (res.code === 200) {
        filteredMessages.value = res.data;
        total.value = res.total;
      } else {
        alert("数据获取失败：" + res.msg);
      }
    });
}

const handleSearch = () => {
  searchQuery.value = input.value;
  load();
};

const handleSizeChange = (newSize: number) => {
  pageSize4.value = newSize;
  load();
};

const paginatedMessages = computed(() => {
  let start = (currentPage4.value - 1) * pageSize4.value;
  start = 0;
  return filteredMessages.value.slice(start, start + pageSize4.value);
});

const toTop = () => {
  document.documentElement.scrollTop = 0;
};

const searchPaints = () => {
  const query = input.value.toLowerCase();
  filteredMessages.value = messages.value.filter((message) =>
    message.title.toLowerCase().includes(query)
  );
  currentPage4.value = 1; // 搜索后重置分页到第一页
};

const handlePageChange = (page: number) => {
  currentPage4.value = page;
  load();
};

// const markCharts = async () => {
//   const chartDom = document.getElementById("rank1");
//   if (chartDom) {
//     let myChart = echarts.getInstanceByDom(chartDom);
//     if (myChart) {
//       myChart.dispose(); // 销毁已有的实例
//     }
//     myChart = echarts.init(chartDom); // 初始化新的图表实例

//     try {
//       const response = await request.get("/poemimages/api/countByDynasty");
//       if (response.code === 200 && response.data) {
//         const dynastyCount = response.data;
//         const dynastyNames = Object.keys(dynastyCount);
//         const counts = Object.values(dynastyCount);

//         const option = {
//           tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
//           legend: { data: ["朝代"] },
//           grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
//           xAxis: [{ type: "value", show: false }],
//           yAxis: [
//             {
//               type: "category",
//               axisTick: { show: false },
//               data: dynastyNames,
//             },
//           ],
//           series: [
//             {
//               name: "朝代",
//               type: "bar",
//               color: "#7D3030",
//               label: { show: false },
//               emphasis: { focus: "series" },
//               data: counts,
//             },
//           ],
//         };
//         myChart.setOption(option);

//         myChart.on("click", (params) => {
//           if (params.componentType === "series") {
//             const selectedItem = params.name; // 获取被点击的项
//             searchQuery.value = selectedItem; // 更新搜索查询条件
//             currentPage4.value = 1; // 重置为第一页
//             load(); // 重新加载数据
//           }
//         });
//       } else {
//         ElMessage.error("获取数据失败：" + response.msg);
//       }
//     } catch (error) {
//       console.error("请求出错：", error);
//       ElMessage.error("网络请求失败");
//     }
//   }
// };

onMounted(() => {
  load();
  // setTimeout(markCharts, 1000);
});

</script>

<style lang="less" scoped>
.about {
  background-image: url("@/assets/images/background.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 96vw;
  // height: 66vw;
  margin-left: 2vw;
  padding: 0 0 5vw 0;

  .serachTop {
    height: 10vw;
    width: 100vw;
    margin-left: -2vw;
    // background-size: 100% 100%;
    .serach {
      padding: 1vw 0 0 37vw;
      .input {
        width: 24vw;
        margin-right: 1vw;
        // font-size: 0.8rem;
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
    padding: 2vw;
    // left: 1vw;
    margin-left: 1vw;
    top: -4vw;
    width: 18vw;
    height: 21vw;
    border-radius: 1vw;
    background: #f6f3e5;
    opacity: 0;
    .rank1 {
      position: absolute;
      left: 1vw;
      top: 4vw;
      width: 19vw;
      height: 17vw;
      border-radius: 1vw;
      // box-sizing: border-box;
      border: 1px solid #7d3030;
    }
  }
  .text {
    position: relative;
    // left: 28vw;
    top: -4vw;
    flex: 1;
    // width: 60vw;
    // height: 56vw; /* Changed to auto to fit content */
    // border-radius: 1px;
    background: #f6f3e5;
    padding: 1vw;
    margin-right: 6vw;
    .imgs {
      // margin-top: 1vw;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      // align-content: flex-start;
    }
    .img {
      height: 14vw;
      // padding: 1vw;
      width: 16vw;
      margin-left: 2vw;
      margin-right: 2vw;
      margin-bottom: 1vw;
      margin-top: 1vw;
    }
    .demo-pagination-block {
      width: 100%; /* Full width to center */
      display: flex;
      justify-content: center; /* Center pagination */
      align-items: center;
      margin-top: 2vw; /* Space between images and pagination */
    }
  }
}
</style>
