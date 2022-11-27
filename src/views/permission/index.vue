<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 添加权限区域 -->
     <page-tools>
      <template v-slot:after>
          <el-button type="primary" size="mini" @click="addDialog(1,'0')">添加权限</el-button>
      </template>
     </page-tools>
     <!-- 权限区域 -->
     <el-table border :data="list" row-key="id">
      <el-table-column label="名称"  prop="name"></el-table-column>
      <el-table-column label="标识" align="center" prop="code"></el-table-column>

      <el-table-column label="描述" align="center" prop="description"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-button type="text" size="mini" v-if=" row.type === 1" @click="addDialog(2,row.id)">添加</el-button>
          <el-button type="text" size="mini" @click="editDialog(row.id)">编辑</el-button>
          <el-button type="text" size="mini" @click="delete(row.id)">删除</el-button>
        </template>
      </el-table-column>

     </el-table>
     <!-- 新增编辑对话框 -->
     <el-dialog 
     :visible.sync="showEditDialog"
     :title="titleText"
     >
      <el-form 
      label-width="120px" 
      ref="editForm"
      :model="formData" 
      :rules="rules">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code"></el-input>
        </el-form-item >
        <el-form-item label="权限描述" >
          <el-input v-model="formData.description"></el-input>
        </el-form-item>
        <el-form-item label="企业可见" >
          <!-- 开关 -->
          <el-switch 
            v-model="formData.enVisible"
            active-text="可见"
            inactive-text="不可见"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"
          ></el-switch>
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-button @click="btnCancel">取消</el-button>
        <el-button type="primary" @click="btnOk">确定</el-button>
      </el-row>
     </el-dialog>
    </div>
  </div>
</template>

<script>
import {getPermissionList, addPermission ,updatePermission,delPermission, getPermissionDetail} from "@/api/permission"
import {tranListToTreeData} from "@/utils/index"
export default {
// 这里的type为1才拥有添加子级权限的权限
  data() {
    return {
      // 树形数据
      list: [],
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: 1, // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      },
      showDialog: false,
      // 控制编辑添加对话框是否显示
      showEditDialog:false
    };
  },
  methods: {
    // 获取权限列表
  async  getPermissionList() {
    this.list =  tranListToTreeData(await getPermissionList(),'0')
    },
    // 编辑对话框
   async editDialog(id) {
       this.formData = await getPermissionDetail(id)
       this.showEditDialog = true
    },
    // 添加权限对话框
    addDialog(type, pid) {
      // 记录添加的权限的type和pid
      this.formData.type = type
      this.formData.pid = pid
      this.showEditDialog = true
    },
    btnCancel() {
      // 将数据重置为空
      this.formData = {},
      // 移除表单验证的效果
      this.$refs.editForm.resetFields()
      this.showEditDialog = false
    },
   async btnOk() {
      // 判断是添加还是编辑
      // 表单验证
     await this.$refs.editForm.validate()
     if(this.formData.id) {
        await updatePermission(this.formData)
        this.$message.success("编辑权限成功")
      }else {
        await addPermission(this.formData)
        this.$message.success("添加权限成功")
      }
      this.getPermissionList()
      this.showEditDialog = false
    },
    // 删除权限
   async  delete(id) {
    try {
     await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delPermission(id)
        this.getPermissionList()
        this.$message.success("删除权限成功")
    }catch(err) {
        console.log(err);
    }
    },
    
  },
  created() {
    this.getPermissionList()
  },
  computed:{
    titleText() {
      return  this.formData.id ?"编辑权限" :"添加权限"
    }
  }
}
</script>

<style>

</style>

