<template>
  <div id="image-view">
    <el-carousel :interval="5000" 
    height="611px"
    >
      <el-carousel-item style="height: 100%;" v-for="(image, index) in images" :key="index">
        <img :src="image" 
        style="width: 100%; height: 100%"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        "https://www.douyinwo.com/wp-content/uploads/2021/05/0-scaled.jpg",
        "https://ts1.cn.mm.bing.net/th/id/R-C.82e749cb17737c9ae9d8d6f1481de587?rik=SlLXsLN%2fm6WoeA&riu=http%3a%2f%2fimg.netbian.com%2ffile%2f2024%2f0204%2f214758dVddM.jpg&ehk=H5Gu2z58MNHB2LUrN2obqawzmBcIHuzPsUDprCWFAOw%3d&risl=&pid=ImgRaw&r=0",
        "https://ts1.cn.mm.bing.net/th/id/R-C.8bfd8dc5c36b57faf3ea65e01d36e7df?rik=BLrzORz7fYNVVA&riu=http%3a%2f%2fimg.52desk.com%2ftp%2f01132366lVu.jpg&ehk=6fijtnpQyEFURSwHo%2bLCM2BeajOcJ4OHIc%2b%2bstYleOs%3d&risl=&pid=ImgRaw&r=0",
        "https://www.adwest.cn/public/uploads/image/20240227/s202402271049476.jpg"
    ],
    };
  },
};
</script>

<style>


#image-view {
  position: absolute;
  left: 0;
  top: 0;
  background-color: aqua;
  height: 100%;
  width: 100%;
}

</style>