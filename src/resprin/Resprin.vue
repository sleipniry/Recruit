<template>
  <div id="print">
    <table border="1" cellspacing="0"> 
    <tbody> 
     <tr> 
      <td colspan="2" rowspan="4"><img :src="cv.photo" style="width:3cm;height:4cm"></td> 
      <td colspan="3">简历编号：{{ cv.id }}</td> 
      <td>是否服从调剂</td> 
      <td>{{ cv.accept_adjust }}</td> 
     </tr> 
     <tr> 
      <td>姓名</td> 
      <td>{{ cv.full_name }}</td> 
      <td>身份证号 </td> 
      <td colspan="2">{{ cv.idcard }}</td> 
     </tr> 
     <tr> 
      <td>性别</td> 
      <td>{{ cv.sex }}</td> 
      <td>政治面貌 </td> 
      <td colspan="2">{{ cv.zzmm }}</td> 
     </tr> 
     <tr> 
      <td>学号</td> 
      <td>{{ cv.username }}</td> 
      <td>出生日期</td> 
      <td colspan="2">{{ cv.birthday }}</td> 
     </tr> 
     <tr> 
      <td>学院</td> 
      <td colspan="3">{{ cv.school }}</td> 
      <td>联系方式</td> 
      <td colspan="2">{{ cv.phone }}</td> 
     </tr> 
     <tr> 
      <td>专业</td> 
      <td colspan="3">{{ cv.speciality }}</td> 
      <td>电子邮箱</td> 
      <td colspan="2">{{ cv.email }}</td> 
     </tr> 
     <tr> 
      <td>学历</td> 
      <td colspan="3">{{ cv.degree }}</td> 
      <td>就业意向</td> 
      <td colspan="2">{{ cv.job_will }}</td> 
     </tr> 
     <tr> 
      <td>生源地</td> 
      <td colspan="3">{{ cv.stu_origin }}</td> 
      <td>信息来源</td> 
      <td colspan="2">{{ cv.register_source }}</td> 
     </tr> 
    </tbody> 
   </table> 
    <p class="sub_title">教育经历(从最高学历写至本科)</p>
    <table>
      <template v-for="(cv,index) in cv.edu_history">
        <tr>
          <td>起止时间</td>
          <td colspan="3">{{ cv.when_from }}-{{ cv.when_to }}</td>
        </tr>
        <tr>
          <td>学校</td>
          <td>{{ cv.school }}</td>
          <td>学位</td>
          <td>{{ cv.degree }}</td>
        </tr>
        <tr>
          <td>学院</td>
          <td>{{ cv.institute }}</td>
          <td>学历</td>
          <td>{{ cv.school_record }}</td>
        </tr>
        <tr>
          <td>专业</td>
          <td>{{ cv.speciality }}</td>
          <td>排名</td>
          <td>{{ cv.rank }}</td>
        </tr>
      </template>
      <template v-for="i in 3-edu_length">
        <tr>
          <td>起止时间</td>
          <td colspan="3"></td>
        </tr>
        <tr>
          <td>学校</td>
          <td></td>
          <td>学位</td>
          <td></td>
        </tr>
        <tr>
          <td>学院</td>
          <td></td>
          <td>学历</td>
          <td></td>
        </tr>
        <tr>
          <td>专业</td>
          <td></td>
          <td>排名</td>
          <td></td>
        </tr>
      </template>
    </table>
    <p class="sub_title">奖励活动</p>
    <table style="table-layout:fixed;">
      <tr>
        <td style="width:3.5cm;">获得奖励时间及名称</td>
        <td  style="height:5.6cm;width:10.25cm;"><div style="height:5.6cm;width:100%;text-align:left;overflow:hidden;"><pre style="white-space:pre-wrap;font-size:16px;font-family:'微软雅黑';margin:0;">{{ cv.reward_history }}</pre></div></td>
      </tr>
      <tr>
        <td>学生干部经历</td>
        <td  style="height:5.6cm;width:10.25cm;"><div style="height:5.6cm;width:100%;text-align:left;overflow:hidden;"><pre style="white-space:pre-wrap;font-size:16px;font-family:'微软雅黑';margin:0;">{{ cv.xsgbjl }}</pre></div></td>
      </tr>
    </table>
    <p class="sub_title">实践及项目经历</p>
    <table>
      <template v-for="(cv,index) in cv.work_history">
        <tr>
          <td style="width:2.24cm;">项目名称</td>
          <td>{{ cv.project_name }}</td>
        </tr>
        <tr>
          <td>起止时间</td>
          <td>{{ cv.when_from }}-{{ cv.when_to }}</td>
        </tr>
        <tr>
          <td>项目描述</td>
          <td  style="height:5.3cm;"><div style="height:5.3cm;width:100%;text-align:left;overflow:hidden;"><pre style="white-space:pre-wrap;font-size:16px;font-family:'微软雅黑';margin:0;">{{ cv.description }}</pre></div></td>
        </tr>
        <tr>
          <td>项目职责</td>
          <td  style="height:5.3cm;"><div style="height:5.3cm;width:100%;text-align:left;overflow:hidden;"><pre style="white-space:pre-wrap;font-size:16px;font-family:'微软雅黑';margin:0;">{{ cv.duty }}</pre></div></td>
        </tr>
      </template>
      <template v-for="i in 3-work_length">
        <tr>
          <td style="width:2.24cm;">项目名称</td>
          <td></td>
        </tr>
        <tr>
          <td>起止时间</td>
          <td></td>
        </tr>
        <tr>
          <td>项目描述</td>
          <td style="height:5.3cm;"></td>
        </tr>
        <tr>
          <td>项目职责</td>
          <td style="height:5.3cm;"></td>
        </tr>
      </template>
    </table>
    <p class="sub_title">评审意见</p>
    <table>
      <tr>
        <td style="width:2.24cm;">导师意见</td>
        <td style="height:7.8cm;position:relative;">
          <div style="position:absolute;right:0;bottom:0;margin:0 10px;"><p style="padding-right:200px;margin:20px auto;">签字 ( 盖章 )</p><p><span class="option" style="margin-right:50px;">时间</span><span class="option">年</span><span class="option">月</span><span class="option">日</span></p></div>
        </td>
      </tr>
      <tr>
        <td>院系意见</td>
        <td style="height:7.8cm;position:relative;">
          <div style="position:absolute;right:0;bottom:0;margin:0 10px;"><p style="padding-right:200px;margin:20px auto;">签字 ( 盖章 )</p><p><span class="option" style="margin-right:50px;">时间</span><span class="option">年</span><span class="option">月</span><span class="option">日</span></p></div>
        </td>
      </tr>
      <tr>
        <td>学校意见</td>
        <td style="height:7.8cm;position:relative;">
          <div style="position:absolute;right:0;bottom:0;margin:0 10px;"><p style="padding-right:200px;margin:20px auto;">签字 ( 盖章 )</p><p><span class="option" style="margin-right:50px;">时间</span><span class="option">年</span><span class="option">月</span><span class="option">日</span></p></div>
        </td>
      </tr>
    </table>
  </div>
</template>

<style>
  table,tr,td {
    border: 1px solid #000;
    border-collapse: collapse;
    padding: 0;
  }
  td {
    height: 1.02cm;
    padding: 5px;
  }
  html {
    text-align: center;
  }
  #print {
    display: inline-block;
  }
  #print table {
    width: 100%;
  }
  .sub_title {
    text-align: left;
    margin: 10px 5px;
    font-size: 1.2em;
  }
  .option {
    margin: auto 20px;
  }
</style>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        cv: [],
        id: 0,
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
        var url = location.search;

        if (url.indexOf("id=") != -1) {
          this.id = location.search.match(/id=(\d+)/)[1]
        }
        else {
          this.id = ''
        }
        axios.post('/user/resume/get/', { id:this.id, convert: true })
          .then(response => { 
            this.cv = response.data 
            this.work_length = this.cv.work_history.length
            this.edu_length = this.cv.edu_history.length > 3 ? 3 : this.cv.edu_history.length
          })
          .catch(error => { 
            alert(error.response.data.message)
            location.href = "login.html"
          })
      }
    }
  };
</script>