<template>
  <div>
    <div class="dashboard-container">
      <div class="app-container">
        <!-- 卡片视图 -->
        <el-card>
          <el-tabs>
            <el-tab-pane label="登录账户设置">
              <!-- 表单 -->
              <el-form ref="userForm" :model="userInfo" :rules="rules" label-width="120px" style="margin-left: 120px; margin-top:30px">
                <el-form-item label="姓名" prop="username">
                  <el-input v-model="userInfo.username" style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item prop="password2" label="密码">
                  <el-input v-model="userInfo.password2" style="width:300px ;" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                     <el-button type="primary" size="small"  @click="saveUserInfoById">更新</el-button>
                    <el-button type="text" size="small" @click="$router.back()">取消</el-button>
                </el-form-item>
              </el-form>
              
            </el-tab-pane>
            <el-tab-pane label="个人详情">
              <component :is="componentName"></component>
             <!-- <userInfo></userInfo> -->
            </el-tab-pane>
            <el-tab-pane label="岗位信息">
              <component is="jobInfo"></component>
            </el-tab-pane>

          </el-tabs>
        </el-card>
      </div>
        </div>
  </div>
</template>

<script>
import {saveUserInfoById} from "@/api/employees"
import {getUserDetailInfoById} from "@/api/user"
import userInfo from "./user-info.vue";
import jobInfo from "./job-info.vue"
export default {
  data() {
    return {
      userInfo:{
        username:"",
        password2:""
      },
      // 校验规则
      rules:{
        username: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 9, message: '密码长度6-9位', trigger: 'blur' }]
      },
      // 获取的用户id
      id:this.$route.params.id,
      componentName:"userInfo"
    };
  },
components:{
  userInfo,
  jobInfo
},
  created() {
    this.getUserDetailInfo()  
  },

  methods: {
    // 获取用户基本信息
    async getUserDetailInfo() {
      this.userInfo =  await getUserDetailInfoById(this.id)
    },
    // 保存并上传最新的用户数据
    async saveUserInfoById() {
      // 首先对表单数据进行校验
      try {
        await this.$refs.userForm.validate()  
        await saveUserInfoById({...this.userInfo,password:this.userInfo.password2})
        await this.getUserDetailInfo()
        this.$message.success("数据更新成功")
      } catch (error) {
        console.log(error);
        this.$notify({
          title: '提示',
          message: '系统不支持此操作',
          iconClass:"el-icon-info",
          type:"warning"
        });
      }
      
    }
  },
};
</script>

<style lang="scss" scoped>

</style>