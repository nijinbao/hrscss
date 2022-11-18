<template>
  <div>
    <el-dialog
    :title="title"
    :visible="isShowDialog"
    width="50%"
    @close="handleClose"
    >
    <el-form 
    ref="deptForm"
    label-width="100px"
    :model="formData"
    :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input style="width:80%" v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input style="width:80%" v-model="formData.code"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select 
        style="width:80%" 
        v-model="formData.manager"
        @focus="getEmployeeSimple">
        <el-option v-for="(item, index) in pepoles" :key="item.id" :value="item.username">{{item.username}}</el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input type="textarea" style="width:80%" v-model="formData.introduce" ></el-input>
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="8">
        <el-button size="mini" @click="handleClose">取消</el-button>
        <el-button size="mini" type="primary" @click="handleSubmit">确定</el-button>
      </el-col>
  </el-row>
  </el-dialog>
  </div>
</template>

<script>
import {getEmployeeSimple} from "@/api/employees"
import { getDepartInfo,addDepartments, getDetailInfo ,editDepts} from '@/api/department';
import { is } from "@babel/types";
export default {
    props:{
    isShowDialog:{
      type:Boolean,
      default:false
    },
    treeNode:{
      type:Object,
      default() {
        return {}
      }
    }
  },
  data() {
    // 编辑模式和添加模式的校验规则是不同的
    const checkCode = async (rule,value,callback)=>{
              // 在整个模块中code均不能重复
              let {depts} = await getDepartInfo()
              let res 
              if(this.formData.id) {
                  // 在编辑模式下，code不能和所有的code相同，同时排除自己
                res = depts.filter(item => item.id !==this.formData.id && item.code !==value && value)
              }else {
               res = depts.every(item=>item.code!==value && value)//数据库中的数据code可能为空
              }
              res ?callback(): callback(new Error("code不能重复")) 
            }
const checkName = async (rule,value,callback)=>{
              let {depts} = await getDepartInfo()
              let res
              if(this.formData.id) {
                // 自己的同级部门的名称不能相同
                res = depts.filter(item=>(item.pid === this.formData.pid)&& item.id!==this.formData.id).some(item=>item.name===value)
              }else {
               res = depts.filter(item => item.pid === this.treeNode.id).some(item =>item.name === value)
              }
                    // 对部门数据进行过滤，找出是否存在和自己子级部门相同的名称
                    res ? callback(new Error("部门名称重复")) : callback()
             
            }
    return {
      // 表单数据
      formData:{
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      // 表单校验
      rules:{
        name :[
          {
            min:1,
            max:50,
            required:true,
            trigger:"blur"
          },
          {
              // 自定义校验规则
            validator:checkName,
            trigger:"blur"
          }
        ],
        code:[
          {
            min:1,
            max:50,
            required:true,
            trigger:"blur"

          },{
            validator:checkCode,
            trigger:"blur"
          },
        ],
        manager:[{
          required:true,
           trigger:"blur"
        }],
        introduce:[
          {
            required:true,
            min:1,
            max:300,
            trigger:"blur"
          }
        ]

          
        
      },
      // 负责人数据
      pepoles:[]
    };
  },

  mounted() {
    
  },

  methods: {
   async getEmployeeSimple() {
        this.pepoles = await getEmployeeSimple()
    },
    // 对表单的数据进行手动校验和提交
    handleSubmit() {
      this.$refs.deptForm.validate(async (isOk)=>{
        if(isOk) {
          // 判断是编辑模式还是添加模式
          if(this.formData.id) {
            await editDepts(this.formData)
          }else {
             // 提交数据
        let res= await addDepartments({...this.formData,pid:this.treeNode.id})
          }
         
        // 告诉父组件更新数据
          this.$emit('addDepts');
          this.$emit("update:isShowDialog",false)
        } 
      })
    },
    // 监听关闭对话框的操作
    handleClose() {
      this.$emit("update:isShowDialog",false)
      // 重置表单的数据
      this.$refs.deptForm.resetFields()
      // 手动的重置表单的数据
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
    }
    },
   async getDetailInfo(id) {
    let res = await getDetailInfo(id)
    this.formData = res
    }
  
  },
  computed:{
    title() {
      return !this.formData.id ? "添加部门" :"编辑部门"
    }
  }
};
</script>

<style lang="scss" scoped>

</style>