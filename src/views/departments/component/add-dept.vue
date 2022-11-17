<template>
  <div>
    <el-dialog
    title="添加部门"
    :visible="isShowDialog"
    width="30%"
    >
    <el-form 
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
        <el-select style="width:80%" v-model="formData.manager"></el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input type="textarea" style="width:80%" v-model="formData.introduce" ></el-input>
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="8">
        <el-button size="mini">取消</el-button>
        <el-button size="mini" type="primary">确定</el-button>
      </el-col>
  </el-row>
  </el-dialog>
  </div>
</template>

<script>
import { getDepartInfo } from '@/api/department';
export default {
  name: 'WorkspaceJsonAddDept',
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
    const checkCode = async (rule,value,callback)=>{
              // 在整个模块中code均不能重复
              let {depts} = await getDepartInfo()
              let res = depts.every(item=>item.code!==value)
              res ? callback(new Error("code不能重复")) :callback()
            }
const checkName = async (rule,value,callback)=>{
              let {depts} = await getDepartInfo()
              // 对部门数据进行过滤，找出是否存在和自己子级部门相同的名称
              let res = depts.filter(item => item.pid === this.treeNode.id).some(item =>item.name === value)
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

          
        
      }
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