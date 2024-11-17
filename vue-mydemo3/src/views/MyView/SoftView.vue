<template>
  <div>
    <div id="soft1">
      <div>
        <el-image
          :src="src1"
          style="
            position: relative;
            width: 50%;
            height: 30%;
            margin-top: 10px;
            margin-left: 10px;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); /* 水平偏移量 垂直偏移量 模糊半径 颜色 */
            border-radius: 8px; /* 可选：添加圆角效果 */
          "
        >
          <div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div>
        </el-image>
        <div style="margin-top: 10px">DataGrip 2024.1.4.zip</div>
        <div>
          <el-button
            type="primary"
            @click="downloadFile1"
            :width="12"
            style="margin-top: 10px; margin-bottom: 10px; margin-right: 10px"
            :disabled="disabled[0]"
            >下载文件</el-button
          >

          <el-progress
            type="circle"
            stroke-width="6"
            :percentage="data[0].percentage"
            :width="45"
            style="top: 15px"
          ></el-progress>
        </div>
      </div>
    </div>

    <div id="soft2">
      <el-image
        :src="src2"
        style="
          position: relative;
          width: 50%;
          height: 30%;
          margin-top: 10px;
          margin-left: 10px;
          box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); /* 水平偏移量 垂直偏移量 模糊半径 颜色 */
          border-radius: 8px; /* 可选：添加圆角效果 */
        "
      >
        <div slot="placeholder" class="image-slot">
          加载中<span class="dot">...</span>
        </div>
      </el-image>
      <div style="margin-top: 10px">JetBrains全家桶激活.zip</div>
      <div>
        <el-button
          type="primary"
          @click="downloadFile2"
          :width="12"
          style="margin-top: 10px; margin-bottom: 10px; margin-right: 10px"
          :disabled="disabled[1]"
          >下载文件</el-button
        >

        <el-progress
          type="circle"
          stroke-width="6"
          :percentage="data[1].percentage"
          :width="45"
          style="top: 15px"
        ></el-progress>
      </div>
    </div>

    <div id="soft3">
      <el-image
        :src="src3"
        style="
          position: relative;
          width: 50%;
          height: 30%;
          margin-top: 10px;
          margin-left: 10px;
          box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); /* 水平偏移量 垂直偏移量 模糊半径 颜色 */
          border-radius: 8px; /* 可选：添加圆角效果 */
        "
      >
        <div slot="placeholder" class="image-slot">
          加载中<span class="dot">...</span>
        </div>
      </el-image>
      <div style="margin-top: 10px">Redis.zip</div>
      <div>
        <el-button
          type="primary"
          @click="downloadFile3"
          :width="12"
          style="margin-top: 10px; margin-bottom: 10px; margin-right: 10px"
          :disabled="disabled[2]"
          >下载文件</el-button
        >

        <el-progress
          type="circle"
          stroke-width="6"
          :percentage="data[2].percentage"
          :width="45"
          style="top: 15px"
        ></el-progress>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      disabled: [false, false,false],
      data: [
        {
          percentage: 0,
        },
        {
          percentage: 0,
        },
        {
          percentage: 0,
        },
      ],
      src1: "https://tse3-mm.cn.bing.net/th/id/OIP-C.CKTFZKBIwgKTP-klMvjpsQHaHa?w=160&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      src2: "https://tse2-mm.cn.bing.net/th/id/OIP-C.877o_UHWelEmWSPGsOuEdAHaHa?w=159&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      src3: require('@/assets/Redis.png'),
    };
  },
  methods: {
    downloadFile1() {
      var filename = "DataGrip 2024.1.4.zip";
      this.downloadFile(filename, 0);
    },

    downloadFile2() {
      var filename = "JetBrains全家桶激活.zip";
      this.downloadFile(filename, 1);
    },

    downloadFile3() {
      var filename = "Redis.zip";
      this.downloadFile(filename, 2);
    },


    downloadFile(filename, number) {
      this.disabled[number] = true; // 禁用按钮
      this.data[number].percentage = 0; // 重置进度
      axios({
        method: "get",
        url: "/api/download/file", // 替换为实际的下载接口
        responseType: "blob", // 重要：指定响应类型为 blob
        params: {
          fileName: filename,
        },
        headers: {
          token: this.$store.state.token,
        },
        onDownloadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          this.data[number].percentage = percent; // 更新进度
        },
      })
        .then((response) => {
          // 创建一个 Blob 对象，用于存储文件
          const blob = new Blob([response.data]);
          const url = window.URL.createObjectURL(blob);

          // 创建一个链接元素并模拟点击下载
          const a = document.createElement("a");
          a.href = url;
          a.download =
            response.headers["content-disposition"].split("filename=")[1]; // 替换为实际文件名
          document.body.appendChild(a);
          a.click();

          // 释放 URL 对象
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
          this.data[number].percentage = 0; // 下载完成，进度置零
          this.$message.success(filename + "下载完成！");
          this.disabled[number] = false; // 下载完成，按钮可用
        })
        .catch((error) => {
          if (error.response && error.response.status === 402) {
            this.$message.error("登录超时，请重新登录！");
            this.$router.push("/login");
            return;
          }
          this.$message.error("下载失败: " + error.message);
          this.disabled[number] = false; // 下载完成，按钮可用
        });
    },
  },
};
</script>

<style>
#soft1 {
  position: relative;
  width: 200px;
  background-color: rgb(40, 209, 235);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); /* 水平偏移量 垂直偏移量 模糊半径 颜色 */
  border-radius: 8px; /* 可选：添加圆角效果 */
}

#soft2 {
  position: relative;
  width: 200px;
  left: 250px;
  top: -227px;
  background-color: rgb(40, 209, 235);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); /* 水平偏移量 垂直偏移量 模糊半径 颜色 */
  border-radius: 8px; /* 可选：添加圆角效果 */
}

#soft3 {
  position: relative;
  width: 200px;
  left: 500px;
  top: -455px;
  background-color: rgb(40, 209, 235);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); /* 水平偏移量 垂直偏移量 模糊半径 颜色 */
  border-radius: 8px; /* 可选：添加圆角效果 */
}
</style>