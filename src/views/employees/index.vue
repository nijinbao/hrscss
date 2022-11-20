<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 工具栏 -->
        <PageTools :showBefore="true">
          <template v-slot:before>
            <span>共{{pageInfo.total}}条记录</span>
          </template>
          <template v-slot:after>
            <el-button type="success">导入</el-button>
            <el-button type="danger">导出</el-button>
            <el-button type="primary" icon="el-icon-plus">新增员工</el-button>
          </template>
        </PageTools>
        <!-- 表格 -->
        <el-table  v-loading="loading" :data="list" border stripe>
          <el-table-column label="序号" sortable="" type="index" width="80" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column 
          label="聘用形式" 
          sortable="" 
          prop="formOfEmployment"
          :formatter="formatInfo"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry" >
            <template v-slot="{row}">
              {{ row.timeOfEntry | formatDate    }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState" >
            <template slot-scope="{row}">
              <el-switch
              :value="true"
              active-color="#13ce66"
              inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template v-slot="{row}">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delEmploy(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页部分 -->
        <el-row type="flex" justify="end">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="pageInfo.page"
            :page-size="pageInfo.size"
            layout="total, prev, pager, next"
            :total="pageInfo.total"
            style="marginTop:20px"
            >
          </el-pagination>
        </el-row>
    </div>
  </div>
</template>

<script>
import {getEmployerList , delEmploy} from "@/api/employees"
import EmployeeEnum from "@/constant/employees"
export default {
data() {
  return {
    list:[],//表格数据
    pageInfo:{
      page:1,
      size:8,
      total:0
    },
    loading:false
  }
},
methods: {
  // 获取员工列表
 async getEmployerList() {
   this.loading = true
   let {total, rows} =  await getEmployerList(this.pageInfo)
   this.pageInfo.total = total
   this.list = rows
   this.loading = false
  },
  // 页数变化
  handleCurrentChange(currentPage) {
    this.formatInfo.page = currentPage
    this.getEmployerList()
  },
  // 格式化聘用形式的数据
  formatInfo(row, column, cellValue, index) {
    let obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
    return obj ? obj.value : cellValue
  },
  // 删除员工
 async delEmploy(id) {
    try {
      await this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delEmploy(id)
        this.$message.success("删除数据成功")
        // 重新拉取数据
        this.getEmployerList()
      } catch (error) {
      console.log(error);
    }
  }
},
created() {
  this.getEmployerList()
},
}
</script>

<style>

</style>

