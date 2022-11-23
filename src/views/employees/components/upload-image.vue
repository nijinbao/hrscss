<template>
  <div>
    <el-upload 
    :limit="1" 
    :file-list="fileList" 
    action="#" 
    list-type="picture-card" 
    :on-preview="preview"
    :class="{'disabled':fileComputed}"
    :on-remove="remove"
    :on-change="addImg"
    :before-upload="checkUpload"
    :http-request="upload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-progress :percentage="percentage" v-if="showProgress"></el-progress>
    <el-dialog :visible.sync="isShow"  title="图片预览" >
      <img :src="imgUrl" alt="预览图片" style="width:100%;">
    </el-dialog>
  </div>
</template>

<script>
import COS from "cos-js-sdk-v5"
export default {

  data() {
    return {
      isShow:false,
      // 上传图片返回的url地址
      imgUrl:"",
      fileList:[],
      // 存储当前上传文件的id
      currentFileUid :"",
      // 是否显示进度条
      showProgress:false,
      // 进度条的显示百分比
      percentage:0
    };
  },

  mounted() {
    
  },

  methods: {
    // 点击图片预览
    preview(file) {
      this.isShow = true
      this.imgUrl = this.fileList[0].url
    },
    // 删除图片
    remove(file, fileList) {
      this.fileList = this.fileList.filter(item=>item.uid!==file.uid)
    },
    // 添加图片
    // 文件上传 上传成功 上传失败均会触发该钩子函数
    // 在这里因为没有action 文件上传和文件上传失败会触发该钩子函数
    addImg(file,fileList) {
      // file上传的图片资源 fileList上传成功的图片组成的数组
      // 上传图片是否能够显示在页面上关键是看this.fileList
      this.fileList = fileList.map(item=>item) 
      
    },
    // 上传图片之前进行检查
    checkUpload(file) {
      let types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if(!types.includes(file.type)) {
        this.$message.success("上传文件的类型只能是jpeg gif bmp png")
        return false //返回false或者rejected状态的promise对象就会终止上传
      }
      let maxSize = 5*1024*1024
      if(file.size > maxSize) {
        this.$message.success("上传文件的大小不能超过5M")
        return false
      }
      this.currentFileUid = file.uid
      // 显示进度条
      this.showProgress = true
      return true
    },
    // 覆盖默认的上传行为
    upload(params) {
      // 如果存在file
      if(params.file) {
        // 创建COS实例对象
        const cos = new COS({
          SecretId: 'AKIDnV1JOGuIG1av1ta4LPGuMacTYQ5ZpqdD', // 身份识别 ID
          SecretKey: 'TlqiLjbHjRzNZaOzPcbO4ayGLFwVuDKF', // 身份密钥
        })
        cos.putObject({
          Bucket: 'yiyezhiqiu6-1315253273', // 存储桶名称
          Region: 'ap-beijing', // 地域
          Key: params.file.name, // 文件名
          Body: params.file, // 要上传的文件对象
          StorageClass: 'STANDARD' ,// 上传的模式类型 直接默认 标准模式即可
          onProgress:(data)=>{
            this.percentage = data.percent*100
          }
          // 上传到腾讯云 =》 哪个存储桶 哪个地域的存储桶 文件  格式  名称 回调
        }, (err, data)=> {
          // data返回数据之后 应该如何处理
          // 判断是否上传成功
          if(!err && data.statusCode === 200) {
            this.fileList = this.fileList.map(item=>{
              if(item.uid === this.currentFileUid){
                return {url:"http://"+data.Location,upload:true}
                // upload:true是为了后期做保存的时候判断图片是否上传成功
              }
              return item 
            })
            setTimeout(()=>{
              // 关闭进度条 重置进度数据
              this.showProgress = false
              this.percentage = 0
            },1000)
          }
        })
      }
    }
  },
  computed:{
    // 判断上传的图片数量是否为1
    fileComputed() {
      return this.fileList.length === 1
    }
  }
};
</script>

<style >
.disabled .el-upload--picture-card {
  display: none !important;
}
</style>