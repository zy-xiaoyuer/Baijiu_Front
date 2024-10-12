<template>
  <div class="detail">
    <div class="back-button">
      <el-button type="primary" @click="goBack">返回</el-button>
    </div>
    <div class="content" v-if="message && message.imagename">
      <img
        class="img"
        v-if="message.image"
        :src="getImageUrl(message.image)"
        alt="酒画图片"
        @error="handleImageError"
      />
      <h2>出处:{{ message.place }}</h2>
      <div class="additional-info">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="相关描述" name="description">
            <div class="description">
              <el-collapse v-model="innerActiveNames">
                <el-collapse-item title="酒画名称：" name="imagename">
                  <div class="imagename">
                    {{ message.imagename }}
                  </div>
                </el-collapse-item>
                <el-collapse-item title="朝代：" name="dynasty">
                  <div class="dynasty">
                    {{ message.dynasty }}
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
import { ref, onMounted, getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";
import request from "@/api/request.js";
import { globals } from "@/main";

const activeNames = ref(["1"]);
const innerActiveNames = ref([]);
const handleChange = (val: string[]) => {
  console.log(val);
};

const route = useRoute();
const router = useRouter();
const messageId = ref(
  parseInt(route.params.winePaintingDetailId as string, 10)
);
const message = ref({
  image: "",
  dynasty: "",
  imagename: "",
  place: "",
});

const getImageUrl = (image: string) => {
  const imageUrl =
    globals.$config?.serverUrl + `/upload/${image.split("\\").pop()}`;
  console.log("Image URL:", imageUrl);
  return imageUrl;
};

const fetchMessageDetail = async () => {
  try {
    const res = await request.get(`/poemimages/api/getPoemById`, {
      params: { id: messageId.value },
    });
    console.log("Response:", res);
    if (res.code === 200) {
      message.value = res.data;
      console.log("Picture from backend:", message.value.image); // 确认 picture 有值
    } else {
      message.value.imagename = "该酒画不存在。";
    }
  } catch (error) {
    console.error("请求失败:", error);
    message.value.imagename = "请求失败。";
  }
};

const handleImageError = (event) => {
  console.error("Image load error:", event);
};

onMounted(() => {
  fetchMessageDetail();
});

const goBack = () => {
  router.back();
};
</script>

<style lang="less" scoped>
.detail {
  padding: 2vw;
  background: #f6f3e5;
  border-radius: 1vw;
  .back-button {
    margin-bottom: 2vw;
  }
  .content {
    font-family: Source Han Sans;
    text-align: center;
    h2 {
      text-align: center;
      margin-left: 34vw;
      color: #908d8d;
    }
    .img {
      width: 50%;
    }
    .additional-info {
      text-align: justify;
      font-size: 1rem;
      color: #444;
      margin-top: 6vw;

      /deep/.el-collapse {
        font-size: 2rem;
        background-color: #f6f3e5 !important;
        margin-left: 2vw;
      }
      /deep/.el-collapse,
      .el-collapse-item__wrap {
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
}
</style>
