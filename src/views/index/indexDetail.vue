<template>
  <div class="about">
    <div class="main-content">
      <div
        id="rank"
        ref="rank"
        class="rank"
      ></div>

      <div class="text">
        <h3>共{{ total }}条数据</h3>
        <hr />
        <!-- {{ searchdata }} -->
        <div
          v-for="item in searchdata"
          :key="item.id"
        >
          <div v-if="'picture' in item">
            <router-link
              :title="item.name"
              :to="{
                name: 'winePaintingDetail',
                params: { winePaintingDetailId: item.id },
              }"
            >
              <img
                class="img"
                :src="
                  globals.$config?.serverUrl +
                  '/upload/' +
                  item.picture.split('\\').pop()
                "
                alt="Image"
              />
            </router-link>
            <p style="margin-left: 2vw; color: #3d3d3d">
              朝代：{{ item.age }}<br />
              收藏博物馆：{{ item.now }}
            </p>
          </div>
          <div v-else-if="'image' in item">
            <router-link
              :title="item.name"
              :to="{
                name: 'winePaintingDetail',
                params: { winePaintingDetailId: item.id },
              }"
            >
              <img
                class="img"
                :src="
                  globals.$config?.serverUrl +
                  '/upload/' +
                  item.image.split('\\').pop()
                "
                alt="Image"
              />
            </router-link>
            <p style="margin-left: 2vw; color: #3d3d3d">
              酒画名称：{{ item.imagename }}
            </p>
          </div>
          <div
            class="poem-item-wrapper"
            v-else
          >
            <router-link
              class="poem-item"
              :to="{
                name: 'winePoetryDetail',
                params: { winePoetryDetailId: item.id },
              }"
            >
              <div class="poem-header">
                <span class="custom-title">{{ item.title }}</span>
                <span class="custom-author">{{ item.author }}</span>
                <span class="custom-type">{{ item.dynasty }}</span>
              </div>
              <p class="custom-content">{{ item.content }}</p>
            </router-link>
            <hr />
          </div>
        </div>
        <div class="demo-pagination-block">
          <el-pagination
            :current-page="currentPage"
            :page-size="[10, 20, 30, 40]"
            :size="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @current-change="handleCurrentChange"
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
import { onMounted, ref, computed, reactive } from "vue";
import request from "@/api/request";
import { globals } from "@/main";
import { useRoute } from "vue-router";

const route = useRoute();
console.log(route.query.searchQuery);

let searchdata = ref();

// const input = ref("");
const currentPage = ref(1);
const pageSize = ref(10);
const size = ref("default");
const total = ref(0);
const handleSizeChange = (val: number) => {
  pageSize.value = `${val}`;

  // console.log(typeof pageSize.value);
  load();
};
const handleCurrentChange = (val: number) => {
  currentPage.value = `${val}`;
  // console.log(typeof currentPage.value);
  load();
};

function load() {
  request
    .post("/search/api/globalPage", {
      pageSize: pageSize.value,
      pageNum: currentPage.value,
      params: {
        searchQuery: route.query.searchQuery,
      },
    })
    .then((res) => {
      //res已经是data了
      console.log("全局检索");
      console.log(res);
      // console.log(res.data);
      searchdata.value = res.data;
      total.value = res.total;
      // console.log("searchdata", searchdata.value);
      //console.log(res.data.dynasty)
      if (res.code === 200) {
        //
      } else {
        alert("数据获取失败：" + res.msg);
      }
    });
}

onMounted(() => {
  load();
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
    background: transparent;
  }
  .text {
    position: relative;
    // left: 28vw;
    top: 4vw;
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
