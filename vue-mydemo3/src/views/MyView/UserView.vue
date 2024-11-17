<template>
  <div id="user-view">
    <div style="position: absolute; top: 10px; left: 0;">
      <label style="margin-right: 20px; top: 0; margin-left: 30px"
        >用户名 :</label
      >
      <el-input
        v-model="name"
        placeholder="请输入用户名"
        style="width: 200px; margin-right: 20px"
      ></el-input>
      <el-button type="primary" @click="search">查询</el-button>

      <el-button
        type="primary"
        @click="dialogFormVisible = true"
        style="left: 20px"
        >添加用户</el-button
      >

      <el-dialog
        title="添加用户"
        :visible.sync="dialogFormVisible"
        style="text-align: center"
      >
        <el-form :model="form">
          <el-form-item
            label="用户名:"
            :label-width="formLabelWidth"
            style="width: 20%"
          >
            <el-input
              v-model="form.name"
              autocomplete="off"
              placeholder="新增用户名"
              style="width: 200px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="年龄:"
            :label-width="formLabelWidth"
            style="width: 20%"
          >
            <el-input
              v-model="form.age"
              autocomplete="off"
              placeholder="年龄"
              style="width: 200px"
            ></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <el-skeleton :rows="18" :animated="animated" />

    <div id="table-container" >
      <el-table :data="records" border  style="line-height: 10%;width: 95%;  margin: auto; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <el-table-column prop="userName" label="用户名" width="180">
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="180"> </el-table-column>
        <el-table-column prop="stutus" label="是否在线" width="180">
          <template slot-scope="scope">{{
            scope.row.stutus === 1 ? "在线" : "离线"
          }}</template
          ><!--  自定义显示列 -->
        </el-table-column>
        <el-table-column prop="createDate" label="创建日期"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <span slot-scope="scope" style="position: absolute; top: 0">
            <el-button type="text" @click="open(scope.row)" style="height: 5px"
              >删除</el-button
            >
            <el-button type="text">编辑</el-button>
          </span>
        </el-table-column>
      </el-table>

      <div style="position: relative; right: 400px; top: 10%;">
      <el-pagination
        background
        layout="prev, pager, next"
        style="margin-left: 750px"
        :total="total"
        @current-change="update"
      >
      </el-pagination>
    </div>
    </div>
    
    
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "", // 搜索用户名
      page: 1, // 当前页码
      pageSize: 10, // 每页显示条数

      total: 0, // 总条数
      records: [], //接收用户数据

      flag: 0, //标志位

      animated:true, // 骨架屏开关

      dialogVisible: false,// 默认关闭用户弹窗

      dialogFormVisible: false, //  默认关闭表单弹窗
      form: {
        name: "", //新增用户名
        age: "", //新增年龄
        delivery: false, //是否配送
      },
      formLabelWidth: "120px",
    };
  },
  methods: {

    //删除用户
    open(row) {
      this.$confirm("此操作将删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {

          if(this.$store.state.userName !== "admin"){
        this.$message.error("您不是管理员,无权限删除用户");
        return;
        }
          axios({
            method: "get",
            url: "/api/user/delete",
            params: {
              userName: row.userName,
            },
            headers: {
              token: this.$store.state.token,
            },
          })
            .then((res) => {
              if (res.data.code === 1) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.send();
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch((err) => {
              this.$message.error("删除失败" + err.message);
            });
        })
        .catch((err) => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    search() {
      this.send();
    },
    // 设置离线状态
    setStusa() {
      axios({
        method: "get",
        url: "/api/user/setStuta",
        params: {
          userName: this.$store.state.userName,
        },
        headers: {
          token: this.$store.state.token,
        },
      }).catch(err=>{
        console.log(err)
      })
    },

    // 弹窗添加用户
    addUser() {
      this.dialogFormVisible = false;

      if(this.$store.state.userName !== "admin"){
        this.$message.error("您不是管理员,无权限添加用户");
        return;
      }

      if (this.form.name === "" && this.form.age === "") {
        this.$message.error("用户名或年龄不能为空");
        return;
      }

      if (isNaN(this.form.age)) {
        this.$message.error("年龄必须为数字");
        return;
      }

      axios({
        method: "post",
        url: "/api/user/add",
        data: {
          userName: this.form.name,
          age: this.form.age,
        },
        headers: {
          token: this.$store.state.token,
        },
      })
        .then((res) => {
          if (res.data.code === 1) {
            this.$message.success("添加成功");
            this.send();
          } else if (res.data.code === 0) {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          this.$message.error("添加失败" + err.message);
        });

      this.flag = 0;
    },
    update(page) {
      // 页码改变时触发(回调参数为当前页码)
      this.page = page; // 更新当前页码
      this.send();
    },
    // 发送分页查询请求
    send() {
      axios({
        method: "post",
        url: "/api/user/page",
        data: {
          userName: this.$store.state.userName,
          name: this.name,
          page: this.page,
          pageSize: this.pageSize,
        },
        headers: {
          token: this.$store.state.token,
        },
      })
        .then((res) => {
          if (res.data.code === 1) {
            this.animated = false;
            this.records = res.data.data.records;
            this.total = res.data.data.total;
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 402) {
            this.$message.error("登录信息已过期，请重新登录");
            this.$router.push("/login");
          }else if(err.response && err.response.status === 401){
            this.$message.error("请登录后操作");
            this.$router.push("/login");
          }
        });
    },
  },

  // 页面加载完成后，获取数据(组件生命周期方法)
  created() {
    this.send();
  },
  // 页面销毁前，清理异步操作(组件生命周期方法)
  beforeDestroy() {
    this.setStusa();
    //this.cleanupAsyncOperations(); //清理异步操作
  },
};
</script>

<style>
#user-view {
  /* position: relative; 设置相对定位 
  color: rgb(0, 0, 0);
  text-align: left;  设置文本居左 
  height: 85%;  设置高度为100% 
  width: 100%;  设置宽度为100% */

  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  top: 0;
  left: 0;
}

#table-container {
  position: absolute;
  text-align: center;
  margin-top: -20px;
  width: 100%;
  height: 50%;
  top: 90px;

}

el-table-column {
  text-align: center;
  position: relative;
}
</style>