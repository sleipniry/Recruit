<template>
  <div>
    <div class="process_container">
      <h3>职位进展</h3>
      <div v-for="job_will in willings" v-if="job_will.sys_processing==job_will.is_available">
        <p v-if="job_will.sys_processing"><strong>{{job_will.rank_name}}正在考核中：{{job_will.job.name}}</strong></p>
        <p v-else><strong>{{job_will.rank_name}}考核未通过：{{job_will.job.name}}</strong></p>
        <el-steps :space="200" :active="job_will.phase" finish-status="success" :process-status="job_will.phase_status" align-center>
          <el-step title="简历筛选" :description="job_will.phase!=0?(job_will.phase<0?'':'已通过'):(job_will.phase_status=='process'?'进行中':(job_will.phase_status=='success'?'已通过':'拒绝'))"></el-step>
          <el-step title="面试考核" :description="job_will.phase!=1?(job_will.phase<1?'':'已通过'):(job_will.phase_status=='process'?'进行中':(job_will.phase_status=='success'?'已通过':'拒绝'))"></el-step>
          <el-step title="录用签约" :description="job_will.phase!=2?(job_will.phase<2?'':'已通过'):(job_will.phase_status=='process'?'进行中':(job_will.phase_status=='success'?'已通过':'拒绝'))"></el-step>
          <el-step title="岗前培训" :description="job_will.phase!=3?(job_will.phase<3?'':'已通过'):(job_will.phase_status=='process'?'进行中':(job_will.phase_status=='success'?'已通过':'拒绝'))"></el-step>
        </el-steps>
      </div>
    </div>
    <div class="process_container">
      <h3>我申请的职位</h3>
      <p v-for="(job_will,index) in willings" class="process_job">
        <strong><span>{{job_will.rank_name}}：{{job_will.job.name}}</span><span style="margin-left:50px;">投递时间：{{job_will.update_date}}</span></strong>
        <span class="process_button" v-if="index>0"><button @click="willingAjust(job_will.id,1)">设为第一志愿</button><button @click="willingAjust(job_will.id,0)">设为收藏志愿</button><button@click="willingDelete(job_will.id)">删除志愿</button></span>
      </p>
    </div>
    <div class="process_container">
      <h3>我收藏的职位</h3>
      <p v-for="(favorite,index) in favorites" class="process_job">
        <strong><span>收藏职位：{{favorite.job.name}}</span><span style="margin-left:50px;">投递时间：{{favorite.update_date}}</span></strong>
        <span class="process_button"><button @click="willingAjust(favorite.id,1)">设为第一志愿</button><button @click="willingAjust(favorite.id,2)">设为第二志愿</button><button @click="willingDelete(favorite.id)">删除志愿</button></span>
      </p>
    </div>
    <div class="logout">
      <el-button type="danger" @click="logOut">退出登录</el-button>
    </div>
  </div>
</template>

<style>
  html{
    background-color: #f9f9f9;
  }
  .process_container{
    background-color: #fff;
    margin: 10px auto;
    padding: 10px 50px; 
    width: 80%;
    min-width: 980px;
  }
  .process_container button{
    border:0;
    background-color: #fff;
    color: blue;
    font-size: 1em;
  }
  .process_job{
    position: relative;
  }
  .process_button{
    position: absolute;
    right: 0;
  }
  .logout{
    margin: 10px auto;
    padding: 10px 50px; 
    width: 80%;
    min-width: 980px;
    text-align: right;
  }
</style>

<script>
  import axios from 'axios';
  import { MessageBox } from 'element-ui';

  export default {
    data() {
      return {
        willings: [],
        favorites: []
      };
    },
    computed: {

    },
    mounted (){
      this.load();
    },
    methods: {
      load() {
        axios.post('/user/apply/list/', { convert: true })
          .then(response => { 
            this.willings = response.data.formal
            this.favorites = response.data.favorite
          })
          .catch(error => { 
            MessageBox.alert(error.response.data.message, {
                  confirmButtonText: '确定'
                });
            location.href = "login.html"
          })
      },
      willingAjust(id,rank) {
        axios.post('/user/apply/adjust/', {id, rank})
          .then(function (response) {
              // 接口调用成功，读取接口返回的数据
              var data = response.data;
              MessageBox.alert("设置成功", {
                  confirmButtonText: '确定'
                });
              location.href = "process.html"
            })
          .catch(function (error) {
              if (error.response) {
                var data = error.response.data;  // 读取接口给出的错误消息
                var status = error.response.status; // 读取错误代码，例如 400

                console.log(data.message);       // 例如：""密码错误""
                
                MessageBox.alert(data.message, {
                  confirmButtonText: '确定'
                });
              } else if (error.request) {
                // 这种情况是没有收到服务器的任何响应
                console.log(error.request);
                MessageBox.alert("服务器无响应", {
                  confirmButtonText: '确定'
                });
              } else {
                // 其他情况
                console.log('Error', error.message);
              }
              console.log(error.config);
            });
      },
      willingDelete(id) {
        axios.post('/user/apply/delete/', {id})
          .then(function (response) {
              // 接口调用成功，读取接口返回的数据
              var data = response.data;
              MessageBox.alert("删除成功", {
                  confirmButtonText: '确定'
                });
              location.href = "process.html"
            })
          .catch(function (error) {
              if (error.response) {
                var data = error.response.data;  // 读取接口给出的错误消息
                var status = error.response.status; // 读取错误代码，例如 400

                console.log(data.message);       // 例如：""密码错误""
                
                MessageBox.alert(data.message, {
                  confirmButtonText: '确定'
                });
              } else if (error.request) {
                // 这种情况是没有收到服务器的任何响应
                console.log(error.request);
                MessageBox.alert("服务器无响应", {
                  confirmButtonText: '确定'
                });
              } else {
                // 其他情况
                console.log('Error', error.message);
              }
              console.log(error.config);
            });
      },
      logOut() {
        axios.post('/user/logout/', { convert: true })
          .then(function (response) {
              location.href = "index.html"
            })
          .catch(function (error) {
              if (error.response) {
                var data = error.response.data;  // 读取接口给出的错误消息
                var status = error.response.status; // 读取错误代码，例如 400

                console.log(data.message);       // 例如：""密码错误""
                
                MessageBox.alert(data.message, {
                  confirmButtonText: '确定'
                });
              } else if (error.request) {
                // 这种情况是没有收到服务器的任何响应
                console.log(error.request);
                MessageBox.alert("服务器无响应", {
                  confirmButtonText: '确定'
                });
              } else {
                // 其他情况
                console.log('Error', error.message);
              }
              console.log(error.config);
            });
      }
    }
  };
</script>