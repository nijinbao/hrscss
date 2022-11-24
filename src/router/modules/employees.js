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
    },
    {
      path:"detail/:id",//动态路由 :id?表示:id可传可不传
      component:()=>import("@/views/employees/components/Detail.vue"),
      hidden:true,
      meta:{
        title:"员工详情"
      }

    },
    {
      path:"print/:id",
      component:()=>import("@/views/employees/components/print.vue"),
      hidden:true,
      meta:{
        title: '打印', // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
        icon: 'people'
      }
    }
  ]
}
