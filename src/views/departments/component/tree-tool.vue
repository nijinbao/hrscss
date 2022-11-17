<template>
    
    <div  style="width:100%" >
    <el-row 
    type="flex" 
    justify="space-between" 
    style="height:40px;" 
    align="middle" 
   >
      <el-col >
        {{treeNode.name}}
      </el-col>
      <el-col :span="4">
        <el-row type="flex" justify="end">
          <el-col>{{treeNode.manager}}</el-col>
          <el-col>
            <el-dropdown @command="operateDepartment">
              <span class="el-dropdown-link">
                操作<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
                <el-dropdown-item v-if="!isRoot" command="delete">删除部门</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {deletePartment, addDepartments} from "@/api/department"
export default {
  props:{
    treeNode:{
      type:Object,
      required:true,
      default() {
        return {}
      }
    },
    // 是否是根节点
    isRoot:{
      type:Boolean,
      default:false
    }
    
  },
  data() {
    return {
   
    };
  },

  mounted() {
  },

  methods: {
    operateDepartment(type) {
        if(type === "add") {
          // 添加部门
          // 告诉父组件，被点击传递当前被点击的部门的数据
          this.$emit("addDepts" ,this.treeNode)
        } else if(type === "edit") {
          // 编辑部门
        }else {
          // 删除部门
          // this.$confirm()返回的是一个promise对象
          this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          return deletePartment(this.treeNode.id)
        }).then(()=>{
          // 删除成功 后端的数据改变 告诉父组件重新获取最新的数据
          this.$emit('delDepts');
          this.$message("删除部门成功")
        })
        }
    }
  },
};
</script>

<style lang="scss" scoped>

</style>