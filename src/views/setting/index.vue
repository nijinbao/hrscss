<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 卡片视图 -->
      <el-card class="card">
        <el-tabs>
          <el-tab-pane label="角色管理">
            <div class="userinfo">
              <el-row>
                <el-button type="primary" size="mini" icon="el-icon-plus">添加角色</el-button>
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
                  <el-button type="text">分配权限</el-button>
                  <el-button type="text">修改</el-button>
                  <el-button type="text">删除</el-button>
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
    </div>
  </div>
</template>

<script>
import {getRoleList, getCompanyById} from "@/api/setting"
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
      companyInfo:{}
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

