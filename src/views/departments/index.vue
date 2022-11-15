<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
          <el-row type="flex" justify="space-between" style="height:40px" align="middle">
            <el-col>
              江苏传智播客教育科技股份有限公司
            </el-col>
            <el-col :span="4">
              <el-row type="flex" justify="end">
                <el-col>负责人</el-col>
                <el-col>
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      操作<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>添加子部门</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <!-- 树形控件 -->

          <el-tree :data="departs" :props="defaultProps" default-expand-all>
            <!-- 组件内部的插槽会被我们传入的内容所覆盖，我们传入树形控件的数据存在多少的节点就会将我们传入的内容循环对应的次数 -->
            <!-- 我们可以通过slot-scope接收组件内部的插槽传递给我们的节点数据 -->
            <el-row 
            type="flex" 
            justify="space-between" 
            style="height:40px;width:100%" 
            align="middle" 
            slot-scope="{data,node}">
              <el-col>
                {{data.name}}
              </el-col>
              <el-col :span="4">
                <el-row type="flex" justify="end">
                  <el-col>{{data.manager}}</el-col>
                  <el-col>
                    <el-dropdown>
                      <span class="el-dropdown-link">
                        操作<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>添加子部门</el-dropdown-item>
                        <el-dropdown-item>查看部门</el-dropdown-item>
                        <el-dropdown-item>删除部门</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      departs: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  .tree-card {
    padding: 30px  140px;
    font-size:14px;;
  }
</style>

