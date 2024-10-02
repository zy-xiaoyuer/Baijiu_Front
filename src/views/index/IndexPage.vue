<template>
  <div class="indexMain">
    <div class="serachTop">
      <div class="serach">
        <!-- <el-select
          v-model="value"
          clearable
          placeholder="全部"
          class="select"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select> -->
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
          >搜索</el-button
        >
      </div>
    </div>
    <div class="title">
      <!-- <div style="text-align: center; font-size: 2rem">唐·酒诗年代山水图</div> -->
    </div>
    <div class="poetryRiver">
      <div class="textInfo">
        <img
          src="@/assets/images/infoIndex.png"
          class="infoImg"
        />
      </div>
      <div
        :id="echartId"
        ref="charts"
        class="echarts"
      ></div>
      <!-- <div>
        <img
          class="textInfo"
          src="@/assets/images/info1.png"
        />
      </div> -->
      <!-- <p class="textInfo">
          “酒诗年代山水图”中峰峦起伏的山峰代表唐代不同年号时期诗人所著的酒诗数目，在最高峰处升起的旭日代表着酒诗最兴盛的年号。
          翠绿色的年代号连接着山水，层叠的水纹代表着唐代不断出生的诗人，长短不一的水纹代表诗人的生命周期。水中长出的荷叶代表着唐
          代酒诗数量排名前十的诗人。
        </p> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Options, Vue } from "vue-class-component";
import * as echarts from "echarts";
import { onMounted, ref, watch, onUnmounted, reactive } from "vue";
// import ts from "@/assets/ts.json";
import ts from "@/assets/json/ts.json";
import request from "@/api/request.js";

// 接口测试

// 酒诗（地域）
function load() {
  request
    .post("search/api/global", {
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
      if (res.code === 200) {
        // this.tableData = res.data;
        // this.total = res.total;
      } else {
        alert("数据获取失败：" + res.msg);
      }
    });
}
// -----------------------------

const value = ref("全部");
const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];
const input = ref("");
// 监听窗口变化
// let nowClientWidth = document.documentElement.clientWidth;
// console.log(nowClientWidth);

const nowClientWidth = reactive({
  value: window.innerWidth,
});

function handleResize() {
  nowClientWidth.value = window.innerWidth;
  initChart();
  // console.log(-1 * nowSize(195));
}

const nowSize = (val: number) => {
  const initWidth = 1920;
  return val * (nowClientWidth.value / initWidth);
};

// 绘制年代山水图
let echartId = ref("eChart" + Date.now() + Math.random()); //记得return Chart
let myCharts = null;
const initChart = () => {
  // myCharts.clear();
  const ssChart: HTMLElement = document.getElementById(
    echartId.value
  ) as HTMLElement;
  if (myCharts) {
    myCharts.dispose();
  }
  myCharts = echarts.init(ssChart);
  let yData = [
    2, 19, 0, 1, 0, 0, 0, 1, 5, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 3, 1, 0, 3,
    5, 3, 0, 0, 101, 169, 30, 43, 46, 18, 31, 11, 69, 2, 1, 37, 15, 283, 97, 50,
    203, 108, 27, 2, 92, 13, 1, 7, 18, 0, 8, 2, 8, 7, 4, 22,
  ];
  myCharts.clear();
  // 绘制图表
  let option = {
    // title: {
    //   text: "\t年代山水图\t",
    //   top: 20,
    //   bottom: 20,
    //   left: 100,
    //   padding: [5, 5],
    //   backgroundColor: "#fff",
    //   borderWidth: 2,
    //   borderColor: "#b87333",
    //   borderRadius: 25,
    //   textStyle: {
    //     fontSize: 32,
    //     lineHeight: 56,
    //     // width: 100,
    //     // height: 100,
    //     color: "#b87333",
    //     fontFamily: "SimSun",
    //     textShadowColor: "#d1ad69",
    //     textShadowBlur: 1,
    //     textShadowOffsetX: 1,
    //     textShadowOffsetY: 1,
    //   },
    // },
    color: "#d2691e",
    tooltip: {
      trigger: "item",
      formatter: function (params: any) {
        // console.log("params", params);
        if (params.componentType === "markPoint") {
          return params.name;
        } else {
          // return params.name + ": " + params.value[1];
          // console.log("不是点---------");
        }
      },
      textStyle: {
        fontSize: nowSize(16),
      },
    },
    grid: {
      left: nowSize(1) + "%",
      right: nowSize(10) + "%",
      bottom: nowSize(3) + "%",
      top: nowSize(1) + "%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        axisLabel: {
          interval: 0, //全部显示x轴
          show: true,
          color: "#6abd78",
          fontSize: nowSize(8),
        },
        boundaryGap: false,
        data: [
          // "武德",
          "",
          "贞观",
          // "永徽",
          "",
          // "显庆",
          "",
          // "龙朔",
          "",
          // "麟德",
          "",
          // "乾封",
          "",
          // "总章",
          "",
          "咸亨",
          // "",
          // "上元",
          "",
          // "仪凤",
          "",
          // "调露",
          "",
          // "永淳",
          "",
          // "弘道",
          "",
          // "光宅",
          "",
          // "垂拱",
          "",
          // "载初",
          "",
          // "天授",
          "",
          // "长寿",
          "",
          // "万岁通天",
          "",
          // "神功",
          "",
          // "圣历",
          "",
          // "久视",
          "",
          "长安",
          // "",
          // "神龙",
          "",
          "景龙",
          // "",
          // "景云",
          "",
          // "太极",
          "",
          // "先天",
          "",
          "开元",
          // "天宝",
          "",
          "至德",
          // "乾元",
          "",
          "上元",
          // "宝应",
          "",
          "广德",
          // "永泰",
          "",
          "大历",
          // "建中",
          "",
          // "兴元",
          "",
          "贞元",
          // "永贞",
          "",
          "元和",
          // "长庆",
          "",
          "宝历",
          // "大和",
          "",
          // "开成",
          "",
          "会昌",
          // "大中",
          "",
          "咸通",
          // "乾符",
          "",
          // "广明",
          "",
          // "中和",
          "",
          "光启",
          // "文德",
          "",
          // "大顺",
          "",
          // "景福",
          "",
          // "乾宁",
          "",
          // "光化",
          "",
          // "天复",
          "",
          "天祐",
        ],
        axisTick: {
          show: false, // 不显示坐标轴刻度线
        },
        axisLine: {
          show: false, // 不显示坐标轴线
        },
        position: "top",
        offset: -1.02 * nowSize(305),
      },
    ],
    yAxis: [
      {
        type: "value",
        show: false,
      },
    ],
    series: [
      // 诗词数量
      {
        type: "line",
        markPoint: {
          data: [{ type: "max", name: "最大值", symbol: "circle" }],
          itemStyle: {
            color: "#d2691e",
          },
          symbolSize: nowSize(25),
          symbolOffset: [0, "-50%"],
          label: {
            normal: {
              show: true,
              textStyle: {
                color: "#000",
                fontSize: nowSize(12),
              },
            },
          },
        },
        stack: "Total",
        smooth: true,
        // xAxisIndex: 0,
        lineStyle: {
          width: 0,
        },

        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              // color: "rgb(128, 255, 165)",
              color: "#a16d35",
            },
            {
              offset: 1,
              // color: "rgb(1, 191, 236)",
              color: "#f2d88f",
            },
          ]),
        },

        // emphasis: {
        //   focus: "series",
        // },
        data: yData,
      },
      // 李白
      {
        name: "李白[701年2月28日(长安元年)~762年12月(宝应元年)]",
        type: "line",
        markPoint: {
          data: [
            {
              type: "max",
              name: "李白[701年2月28日(长安元年)~762年12月(宝应元年)]",
              value: 0,
              symbol: "image://" + require("@/assets/images/hy.png"),
            },
          ],
          label: {
            formatter: "",
          },
          itemStyle: {
            color: "#d2691e",
          },
          // symbol: "image://" + require("@/assets/images/hy.png"),
          symbolSize: nowSize(25),
          symbolOffset: [0, "-50%"],
        },
        showSymbol: false,
        lineStyle: {
          color: "#0077b8",
        },
        // tooltip: {
        //   formatter: function (params: any) {
        //     console.log("params", params);
        //   },
        // },
        data: [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          -830,
          -830,
          -830,
          -830,
          -830,
          -830,
          -830,
          -830,
          -830,
          -830,
          -830,
          -830,
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
      },
    ],
  };
  // 新
  ts.forEach((item: any) => {
    // console.log("item.data", item.data);
    let colorStyle = "";
    let n = 0;
    // 距离设置
    for (let i = 0; i < item.data.length; i++) {
      if (item.data[i] != "") {
        // console.log(item.data[i]);
        n++;
        // console.log("n", n);
        let m: any = item.data[i];
        // item.data[i] = -1 * (2 * item.num - 1);
        item.data[i] = -1 * item.num + 70;
        // item.data[i] = -1 * item.num - 50;
      }
    }
    // console.log("item.data", item.data);

    // 颜色设置
    if (n > 35) {
      colorStyle = "#58c3e0";
    } else if (n <= 35 && n > 10) {
      colorStyle = "#abd6e0";
    } else {
      colorStyle = "#e4f4f5";
    }
    // console.log("item.data", item.poet);
    if (
      item.poet == "杜甫" ||
      item.poet == "白居易" ||
      item.poet == "刘禹锡" ||
      item.poet == "姚合" ||
      item.poet == "元稹" ||
      item.poet == "岑参" ||
      item.poet == "许浑" ||
      item.poet == "罗隐" ||
      item.poet == "陆龟蒙"
    ) {
      let nameData = item.poet + "[" + item.introduce + "]";
      let objs = {
        name: nameData,
        type: "line",
        markPoint: {
          data: [
            {
              type: "max",
              name: nameData,
              value: 0,
              symbol: "image://" + require("@/assets/images/hy.png"),
            },
          ],
          label: {
            formatter: "",
          },
          itemStyle: {
            color: "#d2691e",
          },
          // symbol: "image://" + require("@/assets/images/hy.png"),
          symbolSize: nowSize(25),
          symbolOffset: [0, "-50%"],
        },
        showSymbol: false,
        data: item.data,
        lineStyle: {
          color: "#0077b8",
        },
      };
      option.series.push(objs);
    } else {
      let nameData = item.poet + "[" + item.introduce + "]";
      let obj = {
        name: nameData,
        type: "line",
        markPoint: {
          data: [
            {
              type: "max",
              name: nameData,
              value: 0,
              symbol: "image://" + require("@/assets/images/tm.png"),
            },
          ],
          label: {
            formatter: "",
          },
          itemStyle: {
            color: "#d2691e",
          },
          // symbol: "image://" + require("@/assets/images/hy.png"),
          symbolSize: nowSize(25),
          symbolOffset: [0, "50%"],
        },
        showSymbol: false,
        data: item.data,
        lineStyle: {
          color: colorStyle,
        },
      };
      option.series.push(obj);
    }
  });
  // console.log("option.series", option.series);
  // console.log(option.series);
  myCharts.setOption(option);
  // console.log("option----------------", option);
};

onMounted(() => {
  // load();
  initChart();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style lang="less" scoped>
.indexMain {
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
    background-image: url("@/assets/images/indexbackground.png");
    background-size: 100% 100%;
    // border: 1px solid #000;
    .serach {
      padding: 10vw 0 0 40vw;
      .select {
        width: 5vw;
        margin-right: 0.5vw;
      }
      .input {
        width: 15vw;
        margin-right: 0.5vw;
        font-size: 0.8rem;
      }
      .sbutton {
        font-size: 1rem;
      }
    }
  }
  .title {
    height: 3vw;
    width: 100vw;
    margin-left: -2vw;
    background-image: url("@/assets/images/titleIndex.png");
    background-size: 100% 100%;
  }
  .poetryRiver {
    margin-left: -2vw;
    // height: 5vw;
    width: 100vw;
    // .textInfo {
    //   margin: 2vw 0 0 25vw;
    //   // height: 5vw;
    //   width: 50vw;
    //   font-size: 1.2rem;
    //   color: #908d8d;
    // }
    .textInfo {
      margin: 3vw 0 0 14vw;
      // height: 5vw;
      width: 12vw;
      // font-size: 1.2rem;
      color: #908d8d;
      border-radius: 20px 0 0 20px;
      display: inline-block;
      float: left;
      background-color: #f6f3e5;
      height: 100vh;
      .infoImg {
        width: 70%;
        margin: 20vw 0 0 3vw;
      }
    }
    .echarts {
      width: 60vw;
      height: 100vh;
      background-color: #f6f3e5;
      margin: 3vw 0 0 0;
      border-radius: 0 20px 20px 0;
      display: inline-block;
    }
  }
}

@media screen and (max-width: 900px) {
  .indexMain {
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
      background-image: url("@/assets/images/indexbackground.png");
      background-size: 100% 100%;
      // border: 1px solid #000;

      .serach {
        padding: 10vw 0 0 37vw;
        :deep(.el-select__wrapper) {
          min-height: 3vw;
        }
        .input {
          width: 15vw;
          margin-right: 0.5vw;
          font-size: 0.6rem;
          height: 3vw;
        }
        .sbutton {
          font-size: 0.5rem;
          width: 5vw;
          height: 3vw;
        }
      }
    }
    .title {
      height: 3vw;
      width: 100vw;
      margin-left: -2vw;
      background-image: url("@/assets/images/titleIndex.png");
      background-size: 100% 100%;
    }
    .poetryRiver {
      margin-left: -2vw;
      // height: 5vw;
      width: 100vw;
      // .textInfo {
      //   margin: 2vw 0 0 25vw;
      //   // height: 5vw;
      //   width: 50vw;
      //   font-size: 1.2rem;
      //   color: #908d8d;
      // }
      .textInfo {
        margin: 3vw 0 0 14vw;
        // height: 5vw;
        width: 12vw;
        // font-size: 1.2rem;
        color: #908d8d;
        border-radius: 20px 0 0 20px;
        display: inline-block;
        float: left;
        background-color: #f6f3e5;
        height: 100vh;
        .infoImg {
          width: 70%;
          margin: 20vw 0 0 3vw;
        }
      }
      .echarts {
        width: 60vw;
        height: 100vh;
        background-color: #f6f3e5;
        margin: 3vw 0 0 0;
        border-radius: 0 20px 20px 0;
        display: inline-block;
      }
    }
  }
}
@media screen and (max-width: 600px) {
  .indexMain {
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
      background-image: url("@/assets/images/indexbackground.png");
      background-size: 100% 100%;
      // border: 1px solid #000;
      .serach {
        padding: 10vw 0 0 37vw;
        :deep(.el-select__wrapper) {
          // min-height: 16px;
          width: 35px;
        }
        .input {
          width: 15vw;
          margin: 0 0.5vw 0 5vw;
          font-size: 0.4rem;
          height: 22px;
        }
        .sbutton {
          font-size: 0.5rem;
          width: 5vw;
          height: 20px;
        }
      }
    }
    .title {
      height: 3vw;
      width: 100vw;
      margin-left: -2vw;
      background-image: url("@/assets/images/titleIndex.png");
      background-size: 100% 100%;
    }
    .poetryRiver {
      margin-left: -2vw;
      // height: 5vw;
      width: 100vw;
      // .textInfo {
      //   margin: 2vw 0 0 25vw;
      //   // height: 5vw;
      //   width: 50vw;
      //   font-size: 1.2rem;
      //   color: #908d8d;
      // }
      .textInfo {
        margin: 3vw 0 0 14vw;
        // height: 5vw;
        width: 12vw;
        // font-size: 1.2rem;
        color: #908d8d;
        border-radius: 20px 0 0 20px;
        display: inline-block;
        float: left;
        background-color: #f6f3e5;
        height: 100vh;
        .infoImg {
          width: 70%;
          margin: 20vw 0 0 3vw;
        }
      }
      .echarts {
        width: 60vw;
        height: 100vh;
        // background-color: #f6f3e5;
        margin: 3vw 0 0 0;
        border-radius: 0 20px 20px 0;
        display: inline-block;
      }
    }
  }
}

// @media screen and (max-width: 1000px) {
//   .about {
//     background-color: lightblue;
//   }
// }
</style>
