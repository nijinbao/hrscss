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
            <el-dropdown>
              <span class="el-dropdown-link">
                操作<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>添加子部门</el-dropdown-item>
                <el-dropdown-item v-if="!isRoot">查看部门</el-dropdown-item>
                <el-dropdown-item v-if="!isRoot">删除部门</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
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
    
  },
};
</script>

<style lang="scss" scoped>

</style>