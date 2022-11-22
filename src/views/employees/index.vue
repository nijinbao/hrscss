<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 工具栏 -->
        <PageTools :showBefore="true">
          <template v-slot:before>
            <span>共{{pageInfo.total}}条记录</span>
          </template>
          <template v-slot:after>
            <el-button type="success" @click="goImport">导入</el-button>
            <el-button type="danger" @click="exportData">导出</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="addEmployer" size="mini">新增员工</el-button>
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
              <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
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
        <addEmploy :isShow.sync="isShow"></addEmploy>
    </div>
  </div>
</template>

<script>
import {getEmployerList , delEmploy} from "@/api/employees"
import EmployeeEnum from "@/constant/employees"
import addEmploy from "./components/add-employ.vue"
import { formatDate } from "@/filters"
export default {
data() {
  return {
    list:[],//表格数据
    pageInfo:{
      page:1,
      size:8,
      total:0
    },
    loading:false,
    // 定义添加员工的弹出层是否显示
    isShow:false,
   

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
  },
  // 添加员工
  addEmployer() {
    this.isShow = true  
  },
  // 跳转到导入员工数据界面
  goImport() {
    this.$router.push("/import")
  },
  // 将员工数据导出为excel
 async exportData() {
    const headers = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      // 复杂表头
      const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
      // 合并
      const merges = ["A1:A2","B1:F1","G1:G2"]
      let {rows } = await getEmployerList({page:1,size:this.pageInfo.total})
     let {data,header} = this.formatData(headers,rows)
      import('@/vendor/Export2Excel').then(excel => {
     excel.export_json_to_excel({
    header, //表头 必填
    data, //具体数据 必填
    filename: '员工工资表', //非必填
    autoWidth: true, //非必填
    bookType: 'xlsx' ,//非必填
    multiHeader,
    merges
  })
})
     
  },
  // 格式化导出数据
  formatData(headers, rows) {
     // 将返回的数据的格式转换为数组嵌套数组而且返回的数据要和表头一一对应起来
     let header =Object.keys(headers)
      const data = rows.map(item=>{
       return  header.map(key=>{
          if(headers[key]==="timeOfEntry" || headers[key]==="correctionTime") {
            // 做时间格式的处理转换
            return formatDate(item[headers[key]])
          }else if(headers[key]==="formOfEmployment"){
            // 聘用形式的转换
           let obj = EmployeeEnum.hireType.find(obj=>obj.id===item[headers[key]])
           return obj?obj.value:"未知"
            
          }
          return item[headers[key]]
        })
      })
    return {header,data}
  }
},
created() {
  this.getEmployerList()
},
components:{
  addEmploy
}
}
</script>

<style>

</style>

