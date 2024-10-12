<template>
  <div class="detail">
    <div class="back-button">
      <el-button type="primary" @click="goBack">返回</el-button>
    </div>
    <div class="content" v-if="poetry">
      <h1>{{ poetry.title }}</h1>
      <h3>{{ poetry.dynasty }} · {{ poetry.author }}</h3>
      <p class="poetry-content">{{ poetry.content }}</p>
      <div class="additional-info">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="相关描述" name="description">
            <div class="description">
              <el-collapse v-model="innerActiveNames">
                <el-collapse-item title="作诗地点" name="place">
                  <div class="place">
                    {{ poetry.place }}
                  </div>
                </el-collapse-item>
                <el-collapse-item title="情感" name="emotion">
                  <div class="emotion">
                    {{ poetry.emotion }}
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import request from "@/api/request"; // 确保这是你的请求方法的路径

const activeNames = ref(["1"]);
const innerActiveNames = ref([]);
const handleChange = (val: string[]) => {
  console.log(val);
};

const route = useRoute();
const router = useRouter();
const poetryId = ref<number>(
  parseInt(route.params.winePoetryDetailId as string, 10)
);
const poetry = ref<any>(null);

const fetchPoetryDetail = async () => {
  try {
    const res = await request.get(`poemsbydynasty/api/getPoemById`, {
      params: { id: poetryId.value },
    });
    if (res.code === 200 && res.data) {
      poetry.value = res.data;
    } else {
      poetry.value = {
        title: "未找到诗词",
        author: "",
        content: "该诗词不存在。",
        place: "",
        characters: [],
      };
    }
  } catch (error) {
    console.error("请求失败:", error);
    poetry.value = {
      title: "未找到诗词",
      author: "",
      content: "请求失败。",
      place: "",
      characters: [],
    };
  }
};

onMounted(() => {
  fetchPoetryDetail();
});

const goBack = () => {
  router.back(); // 使用 router.back() 来模拟浏览器的后退功能
};
</script>

<style lang="less" scoped>
.detail {
  padding: 2vw;
  background: #f6f3e5;
  // border-radius: 1vw;
  .back-button {
    margin-bottom: 2vw;
  }
  .content {
    font-family: Source Han Sans;
    // text-align: center;
    h1 {
      text-align: center;
      font-family: Source Han Sans;
      font-variation-settings: "opsz" auto;
      font-feature-settings: "kern" on;
      font-size: 2rem;
      color: #3d3d3d;
      margin-bottom: 1vw;
    }
    h3 {
      text-align: center;
      font-size: 1.5rem;
      font-variation-settings: "opsz" auto;
      font-feature-settings: "kern" on;
      color: #908d8d;
      margin-bottom: 1vw;
    }
    .poetry-content {
      text-align: justify;
      font-size: 1.2rem;
      line-height: 1.8rem;
      color: #908d8d;
      // text-align-last: left;
      white-space: pre-wrap;
      margin-left: 38vw;
      margin-right: 35vw;
      // margin-bottom: 2vw;
      // text-indent: 2em; /* 每段首行缩进两个字符 */
    }
  }
  .additional-info {
    text-align: justify;
    font-size: 1rem;
    color: #444 ;
    margin-top: 6vw;

    /deep/.el-collapse {
      font-size: 2rem;
      background-color: #f6f3e5 !important;
      margin-left: 2vw;
    }
    /deep/.el-collapse,.el-collapse-item__wrap {
      font-size: 2rem;
      border: none;
      background-color: #f6f3e5 !important;
    }
    /deep/ .el-collapse-item__header {
      font-size: 1rem;
        color: #1c0d0d;
        background-color: #f6f3e5 !important;
    }
    /deep/ .el-collapse-item__content {
      font-size: 1rem;
      text-indent: 2em; /* 每段首行缩进两个字符 */
        color: #0e0707;
        background-color: #f6f3e5 !important;
    }
  }
}
</style>
