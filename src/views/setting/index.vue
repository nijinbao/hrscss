<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 卡片视图 -->
      <el-card class="card">
        <el-tabs>
          <el-tab-pane label="角色管理">
            <div class="userinfo">
              <el-row>
                <el-button type="primary" size="mini" icon="el-icon-plus" @click="isShow=true">添加角色</el-button>
              </el-row>
              <!-- 表格 -->
              <el-table border class="tab" :data="list">
                <el-table-column label="序号" width="150" type="index">
                </el-table-column>
                <el-table-column label="角色名" width="150" prop="name">
                </el-table-column>
                <el-table-column label="描述" prop="description">
                </el-table-column>
                <el-table-column label="操作 " align="center">
                  <template slot-scope="{row}">
                    <div>
                      <el-button type="text">分配权限</el-button>
                      <el-button type="text" @click="editRole(row.id)">修改</el-button>
                      <el-button type="text" @click="deleteRole(row.id)">删除</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <el-row type="flex" justify="end" align="middle" style="height:60px">
                <el-pagination 
                layout="total, prev, pager, next"
                small
                :total="pageInfo.total"
                :page-size="pageInfo.pagesize"
                :current-page="pageInfo.page"
                @current-change="pageChange"
                >
              </el-pagination>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert 
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false">
          </el-alert>
              <el-form label-width="280px" class="company-info">
                <el-form-item label="企业名称">
                  <el-input style="width:400px ;" disabled v-model="companyInfo.name">

                  </el-input>
                </el-form-item>
                <el-form-item label="公司地址
                ">
                  <el-input v-model="companyInfo.companyAddress" style="width:400px ;" disabled>
                    
                  </el-input>
                </el-form-item>
                <el-form-item label="公司电话
                ">
                  <el-input v-model="companyInfo.companyPhone" style="width:400px ;" disabled>
                    
                  </el-input>
                </el-form-item>
                <el-form-item label="邮箱
                ">
                  <el-input v-model="companyInfo.mailbox" style="width:400px ;" disabled>
                    
                  </el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input v-model="companyInfo.remarks" type="textarea" :row="6 " style="width:400px ;" disabled> 
                    
                  </el-input>
                </el-form-item>
              </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <!-- dialog对话框 -->
      <el-dialog :visible="isShow" title="编辑角色" @close="btnCancel">
        <el-form :model="roleInfo" :rules="rules" label-width="120px" ref="roleForm">
          <el-form-item prop="name" label="编辑角色">
            <el-input v-model="roleInfo.name"></el-input>
          </el-form-item>
          <el-form-item prop="description" label="角色描述">
            <el-input v-model="roleInfo.description"></el-input>
          </el-form-item>
        </el-form>
        <el-row type="flex" justify="center">
          <el-button @click="btnCancel">取消</el-button>
          <el-button type="primary" @click="submitInfo"> 确定</el-button>
        </el-row>
        
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {getRoleList, getCompanyById , deleteRole , getRoleInfo , updateRole ,addRole  } from "@/api/setting"
import { mapGetters } from "vuex"
export default {
  data() {
    return {
      pageInfo:{
        page:1,//当前页
        pagesize:5,
        total:0 
      },
      // 用户列表
      list:[],
      companyInfo:{},
      // 角色信息
      roleInfo:{
        name:"",
        description:""
      },
      // 是否显示对话框
      isShow:false,
      rules:{
        name: [{
        required:true,
        trigger:"blur",
        message:"name不能为空"
      }]
        
      }
    }
  },
  methods: {
   async getRoleList() {
      let {total, rows} = await getRoleList(this.pageInfo)
      this.pageInfo.total = total;
      this.list = rows
    },
    // 监听当前页的变化
    pageChange(currentPage) {
      this.pageInfo.page = currentPage
      this.getRoleList()
    },
    // 获取公司信息
   async getCompanyById() {
     this.companyInfo =  await getCompanyById(this.companyId)
    },
    // 删除角色
  async  deleteRole(id) {
     try {
     await this.$confirm('此操作将永久删除该角色信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })  
      await  deleteRole(id)
      this.$message.success("删除角色成功 ")
     } catch (error) {
      console.log(error);
     }
    },
    // 根据id编辑角色信息
    async editRole(id) {
      // 如果存在id则为编辑模式
      this.roleInfo = await getRoleInfo(id)
      this.isShow = true

    },
      // 提交表单数据
    async submitInfo() {
      // 首先对表单数据进行校验
      try {
       await this.$refs.roleForm.validate()
      //  编辑角色
      if(this.roleInfo.id) {
        await updateRole(this.roleInfo)
        this.$message.success("更新数据成功")
      }else { 
        // 添加角色
        await addRole(this.roleInfo)
        this.$message.success("添加角色成功")
      }
       //  后段数据更新成功，重新获取数据
       this.getRoleList()
      } catch (error) {
        console.log(error);
      } finally{
       this.isShow = false
      }
    },
    // 表单关闭 重置表单数据
    btnCancel() {
      this.isShow= false
      this.$refs.roleForm.resetFields()
      this.roleInfo = {
        name:"",
        description:""
      }
    }

  },
  created() {
    this.getRoleList()
    this.getCompanyById()
  },
  computed:{
    ...mapGetters(["companyId"])
  }
}
</script>

<style lang="scss" scoped>
.userinfo {
  padding: 30px;
  .tab {
    margin-top: 20px;  
  }
}
.company-info {
  margin-top: 20px;
}
::v-deep .el-tabs__item  {
  font-size: 20px !important;
  font-weight: bold !important;
}

</style>

