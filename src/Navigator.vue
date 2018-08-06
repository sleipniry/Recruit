<template>
<div>
  <div id="nav">
    <el-menu
      class=""
      mode="horizontal"
      background-color="#0da3d9"
      text-color="#fff"
      active-text-color="#ffd04b" style="border:0">
      <el-menu-item index="0" disabled style="opacity:1;cursor:default"><img src="./xiaohui.png" height="100%"></el-menu-item>
      <el-menu-item index="1" onclick="location.href='index.html'">首页</el-menu-item>
      <!-- <el-menu-item index="2">岗位查看</el-menu-item> -->
      <el-menu-item index="3" onclick="location.href='management.html'">简历管理</el-menu-item>
      <el-menu-item index="4" onclick="location.href='process.html'">应聘进展</el-menu-item>
      <el-menu-item v-if="!checkLog" index="5" style="float:right;right:30px;" onclick="location.href='login.html'">登录</el-menu-item>
      <el-menu-item v-else index="5" style="float:right;right:30px;" onclick="location.href='process.html'">已登录：{{user}}</el-menu-item>
    </el-menu>
  </div>
  <div style="height:50px;"></div>
</div>
</template>

<style>
  html{
    background-color: #f9f9f9;
  }
  a{
    text-decoration: none;
  }
  #nav{
    width:100%;
    position:fixed;
    top:0;
    left:0;
    z-index: 9999;
  }
</style>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        activeIndex: '1',
        user: '',
        checkLog: false
      };
    },
    mounted() {
      this.load();
    },
    methods: {
      load() {
        axios.post('/user/sysstat/', { convert: true })
          .then(response => { 
            this.user = response.data.user
            if (this.user) {
              this.checkLog = true
            }
            else{
              this.checkLog = false
            }
          })
          .catch(error => { 
            MessageBox.alert(error.response.data.message, {
                  confirmButtonText: '确定'
                });
          })
      }
    }
  }
</script>