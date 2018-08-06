<template>
  <div id="main">
    <el-form label-width="0px" :model="ruleForm" ref="ruleForm" :rules="rules">
      <el-form-item label="" prop="username">
        <el-input clearable v-model="ruleForm.username" placeholder="用户名"/>
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input clearable v-model="ruleForm.password" type="password" placeholder="密码"/>
      </el-form-item>
      <el-form-item>
        <p id="submit"><el-button style="width:100%" type="primary" @click="submitForm('ruleForm')">登陆</el-button></p>
      </el-form-item>
    </el-form> 
    
  </div>
</template>

<style>
  html{
    background-image: url(timg.jpg);
    background-size: 100%;
  }
  #main{
    padding: 30px 50px;
    background: #fff;
    border:10px solid #eee;
    border-radius: 10px;
    max-width: 300px;
    margin: 10% auto;
  }
  #submit{
    text-align: center;
  }
</style>

<script>
  import axios from 'axios';
  import { MessageBox } from 'element-ui';

  export default {
    data() {
      return {
        ruleForm: {
          username: "",
          password: ""
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.startLogin();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      startLogin() {
          axios.post('/user/login/', this.ruleForm)
            .then(function (response) {
              // 接口调用成功，读取接口返回的数据
              var data = response.data;

              location.href = "index.html"
              console.log("success")
              console.log(data.user.realName);       // 例如："张三"
            })
            .catch(function (error) {
              console.log("error!!!")
          
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
    }
  };
</script>