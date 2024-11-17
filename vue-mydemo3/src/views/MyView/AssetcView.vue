<template>
  <div id="app-view">
    <el-container style="height: 100%">
      <el-header id="header" >
        <el-row>
          <el-button type="primary" round @click="pathTo1">主界面</el-button>
          <el-button type="primary" round @click="pathTo2">软件资源</el-button>
          <el-button type="primary" round>主要按钮</el-button>
          <el-button type="primary" round>主要按钮</el-button>
          <el-button type="primary" round>主要按钮</el-button>
          <el-button type="primary" round>主要按钮</el-button>
        </el-row>
      </el-header>

      <el-main id="main">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  // data() {

  // },
  methods: {
    pathTo1() {
      if (this.$route.path === "/rootpage/assetc/image") {
        return;
      }
      this.$router.push("/rootpage/assetc/image");
    },
    pathTo2() {
      if (this.$route.path === "/rootpage/assetc/soft") {
        return;
      }
      this.$router.push("/rootpage/assetc/soft");
    },
  },
};
</script>

<style>
#header {
  position: relative;
  background-color: #236de493;
  color: #333;
  text-align: center;
  line-height: 60px;
  width: 100%;
}

#main {
  position: relative;
  background-color: #f0ecec;
  color: #333;
  text-align: center;
  height: 100%;
}

#app-view {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  top: 0;
  left: 0;
}
</style>