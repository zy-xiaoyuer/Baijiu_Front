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
          >搜索</el-button
        >
      </div>
    </div>

    <div
      id="rank"
      class="rank"
    >
      分类统计
      <div
        id="rank1"
        class="rank1"
      >
        朝代
      </div>
    </div>

    <div class="text">
      <h3>共{{ total }}条数据</h3>
      <hr />
      <div>
        <div id="imgs">
          <router-link
            class="card"
            v-for="message in paginatedMessages"
            :key="message.id"
            :title="message.name"
            :to="{
              name: 'wineVesselDetail',
              params: { wineVesselDetailId: message.id },
            }"
          >
            <img
              class="img"
              :src="
                globals.$config?.serverUrl +
                '/upload/' +
                message.picture.split('\\').pop()
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
          @click="toTop"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from "vue";
import * as echarts from "echarts";
import type { ComponentSize } from "element-plus";
import request from "@/api/request";
import { ElMessage } from "element-plus";
import { globals } from "@/main";

interface message {
  age: string;
  id: number;
  now: string;
  // eslint-disable-next-line no-undef
  picture: string;
}

const input = ref("");
const currentPage4 = ref(1);
const pageSize4 = ref(9);
const size = ref<ComponentSize>("default");

const messages = ref<any[]>([]);

// 用于存储过滤后的信息
const filteredMessages = ref<any[]>(messages.value);

const total = ref(0);

const searchQuery = ref(""); // 用于存储搜索查询条件

let pTest = ref("");

function load() {
  request
    .post("vessel/api/listPage", {
      pageSize: pageSize4.value,
      pageNum: currentPage4.value,
      params: {
        search: searchQuery.value,
      },
    })
    .then((res) => {
      console.log(globals.$config?.serverUrl);
      if (res.code === 200) {
        // messages.value = res.data;
        filteredMessages.value = res.data;
        total.value = res.total;
        // currentPage4.value = 1;
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
  // queryParam.pageSize = newSize;
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

const search = () => {
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

const markCharts = async () => {
  const chartDom = document.getElementById("rank1");
  if (chartDom) {
    let myChart = echarts.getInstanceByDom(chartDom);
    if (myChart) {
      myChart.dispose(); // 销毁已有的实例
    }
    myChart = echarts.init(chartDom); // 初始化新的图表实例

    try {
      const response = await request.get("/vessel/api/countByDynasty");
      if (response.code === 200 && response.data) {
        const dynastyCount = response.data;
        const dynastyNames = Object.keys(dynastyCount);
        const counts = Object.values(dynastyCount);

        const option = {
          tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
          legend: { data: ["朝代"] },
          grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
          xAxis: [{ type: "value", show: false }],
          yAxis: [
            {
              type: "category",
              axisTick: { show: false },
              data: dynastyNames,
            },
          ],
          series: [
            {
              name: "朝代",
              type: "bar",
              color: "#7D3030",
              label: { show: false },
              emphasis: { focus: "series" },
              data: counts,
            },
          ],
        };
        myChart.setOption(option);

        myChart.on("click", (params) => {
          if (params.componentType === "series") {
            const selectedItem = params.name; // 获取被点击的项
            searchQuery.value = selectedItem; // 更新搜索查询条件
            currentPage4.value = 1; // 重置为第一页
            load(); // 重新加载数据
          }
        });
      } else {
        ElMessage.error("获取数据失败：" + response.msg);
      }
    } catch (error) {
      console.error("请求出错：", error);
      ElMessage.error("网络请求失败");
    }
  }
};

onMounted(() => {
  load();
  setTimeout(markCharts, 1000);
});

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
    height: 14vw;
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
    left: 1vw;
    top: -8vw;
    width: 18vw;
    height: 21vw;
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
    left: 28vw;
    top: 10vw;
    width: 60vw;
    height: 56vw;
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
  .img {
    height: 14vw;
    width: 16vw;
  }
}
</style>
