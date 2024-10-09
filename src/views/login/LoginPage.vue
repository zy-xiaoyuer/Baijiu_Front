<template>
  <div class="indexMain">
    <div class="container">
      <el-form
        ref="ruleFormRef"
        :model="loginUser"
        :rules="rules"
        label-width="100px"
        class="login-form"
        method="post"
      >
        <div class="form-header">白酒文化数据库</div>
        <el-form-item
          label="姓名"
          prop="username"
        >
          <el-input
            v-model="loginUser.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            type="password"
            v-model="loginUser.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="load"
            color="#7D3030"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch, onUnmounted, reactive } from "vue";
let loginUser = reactive({
  username: "",
  password: "",
});
let rules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
function load() {
  window.location.href = "/index";
  // 登录
}

onMounted(() => {
  // load();
});
</script>

<style lang="less" scoped>
// .indexMain {
//   background-image: url("@/assets/images/background.jpg");
//   background-size: 100% 100%;
//   background-repeat: no-repeat;
//   width: 96vw;
//   height: 88vh;
//   margin-left: 2vw;
//   padding: 0 0 5vw 0;
// }

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  padding: 0;
  background-image: url("@/assets/images/background.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.form-header {
  font-size: 38px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #7d3030;
  margin-top: 20px;
}

.login-form {
  width: 500px;
  height: 30vh;
  border-radius: 15px;
  padding: 10px;
  background: #ffffff;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
}

.login-form .el-form-item {
  margin-bottom: 24px;
  margin-right: 35px;
}

.el-button {
  width: 100%;
}
</style>
