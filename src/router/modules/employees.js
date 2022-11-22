import layout from "@/layout/index.vue"
import { request } from "@/utils/request"
export default {
  name:"employees",
  path:"/employees",
  component:layout,
  children:[
    {
      // path设置为空字符串，在展示layout组件的时候会自动匹配apprpvals组件作为二级路由进行展示
      path:"",
      component:()=>import("@/views/employees/index.vue"),
      // 传递一些元信息，方便展示侧边栏的标题
      meta:{
        title:"员工管理",
        icon:"people"
      }
    },{
      path:"detail/:id",//动态路由 :id?表示:id可传可不传
      component:()=>import("@/views/employees/components/Detail.vue"),
      hidden:true,
      meta:{
        title:"员工详情"
      }

    }
  ]
}
// 修改员工基本信息并保存
export function saveUserInfoById(data) {
  return request({
    url:`/sys/user/${data.id}`,
    method:"put",
    data
  })
}