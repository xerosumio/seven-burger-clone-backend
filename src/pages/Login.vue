<template>
  <div class="container">
    <div class="top"></div>
    <div class="bottom"></div>
    <div class="center">
      <h2 v-if="!register">Please Sign In</h2>
      <h2 v-if="register">Please register In</h2>
      <el-input v-if="register" v-model="name" type="text" placeholder="name" />
      <el-input v-model="email" type="email" placeholder="email" />
      <el-input v-model="password" type="password" placeholder="password" />
      <div style="width: 100%">
        <el-button v-if="!register" style="width: 100%" @click="Login"
          >Login</el-button
        >
        <el-button v-if="register" style="width: 100%" @click="CreateAccount"
          >Create Account</el-button
        >
      </div>
      <div v-if="register" style="width: 100%" @click="clickRegister">
        Login
      </div>
      <div v-if="!register" style="width: 100%" @click="clickRegister">
        Create Account
      </div>
    </div>
  </div>
  <el-dialog v-model="visible" :show-close="false" align-center>
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">Error</h4>
        <el-button type="danger" @click="close">
          <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
          Close
        </el-button>
      </div>
    </template>
    {{ error }}
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from "vue";
import { ElButton, ElDialog } from "element-plus";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import { userAppwriteAccount } from "@/appwrite/userAppwriteAccount.js";
const { createAccount, login } = userAppwriteAccount();
import { useRouter } from "vue-router";
const router = useRouter();
import { useStore } from "vuex";
const store = useStore();
const register = ref(false);
const email = ref("2013826057@qq.com");
const password = ref("2013826057");
const name = ref();
const visible = ref(false);
const error = ref();
const Login = async () => {
  try {
    const loginResp = await login(email.value, password.value);
    if (loginResp?.userId) {
      router.push({
        path: "/home",
      });
      store.commit("user/updateUserId", loginResp?.userId);
      localStorage.setItem("userId", loginResp?.userId);
    } else {
      password.value = "";
      visible.value = true;
      error.value = loginResp;
    }
  } catch (e) {
    console.log(e);
    return;
  }
};
const CreateAccount = async () => {
  try {
    const createAccountResp = await createAccount(
      email.value,
      password.value,
      name.value
    );
    console.log(createAccountResp);
  } catch (e) {
    console.log(e);
  }

  email.value = "";
  password.value = "";
};
const clickRegister = () => {
  register.value = !register.value;
};
</script>
<style lang="scss" scoped>
@import "@/styles/main.scss";
@import url("https://fonts.googleapis.com/css?family=Raleway:400,700");
*,
*:before,
*:after {
  box-sizing: border-box;
}
body {
  min-height: 100vh;
  font-family: "Raleway", sans-serif;
  margin: 0;
}
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.container:hover .top:before,
.container:hover .top:after,
.container:hover .bottom:before,
.container:hover .bottom:after,
.container:active .top:before,
.container:active .top:after,
.container:active .bottom:before,
.container:active .bottom:after {
  margin-left: 200px;
  transform-origin: -200px 50%;
  transition-delay: 0s;
}
.container:hover .center,
.container:active .center {
  opacity: 1;
  transition-delay: 0.2s;
}
.top:before,
.top:after,
.bottom:before,
.bottom:after {
  content: "";
  display: block;
  position: absolute;
  width: 200vmax;
  height: 200vmax;
  top: 50%;
  left: 50%;
  margin-top: -100vmax;
  transform-origin: 0 50%;
  transition: all 0.5s cubic-bezier(0.445, 0.05, 0, 1);
  z-index: 10;
  opacity: 0.65;
  transition-delay: 0.2s;
}
.top:before {
  transform: rotate(45deg);
  background: #e46569;
}
.top:after {
  transform: rotate(135deg);
  background: #ecaf81;
}
.bottom:before {
  transform: rotate(-45deg);
  background: #60b8d4;
}
.bottom:after {
  transform: rotate(-135deg);
  background: #3745b5;
}
.center {
  position: absolute;
  width: 400px;
  height: 400px;
  top: 50%;
  left: 50%;
  margin-left: -200px;
  margin-top: -200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.445, 0.05, 0, 1);
  transition-delay: 0s;
  color: #333;
}
.center input {
  width: 100%;
  padding: 15px;
  margin: 5px;
  border-radius: 1px;
  border: 1px solid #ccc;
  font-family: inherit;
}
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
