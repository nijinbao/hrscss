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
              <el-table border class="tab" >
                <el-table-column label="序号" width="150">
                </el-table-column>
                <el-table-column label="角色名" width="150">
                </el-table-column>
                <el-table-column label="描述">
                </el-table-column>
                <el-table-column label="操作 " align="center">
                  <el-button type="text">分配权限</el-button>
                  <el-button type="text">修改</el-button>
                  <el-button type="text">删除</el-button>
                </el-table-column>
              </el-table>
              <el-row type="flex" justify="end" align="middle" style="height:60px">
                <el-pagination layout="total,prev, pager, next" :span="8"></el-pagination>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
              <el-form label-width="280px" class="company-info">
                <el-form-item label="企业名称">
                  <el-input style="width:400px ;" disabled>

                  </el-input>
                </el-form-item>
                <el-form-item label="公司地址
                ">
                  <el-input style="width:400px ;" disabled>
                    
                  </el-input>
                </el-form-item>
                <el-form-item label="公司电话
                ">
                  <el-input style="width:400px ;" disabled>
                    
                  </el-input>
                </el-form-item>
                <el-form-item label="邮箱
                ">
                  <el-input style="width:400px ;" disabled>
                    
                  </el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input type="textarea" :row="6 " style="width:400px ;" disabled> 
                    
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
export default {

}
</script>

<style lang="scss" scoped>
.userinfo {
  padding: 30px;
  .tab {
    margin-top: 20px;
   
  }
}

</style>

