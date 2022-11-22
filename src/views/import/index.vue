<template>
  <div>
    <upload-excel :onSuccess="success"></upload-excel>
  </div>
</template>

<script>
import {importEmploy} from '@/api/employees'
export default {

  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
   async success({header, results}) {
   const userRelations = {
          '入职日期': 'timeOfEntry',
          '手机号': 'mobile',
          '姓名': 'username',
          '转正日期': 'correctionTime',
          '工号': 'workNumber'
    }
    let arr = []
    // 将返回的对象数组中对象中文属性转换为对应的英文属性
    results.map(item=>{
      let obj = {}
      Object.keys(item).forEach(key=>{
        if(key==="入职日期" ||key==="转正日期") {
          // 1 excel导出的时间格式需要进行转换
          // 2 传入后段数据库中的数据必须是日期对象
          obj[userRelations[key]] = new Date(this.formatDate(item[key],"/"))
        }else {
         obj[userRelations[key]] = item[key]
        }
      })
      arr.push(obj)
    })
    // 调用导入员工数据的接口
    await importEmploy(arr)
    this.$router.back()
    this.$message.success("导入员工数据成功")
    },
    // 时间处理函数
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  },
};
</script>

<style lang="scss" scoped>

</style>