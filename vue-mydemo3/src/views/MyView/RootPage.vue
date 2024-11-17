<template>
  <div id="app">
    <el-container
      style="
        position: relative;
        height: 100%;
        width: 100%;
        top: 0px;
        left: 0px;
        bottom: 0px;
      "
    >
      <el-header>
        <div>
          <el-image
            style="position: absolute; left: 0px; width: 5%; height: 9%"
            src="https://tse1-mm.cn.bing.net/th/id/OIP-C.88izgJw9jHvivCsc7WLYbQHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          ></el-image>
        </div>
        欢迎
      </el-header>

      <el-container>
        <el-aside width="20% ">
          <el-menu>
            <el-submenu index="1">
              <template slot="title"
                ><i class="el-icon-message"></i>用户管理</template
              >
              <el-menu-item index="1-1" @click="handleClick1"
                >用户列表</el-menu-item
              >
              <el-menu-item index="1-2" @click="handleClick2"
                >资源列表</el-menu-item
              >
              <el-menu-item index="1-3" @click="handleClick3"
                >开源组件</el-menu-item
              >
            </el-submenu>
          </el-menu>

          <div style="height: 39px;background-color:aliceblue;">
          </div>
           <el-carousel
              height="192px"
              direction="vertical"
              :autoplay="true"
              :interval="4000"
            >
              <el-carousel-item v-for="(image, index1) in images1" :key="index1">
               <img :src="image"/>
              </el-carousel-item>
            </el-carousel>
          

            <el-carousel
              height="192px"
              direction="vertical"
              :autoplay="true"
              :interval="7000"
            >
              <el-carousel-item v-for="(image, index2) in images2" :key="index2">
               <img :src="image"/>
              </el-carousel-item>
            </el-carousel>

        </el-aside>
        <el-main style="position: relative">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ImageView from './ImageView.vue';
export default {

  data(){
    return {
      images1:[
        "https://tse4-mm.cn.bing.net/th/id/OIP-C.flL6ozf2mEes-2Y8ouKvSAHaEG?w=273&h=184&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        "https://tse3-mm.cn.bing.net/th/id/OIP-C.IFYWPsbmrtKTX2Ldzv6N2AHaEo?w=278&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        "https://ts4.cn.mm.bing.net/th?id=OIP-C.MiEO7VCFQSPbTISbRxg9uQHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
        
      ],
      images2:[
      "https://tse1-mm.cn.bing.net/th/id/OIP-C.tbWuGZyGrkNskhdmoUQ_9gHaEK?w=331&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      "https://tse2-mm.cn.bing.net/th?id=OIF-C.jGH6RHdVPr3%2frmHOXCP%2biA&w=287&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      "https://tse4-mm.cn.bing.net/th/id/OIP-C.egf54hdzrLzIf3H8uY_yVgHaEK?w=287&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    ],
    }
  },

  methods: {
    handleClick1() {
      if (this.$route.path === "/rootpage/user") {
        return;
      }
      this.$router.push("/rootpage/user");
    },
    handleClick2() {
      if (this.$route.path === "/rootpage/assetc/image") {
        return;
      }
      this.$router.push("/rootpage/assetc/image");
    },
    // handleClick3(){}
  },
};
</script>

<style>


.el-header {
  background-color: #ebf0f47b;
  color: #39783f;
  font-size: 20px;
  font-style: italic;
  font-weight: 800;
  text-align: center;
  line-height: 60px; /*  设置头部高度为0 */
}

.el-aside {
  background-color: #dbe0e400;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #f1f3f1;
  height: 100%;
  color: #333;
  /* <!-- 设置文本对齐方式为靠中 --> */
  text-align: center;
}

#app {
  position: absolute;
  top: 0px;
  height: 100%;
  width: 100%;
}
</style>