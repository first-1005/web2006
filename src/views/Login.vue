<template>
  <div class="login-box">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs-box" stretch>
      <el-tab-pane label="登录" name="login">
        <el-form :model="userLogin" status-icon :rules="rules" ref="userLogin">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="userLogin.username" autocomplete></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="userLogin.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('userLogin')">登录</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册" name="register ">
        <el-form :model="userLogin" status-icon :rules="rules" ref="userLogin">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="userLogin.username" autocomplete></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="userLogin.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="surePassword">
            <el-input type="password" v-model="userLogin.surePassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input type="text" v-model="userLogin.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('userLogin')">注册</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import api from "../api/index";
import jwt from "jwt-decode";
import { mapMutations } from "vuex";
export default {
  name: "Login",
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      }
      if (value.length <= 3) {
        callback(new Error("用户名长度不够"));
      }
      callback();
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      callback();
    };
    var validateSurePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } 
      if(value !== this.userLogin.password){
        callback(new Error("确认密码与密码不一致"));
      }
      callback();
      
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        callback();
      }
    };
    return {
      userLogin: {
        username: "",
        password: "",
        email: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        surePassword: [{ validator: validateSurePassword, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
      },
      activeName: "login",
    };
  },
  methods: {
    ...mapMutations("loginModule", ["setUserInfo"]),
    submitForm() {
      // console.log(this.userLogin);
      if (this.activeName === "login") {
        // 登录
        api.getLogin({
            username: this.userLogin.username,
            password: this.userLogin.password,
          })
          .then((res) => {
            // console.log(res);
            if (res.status == 200) {
              this.setUserInfo({
                username: jwt(res.data).username,
                token: res.data,
              });
              localStorage.setItem("ego", res.data);
              this.$router.push("/");
            }
          })
          .catch((error) => {
            // console.log(error.response);
            this.$message({
              message: error.response.data.errors,
              type: "error",
            });
          });
      } else {
        // 注册
        api.getRegister({
            username: this.userLogin.username,
            password: this.userLogin.password,
            email: this.userLogin.email,
          })
          .then((res) => {
            console.log(res.data);
            if (res.data) {
              this.$message({
                message: res.data.msg,
                type: "success",
              }); 
              this.userLogin.password='';
            }
            
          })
          .catch((error)=>{
            this.$message({
                message: error.response.data.msg,
                type: "error",
              });
          })
          
          ;
      }
    },
    handleClick() {},
  },
};
</script>

<style scoped>
.login-box {
  position: relative;
}
.tabs-box {
  position: absolute;
  width: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 30%);
  border: 1px solid #666;
  padding: 30px;
}
</style>