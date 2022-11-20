<template>
  <div>
    <!-- 新建员工弹出层 -->
    <el-dialog title="编辑员工" :visible="isShow" @close="cancel">
      <el-form 
      ref="addForm"
      label-width="100px" 
      label-position="left"
      :model="formData" :rules="rules">
        <el-form-item label="姓名:" prop="username" >
          <el-input style="width:50%" placeholder="请输入姓名" v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="手机:" prop="mobile">
          <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="入职时间:" prop="timeOfEntry">
          <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="聘用形式:" prop="formOfEmployment">
          <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择">
            <el-option v-for="item in hireType" :key="item.id" :label="item.value" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工号：" prop="workNumber">
          <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号"></el-input>
        </el-form-item>
        <el-form-item label="部门：" prop="departmentName">
          <el-input
          v-model="formData.departmentName" 
          style="width:50%" 
          placeholder="请选择部门" 
          @focus="getDeptmentInfo"
          >  </el-input>
        <el-tree
          v-if="isShowTree" 
          v-loading="loading"
          default-expand-all	 
          :data="depts" 
          @node-click	="nodeClick"
          :props="{label:'name',children:'children'}">
        </el-tree>
        </el-form-item>
        <el-form-item label="转正时间：" prop="correctionTime">
          <el-date-picker v-model="formData.correctionTime"  style="width:50%" placeholder="请选择转正时间"></el-date-picker>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center" slot="footer">
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {addEmployee} from "@/api/employees"
import {getDepartInfo} from "@/api/department"
import {tranListToTreeData} from "@/utils/index"
import EmployeeEnum from "@/constant/employees"
export default {
  props:{
    isShow:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
    // 表单数据
    formData: {
        username: '',
        mobile: '',
        formOfEmployment: 1,
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
    // 验证规则
    rules:{
      username: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }, {
          min: 1, max: 4, message: '用户姓名为1-4位'
        }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, {
          pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'
        }],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
    },
    // 部门数据
    depts:[],
    loading:false,
    // 是否显示el-tree
    isShowTree :false,
    hireType:EmployeeEnum.hireType
  
  };
  },

  mounted() {
    
  },

  methods: {
   async getDeptmentInfo() {
    this.isShowTree = true  
    this.loading = true
    const {depts} =  await getDepartInfo()
    this.depts = tranListToTreeData(depts,"")   
    this.loading = false
    },
    // 点击了el-tree中的部门后
   nodeClick(node ) {
    let name = node.name
    // 将name赋值给表单对应的属性
    this.formData.departmentName = name
    // 关闭el-tree
    this.isShowTree = false 
    },
    // 提交表单数据
   async submit() {
      try {
        await this.$refs.addForm.validate()
        await addEmployee(this.formData)
        // 重新拉取数据
        this.$parent.getEmployerList()
        // 关闭dialog对话框
        this.$emit("update:isShow" , false)
        this.$message.success("添加数据成功")
      } catch (error) {
        console.log(error);
      }
    },
    // 表单关闭
    cancel() {
      this.$emit("update:isShow",false)
      // 重置表单数据
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      // 移除表单数据以及验证结果
      this.$refs.addForm.resetFields()
    }
  },
};
</script>

<style lang="scss" scoped>

</style>