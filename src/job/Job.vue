<template>
  <div>
    <h1>{{detail.name}}</h1>
    <h3>所属地区：{{detail.category_name}}</h3>
    <div v-html="detail.detail_html" id="job_info"></div>
    <el-button type="primary" plain @click="setWilling(1)">设为第一志愿</el-button>
    <el-button type="primary" plain @click="setWilling(2)">设为第二志愿</el-button>
    <el-button type="primary" plain @click="setFavorite">收藏职位</el-button>
  </div>
</template>

<style>
  #job_info {
    margin-bottom: 20px;
  }
</style>

<script>
  import axios from 'axios';
  import { MessageBox } from 'element-ui';

  export default {
    data() {
      return {
        id: 0,
        detail: []
      };
    },
    mounted() {
      this.load();
    },
    methods: {
      load() {
        var url = location.search;

        if (url.indexOf("id=") != -1) {
          this.id = location.search.match(/id=(\d+)/)[1]
        }

        axios.post('/user/job/get/', { id:this.id })
          .then(response => { 
            this.detail = response.data
          })
          .catch(error => { 
            MessageBox.alert(error.response.data.message, {
                  confirmButtonText: '确定'
                });
          })
      },
      setWilling(rank) {
        this.$confirm('如果已设置该等级志愿,此操作将进行替换,并将原志愿加入收藏,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post('/user/apply/new/', {job_id:this.id, rank})
            .then(function (response) {
                // 接口调用成功，读取接口返回的数据
                var data = response.data;
                MessageBox.alert("设置成功", {
                    confirmButtonText: '确定',
                    callback: action => {
                      location.href = "process.html"
                    }
                  });
              })
            .catch(function (error) {
                if (error.response) {
                  var data = error.response.data;  // 读取接口给出的错误消息
                  var status = error.response.status; // 读取错误代码，例如 400
                
                  MessageBox.alert(data.message, {
                    confirmButtonText: '确定',
                    callback: action => {
                      if (data.message.match("请完善简历")) {
                        window.open("resume.html")
                      }
                    }
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
      },
      setFavorite() {
        axios.post('/user/apply/new/', {job_id:this.id, rank:0})
          .then(function (response) {
              // 接口调用成功，读取接口返回的数据
              var data = response.data;
              MessageBox.alert("设置成功", {
                  confirmButtonText: '确定',
                  callback: action => {
                    location.href = "process.html"
                  }
                });
            })
          .catch(function (error) {
              if (error.response) {
                var data = error.response.data;  // 读取接口给出的错误消息
                var status = error.response.status; // 读取错误代码，例如 400
              
                MessageBox.alert(data.message, {
                  confirmButtonText: '确定',
                  callback: action => {
                    if (data.message.match("请完善简历")) {
                      window.open("resume.html")
                    }
                  }
                });
              } else if (error.request) {
                // 这种情况是没有收到服务器的任何响应
                console.log(error.request);
                MessageBox.alert("服务器无响应", {
                  confirmButtonText: '确定'
                });
              } else {
                console.log('Error', error.message);
              }
              console.log(error.config);
            });
      }
    }
  };
</script>