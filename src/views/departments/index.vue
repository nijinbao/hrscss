<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
          <tree-tool :tree-node="company" :isRoot="true"></tree-tool>
          <!-- 树形控件 -->

          <el-tree :data="departs" :props="defaultProps" default-expand-all >
            <!-- 组件内部的插槽会被我们传入的内容所覆盖，我们传入树形控件的数据存在多少的节点就会将我们传入的内容循环对应的次数 -->
            <!-- 我们可以通过slot-scope接收组件内部的插槽传递给我们的节点数据 -->
            <tree-tool slot-scope="{data}" :tree-node="data"/> 
          </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTool from "./component/tree-tool.vue"
export default {
  data() {
    return {
      departs: [
        { name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }
      ],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      company:{
       name: '江苏传智播客教育科技股份有限公司', manager: '负责人'
    }
    }
  },
  components:{
    TreeTool
  }
}
</script>

<style lang="scss" scoped>
  .tree-card {
    padding: 30px  140px;
    font-size:14px;;
  }
</style>

