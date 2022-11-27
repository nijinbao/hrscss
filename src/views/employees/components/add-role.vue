<template>
  <div>
    <el-dialog title="分配角色" :visible="showDialog" @close="btnCancel">
      <el-checkbox-group v-model="roleIds">
        <el-checkbox :label="item.id" v-for="item in roleList" :key="item.id">{{item.name}}</el-checkbox>
      </el-checkbox-group>
      <el-row slot="footer" type="flex" justify="center">
        <el-button type="primary" size="mini" @click="assiginRole">确定</el-button>
        <el-button size="mini" @click="btnCancel">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {getRoleList,}from "@/api/setting"
import {getUserDetailInfoById} from "@/api/user"
import {assiginRole} from "@/api/employees"
export default {
  props:{
    showDialog:{
      type:Boolean,
      default:false
    },
    // 查询当前用户的角色详情需要使用id
    userId:{
      type:String,
      default:""
    }
  },
  data() {
    return {
      // 角色列表
      roleList:[],
      // 选中的角色id
      roleIds:[]
    };
  },

  created() {
      this.getRoleList()
  },

  methods: {
    // 获取角色列表
   async getRoleList() {
     let {rows} = await getRoleList({page:1,pagesize:20})
     this.roleList = rows
    },
    // 获取已经分配的角色
    async getUserDetailInfoById(id) {
      let {roleIds} = await getUserDetailInfoById(id)
      this.roleIds = roleIds
    },
    // 给用户分配角色
    async assiginRole() {
      let data = {id : this.userId, roleIds : this.roleIds}
      await assiginRole(data)
      this.$message.success("分配角色成功")
    //  遵循单向数据流的规范 props传递数据不要直接修改 通知父组件去修改
    this.$emit("update:showDialog",false)
    },
    // 关闭对话框
    btnCancel() {
      // 重置数据
      this.roleIds = []
      this.$emit("update:showDialog",false)
    }
  },
};
</script>

<style lang="scss" scoped>

</style>