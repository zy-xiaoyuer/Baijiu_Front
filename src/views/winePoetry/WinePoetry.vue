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
        <el-button type="primary" color="#7D3030" class="sbutton"
          >搜索</el-button
        >
      </div>
    </div>

    <div id="rank" ref="rank" class="rank">
      分类统计
      <div id="rank1" ref="rank1" class="rank1">朝代</div>
      <div id="rank2" ref="rank2" class="rank2">作者</div>
    </div>

    <div class="text">
      <h3>共100条数据</h3>
      <hr />
      <!-- <router-link to="/JuTi"> -->
      <el-descriptions
        class="margin-top1"
        :column="3"
        :size="size"
        :style="blockMargin"
      >
        <el-descriptions-item class="shiming1"
          >赠崔秋浦三首 其一</el-descriptions-item
        >
        <el-descriptions-item class="shiren1">盛唐 李白</el-descriptions-item>
        <el-descriptions-item class="leixing1">五言律诗</el-descriptions-item>
        <el-descriptions-item class="shici1">
          吾爱崔秋浦，宛然陶令风。门前五杨柳，井上二梧桐。山鸟下厅事，檐花落酒中。怀君未忍去，惆怅意无穷。
        </el-descriptions-item>
      </el-descriptions>
      <el-button link @click="toOut1" class="btn"> 查看诗词细节 </el-button>
      <hr />
      <!-- </router-link> -->
      <!-- <router-view></router-view> -->
      <el-descriptions
        class="margin-top2"
        :column="3"
        :size="size"
        :style="blockMargin"
      >
        <el-descriptions-item class="shiming2">赠郭将军</el-descriptions-item>
        <el-descriptions-item class="shiren2">盛唐 李白</el-descriptions-item>
        <el-descriptions-item class="leixing2">七言律诗</el-descriptions-item>
        <el-descriptions-item class="shici2">
          将军少年出武威（一作豪荡有英威），入（一作昔）掌银台护紫微。平明拂剑朝天去，薄暮垂鞭醉酒归。爱子临风吹玉笛，美人向月舞罗衣。畴昔雄豪如梦里，相逢且欲醉春晖（一作今日相逢俱失路，何年霸上弄春晖）。
        </el-descriptions-item>
      </el-descriptions>
      <hr />
      <el-descriptions
        class="margin-top3"
        :column="3"
        :size="size"
        :style="blockMargin"
      >
        <el-descriptions-item class="shiming3"
          >陪侍郎叔游洞庭醉后三首 其二</el-descriptions-item
        >
        <el-descriptions-item class="shiren3">盛唐 李白</el-descriptions-item>
        <el-descriptions-item class="leixing3">五言绝句</el-descriptions-item>
        <el-descriptions-item class="shici3">
          船上齐桡乐，湖心泛月归。白鸥闲不去，争拂酒筵飞。
        </el-descriptions-item>
      </el-descriptions>
      <hr />
      <el-descriptions
        class="margin-top4"
        :column="3"
        :size="size"
        :style="blockMargin"
      >
        <el-descriptions-item class="shiming1"
          >赠崔秋浦三首 其一</el-descriptions-item
        >
        <el-descriptions-item class="shiren1">盛唐 李白</el-descriptions-item>
        <el-descriptions-item class="leixing1">五言律诗</el-descriptions-item>
        <el-descriptions-item class="shici1">
          吾爱崔秋浦，宛然陶令风。门前五杨柳，井上二梧桐。山鸟下厅事，檐花落酒中。怀君未忍去，惆怅意无穷。
        </el-descriptions-item>
      </el-descriptions>
      <hr />
      <el-descriptions
        class="margin-top5"
        :column="3"
        :size="size"
        :style="blockMargin"
      >
        <el-descriptions-item class="shiming2">赠郭将军</el-descriptions-item>
        <el-descriptions-item class="shiren2">盛唐 李白</el-descriptions-item>
        <el-descriptions-item class="leixing2">七言律诗</el-descriptions-item>
        <el-descriptions-item class="shici2">
          将军少年出武威（一作豪荡有英威），入（一作昔）掌银台护紫微。平明拂剑朝天去，薄暮垂鞭醉酒归。爱子临风吹玉笛，美人向月舞罗衣。畴昔雄豪如梦里，相逢且欲醉春晖（一作今日相逢俱失路，何年霸上弄春晖）。
        </el-descriptions-item>
      </el-descriptions>
      <hr />
      <el-descriptions
        class="margin-top6"
        :column="3"
        :size="size"
        :style="blockMargin"
      >
        <el-descriptions-item class="shiming3"
          >陪侍郎叔游洞庭醉后三首 其二</el-descriptions-item
        >
        <el-descriptions-item class="shiren3">盛唐 李白</el-descriptions-item>
        <el-descriptions-item class="leixing3">五言绝句</el-descriptions-item>
        <el-descriptions-item class="shici3">
          船上齐桡乐，湖心泛月归。白鸥闲不去，争拂酒筵飞。
        </el-descriptions-item>
      </el-descriptions>
      <hr />
      <el-pagination class="page"
        :page-size="2"
        :pager-count="5"
        layout="prev, pager, next"
        :total="10"
      />
      <el-space class="vertical">
        <el-space
          >前往 <el-input-number v-model="num" />页
          <template #decrease-icon>
            <el-icon>
              <ArrowDown />
            </el-icon>
          </template>
        </el-space>
      </el-space>
    </div>
  </div>
</template>
<script lang="ts" setup>
// import geoJson from "@/assets/json/china.json";
import * as echarts from "echarts";
// import poi from "@/assets/json/position.json";
// import "echarts-gl";
import {
  onMounted,
  ref,
  watch,
  onUnmounted,
  reactive,
  computed,
  methods,
} from "vue";
// import { textProps } from "element-plus";
import type { ComponentSize } from "element-plus";
// import { ArrowDown, ArrowUp, Minus, Plus } from "@element-plus/icons-vue";

const input = ref("");

const activeNames = ref(["1"]);
const handleChange = (val: string[]) => {
  console.log(val);
};
const num = ref(1);

const size = ref<ComponentSize>("default");

const markCharts1 = () => {
  var chartDom = document.getElementById("rank1");
  var myChart = echarts.init(chartDom);
  var option;

  option = {
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
    markCharts1();
  }, 1000);
});

const markCharts2 = () => {
  var chartDom = document.getElementById("rank2");
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["作者"],
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
        data: ["李白", "白居易", "刘禹锡", "XX", "XXXX", "XX", "XXX", "XX"],
      },
    ],
    series: [
      {
        name: "作者",
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
    markCharts2();
  }, 1000);
});

const toOut1 = () => {
  window.location.href = "/WinePoetryDetail";
};
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
    height: 25vw;
    width: 100vw;
    margin-left: -2vw;
    background-size: 100% 100%;
    // border: 1px solid #000;
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
    height: 38vw;
    border-radius: 1vw;
    opacity: 1;

    background: #f6f3e5;
    .rank1 {
      position: absolute;
      left: 1vw;
      top: 4vw;
      width: 19vw;
      height: 17vw;
      border-radius: 1vw;
      opacity: 1;

      box-sizing: border-box;
      border: 1px solid #7d3030;
    }
    .rank2 {
      position: absolute;
      left: 1vw;
      top: 22vw;
      width: 19vw;
      height: 17vw;
      border-radius: 1vw;
      opacity: 1;

      box-sizing: border-box;
      border: 1px solid #7d3030;
    }
  }
  .text {
    position: absolute;
    // padding: 2vw;
    left: 33vw;
    top: 17vw;
    width: 62vw;
    height: 55vw;
    border-radius: 1px;
    opacity: 1;

    background: #f6f3e5;
    .btn {
      position: absolute;
      width: 115vw;
      top: 4vw;
    }
    .el-descriptions {
      margin-top: 1vw;
      padding: 0.5vw;
      background-color: #f6f3e5;
    }
    .margin-top1 {
      margin-top: 1vw;
    }
    .margin-top2 {
      margin-top: 1vw;
    }
    .margin-top3 {
      margin-top: 1vw;
    }
    .margin-top4 {
      margin-top: 1vw;
    }
    .margin-top5 {
      margin-top: 1vw;
    }
    .margin-top6 {
      margin-top: 1vw;
    }
    .page{
      position: relative;
      left: 17vw;
      top: 7vw;
      width: 12vw;
      height: 1vw;
      opacity: 1;
      box-sizing: border-box;
    }
    .vertical {
      position: relative;
      left: 29vw;
      top: 6vw;
      width: 12vw;
      height: 1vw;
      opacity: 1;

      // background: #ffffff;

      box-sizing: border-box;
      // border: 1px solid rgba(145, 119, 119, 0.8);
    }
  }
}
</style>
