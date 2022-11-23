import PageTools from "@/components/PageTools/index.vue"
import UploadExcel from "@/components/UploadExcel/index.vue"
import uploadImage from "@/views/employees/components/upload-image.vue"
export default {
  install(Vue) {
    Vue.component("PageTools",PageTools)
    Vue.component("UploadExcel",UploadExcel)
    Vue.component("uploadImage",uploadImage)
  }
}