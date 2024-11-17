<template>
  <div id="app">
    <nav>
      <!-- <router-link to="/">Home</router-link> | -->
      <!-- <router-link to="/about">About</router-link> -->
      <router-link to="/login"/>
    </nav>
    <router-view/>
  </div>
</template>


<style>
/* 
 * 全局样式设置
 * 应用在整个页面上，确保页面占满高度并消除默认边距
 * 设置背景图像并进行适当的居中和缩放处理
 */

/* 应用程序的全局样式 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;/* 字体平滑 */
  -moz-osx-font-smoothing: grayscale;/* 字体平滑 */
  text-align: center;/* 文字居中 */
  color: #2c3e50;/*  文字颜色 */

  position: relative; /* 父容器必须是相对定位 */
  width: 100%; /* 父容器宽度 */
  height: 100vh; /* 父容器高度，这里设置为视口高度 */
  border: 1px solid black; /* 边框只是为了可视化效果 */
}

/* 导航栏样式 */
nav {
  padding: 30px;
}

/* 导航链接样式 */
nav a {
  font-weight: bold;
  color: #2c3e50;
}

/* 精确匹配的导航链接样式 */
nav a.router-link-exact-active {
  color: #42b983;
}
</style>