<template>
  <div id="root">
    <div id="img-container">
      <el-carousel :interval="4000" type="card" height="400px">
        <el-carousel-item v-for="(image, index) in images" :key="index">
          <img
            :src="image.src"
            :alt="image.alt"
            object-fit:
            cover
            style="width: 100%; height: 100%"
          />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="mycontainer">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="用户名:"
          prop="user"
          style="position: relative; top: 65px"
        >
          <el-input
            type="text"
            v-model="ruleForm.user"
            autocomplete="off"
            style="position: relative; width: 80%; margin-left: -50px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码:"
          prop="password"
          style="position: relative; top: 65px"
        >
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            style="position: relative; width: 80%; margin-left: -50px"
          ></el-input>
        </el-form-item>

        <el-form-item style="position: relative; top: 75px; margin-left: -70px">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios, { Axios } from "axios";

export default {
  data() {
    var checkUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名不能为空"));
      } else {
        if (this.ruleForm.user !== "") {
          this.$refs.ruleForm.validateField("checkUser");
        }
        callback();
      }
    };
    var checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        if (this.ruleForm.password !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
      }
      callback();
    };
    return {
      images: [
        {
          src: "https://tse4-mm.cn.bing.net/th/id/OIP-C.oX7zNQoBiRzHh7CJQnv7gwHaDq?w=310&h=173&c=7&r=0&o=5&dpr=1.3&pid=1.7",
          alt: "芙宁娜 ",
        },
        {
          src: "https://ts1.cn.mm.bing.net/th?id=OIP-C.Q1UKnvdZyZ3siDsopK-dWwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
          alt: "可莉",
        },
        {
          src: "https://tse3-mm.cn.bing.net/th/id/OIP-C.nxKgF0F3gzNFB1V3SVzTYQHaEo?rs=1&pid=ImgDetMain",
          alt: "甘雨",
        },
        {
          src: "https://tse1-mm.cn.bing.net/th/id/OIP-C.-5b2zi8SjZqRU0N9Vw_xWwHaEK?w=264&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
          alt: "散兵",
        },
        {
          src: "https://tse1-mm.cn.bing.net/th/id/OIP-C.rPsy8qKuK1vYpEbMDi6mRAHaD2?w=306&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
          alt: "纳西妲",
        },
        {
          src: "https://tse1-mm.cn.bing.net/th/id/OIP-C.zpom00CZUN7E2oTAz6htJgHaLH?w=202&h=303&c=7&r=0&o=5&dpr=1.3&pid=1.7",
          alt: "芭芭拉",
        },
      ],

      ruleForm: {
        user: "",
        password: "",
      },
      rules: {
        user: [{ validator: checkUser, trigger: "blur" }],
        password: [{ validator: checkPass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(ruleForm) {
      // 提交表单
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.login();
        } else {
          return false;
        }
      });
    },
    resetForm(ruleForm) {
      // 重置表单
      this.$refs[ruleForm].resetFields();
    },

    login() {
      // 登录逻辑
      axios({
        method: "get",
        url: "api/user/login",
        params: {
          user: this.ruleForm.user,
          password: this.ruleForm.password,
        },
      })
        .then((res) => {
          if (res.data.code === 1) {
            // 保存用户信息
            this.$store.commit("setUserName", this.ruleForm.user);
            // 保存token
            this.$store.commit("setToken", res.data.data);
            // 跳转到首页
            this.$router.push("/rootpage");
            this.$message.success("登录成功");
            return;
          } else if (res.data.code === 0) {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          this.$message.error(err.message);
          // this.$router.push("/");
        });
    },
  },
};
</script>

<style>
#img-container {
  position: relative; /* 绝对定位 */
  width: 55%;
  height: 400px;
  top: 20%;
  left: 5%;
}

.mycontainer {
  position: absolute; /* 绝对定位 */
  width: 25%;
  height: 40%;
  right: 10%;
  top: 25%;
  background-color: #fefefe; /* 背景颜色 */
  border-radius: 10px; /* 圆角 */
  box-shadow: 0 0 10px rgba(18, 1, 1, 0.3); /* 阴影 */
}


#root {
  position: absolute; /* 绝对定位 */
  top: 0px;
  margin: 100%; /* 居中 */
  width: 100%; /* 设置宽度 */
  height: 100%; /* 设置高度 */
  background-color: lightblue; /* 背景颜色 */
  height: 100%; /* 设置页面高度为 100% */
  margin: 0; /* 消除默认边距 */
  background: url("https://pic4.zhimg.com/v2-666eb28ba8e686a26ae7295cd6a2a47a_r.jpg")
    no-repeat center center fixed;
  background-size: cover; /* cover 填充整个屏幕，contain 保持比例 */
}
</style>