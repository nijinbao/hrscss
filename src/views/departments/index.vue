<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
          <tree-tool :tree-node="company" :isRoot="true"></tree-tool>
          <!-- 树形控件 -->

          <el-tree 
          :data="departs" 
          :props="defaultProps" 
          default-expand-all >
            <!-- 组件内部的插槽会被我们传入的内容所覆盖，我们传入树形控件的数据存在多少的节点就会将我们传入的内容循环对应的次数 -->
            <!-- 我们可以通过slot-scope接收组件内部的插槽传递给我们的节点数据 -->
            <tree-tool 
            slot-scope="{data}" 
            :tree-node="data"
            @delDepts="getDepartInfo"
            /> 
          </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTool from "./component/tree-tool.vue"
import {getDepartInfo} from "@/api/department"
import {tranListToTreeData} from "@/utils/index"
export default {
  data() {
    return {
      departs: [ ],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      company:{
    }
    }
  },
  components:{
    TreeTool
  },
  created() {
    // 调用方法获取部门信息
    this.getDepartInfo()
  },
  methods: {
   async getDepartInfo() {
      let res = await getDepartInfo()
      this.company = {name :res.companyName,manager:"负责人"}
      this.departs = tranListToTreeData(res.depts,"")
      console.log(this.departs);
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

