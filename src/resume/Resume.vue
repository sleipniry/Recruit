<template>
<div>
  <div id="main">
    <div id="uploader">
      <el-upload
        class="avatar-uploader"
        name="photo"
        action="/user/resume/upload_photo/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" style="width:125px;height:175px;">
        <i v-else class="el-icon-plus avatar-uploader-icon" style="display:inline-block;width:125px;height:175px;"></i>
        <div class="el-upload__tip" slot="tip">点击提交1寸照片，大小不超过1M</div>
      </el-upload>
      <!-- <p style="text-align:center;">请提交1寸照片，大小不超过1M</p> -->
    </div>

    <div id="container">
      <h3><span style="color:red">*</span>个人基本信息</h3>
      <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" label-width="120px" class="demo-ruleForm">
        <el-form-item label="姓名:" prop="full_name">
          <el-input v-model="ruleForm1.full_name"></el-input>
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
          <el-radio-group v-model="ruleForm1.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="政治面貌:" prop="zzmm">
          <el-select v-model="ruleForm1.zzmm" placeholder="请选择">
            <el-option
              v-for="item in constValues.zzmms"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期:" required>
          <el-form-item prop="birthday">
            <el-date-picker type="date" placeholder="请选择日期" v-model="ruleForm1.birthday" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="学院:" prop="school">
          <el-select v-model="ruleForm1.school" placeholder="请选择">
            <el-option
              v-for="item in constValues.schools"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业:" prop="speciality">
          <el-input v-model="ruleForm1.speciality"></el-input>
        </el-form-item>
        <el-form-item label="身份证号:" prop="idcard">
          <el-input v-model="ruleForm1.idcard"></el-input>
        </el-form-item>
        <el-form-item label="学历:" prop="degree">
          <el-select v-model="ruleForm1.degree" placeholder="请选择">
            <el-option
              v-for="item in constValues.degrees"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生源地:" prop="stu_origin">
          <el-cascader
            expand-trigger="hover"
            :options="constValues.stu_origins"
            v-model="ruleForm1.stu_origin"
            placeholder="请选择">
          </el-cascader>
        </el-form-item>
        <el-form-item label="电子邮箱:" prop="email">
          <el-input v-model="ruleForm1.email"></el-input>
        </el-form-item>
        <el-form-item label="联系电话:" prop="phone">
          <el-input v-model="ruleForm1.phone"></el-input>
        </el-form-item>
        <el-form-item label="挂职信息来源:" prop="register_source">
          <el-select v-model="ruleForm1.register_source" placeholder="请选择">
            <el-option
              v-for="item in constValues.register_sources"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="就业意向:" prop="job_will">
          <el-input v-model="ruleForm1.job_will" placeholder="请填写不超过24个字"></el-input>
        </el-form-item>
        <el-form-item label="是否服从调剂:" prop="accept_adjust">
          <el-radio-group v-model="ruleForm1.accept_adjust">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <h3><span style="color:red">*</span>奖励活动</h3>
        <el-form-item label-width="160px" label="获得奖励时间及名称:" prop="reward_history">
          <el-input
            type="textarea"
            :rows="2"
            v-model="ruleForm1.reward_history"
            placeholder="例如：2017.01 获得XXXXXX(若没有则填无)">
          </el-input>
        </el-form-item>
        <el-form-item label-width="160px" label="学生干部经历:" prop="xsgbjl">
          <el-input
            type="textarea"
            :rows="2"
            v-model="ruleForm1.xsgbjl"
            placeholder="例如：2017.01 获得XXXXXX(若没有则填无)">
          </el-input>
        </el-form-item>
        <div v-for="(ruleForm3, i) in ruleForm1.edu_history" label-width="40px" class="add_del">
          <h3><span style="color:red">*</span>教育经历（从最高学历写至本科）</h3>
          <el-form-item label="时间:" required>
            <el-col :span="11">
              <el-form-item :prop="'edu_history.' + i + '.when_from'" :rules="{ required: true, message: '请选择时间', trigger: 'change' }">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm3.when_from" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item :prop="'edu_history.' + i + '.when_to'" :rules="{ required: true, message: '请选择时间', trigger: 'change' }">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm3.when_to" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="学校:" :prop="'edu_history.' + i + '.school'" :rules="{ required: true, message: '学校不能为空', trigger: 'blur' }">
            <el-input v-model="ruleForm3.school"></el-input>
          </el-form-item>
          <el-form-item label="学院:" :prop="'edu_history.' + i + '.institute'" :rules="{ required: true, message: '学院不能为空', trigger: 'blur' }">
            <el-input v-model="ruleForm3.institute"></el-input>
          </el-form-item>
          <el-form-item label="专业:" :prop="'edu_history.' + i + '.speciality'" :rules="{ required: true, message: '专业不能为空', trigger: 'blur' }">
            <el-input v-model="ruleForm3.speciality"></el-input>
          </el-form-item>
          <el-form-item label="学位:" :prop="'edu_history.' + i + '.degree'" :rules="{ required: true, message: '请选择学位', trigger: 'change' }">
            <el-select v-model="ruleForm3.degree" placeholder="请选择">
              <el-option
                v-for="item in constValues.achievements"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学历:" :prop="'edu_history.' + i + '.school_record'" :rules="{ required: true, message: '请选择学历', trigger: 'change' }">
            <el-select v-model="ruleForm3.school_record" placeholder="请选择">
              <el-option
                v-for="item in constValues.degrees"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排名:" :prop="'edu_history.' + i + '.rank'" :rules="{ required: true, message: '请选择排名', trigger: 'change' }">
            <el-select v-model="ruleForm3.rank" placeholder="请选择">
              <el-option
                v-for="item in constValues.ranks"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        <el-button type="text" v-if="eduDelShow" class="del_button" @click="delEduHistory(i)">删除</el-button>
        </div>
        <p><el-button type="info" plain @click="addEduHistory">新增教育经历</el-button></p>
        <div v-for="(ruleForm4, i) in ruleForm1.work_history" label-width="100px" class="add_del">
          <h3><span style="color:red">*</span>实践及项目经历（请最多填写3个）</h3>
          <el-form-item label="项目名称:" :prop="'work_history.' + i + '.project_name'" :rules="{ required: true, message: '项目名称不能为空', trigger: 'blur' }">
            <el-input v-model="ruleForm4.project_name"></el-input>
          </el-form-item>
          <el-form-item label="时间:" required>
            <el-col :span="11">
              <el-form-item :prop="'work_history.' + i + '.when_from'" :rules="{ required: true, message: '请选择时间', trigger: 'change' }">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm4.when_from" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item :prop="'work_history.' + i + '.when_to'" :rules="{ required: true, message: '请选择时间', trigger: 'change' }">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm4.when_to" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="项目描述:" :prop="'work_history.' + i + '.description'" :rules="{ required: true, message: '项目描述不能为空', trigger: 'blur' }">
            <el-input
              type="textarea"
              :rows="2"
              v-model="ruleForm4.description">
            </el-input>
          </el-form-item>
          <el-form-item label="项目职责:" :prop="'work_history.' + i + '.duty'" :rules="{ required: true, message: '项目职责不能为空', trigger: 'blur' }">
            <el-input
              type="textarea"
              :rows="2"
              v-model="ruleForm4.duty">
            </el-input>
          </el-form-item>
          <el-button type="text" v-if="workDelShow" class="del_button" @click="delWorkHistory(i)">删除</el-button>
        </div>
        <el-button v-if="workAddShow" type="info" plain @click="addWorkHistory">新增项目经验</el-button></p>
      </el-form>
      <div>
        <el-button type="primary" style="width:100%" @click="submitForm('ruleForm1')">提交</el-button>
      </div>
    </div>

    <div style="clear:both"></div>
  </div>
  <div id="footer"></div>
</div>
</template>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  #main{
    padding-left: 15%;
  }
  #uploader{
    float: left;
    height:175px;
    width:125px;
    max-width: 200px;
  }
  #container{
    float: left;
    margin-left: 30px;
  }
  .add_del{
    position: relative;
  }
  .del_button{
    position: absolute;
    right: 0;
    top: 0;
  }
  #footer{
    width: 100%;
    height: 50px;
  }
</style>

<script>
  import axios from 'axios';
  import city from './city.json';
  import { MessageBox } from 'element-ui';

Date.prototype.format = function(fmt) { 
     var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt; 
}        

  export default {
    data() {
      var checkIDCard = (rule, value, callback) => {
        if (!value) {
          callback(new Error('身份证号不能为空'));
        }
        setTimeout(() => {
          if (String(value).length!=18) {
            callback(new Error('请确认身份证位数'));
          } else {
            callback();
          }
        }, 1000);
      };
      var checkJobWill = (rule, value, callback) => {
        if (!value) {
          callback(new Error('就业意向不能为空'));
        }
        setTimeout(() => {
          if (String(value).length>24) {
            callback(new Error('字数大于24'));
          } else {
            callback();
          }
        }, 1000);
      };
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          callback(new Error('联系电话不能为空'));
        }
        setTimeout(() => {
          if (String(value).length!=11) {
            callback(new Error('请输入11位联系电话'));
          } else {
            callback();
          }
        }, 1000);
      };
      return {
        imageUrl: '',
        ruleForm1: {
          full_name: '',
          sex: '',
          zzmm: '',
          birthday: '',
          school: '',
          speciality: '',
          idcard: '',
          degree: '',
          stu_origin: [],
          email: '',
          phone: '',
          register_source: '',
          job_will: '',
          accept_adjust: '',
          reward_history: '',
          xsgbjl: '',
          edu_history: [],
          work_history: []
        },
        constValues: {
          zzmms: "民主党派、群众、共青团员、预备党员、中共党员".split("、"),
          schools: "机械科学与工程学院、计算机科学与技术学院、生命科学与技术学院、电气与电子工程学院、材料科学与工程学院、船舶与海洋工程学院、能源与动力工程学院、自动化学院、光学与电子信息学院、水电与数字化工程学院、软件学院、环境科学与工程学院、电子信息与通信学院、建筑与城市规划学院、土木工程与力学学院、化学与化工学院、数学与统计学院、物理学院、公共管理学院、经济学院、管理学院、人文学院、新闻与信息传播学院、马克思主义学院、社会学院、法学院、外国语学院、基础医学院、药学院、医药卫生管理学院、公共卫生学院、法医学系、护理学院、计划生育研究所、远程与继续教育学院、教育科学研究院、中欧清洁与可再生能源学院、体育部、武汉光电国家研究中心、工程科学学院（国际化示范学院）、武汉国际微电子学院、航空航天学院".split("、"),
          degrees: "本科生、专业型硕士研究生、学术性硕士研究生、博士生".split("、"),
          register_sources: "辅导员、同学推荐、年级通知、微信推送、华科微校园、其他".split("、"),
          stu_origins: [],
          ranks: ['前10%','前20%','前30%','前50%','其他'],
          achievements: ['学士学位','硕士学位','博士学位']
        },
        eduDelShow: true,
        workDelShow: true,
        workAddShow: true,
        rules1: {
          full_name: [
            { required: true, message: '姓名不能为空', trigger: 'blur' },
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          zzmm: [
            { required: true, message: '请选择政治面貌', trigger: 'change' }
          ],
          birthday: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          school: [
            { required: true, message: '请选择学院', trigger: 'change' }
          ],
          speciality: [
            { required: true, message: '专业不能为空', trigger: 'blur' }
          ],
          idcard: [
            { required: true, validator: checkIDCard, trigger: 'blur' }
          ],
          degree: [
            { required: true, message: '请选择学历', trigger: 'change' }
          ],
          stu_origin: [
            { required: true, message: '请选择生源地', trigger: 'change' }
          ],
          email: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          phone: [
            { required: true, validator: checkPhone, trigger: 'blur' }
          ],
          job_will: [
            { required: true, validator: checkJobWill, trigger: 'blur' }
          ],
          register_source: [
            { required: true, message: '请选择挂职信息来源', trigger: 'change' }
          ],
          accept_adjust: [
            { required: true, message: '请选择是否服从调剂', trigger: 'change' }
          ],
          reward_history: [
            { required: true, message: '奖励不能为空', trigger: 'blur' }
          ],
          xsgbjl: [
            { required: true, message: '学生干部经历不能为空', trigger: 'blur' }
          ],
        }
      };
    },

    mounted(){
 　　this.constValues.stu_origins = city;
      this.load();
 　　},

    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isLt1M = file.size / 1024 / 1024 < 1;

        if (!isLt1M) {
          MessageBox.alert('上传头像图片大小不能超过 1MB!', {
            confirmButtonText: '确定'
          });
        }
        return isLt1M;
      },
      load() {
        axios.post('/user/resume/get/', {})
          .then(response => { 
            this.ruleForm1 = response.data 
            this.imageUrl = response.data.photo

            var orig = this.ruleForm1.stu_origin
            this.ruleForm1.birthday = new Date(this.ruleForm1.birthday) 
            this.ruleForm1.stu_origin = [ orig.substr(0,2) + "0000", orig ]
            delete this.ruleForm1['photo']
            delete this.ruleForm1['cv_name']

            if (this.ruleForm1.edu_history.length == 0) this.addEduHistory();
            if (this.ruleForm1.work_history.length == 0) this.addWorkHistory();
          })
          .catch(error => { 
            alert(error.response.data.message)
            location.href = "login.html"
          })
      },
      addEduHistory(){
        this.ruleForm1.edu_history.push({
          when_from: '',
          when_to: '',
          school: '',
          institute: '',
          speciality: '',
          institute: '',
          degree: '',
          school_record: '',
          rank: ''
        });
        if (this.ruleForm1.edu_history.length==1) {
          this.eduDelShow = false;
        }
        else{
          this.eduDelShow = true;
        }
      },
      delEduHistory(i){
        this.ruleForm1.edu_history.splice(i,1);
        if (this.ruleForm1.edu_history.length==1) {
          this.eduDelShow = false;
        }
        else{
          this.eduDelShow = true;
        }
      },
      addWorkHistory() {
        this.ruleForm1.work_history.push({
          project_name: '',
          when_from: '',
          when_to: '',
          role: '',
          description: '',
          duty: ''
        });
        if (this.ruleForm1.work_history.length==1) {
          this.workDelShow = false;
        }
        else if (this.ruleForm1.work_history.length==3) {
          this.workAddShow = false;
        }
        else {
          this.workDelShow = true;
          this.workAddShow = true;
        }
      },
      delWorkHistory(i) {
        this.ruleForm1.work_history.splice(i,1);
        if (this.ruleForm1.work_history.length==1) {
          this.workDelShow = false;
        }
        else {
          this.workDelShow = true;
        }
        this.workAddShow = true;
      },
      submitForm(formName1) {
        this.$refs[formName1].validate((valid) => {
          if (valid) {
            var data = JSON.parse(JSON.stringify(this.ruleForm1))
            data.birthday = this.ruleForm1.birthday.format("yyyy-MM-dd")
            data.stu_origin = data.stu_origin[1]

            axios.post('/user/resume/update/', data)
              .then(response => { 
                if (response.data.message.match("100")) {
                  alert("提交成功")
                  location.href = "management.html"
                }
              })
              .catch(error => { 
                alert(error.response.data.message)
              })
          } else {
            this.$alert('请检查简历是否根据要求填写完整！', '消息', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `action: ${ action }`
                });
              }
            });
            return false;
          }    
        })
      }
    }
  }
</script>