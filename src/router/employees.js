import layout from "@/layout/index.vue"
export default {
  path:"/approvals",
  component:layout,
  children:[
    {
      // path设置为空字符串，在展示layout组件的时候会自动匹配apprpvals组件作为二级路由进行展示
      path:"",
      component:()=>import("@/views/employees/index.vue"),
      // 传递一些元信息，方便展示侧边栏的标题
      meta:{
        title:"员工管理"
      }
    }
  ]
}