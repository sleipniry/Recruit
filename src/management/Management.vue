<template>
  <div>
    <div id="info">
      <div class="container" id="main_info">
        <img id="show_img" :src="cv.photo">
        <div id="show_info">
          <h1>{{cv.full_name}} </h1><span>&nbsp;&nbsp;(&nbsp;{{cv.sex}}&nbsp;,&nbsp;{{age}}&nbsp;岁&nbsp;)</span>
          <p>邮箱：{{cv.email}}</p>
          <p>联系方式：{{cv.phone}}</p>
        </div>
      </div>
      <div class="container">
        <h3>基本信息</h3>
        <el-row :gutter="20">
          <el-col :span="3"><div class="grid-content">性别</div></el-col>
          <el-col :span="7"><div class="grid-content">{{cv.sex}}</div></el-col>
          <el-col :span="4"><div class="grid-content">学历</div></el-col>
          <el-col :span="8"><div class="grid-content">{{cv.degree}}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3"><div class="grid-content">政治面貌</div></el-col>
          <el-col :span="7"><div class="grid-content">{{cv.zzmm}}</div></el-col>
          <el-col :span="4"><div class="grid-content">生源地</div></el-col>
          <el-col :span="8"><div class="grid-content">{{cv.stu_origin}}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3"><div class="grid-content">年级</div></el-col>
          <el-col :span="7"><div class="grid-content">{{cv.sex}}</div></el-col>
          <el-col :span="4"><div class="grid-content">挂职信息来源</div></el-col>
          <el-col :span="8"><div class="grid-content">{{cv.register_source}}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3"><div class="grid-content">出生日期</div></el-col>
          <el-col :span="7"><div class="grid-content">{{cv.birthday}}</div></el-col>
          <el-col :span="4"><div class="grid-content">是否服从调剂</div></el-col>
          <el-col :span="8"><div class="grid-content">{{cv.accept_adjust}}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3"><div class="grid-content">学院</div></el-col>
          <el-col :span="7"><div class="grid-content">{{cv.school}}</div></el-col>
          <el-col :span="4"><div class="grid-content">就业意向</div></el-col>
          <el-col :span="8"><div class="grid-content">{{cv.job_will}}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3"><div class="grid-content">专业</div></el-col>
          <el-col :span="7"><div class="grid-content">{{cv.speciality}}</div></el-col>
          <el-col :span="4"><div class="grid-content">身份证号</div></el-col>
          <el-col :span="8"><div class="grid-content">{{cv.idcard}}</div></el-col>
        </el-row>
      </div>
      <div class="container">
        <h3>教育经历</h3>
        <div v-for="(cv,index) in cv.edu_history">
          <el-row :gutter="20">
            <el-col :span="3"><div class="grid-content">开始时间</div></el-col>
            <el-col :span="8"><div class="grid-content">{{cv.when_from}}</div></el-col>
            <el-col :span="3"><div class="grid-content">结束时间</div></el-col>
            <el-col :span="8"><div class="grid-content">{{cv.when_to}}</div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="3"><div class="grid-content">学校</div></el-col>
            <el-col :span="8"><div class="grid-content">{{cv.school}}</div></el-col>
            <el-col :span="3"><div class="grid-content">学院</div></el-col>
            <el-col :span="8"><div class="grid-content">{{cv.institute}}</div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="3"><div class="grid-content">学位</div></el-col>
            <el-col :span="8"><div class="grid-content">{{cv.degree}}</div></el-col>
            <el-col :span="3"><div class="grid-content">学历</div></el-col>
            <el-col :span="8"><div class="grid-content">{{cv.school_record}}</div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="3"><div class="grid-content">专业</div></el-col>
            <el-col :span="8"><div class="grid-content">{{cv.speciality}}</div></el-col>
            <el-col :span="3"><div class="grid-content">班级排名</div></el-col>
            <el-col :span="8"><div class="grid-content">{{cv.rank}}</div></el-col>
          </el-row>
          <hr v-if="index!=edu_length-1" style="margin:15px auto;">
        </div>
      </div>
      <div class="container">
        <h3>奖励活动</h3>
        <el-row :gutter="20">
          <el-col :span="5"><div class="grid-content" >获得奖励时间及名称</div></el-col>
          <el-col :span="18"><div class="grid-content" v-text="cv.reward_history" style="white-space:pre-wrap;"></div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5"><div class="grid-content">学生干部经历</div></el-col>
          <el-col :span="18"><div class="grid-content" v-text="cv.xsgbjl" style="white-space:pre-wrap;"></div></el-col>
        </el-row>
      </div>
      <div class="container">
        <h3>实践及项目经历</h3>
        <div v-for="(cv,index) in cv.work_history">
          <el-row :gutter="20">
            <el-col :span="3"><div class="grid-content">开始时间</div></el-col>
            <el-col :span="8"><div class="grid-content">{{cv.when_from}}</div></el-col>
            <el-col :span="3"><div class="grid-content">结束时间</div></el-col>
            <el-col :span="8"><div class="grid-content">{{cv.when_to}}</div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="3"><div class="grid-content">项目名称</div></el-col>
            <el-col :span="20"><div class="grid-content">{{cv.project_name}}</div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="3"><div class="grid-content">项目描述</div></el-col>
            <el-col :span="20"><div class="grid-content" v-text="cv.description" style="white-space:pre-wrap;"></div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="3"><div class="grid-content">项目职责</div></el-col>
            <el-col :span="20"><div class="grid-content" v-text="cv.duty" style="white-space:pre-wrap;"></div></el-col>
          </el-row>
          <hr v-if="index!=work_length-1" style="margin:15px auto;">
        </div>
      </div>
    </div>
    <div id="operation">
      <div class="container">
        <p class="ope_button"><el-button @click="resumeEdit">编辑简历</el-button></p>
        <p class="ope_button"><el-button @click="resumePrint">打印简历</el-button></p>
        <p class="ope_button"><el-button @click="jobApply">申请岗位</el-button></el-button></p>
      </div>
      <div class="container" style="padding-left:50px;">
        <div class="ope_info"><span>简历完整度:</span><span>{{ cv.completion_score }}%</span></div>
        <div class="ope_info"><span>基本信息</span><span v-if="cv.completion_score>0" style="margin-left:50px;">√</span><span v-else style="margin-left:50px;">×</span></div>
        <div class="ope_info"><span>教育经历</span><span v-if="cv.edu_history&&cv.edu_history.length>0" style="margin-left:50px;">√</span><span v-else style="margin-left:50px;">×</span></div>
        <div class="ope_info"><span>项目经历</span><span v-if="cv.work_history&&cv.work_history.length>0" style="margin-left:50px;">√</span><span v-else style="margin-left:50px;">×</span></div>
        <div class="ope_info"><span>奖励活动</span><span v-if="cv.reward_history&&cv.reward_history.length>0" style="margin-left:50px;">√</span><span v-else style="margin-left:50px;">×</span></div>
      </div>
      <div class="container">
        <div class="ope_info"><span>创建时间:</span><span>{{cv.submit_date}}</span></div>
        <div class="ope_info"><span>更新时间:</span><span>{{cv.update_date}}</span></div>
      </div>
    </div>
    <div style="clear:both"></div>
    <div id="footer"></div>
  </div>
</template>

<style>
  #info{
    float: left;
    width: 70%;
  }
  #operation{
    float: left;
    margin: 0 20px;
  }
  .container{
    background-color: #fff;
    margin-top: 10px;
    padding: 10px;
  }
  #main_info{
    padding-left: 10px;
    padding-top: 10px;
  }
  #show_img{
    height: 21%;
    width: 12%;
    min-height: 120px;
    min-width: 100px;
    display: inline-block;
  }
  #show_info{
    display: inline-block;
    margin-left: 15px;
  }
  #show_info h1{
    display: inline-block;
    margin: 10px 0;
  }
  .el-row {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  #info .el-col:nth-child(odd) {
    text-align: right;
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    min-height: 20px;
  }
  .ope_button{
    text-align: center;
  }
  .ope_info{
    margin: 10px 0;
  }
  #footer{
    height: 50px;
  }
</style>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        cv: [],
        edu_length: 0,
        work_length: 0
      };
    },
    computed: {
      age: function() {
        var date = new Date();
        if (this.cv.birthday) {
          var birth_year = this.cv.birthday.split("-")[0];
          return Number(date.getFullYear())-Number(birth_year);
        }
        else {
          return -1;
        }
      }
    },
    mounted(){
      this.load();
 　　},
    methods: {
      load() {
        axios.post('/user/resume/get/', { convert: true })
          .then(response => { 
            this.cv = response.data 
            this.edu_length = this.cv.edu_history.length
            this.work_length = this.cv.work_history.length
            console.log(this.edu_length)
          })
          .catch(error => { 
            alert(error.response.data.message)
            location.href = "login.html"
          })
      },
      jobApply() {
        location.href="index.html"
      },
      resumeEdit() {
        location.href="resume.html"
      },
      resumePrint() {
        location.href="resprin.html"
      }
    }
  };
</script>