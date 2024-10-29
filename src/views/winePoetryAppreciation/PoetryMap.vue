<template>
  <div class="poetryMap">
    <div class="title">
      <img
        class="titleImg"
        src="@/assets/images/titleAppreciation1.png"
      />
    </div>

    <!-- <div class="textInfo">
      <img
        class="imgInfo"
        src="@/assets/images/infoAppreciation1.png"
      />
    </div> -->
    <p style="margin-left: 23vw; font-size: 1.3rem; color: #3d3d3d">
      醉翁之意不在酒，在乎山水之间。喝过的酒，走过的路，那些酒的记忆都散落在哪些地方呢?
    </p>
    <div style="display: flex">
      <div
        id="map"
        ref="map"
        class="map"
      ></div>
      <div class="rank">
        <poetryRank></poetryRank>
      </div>
    </div>
    <p style="margin-left: 15vw; font-size: 1rem; color: #3d3d3d">
      注：地图的纹理代表着不同地区的高程情况，柱状图的颜色和形状代表诗人们在该地区所著作的酒诗数目，颜色越浅越高代表着诗人们在该地区所饮酒作诗越多
    </p>
  </div>
</template>

<script lang="ts" setup>
import geoJson from "@/assets/json/china.json";
import * as echarts from "echarts";
import poi from "@/assets/json/position.json";
import "echarts-gl";
import { onMounted, ref, watch, onUnmounted, reactive } from "vue";
import poetryRank from "@/views/winePoetryAppreciation/PoetryRank";

// 监听窗口变化
// let nowClientWidth = document.documentElement.clientWidth;
// console.log(nowClientWidth);

const nowClientWidth = reactive({
  value: window.innerWidth,
});

function handleResize() {
  nowClientWidth.value = window.innerWidth;
  initMap();
  console.log(nowSize(1));
}

const nowSize = (val: number) => {
  const initWidth = 1920;
  return val * (nowClientWidth.value / initWidth);
};

const initMap = () => {
  const mapChart: HTMLElement = document.getElementById("map") as HTMLElement;
  const myChart = echarts.init(mapChart);
  myChart.resize();
  echarts.registerMap("china", geoJson as any);
  // console.log("poi", poi);
  // 绘制图表
  let option = {
    geo3D: {
      map: "china",
      itemStyle: {
        color: "#e1cfd8", // 区域颜色
        opacity: 1,
        borderWidth: 0.5,
        borderColor: "#344069", // 地图边配色
      },
      label: {
        show: true,
        color: "#e1cfd8",
        fontWeight: "lighter",
        textStyle: {
          color: "#fff",
          fontSize: nowSize(12),
        },
      },
      shading: "realistic",
      realisticMaterial: {
        // 注： 使用平铺需要 detailTexture 的高宽是 2 的 n 次方。例如 512x512，如果是 200x200 的纹理无法使用平铺。
        detailTexture: require("@/assets/images/map.png"), // 纹理贴图
        textureTiling: 0.79, // 纹理平铺，1是拉伸，数字表示纹理平铺次数
        textureOffset: [0.08, 0.25], //纹理图案的平移
      },
      // 控制地图收缩
      viewControl: {
        distance: nowSize(100),
      },
      // 调节对比色
      postEffect: {
        enable: true,
        bloom: {
          enable: false,
        },
        SSAO: {
          radius: 1,
          intensity: 1,
          enable: true,
        },
        depthOfField: {
          enable: false,
          focalRange: 10,
          blurRadius: 10,
          fstop: 1,
        },
      },
      // 地图高度
      regionHeight: 2,
    },
    visualMap: {
      left: nowSize(30),
      bottom: nowSize(10),
      max: nowSize(343),
      calculable: true,
      realtime: false,
      inRange: {
        color: ["#845EC2", "#A178DF", "#BE93FD", "#DCB0FF", "#FACCFF"],
      },
    },
    series: [
      {
        name: "诗词数量",
        type: "bar3D",
        coordinateSystem: "geo3D",
        shading: "lambert",
        barSize: 0.8,
        minHeight: 0.5,
        silent: true,
        itemStyle: {
          color: "#4a1075",
          opacity: 0.5,
          // color: "#b87333",
        },
        data: poi,
      },
    ],
  };
  myChart.setOption(option);
};
onMounted(() => {
  initMap();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style lang="less" scoped>
.poetryMap {
  .title {
    padding-top: 2vw;
    .titleImg {
      height: 3vw;
      width: 100vw;
      margin: 2vw 0 0 -2vw;
    }
  }

  .textInfo {
    position: absolute;
    display: inline-block;
    width: 22vw;
    height: 40vw;
    // background-color: #f6f3e5;
    margin: 5vw 0 0 15vw;
    .imgInfo {
      width: 90%;
      margin: 12vw 0 0 0;
    }
  }
  .map {
    display: inline-block;
    background-color: #f6f3e5;
    margin: 1vh 0 0 15vw;
    width: 35vw;
    height: 50vh;
    border-radius: 20px 0 0 20px;
  }
  .rank {
    width: 35vw;
    height: 30vw;
    border-radius: 20px;
  }
}
</style>
