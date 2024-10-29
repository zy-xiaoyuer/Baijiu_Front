<template>
  <div class="mainContainer">
    <div class="headMenu">
      <div class="middle">
        <el-menu
          class="el-menu"
          mode="horizontal"
          text-color="#000"
          active-text-color="#7D3030"
          background-color="transparent"
          @select="handleSelect"
          router
          :default-active="defaultMenu"
          unique-opened
          :StaticEnableDefaultPopOutImage="false"
        >
          <el-menu-item
            class="el-menu-item"
            index="/index"
            >首页</el-menu-item
          >
          <el-menu-item
            class="el-menu-item"
            index="/winePoetry"
            >赋酒诗词</el-menu-item
          >
          <el-menu-item
            class="el-menu-item"
            index="/wineVessel"
            >酒器</el-menu-item
          >
          <el-menu-item
            class="el-menu-item"
            index="/winePainting"
            >酒画</el-menu-item
          >
          <el-menu-item
            class="el-menu-item"
            index="/winePoretyGraph"
            >酒诗图谱</el-menu-item
          >
          <el-menu-item
            class="el-menu-item"
            index="/winePoetryAppreciation"
            >酒诗图赏</el-menu-item
          >
        </el-menu>
      </div>

      <div class="right">
        <img
          src="@/assets/images/user.png"
          class="rightimg"
        />
        <router-link
          :to="{
            name: 'loginPage',
          }"
          ><el-button
            link
            class="loginbtn"
          >
            登录
          </el-button></router-link
        >
      </div>
    </div>
    <div class="main">
      <!-- <div class="tabs">
            <tabs />
          </div>-->
      <router-view
        v-slot="{ Component }"
        v-if="isRouterActive"
      >
        <KeepAlive>
          <component
            :is="Component"
            :key="$route.name"
            v-if="$route.meta.keep"
          ></component>
        </KeepAlive>
        <component
          :is="Component"
          :key="$route.name"
          v-if="!$route.meta.keep"
        ></component>
      </router-view>
    </div>
    <div class="foot">
      <!-- <div class="serachBottom">
        <div class="serach">
          <el-input
            class="input"
            v-model="input"
            placeholder="全局检索你感兴趣的内容"
            clearable
          />

          <el-button
            type="primary"
            color="#7D3030"
            class="sbutton"
            @click="load"
            >搜索</el-button
          >
        </div>
      </div> -->
      <p style="float: left; margin: 14vh 0 0 33vw">
        © 2021-2024 四川省大数据可视分析技术工程实验室 版权所有
      </p>
    </div>
  </div>

  <el-backtop :bottom="100">
    <div
      style="
        height: 100%;
        width: 100%;
        /* border: 1px solid #908d8d; */
        border-radius: 30px;
        background-color: #f6f3e5;
      "
    >
      <img
        src="@/assets/images/arrow.png"
        style="height: 100%"
      />
    </div>
  </el-backtop>
</template>
<script setup lang="ts">
import {
  ref,
  reactive,
  onMounted,
  watch,
  onBeforeMount,
  computed,
  onUpdated,
  onUnmounted,
  provide,
  nextTick,
} from "vue";
import { useRouter } from "vue-router";

// main内容更新---------------
const isRouterActive = ref(true);
provide("reload", () => {
  isRouterActive.value = false;
  nextTick(() => {
    isRouterActive.value = true;
  });
});
let router = useRouter();

const defaultMenu = computed(() => {
  return router.currentRoute.value.fullPath;
});

// 导航栏
const activeIndex2 = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
// 跳转登录
// const toggleChange = () => {
//   window.location.href =
//     window.location.protocol + "//" + window.location.host + "/login";
// };

// 回到顶部

// 搜索
const input = ref("");
function load() {
  // window.location.href = `/indexDetail?searchQuery=${input.value}`;
  console.log("load()", input.value);
  router.push({
    name: "indexDetail",
    query: { searchQuery: input.value },
  });
}

onMounted(() => {
  //
});

onUnmounted(() => {
  //
});
</script>
<style lang="less">
.mainContainer {
  position: absolute;
  left: 0;
  top: 0;
  .headMenu {
    width: 100vw;
    height: 4.5vw;
    background-image: url("@/assets/images/head.png");
    background-size: 100% 100%;

    // font-size:30px;

    .middle {
      width: 40vw;
      height: 3.5vw;
      margin: 1vw 0 0 45vw;
      display: inline-block;
      .el-menu {
        height: 100%;
        .el-menu-item {
          font-size: 1.2rem;
        }
      }
    }
    .right {
      margin: 1vw 0 0 0.5vw;
      display: inline-block;
      width: 10vw;
      height: 3.5vw;
      // float: left;
      .rightimg {
        height: 1.5vw;
      }
      .loginbtn {
        font-size: 1.2rem;
        margin-top: -0.6vw;
      }
    }
  }

  .main {
    // width: 100vw;
    // height: 100%;
    // background-image: url("@/assets/images/background.jpg");
    // background-color: "#908d8d";
    // background-size: 100% 100%;
  }
  .foot {
    width: 100vw;
    height: 9vw;
    background-image: url("@/assets/images/foot.png");
    background-size: 100% 100%;
    .serachBottom {
      .serach {
        float: right;
        margin-right: 20vw;
        margin-top: 2vh;
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
  }
}
@media screen and (max-width: 900px) {
  .mainContainer {
    position: absolute;
    left: 0;
    top: 0;

    .headMenu {
      width: 100vw;
      height: 4.5vw;
      background-image: url("@/assets/images/head.png");
      background-size: 100% 100%;

      // font-size:30px;

      .middle {
        width: 20vw;
        height: 3.5vw;
        margin: 1vw 0 0 45vw;
        display: inline-block;

        .el-menu {
          height: 100%;

          .el-menu-item {
            font-size: 1rem;
          }
        }
      }

      .right {
        margin: 1vw 0 0 20vw;
        display: inline-block;
        width: 10vw;
        height: 3.5vw;
        // float: left;
        .rightimg {
          height: 2vw;
        }
        .loginbtn {
          font-size: 1rem;
          margin-top: -0.6vw;
        }
      }
    }

    .main {
      // width: 100vw;
      // height: 100%;
      // background-image: url("@/assets/images/background.jpg");
      // background-color: "#908d8d";
      // background-size: 100% 100%;
    }

    .foot {
      width: 100vw;
      height: 9vw;
      background-image: url("@/assets/images/foot.png");
      background-size: 100% 100%;
      .serachBottom {
        .serach {
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
    }
  }
}
@media screen and (max-width: 600px) {
  .mainContainer {
    position: absolute;
    left: 0;
    top: 0;

    .headMenu {
      width: 100vw;
      height: 4.5vw;
      background-image: url("@/assets/images/head.png");
      background-size: 100% 100%;

      // font-size:30px;

      .middle {
        width: 10vw;
        height: 3.5vw;
        margin: 1vw 0 0 45vw;
        display: inline-block;

        .el-menu {
          height: 100%;

          .el-menu-item {
            font-size: 0.6rem;
          }
        }
      }

      .right {
        margin: 0 0 0 30vw;
        display: inline-block;
        width: 10vw;
        height: 3.5vw;

        // float: left;
        .rightimg {
          height: 2.5vw;
        }
        .loginbtn {
          font-size: 0.6rem;
          margin-top: -0.6vw;
        }
      }
    }

    .main {
      // width: 100vw;
      // height: 100%;
      // background-image: url("@/assets/images/background.jpg");
      // background-color: "#908d8d";
      // background-size: 100% 100%;
    }

    .foot {
      width: 100vw;
      height: 9vw;
      background-image: url("@/assets/images/foot.png");
      background-size: 100% 100%;
      .serachBottom {
        .serach {
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
    }
  }
}
</style>
