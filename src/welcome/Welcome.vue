<template>
  <div>
    <div class="welcome_block">
      <el-carousel height="300px">
        <el-carousel-item v-for="(item,index) in pics" :key="index">
          <img :src="item.image" height="100%" width="100%">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="welcome_block" style="background-color:#fff;text-align:right;padding:10px 0;margin-top:10px;">
      <!-- <span style="position:absolute;right:0;">简历投递截止日期：{{}}</span> -->
      <span style="margin:0 10px;">距离简历投递截止日期{{finish_date}}</span>
    </div>
    <div class="welcome_block">
      <p>
        <span style="font-size:.8em">分类：</span>
        <el-select v-model="category_id" placeholder="请选择" size="small" @change="currentPage=1,loadJobs()">
          <el-option
            key="inde"
            label="推荐"
            :value="0">
          </el-option>
          <el-option
            v-for="(item,index) in selections"
            :key="index"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </p>
      <div>
        <el-table
          :data="tableData"
          v-loading="isLoading"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="职位"
            align="center">
          </el-table-column>
          <el-table-column
            prop="category_name"
            label="省份"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            prop="demand_count"
            label="招聘人数"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            width="200"
            align="center">
            <template slot-scope="scope">
              <el-button @click="moreInfo(scope.row.id)" type="danger" size="mini">详细信息</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          layout="prev, pager, next"
          :current-page.sync="currentPage"
          :page-size="1"
          :total="totalPages"
          @current-change="loadJobs"
          style="text-align:center;">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<style>
  html{
    background-color: #f9f9f9;
  }
  .welcome_block{
    width: 80%;
    min-width: 640px;
    margin:0 auto;
  }
</style>

<script>
  import axios from 'axios';
  import { MessageBox } from 'element-ui';

  export default {
    data() {
      return {
        isLoading: true,
        pics: [],
        category_id: 0,
        selections: [],
        tableData: [],
        currentPage: 1,
        totalPages: 1,
        finish_date: ''
      };
    },
    // computed: {
    //   tableShow: function() {
    //     var data = [];
    //     var j=0;
    //     if (!this.selector) {
    //       for (var i = 0; i < this.tableData.length; i++) {
    //           data[j] = this.tableData[i];
    //           j++;
    //       }
    //     }
    //     else {
    //       for (var i = 0; i < this.tableData.length; i++) {
    //         if (this.tableData[i].category_name==this.selector) {
    //           data[j] = this.tableData[i];
    //           j++;
    //         }
    //       }
    //     } 
    //     return data;
    //   }
    // },
    mounted (){
      this.load();
    },
    methods: {
      loadJobs() {
        this.isLoading = true
        axios.post('/user/job/list/', { category: this.category_id, page: this.currentPage })
          .then(response => { 
            var data = response.data
            this.tableData = data.items
            this.totalPages = data.pages
            this.isLoading = false
          })
          .catch(error => { 
            MessageBox.alert(error.response.data.message, {
                  confirmButtonText: '确定'
                });
          })
      },
      load() {
        axios.post('/info/carousel/', { convert: true })
          .then(response => { 
            this.pics = response.data 
          })
          .catch(error => { 
            MessageBox.alert(error.response.data.message, {
                  confirmButtonText: '确定'
                });
          })

        this.loadJobs()

        axios.post('/user/job/category/list/', { convert: true })
          .then(response => { 
            this.selections = response.data
          })
          .catch(error => { 
            MessageBox.alert(error.response.data.message, {
                  confirmButtonText: '确定'
                });
          })
          
        axios.post('/user/sysstat/', { convert: true })
          .then(response => { 
            this.finish_date = response.data.apply_time_left
          })
          .catch(error => { 
            MessageBox.alert(error.response.data.message, {
                  confirmButtonText: '确定'
                });
          })
      },
      moreInfo(id) {
        location.href = 'job.html?id=' + String(id);
      }
    }
  };
</script>