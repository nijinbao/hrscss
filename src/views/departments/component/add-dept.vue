<template>
  <div>
    <el-dialog
    title="添加部门"
    :visible="isShowDialog"
    width="30%"
    >
    <el-form label-width="100px">
      <el-form-item label="部门名称">
        <el-input style="width:80%"></el-input>
      </el-form-item>
      <el-form-item label="部门编码">
        <el-input style="width:80%"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人
      ">
        <el-select style="width:80%"></el-select>
      </el-form-item>
      <el-form-item label="部门介绍
      ">
        <el-input type="textarea" style="width:80%" ></el-input>
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="mini">取消</el-button>
        <el-button size="mini" type="primary">确定</el-button>
      </el-col>
  </el-row>
  </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'WorkspaceJsonAddDept',
  props:{
    isShowDialog:{
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